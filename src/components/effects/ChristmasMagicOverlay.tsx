import React, { useEffect, useRef } from 'react';
import { useCustomization } from '../../contexts/CustomizationContext';

/**
 * High-End Professional Christmas & Holiday Season Visual Experience
 * Includes:
 * 1. Twinkling Luxury Fairy Lights across top navigation
 * 2. Golden & Ruby Poinsettia Christmas Flowers on corner borders
 * 3. 3D Floating Glass & Velvet Christmas Baubles (Globos festivos)
 * 4. Micro Festive Fireworks & Star Sparkles with GPU acceleration
 */
export const ChristmasMagicOverlay: React.FC = () => {
  const { settings, isChristmasActive } = useCustomization();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!isChristmasActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Lightweight celebration fireworks particles
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      color: string;
      alpha: number;
      decay: number;
      size: number;
    }

    let particles: Particle[] = [];
    const colors = ['#D81B60', '#F59E0B', '#EF4444', '#10B981', '#F43F5E', '#FEF08A', '#FFFFFF'];

    const spawnFirework = () => {
      if (document.hidden) return;
      // Max 40 active particles to maintain 60 FPS
      if (particles.length > 50) return;

      const burstX = Math.random() * width;
      const burstY = Math.random() * (height * 0.45);
      const count = 16 + Math.floor(Math.random() * 10);
      const baseColor = colors[Math.floor(Math.random() * colors.length)];

      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
        const speed = 1.2 + Math.random() * 2.4;
        particles.push({
          x: burstX,
          y: burstY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: Math.random() > 0.3 ? baseColor : '#FEF08A',
          alpha: 1,
          decay: 0.012 + Math.random() * 0.016,
          size: 2 + Math.random() * 2,
        });
      }
    };

    let intervalTimer: any;
    if (settings.christmasFireworks ?? true) {
      intervalTimer = setInterval(() => {
        if (Math.random() > 0.4) spawnFirework();
      }, 2600);
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render fireworks
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.03; // gravity
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(intervalTimer);
      window.removeEventListener('resize', handleResize);
    };
  }, [isChristmasActive, settings.christmasFireworks]);

  if (!isChristmasActive) return null;

  const showLights = settings.christmasLights ?? true;
  const showFlowers = settings.christmasFlowers ?? true;
  const showBaubles = settings.christmasBaubles ?? true;

  return (
    <div
      className="christmas-magic-overlay-root"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 998,
        overflow: 'hidden',
      }}
    >
      {/* 1. Canvas for fireworks & delicate sparkles */}
      {(settings.christmasFireworks ?? true) && (
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* 2. Top Luxury Fairy Lights Garland */}
      {showLights && (
        <div
          className="luxury-fairy-lights-garland"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '24px',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'flex-start',
            padding: '0 12px',
            zIndex: 1005,
          }}
        >
          {Array.from({ length: 22 }).map((_, i) => {
            const colors = ['#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#D81B60', '#FDE047'];
            const bulbColor = colors[i % colors.length];
            const delay = (i * 0.15) % 2.4;
            return (
              <div
                key={i}
                className="fairy-light-socket"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  animation: `fairySwing 3s ease-in-out infinite ${delay}s alternate`,
                  transformOrigin: 'top center',
                }}
              >
                <div style={{ width: '2px', height: `${6 + (i % 3) * 4}px`, background: '#2D3748' }} />
                <div
                  className="fairy-bulb"
                  style={{
                    width: '8px',
                    height: '11px',
                    borderRadius: '50% 50% 45% 45%',
                    backgroundColor: bulbColor,
                    boxShadow: `0 0 10px ${bulbColor}, 0 0 18px ${bulbColor}88`,
                    animation: `fairyTwinkle 1.8s ease-in-out infinite ${delay}s alternate`,
                  }}
                />
              </div>
            );
          })}
        </div>
      )}

      {/* 3. Golden & Crimson Christmas Poinsettia Flowers in Top Corners */}
      {showFlowers && (
        <>
          {/* Top Left Poinsettia Cluster */}
          <div
            className="poinsettia-flower top-left"
            style={{
              position: 'absolute',
              top: '64px',
              left: '12px',
              width: '54px',
              height: '54px',
              opacity: 0.88,
              filter: 'drop-shadow(0 4px 10px rgba(220, 38, 38, 0.35))',
              animation: 'poinsettiaGentleBreathe 4s ease-in-out infinite',
            }}
          >
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="50" cy="24" rx="14" ry="24" fill="#BE123C" />
              <ellipse cx="50" cy="76" rx="14" ry="24" fill="#BE123C" />
              <ellipse cx="24" cy="50" rx="24" ry="14" fill="#BE123C" />
              <ellipse cx="76" cy="50" rx="24" ry="14" fill="#BE123C" />
              <ellipse cx="32" cy="32" rx="22" ry="13" transform="rotate(45 32 32)" fill="#E11D48" />
              <ellipse cx="68" cy="68" rx="22" ry="13" transform="rotate(45 68 68)" fill="#E11D48" />
              <ellipse cx="68" cy="32" rx="22" ry="13" transform="rotate(-45 68 32)" fill="#E11D48" />
              <ellipse cx="32" cy="68" rx="22" ry="13" transform="rotate(-45 32 68)" fill="#E11D48" />
              <circle cx="50" cy="50" r="8" fill="#FBBF24" />
              <circle cx="48" cy="48" r="2.5" fill="#FEF08A" />
              <circle cx="52" cy="52" r="2" fill="#D97706" />
            </svg>
          </div>

          {/* Top Right Poinsettia Cluster */}
          <div
            className="poinsettia-flower top-right"
            style={{
              position: 'absolute',
              top: '64px',
              right: '12px',
              width: '54px',
              height: '54px',
              opacity: 0.88,
              filter: 'drop-shadow(0 4px 10px rgba(220, 38, 38, 0.35))',
              animation: 'poinsettiaGentleBreathe 4s ease-in-out infinite 1.5s',
            }}
          >
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="50" cy="24" rx="14" ry="24" fill="#BE123C" />
              <ellipse cx="50" cy="76" rx="14" ry="24" fill="#BE123C" />
              <ellipse cx="24" cy="50" rx="24" ry="14" fill="#BE123C" />
              <ellipse cx="76" cy="50" rx="24" ry="14" fill="#BE123C" />
              <ellipse cx="32" cy="32" rx="22" ry="13" transform="rotate(45 32 32)" fill="#E11D48" />
              <ellipse cx="68" cy="68" rx="22" ry="13" transform="rotate(45 68 68)" fill="#E11D48" />
              <ellipse cx="68" cy="32" rx="22" ry="13" transform="rotate(-45 68 32)" fill="#E11D48" />
              <ellipse cx="32" cy="68" rx="22" ry="13" transform="rotate(-45 32 68)" fill="#E11D48" />
              <circle cx="50" cy="50" r="8" fill="#FBBF24" />
              <circle cx="48" cy="48" r="2.5" fill="#FEF08A" />
              <circle cx="52" cy="52" r="2" fill="#D97706" />
            </svg>
          </div>
        </>
      )}

      {/* 4. Floating 3D Luxury Christmas Baubles / Globos Festivos */}
      {showBaubles && (
        <div className="floating-baubles-container">
          {/* Bauble 1: Ruby Silk */}
          <div
            className="floating-bauble"
            style={{
              position: 'absolute',
              top: '18vh',
              left: '3vw',
              width: '38px',
              height: '46px',
              animation: 'baubleFloatSlow 8s ease-in-out infinite alternate',
            }}
          >
            <svg viewBox="0 0 40 50" fill="none">
              <rect x="17" y="0" width="6" height="6" fill="#D97706" rx="1" />
              <circle cx="20" cy="26" r="18" fill="url(#rubyBaubleGrad)" />
              <ellipse cx="14" cy="18" rx="5" ry="3" fill="#FFFFFF" opacity="0.45" />
              <defs>
                <radialGradient id="rubyBaubleGrad" cx="30%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="#FB7185" />
                  <stop offset="45%" stopColor="#E11D48" />
                  <stop offset="85%" stopColor="#881337" />
                  <stop offset="100%" stopColor="#4C0519" />
                </radialGradient>
              </defs>
            </svg>
          </div>

          {/* Bauble 2: Gold Champagne */}
          <div
            className="floating-bauble"
            style={{
              position: 'absolute',
              top: '35vh',
              right: '3vw',
              width: '44px',
              height: '52px',
              animation: 'baubleFloatSlow 9s ease-in-out infinite 2s alternate',
            }}
          >
            <svg viewBox="0 0 40 50" fill="none">
              <rect x="17" y="0" width="6" height="6" fill="#B45309" rx="1" />
              <circle cx="20" cy="26" r="18" fill="url(#goldBaubleGrad)" />
              <ellipse cx="14" cy="18" rx="6" ry="3.5" fill="#FFFFFF" opacity="0.55" />
              <defs>
                <radialGradient id="goldBaubleGrad" cx="30%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="#FEF08A" />
                  <stop offset="40%" stopColor="#F59E0B" />
                  <stop offset="80%" stopColor="#B45309" />
                  <stop offset="100%" stopColor="#78350F" />
                </radialGradient>
              </defs>
            </svg>
          </div>

          {/* Bauble 3: Magenta Luxe */}
          <div
            className="floating-bauble"
            style={{
              position: 'absolute',
              top: '68vh',
              left: '4vw',
              width: '32px',
              height: '40px',
              animation: 'baubleFloatSlow 7.5s ease-in-out infinite 1s alternate',
            }}
          >
            <svg viewBox="0 0 40 50" fill="none">
              <rect x="17" y="0" width="6" height="6" fill="#D97706" rx="1" />
              <circle cx="20" cy="26" r="18" fill="url(#magentaBaubleGrad)" />
              <ellipse cx="14" cy="18" rx="4" ry="2.5" fill="#FFFFFF" opacity="0.4" />
              <defs>
                <radialGradient id="magentaBaubleGrad" cx="30%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="#F472B6" />
                  <stop offset="45%" stopColor="#D81B60" />
                  <stop offset="85%" stopColor="#831843" />
                  <stop offset="100%" stopColor="#500724" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fairyTwinkle {
          0%, 100% {
            opacity: 0.85;
            filter: brightness(1);
          }
          50% {
            opacity: 1;
            filter: brightness(1.4);
          }
        }
        @keyframes fairySwing {
          0%, 100% {
            transform: rotate(-3deg);
          }
          50% {
            transform: rotate(3deg);
          }
        }
        @keyframes poinsettiaGentleBreathe {
          0%, 100% {
            transform: scale(1) rotate(0deg);
          }
          50% {
            transform: scale(1.06) rotate(4deg);
          }
        }
        @keyframes baubleFloatSlow {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          100% {
            transform: translateY(-24px) rotate(8deg);
          }
        }
      `}</style>
    </div>
  );
};
