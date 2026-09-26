import React from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { useModalLock } from '../../hooks/useModalLock';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children, footer }: ModalProps) {
  // Background isolation, touch lock, and Escape key listener
  useModalLock(isOpen, onClose);

  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button 
            className="modal-close-btn luxury-close-circle-btn" 
            onClick={onClose}
            aria-label="Cerrar modal (ESC)"
            title="Cerrar modal (ESC)"
          >
            <X size={20} />
          </button>
        </div>
        <div className="modal-body">
          {children}
        </div>
        {footer && (
          <div className="modal-footer">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
