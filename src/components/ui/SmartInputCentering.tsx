import React, { useEffect } from 'react';

/**
 * SmartInputCentering
 * -------------------
 * Global UX manager that automatically centers the screen smoothly and ergonomically
 * whenever the user clicks/taps into any <input>, <textarea>, or <select> to type.
 *
 * Features:
 * 1. Differentiates between Search Bars (positions at 30% of visible viewport so both
 *    the input and the autocomplete/product results below are centered) and standard
 *    form inputs (positions at 45% of visible viewport so label, input, and next button are visible).
 * 2. Listens to `window.visualViewport` resize events on mobile devices (iOS/Android)
 *    so when the virtual keyboard slides up, the active input is re-centered in the
 *    exact visible area above the keyboard.
 * 3. Handles both main window scrolling and internal scrollable modal/drawer containers.
 */
export const SmartInputCentering: React.FC = () => {
  useEffect(() => {
    let timeoutId: number | null = null;
    let viewportTimeoutId: number | null = null;

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

    const findScrollableParent = (el: HTMLElement): HTMLElement | null => {
      let current = el.parentElement;
      while (current && current !== document.body && current !== document.documentElement) {
        const style = window.getComputedStyle(current);
        const overflowY = style.overflowY;
        const isScrollable =
          (overflowY === 'auto' || overflowY === 'scroll') &&
          current.scrollHeight > current.clientHeight + 10;
        if (isScrollable) {
          return current;
        }
        current = current.parentElement;
      }
      return null;
    };

    const centerActiveInput = (el: HTMLElement) => {
      if (!el || !document.body.contains(el)) return;

      // Highlight the parent input wrapper subtly
      const inputContainer =
        (el.closest('.search-bar-wrapper') as HTMLElement) ||
        (el.closest('.global-search-input-box') as HTMLElement) ||
        (el.closest('.form-group') as HTMLElement) ||
        el;

      const visibleHeight = window.visualViewport
        ? window.visualViewport.height
        : window.innerHeight;

      const isSearchBar =
        Boolean(el.closest('.search-bar-wrapper')) ||
        Boolean(el.closest('.global-search-card')) ||
        el.getAttribute('type') === 'search' ||
        (el.getAttribute('placeholder') || '').toLowerCase().includes('buscar');

      // Check if input is inside a fixed overlay/modal (e.g. GlobalSearchModal, CartDrawer, AdminModal)
      const fixedModalParent =
        (el.closest('.global-search-backdrop') as HTMLElement) ||
        (el.closest('.cart-drawer') as HTMLElement) ||
        (el.closest('.modal-overlay') as HTMLElement);

      if (fixedModalParent) {
        const scrollableModal = findScrollableParent(el);
        if (scrollableModal) {
          const containerRect = scrollableModal.getBoundingClientRect();
          const elRect = inputContainer.getBoundingClientRect();
          const relativeTop = elRect.top - containerRect.top + scrollableModal.scrollTop;
          const desiredOffset = isSearchBar
            ? Math.max(24, containerRect.height * 0.18)
            : Math.max(60, containerRect.height * 0.38);

          scrollableModal.scrollTo({
            top: Math.max(0, relativeTop - desiredOffset),
            behavior: 'smooth',
          });
        }
        return;
      }

      // Main window scrolling: calculate exact ergonomic center
      const rect = inputContainer.getBoundingClientRect();
      const absoluteElementTop = rect.top + window.scrollY;
      const navbarOffset = 95; // Fixed navbar clearance

      // For search bars: place at ~30% from top so search input + live dropdown below are both centered.
      // For standard form inputs: place at ~44% from top (true ergonomic center above mobile keyboard).
      const targetViewportRatio = isSearchBar ? 0.30 : 0.44;
      const desiredScreenY = Math.max(navbarOffset + 20, visibleHeight * targetViewportRatio);

      const targetScrollY = Math.max(
        0,
        absoluteElementTop - desiredScreenY + rect.height / 2
      );

      // Only scroll if the input is more than 35px away from the ideal ergonomic zone
      if (Math.abs(window.scrollY - targetScrollY) > 35) {
        window.scrollTo({
          top: targetScrollY,
          behavior: 'smooth',
        });
      }
    };

    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as Element | null;
      if (!isTextEntryElement(target)) return;

      // Add active focus class for visual feedback
      target.classList.add('ebna-active-typing-input');

      if (timeoutId) window.clearTimeout(timeoutId);
      // Initial smooth centering (120ms allows any dropdown/UI layout shift to settle)
      timeoutId = window.setTimeout(() => {
        centerActiveInput(target);
      }, 120);

      // Secondary check at 340ms for mobile keyboards that animate in without visualViewport API
      window.setTimeout(() => {
        if (document.activeElement === target) {
          centerActiveInput(target);
        }
      }, 340);
    };

    const handleFocusOut = (e: FocusEvent) => {
      const target = e.target as Element | null;
      if (target instanceof HTMLElement) {
        target.classList.remove('ebna-active-typing-input');
      }
    };

    // Mobile Virtual Keyboard compensation via VisualViewport API
    const handleViewportResize = () => {
      const active = document.activeElement;
      if (!isTextEntryElement(active)) return;

      if (viewportTimeoutId) window.clearTimeout(viewportTimeoutId);
      viewportTimeoutId = window.setTimeout(() => {
        centerActiveInput(active);
      }, 90);
    };

    // If user scrolled away while input remained focused and starts typing again, re-center if out of comfortable zone
    const handleInput = (e: Event) => {
      const target = e.target as Element | null;
      if (!isTextEntryElement(target)) return;
      const rect = target.getBoundingClientRect();
      const visibleHeight = window.visualViewport
        ? window.visualViewport.height
        : window.innerHeight;
      if (rect.top < 95 || rect.bottom > visibleHeight - 30) {
        centerActiveInput(target);
      }
    };

    document.addEventListener('focusin', handleFocusIn, { passive: true });
    document.addEventListener('focusout', handleFocusOut, { passive: true });
    document.addEventListener('input', handleInput, { passive: true });

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleViewportResize, { passive: true });
    }

    return () => {
      document.removeEventListener('focusin', handleFocusIn);
      document.removeEventListener('focusout', handleFocusOut);
      document.removeEventListener('input', handleInput);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleViewportResize);
      }
      if (timeoutId) window.clearTimeout(timeoutId);
      if (viewportTimeoutId) window.clearTimeout(viewportTimeoutId);
    };
  }, []);

  return null;
};
