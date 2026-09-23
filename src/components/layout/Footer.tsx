import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Phone, MessageCircle, Sparkles, Share2, Heart, QrCode, Smartphone, ChevronUp, ChevronDown, Headphones } from 'lucide-react';
import { QRModal } from '../ui/QRModal';
import { ContactSupportModal } from '../ui/ContactSupportModal';
import { useCustomization } from '../../contexts/CustomizationContext';
import { ChristmasHat } from '../effects/ChristmasHat';
import './layout.css';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { settings, isChristmasActive } = useCustomization();
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isNearBottom, setIsNearBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const threshold = document.documentElement.scrollHeight - 550;
      const nearBottom = scrollPosition >= threshold;
      setIsNearBottom(nearBottom);
      if (nearBottom) {
        setIsExpanded(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = () => {
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    if (!isNearBottom) {
      setIsExpanded(false);
    }
  };

  const handleShareWhatsApp = () => {
    const url = window.location.href || 'https://ebna-luxury.vercel.app';
    const message = `¡Descubre la boutique exclusiva EBNA Luxury! Moda, perfumería y cosmética de lujo en Guinea Ecuatorial: ${url}`;
    if (navigator.share) {
      navigator.share({
        title: 'EBNA Luxury — Moda & Cosmética de Lujo',
        text: 'Descubre la colección de alta gama de EBNA Luxury.',
        url: url,
      }).catch(() => {
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`, '_blank');
      });
    } else {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`, '_blank');
    }
  };

  return (
    <div 
      className={`footer-wrapper ${isExpanded ? 'is-expanded' : 'is-collapsed'} ${isNearBottom ? 'is-near-bottom' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Floating Toggle Bar Tab */}
      <button 
        type="button"
        className="footer-toggle-tab glass-panel"
        onClick={() => setIsExpanded(!isExpanded)}
        title={isExpanded ? 'Ocultar pie de página' : 'Desplegar pie de página'}
        aria-expanded={isExpanded}
      >
        {isExpanded ? (
          <>
            <ChevronDown size={16} color="#D81B60" />
            <span>Ocultar Pie de Página</span>
          </>
        ) : (
          <>
            <ChevronUp size={16} color="#D81B60" />
            <span>EBNA Luxury • Desplegar Información</span>
          </>
        )}
      </button>

      {/* Main Footer Body */}
      <footer className="footer glass-panel">
        <div className="footer-content">
          {/* Brand & App Download */}
          <div className="footer-brand">
            <div className="footer-brand-row" style={{ position: 'relative' }}>
              {isChristmasActive && settings.christmasHats && (
                <ChristmasHat 
                  size={28} 
                  style={{ 
                    position: 'absolute', 
                    top: '-12px', 
                    left: '-8px', 
                    transform: 'rotate(-18deg)',
                    zIndex: 10
                  }} 
                />
              )}
              <img src="/icons/ebna-logo.png" alt="EBNA Logo" className="footer-logo-circle" />
              <div>
                <h2 className="brand-title-uppercase">SINDY LUXURY</h2>
                <p className="brand-syndy-tagline">BY EBNA — Alta Costura & Moda</p>
              </div>
            </div>
            
            <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', margin: '0.6rem 0 1rem 0', lineHeight: 1.5 }}>
              Boutique exclusiva de vestidos de gala, conjuntos de pasarela, calzado joya y cosmética botánica en Guinea Ecuatorial.
            </p>

            <div className="footer-app-badges">
              <div className="platform-badges" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className="platform-badge qr-trigger-badge"
                  onClick={() => setIsQRModalOpen(true)}
                  style={{
                    border: '1px solid var(--border-brand)',
                    background: 'rgba(216, 27, 96, 0.1)',
                    cursor: 'pointer',
                    font: 'inherit',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    borderRadius: '16px',
                    color: 'var(--brand-accent)',
                    fontWeight: 700,
                    fontSize: '0.82rem'
                  }}
                  title="Instalar App PWA Universal (iOS, Android, Windows, Mac, Linux, Chromebook)"
                >
                  <Smartphone size={15} color="var(--brand-accent)" />
                  <span>Instalar PWA Universal</span>
                </button>

                <button
                  type="button"
                  className="platform-badge"
                  onClick={() => setIsQRModalOpen(true)}
                  style={{
                    border: '1px solid var(--border-subtle)',
                    background: 'var(--canvas-base)',
                    cursor: 'pointer',
                    font: 'inherit',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    borderRadius: '16px',
                    color: 'var(--text-primary)',
                    fontWeight: 600,
                    fontSize: '0.82rem'
                  }}
                  title="Escanear Código QR"
                >
                  <QrCode size={15} color="var(--brand-gold)" />
                  <span>Código QR</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links">
            <h3>Navegación & Soporte</h3>
            <nav className="quick-links">
              <Link to="/">Inicio</Link>
              <Link to="/catalogo">Catálogo Completo</Link>
              <Link to="/login">Iniciar Sesión Cliente</Link>
              <button
                type="button"
                onClick={() => setIsSupportModalOpen(true)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  font: 'inherit',
                  color: 'var(--brand-accent)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  textAlign: 'left'
                }}
              >
                <Headphones size={15} color="#184266" /> Soporte Técnico <span className="aida-highlight-blue">AiDA</span>
              </button>
            </nav>
          </div>

          {/* Direct Contact & Muni */}
          <div className="footer-contact">
            <h3>Atención & Pagos</h3>
            <div className="contact-links">
              <a href="https://wa.me/240222633687" target="_blank" rel="noopener noreferrer" className="contact-link">
                <MessageCircle size={18} className="text-ebna" />
                <div>
                  <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>+240 222 633 687</span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Atención General WhatsApp</span>
                </div>
              </a>
              <a href="https://wa.me/240555439904" target="_blank" rel="noopener noreferrer" className="contact-link">
                <Phone size={18} color="var(--text-secondary)" />
                <div>
                  <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>+240 555 439 904</span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Servicio Muni Dinero</span>
                </div>
              </a>
              <button
                type="button"
                onClick={() => setIsSupportModalOpen(true)}
                className="contact-link"
                style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left', width: '100%' }}
              >
                <Headphones size={18} color="#184266" />
                <div>
                  <span style={{ display: 'block', fontSize: '0.9rem', fontWeight: 800, color: '#184266' }}>Startup <span className="aida-highlight-blue" style={{ fontSize: '1rem' }}>AiDA</span> Soporte</span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>thetrapkinzofafrica@gmail.com</span>
                </div>
              </button>
            </div>
          </div>

          {/* Community & WhatsApp Channel */}
          <div className="footer-social">
            <h3>Canal Oficial</h3>
            <div className="social-icons" style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              <a
                href="https://whatsapp.com/channel/0029VbCGaZxGpLHLcSBIdi2Q"
                target="_blank"
                rel="noopener noreferrer"
                className="social-channel-btn"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 18px',
                  borderRadius: '24px',
                  background: 'linear-gradient(135deg, #25D366, #128C7E)',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  textDecoration: 'none',
                  boxShadow: '0 4px 14px rgba(37,211,102,0.3)',
                  transition: 'transform 0.2s ease',
                }}
              >
                <MessageCircle size={18} />
                <span>Canal de Novedades WhatsApp</span>
              </a>

              <div style={{ display: 'flex', gap: '0.8rem', marginTop: '0.2rem', alignItems: 'center' }}>
                <a href="https://whatsapp.com/channel/0029VbCGaZxGpLHLcSBIdi2Q" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Canal WhatsApp" title="Canal Oficial WhatsApp"><MessageCircle size={20} color="#25D366" /></a>
                <a href="https://wa.me/240222633687?text=Quiero%20información%20sobre%20la%20colección%20de%20lujo" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Consulta Lujo" title="Consulta de Lujo por WhatsApp"><Sparkles size={20} color="#D81B60" /></a>
                <Link to="/catalogo" className="social-link" aria-label="Catálogo Favoritos" title="Explorar Catálogo Exclusivo"><Heart size={20} color="#D81B60" /></Link>
                <button 
                  type="button" 
                  onClick={handleShareWhatsApp} 
                  className="social-link" 
                  aria-label="Compartir en WhatsApp" 
                  title="Compartir página por WhatsApp"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'inline-flex', alignItems: 'center' }}
                >
                  <Share2 size={20} color="#D81B60" />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', textAlign: 'center', paddingTop: '16px' }}>
          <p style={{ margin: 0 }}>
            &copy; {currentYear} EBNA Moda & Cosmética. Todos los derechos reservados. | PWA Universal compatible con iOS, Android, Windows, Mac, Chromebook y Linux.
          </p>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <span>Arquitectura & Desarrollo por <strong style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#184266', fontSize: '0.92rem' }}><img src="/icons/aida-logo.jpg" alt="AiDA" style={{ height: '20px', borderRadius: '4px', objectFit: 'contain', border: '1px solid rgba(24, 66, 102, 0.25)', boxShadow: '0 1px 4px rgba(24, 66, 102, 0.15)' }} /> Startup <span className="aida-logo-text" style={{ fontSize: '1.02rem', color: '#184266' }}>AiDA</span></strong></span>
            <span>•</span>
            <a href="mailto:thetrapkinzofafrica@gmail.com" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>thetrapkinzofafrica@gmail.com</a>
            <span>•</span>
            <a href="tel:+240555320017" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>+240 555 32 00 17</a>
            <span>•</span>
            <button
              type="button"
              onClick={() => setIsSupportModalOpen(true)}
              style={{
                background: 'rgba(24, 66, 102, 0.08)',
                border: '1.5px solid rgba(24, 66, 102, 0.3)',
                borderRadius: '14px',
                padding: '4px 12px',
                color: '#184266',
                fontSize: '0.78rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                boxShadow: '0 2px 8px rgba(24, 66, 102, 0.12)'
              }}
            >
              Contactar Soporte Técnico <span className="aida-highlight-blue" style={{ fontSize: '0.85rem' }}>AiDA</span>
            </button>
          </div>
        </div>
      </footer>

      {/* QR Code Modal */}
      <QRModal isOpen={isQRModalOpen} onClose={() => setIsQRModalOpen(false)} />

      {/* Support & Contact Modal */}
      <ContactSupportModal isOpen={isSupportModalOpen} onClose={() => setIsSupportModalOpen(false)} />
    </div>
  );
};
