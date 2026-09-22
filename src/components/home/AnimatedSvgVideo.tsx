import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import './animatedSvgVideo.css';

interface AnimatedSvgVideoProps {
  preset?: 'luxury_runway' | 'golden_glamour' | 'haute_couture_neon';
  title?: string;
  subtitle?: string;
  isMuted?: boolean;
  onToggleMute?: () => void;
  interactive?: boolean;
}

export const AnimatedSvgVideo: React.FC<AnimatedSvgVideoProps> = ({
  preset = 'luxury_runway',
  title = 'Sindy Luxury Haute Couture',
  subtitle = 'Pasarela de Gala & Estilo Internacional',
  isMuted = true,
  onToggleMute,
  interactive = true,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [internalMuted, setInternalMuted] = useState(isMuted);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorNodeRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Sync external muted state
  useEffect(() => {
    setInternalMuted(isMuted);
  }, [isMuted]);

  // Subtle ambient audio synthesizer via Web Audio API when unmuted and playing
  useEffect(() => {
    if (!internalMuted && isPlaying) {
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) {
          const ctx = new AudioCtx();
          audioContextRef.current = ctx;

          // Create mellow ambient drone (chords in A minor / lounge aesthetic)
          const osc1 = ctx.createOscillator();
          const osc2 = ctx.createOscillator();
          const gain = ctx.createGain();

          osc1.type = 'sine';
          osc1.frequency.setValueAtTime(220, ctx.currentTime); // A3
          osc2.type = 'triangle';
          osc2.frequency.setValueAtTime(277.18, ctx.currentTime); // C#4

          gain.gain.setValueAtTime(0.04, ctx.currentTime); // very gentle background ambience

          osc1.connect(gain);
          osc2.connect(gain);
          gain.connect(ctx.destination);

          osc1.start();
          osc2.start();

          oscillatorNodeRef.current = osc1;
          gainNodeRef.current = gain;
        }
      } catch (e) {
        console.warn('Web Audio ambience not available:', e);
      }
    } else {
      if (audioContextRef.current) {
        try {
          audioContextRef.current.close();
        } catch (e) {}
        audioContextRef.current = null;
      }
    }

    return () => {
      if (audioContextRef.current) {
        try {
          audioContextRef.current.close();
        } catch (e) {}
        audioContextRef.current = null;
      }
    };
  }, [internalMuted, isPlaying]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleToggleSound = () => {
    if (onToggleMute) {
      onToggleMute();
    } else {
      setInternalMuted(!internalMuted);
    }
  };

  return (
    <div className={`animated-svg-video-container ${isPlaying ? 'is-playing' : 'is-paused'}`}>
      <svg
        className="animated-svg-canvas"
        viewBox="0 0 1280 720"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Deep Luxe Vignette Background */}
          <radialGradient id="stageGlow" cx="50%" cy="40%" r="65%">
            <stop offset="0%" stopColor="#2A0B1A" />
            <stop offset="50%" stopColor="#150610" />
            <stop offset="100%" stopColor="#080206" />
          </radialGradient>

          {/* Runway Spotlights */}
          <linearGradient id="spotlightLeft" x1="0%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#FFD700" stopOpacity="0.45" />
            <stop offset="80%" stopColor="#D81B60" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#10030A" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="spotlightRight" x1="100%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#FF69B4" stopOpacity="0.4" />
            <stop offset="80%" stopColor="#D81B60" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#10030A" stopOpacity="0" />
          </linearGradient>

          {/* Gold & Rose Shimmer Gradients */}
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF3B0" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#AA771C" />
          </linearGradient>

          <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF2A7A" />
            <stop offset="50%" stopColor="#D81B60" />
            <stop offset="100%" stopColor="#8A2BE2" />
          </linearGradient>

          {/* Glow Filters */}
          <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="laserGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="16" result="blur1" />
            <feGaussianBlur stdDeviation="6" result="blur2" />
            <feMerge>
              <feMergeNode in="blur1" />
              <feMergeNode in="blur2" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 1. Backdrop */}
        <rect width="1280" height="720" fill="url(#stageGlow)" />

        {/* ========================================================
            PRESET 1: LUXURY RUNWAY (Pasarela Alta Costura)
            ======================================================== */}
        {preset === 'luxury_runway' && (
          <g className="scene-runway">
            {/* Left and Right Sweeping Spotlights */}
            <polygon points="120,0 480,560 380,560 0,0" fill="url(#spotlightLeft)" className="anim-sweep-left" opacity="0.6" />
            <polygon points="1160,0 800,560 900,560 1280,0" fill="url(#spotlightRight)" className="anim-sweep-right" opacity="0.6" />

            {/* Moving Runway Perspective Lines */}
            <g className="anim-perspective-floor" opacity="0.4">
              <polygon points="480,420 800,420 1020,720 260,720" fill="#1A0612" stroke="#D81B60" strokeWidth="1.5" />
              <line x1="640" y1="420" x2="640" y2="720" stroke="#FFD700" strokeWidth="1.5" strokeDasharray="16,12" className="anim-dash-runway" />
              <line x1="560" y1="420" x2="450" y2="720" stroke="#D81B60" strokeWidth="1" strokeDasharray="8,8" />
              <line x1="720" y1="420" x2="830" y2="720" stroke="#D81B60" strokeWidth="1" strokeDasharray="8,8" />
            </g>

            {/* Runway Front Arch / Stage Framing */}
            <circle cx="640" cy="380" r="140" fill="none" stroke="url(#goldGradient)" strokeWidth="1.5" opacity="0.4" strokeDasharray="4,6" className="anim-spin-slow" />
            <circle cx="640" cy="380" r="180" fill="none" stroke="#D81B60" strokeWidth="1" opacity="0.3" />

            {/* Stylized Catwalk Couture Silhouette */}
            <g className="anim-model-walk" transform="translate(640, 360)">
              {/* Glowing Aura */}
              <ellipse cx="0" cy="90" rx="90" ry="24" fill="#D81B60" opacity="0.3" filter="url(#glowEffect)" />
              {/* Head */}
              <circle cx="0" cy="-70" r="11" fill="url(#goldGradient)" />
              {/* Crown / Tiara */}
              <polygon points="-8,-82 0,-92 8,-82 4,-77 -4,-77" fill="#FFD700" />
              {/* Sleek Neck & Torso */}
              <path d="M-6,-59 L6,-59 L8,-20 L-8,-20 Z" fill="url(#goldGradient)" />
              {/* Couture Gown Flowing Train */}
              <path
                d="M-8,-20 C-18,20 -45,70 -55,100 C-30,95 30,95 55,100 C45,70 18,20 8,-20 Z"
                fill="url(#neonGradient)"
                opacity="0.9"
                filter="url(#glowEffect)"
                className="anim-dress-sway"
              />
              {/* Sparkles on gown */}
              <circle cx="-12" cy="30" r="2" fill="#FFF" className="anim-twinkle-1" />
              <circle cx="15" cy="50" r="2.5" fill="#FFD700" className="anim-twinkle-2" />
              <circle cx="-25" cy="80" r="1.8" fill="#FFF" className="anim-twinkle-3" />
            </g>
          </g>
        )}

        {/* ========================================================
            PRESET 2: GOLDEN GLAMOUR (Diamante & Oro Imperial)
            ======================================================== */}
        {preset === 'golden_glamour' && (
          <g className="scene-gold">
            {/* Ambient Radial Golden Bloom */}
            <circle cx="640" cy="360" r="260" fill="#D4AF37" opacity="0.08" filter="url(#laserGlow)" />

            {/* Rotating Sacred Diamond Wireframe */}
            <g className="anim-diamond-spin" transform="translate(640, 340)">
              {/* Outer Facets */}
              <polygon points="0,-160 140,-40 0,160 -140,-40" fill="none" stroke="url(#goldGradient)" strokeWidth="2.5" filter="url(#glowEffect)" />
              {/* Inner Facets */}
              <polygon points="0,-160 0,160" stroke="#FFF" strokeWidth="1" opacity="0.6" />
              <polygon points="-140,-40 140,-40" stroke="#FFF" strokeWidth="1" opacity="0.6" />
              <polygon points="-70,-100 70,-100 0,40" fill="rgba(216,27,96,0.15)" stroke="#FFD700" strokeWidth="1.5" />
              {/* Central Diamond Core */}
              <circle cx="0" cy="0" r="18" fill="url(#goldGradient)" filter="url(#laserGlow)" />
            </g>

            {/* Orbiting Golden Particle Stars */}
            <g className="anim-orbit" transform="translate(640, 340)">
              <circle cx="210" cy="0" r="4" fill="#FFD700" filter="url(#glowEffect)" />
              <circle cx="-210" cy="0" r="3" fill="#FFF" filter="url(#glowEffect)" />
              <circle cx="0" cy="180" r="3.5" fill="#FF69B4" filter="url(#glowEffect)" />
              <circle cx="0" cy="-180" r="4" fill="#FFD700" filter="url(#glowEffect)" />
            </g>
          </g>
        )}

        {/* ========================================================
            PRESET 3: HAUTE COUTURE NEON (Gala Neón & Chic)
            ======================================================== */}
        {preset === 'haute_couture_neon' && (
          <g className="scene-neon">
            {/* Pulsing Neon Wave Ribbons */}
            <path
              d="M0,380 C320,240 480,480 800,340 C1040,220 1180,420 1280,360"
              fill="none"
              stroke="url(#neonGradient)"
              strokeWidth="4"
              filter="url(#laserGlow)"
              className="anim-wave-1"
            />
            <path
              d="M0,340 C280,460 540,220 860,420 C1080,300 1200,480 1280,400"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="2"
              opacity="0.8"
              filter="url(#glowEffect)"
              className="anim-wave-2"
            />

            {/* Futuristic Couture Monogram Vector */}
            <g transform="translate(640, 330)">
              <rect x="-100" y="-100" width="200" height="200" rx="30" fill="none" stroke="url(#neonGradient)" strokeWidth="2" transform="rotate(45)" className="anim-spin-slow" />
              <text x="0" y="16" textAnchor="middle" fill="#FFFFFF" fontFamily="serif" fontSize="48" fontWeight="bold" letterSpacing="6" filter="url(#glowEffect)">
                EBNA
              </text>
            </g>
          </g>
        )}

        {/* ========================================================
            OVERLAY: LUXURY BRAND WATERMARK & TITLE
            ======================================================== */}
        <g className="cinema-brand-overlay" transform="translate(640, 610)">
          {/* Audio Visualizer Frequency Bars */}
          <g className="anim-audio-spectrum" opacity={isPlaying ? '0.85' : '0.2'}>
            {[-90, -75, -60, -45, -30, -15, 0, 15, 30, 45, 60, 75, 90].map((xOffset, i) => (
              <rect
                key={i}
                x={xOffset - 2.5}
                y="-25"
                width="5"
                height="18"
                rx="2"
                fill="url(#goldGradient)"
                className={`spectrum-bar bar-${(i % 5) + 1}`}
              />
            ))}
          </g>

          <text
            x="0"
            y="25"
            textAnchor="middle"
            fill="#FFFFFF"
            fontFamily="var(--font-serif, 'Playfair Display', serif)"
            fontSize="24"
            fontWeight="700"
            letterSpacing="5"
            filter="url(#glowEffect)"
          >
            {title.toUpperCase()}
          </text>

          <text
            x="0"
            y="52"
            textAnchor="middle"
            fill="#F48FB1"
            fontFamily="sans-serif"
            fontSize="12"
            fontWeight="600"
            letterSpacing="3"
            opacity="0.9"
          >
            {subtitle.toUpperCase()}
          </text>
        </g>
      </svg>

      {/* Interactive Controls Overlay for User & Admin */}
      {interactive && (
        <div className="animated-svg-controls-overlay">
          <button
            type="button"
            className="svg-control-btn play-pause-btn"
            onClick={handlePlayPause}
            title={isPlaying ? 'Pausar animación' : 'Reproducir animación'}
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} fill="currentColor" />}
            <span>{isPlaying ? 'PAUSA' : 'REPRODUCIR'}</span>
          </button>

          <button
            type="button"
            className="svg-control-btn sound-btn"
            onClick={handleToggleSound}
            title={internalMuted ? 'Activar atmósfera sonora de pasarela' : 'Silenciar'}
          >
            {internalMuted ? <VolumeX size={18} color="#EF4444" /> : <Volume2 size={18} color="#10B981" />}
            <span>{internalMuted ? 'SONIDO OFF' : 'AUDIO EN VIVO'}</span>
          </button>
        </div>
      )}
    </div>
  );
};
