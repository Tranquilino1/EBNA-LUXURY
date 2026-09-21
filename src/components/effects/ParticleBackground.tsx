import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  maxAlpha: number;
  pulseSpeed: number;
  pulseFactor: number;
  life?: number;
  maxLife?: number;
}

export const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
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

    window.addEventListener('resize', handleResize);

    // Color palettes for luxury motes
    const ambientColors = [
      'rgba(224, 90, 136, ',  // Pink #E05A88
      'rgba(245, 192, 208, ', // Soft Rose #F5C0D0
      'rgba(168, 85, 247, ',  // Purple #A855F7
      'rgba(234, 179, 8, ',   // Gold #EAB308
    ];

    const particleCount = Math.min(Math.floor((width * height) / 18000), 65);
    const ambientParticles: Particle[] = [];

    const createAmbientParticle = (): Particle => {
      const baseColor = ambientColors[Math.floor(Math.random() * ambientColors.length)];
      const maxAlpha = 0.25 + Math.random() * 0.45;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -0.2 - Math.random() * 0.5,
        radius: 1.2 + Math.random() * 2.8,
        color: baseColor,
        alpha: Math.random() * maxAlpha,
        maxAlpha,
        pulseSpeed: 0.005 + Math.random() * 0.012,
        pulseFactor: Math.random() * Math.PI * 2,
      };
    };

    for (let i = 0; i < particleCount; i++) {
      ambientParticles.push(createAmbientParticle());
    }

    // Burst particles container
    let burstParticles: Particle[] = [];

    const spawnBurst = (colorType: 'pink' | 'green' | 'red') => {
      const burstCount = 45;
      const targetX = width / 2;
      const targetY = height / 2;

      let colorPrefix = 'rgba(224, 90, 136, '; // default pink
      if (colorType === 'green') colorPrefix = 'rgba(37, 211, 102, ';
      if (colorType === 'red') colorPrefix = 'rgba(239, 68, 68, ';

      for (let i = 0; i < burstCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 2 + Math.random() * 6;
        const maxLife = 60 + Math.floor(Math.random() * 40);
        burstParticles.push({
          x: targetX,
          y: targetY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: 2 + Math.random() * 3.5,
          color: colorPrefix,
          alpha: 0.9,
          maxAlpha: 0.9,
          pulseSpeed: 0,
          pulseFactor: 0,
          life: 0,
          maxLife,
        });
      }
    };

    const handleCustomBurst = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail && detail.color) {
        spawnBurst(detail.color);
      } else {
        spawnBurst('pink');
      }
    };

    window.addEventListener('ebna-particle-burst', handleCustomBurst);

    // Mouse tracking for subtle interactive float
    let mouseX = width / 2;
    let mouseY = height / 2;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render Ambient Motes
      for (let i = 0; i < ambientParticles.length; i++) {
        const p = ambientParticles[i];
        p.pulseFactor += p.pulseSpeed;
        p.alpha = (Math.sin(p.pulseFactor) + 1) * 0.5 * p.maxAlpha;

        // Subtle mouse deflection
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120 && dist > 0) {
          const force = (120 - dist) / 120;
          p.x += (dx / dist) * force * 1.5;
          p.y += (dy / dist) * force * 1.5;
        }

        // Drift
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around bounds
        if (p.y < -10) p.y = height + 10;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Draw radial glow mote
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 2);
        gradient.addColorStop(0, `${p.color}${p.alpha})`);
        gradient.addColorStop(1, `${p.color}0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Render Burst Particles
      for (let i = burstParticles.length - 1; i >= 0; i--) {
        const bp = burstParticles[i];
        bp.life = (bp.life || 0) + 1;
        const progress = bp.life / (bp.maxLife || 100);

        bp.x += bp.vx;
        bp.y += bp.vy;
        bp.vx *= 0.96; // drag
        bp.vy *= 0.96;
        bp.vy += 0.04; // light gravity

        bp.alpha = 0.9 * (1 - progress);

        if (progress >= 1 || bp.alpha <= 0) {
          burstParticles.splice(i, 1);
          continue;
        }

        ctx.fillStyle = `${bp.color}${bp.alpha})`;
        ctx.beginPath();
        ctx.arc(bp.x, bp.y, bp.radius * (1 - progress * 0.3), 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('ebna-particle-burst', handleCustomBurst);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 1, // subtle ambient overlay above background, behind content modals
        opacity: 0.85,
      }}
    />
  );
};
