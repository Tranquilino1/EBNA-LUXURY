import React, { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router';

/**
 * SmartInputCentering & Zone Scroll Memory
 * ----------------------------------------
 * 1. WRITING ZONE LOCK ("Mantenerse ahí mismo hasta que decida salir"):
 *    - When the user puts the pointer/focus in ANY writing area (<input>, <textarea>, <select>),
 *      if the input is already visible on screen, the screen DOES NOT MOVE AT ALL—it locks
 *      the exact current scroll position (`lockedScrollY`) right where the pointer is.
 *    - Only if the input is covered by a mobile virtual keyboard or hidden behind the top navbar
 *      does it bring it into the visible zone once and immediately lock it there.
 *    - While the user remains in the writing area (until blur/click outside), any unwanted
 *      scroll jumps caused by live search filtering or DOM updates are prevented so the writing
 *      box stays 100% stationary under the pointer.
 *
 * 2. PREVIOUS ZONE & SCROLL RESTORATION ("Volver justo a la zona anterior de donde procedía"):
 *    - Continuously records the exact vertical scroll position (`window.scrollY`) for every
 *      route/zone in `sessionStorage`.
 *    - When the user goes back (browser Back button, phone Back gesture, or "Volver" buttons),
 *      automatically restores the exact scroll coordinate (`window.scrollY`) of the previous zone.
 */

const SCROLL_STORAGE_PREFIX = 'ebna_zone_scroll_v2:';
const LAST_NON_ADMIN_ROUTE_KEY = 'ebna_last_store_route_v2';

export function saveCurrentZoneScroll(pathname: string, search: string = '') {
  try {
    const key = `${SCROLL_STORAGE_PREFIX}${pathname}${search}`;
    sessionStorage.setItem(key, String(Math.round(window.scrollY)));
    sessionStorage.setItem(`${SCROLL_STORAGE_PREFIX}${pathname}`, String(Math.round(window.scrollY)));
    if (!pathname.startsWith('/admin') && !pathname.startsWith('/login') && !pathname.startsWith('/registro')) {
      sessionStorage.setItem(LAST_NON_ADMIN_ROUTE_KEY, `${pathname}${search}`);
    }
  } catch {
    // Ignore storage quota errors
  }
}

export function getSavedZoneScroll(pathname: string, search: string = ''): number | null {
  try {
    const exact = sessionStorage.getItem(`${SCROLL_STORAGE_PREFIX}${pathname}${search}`);
    if (exact !== null) {
      const parsed = Number(exact);
      if (Number.isFinite(parsed)) return parsed;
    }
    const byPath = sessionStorage.getItem(`${SCROLL_STORAGE_PREFIX}${pathname}`);
    if (byPath !== null) {
      const parsed = Number(byPath);
      if (Number.isFinite(parsed)) return parsed;
    }
  } catch {
    // Ignore
  }
  return null;
}

export function getLastStoreRoute(): string {
  try {
    return sessionStorage.getItem(LAST_NON_ADMIN_ROUTE_KEY) || '/catalogo';
  } catch {
    return '/catalogo';
  }
}

export const SmartInputCentering: React.FC = () => {
  const location = useLocation();
  const navigationType = useNavigationType();

  // 1. Track and restore scroll position when navigating between zones/pages
  useEffect(() => {
    const currentPath = location.pathname;
    const currentSearch = location.search;

    if (!currentPath.startsWith('/admin') && !currentPath.startsWith('/login') && !currentPath.startsWith('/registro')) {
      try {
        sessionStorage.setItem(LAST_NON_ADMIN_ROUTE_KEY, `${currentPath}${currentSearch}`);
      } catch {}
    }

    const shouldRestoreScroll =
      navigationType === 'POP' ||
      Boolean((location.state as any)?.restoreScroll) ||
      currentPath === '/catalogo' ||
      currentPath === '/';

    if (shouldRestoreScroll) {
      const savedY = getSavedZoneScroll(currentPath, currentSearch);
      if (savedY !== null && savedY > 0) {
        // Restore immediately and re-verify as images/products finish rendering
        const restore = () => {
          window.scrollTo({ top: savedY, behavior: 'instant' as ScrollBehavior });
        };
        restore();
        const t1 = window.setTimeout(restore, 40);
        const t2 = window.setTimeout(restore, 140);
        const t3 = window.setTimeout(restore, 300);
        return () => {
          window.clearTimeout(t1);
          window.clearTimeout(t2);
          window.clearTimeout(t3);
        };
      }
    }
  }, [location.pathname, location.search, navigationType, location.state]);

  // Continuously save current scroll position of the active page before any click/navigation
  useEffect(() => {
    let scrollSaveTimer: number | null = null;

    const handleScroll = () => {
      if (scrollSaveTimer) window.clearTimeout(scrollSaveTimer);
      scrollSaveTimer = window.setTimeout(() => {
        saveCurrentZoneScroll(window.location.pathname, window.location.search);
      }, 60);
    };

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      // If clicking a link or button that might navigate, save exact current scroll immediately
      if (target.closest('a') || target.closest('button')) {
        saveCurrentZoneScroll(window.location.pathname, window.location.search);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('mousedown', handlePointerDown, { passive: true });
    document.addEventListener('touchstart', handlePointerDown, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
      if (scrollSaveTimer) window.clearTimeout(scrollSaveTimer);
    };
  }, []);

  // 2. Writing Zone Lock: Keep the screen 100% still where the user puts the pointer to write
  useEffect(() => {
    let activeInputEl: HTMLElement | null = null;
    let lockedScrollY: number | null = null;
    let userScrollingManually = false;
    let manualScrollResetTimer: number | null = null;

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

    const ensureVisibleOnlyIfObscured = (el: HTMLElement) => {
      if (!el || !document.body.contains(el)) return;
      if (el.closest('.global-search-backdrop')) return;

      const visibleHeight = window.visualViewport
        ? window.visualViewport.height
        : window.innerHeight;
      const rect = el.getBoundingClientRect();
      const navbarBottom = 92;
      const bottomMargin = 48;

      // ONLY scroll if the input is actually cut off behind the top navbar or below the bottom/keyboard!
      // If it is already visible on the screen where the user placed their pointer, DO NOT MOVE IT!
      if (rect.top < navbarBottom) {
        const delta = rect.top - (navbarBottom + 24);
        const newScrollY = Math.max(0, window.scrollY + delta);
        window.scrollTo({ top: newScrollY, behavior: 'instant' as ScrollBehavior });
        lockedScrollY = newScrollY;
      } else if (rect.bottom > visibleHeight - bottomMargin) {
        const targetTop = Math.max(navbarBottom + 20, visibleHeight * 0.38);
        const delta = rect.top - targetTop;
        const newScrollY = Math.max(0, window.scrollY + delta);
        window.scrollTo({ top: newScrollY, behavior: 'instant' as ScrollBehavior });
        lockedScrollY = newScrollY;
      } else {
        // Input is already comfortably visible right where the pointer is -> lock current scrollY!
        lockedScrollY = window.scrollY;
      }
    };

    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as Element | null;
      if (!isTextEntryElement(target)) return;

      activeInputEl = target;
      userScrollingManually = false;
      document.body.classList.add('ebna-input-focused');
      target.classList.add('ebna-active-typing-input');

      ensureVisibleOnlyIfObscured(target);
      lockedScrollY = window.scrollY;
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
          lockedScrollY = null;
          userScrollingManually = false;
        }
      }, 60);
    };

    // Allow intentional user scrolling with wheel/touchpad/finger, then update lockedScrollY to the new spot
    const handleManualScrollIntent = () => {
      if (!activeInputEl) return;
      userScrollingManually = true;
      if (manualScrollResetTimer) window.clearTimeout(manualScrollResetTimer);
      manualScrollResetTimer = window.setTimeout(() => {
        userScrollingManually = false;
        if (activeInputEl) {
          lockedScrollY = window.scrollY;
        }
      }, 180);
    };

    // If the browser attempts an automatic scroll jump while the user is focused/typing (without wheel/touch),
    // immediately clamp window.scrollY back to lockedScrollY so the screen stays 100% still!
    const handleWindowScroll = () => {
      if (!activeInputEl || userScrollingManually || lockedScrollY === null) return;
      if (activeInputEl.closest('.global-search-backdrop')) return;

      if (Math.abs(window.scrollY - lockedScrollY) > 1) {
        window.scrollTo({ top: lockedScrollY, behavior: 'instant' as ScrollBehavior });
      }
    };

    // When typing, keep horizontal cursor in view and keep vertical scroll locked
    const handleInput = (e: Event) => {
      const target = e.target as Element | null;
      if (!isTextEntryElement(target)) return;

      activeInputEl = target;
      document.body.classList.add('ebna-input-focused');

      // Keep horizontal text cursor visible as user types long strings
      if (target instanceof HTMLInputElement) {
        try {
          if (
            target.selectionStart === target.value.length &&
            target.scrollWidth > target.clientWidth
          ) {
            target.scrollLeft = target.scrollWidth;
          }
        } catch {}
      }

      // If user had manually scrolled the input completely off-screen and started typing again,
      // bring it back into view once and lock it
      ensureVisibleOnlyIfObscured(target);

      if (lockedScrollY !== null && !userScrollingManually) {
        if (Math.abs(window.scrollY - lockedScrollY) > 1) {
          window.scrollTo({ top: lockedScrollY, behavior: 'instant' as ScrollBehavior });
        }
      }
    };

    // Mobile virtual keyboard resize handler
    const handleViewportResize = () => {
      if (!activeInputEl || !isTextEntryElement(activeInputEl)) return;
      ensureVisibleOnlyIfObscured(activeInputEl);
    };

    document.addEventListener('focusin', handleFocusIn, { passive: true });
    document.addEventListener('focusout', handleFocusOut, { passive: true });
    document.addEventListener('input', handleInput, { passive: true });
    window.addEventListener('scroll', handleWindowScroll, { passive: true });
    window.addEventListener('wheel', handleManualScrollIntent, { passive: true });
    window.addEventListener('touchmove', handleManualScrollIntent, { passive: true });

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleViewportResize, { passive: true });
    }

    return () => {
      document.removeEventListener('focusin', handleFocusIn);
      document.removeEventListener('focusout', handleFocusOut);
      document.removeEventListener('input', handleInput);
      window.removeEventListener('scroll', handleWindowScroll);
      window.removeEventListener('wheel', handleManualScrollIntent);
      window.removeEventListener('touchmove', handleManualScrollIntent);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleViewportResize);
      }
      if (manualScrollResetTimer) window.clearTimeout(manualScrollResetTimer);
      document.body.classList.remove('ebna-input-focused');
    };
  }, []);

  return null;
};
