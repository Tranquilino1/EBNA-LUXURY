import React, { useState } from 'react';
import { Link } from 'react-router';
import { Phone, MessageCircle, Sparkles, Share2, Heart, QrCode, Smartphone, Monitor, Apple } from 'lucide-react';
import { QRModal } from '../ui/QRModal';
import './layout.css';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);

  return (
    <footer className="footer glass-panel">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="footer-brand-row">
            <img src="/icons/ebna-logo.png" alt="EBNA Logo" className="footer-logo-circle" />
            <div>
              <h2 className="brand-title-uppercase">EBNA</h2>
              <p className="brand-syndy-tagline">SYNDY LUXURY — Moda & Cosmética de Lujo</p>
            </div>
          </div>
          
          <div className="footer-app-badges" onClick={() => setIsQRModalOpen(true)} style={{ cursor: 'pointer', marginTop: '1rem' }}>
            <div className="platform-badges" style={{ display: 'flex', gap: '8px' }}>
              <a href="/downloads/ebna-luxury.apk" download="EBNA-Luxury.apk" className="platform-badge" style={{ textDecoration: 'none' }} title="Descargar APK Android"><Smartphone size={14} /> Android APK</a>
              <a href="/downloads/ebna-luxury.mobileconfig" download="EBNA-Luxury.mobileconfig" className="platform-badge" style={{ textDecoration: 'none' }} title="Instalar App iOS"><Apple size={14} /> iOS App</a>
              <div className="platform-badge" onClick={() => setIsQRModalOpen(true)} style={{ cursor: 'pointer' }}><Monitor size={14} /> PC</div>
            </div>
            <p style={{ fontSize: '0.78rem', color: '#D81B60', marginTop: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}>
              <QrCode size={16} /> Escanea para la App en tu móvil
            </p>
          </div>
        </div>

        <div className="footer-contact">
          <h3>Contacto</h3>
          <div className="contact-links">
            <a href="https://wa.me/240222633687" target="_blank" rel="noopener noreferrer" className="contact-link">
              <MessageCircle size={18} className="text-ebna" /> +240 222 633 687 (WhatsApp)
            </a>
            <a href="https://wa.me/240555439904" target="_blank" rel="noopener noreferrer" className="contact-link" style={{ color: '#D97706', fontWeight: 600 }}>
              <Phone size={18} color="#D97706" /> +240 555 439 904 (Muni Dinero)
            </a>
          </div>
        </div>

        <div className="footer-links">
          <h3>Enlaces Rápidos</h3>
          <nav className="quick-links">
            <Link to="/">Inicio</Link>
            <Link to="/catalogo">Catálogo</Link>
            <Link to="/login">Iniciar Sesión</Link>
            <Link to="/admin/login" style={{ color: '#D97706', fontWeight: 700 }}>👑 Panel Admin</Link>
            <button 
              onClick={() => setIsQRModalOpen(true)} 
              style={{ background: 'none', border: 'none', color: '#D81B60', cursor: 'pointer', padding: 0, font: 'inherit', textAlign: 'left', fontWeight: 600 }}
            >
              📱 Código QR App
            </button>
          </nav>
        </div>

        <div className="footer-social">
          <h3>Síguenos en WhatsApp</h3>
          <div className="social-icons" style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <a
              href="https://whatsapp.com/channel/0029VbCGaZxGpLHLcSBIdi2Q"
              target="_blank"
              rel="noopener noreferrer"
              className="social-channel-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '20px',
                background: 'linear-gradient(135deg, #25D366, #128C7E)',
                color: 'white',
                fontWeight: 700,
                fontSize: '0.85rem',
                textDecoration: 'none',
                boxShadow: '0 4px 12px rgba(37,211,102,0.3)',
              }}
            >
              <MessageCircle size={18} />
              <span>Unirse al Canal de WhatsApp</span>
            </a>
            <div style={{ display: 'flex', gap: '0.6rem', marginTop: '0.2rem' }}>
              <a href="https://whatsapp.com/channel/0029VbCGaZxGpLHLcSBIdi2Q" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Canal WhatsApp"><MessageCircle size={22} color="#25D366" /></a>
              <a href="https://wa.me/240222633687" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Lujo"><Sparkles size={22} color="#D81B60" /></a>
              <a href="https://whatsapp.com/channel/0029VbCGaZxGpLHLcSBIdi2Q" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Favoritos"><Heart size={22} color="#D81B60" /></a>
              <a href="https://whatsapp.com/channel/0029VbCGaZxGpLHLcSBIdi2Q" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Compartir"><Share2 size={22} color="#D81B60" /></a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {currentYear} EBNA Moda & Cosmética. Todos los derechos reservados. | Aplicación PWA compatible con Android, iOS y PC.</p>
      </div>

      <QRModal isOpen={isQRModalOpen} onClose={() => setIsQRModalOpen(false)} />
    </footer>
  );
};
