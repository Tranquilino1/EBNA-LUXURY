import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { isStandaloneApp } from '../../lib/deviceDetection';
import './welcomeSplash.css';

interface FloatingItem {
  id: number;
  icon: string;
  label: string;
  className: string;
}

const CELESTIAL_3D_ITEMS: FloatingItem[] = [
  { id: 1, icon: '👗', label: 'Vestido Gala', className: 'celestial-item-1' },
  { id: 2, icon: '👜', label: 'Bolso Clutch', className: 'celestial-item-2' },
  { id: 3, icon: '👠', label: 'Calzado Joya', className: 'celestial-item-3' },
  { id: 4, icon: '💎', label: 'Diamante', className: 'celestial-item-4' },
  { id: 5, icon: '✨', label: 'Estrella Dorada', className: 'celestial-item-5' },
  { id: 6, icon: '🌸', label: 'Alta Cosmética', className: 'celestial-item-6' },
];

export const AppWelcomeSplash: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loadingStep, setLoadingStep] = useState('Iniciando boutique de alta costura...');
  const animIntervalRef = useRef<number | null>(null);

  // SVG circular dimensions
  const circleRadius = 54;
  const circumference = 2 * Math.PI * circleRadius; // ~339.29
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  useEffect(() => {
    // Check if opened from Android APK, standalone PWA, or explicit parameter
    const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
    const isAppParam = urlParams?.has('app') || urlParams?.has('apk') || urlParams?.has('welcome');
    const isStandalone = isStandaloneApp();
    const hasSeenWelcome = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('ebna_app_splash_seen') : null;

    // Show splash if in app, requested explicitly, or on mobile session
    if ((isAppParam || isStandalone || !hasSeenWelcome) && typeof window !== 'undefined' && window.innerWidth < 850) {
      setIsVisible(true);
      sessionStorage.setItem('ebna_app_splash_seen', 'true');

      // 6 to 8 seconds duration: 7000ms smooth timer
      const TOTAL_DURATION_MS = 7000;
      const INTERVAL_MS = 50;

      const startTime = Date.now();

      animIntervalRef.current = window.setInterval(() => {
        const elapsed = Date.now() - startTime;
        const currentProgress = Math.min(100, Math.round((elapsed / TOTAL_DURATION_MS) * 100));
        
        setProgress(currentProgress);

        if (currentProgress < 22) {
          setLoadingStep('Iniciando boutique de alta costura...');
        } else if (currentProgress < 48) {
          setLoadingStep('Cargando colecciones de vestidos y pasarela...');
        } else if (currentProgress < 72) {
          setLoadingStep('Sincronizando calzado joya y bolsos de lujo...');
        } else if (currentProgress < 94) {
          setLoadingStep('Afinando fragancias y cosmética botánica...');
        } else {
          setLoadingStep('¡Bienvenido a Sindy Luxury by EBNA!');
        }

        if (currentProgress >= 100) {
          if (animIntervalRef.current) clearInterval(animIntervalRef.current);
          window.setTimeout(() => {
            handleDismiss();
          }, 600);
        }
      }, INTERVAL_MS);

      return () => {
        if (animIntervalRef.current) clearInterval(animIntervalRef.current);
      };
    }
  }, []);

  const handleDismiss = () => {
    if (animIntervalRef.current) clearInterval(animIntervalRef.current);
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
      aria-label="Bienvenida a Sindy Luxury by EBNA"
    >
      {/* 3D Atmospheric Celestial Background & Starlight */}
      <div className="splash-ambient-glow"></div>
      <div className="splash-celestial-dust"></div>
      <div className="splash-grid-mesh"></div>

      {/* Floating 3D Celestial Objects (Dresses, Bags, Diamonds, Shoes) */}
      <div className="splash-3d-celestial-scene" aria-hidden="true">
        {CELESTIAL_3D_ITEMS.map((item) => (
          <div key={item.id} className={`floating-3d-item ${item.className}`}>
            <span className="floating-item-icon">{item.icon}</span>
          </div>
        ))}
      </div>

      {/* Main Glassmorphic Celestial Plaque */}
      <div className="splash-3d-card glass-panel">
        
        {/* Celestial Circular Progress Ring with Round Plaque Logo */}
        <div className="splash-circular-loader-wrap">
          {/* Rotating celestial starlight halo */}
          <div className="splash-celestial-halo-spin"></div>
          <div className="splash-orbit-ring ring-1"></div>
          <div className="splash-orbit-ring ring-2"></div>

          {/* SVG Progress Circle */}
          <svg className="splash-svg-ring" viewBox="0 0 130 130">
            <defs>
              <linearGradient id="celestialGoldGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFE082" />
                <stop offset="45%" stopColor="#D4AF37" />
                <stop offset="85%" stopColor="#D81B60" />
                <stop offset="100%" stopColor="#FF4081" />
              </linearGradient>
              <filter id="starlightGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Inactive track */}
            <circle
              className="splash-svg-track"
              cx="65"
              cy="65"
              r={circleRadius}
              stroke="rgba(255, 255, 255, 0.12)"
              strokeWidth="4.5"
              fill="none"
            />

            {/* Active animated celestial progress */}
            <circle
              className="splash-svg-fill"
              cx="65"
              cy="65"
              r={circleRadius}
              stroke="url(#celestialGoldGlow)"
              strokeWidth="5"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              filter="url(#starlightGlow)"
              transform="rotate(-90 65 65)"
            />
          </svg>

          {/* Center Round Logo Plaque */}
          <div className="splash-logo-circle">
            <img 
              src="/icons/icon-512x512.png" 
              alt="Sindy Luxury by EBNA" 
              className="splash-logo-img"
              onError={(e) => {
                e.currentTarget.src = '/icons/ebna-logo-white.png';
              }}
            />
            {/* Sparkle badge at bottom */}
            <div className="splash-logo-pct-badge">
              {progress}%
            </div>
          </div>
        </div>

        {/* Brand Calligraphy & Typography */}
        <div className="splash-text-group">
          <div className="splash-badge-pill">
            <Sparkles size={11} color="#D4AF37" />
            <span>HAUTE COUTURE • MALABO & MONGOMO</span>
            <Sparkles size={11} color="#D4AF37" />
          </div>

          <h2 className="splash-pretitle">BIENVENIDO A</h2>
          <h1 className="splash-main-title">
            <span className="splash-title-brand">Sindy Luxury</span>
            <span className="splash-title-sub">BY EBNA</span>
          </h1>

          <p className="splash-description">
            Tu boutique exclusiva de alta costura, calzado joya y cosmética selecta con entrega inmediata en Guinea Ecuatorial.
          </p>
        </div>

        {/* Dynamic Status Text */}
        <div className="splash-status-wrapper">
          <div className="splash-status-indicator">
            <span className="status-dot"></span>
            <span className="splash-status-text">{loadingStep}</span>
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
            <span>Aplicación Móvil Oficial • EBNA Boutique</span>
          </div>
        </div>
      </div>
    </div>
  );
};
