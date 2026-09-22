import React from 'react';

interface ChristmasHatProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const ChristmasHat: React.FC<ChristmasHatProps> = ({
  size = 32,
  className = '',
  style = {},
}) => {
  return (
    <div
      className={`christmas-hat-container ${className}`}
      style={{
        display: 'inline-block',
        pointerEvents: 'none',
        userSelect: 'none',
        zIndex: 50,
        ...style,
      }}
      aria-hidden="true"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          overflow: 'visible',
          filter: 'drop-shadow(0 4px 8px rgba(185, 28, 28, 0.45))',
        }}
      >
        <defs>
          <linearGradient id="hatRedVelvet" x1="12" y1="18" x2="52" y2="46" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F87171" />
            <stop offset="35%" stopColor="#EF4444" />
            <stop offset="75%" stopColor="#DC2626" />
            <stop offset="100%" stopColor="#991B1B" />
          </linearGradient>

          <linearGradient id="hatFoldShade" x1="38" y1="20" x2="54" y2="38" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#B91C1C" />
            <stop offset="100%" stopColor="#7F1D1D" />
          </linearGradient>

          <radialGradient id="pompomGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="70%" stopColor="#F1F5F9" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </radialGradient>

          <filter id="furFluff" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodColor="rgba(0,0,0,0.15)" />
          </filter>
        </defs>

        {/* Hat Main Velvet Cone with 3D curve & fold */}
        <path
          d="M 16 46 C 18 30, 28 14, 46 16 C 52 17, 56 24, 52 30 C 48 35, 42 36, 38 34 C 32 32, 28 36, 16 46 Z"
          fill="url(#hatRedVelvet)"
        />

        {/* Deep 3D Shadow in the fold */}
        <path
          d="M 44 17 C 48 22, 54 26, 50 31 C 46 34, 42 33, 40 31 Z"
          fill="url(#hatFoldShade)"
          opacity="0.85"
        />

        {/* Fluffy White Trim at Base with 3D Pillows */}
        <g filter="url(#furFluff)">
          <path
            d="M 10 46 C 10 42, 44 42, 44 46 C 44 50, 10 50, 10 46 Z"
            fill="#FFFFFF"
          />
          {/* Subtle fur puffs */}
          <circle cx="12" cy="46" r="4.5" fill="#FFFFFF" />
          <circle cx="18" cy="46.5" r="4.8" fill="#F8FAFC" />
          <circle cx="24" cy="45.5" r="5" fill="#FFFFFF" />
          <circle cx="30" cy="46.5" r="4.8" fill="#F1F5F9" />
          <circle cx="36" cy="45.5" r="5" fill="#FFFFFF" />
          <circle cx="42" cy="46" r="4.5" fill="#F8FAFC" />
        </g>

        {/* Animated 3D Pompom at the Tip */}
        <g className="hat-pompom" style={{ transformOrigin: '52px 30px' }}>
          <circle
            cx="52"
            cy="31"
            r="6.5"
            fill="url(#pompomGlow)"
            style={{
              filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.25))',
            }}
          />
          {/* Pompom soft highlights */}
          <circle cx="50" cy="29.5" r="2.2" fill="#FFFFFF" opacity="0.9" />
        </g>
      </svg>
      <style>{`
        @keyframes hatBob {
          0%, 100% {
            transform: rotate(0deg) translateY(0);
          }
          50% {
            transform: rotate(4deg) translateY(-2px);
          }
        }
        @keyframes pompomSway {
          0%, 100% {
            transform: rotate(0deg) scale(1);
          }
          50% {
            transform: rotate(12deg) scale(1.05);
          }
        }
        .christmas-hat-container {
          animation: hatBob 3s ease-in-out infinite;
        }
        .hat-pompom {
          animation: pompomSway 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};
