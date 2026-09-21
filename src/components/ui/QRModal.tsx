import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { QrCode, Smartphone, Monitor, Apple, Download, X, ExternalLink, CheckCircle } from 'lucide-react';
import './qrModal.css';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface QRModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QRModal: React.FC<QRModalProps> = ({ isOpen, onClose }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isAndroid, setIsAndroid] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [installedSuccess, setInstalledSuccess] = useState(false);

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    setIsAndroid(/android/.test(userAgent));
    setIsIOS(/iphone|ipad|ipod/.test(userAgent));

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  if (!isOpen) return null;

  const handleInstallAndroid = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        setInstalledSuccess(true);
        setTimeout(() => onClose(), 2000);
      }
      setDeferredPrompt(null);
    } else {
      // Fallback direct APK download link trigger
      const link = document.createElement('a');
      link.href = '/downloads/ebna-luxury.apk';
      link.download = 'EBNA-Luxury.apk';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleInstallIOS = () => {
    setShowIOSGuide(true);
  };

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
          <h2>Acceso Móvil & Aplicación</h2>
          <p className="qr-subtitle">Escanea el QR o instala la aplicación oficial directamente en tu teléfono</p>
        </div>

        <div className="qr-image-container">
          <img 
            src="/icons/ebna-scannable-qr.png" 
            alt="Código QR EBNA Luxury" 
            className="qr-code-img"
          />
          <div className="qr-glow-ring"></div>
        </div>

        {installedSuccess && (
          <div style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)', color: '#15803D', padding: '10px 14px', borderRadius: '14px', marginBottom: '1rem', fontSize: '0.85rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
            <CheckCircle size={18} /> ¡Instalación iniciada correctamente en tu teléfono!
          </div>
        )}

        {/* Platform Badges with direct downloads */}
        <div className="platform-badges" style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '1.2rem', flexWrap: 'wrap' }}>
          <button 
            onClick={handleInstallAndroid}
            className="platform-badge"
            style={{ border: '1px solid rgba(216, 27, 96, 0.3)', background: 'rgba(216, 27, 96, 0.12)', color: '#D81B60', padding: '6px 12px', borderRadius: '20px', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
            title="Instalar App APK en Android"
          >
            <Smartphone size={16} />
            <span>Instalar Android APK</span>
          </button>

          <button 
            onClick={handleInstallIOS}
            className="platform-badge"
            style={{ border: '1px solid rgba(216, 27, 96, 0.3)', background: 'rgba(216, 27, 96, 0.12)', color: '#D81B60', padding: '6px 12px', borderRadius: '20px', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
            title="Instalar App en iPhone/iPad"
          >
            <Apple size={16} />
            <span>{isIOS ? 'App para iPhone' : 'App iOS'}</span>
          </button>

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
          <p className="app-status-badge">✨ Aplicación Nativa Con Icono & Pantalla de Carga</p>
          <p className="url-text">https://ebna-luxury.vercel.app</p>
        </div>

        <div className="qr-modal-actions">
          <button 
            onClick={handleInstallAndroid} 
            className="btn-qr-download"
            style={{ cursor: 'pointer', border: 'none' }}
          >
            <Download size={18} /> {isAndroid ? 'Instalar App en Android' : 'Descargar APK Android'}
          </button>
          <a 
            href="https://ebna-luxury.vercel.app" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-qr-open"
            style={{ textDecoration: 'none' }}
          >
            <ExternalLink size={18} /> Abrir Web
          </a>
        </div>

        {/* Modal Guiado iOS */}
        {showIOSGuide && (
          <div style={{ marginTop: '1.2rem', padding: '1rem', background: '#FFFFFF', borderRadius: '16px', border: '1px solid rgba(216,27,96,0.3)', textAlign: 'left' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#1E293B', marginBottom: '0.6rem' }}>📱 Cómo instalar en iPhone / iPad:</h4>
            <ol style={{ fontSize: '0.82rem', color: '#64748B', paddingLeft: '1.2rem', lineHeight: 1.5, margin: 0 }}>
              <li>Toca el botón <strong>Compartir</strong> en la barra inferior de Safari.</li>
              <li>Selecciona <strong>"Añadir a la pantalla de inicio"</strong>.</li>
              <li>Pulsa <strong>Añadir</strong> arriba a la derecha. ¡Listo!</li>
            </ol>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};
