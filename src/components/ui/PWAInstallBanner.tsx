import React, { useState, useEffect } from 'react';
import { Download, Share, X, Smartphone, CheckCircle } from 'lucide-react';
import './pwaBanner.css';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const PWAInstallBanner: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if app is already running as PWA standalone
    const isAppStandalone = 
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true;

    if (isAppStandalone) {
      setIsStandalone(true);
      return;
    }

    // Check if iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    // Listen for Android / Chrome install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // If iOS and not standalone, show banner after 2 seconds if not dismissed previously
    const dismissed = localStorage.getItem('ebna_pwa_dismissed');
    if (isIosDevice && !dismissed && !isAppStandalone) {
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 2000);
      return () => clearTimeout(timer);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const isAndroid = /android/i.test(window.navigator.userAgent);

  const handleInstallClick = async () => {
    // Direct APK download for Android users
    if (isAndroid) {
      const a = document.createElement('a');
      a.href = '/ebna-sindy-luxury.apk';
      a.download = 'EBNA_Sindy_Luxury.apk';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setShowBanner(false);
      return;
    }

    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setShowBanner(false);
      }
      setDeferredPrompt(null);
    } else if (isIOS) {
      setShowIOSGuide(true);
    }
  };

  const handleDismiss = () => {
    setShowBanner(false);
    setShowIOSGuide(false);
    localStorage.setItem('ebna_pwa_dismissed', 'true');
  };

  if (isStandalone || !showBanner) return null;

  return (
    <>
      <div className="pwa-install-banner animate-fade-in-up">
        <div className="pwa-banner-content">
          <div className="pwa-icon-wrapper">
            <img src="/icons/icon-192x192.png" alt="EBNA App" className="pwa-app-icon" />
          </div>
          <div className="pwa-banner-text">
            <h4>{isAndroid ? '👑 App Oficial EBNA Sindy Luxury' : 'Instala la App de EBNA'}</h4>
            <p>
              {isAndroid 
                ? 'Descarga e instala la aplicación oficial (.APK) en tu Android para comprar en un clic.' 
                : 'Acceso rápido a moda, cosmética y ofertas sin necesidad de descargas pesadas.'}
            </p>
          </div>
        </div>

        <div className="pwa-banner-actions">
          <button onClick={handleInstallClick} className="btn-pwa-install">
            <Download size={16} />
            <span>{isAndroid ? 'Descargar App (.APK)' : isIOS ? 'Instalar en iPhone' : 'Instalar App'}</span>
          </button>
          <button onClick={handleDismiss} className="btn-pwa-close" aria-label="Cerrar">
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Modal Guiado para iOS */}
      {showIOSGuide && (
        <div className="pwa-modal-overlay" onClick={() => setShowIOSGuide(false)}>
          <div className="pwa-modal-content glass-modal" onClick={e => e.stopPropagation()}>
            <button className="pwa-modal-close" onClick={() => setShowIOSGuide(false)}>
              <X size={20} />
            </button>
            <div className="pwa-modal-header">
              <Smartphone size={36} className="ios-icon-glow" />
              <h3>Instalar EBNA en tu iPhone / iPad</h3>
            </div>
            <div className="pwa-modal-body">
              <ol className="ios-steps">
                <li>
                  <span className="step-num">1</span>
                  <span>Toca el botón <strong>Compartir</strong> <Share size={18} style={{ display: 'inline', verticalAlign: 'middle', color: '#007AFF' }} /> en el menú inferior de Safari.</span>
                </li>
                <li>
                  <span className="step-num">2</span>
                  <span>Desplázate hacia abajo y selecciona <strong>"Añadir a la pantalla de inicio"</strong>.</span>
                </li>
                <li>
                  <span className="step-num">3</span>
                  <span>Haz clic en <strong>Añadir</strong> arriba a la derecha. ¡Listo!</span>
                </li>
              </ol>
            </div>
            <button onClick={() => setShowIOSGuide(false)} className="btn-primary full-width">
              <CheckCircle size={18} /> Entendido
            </button>
          </div>
        </div>
      )}
    </>
  );
};

