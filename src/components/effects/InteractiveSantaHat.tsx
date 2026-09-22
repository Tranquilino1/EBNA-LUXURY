import React, { useState, useRef } from 'react';

interface InteractiveSantaHatProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  allowDrag?: boolean;
}

/**
 * High-End 3D Animated & Interactive Santa Hat Component
 * Featuring rich lighting, velvet gradients, soft plush fur, continuous gentle sway,
 * and dynamic displacement on hover, touch, or click.
 */
export const InteractiveSantaHat: React.FC<InteractiveSantaHatProps> = ({
  size = 46,
  className = '',
  style = {},
  allowDrag = true,
}) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const dragStartRef = useRef<{ startX: number; startY: number } | null>(null);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!allowDrag) return;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    setIsPressed(true);
    dragStartRef.current = { startX: e.clientX - offset.x, startY: e.clientY - offset.y };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isPressed || !dragStartRef.current) return;
    const newX = Math.max(-40, Math.min(40, e.clientX - dragStartRef.current.startX));
    const newY = Math.max(-25, Math.min(25, e.clientY - dragStartRef.current.startY));
    setOffset({ x: newX, y: newY });
  };

  const handlePointerUp = () => {
    setIsPressed(false);
    dragStartRef.current = null;
    // Spring back smoothly to origin with bounce
    setOffset({ x: 0, y: 0 });
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Brief tilt pulse
    setOffset({ x: 8, y: -4 });
    setTimeout(() => setOffset({ x: 0, y: 0 }), 250);
  };

  return (
    <div
      className={`interactive-santa-hat-wrapper ${className}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        if (!isPressed) setOffset({ x: 0, y: 0 });
      }}
      onClick={handleClick}
      title="¡Gorro de Santa 3D EBNA! Arrástrame o tócame para interactuar"
      style={{
        display: 'inline-block',
        position: 'relative',
        cursor: isPressed ? 'grabbing' : 'grab',
        userSelect: 'none',
        touchAction: 'none',
        transform: `translate3d(${offset.x}px, ${offset.y + (isHovered ? -3 : 0)}px, 0) scale(${isHovered ? 1.08 : 1}) rotate(${offset.x * 0.4}deg)`,
        transition: isPressed ? 'none' : 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        willChange: 'transform',
        zIndex: 35,
        ...style,
      }}
    >
      <svg
        width={size}
        height={Math.round(size * 0.88)}
        viewBox="0 0 100 88"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          filter: 'drop-shadow(0 6px 12px rgba(185, 28, 28, 0.4)) drop-shadow(0 2px 4px rgba(0,0,0,0.25))',
          transformOrigin: 'bottom center',
          animation: isPressed ? 'none' : 'santaHatGentleSway 3.2s ease-in-out infinite',
        }}
      >
        <defs>
          {/* Rich 3D Velvet Red Gradient */}
          <radialGradient id="velvetRed3D" cx="42%" cy="36%" r="62%" fx="35%" fy="28%">
            <stop offset="0%" stopColor="#FF4D6D" />
            <stop offset="35%" stopColor="#E11D48" />
            <stop offset="70%" stopColor="#BE123C" />
            <stop offset="95%" stopColor="#881337" />
            <stop offset="100%" stopColor="#4C0519" />
          </radialGradient>

          {/* Plush Fur Rim 3D Gradient */}
          <linearGradient id="plushBrim3D" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="45%" stopColor="#F8FAFC" />
            <stop offset="75%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </linearGradient>

          {/* 3D Pompom Spherical Lighting */}
          <radialGradient id="pompomBall3D" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#F1F5F9" />
            <stop offset="85%" stopColor="#CBD5E1" />
            <stop offset="100%" stopColor="#94A3B8" />
          </radialGradient>

          {/* Golden Holiday Specular Glint */}
          <linearGradient id="goldGlint" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE047" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#D97706" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* 3D Curved Cone Body with Velvet Shading */}
        <path
          d="M 16 64 C 18 42, 34 16, 68 8 C 76 6, 82 12, 85 20 C 89 30, 88 44, 82 64 Z"
          fill="url(#velvetRed3D)"
        />

        {/* Velvet Inner Shadow & Fold Depth */}
        <path
          d="M 68 8 C 78 12, 86 24, 85 36 C 81 48, 70 58, 62 64 C 70 56, 75 42, 73 28 C 72 18, 68 12, 68 8 Z"
          fill="#4C0519"
          opacity="0.35"
        />

        {/* Specular Velvet Sheen Streak */}
        <path
          d="M 28 58 C 32 38, 42 22, 60 14 C 54 22, 46 36, 42 58 Z"
          fill="#FFFFFF"
          opacity="0.22"
        />

        {/* Tilted Tail Droop to the Right with Pompom */}
        <path
          d="M 68 8 C 76 8, 86 16, 88 28 C 89 34, 86 38, 83 40 C 80 34, 80 26, 75 18 C 72 14, 69 10, 68 8 Z"
          fill="#9F1239"
        />

        {/* Puffy 3D Pompom Ball with Fur Texture */}
        <circle cx="86" cy="42" r="11" fill="url(#pompomBall3D)" />
        <circle cx="84" cy="39" r="4" fill="#FFFFFF" opacity="0.75" />
        <circle cx="88" cy="46" r="3" fill="#94A3B8" opacity="0.3" />

        {/* Plush White Fur Rim (Brim) with Realistic Bumps */}
        <rect
          x="10"
          y="58"
          width="74"
          height="18"
          rx="9"
          fill="url(#plushBrim3D)"
          stroke="#E2E8F0"
          strokeWidth="1"
        />

        {/* Fur Brim Pillowy Highlights */}
        <circle cx="20" cy="67" r="6.5" fill="#FFFFFF" opacity="0.8" />
        <circle cx="33" cy="67" r="7.5" fill="#FFFFFF" opacity="0.9" />
        <circle cx="47" cy="67" r="8" fill="#FFFFFF" opacity="0.95" />
        <circle cx="61" cy="67" r="7.5" fill="#FFFFFF" opacity="0.9" />
        <circle cx="74" cy="67" r="6.5" fill="#FFFFFF" opacity="0.8" />

        {/* Subtle Golden Holiday Sparkle Accent on Brim */}
        <polygon
          points="25,54 27,59 32,59 28,62 30,67 25,64 20,67 22,62 18,59 23,59"
          fill="url(#goldGlint)"
          opacity="0.85"
        />
      </svg>

      <style>{`
        @keyframes santaHatGentleSway {
          0%, 100% {
            transform: rotate(-12deg) translateY(0);
          }
          50% {
            transform: rotate(-7deg) translateY(-2px);
          }
        }
        .interactive-santa-hat-wrapper:active {
          transform: scale(0.96) !important;
        }
      `}</style>
    </div>
  );
};
