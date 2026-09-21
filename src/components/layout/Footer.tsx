import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Phone, MessageCircle, Sparkles, Share2, Heart, QrCode, Smartphone, Apple, ChevronUp, ChevronDown } from 'lucide-react';
import { QRModal } from '../ui/QRModal';
import './layout.css';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [isNearBottom, setIsNearBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const threshold = document.documentElement.scrollHeight - 450;
      const nearBottom = scrollPosition >= threshold;
      setIsNearBottom(nearBottom);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <div className={`footer-wrapper ${isExpanded ? 'is-expanded' : 'is-collapsed'} ${isNearBottom ? 'is-near-bottom' : ''}`}>
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
            <div className="footer-brand-row">
              <img src="/icons/ebna-logo.png" alt="EBNA Logo" className="footer-logo-circle" />
              <div>
                <h2 className="brand-title-uppercase">EBNA</h2>
                <p className="brand-syndy-tagline">SYNDY LUXURY — Moda & Cosmética</p>
              </div>
            </div>
            
            <p style={{ fontSize: '0.82rem', color: '#64748B', margin: '0.6rem 0 1rem 0', lineHeight: 1.4 }}>
              Boutique exclusiva de alta perfumería, cosmética de tratamiento y ropa de lujo internacional.
            </p>

            <div className="footer-app-badges">
              <div className="platform-badges" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <a 
                  href="/downloads/ebna-luxury.apk" 
                  download="EBNA-Luxury.apk" 
                  className="platform-badge" 
                  style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }} 
                  title="Descargar APK Android"
                >
                  <Smartphone size={14} color="#D81B60" /> Android APK
                </a>
                <a 
                  href="/downloads/ebna-luxury.mobileconfig" 
                  download="EBNA-Luxury.mobileconfig" 
                  className="platform-badge" 
                  style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }} 
                  title="Instalar App iOS"
                >
                  <Apple size={14} color="#D81B60" /> iOS App
                </a>
                <button
                  type="button"
                  className="platform-badge qr-trigger-badge"
                  onClick={() => setIsQRModalOpen(true)}
                  style={{ border: 'none', cursor: 'pointer', font: 'inherit', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <QrCode size={14} color="#D81B60" /> Código QR App
                </button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links">
            <h3>Navegación</h3>
            <nav className="quick-links">
              <Link to="/">Inicio</Link>
              <Link to="/catalogo">Catálogo Completo</Link>
              <Link to="/login">Iniciar Sesión Cliente</Link>
            </nav>
          </div>

          {/* Direct Contact & Muni */}
          <div className="footer-contact">
            <h3>Atención & Pagos</h3>
            <div className="contact-links">
              <a href="https://wa.me/240222633687" target="_blank" rel="noopener noreferrer" className="contact-link">
                <MessageCircle size={18} className="text-ebna" />
                <div>
                  <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#1E293B' }}>+240 222 633 687</span>
                  <span style={{ fontSize: '0.72rem', color: '#64748B' }}>Atención General WhatsApp</span>
                </div>
              </a>
              <a href="https://wa.me/240555439904" target="_blank" rel="noopener noreferrer" className="contact-link">
                <Phone size={18} color="#64748B" />
                <div>
                  <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#1E293B' }}>+240 555 439 904</span>
                  <span style={{ fontSize: '0.72rem', color: '#64748B' }}>Servicio Muni Dinero</span>
                </div>
              </a>
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
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} EBNA Moda & Cosmética. Todos los derechos reservados. | Aplicación PWA compatible con Android, iOS y PC.</p>
        </div>
      </footer>

      {/* QR Code Modal */}
      <QRModal isOpen={isQRModalOpen} onClose={() => setIsQRModalOpen(false)} />
    </div>
  );
};
