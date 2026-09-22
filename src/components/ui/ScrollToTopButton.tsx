import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 380) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    toggleVisibility();

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      type="button"
      className={`scroll-to-top-luxury-btn ${isVisible ? 'is-visible' : ''}`}
      onClick={scrollToTop}
      title="Volver arriba suavemente"
      aria-label="Volver arriba suavemente"
      style={{
        position: 'fixed',
        bottom: '88px',
        right: '24px',
        zIndex: 1100,
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        border: '1.5px solid rgba(216, 27, 96, 0.35)',
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        color: 'var(--brand-accent)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.85)',
        pointerEvents: isVisible ? 'auto' : 'none',
        transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <ArrowUp size={19} strokeWidth={2.4} />
      <style>{`
        .scroll-to-top-luxury-btn:hover {
          background: linear-gradient(135deg, #D81B60, #C2185B) !important;
          color: #FFFFFF !important;
          border-color: transparent !important;
          transform: translateY(-3px) scale(1.08) !important;
          box-shadow: 0 10px 28px rgba(216, 27, 96, 0.4) !important;
        }
        @media (max-width: 768px) {
          .scroll-to-top-luxury-btn {
            bottom: 80px !important;
            right: 16px !important;
            width: 40px !important;
            height: 40px !important;
          }
        }
      `}</style>
    </button>
  );
};
