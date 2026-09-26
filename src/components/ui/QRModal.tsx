import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  Smartphone, Monitor, Apple, Download, X, 
  CheckCircle, Sparkles, Laptop, ShieldCheck 
} from 'lucide-react';
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
      // Toggle device specific installation guide
      setShowGuide(true);
    }
  };

  const devices = [
    { label: 'iOS (iPhone/iPad)', icon: <Apple size={14} /> },
    { label: 'Android', icon: <Smartphone size={14} /> },
    { label: 'Windows', icon: <Monitor size={14} /> },
    { label: 'macOS', icon: <Laptop size={14} /> },
    { label: 'Chromebook', icon: <Laptop size={14} /> },
    { label: 'Linux', icon: <Monitor size={14} /> },
  ];

  return createPortal(
    <div className="qr-modal-overlay" onClick={onClose}>
      <div className="qr-modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
        <button className="qr-modal-close" onClick={onClose} aria-label="Cerrar modal de aplicación">
          <X size={20} />
        </button>

        <div className="qr-modal-header">
          <div className="qr-icon-badge">
            <Sparkles size={24} color="#D81B60" />
          </div>
          <h2>Aplicación Oficial EBNA Luxury</h2>
          <p className="qr-subtitle">
            Tecnología PWA Universal: descarga e instalación directa y ligera para cualquier tipo de dispositivo sin ocupar espacio de almacenamiento.
          </p>
        </div>

        {/* Scannable Luxury QR */}
        <div className="qr-image-container">
          <img 
            src="/icons/ebna-scannable-qr.png" 
            alt="Código QR Oficial EBNA Luxury" 
            className="qr-code-img"
          />
          <div className="qr-glow-ring"></div>
        </div>

        {/* Universal Compatibility Badges */}
        <div className="universal-devices-container">
          <div className="universal-devices-label">
            <ShieldCheck size={14} color="#10B981" />
            <span>Disponible e Instalable en Todos los Dispositivos:</span>
          </div>
          <div className="universal-badges-grid">
            {devices.map(d => (
              <span key={d.label} className="universal-device-chip">
                {d.icon}
                <span>{d.label}</span>
              </span>
            ))}
          </div>
        </div>

        {installedSuccess ? (
          <div style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)', color: '#15803D', padding: '12px 16px', borderRadius: '16px', margin: '1rem 0', fontSize: '0.88rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
            <CheckCircle size={18} /> ¡Aplicación instalada con éxito en tu pantalla de inicio!
          </div>
        ) : (
          /* Single Unified Universal PWA Download / Install Action & Android APK */
          <div className="qr-modal-actions" style={{ marginTop: '1.2rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <a 
              href="/ebna-sindy-luxury.apk"
              download="EBNA_Sindy_Luxury.apk"
              className="btn-qr-download"
              style={{ width: '100%', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px 20px', borderRadius: '16px', fontSize: '0.92rem', fontWeight: 800, background: 'linear-gradient(135deg, #10B981, #059669)', color: '#FFFFFF', boxShadow: '0 4px 16px rgba(16, 185, 129, 0.35)' }}
            >
              <Smartphone size={19} />
              <span>Descargar APK Nativo para Android (529 KB)</span>
            </a>
            <button 
              type="button"
              onClick={handleInstallUniversalPWA} 
              className="btn-qr-download"
              style={{ width: '100%', cursor: 'pointer', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '11px 20px', borderRadius: '16px', fontSize: '0.88rem', fontWeight: 700, background: 'linear-gradient(135deg, #D81B60, #C2185B)', color: '#FFFFFF', boxShadow: '0 4px 14px rgba(216, 27, 96, 0.3)' }}
            >
              <Download size={18} />
              <span>Instalar como App PWA (iPhone / PC)</span>
            </button>
          </div>
        )}

        {/* Universal 1-Step Guide Accordion */}
        {showGuide && (
          <div style={{ marginTop: '1.2rem', padding: '1.1rem', background: '#FFFFFF', borderRadius: '16px', border: '1.5px solid rgba(216,27,96,0.25)', textAlign: 'left', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
            <h4 style={{ fontSize: '0.88rem', fontWeight: 800, color: '#1E293B', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>📲 Instrucciones de Instalación Inmediata:</span>
            </h4>
            {isIOS ? (
              <ol style={{ fontSize: '0.82rem', color: '#475569', paddingLeft: '1.2rem', lineHeight: 1.6, margin: 0 }}>
                <li>En Safari, toca el icono <strong>Compartir</strong> (rectángulo con flecha hacia arriba).</li>
                <li>Desliza hacia abajo y selecciona <strong>"Añadir a pantalla de inicio"</strong>.</li>
                <li>Pulsa <strong>Añadir</strong> en la esquina superior derecha.</li>
              </ol>
            ) : (
              <ol style={{ fontSize: '0.82rem', color: '#475569', paddingLeft: '1.2rem', lineHeight: 1.6, margin: 0 }}>
                <li>En Chrome o Edge, pulsa los <strong>tres puntos</strong> arriba a la derecha o el icono <strong>Instalar</strong> en la barra de direcciones.</li>
                <li>Selecciona <strong>"Instalar Sindy Luxury by EBNA"</strong>.</li>
                <li>¡Listo! La tienda se abrirá como una aplicación nativa ultra-rápida.</li>
              </ol>
            )}
          </div>
        )}

        <div className="qr-modal-footer-note" style={{ marginTop: '1rem', fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
          https://ebna-luxury.vercel.app • Actualizaciones automáticas y funcionamiento sin conexión
        </div>
      </div>
    </div>,
    document.body
  );
};
