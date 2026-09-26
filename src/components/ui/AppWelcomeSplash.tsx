import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { isStandaloneApp } from '../../lib/deviceDetection';
import './welcomeSplash.css';

export const AppWelcomeSplash: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [progress, setProgress] = useState(12);
  const [loadingStep, setLoadingStep] = useState('Iniciando boutique de alta costura...');

  useEffect(() => {
    // Check if opened from Android APK, standalone PWA, or explicit parameter
    const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
    const isAppParam = urlParams?.has('app') || urlParams?.has('apk') || urlParams?.has('welcome');
    const isStandalone = isStandaloneApp();
    const hasSeenWelcome = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('ebna_app_splash_seen') : null;

    // Show splash if in app or explicitly requested, or once per session on mobile devices
    if ((isAppParam || isStandalone || !hasSeenWelcome) && typeof window !== 'undefined' && window.innerWidth < 850) {
      setIsVisible(true);
      sessionStorage.setItem('ebna_app_splash_seen', 'true');

      // Animate progress smoothly
      const t1 = setTimeout(() => {
        setProgress(48);
        setLoadingStep('Sincronizando 188 colecciones exclusivas...');
      }, 700);

      const t2 = setTimeout(() => {
        setProgress(88);
        setLoadingStep('Afinando pasarelas, calzado y fragancias...');
      }, 1500);

      const t3 = setTimeout(() => {
        setProgress(100);
        setLoadingStep('¡Bienvenido a EBNA Luxury Total!');
      }, 2300);

      const t4 = setTimeout(() => {
        handleDismiss();
      }, 3100);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
      };
    }
  }, []);

  const handleDismiss = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 450);
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`app-welcome-splash-root ${isFadingOut ? 'fade-out' : ''}`}
      role="dialog"
      aria-label="Bienvenida a EBNA Luxury Total"
    >
      {/* 3D Atmospheric Background */}
      <div className="splash-ambient-glow"></div>
      <div className="splash-grid-mesh"></div>

      {/* Main Glass Card */}
      <div className="splash-3d-card glass-panel">
        {/* Animated 3D Floating Crest / Rings */}
        <div className="splash-3d-crest-wrap">
          <div className="splash-orbit-ring ring-1"></div>
          <div className="splash-orbit-ring ring-2"></div>
          <div className="splash-orbit-ring ring-3"></div>
          
          <div className="splash-logo-circle">
            <img 
              src="/icons/ebna-logo-white.png" 
              alt="EBNA Luxury" 
              className="splash-logo-img"
              onError={(e) => {
                e.currentTarget.src = '/icons/icon-512x512.png';
              }}
            />
          </div>
        </div>

        {/* Brand Typography */}
        <div className="splash-text-group">
          <div className="splash-badge-pill">
            <Sparkles size={12} color="#D4AF37" />
            <span>HAUTE COUTURE • MALABO</span>
            <Sparkles size={12} color="#D4AF37" />
          </div>

          <h2 className="splash-pretitle">BIENVENIDO A</h2>
          <h1 className="splash-main-title">
            <span className="splash-title-brand">EBNA LUXURY</span>
            <span className="splash-title-sub">TOTAL</span>
          </h1>

          <p className="splash-description">
            Tu boutique móvil de alta costura, calzado joya y cosmética de lujo con entregas en Guinea Ecuatorial.
          </p>
        </div>

        {/* 3D Dynamic Progress Loader */}
        <div className="splash-progress-container">
          <div className="splash-progress-bar-track">
            <div 
              className="splash-progress-bar-fill" 
              style={{ width: `${progress}%` }}
            >
              <div className="splash-progress-sparkle"></div>
            </div>
          </div>
          <div className="splash-progress-info">
            <span className="splash-status-text">{loadingStep}</span>
            <span className="splash-percentage-text">{progress}%</span>
          </div>
        </div>

        {/* Action Button: Skip/Enter immediately */}
        <div className="splash-bottom-actions">
          <button 
            type="button" 
            className="splash-enter-btn"
            onClick={handleDismiss}
          >
            <span>Entrar a la Boutique</span>
            <ArrowRight size={16} />
          </button>
          <div className="splash-security-tag">
            <ShieldCheck size={13} color="#10B981" />
            <span>Aplicación Móvil Oficial Verificada</span>
          </div>
        </div>
      </div>
    </div>
  );
};
