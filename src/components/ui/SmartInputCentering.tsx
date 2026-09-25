import React, { useEffect } from 'react';

/**
 * SmartInputCentering
 * -------------------
 * Global Ergonomic Input Centering & Anti-Jump Anchor Lock System.
 *
 * Guarantees two critical behaviors whenever the user focuses or types in an <input> / <textarea>:
 * 1. AUTOMATIC ERGONOMIC CENTERING:
 *    - Smoothly scrolls the screen so the active input is placed in the ideal visual center
 *      (cleared below the fixed Navbar and above mobile virtual keyboards).
 *    - Adds temporary bottom scroll room (`body.ebna-input-focused`) so even inputs on short
 *      pages or filtered views can always be centered.
 * 2. ANTI-JUMP ANCHOR LOCK WHILE TYPING ("Zero Drift"):
 *    - Once centered, records the exact screen Y coordinate (`lockedScreenTop`) of the input.
 *    - As the user types letter by letter (and results/DOM elements below update), any unwanted
 *      vertical drift is synchronously compensated in the same frame (`window.scrollBy`), keeping
 *      the input 100% rock-solid and centered in front of the user's eyes.
 *    - If the user manually scrolls away (wheel/touch) and starts typing again, the screen
 *      smoothly brings the input back to the center and re-locks it.
 */
export const SmartInputCentering: React.FC = () => {
  useEffect(() => {
    let smoothTimerId: number | null = null;
    let lockSettleTimerId: number | null = null;
    let viewportTimerId: number | null = null;

    let activeInputEl: HTMLElement | null = null;
    let activeContainerEl: HTMLElement | null = null;
    let lockedScreenTop: number | null = null;
    let isSmoothScrolling = false;
    let userManuallyScrolledAway = false;

    const isTextEntryElement = (el: Element | null): el is HTMLElement => {
      if (!el || !(el instanceof HTMLElement)) return false;
      const tag = el.tagName.toLowerCase();
      if (tag === 'textarea') return true;
      if (tag === 'input') {
        const type = ((el as HTMLInputElement).type || 'text').toLowerCase();
        const nonTypingTypes = new Set([
          'checkbox',
          'radio',
          'range',
          'file',
          'color',
          'button',
          'submit',
          'reset',
          'hidden',
          'image',
        ]);
        return !nonTypingTypes.has(type);
      }
      return el.isContentEditable;
    };

    const getInputWrapper = (el: HTMLElement): HTMLElement => {
      return (
        (el.closest('.search-bar-wrapper') as HTMLElement) ||
        (el.closest('.global-search-input-box') as HTMLElement) ||
        (el.closest('.form-group') as HTMLElement) ||
        el
      );
    };

    const isSearchField = (el: HTMLElement): boolean => {
      return (
        Boolean(el.closest('.search-bar-wrapper')) ||
        Boolean(el.closest('.global-search-card')) ||
        el.getAttribute('type') === 'search' ||
        (el.getAttribute('placeholder') || '').toLowerCase().includes('buscar')
      );
    };

    const getDesiredScreenTop = (el: HTMLElement, wrapperRect: DOMRect): number => {
      const visibleHeight = window.visualViewport
        ? window.visualViewport.height
        : window.innerHeight;
      const navbarClearance = 104; // Below fixed floating navbar

      if (isSearchField(el)) {
        // Position search bar in upper-center (~20% of visible viewport, min 108px)
        // so both the text being typed and the live product results right below are centered.
        return Math.max(navbarClearance, Math.min(165, visibleHeight * 0.20));
      }

      // Standard form input: ergonomic center (~40% of visible height above keyboard)
      const centeredTop = visibleHeight * 0.40 - wrapperRect.height / 2;
      return Math.max(navbarClearance, centeredTop);
    };

    const findScrollableParent = (el: HTMLElement): HTMLElement | null => {
      let current = el.parentElement;
      while (current && current !== document.body && current !== document.documentElement) {
        const style = window.getComputedStyle(current);
        const overflowY = style.overflowY;
        if (
          (overflowY === 'auto' || overflowY === 'scroll') &&
          current.scrollHeight > current.clientHeight + 10
        ) {
          return current;
        }
        current = current.parentElement;
      }
      return null;
    };

    const centerActiveInput = (el: HTMLElement, behavior: ScrollBehavior = 'smooth') => {
      if (!el || !document.body.contains(el)) return;

      const wrapper = getInputWrapper(el);
      activeContainerEl = wrapper;

      // Check if inside a fixed modal/drawer (e.g. GlobalSearchModal, CartDrawer, AdminModal)
      const fixedOverlay =
        (el.closest('.global-search-backdrop') as HTMLElement) ||
        (el.closest('.cart-drawer') as HTMLElement) ||
        (el.closest('.modal-overlay') as HTMLElement);

      if (fixedOverlay) {
        const scrollableModal = findScrollableParent(el);
        if (scrollableModal && !el.closest('.global-search-backdrop')) {
          const containerRect = scrollableModal.getBoundingClientRect();
          const elRect = wrapper.getBoundingClientRect();
          const relativeTop = elRect.top - containerRect.top + scrollableModal.scrollTop;
          const desiredOffset = Math.max(40, containerRect.height * 0.32);
          scrollableModal.scrollTo({
            top: Math.max(0, relativeTop - desiredOffset),
            behavior,
          });
        }
        lockedScreenTop = wrapper.getBoundingClientRect().top;
        userManuallyScrolledAway = false;
        return;
      }

      const rect = wrapper.getBoundingClientRect();
      const desiredScreenTop = getDesiredScreenTop(el, rect);
      const deltaY = rect.top - desiredScreenTop;
      const targetScrollY = Math.max(0, window.scrollY + deltaY);

      if (Math.abs(deltaY) > 6) {
        isSmoothScrolling = behavior === 'smooth';
        window.scrollTo({
          top: targetScrollY,
          behavior,
        });

        if (lockSettleTimerId) window.clearTimeout(lockSettleTimerId);
        lockSettleTimerId = window.setTimeout(
          () => {
            isSmoothScrolling = false;
            if (activeContainerEl && document.body.contains(activeContainerEl)) {
              lockedScreenTop = activeContainerEl.getBoundingClientRect().top;
              userManuallyScrolledAway = false;
            }
          },
          behavior === 'smooth' ? 320 : 30
        );
      } else {
        lockedScreenTop = rect.top;
        userManuallyScrolledAway = false;
      }
    };

    // Keep the active input glued to its lockedScreenTop if DOM below it changes height while typing
    const enforceAnchorLock = () => {
      if (
        !activeInputEl ||
        !activeContainerEl ||
        isSmoothScrolling ||
        userManuallyScrolledAway ||
        lockedScreenTop === null
      ) {
        return;
      }
      if (!document.body.contains(activeContainerEl)) return;
      if (activeInputEl.closest('.global-search-backdrop')) return;

      const currentRect = activeContainerEl.getBoundingClientRect();
      const drift = currentRect.top - lockedScreenTop;

      // If layout changed and shifted the input by more than 1.5px, restore immediately
      if (Math.abs(drift) > 1.5) {
        window.scrollBy({
          top: drift,
          behavior: 'auto',
        });
      }
    };

    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as Element | null;
      if (!isTextEntryElement(target)) return;

      activeInputEl = target;
      activeContainerEl = getInputWrapper(target);
      userManuallyScrolledAway = false;

      document.body.classList.add('ebna-input-focused');
      target.classList.add('ebna-active-typing-input');

      if (smoothTimerId) window.clearTimeout(smoothTimerId);
      smoothTimerId = window.setTimeout(() => {
        if (document.activeElement === target) {
          centerActiveInput(target, 'smooth');
        }
      }, 60);
    };

    const handleFocusOut = (e: FocusEvent) => {
      const target = e.target as Element | null;
      if (target instanceof HTMLElement) {
        target.classList.remove('ebna-active-typing-input');
      }

      window.setTimeout(() => {
        if (!isTextEntryElement(document.activeElement)) {
          document.body.classList.remove('ebna-input-focused');
          activeInputEl = null;
          activeContainerEl = null;
          lockedScreenTop = null;
          userManuallyScrolledAway = false;
        }
      }, 100);
    };

    // Detect if the user intentionally scrolled with mouse wheel or touch
    const handleManualScrollIntent = () => {
      if (activeInputEl && !isSmoothScrolling) {
        userManuallyScrolledAway = true;
      }
    };

    // When the user types in the input:
    // - Keep cursor visible horizontally inside the input
    // - If user had scrolled away, smoothly center the screen back on the input
    // - Otherwise, lock the input in place so DOM updates below never shift the screen
    const handleInput = (e: Event) => {
      const target = e.target as Element | null;
      if (!isTextEntryElement(target)) return;

      activeInputEl = target;
      activeContainerEl = getInputWrapper(target);
      document.body.classList.add('ebna-input-focused');

      // Ensure text cursor at the end remains visible inside horizontal inputs
      if (target instanceof HTMLInputElement) {
        try {
          if (
            target.selectionStart === target.value.length &&
            target.scrollWidth > target.clientWidth
          ) {
            target.scrollLeft = target.scrollWidth;
          }
        } catch {
          // Ignore for inputs that don't support selectionStart
        }
      }

      if (userManuallyScrolledAway || lockedScreenTop === null) {
        centerActiveInput(target, 'smooth');
      } else {
        // Enforce zero vertical shift both immediately and after React re-render frame
        enforceAnchorLock();
        requestAnimationFrame(() => {
          enforceAnchorLock();
        });
      }
    };

    const handleViewportResize = () => {
      const active = document.activeElement;
      if (!isTextEntryElement(active)) return;

      if (viewportTimerId) window.clearTimeout(viewportTimerId);
      viewportTimerId = window.setTimeout(() => {
        centerActiveInput(active, 'smooth');
      }, 80);
    };

    // Observe body height changes while typing so if product grids shrink/grow, scroll stays pinned
    const resizeObserver =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => {
            if (activeInputEl && !isSmoothScrolling && !userManuallyScrolledAway) {
              enforceAnchorLock();
            }
          })
        : null;

    if (resizeObserver) {
      resizeObserver.observe(document.body);
    }

    document.addEventListener('focusin', handleFocusIn, { passive: true });
    document.addEventListener('focusout', handleFocusOut, { passive: true });
    document.addEventListener('input', handleInput, { passive: true });
    window.addEventListener('wheel', handleManualScrollIntent, { passive: true });
    window.addEventListener('touchmove', handleManualScrollIntent, { passive: true });

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleViewportResize, { passive: true });
    }

    return () => {
      document.removeEventListener('focusin', handleFocusIn);
      document.removeEventListener('focusout', handleFocusOut);
      document.removeEventListener('input', handleInput);
      window.removeEventListener('wheel', handleManualScrollIntent);
      window.removeEventListener('touchmove', handleManualScrollIntent);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleViewportResize);
      }
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      if (smoothTimerId) window.clearTimeout(smoothTimerId);
      if (lockSettleTimerId) window.clearTimeout(lockSettleTimerId);
      if (viewportTimerId) window.clearTimeout(viewportTimerId);
      document.body.classList.remove('ebna-input-focused');
    };
  }, []);

  return null;
};
