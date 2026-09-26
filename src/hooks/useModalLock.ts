import { useEffect } from 'react';

// Global counter for active open modals to avoid premature unlock when modals nest
let lockCount = 0;

/**
 * useModalLock
 * 
 * Guarantees:
 * 1. Background isolation: locks body and html scrolling on desktop & mobile touch devices.
 * 2. Universal exit: listens to the `Escape` key and invokes `onClose()`.
 * 3. Safe cleanup: decrements active count and restores scrolling when all modals are closed.
 */
export function useModalLock(isOpen: boolean, onClose?: () => void) {
  useEffect(() => {
    if (!isOpen) return;

    lockCount++;
    document.body.classList.add('ebna-modal-locked');
    document.documentElement.classList.add('ebna-modal-locked');

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onClose) {
        e.preventDefault();
        e.stopPropagation();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown, true);

    return () => {
      window.removeEventListener('keydown', handleKeyDown, true);
      lockCount = Math.max(0, lockCount - 1);
      if (lockCount === 0) {
        document.body.classList.remove('ebna-modal-locked');
        document.documentElement.classList.remove('ebna-modal-locked');
      }
    };
  }, [isOpen, onClose]);
}
