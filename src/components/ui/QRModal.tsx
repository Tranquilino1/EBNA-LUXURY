import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  Smartphone, Download, X, CheckCircle2, Camera, Apple, Monitor 
} from 'lucide-react';
import { useModalLock } from '../../hooks/useModalLock';
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
  const [isIOS, setIsIOS] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [installedSuccess, setInstalledSuccess] = useState(false);

  // Background isolation, touch lock, and Escape key listener
  useModalLock(isOpen, onClose);

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    setIsIOS(/iphone|ipad|ipod/.test(userAgent));

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  if (!isOpen) return null;

  const handleInstallUniversalPWA = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        setInstalledSuccess(true);
        setTimeout(() => onClose(), 2200);
      }
      setDeferredPrompt(null);
    } else {
      setShowGuide(prev => !prev);
    }
  };

  return createPortal(
    <div className="qr-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="qr-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button 
          className="qr-modal-close-btn" 
          onClick={onClose} 
          aria-label="Cerrar ventana QR"
          title="Cerrar (ESC)"
        >
          <X size={18} />
        </button>

        {/* Brand Header */}
        <div className="qr-card-header">
          <div className="qr-brand-emblem">
            <img 
              src="/icons/icon-512x512.png" 
              alt="EBNA Sindy Luxury" 
              className="qr-brand-logo" 
            />
          </div>
          <h2 className="qr-card-title">SINDY LUXURY</h2>
          <p className="qr-card-subtitle">
            Escanea con tu cámara o descarga la app oficial
          </p>
        </div>

        {/* Centerpiece Luxury QR Plaque */}
        <div className="qr-plaque-wrapper">
          <div className="qr-code-frame">
            <img 
              src="/icons/ebna-scannable-qr.png" 
              alt="Código QR Oficial EBNA Luxury" 
              className="qr-code-graphic" 
            />
          </div>
          <div className="qr-scan-badge">
            <Camera size={13} />
            <span>Apunta con la cámara de tu teléfono</span>
          </div>
        </div>

        {/* Direct Action Buttons */}
        {installedSuccess ? (
          <div className="qr-installed-alert">
            <CheckCircle2 size={18} />
            <span>¡App añadida a tu pantalla de inicio!</span>
          </div>
        ) : (
          <div className="qr-card-actions">
            <a 
              href="/ebna-sindy-luxury.apk"
              download="EBNA_Sindy_Luxury.apk"
              className="qr-btn-primary"
            >
              <Smartphone size={17} />
              <span>Descargar APK Android</span>
            </a>

            <button 
              type="button"
              onClick={handleInstallUniversalPWA} 
              className="qr-btn-secondary"
            >
              <Download size={16} />
              <span>Instalar en Pantalla de Inicio</span>
            </button>
          </div>
        )}

        {/* Guided Quick Tips (Expandable) */}
        {showGuide && (
          <div className="qr-quick-guide">
            <div className="qr-guide-header">
              {isIOS ? <Apple size={15} /> : <Monitor size={15} />}
              <span>Instalación rápida en tu dispositivo:</span>
            </div>
            {isIOS ? (
              <ol className="qr-guide-steps">
                <li>Toca el botón <strong>Compartir</strong> (icono de cuadrado con flecha).</li>
                <li>Selecciona <strong>"Añadir a pantalla de inicio"</strong>.</li>
                <li>Pulsa <strong>Añadir</strong> arriba a la derecha.</li>
              </ol>
            ) : (
              <ol className="qr-guide-steps">
                <li>En tu navegador, abre el menú de opciones (<strong>⋮</strong>).</li>
                <li>Pulsa <strong>"Instalar aplicación"</strong> o "Añadir a inicio".</li>
                <li>¡Listo para acceder al instante!</li>
              </ol>
            )}
          </div>
        )}

        <div className="qr-card-footer">
          <span>ebna-luxury.vercel.app • Malabo, Guinea Ecuatorial</span>
        </div>
      </div>
    </div>,
    document.body
  );
};
