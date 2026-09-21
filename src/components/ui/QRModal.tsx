import React from 'react';
import { createPortal } from 'react-dom';
import { QrCode, Smartphone, Monitor, Apple, Download, X, ExternalLink } from 'lucide-react';
import './qrModal.css';

interface QRModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QRModal: React.FC<QRModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="qr-modal-overlay" onClick={onClose}>
      <div className="qr-modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
        <button className="qr-modal-close" onClick={onClose} aria-label="Cerrar y salir del escaneo">
          <X size={24} />
        </button>

        <div className="qr-modal-header">
          <div className="qr-icon-badge">
            <QrCode size={28} color="#D81B60" />
          </div>
          <h2>Acceso Móvil & Descargas</h2>
          <p className="qr-subtitle">Escanea el QR o descarga directamente la aplicación para tu teléfono</p>
        </div>

        <div className="qr-image-container">
          <img 
            src="/icons/ebna-scannable-qr.png" 
            alt="Código QR EBNA Luxury" 
            className="qr-code-img"
          />
          <div className="qr-glow-ring"></div>
        </div>

        {/* Platform Badges with direct downloads */}
        <div className="platform-badges" style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '1.2rem' }}>
          <a 
            href="/downloads/ebna-luxury.apk" 
            download="EBNA-Luxury.apk"
            className="platform-badge"
            style={{ textDecoration: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(216, 27, 96, 0.12)', border: '1px solid rgba(216, 27, 96, 0.3)', color: '#D81B60', padding: '6px 12px', borderRadius: '20px', fontWeight: 700, fontSize: '0.8rem' }}
            title="Descargar APK para Android"
          >
            <Smartphone size={16} />
            <span>Descargar APK</span>
          </a>

          <a 
            href="/downloads/ebna-luxury.mobileconfig" 
            download="EBNA-Luxury.mobileconfig"
            className="platform-badge"
            style={{ textDecoration: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(216, 27, 96, 0.12)', border: '1px solid rgba(216, 27, 96, 0.3)', color: '#D81B60', padding: '6px 12px', borderRadius: '20px', fontWeight: 700, fontSize: '0.8rem' }}
            title="Instalar App en iOS (iPhone/iPad)"
          >
            <Apple size={16} />
            <span>App iOS</span>
          </a>

          <a 
            href="https://ebna-luxury.vercel.app" 
            target="_blank"
            rel="noopener noreferrer"
            className="platform-badge"
            style={{ textDecoration: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(216, 27, 96, 0.12)', border: '1px solid rgba(216, 27, 96, 0.3)', color: '#D81B60', padding: '6px 12px', borderRadius: '20px', fontWeight: 700, fontSize: '0.8rem' }}
            title="Abrir en PC / Escritorio"
          >
            <Monitor size={16} />
            <span>PC Web</span>
          </a>
        </div>

        <div className="qr-modal-info">
          <p className="app-status-badge">✨ Aplicación Nativa PWA & APK Oficial Lista</p>
          <p className="url-text">https://ebna-luxury.vercel.app</p>
        </div>

        <div className="qr-modal-actions">
          <a 
            href="/downloads/ebna-luxury.apk" 
            download="EBNA-Luxury.apk" 
            className="btn-qr-download"
            style={{ textDecoration: 'none' }}
          >
            <Download size={18} /> Descargar APK Android
          </a>
          <a 
            href="https://ebna-luxury.vercel.app" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-qr-open"
            style={{ textDecoration: 'none' }}
          >
            <ExternalLink size={18} /> Abrir Boutique Web
          </a>
        </div>
      </div>
    </div>,
    document.body
  );
};
