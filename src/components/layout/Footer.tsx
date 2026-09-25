import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Phone, MessageCircle, Sparkles, Share2, Heart, QrCode, Smartphone, ChevronUp, ChevronDown, Headphones, MapPin, Mail } from 'lucide-react';
import { QRModal } from '../ui/QRModal';
import { ContactSupportModal } from '../ui/ContactSupportModal';
import { TikTokIcon } from '../ui/TikTokIcon';
import { useCustomization } from '../../contexts/CustomizationContext';
import { useTheme } from '../../contexts/ThemeContext';
import { ChristmasHat } from '../effects/ChristmasHat';
import './layout.css';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { settings, isChristmasActive } = useCustomization();
  const { theme } = useTheme();
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [isManuallyCollapsed, setIsManuallyCollapsed] = useState(false);

  const handleToggleFooter = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (isExpanded) {
      setIsExpanded(false);
      setIsManuallyCollapsed(true);
    } else {
      setIsExpanded(true);
      setIsManuallyCollapsed(false);
      setTimeout(() => {
        const footerEl = document.querySelector('.footer-wrapper');
        if (footerEl) {
          footerEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 80);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isManuallyCollapsed) return;

      const scrollPosition = window.innerHeight + window.scrollY;
      const threshold = document.documentElement.scrollHeight - 250;
      if (scrollPosition >= threshold && !isExpanded) {
        setIsExpanded(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isManuallyCollapsed, isExpanded]);

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
      className={`footer-wrapper ${isExpanded ? 'is-expanded' : 'is-collapsed'}`}
    >
      {/* Botón Exclusivo de Ocultar / Mostrar Pie de Página */}
      <button 
        type="button"
        className="footer-toggle-tab glass-panel"
        onClick={handleToggleFooter}
        title={isExpanded ? 'Ocultar pie de página' : 'Mostrar pie de página'}
        aria-expanded={isExpanded}
      >
        {isExpanded ? (
          <>
            <ChevronDown size={16} color="#D81B60" strokeWidth={2.5} />
            <span>Ocultar Pie de Página</span>
          </>
        ) : (
          <>
            <ChevronUp size={16} color="#D81B60" strokeWidth={2.5} />
            <span>Mostrar Pie de Página</span>
          </>
        )}
      </button>

      {/* Main Footer Body */}
      <footer className="footer glass-panel" aria-hidden={!isExpanded}>
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
              <img 
                key={theme}
                src={theme === 'dark' ? '/icons/ebna-logo-dark.png' : '/icons/ebna-logo-white.png'} 
                alt="EBNA Logo" 
                className="footer-logo-circle" 
                onError={(e) => { 
                  const img = e.currentTarget as HTMLImageElement;
                  const fallback = theme === 'dark' ? '/icons/ebna-logo-dark.png' : '/icons/ebna-logo-white.png';
                  if (img.src !== fallback) {
                    img.src = fallback;
                  }
                }}
              />
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
            <h3>Navegación</h3>
            <nav className="quick-links">
              <Link to="/">Inicio</Link>
              <Link to="/catalogo">Catálogo Completo</Link>
              <Link to="/recibo">Consultar Ticket / Recibo</Link>
              <Link to="/login">Iniciar Sesión Cliente</Link>
            </nav>
          </div>

          {/* Sede Física, Correo & Atención */}
          <div className="footer-contact">
            <h3>Sede Física & Contacto</h3>
            <div className="contact-links">
              {/* Sede Física en Mongomo con Enlace GPS Google Maps */}
              <a 
                href="https://goo.gl/maps/wn7YCzyVwkFNm1ns7"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link location-badge-link" 
                style={{ 
                  background: 'rgba(216, 27, 96, 0.05)',
                  padding: '10px 14px',
                  borderRadius: '14px',
                  border: '1px solid rgba(216, 27, 96, 0.16)',
                  alignItems: 'flex-start',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease'
                }}
                title="Abrir ubicación exacta en Google Maps (01°37′49.2″N 11°18′28.99″E)"
              >
                <MapPin size={20} style={{ color: 'var(--brand-accent)', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '0.86rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                      Sede Física: Mongomo
                    </span>
                    <span style={{ fontSize: '0.66rem', background: 'var(--brand-accent)', color: 'white', padding: '1px 5px', borderRadius: '6px', fontWeight: 700 }}>
                      GPS
                    </span>
                  </div>
                  <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', lineHeight: 1.4, display: 'block', marginTop: '2px' }}>
                    Barrio Koete • Al otro lado de la Agencia FORAMA
                  </span>
                  <span style={{ fontSize: '0.70rem', color: 'var(--brand-accent)', fontWeight: 600, display: 'block', marginTop: '4px' }}>
                    📍 Ver en Google Maps (01°37′49.2″N, 11°18′29.0″E) →
                  </span>
                </div>
              </a>

              {/* Correo Oficial de la Tienda */}
              <a 
                href="mailto:sindyluxury@gmail.com" 
                className="contact-link"
                title="Enviar correo electrónico oficial a sindyluxury@gmail.com"
              >
                <Mail size={18} style={{ color: 'var(--brand-accent)', flexShrink: 0 }} />
                <div>
                  <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    sindyluxury@gmail.com
                  </span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                    Correo Oficial de la Tienda
                  </span>
                </div>
              </a>

              {/* TikTok Oficial Enlace Directo */}
              <a 
                href="https://www.tiktok.com/@sindyluxury" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="contact-link"
                title="Perfil Oficial en TikTok @sindyluxury"
              >
                <TikTokIcon size={18} color="var(--brand-accent)" />
                <div>
                  <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    @sindyluxury
                  </span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                    TikTok Oficial de la Boutique
                  </span>
                </div>
              </a>

              {/* WhatsApp Concierge */}
              <a href="https://wa.me/240222633687" target="_blank" rel="noopener noreferrer" className="contact-link">
                <MessageCircle size={18} className="text-ebna" />
                <div>
                  <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>+240 222 633 687</span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Atención General WhatsApp</span>
                </div>
              </a>

              {/* Muni Dinero */}
              <a href="https://wa.me/240555439904" target="_blank" rel="noopener noreferrer" className="contact-link">
                <Phone size={18} color="var(--text-secondary)" />
                <div>
                  <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>+240 555 439 904</span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Servicio Muni Dinero</span>
                </div>
              </a>

              {/* Soporte Técnico */}
              <button
                type="button"
                onClick={() => setIsSupportModalOpen(true)}
                className="contact-link"
                style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left', width: '100%' }}
              >
                <Headphones size={18} color="#184266" />
                <div>
                  <span style={{ display: 'block', fontSize: '0.86rem', fontWeight: 700, color: 'var(--text-primary)' }}>Soporte Técnico Especializado</span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Incidencias (+240 555 32 00 17)</span>
                </div>
              </button>
            </div>
          </div>

          {/* Redes Sociales & Canales Oficiales */}
          <div className="footer-social">
            <h3>Redes & Canales Oficiales</h3>
            <div className="social-icons" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {/* Botón Destacado de TikTok Oficial */}
              <a
                href="https://www.tiktok.com/@sindyluxury"
                target="_blank"
                rel="noopener noreferrer"
                className="social-channel-btn"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 18px',
                  borderRadius: '24px',
                  background: 'linear-gradient(135deg, #050505, #1c000f)',
                  border: '1.5px solid rgba(254, 44, 85, 0.45)',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  textDecoration: 'none',
                  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.35)',
                  transition: 'all 0.2s ease',
                }}
                title="Seguir cuenta oficial en TikTok (@sindyluxury)"
              >
                <TikTokIcon size={20} variant="color" />
                <span>TikTok: @sindyluxury</span>
              </a>

              {/* Canal de Novedades WhatsApp */}
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
                title="Unirse al Canal Oficial de WhatsApp"
              >
                <MessageCircle size={18} />
                <span>Canal Oficial WhatsApp</span>
              </a>

              {/* Fila de Iconos Oficiales Directos */}
              <div style={{ display: 'flex', gap: '0.8rem', marginTop: '0.3rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <a 
                  href="https://www.tiktok.com/@sindyluxury" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-link" 
                  aria-label="TikTok Oficial @sindyluxury" 
                  title="TikTok Oficial @sindyluxury"
                  style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <TikTokIcon size={20} color="var(--text-primary)" />
                </a>

                <a 
                  href="mailto:sindyluxury@gmail.com" 
                  className="social-link" 
                  aria-label="Correo Oficial sindyluxury@gmail.com" 
                  title="Correo Oficial sindyluxury@gmail.com"
                  style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <Mail size={20} color="var(--brand-accent)" />
                </a>

                <a 
                  href="https://whatsapp.com/channel/0029VbCGaZxGpLHLcSBIdi2Q" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-link" 
                  aria-label="Canal WhatsApp" 
                  title="Canal Oficial WhatsApp"
                >
                  <MessageCircle size={20} color="#25D366" />
                </a>

                <a 
                  href="https://wa.me/240222633687?text=Quiero%20informaci%C3%B3n%20sobre%20la%20colecci%C3%B3n%20de%20lujo" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-link" 
                  aria-label="Consulta Lujo" 
                  title="Consulta de Lujo por WhatsApp"
                >
                  <Sparkles size={20} color="#D81B60" />
                </a>

                <Link to="/catalogo" className="social-link" aria-label="Catálogo Favoritos" title="Explorar Catálogo Exclusivo">
                  <Heart size={20} color="#D81B60" />
                </Link>

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
        
        <div className="footer-bottom" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', textAlign: 'center', paddingTop: '16px' }}>
          <button
            type="button"
            onClick={handleToggleFooter}
            className="footer-nav-search-pill glass-panel"
            style={{ padding: '6px 16px', borderRadius: '20px', marginBottom: '4px' }}
            title="Ocultar pie de página"
          >
            <ChevronDown size={14} strokeWidth={2.5} />
            <span>Ocultar Pie de Página</span>
          </button>
          <p style={{ margin: 0 }}>
            &copy; {currentYear} EBNA Moda & Cosmética. Todos los derechos reservados. | PWA Universal compatible con iOS, Android, Windows, Mac, Chromebook y Linux.
          </p>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <span>Tecnología y arquitectura desarrollada por <strong style={{ color: '#184266', fontWeight: 800 }}>AiDA</strong></span>
            <span>•</span>
            <a href="mailto:thetrapkinzofafrica@gmail.com" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>thetrapkinzofafrica@gmail.com</a>
            <span>•</span>
            <a href="tel:+240555320017" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>+240 555 32 00 17</a>
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
