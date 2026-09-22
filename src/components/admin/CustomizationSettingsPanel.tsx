import React, { useState } from 'react';
import { useCustomization } from '../../contexts/CustomizationContext';
import { InteractiveSantaHat } from '../effects/InteractiveSantaHat';
import { Sparkles, Play, RotateCcw, Check, Sliders, Zap, Gem, Layers, Wand2 } from 'lucide-react';
import type { AnimationType, ChristmasMode, CardStyleType } from '../../types';

interface AnimationPreset {
  id: string;
  name: string;
  subtitle: string;
  icon: React.ReactNode;
  settings: {
    animationType: AnimationType;
    animationSpeed: number;
    staggerDelay: number;
    hoverScale: number;
    enableSpecularSweep: boolean;
    cardStyle: CardStyleType;
  };
}

const PRESETS: AnimationPreset[] = [
  {
    id: 'pasarela-couture',
    name: '👠 Pasarela Haute Couture',
    subtitle: 'Despliegue suave como seda con elevación delicada (0.4s)',
    icon: <Sparkles size={18} color="#D81B60" />,
    settings: {
      animationType: 'slide-up',
      animationSpeed: 0.4,
      staggerDelay: 0.04,
      hoverScale: 1.03,
      enableSpecularSweep: true,
      cardStyle: 'glass-luxe',
    },
  },
  {
    id: 'ultra-fast',
    name: '⚡ Ultra-Fast Express',
    subtitle: 'Aparición instantánea en micromilésimas sin retardo (0.15s)',
    icon: <Zap size={18} color="#F59E0B" />,
    settings: {
      animationType: 'fade-in',
      animationSpeed: 0.15,
      staggerDelay: 0.01,
      hoverScale: 1.02,
      enableSpecularSweep: false,
      cardStyle: 'editorial-minimal',
    },
  },
  {
    id: 'escultural-3d',
    name: '💎 Escultural 3D Royalty',
    subtitle: 'Giro tridimensional con perspectiva y bisel de oro (0.55s)',
    icon: <Gem size={18} color="#10B981" />,
    settings: {
      animationType: 'flip-3d',
      animationSpeed: 0.55,
      staggerDelay: 0.06,
      hoverScale: 1.05,
      enableSpecularSweep: true,
      cardStyle: 'bordered-gold',
    },
  },
  {
    id: 'cascada-wave',
    name: '🌊 Cascada Escalonada',
    subtitle: 'Escala concéntrica en onda para catálogos extensos (0.35s)',
    icon: <Layers size={18} color="#3B82F6" />,
    settings: {
      animationType: 'scale-in',
      animationSpeed: 0.35,
      staggerDelay: 0.07,
      hoverScale: 1.04,
      enableSpecularSweep: true,
      cardStyle: 'glass-luxe',
    },
  },
];

export const CustomizationSettingsPanel: React.FC = () => {
  const { settings, isChristmasActive, updateSettings, resetToDefaults } = useCustomization();
  const [saveFeedback, setSaveFeedback] = useState(false);
  const [previewKey, setPreviewKey] = useState(0);

  const handleApply = (newValues: any) => {
    updateSettings(newValues);
    setSaveFeedback(true);
    setPreviewKey(prev => prev + 1);
    setTimeout(() => setSaveFeedback(false), 2200);
  };

  const handleApplyPreset = (preset: AnimationPreset) => {
    handleApply({
      ...preset.settings,
      animationPreset: preset.id,
    });
  };

  const restartPreview = () => {
    setPreviewKey(prev => prev + 1);
  };

  return (
    <div className="customization-settings-panel" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Top Banner Header */}
      <div 
        style={{
          background: 'linear-gradient(135deg, rgba(216, 27, 96, 0.08) 0%, rgba(212, 175, 55, 0.14) 100%)',
          borderRadius: '24px',
          padding: '1.6rem 2.2rem',
          border: '1.5px solid var(--border-brand)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.2rem',
          boxShadow: '0 8px 30px rgba(216, 27, 96, 0.06)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div 
            style={{ 
              background: 'linear-gradient(135deg, #D81B60, #C2185B)', 
              color: 'white', 
              padding: '14px', 
              borderRadius: '18px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              boxShadow: '0 6px 16px rgba(216, 27, 96, 0.3)',
            }}
          >
            <Sliders size={26} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h3 style={{ margin: 0, fontSize: '1.4rem', fontFamily: 'var(--font-serif)', color: 'var(--text-primary)', fontWeight: 800 }}>
                Estudio de Personalización & Animaciones UI
              </h3>
              {saveFeedback && (
                <span style={{ background: 'linear-gradient(135deg, #10B981, #059669)', color: 'white', fontSize: '0.74rem', fontWeight: 800, padding: '4px 10px', borderRadius: '14px', display: 'inline-flex', alignItems: 'center', gap: '4px', boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)' }}>
                  <Check size={13} /> ¡Aplicado en Tiempo Real!
                </span>
              )}
            </div>
            <p style={{ margin: '4px 0 0 0', fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Controla las plantillas de movimiento, velocidades de entrada, temas de tarjetas y la ambientación navideña 3D.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={resetToDefaults}
          style={{
            padding: '10px 18px',
            borderRadius: '24px',
            border: '1.5px solid var(--border-subtle)',
            background: 'var(--canvas-surface)',
            color: 'var(--text-secondary)',
            fontSize: '0.84rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            transition: 'all 0.2s',
          }}
          title="Restaurar valores de fábrica"
        >
          <RotateCcw size={15} /> Restaurar Por Defecto
        </button>
      </div>

      {/* PLANTILLAS PREDEFINIDAS / PRESETS */}
      <div 
        className="glass-panel"
        style={{
          background: 'var(--canvas-surface)',
          borderRadius: '22px',
          padding: '1.8rem',
          border: '1px solid var(--border-light)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid var(--border-light)', paddingBottom: '12px' }}>
          <Wand2 size={20} color="var(--brand-accent)" />
          <div>
            <h4 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Plantillas de Animación & Movimiento (Presets Profesionales)
            </h4>
            <span style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
              Aplica al instante combinaciones equilibradas y probadas por diseñadores senior
            </span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
          {PRESETS.map((preset) => {
            const isCurrent = settings.animationPreset === preset.id || 
              (settings.animationType === preset.settings.animationType && Math.abs(settings.animationSpeed - preset.settings.animationSpeed) < 0.05);

            return (
              <div
                key={preset.id}
                onClick={() => handleApplyPreset(preset)}
                style={{
                  padding: '14px 16px',
                  borderRadius: '16px',
                  border: isCurrent ? '2px solid var(--brand-accent)' : '1px solid var(--border-light)',
                  background: isCurrent ? 'rgba(216, 27, 96, 0.08)' : 'var(--canvas-elevated)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  boxShadow: isCurrent ? '0 4px 16px rgba(216, 27, 96, 0.18)' : 'none',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {preset.icon}
                    <span style={{ fontWeight: 800, fontSize: '0.92rem', color: isCurrent ? 'var(--brand-accent)' : 'var(--text-primary)' }}>
                      {preset.name}
                    </span>
                  </div>
                  {isCurrent && <Check size={16} color="var(--brand-accent)" strokeWidth={3} />}
                </div>
                <p style={{ margin: 0, fontSize: '0.76rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                  {preset.subtitle}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.8rem' }}>
        {/* SECCIÓN 1: AJUSTES MANUALES DE MOVIMIENTO */}
        <div 
          className="glass-panel"
          style={{
            background: 'var(--canvas-surface)',
            borderRadius: '22px',
            padding: '1.8rem',
            border: '1px solid var(--border-light)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.4rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid var(--border-light)', paddingBottom: '12px' }}>
            <Sparkles size={20} color="var(--brand-accent)" />
            <h4 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              1. Ajuste Fino de Animaciones de Entrada
            </h4>
          </div>

          {/* Tipo de Transición */}
          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>
              Movimiento de Aparición:
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {[
                { id: 'slide-up', label: '👠 Pasarela Slide-Up' },
                { id: 'fade-in', label: '✨ Fundido Seda Fade' },
                { id: 'scale-in', label: '💎 Zoom Escultural' },
                { id: 'flip-3d', label: '🔄 Giro 3D Elegante' },
              ].map(opt => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleApply({ animationType: opt.id as AnimationType, animationPreset: '' })}
                  style={{
                    padding: '11px 13px',
                    borderRadius: '14px',
                    border: settings.animationType === opt.id ? '2px solid var(--brand-accent)' : '1px solid var(--border-light)',
                    background: settings.animationType === opt.id ? 'var(--brand-gold-light)' : 'var(--canvas-elevated)',
                    color: settings.animationType === opt.id ? 'var(--brand-accent)' : 'var(--text-primary)',
                    fontWeight: settings.animationType === opt.id ? 800 : 600,
                    fontSize: '0.84rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    textAlign: 'left'
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Velocidad / Duración */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <label style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-secondary)' }}>
                Duración de Entrada:
              </label>
              <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--brand-accent)' }}>
                {settings.animationSpeed}s
              </span>
            </div>
            <input
              type="range"
              min="0.15"
              max="1.2"
              step="0.05"
              value={settings.animationSpeed}
              onChange={(e) => handleApply({ animationSpeed: parseFloat(e.target.value), animationPreset: '' })}
              style={{ width: '100%', accentColor: 'var(--brand-accent)', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
              <span>0.15s (Ultra Rápido)</span>
              <span>0.5s (Equilibrado)</span>
              <span>1.2s (Cinemático)</span>
            </div>
          </div>

          {/* Retardo Escalonado */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <label style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-secondary)' }}>
                Retardo Escalonado (Stagger):
              </label>
              <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--brand-accent)' }}>
                {settings.staggerDelay}s
              </span>
            </div>
            <input
              type="range"
              min="0.01"
              max="0.12"
              step="0.01"
              value={settings.staggerDelay}
              onChange={(e) => handleApply({ staggerDelay: parseFloat(e.target.value), animationPreset: '' })}
              style={{ width: '100%', accentColor: 'var(--brand-accent)', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
              <span>0.01s (Simultáneo)</span>
              <span>0.04s (Recomendado)</span>
              <span>0.12s (Onda lenta)</span>
            </div>
          </div>

          {/* Escala en Hover */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <label style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-secondary)' }}>
                Elevación al Pasar el Cursor:
              </label>
              <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--brand-accent)' }}>
                {settings.hoverScale}x
              </span>
            </div>
            <input
              type="range"
              min="1.01"
              max="1.08"
              step="0.01"
              value={settings.hoverScale}
              onChange={(e) => handleApply({ hoverScale: parseFloat(e.target.value), animationPreset: '' })}
              style={{ width: '100%', accentColor: 'var(--brand-accent)', cursor: 'pointer' }}
            />
          </div>

          {/* Interruptor de Reflejo */}
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '0.86rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            <input
              type="checkbox"
              checked={settings.enableSpecularSweep}
              onChange={(e) => handleApply({ enableSpecularSweep: e.target.checked })}
              style={{ width: '18px', height: '18px', accentColor: 'var(--brand-accent)' }}
            />
            <span>Efecto de Reflejo de Seda Brillante (Specular Sweep)</span>
          </label>

          {/* Caja de Vista Previa */}
          <div style={{ background: 'var(--canvas-elevated)', borderRadius: '18px', padding: '1.2rem', border: '1px solid var(--border-light)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '0.76rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Previsualización en Vivo:
              </span>
              <button
                type="button"
                onClick={restartPreview}
                style={{ background: 'transparent', border: 'none', color: 'var(--brand-accent)', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '5px' }}
              >
                <Play size={13} /> Reiniciar
              </button>
            </div>

            <div key={previewKey} style={{ display: 'flex', gap: '10px', overflowX: 'auto', padding: '6px 0' }}>
              {[1, 2, 3].map((num, i) => (
                <div
                  key={num}
                  style={{
                    flex: 1,
                    minWidth: '95px',
                    height: '95px',
                    borderRadius: '14px',
                    background: 'var(--canvas-surface)',
                    border: '1.5px solid var(--border-brand)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '8px',
                    boxShadow: 'var(--shadow-sm)',
                    animation: `previewAnim-${settings.animationType} ${settings.animationSpeed}s cubic-bezier(0.16, 1, 0.3, 1) ${i * settings.staggerDelay}s backwards`,
                    transition: `transform 0.2s ease`
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = `scale(${settings.hoverScale})`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                >
                  <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--brand-accent)' }}>Prenda {num}</span>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-secondary)' }}>45.000 FCFA</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECCIÓN 2: TEMÁTICA NAVIDEÑA & FIN DE AÑO */}
        <div 
          className="glass-panel"
          style={{
            background: 'var(--canvas-surface)',
            borderRadius: '22px',
            padding: '1.8rem',
            border: '1px solid var(--border-light)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.4rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid var(--border-light)', paddingBottom: '12px' }}>
            <InteractiveSantaHat size={36} />
            <div>
              <h4 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                2. Temática Navideña 3D & Fin de Año
              </h4>
              <span style={{ fontSize: '0.76rem', color: isChristmasActive ? '#15803D' : '#64748B', fontWeight: 800 }}>
                {isChristmasActive ? '🟢 Efectos Festivos ACTIVOS en la Boutique' : '⚪ Modo Festivo Inactivo'}
              </span>
            </div>
          </div>

          {/* Selector de Modo Navideño */}
          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>
              Modo de Encendido:
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                {
                  id: 'auto' as ChristmasMode,
                  title: '📅 Automático (1 de Diciembre al 6 de Enero)',
                  desc: 'Se enciende solo durante todo diciembre y hasta la fiesta de Reyes.'
                },
                {
                  id: 'enabled' as ChristmasMode,
                  title: '⭐ Forzar Activado (Activar Ahora Mismo)',
                  desc: 'Enciende las luces, flores, globos, fuegos artificiales y gorros 3D.'
                },
                {
                  id: 'disabled' as ChristmasMode,
                  title: '🚫 Desactivado (Apagar Temática)',
                  desc: 'Mantiene el diseño clásico limpio sin motivos navideños.'
                },
              ].map(mode => (
                <div
                  key={mode.id}
                  onClick={() => handleApply({ christmasMode: mode.id })}
                  style={{
                    padding: '12px 14px',
                    borderRadius: '14px',
                    border: settings.christmasMode === mode.id ? '2px solid #DC2626' : '1px solid var(--border-light)',
                    background: settings.christmasMode === mode.id ? 'rgba(239, 68, 68, 0.08)' : 'var(--canvas-elevated)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px'
                  }}
                >
                  <input
                    type="radio"
                    checked={settings.christmasMode === mode.id}
                    onChange={() => handleApply({ christmasMode: mode.id })}
                    style={{ accentColor: '#DC2626', marginTop: '3px' }}
                  />
                  <div>
                    <span style={{ display: 'block', fontSize: '0.88rem', fontWeight: 800, color: settings.christmasMode === mode.id ? '#DC2626' : 'var(--text-primary)' }}>
                      {mode.title}
                    </span>
                    <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
                      {mode.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Opciones de Elementos Festivos Específicos */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-secondary)', display: 'block' }}>
              Elementos Visuales Festivos:
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '0.86rem', fontWeight: 600 }}>
              <input
                type="checkbox"
                checked={settings.christmasHats ?? true}
                onChange={(e) => handleApply({ christmasHats: e.target.checked })}
                style={{ width: '18px', height: '18px', accentColor: '#DC2626' }}
              />
              <span>🎅 Gorro de Santa Claus 3D Interactivo sobre Logotipo & Prendas</span>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '0.86rem', fontWeight: 600 }}>
              <input
                type="checkbox"
                checked={settings.christmasLights ?? true}
                onChange={(e) => handleApply({ christmasLights: e.target.checked })}
                style={{ width: '18px', height: '18px', accentColor: '#DC2626' }}
              />
              <span>💡 Luces de Navidad Colgantes (Fairy Lights) en la Cabecera</span>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '0.86rem', fontWeight: 600 }}>
              <input
                type="checkbox"
                checked={settings.christmasFlowers ?? true}
                onChange={(e) => handleApply({ christmasFlowers: e.target.checked })}
                style={{ width: '18px', height: '18px', accentColor: '#DC2626' }}
              />
              <span>🌺 Flores Navideñas Poinsettias en Esquinas</span>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '0.86rem', fontWeight: 600 }}>
              <input
                type="checkbox"
                checked={settings.christmasBaubles ?? true}
                onChange={(e) => handleApply({ christmasBaubles: e.target.checked })}
                style={{ width: '18px', height: '18px', accentColor: '#DC2626' }}
              />
              <span>🎈 Globos & Esferas de Lujo Flotantes (Baubles 3D)</span>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '0.86rem', fontWeight: 600 }}>
              <input
                type="checkbox"
                checked={settings.christmasFireworks ?? true}
                onChange={(e) => handleApply({ christmasFireworks: e.target.checked })}
                style={{ width: '18px', height: '18px', accentColor: '#DC2626' }}
              />
              <span>🎆 Fuegos Artificiales Festivos (GPU Canvas 60fps)</span>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '0.86rem', fontWeight: 600 }}>
              <input
                type="checkbox"
                checked={settings.christmasSnow ?? true}
                onChange={(e) => handleApply({ christmasSnow: e.target.checked })}
                style={{ width: '18px', height: '18px', accentColor: '#DC2626' }}
              />
              <span>❄️ Copos de Nieve Cristalinos & Polvo de Oro Flotante</span>
            </label>
          </div>

          {/* Demostración Interactiva del Gorro 3D */}
          <div style={{ background: 'var(--canvas-elevated)', borderRadius: '18px', padding: '1.2rem', textAlign: 'center', border: '1px solid var(--border-light)' }}>
            <span style={{ fontSize: '0.76rem', fontWeight: 800, color: 'var(--text-secondary)', display: 'block', marginBottom: '8px', textTransform: 'uppercase' }}>
              Muestra Interactiva del Gorro 3D (Tócame o Arrástrame):
            </span>
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', position: 'relative', padding: '12px 24px' }}>
              <InteractiveSantaHat size={54} style={{ position: 'absolute', top: '-18px', left: '16px' }} />
              <div style={{ width: '68px', height: '68px', borderRadius: '50%', background: '#fff', border: '2px solid var(--border-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-md)' }}>
                <img src="/icons/ebna-logo.png" alt="EBNA" style={{ width: '52px', height: '52px', borderRadius: '50%' }} />
              </div>
            </div>
            <p style={{ margin: '8px 0 0 0', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              Posicionado con elegancia sobre el logo oficial en portada y barra superior.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes previewAnim-slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes previewAnim-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes previewAnim-scale-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes previewAnim-flip-3d {
          from { opacity: 0; transform: perspective(600px) rotateX(15deg); }
          to { opacity: 1; transform: perspective(600px) rotateX(0deg); }
        }
      `}</style>
    </div>
  );
};
