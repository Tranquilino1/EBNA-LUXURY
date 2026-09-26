import React, { useState, useEffect } from 'react';
import { MapPin, Mail, Headphones, MessageCircle, Share2, ChevronUp, ChevronDown, HelpCircle } from 'lucide-react';
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
    const message = `¡Descubre la boutique exclusiva Sindy Luxury by EBNA! Moda, perfumería y cosmética de lujo en Guinea Ecuatorial: ${url}`;
    if (navigator.share) {
      navigator.share({
        title: 'Sindy Luxury by EBNA — Alta Costura',
        text: 'Descubre la boutique exclusiva de Sindy Luxury by EBNA.',
        url: url,
      }).catch(() => {
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`, '_blank');
      });
    } else {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`, '_blank');
    }
  };

  return (
    <div className={`footer-wrapper ${isExpanded ? 'is-expanded' : 'is-collapsed'}`}>
      {/* Botón de Ocultar / Mostrar Pie de Página */}
      <button 
        type="button"
        className="footer-toggle-tab glass-panel"
        onClick={handleToggleFooter}
        title={isExpanded ? 'Ocultar pie de página' : 'Mostrar pie de página'}
        aria-expanded={isExpanded}
      >
        {isExpanded ? (
          <>
            <ChevronDown size={15} color="var(--brand-accent)" strokeWidth={2.5} />
            <span>Ocultar Pie de Página</span>
          </>
        ) : (
          <>
            <ChevronUp size={15} color="var(--brand-accent)" strokeWidth={2.5} />
            <span>Mostrar Pie de Página</span>
          </>
        )}
      </button>

      {/* Main Minimal Luxury Footer */}
      <footer className="footer glass-panel footer-minimal-luxury" aria-hidden={!isExpanded}>
        <div className="footer-content-minimal">
          {/* Circular Refined Logo & Brand Title with Circular Padding */}
          <div className="footer-brand-minimal">
            <div className="footer-logo-circle-container">
              {isChristmasActive && settings.christmasHats && (
                <ChristmasHat 
                  size={26} 
                  style={{ 
                    position: 'absolute', 
                    top: '-10px', 
                    left: '-6px', 
                    transform: 'rotate(-18deg)',
                    zIndex: 10
                  }} 
                />
              )}
              <img 
                key={theme}
                src={theme === 'dark' ? '/icons/ebna-logo-dark.png' : '/icons/ebna-logo-white.png'} 
                alt="Sindy Luxury Logo" 
                className="footer-logo-refined-round"
                onError={(e) => { 
                  const img = e.currentTarget as HTMLImageElement;
                  const fallback = theme === 'dark' ? '/icons/ebna-logo-dark.png' : '/icons/ebna-logo-white.png';
                  if (img.src !== fallback) {
                    img.src = fallback;
                  }
                }}
              />
            </div>
            <div className="footer-brand-text">
              <h2 className="brand-title-minimal">SINDY LUXURY</h2>
              <p className="brand-tagline-minimal">HAUTE COUTURE BY EBNA</p>
            </div>
          </div>

          {/* Essential Direct Contact Badges */}
          <div className="footer-contacts-row">
            {/* Ubicación Profesional en Mongomo */}
            <a 
              href="https://goo.gl/maps/wn7YCzyVwkFNm1ns7"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-contact-chip"
              title="Sede Física: Mongomo, Barrio Koete (Ver en Google Maps)"
            >
              <div className="footer-chip-icon-box location-pin">
                <MapPin size={17} />
              </div>
              <div className="footer-chip-text">
                <span className="footer-chip-title">Sede Física Mongomo</span>
                <span className="footer-chip-sub">Barrio Koete (Google Maps)</span>
              </div>
            </a>

            {/* Correo Oficial */}
            <a 
              href="mailto:sindyluxury@gmail.com" 
              className="footer-contact-chip"
              title="Escribir al Correo Oficial sindyluxury@gmail.com"
            >
              <div className="footer-chip-icon-box mail-box">
                <Mail size={17} />
              </div>
              <div className="footer-chip-text">
                <span className="footer-chip-title">sindyluxury@gmail.com</span>
                <span className="footer-chip-sub">Atención Oficial</span>
              </div>
            </a>

            {/* Soporte Técnico */}
            <button
              type="button"
              onClick={() => setIsSupportModalOpen(true)}
              className="footer-contact-chip footer-chip-btn"
              title="Abrir Asistencia de Soporte Técnico Especializado"
            >
              <div className="footer-chip-icon-box support-box">
                <Headphones size={17} />
              </div>
              <div className="footer-chip-text">
                <span className="footer-chip-title">Soporte Técnico</span>
                <span className="footer-chip-sub">+240 555 32 00 17</span>
              </div>
            </button>

            {/* Preguntas Frecuentes FAQ */}
            <a 
              href="/#faq" 
              className="footer-contact-chip"
              title="Preguntas Frecuentes sobre envíos, pagos en FCFA y garantías"
            >
              <div className="footer-chip-icon-box faq-box" style={{ color: '#D4AF37' }}>
                <HelpCircle size={17} />
              </div>
              <div className="footer-chip-text">
                <span className="footer-chip-title">Dudas Frecuentes</span>
                <span className="footer-chip-sub">Envíos, Pagos & FAQ</span>
              </div>
            </a>
          </div>

          {/* Pure Social Icons */}
          <div className="footer-social-icons-minimal">
            <a 
              href="https://wa.me/240555633687" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="footer-pure-icon-btn whatsapp" 
              aria-label="Atención WhatsApp" 
              title="WhatsApp Concierge (+240 555 633 687)"
            >
              <MessageCircle size={20} />
            </a>

            <a 
              href="https://www.tiktok.com/@sindyluxury" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="footer-pure-icon-btn tiktok" 
              aria-label="TikTok Oficial" 
              title="TikTok Oficial (@sindyluxury)"
            >
              <TikTokIcon size={19} />
            </a>

            <button 
              type="button" 
              onClick={handleShareWhatsApp} 
              className="footer-pure-icon-btn share" 
              aria-label="Compartir" 
              title="Compartir boutique en WhatsApp"
            >
              <Share2 size={19} />
            </button>
          </div>
        </div>

        {/* Minimal Copyright */}
        <div className="footer-copyright-minimal">
          <p>&copy; {currentYear} Sindy Luxury by EBNA. Todos los derechos reservados.</p>
        </div>
      </footer>

      {/* Support & Contact Modal */}
      <ContactSupportModal isOpen={isSupportModalOpen} onClose={() => setIsSupportModalOpen(false)} />
    </div>
  );
};
