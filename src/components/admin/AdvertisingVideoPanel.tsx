import React, { useState } from 'react';
import { 
  Film, Sparkles, Upload, CheckCircle2, 
  Eye, Smartphone, Monitor, AlertCircle 
} from 'lucide-react';
import { useCustomization } from '../../contexts/CustomizationContext';
import { 
  extractYouTubeId, 
  getYouTubeEmbedUrl, 
  FASHION_VIDEO_PRESETS, 
} from '../../lib/videoUtils';
import type { FashionVideoPreset } from '../../lib/videoUtils';
import { AnimatedSvgVideo } from '../home/AnimatedSvgVideo';
import { notifyCatalogChange } from '../../lib/broadcast';

export const AdvertisingVideoPanel: React.FC = () => {
  const { settings, updateSettings } = useCustomization();

  // Mode: youtube, svg_animated, mp4
  const [videoType, setVideoType] = useState<'youtube' | 'svg_animated' | 'mp4'>(
    settings.videoType || (extractYouTubeId(settings.videoUrl) ? 'youtube' : 'youtube')
  );

  const [youtubeUrl, setYoutubeUrl] = useState(
    settings.videoType === 'youtube' && settings.videoUrl
      ? settings.videoUrl
      : 'https://www.youtube.com/watch?v=Fj2F1l_P32E'
  );

  const [svgPreset, setSvgPreset] = useState<'luxury_runway' | 'golden_glamour' | 'haute_couture_neon'>(
    settings.videoSvgPreset || 'luxury_runway'
  );

  const [mp4Url, setMp4Url] = useState(
    settings.videoType === 'mp4' && settings.videoUrl
      ? settings.videoUrl
      : 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
  );

  const [campaignTitle, setCampaignTitle] = useState(
    settings.videoTitle || 'Sindy Luxury: La Esencia de la Pasarela en Guinea Ecuatorial'
  );
  const [campaignSubtitle, setCampaignSubtitle] = useState(
    settings.videoSubtitle || 'Espacio cinematográfico de alta costura, vestidos de gala y estilo internacional en Malabo y Bata.'
  );
  const [audioDefault, setAudioDefault] = useState(settings.videoAudioDefault || false);
  const [videoQuality, setVideoQuality] = useState<'4K' | '1080p' | '720p' | 'auto'>(
    (settings.videoQuality as any) || '1080p'
  );

  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [uploadFileName, setUploadFileName] = useState<string | null>(null);

  const detectedYouTubeId = extractYouTubeId(youtubeUrl);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadFileName(file.name);
      const url = URL.createObjectURL(file);
      setMp4Url(url);
      setVideoType('mp4');
    }
  };

  const handleApplyPreset = (preset: FashionVideoPreset) => {
    setVideoType(preset.type);
    if (preset.type === 'youtube') {
      setYoutubeUrl(preset.url);
    } else if (preset.type === 'svg_animated' && preset.svgPreset) {
      setSvgPreset(preset.svgPreset);
    } else if (preset.type === 'mp4') {
      setMp4Url(preset.url);
    }
    setCampaignTitle(preset.title);
    setCampaignSubtitle(preset.subtitle);
  };

  const handleSave = () => {
    const finalUrl = videoType === 'youtube' ? youtubeUrl : videoType === 'mp4' ? mp4Url : '';
    
    updateSettings({
      videoType,
      videoUrl: finalUrl,
      videoSvgPreset: svgPreset,
      videoTitle: campaignTitle,
      videoSubtitle: campaignSubtitle,
      videoAudioDefault: audioDefault,
      videoQuality,
    });

    notifyCatalogChange('customization_update');
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3500);
  };

  return (
    <div className="advertising-video-panel" style={{ color: 'var(--text-primary)' }}>
      {/* Top Banner Header */}
      <div 
        className="glass-panel" 
        style={{ 
          background: 'linear-gradient(135deg, rgba(216, 27, 96, 0.08), rgba(15, 23, 42, 0.04))', 
          border: '1.5px solid rgba(216, 27, 96, 0.25)', 
          borderRadius: '20px', 
          padding: '1.8rem', 
          marginBottom: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.2rem'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <span style={{ background: 'linear-gradient(135deg, #D81B60, #C2185B)', color: 'white', padding: '6px 12px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', fontWeight: 800 }}>
              <Film size={16} /> MÓDULO PUBLICIDAD & VIDEO EN PORTADA
            </span>
            <span style={{ background: 'rgba(34, 197, 94, 0.12)', color: '#16a34a', border: '1px solid rgba(34, 197, 94, 0.3)', padding: '4px 10px', borderRadius: '20px', fontSize: '0.74rem', fontWeight: 700 }}>
              ● Transmisión en Vivo
            </span>
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '6px 0 4px 0', color: 'var(--text-primary)' }}>
            Administración de Video Publicitario & Pasarela
          </h2>
          <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-secondary)', maxWidth: '680px' }}>
            Personaliza el video destacado de la página principal. Soporta pegar enlaces de <strong>YouTube o Shorts</strong>, activar <strong>diseños animados vectoriales en SVG</strong> o enlazar archivos de video.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '0.85rem 1.8rem',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #D81B60, #C2185B)',
            color: 'white',
            border: 'none',
            fontSize: '0.92rem',
            fontWeight: 800,
            cursor: 'pointer',
            boxShadow: '0 6px 20px rgba(216, 27, 96, 0.35)',
            transition: 'all 0.2s ease'
          }}
        >
          {saveSuccess ? <><CheckCircle2 size={18} /> ¡Publicado en Vivo!</> : <><Sparkles size={18} /> Guardar & Publicar al Instante</>}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem' }}>
        {/* LEFT COLUMN: Controls & Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* 1. Video Source Format Selector */}
          <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '18px', border: '1px solid var(--border-subtle)', background: 'var(--canvas-elevated)' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              1. Selecciona el Tipo de Contenido Publicitario
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              {/* Option A: YouTube */}
              <button
                type="button"
                onClick={() => setVideoType('youtube')}
                style={{
                  padding: '14px 10px',
                  borderRadius: '14px',
                  border: videoType === 'youtube' ? '2px solid #EF4444' : '1px solid var(--border-subtle)',
                  background: videoType === 'youtube' ? 'rgba(239, 68, 68, 0.08)' : 'var(--canvas-surface)',
                  color: videoType === 'youtube' ? '#DC2626' : 'var(--text-primary)',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: videoType === 'youtube' ? '0 4px 12px rgba(239,68,68,0.2)' : 'none'
                }}
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill={videoType === 'youtube' ? '#DC2626' : '#64748B'}>
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <span>YouTube / Shorts</span>
                <span style={{ fontSize: '0.68rem', opacity: 0.8, fontWeight: 500 }}>Pegar Enlace</span>
              </button>

              {/* Option B: SVG Animated */}
              <button
                type="button"
                onClick={() => setVideoType('svg_animated')}
                style={{
                  padding: '14px 10px',
                  borderRadius: '14px',
                  border: videoType === 'svg_animated' ? '2px solid #D81B60' : '1px solid var(--border-subtle)',
                  background: videoType === 'svg_animated' ? 'rgba(216, 27, 96, 0.08)' : 'var(--canvas-surface)',
                  color: videoType === 'svg_animated' ? '#D81B60' : 'var(--text-primary)',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: videoType === 'svg_animated' ? '0 4px 12px rgba(216,27,96,0.2)' : 'none'
                }}
              >
                <Sparkles size={26} color={videoType === 'svg_animated' ? '#D81B60' : '#64748B'} />
                <span>Diseño SVG 4K</span>
                <span style={{ fontSize: '0.68rem', opacity: 0.8, fontWeight: 500 }}>Animación Vectorial</span>
              </button>

              {/* Option C: Direct MP4 */}
              <button
                type="button"
                onClick={() => setVideoType('mp4')}
                style={{
                  padding: '14px 10px',
                  borderRadius: '14px',
                  border: videoType === 'mp4' ? '2px solid #3B82F6' : '1px solid var(--border-subtle)',
                  background: videoType === 'mp4' ? 'rgba(59, 130, 246, 0.08)' : 'var(--canvas-surface)',
                  color: videoType === 'mp4' ? '#2563EB' : 'var(--text-primary)',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: videoType === 'mp4' ? '0 4px 12px rgba(59,130,246,0.2)' : 'none'
                }}
              >
                <Film size={26} color={videoType === 'mp4' ? '#2563EB' : '#64748B'} />
                <span>Video MP4 / CDN</span>
                <span style={{ fontSize: '0.68rem', opacity: 0.8, fontWeight: 500 }}>Subir o Enlazar</span>
              </button>
            </div>
          </div>

          {/* 2. Source Configuration Details */}
          <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '18px', border: '1px solid var(--border-subtle)', background: 'var(--canvas-elevated)' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '1rem' }}>
              2. Configurar Fuente Audiovisual
            </h3>

            {/* A: YouTube Input */}
            {videoType === 'youtube' && (
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
                  Enlace de YouTube o YouTube Shorts:
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="url"
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=Fj2F1l_P32E o https://youtu.be/..."
                    style={{
                      flex: 1,
                      padding: '12px 14px',
                      borderRadius: '12px',
                      border: '1.5px solid var(--border-subtle)',
                      background: 'var(--canvas-surface)',
                      color: 'var(--text-primary)',
                      fontSize: '0.9rem',
                      fontFamily: 'monospace'
                    }}
                  />
                </div>

                <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem' }}>
                  {detectedYouTubeId ? (
                    <span style={{ color: '#16a34a', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <CheckCircle2 size={16} /> Enlace de YouTube válido (ID: {detectedYouTubeId})
                    </span>
                  ) : (
                    <span style={{ color: '#ea580c', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <AlertCircle size={16} /> Pega un enlace completo de YouTube (ej. https://youtube.com/watch?v=...)
                    </span>
                  )}
                </div>

                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '8px' }}>
                  Soporta enlaces normales de YouTube, enlaces cortos (youtu.be), videos verticales (YouTube Shorts) y códigos embed.
                </p>
              </div>
            )}

            {/* B: SVG Motion Preset Selector */}
            {videoType === 'svg_animated' && (
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px' }}>
                  Tema Vectorial de Pasarela (SVG Motion):
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    { id: 'luxury_runway' as const, name: 'Pasarela Alta Costura París-Malabo', desc: 'Silueta de modelo con traje de noche, reflectores móviles y polvo de oro.' },
                    { id: 'golden_glamour' as const, name: 'Brillo Diamante & Oro Imperial', desc: 'Geometría sagrada 3D de diamantes reflectantes inspirada en joyería de gala.' },
                    { id: 'haute_couture_neon' as const, name: 'Gala Neón & Noche Chic Internacional', desc: 'Ondas luminosas de alta frecuencia en fucsia couture y monograma dorado.' },
                  ].map((preset) => (
                    <div
                      key={preset.id}
                      onClick={() => setSvgPreset(preset.id)}
                      style={{
                        padding: '12px 14px',
                        borderRadius: '12px',
                        border: svgPreset === preset.id ? '2px solid #D81B60' : '1px solid var(--border-subtle)',
                        background: svgPreset === preset.id ? 'rgba(216, 27, 96, 0.08)' : 'var(--canvas-surface)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: 700, fontSize: '0.88rem', color: svgPreset === preset.id ? '#D81B60' : 'var(--text-primary)' }}>
                          {preset.name}
                        </span>
                        {svgPreset === preset.id && <CheckCircle2 size={16} color="#D81B60" />}
                      </div>
                      <p style={{ margin: '4px 0 0 0', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                        {preset.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* C: Direct MP4 / File Upload */}
            {videoType === 'mp4' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
                    URL Directa de Video (MP4 / WebM):
                  </label>
                  <input
                    type="url"
                    value={mp4Url}
                    onChange={(e) => setMp4Url(e.target.value)}
                    placeholder="https://tudominio.com/videos/campana-2026.mp4"
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '12px',
                      border: '1.5px solid var(--border-subtle)',
                      background: 'var(--canvas-surface)',
                      color: 'var(--text-primary)',
                      fontSize: '0.9rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
                    O Subir Archivo de Video desde este Dispositivo:
                  </label>
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      padding: '14px',
                      borderRadius: '12px',
                      border: '2px dashed var(--border-subtle)',
                      background: 'var(--canvas-surface)',
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      color: 'var(--brand-accent)'
                    }}
                  >
                    <Upload size={18} />
                    <span>{uploadFileName ? `Archivo cargado: ${uploadFileName}` : 'Seleccionar Video MP4/WebM...'}</span>
                    <input type="file" accept="video/mp4,video/webm" onChange={handleFileUpload} style={{ display: 'none' }} />
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* 3. Text & Audio Campaign Customization */}
          <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '18px', border: '1px solid var(--border-subtle)', background: 'var(--canvas-elevated)' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '1rem' }}>
              3. Titulares del Banner Publicitario
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '4px' }}>
                  Título de la Campaña:
                </label>
                <input
                  type="text"
                  value={campaignTitle}
                  onChange={(e) => setCampaignTitle(e.target.value)}
                  placeholder="Sindy Luxury: La Esencia de la Pasarela en Guinea Ecuatorial"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '10px',
                    border: '1px solid var(--border-subtle)',
                    background: 'var(--canvas-surface)',
                    color: 'var(--text-primary)',
                    fontSize: '0.88rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '4px' }}>
                  Subtítulo / Eslogan de Moda:
                </label>
                <textarea
                  rows={2}
                  value={campaignSubtitle}
                  onChange={(e) => setCampaignSubtitle(e.target.value)}
                  placeholder="Espacio cinematográfico de alta costura, vestidos de gala y estilo internacional en Malabo y Bata."
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '10px',
                    border: '1px solid var(--border-subtle)',
                    background: 'var(--canvas-surface)',
                    color: 'var(--text-primary)',
                    fontSize: '0.88rem'
                  }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4px' }}>
                <input
                  type="checkbox"
                  id="adminAudioToggle"
                  checked={audioDefault}
                  onChange={(e) => setAudioDefault(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: '#D81B60', cursor: 'pointer' }}
                />
                <label htmlFor="adminAudioToggle" style={{ fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}>
                  Activar sonido automáticamente al cargar la página (recomendado apagado para no asustar en móvil)
                </label>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '4px' }}>
                  Resolución / Calidad de Video Preferida:
                </label>
                <select
                  value={videoQuality}
                  onChange={(e) => setVideoQuality(e.target.value as any)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '10px',
                    border: '1px solid var(--border-subtle)',
                    background: 'var(--canvas-surface)',
                    color: 'var(--text-primary)',
                    fontSize: '0.88rem',
                    fontWeight: 600
                  }}
                >
                  <option value="1080p">1080p Full HD (Recomendada para alta velocidad)</option>
                  <option value="4K">4K Ultra HD (Máxima fidelidad cinematográfica)</option>
                  <option value="720p">720p HD (Ahorro de datos móviles)</option>
                  <option value="auto">Automática según conexión del cliente</option>
                </select>
              </div>
            </div>
          </div>

          {/* 4. Quick Pre-Configured Presets */}
          <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '18px', border: '1px solid var(--border-subtle)', background: 'var(--canvas-elevated)' }}>
            <h3 style={{ fontSize: '0.92rem', fontWeight: 800, marginBottom: '0.8rem', color: 'var(--brand-accent)' }}>
              ⚡ Preajustes Recomendados de Moda (1 Clic)
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '8px' }}>
              {FASHION_VIDEO_PRESETS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handleApplyPreset(p)}
                  style={{
                    padding: '10px 12px',
                    borderRadius: '10px',
                    border: '1px solid rgba(216, 27, 96, 0.2)',
                    background: 'rgba(216, 27, 96, 0.05)',
                    color: 'var(--text-primary)',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                    <span style={{ fontWeight: 700, color: 'var(--brand-accent)' }}>{p.title}</span>
                    <span style={{ fontSize: '0.65rem', background: '#D81B60', color: 'white', padding: '1px 6px', borderRadius: '4px', fontWeight: 800 }}>
                      {p.badge}
                    </span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                    {p.subtitle.slice(0, 60)}...
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Live Interactive Player Preview */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '18px', border: '1px solid var(--border-subtle)', background: 'var(--canvas-elevated)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Eye size={18} color="#D81B60" />
                <h3 style={{ fontSize: '1rem', fontWeight: 800, margin: 0 }}>
                  Vista Previa en Vivo (Cliente)
                </h3>
              </div>

              {/* Viewport switch: Desktop / Mobile */}
              <div style={{ display: 'flex', gap: '4px', background: 'var(--canvas-surface)', padding: '3px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
                <button
                  type="button"
                  onClick={() => setPreviewDevice('desktop')}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '8px',
                    border: 'none',
                    background: previewDevice === 'desktop' ? '#D81B60' : 'transparent',
                    color: previewDevice === 'desktop' ? 'white' : 'var(--text-secondary)',
                    fontWeight: 700,
                    fontSize: '0.74rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <Monitor size={14} /> Desktop
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewDevice('mobile')}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '8px',
                    border: 'none',
                    background: previewDevice === 'mobile' ? '#D81B60' : 'transparent',
                    color: previewDevice === 'mobile' ? 'white' : 'var(--text-secondary)',
                    fontWeight: 700,
                    fontSize: '0.74rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <Smartphone size={14} /> Móvil
                </button>
              </div>
            </div>

            {/* Container for Preview */}
            <div 
              style={{ 
                maxWidth: previewDevice === 'mobile' ? '360px' : '100%', 
                margin: '0 auto', 
                borderRadius: '16px', 
                overflow: 'hidden', 
                border: '2px solid rgba(216, 27, 96, 0.4)',
                boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                background: '#0B0207'
              }}
            >
              {/* Simulated Headline */}
              <div style={{ padding: '14px 16px', background: 'rgba(20, 5, 15, 0.95)', borderBottom: '1px solid rgba(216, 27, 96, 0.2)' }}>
                <span style={{ fontSize: '0.7rem', color: '#D81B60', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '2px' }}>
                  {videoType === 'youtube' ? '▶️ TRANSMISIÓN YOUTUBE' : videoType === 'svg_animated' ? '✨ DISEÑO VECTORIAL 4K' : '🎬 STREAM MP4'}
                </span>
                <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#FFFFFF', margin: 0, lineHeight: 1.3 }}>
                  {campaignTitle}
                </h4>
                <p style={{ margin: '4px 0 0 0', fontSize: '0.74rem', color: '#CBD5E1', lineHeight: 1.4 }}>
                  {campaignSubtitle}
                </p>
              </div>

              {/* Player Area */}
              <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', background: '#000' }}>
                {videoType === 'youtube' ? (
                  <iframe
                    src={getYouTubeEmbedUrl(detectedYouTubeId || 'Fj2F1l_P32E', {
                      autoplay: false,
                      mute: true,
                      controls: true,
                    })}
                    title="Preview YouTube"
                    style={{ width: '100%', height: '100%', border: 'none' }}
                  />
                ) : videoType === 'svg_animated' ? (
                  <AnimatedSvgVideo
                    preset={svgPreset}
                    title={campaignTitle}
                    subtitle={campaignSubtitle}
                    isMuted={true}
                    interactive={true}
                  />
                ) : (
                  <video
                    src={mp4Url}
                    controls
                    playsInline
                    muted
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                )}
              </div>
            </div>

            <div style={{ marginTop: '1.2rem', textAlign: 'center' }}>
              <button
                type="button"
                onClick={handleSave}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #D81B60, #C2185B)',
                  color: 'white',
                  border: 'none',
                  fontWeight: 800,
                  fontSize: '0.92rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 14px rgba(216, 27, 96, 0.35)'
                }}
              >
                {saveSuccess ? <><CheckCircle2 size={18} /> ¡Cambios Publicados con Éxito!</> : <><Sparkles size={18} /> Guardar & Aplicar al Instante</>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
