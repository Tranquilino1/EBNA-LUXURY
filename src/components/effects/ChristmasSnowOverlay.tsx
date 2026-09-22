import React, { useMemo } from 'react';

interface Snowflake {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  isGold: boolean;
}

export const ChristmasSnowOverlay: React.FC = () => {
  const snowflakes: Snowflake[] = useMemo(() => {
    return Array.from({ length: 32 }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage across screen
      size: Math.random() * 4 + 2, // 2px to 6px
      duration: Math.random() * 8 + 7, // 7s to 15s
      delay: Math.random() * 5, // 0s to 5s
      opacity: Math.random() * 0.6 + 0.25,
      isGold: Math.random() > 0.65, // 35% golden flakes, 65% crystal white
    }));
  }, []);

  return (
    <div
      className="christmas-snow-overlay"
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 9999,
      }}
    >
      {snowflakes.map(flake => (
        <span
          key={flake.id}
          className="snowflake"
          style={{
            position: 'absolute',
            left: `${flake.x}%`,
            top: '-20px',
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            borderRadius: '50%',
            backgroundColor: flake.isGold ? '#F59E0B' : '#FFFFFF',
            opacity: flake.opacity,
            boxShadow: flake.isGold
              ? '0 0 6px rgba(245, 158, 11, 0.8), 0 0 10px rgba(212, 175, 55, 0.5)'
              : '0 0 6px rgba(255, 255, 255, 0.8), 0 0 12px rgba(254, 205, 211, 0.5)',
            animation: `snowFall ${flake.duration}s linear infinite`,
            animationDelay: `${flake.delay}s`,
          }}
        />
      ))}

      <style>{`
        @keyframes snowFall {
          0% {
            transform: translateY(-10px) translateX(0);
          }
          50% {
            transform: translateY(50vh) translateX(15px);
          }
          100% {
            transform: translateY(105vh) translateX(-15px);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .christmas-snow-overlay {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};
