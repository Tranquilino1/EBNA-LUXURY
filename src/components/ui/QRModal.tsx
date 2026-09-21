import React from 'react';
import { QrCode, Smartphone, Monitor, Apple, Download, X, ExternalLink } from 'lucide-react';
import './qrModal.css';

interface QRModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QRModal: React.FC<QRModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="qr-modal-overlay" onClick={onClose}>
      <div className="qr-modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
        <button className="qr-modal-close" onClick={onClose} aria-label="Cerrar y salir del escaneo">
          <X size={24} />
        </button>

        <div className="qr-modal-header">
          <div className="qr-icon-badge">
            <QrCode size={28} color="#D81B60" />
          </div>
          <h2>Acceso Móvil & Código QR</h2>
          <p className="qr-subtitle">Escanea para abrir en cualquier dispositivo • Toca [X] para salir</p>
        </div>

        <div className="qr-image-container">
          <img 
            src="/icons/ebna-scannable-qr.png" 
            alt="Código QR EBNA Luxury" 
            className="qr-code-img"
          />
          <div className="qr-glow-ring"></div>
        </div>

        <div className="platform-badges">
          <div className="platform-badge">
            <Smartphone size={16} />
            <span>Android</span>
          </div>
          <div className="platform-badge">
            <Apple size={16} />
            <span>iOS</span>
          </div>
          <div className="platform-badge">
            <Monitor size={16} />
            <span>PC</span>
          </div>
        </div>

        <div className="qr-modal-info">
          <p className="app-status-badge">✨ Aplicación PWA Oficial Lista para Instalar</p>
          <p className="url-text">https://ebna-luxury.vercel.app</p>
        </div>

        <div className="qr-modal-actions">
          <a 
            href="/icons/ebna-scannable-qr.png" 
            download="EBNA-Luxury-QR.png" 
            className="btn-qr-download"
          >
            <Download size={18} /> Descargar QR HD
          </a>
          <a 
            href="https://ebna-luxury.vercel.app" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-qr-open"
          >
            <ExternalLink size={18} /> Abrir Web
          </a>
        </div>
      </div>
    </div>
  );
};

