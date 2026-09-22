import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Volume2, VolumeX, Sparkles, Compass, Play, Pause } from 'lucide-react';
import { Link } from 'react-router';

interface FashionFilmModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FashionFilmModal: React.FC<FashionFilmModalProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  if (!isOpen) return null;

  return createPortal(
    <div 
      className="fashion-film-modal-overlay"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(10, 5, 10, 0.82)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        animation: 'fadeIn 0.3s ease',
      }}
    >
      <div 
        className="fashion-film-modal-content glass-panel"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '820px',
          background: 'linear-gradient(135deg, rgba(26, 15, 26, 0.95) 0%, rgba(18, 10, 18, 0.98) 100%)',
          borderRadius: '28px',
          border: '1.5px solid rgba(216, 27, 96, 0.35)',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(216, 27, 96, 0.25)',
          overflow: 'hidden',
          position: 'relative',
          color: '#FFFFFF',
        }}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.12)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            transition: 'all 0.2s',
          }}
          aria-label="Cerrar reproductor"
        >
          <X size={20} />
        </button>

        {/* Video Canvas / Editorial Preview Reel */}
        <div 
          style={{
            position: 'relative',
            height: '380px',
            background: 'radial-gradient(circle at center, #3F0D22 0%, #150510 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Animated Background Atmosphere */}
          <div 
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'radial-gradient(rgba(216, 27, 96, 0.3) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
              opacity: 0.4,
            }}
          />

          {/* Reel Graphic Showcase */}
          <div style={{ textAlign: 'center', zIndex: 2, padding: '20px' }}>
            <div 
              style={{
                width: '74px',
                height: '74px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #D81B60, #C2185B)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 35px rgba(216, 27, 96, 0.6)',
                marginBottom: '16px',
                cursor: 'pointer',
                animation: isPlaying ? 'pulseReel 2s infinite ease-in-out' : 'none',
              }}
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause size={30} fill="white" /> : <Play size={30} fill="white" style={{ marginLeft: '4px' }} />}
            </div>

            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(216, 27, 96, 0.25)', padding: '5px 14px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#F48FB1', border: '1px solid rgba(216, 27, 96, 0.4)', marginBottom: '8px' }}>
              <Sparkles size={13} /> Sindy Luxury • Runway Preview 2026
            </span>

            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', margin: '8px 0', color: '#FFFFFF', fontWeight: 800 }}>
              La Elegancia en Movimiento
            </h3>

            <p style={{ fontSize: '0.88rem', color: '#CBD5E1', maxWidth: '520px', margin: '0 auto', lineHeight: 1.5 }}>
              Campaña visual de alta costura filmada para Guinea Ecuatorial. Vestidos de gala, tejidos drapeados de pasarela y cosmética botánica exclusiva.
            </p>
          </div>

          {/* Sound Control Bar at bottom of video canvas */}
          <div 
            style={{
              position: 'absolute',
              bottom: '14px',
              left: '20px',
              right: '20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              zIndex: 3,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                type="button"
                onClick={() => setIsMuted(!isMuted)}
                style={{
                  background: 'rgba(0, 0, 0, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '20px',
                  padding: '6px 12px',
                  color: 'white',
                  fontSize: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                }}
              >
                {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                <span>{isMuted ? 'Silenciado' : '4K Cinematic Audio'}</span>
              </button>
            </div>

            <span style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 600 }}>
              00:48 / 02:15 • Ultra HD 60fps
            </span>
          </div>
        </div>

        {/* Modal Info & Direct CTA */}
        <div style={{ padding: '1.6rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', background: 'rgba(255, 255, 255, 0.03)' }}>
          <div>
            <span style={{ fontSize: '0.78rem', color: '#F48FB1', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Colección Presentada
            </span>
            <h4 style={{ margin: '4px 0 0 0', fontSize: '1.1rem', color: '#FFFFFF', fontWeight: 800 }}>
              Prendas Disponibles en Malabo & Bata
            </h4>
          </div>

          <Link
            to="/catalogo"
            onClick={onClose}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              borderRadius: '30px',
              background: 'linear-gradient(135deg, #D81B60, #C2185B)',
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: '0.9rem',
              textDecoration: 'none',
              boxShadow: '0 6px 20px rgba(216, 27, 96, 0.4)',
              transition: 'transform 0.2s ease',
            }}
          >
            <Compass size={18} />
            <span>Ver Prendas del Film</span>
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes pulseReel {
          0%, 100% {
            box-shadow: 0 0 25px rgba(216, 27, 96, 0.5);
            transform: scale(1);
          }
          50% {
            box-shadow: 0 0 45px rgba(216, 27, 96, 0.85);
            transform: scale(1.05);
          }
        }
      `}</style>
    </div>,
    document.body
  );
};
