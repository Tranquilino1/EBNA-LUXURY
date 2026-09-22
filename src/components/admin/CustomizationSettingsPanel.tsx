import React, { useState } from 'react';
import { useCustomization } from '../../contexts/CustomizationContext';
import { ChristmasHat } from '../effects/ChristmasHat';
import { Sparkles, Play, RotateCcw, Check, Sliders } from 'lucide-react';
import type { AnimationType, ChristmasMode } from '../../types';

export const CustomizationSettingsPanel: React.FC = () => {
  const { settings, isChristmasActive, updateSettings, resetToDefaults } = useCustomization();
  const [saveFeedback, setSaveFeedback] = useState(false);
  const [previewKey, setPreviewKey] = useState(0);

  const handleApply = (newValues: any) => {
    updateSettings(newValues);
    setSaveFeedback(true);
    setPreviewKey(prev => prev + 1);
    setTimeout(() => setSaveFeedback(false), 2000);
  };

  const restartPreview = () => {
    setPreviewKey(prev => prev + 1);
  };

  return (
    <div className="customization-settings-panel" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Top Banner */}
      <div 
        style={{
          background: 'linear-gradient(135deg, rgba(216, 27, 96, 0.08), rgba(212, 175, 55, 0.12))',
          borderRadius: '24px',
          padding: '1.5rem 2rem',
          border: '1.5px solid var(--border-brand)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ background: 'var(--brand-accent)', color: 'white', padding: '12px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Sliders size={24} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 style={{ margin: 0, fontSize: '1.3rem', fontFamily: 'var(--font-serif)', color: 'var(--text-primary)' }}>
                Personalización & Animaciones del Sitio
              </h3>
              {saveFeedback && (
                <span style={{ background: '#10B981', color: 'white', fontSize: '0.72rem', fontWeight: 800, padding: '2px 8px', borderRadius: '12px', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                  <Check size={12} /> ¡Guardado en Vivo!
                </span>
              )}
            </div>
            <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Configura los tiempos de animación, transiciones de productos y la temática navideña 3D en tiempo real.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={resetToDefaults}
          style={{
            padding: '8px 16px',
            borderRadius: '20px',
            border: '1px solid var(--border-subtle)',
            background: 'var(--canvas-surface)',
            color: 'var(--text-secondary)',
            fontSize: '0.82rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px'
          }}
          title="Restaurar valores de fábrica"
        >
          <RotateCcw size={14} /> Restaurar Por Defecto
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.8rem' }}>
        {/* SECCIÓN 1: ANIMACIONES Y PRESENTACIÓN */}
        <div 
          className="glass-panel"
          style={{
            background: 'var(--canvas-surface)',
            borderRadius: '20px',
            padding: '1.8rem',
            border: '1px solid var(--border-light)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.4rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--border-light)', paddingBottom: '10px' }}>
            <Sparkles size={20} color="var(--brand-accent)" />
            <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              1. Animaciones de Productos (Inicio & Catálogo)
            </h4>
          </div>

          {/* Tipo de Animación */}
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>
              Tipo de Animación de Aparición:
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
                  onClick={() => handleApply({ animationType: opt.id as AnimationType })}
                  style={{
                    padding: '10px 12px',
                    borderRadius: '12px',
                    border: settings.animationType === opt.id ? '2px solid var(--brand-accent)' : '1px solid var(--border-light)',
                    background: settings.animationType === opt.id ? 'var(--brand-gold-light)' : 'var(--canvas-elevated)',
                    color: settings.animationType === opt.id ? 'var(--brand-accent)' : 'var(--text-primary)',
                    fontWeight: settings.animationType === opt.id ? 800 : 600,
                    fontSize: '0.82rem',
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
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Velocidad de Animación (Duración):
              </label>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--brand-accent)' }}>
                {settings.animationSpeed}s
              </span>
            </div>
            <input
              type="range"
              min="0.2"
              max="1.2"
              step="0.05"
              value={settings.animationSpeed}
              onChange={(e) => handleApply({ animationSpeed: parseFloat(e.target.value) })}
              style={{ width: '100%', accentColor: 'var(--brand-accent)', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
              <span>0.2s (Rápido)</span>
              <span>0.5s (Equilibrado)</span>
              <span>1.2s (Cinemático)</span>
            </div>
          </div>

          {/* Retardo Escalonado (Stagger) */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Retardo Escalonado entre Tarjetas (Stagger):
              </label>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--brand-accent)' }}>
                {settings.staggerDelay}s
              </span>
            </div>
            <input
              type="range"
              min="0.01"
              max="0.12"
              step="0.01"
              value={settings.staggerDelay}
              onChange={(e) => handleApply({ staggerDelay: parseFloat(e.target.value) })}
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
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Escala de Elevación al pasar el ratón (Hover):
              </label>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--brand-accent)' }}>
                {settings.hoverScale}x
              </span>
            </div>
            <input
              type="range"
              min="1.01"
              max="1.08"
              step="0.01"
              value={settings.hoverScale}
              onChange={(e) => handleApply({ hoverScale: parseFloat(e.target.value) })}
              style={{ width: '100%', accentColor: 'var(--brand-accent)', cursor: 'pointer' }}
            />
          </div>

          {/* Efectos complementarios */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}>
              <input
                type="checkbox"
                checked={settings.enableSpecularSweep}
                onChange={(e) => handleApply({ enableSpecularSweep: e.target.checked })}
                style={{ width: '18px', height: '18px', accentColor: 'var(--brand-accent)' }}
              />
              <span>Efecto de Reflejo de Brillo Brillante (Specular Sweep)</span>
            </label>
          </div>

          {/* Caja de Vista Previa en Vivo */}
          <div style={{ background: 'var(--canvas-elevated)', borderRadius: '16px', padding: '1rem', border: '1px solid var(--border-light)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                Previsualización en Vivo:
              </span>
              <button
                type="button"
                onClick={restartPreview}
                style={{ background: 'transparent', border: 'none', color: 'var(--brand-accent)', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}
              >
                <Play size={12} /> Reiniciar Animación
              </button>
            </div>

            <div key={previewKey} style={{ display: 'flex', gap: '8px', overflowX: 'auto', padding: '4px 0' }}>
              {[1, 2, 3].map((num, i) => (
                <div
                  key={num}
                  style={{
                    flex: 1,
                    minWidth: '85px',
                    height: '90px',
                    borderRadius: '12px',
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
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--brand-accent)' }}>Producto {num}</span>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>25.000 FCFA</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECCIÓN 2: TEMÁTICA NAVIDEÑA DE ALTA COSTURA */}
        <div 
          className="glass-panel"
          style={{
            background: 'var(--canvas-surface)',
            borderRadius: '20px',
            padding: '1.8rem',
            border: '1px solid var(--border-light)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.4rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid var(--border-light)', paddingBottom: '10px' }}>
            <ChristmasHat size={28} />
            <div>
              <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                2. Temática Navideña 3D & Fin de Año
              </h4>
              <span style={{ fontSize: '0.75rem', color: isChristmasActive ? '#15803D' : '#64748B', fontWeight: 700 }}>
                {isChristmasActive ? '🟢 Modo Navideño ACTIVO en la tienda' : '⚪ Modo Navideño Inactivo'}
              </span>
            </div>
          </div>

          {/* Selector de Modo Navideño */}
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>
              Modo de Activación Navideña:
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                {
                  id: 'auto' as ChristmasMode,
                  title: '📅 Automático (1 de Diciembre al 6 de Enero)',
                  desc: 'Se enciende automáticamente durante todo diciembre y hasta la fiesta de Reyes.'
                },
                {
                  id: 'enabled' as ChristmasMode,
                  title: '⭐ Forzar Activado (Activar Ahora Mismo)',
                  desc: 'Enciende la temática en cualquier momento para pruebas o promociones anticipadas.'
                },
                {
                  id: 'disabled' as ChristmasMode,
                  title: '🚫 Desactivado (Apagar Temática)',
                  desc: 'Mantiene el diseño clásico apagado en todo momento.'
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

          {/* Opciones de Elementos Navideños */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block' }}>
              Elementos Festivos Disponibles:
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}>
              <input
                type="checkbox"
                checked={settings.christmasHats}
                onChange={(e) => handleApply({ christmasHats: e.target.checked })}
                style={{ width: '18px', height: '18px', accentColor: '#DC2626' }}
              />
              <span>Gorros Rojos 3D Animados con Pompón en Logotipos y Ofertas</span>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}>
              <input
                type="checkbox"
                checked={settings.christmasSnow}
                onChange={(e) => handleApply({ christmasSnow: e.target.checked })}
                style={{ width: '18px', height: '18px', accentColor: '#DC2626' }}
              />
              <span>Copos de Nieve Cristalinos & Motas Doradas Flotantes</span>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}>
              <input
                type="checkbox"
                checked={settings.christmasBanner}
                onChange={(e) => handleApply({ christmasBanner: e.target.checked })}
                style={{ width: '18px', height: '18px', accentColor: '#DC2626' }}
              />
              <span>Banner Promocional Superior de Navidad & Fin de Año</span>
            </label>
          </div>

          {/* Demostración de Gorro 3D */}
          <div style={{ background: 'var(--canvas-elevated)', borderRadius: '16px', padding: '1.2rem', textAlign: 'center', border: '1px solid var(--border-light)' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>
              Muestra del Gorro 3D Animado:
            </span>
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', position: 'relative', padding: '10px 20px' }}>
              <ChristmasHat size={46} style={{ position: 'absolute', top: '-14px', left: '12px' }} />
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#fff', border: '2px solid var(--border-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-sm)' }}>
                <img src="/icons/ebna-logo.png" alt="EBNA" style={{ width: '48px', height: '48px', borderRadius: '50%' }} />
              </div>
            </div>
            <p style={{ margin: '8px 0 0 0', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Aparece colocado con estilo sobre el logo en la barra de navegación, pie de página y colecciones.
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
