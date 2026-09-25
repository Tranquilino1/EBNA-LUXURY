import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, Pause, Volume2, VolumeX, Maximize, Minimize, 
  Settings, Sparkles, Check, ChevronDown, Film, X 
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useCustomization } from '../../contexts/CustomizationContext';
import { 
  extractYouTubeId, 
  getYouTubeEmbedUrl, 
  detectVideoType, 
  FASHION_VIDEO_PRESETS 
} from '../../lib/videoUtils';
import { AnimatedSvgVideo } from './AnimatedSvgVideo';
import { notifyCatalogChange } from '../../lib/broadcast';
import './fashionCinemaPlayer.css';

type QualityOption = '4K' | '1080p' | '720p' | 'auto';

export const FashionCinemaPlayer: React.FC = () => {
  const { isAdmin } = useAuth();
  const { settings, updateSettings } = useCustomization();

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(!settings.videoAudioDefault);
  const [volume, setVolume] = useState(0.85);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [quality, setQuality] = useState<QualityOption>((settings.videoQuality as QualityOption) || '1080p');
  const [isQualityOpen, setIsQualityOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isAdminConfigOpen, setIsAdminConfigOpen] = useState(false);

  // Admin config form state
  const [editType, setEditType] = useState<'youtube' | 'mp4' | 'svg_animated'>(
    settings.videoType || (extractYouTubeId(settings.videoUrl) ? 'youtube' : 'youtube')
  );
  const [editUrl, setEditUrl] = useState(settings.videoUrl || 'https://www.youtube.com/watch?v=Fj2F1l_P32E');
  const [editPoster, setEditPoster] = useState(settings.videoPoster || '');
  const [editSvgPreset, setEditSvgPreset] = useState<'luxury_runway' | 'golden_glamour' | 'haute_couture_neon'>(
    settings.videoSvgPreset || 'luxury_runway'
  );
  const [editTitle, setEditTitle] = useState(
    settings.videoTitle || 'Sindy Luxury: La Esencia de la Pasarela en Guinea Ecuatorial'
  );
  const [editSubtitle, setEditSubtitle] = useState(
    settings.videoSubtitle || 'Espacio cinematográfico de alta costura, vestidos de gala y estilo internacional en Malabo y Bata.'
  );
  const [editAudio, setEditAudio] = useState(settings.videoAudioDefault || false);

  const controlsTimeoutRef = useRef<any>(null);

  // Current detected media type
  const rawUrl = settings.videoUrl || '';
  const detectedType = detectVideoType(rawUrl, settings.videoType);
  const youtubeId = extractYouTubeId(rawUrl);
  const isYouTube = detectedType === 'youtube' || Boolean(youtubeId);
  const isSvg = detectedType === 'svg_animated';

  const posterImg = settings.videoPoster || '/products/sindy_luxury/vestido_amarillo_drapeado.jpg';

  useEffect(() => {
    const video = videoRef.current;
    if (!video || isYouTube || isSvg) return;

    const onTimeUpdate = () => setCurrentTime(video.currentTime);
    const onLoadedMetadata = () => setDuration(video.duration);
    const onEnded = () => setIsPlaying(false);

    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('loadedmetadata', onLoadedMetadata);
    video.addEventListener('ended', onEnded);

    return () => {
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
      video.removeEventListener('ended', onEnded);
    };
  }, [isYouTube, isSvg, rawUrl]);

  const handlePlayPause = () => {
    if (isYouTube || isSvg) {
      setIsPlaying(!isPlaying);
      return;
    }
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn('Playback error:', err);
      });
    }
  };

  const handleToggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    if (videoRef.current) {
      videoRef.current.muted = newMuted;
      if (!newMuted && videoRef.current.volume === 0) {
        videoRef.current.volume = 0.8;
        setVolume(0.8);
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      if (val === 0) {
        setIsMuted(true);
        videoRef.current.muted = true;
      } else if (isMuted) {
        setIsMuted(false);
        videoRef.current.muted = false;
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const handleToggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch((err) => {
        console.warn('Fullscreen error:', err);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      });
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3200);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleApplyPreset = (preset: typeof FASHION_VIDEO_PRESETS[0]) => {
    setEditType(preset.type);
    setEditUrl(preset.url);
    setEditTitle(preset.title);
    setEditSubtitle(preset.subtitle);
    if (preset.svgPreset) {
      setEditSvgPreset(preset.svgPreset);
    }
    if (preset.poster) {
      setEditPoster(preset.poster);
    }
  };

  const handleSaveAdminConfig = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      videoType: editType,
      videoUrl: editUrl,
      videoPoster: editPoster,
      videoTitle: editTitle,
      videoSubtitle: editSubtitle,
      videoAudioDefault: editAudio,
      videoSvgPreset: editSvgPreset,
      videoQuality: quality,
    });
    notifyCatalogChange('customization_update');
    setIsAdminConfigOpen(false);
  };

  return (
    <section className="fashion-cinema-section luxury-container">
      {/* Header Info */}
      <div className="fashion-cinema-header">
        <div className="cinema-badges-row">
          <span className="cinema-badge gold">
            <Sparkles size={13} /> COLECCIÓN HAUTE COUTURE 2026
          </span>
          <span className="cinema-badge hd">
            <Film size={13} />{' '}
            {isYouTube
              ? 'YOUTUBE CINEMA STREAM HD'
              : isSvg
              ? 'VECTOR MOTION DESIGN 4K'
              : quality === 'auto'
              ? '1080P FULL HD'
              : quality + ' CINEMATIC STREAM'}
          </span>
          {isAdmin && (
            <button 
              type="button" 
              className="cinema-admin-trigger-btn"
              onClick={() => setIsAdminConfigOpen(true)}
              title="Configurar video de YouTube, animación SVG o MP4 (Modo Administrador)"
            >
              <Settings size={13} /> ⚙️ Administrar Publicidad & Video
            </button>
          )}
        </div>

        <h2 className="cinema-headline">{settings.videoTitle || 'Sindy Luxury: La Esencia de la Pasarela en Guinea Ecuatorial'}</h2>
        <p className="cinema-subtext">{settings.videoSubtitle || 'Espacio cinematográfico de alta costura, vestidos de gala y estilo internacional en Malabo y Bata.'}</p>
      </div>

      {/* Main YouTube-Style Cinematic Player Frame */}
      <div 
        ref={containerRef}
        className={`fashion-cinema-container ${isFullscreen ? 'is-fullscreen' : ''}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => isPlaying && setShowControls(false)}
      >
        {/* Ambient Backlight Glow */}
        <div className={`cinema-ambient-glow ${isPlaying ? 'is-glowing' : ''}`} />

        <div className="cinema-video-frame">
          {/* CASE 1: YOUTUBE EMBED PLAYER */}
          {isYouTube ? (
            <div className="cinema-youtube-wrapper" style={{ width: '100%', height: '100%', position: 'relative', minHeight: '440px', background: '#000' }}>
              <iframe
                src={getYouTubeEmbedUrl(youtubeId || 'Fj2F1l_P32E', {
                  autoplay: isPlaying,
                  mute: isMuted,
                  controls: true,
                })}
                title={settings.videoTitle || 'Sindy Luxury Fashion Video'}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{
                  width: '100%',
                  height: '100%',
                  minHeight: '440px',
                  border: 'none',
                  display: 'block',
                }}
              />
            </div>
          ) : isSvg ? (
            /* CASE 2: HIGH-END ANIMATED SVG MOTION VIDEO */
            <AnimatedSvgVideo
              preset={settings.videoSvgPreset || 'luxury_runway'}
              title={settings.videoTitle || 'Sindy Luxury Haute Couture'}
              subtitle={settings.videoSubtitle || 'Pasarela de Gala & Estilo Internacional'}
              isMuted={isMuted}
              onToggleMute={handleToggleMute}
              interactive={true}
            />
          ) : (
            /* CASE 3: HTML5 DIRECT MP4 VIDEO */
            <>
              <video
                ref={videoRef}
                className="cinema-html5-video"
                src={rawUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'}
                poster={posterImg}
                playsInline
                preload="metadata"
                muted={isMuted}
                onClick={handlePlayPause}
              />

              {/* Big Center Play/Pause Ripple Button Overlay */}
              {(!isPlaying || showControls) && (
                <button
                  type="button"
                  className={`cinema-center-action-btn ${isPlaying ? 'is-playing' : 'is-paused'}`}
                  onClick={handlePlayPause}
                  aria-label={isPlaying ? 'Pausar video' : 'Reproducir video'}
                >
                  {isPlaying ? <Pause size={32} /> : <Play size={34} style={{ marginLeft: '4px' }} fill="currentColor" />}
                </button>
              )}

              {/* Bottom YouTube-Style Luxury Control Bar */}
              <div className={`cinema-controls-bar ${showControls ? 'is-visible' : 'is-hidden'}`}>
                {/* Seekbar Timeline */}
                <div className="cinema-timeline-wrapper">
                  <input
                    type="range"
                    min={0}
                    max={duration || 100}
                    step={0.1}
                    value={currentTime}
                    onChange={handleSeek}
                    className="cinema-timeline-slider"
                    style={{
                      backgroundSize: `${duration ? (currentTime / duration) * 100 : 0}% 100%`
                    }}
                  />
                </div>

                {/* Bottom Controls Row */}
                <div className="cinema-controls-row">
                  <div className="controls-left">
                    <button type="button" className="cinema-btn" onClick={handlePlayPause} title={isPlaying ? 'Pausar' : 'Reproducir'}>
                      {isPlaying ? <Pause size={18} /> : <Play size={18} fill="currentColor" />}
                    </button>

                    <div className="cinema-volume-group">
                      <button type="button" className="cinema-btn" onClick={handleToggleMute} title={isMuted ? 'Activar Sonido' : 'Silenciar'}>
                        {isMuted || volume === 0 ? <VolumeX size={18} color="#EF4444" /> : <Volume2 size={18} color="#10B981" />}
                      </button>
                      <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.05}
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        className="cinema-volume-slider"
                        title="Ajustar Volumen"
                      />
                    </div>

                    <span className="cinema-time-display">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>

                  <div className="controls-right">
                    {/* Quality Selector Dropdown */}
                    <div 
                      className="cinema-quality-menu-wrapper"
                      onMouseLeave={() => setIsQualityOpen(false)}
                    >
                      <button 
                        type="button" 
                        className="cinema-btn quality-badge-btn"
                        onClick={() => setIsQualityOpen(!isQualityOpen)}
                        title="Seleccionar calidad de reproducción"
                      >
                        <span>{quality === 'auto' ? 'HD' : quality}</span>
                        <ChevronDown size={13} />
                      </button>

                      {isQualityOpen && (
                        <div className="cinema-quality-dropdown glass-panel">
                          <div className="quality-dropdown-header">Calidad de Video</div>
                          {(['4K', '1080p', '720p', 'auto'] as QualityOption[]).map((q) => (
                            <button
                              key={q}
                              type="button"
                              className={`quality-opt-btn ${quality === q ? 'active' : ''}`}
                              onClick={() => {
                                setQuality(q);
                                setIsQualityOpen(false);
                              }}
                            >
                              <span>{q === 'auto' ? 'Automática (Recomendada)' : q + ' Alta Definición'}</span>
                              {quality === q && <Check size={14} color="#D81B60" />}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Fullscreen Button */}
                    <button type="button" className="cinema-btn" onClick={handleToggleFullscreen} title="Pantalla Completa">
                      {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Admin Fast Configuration Modal */}
      {isAdminConfigOpen && (
        <div className="cinema-admin-modal-overlay" onClick={() => setIsAdminConfigOpen(false)}>
          <div className="cinema-admin-modal-content glass-panel" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '580px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div className="modal-header-cinema">
              <div>
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  ⚙️ Administrador: Configuración de Publicidad & Video
                </h3>
                <p style={{ margin: '4px 0 0 0', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  Pega un enlace de YouTube, usa animaciones de pasarela SVG o un enlace de video MP4.
                </p>
              </div>
              <button type="button" className="modal-close-cinema" onClick={() => setIsAdminConfigOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveAdminConfig} className="cinema-admin-form">
              {/* Type Selection */}
              <div className="cinema-form-field">
                <label>Tipo de Publicidad Audiovisual</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginTop: '6px' }}>
                  {[
                    { id: 'youtube' as const, label: 'YouTube / Shorts', icon: '▶️' },
                    { id: 'svg_animated' as const, label: 'Diseño SVG 4K', icon: '✨' },
                    { id: 'mp4' as const, label: 'Video MP4 / CDN', icon: '🎬' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setEditType(t.id)}
                      style={{
                        padding: '10px 8px',
                        borderRadius: '12px',
                        border: editType === t.id ? '2px solid #D81B60' : '1px solid var(--border-subtle)',
                        background: editType === t.id ? 'rgba(216, 27, 96, 0.1)' : 'var(--canvas-elevated)',
                        color: editType === t.id ? '#D81B60' : 'var(--text-primary)',
                        fontWeight: 700,
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                        textAlign: 'center'
                      }}
                    >
                      <div style={{ fontSize: '1.2rem', marginBottom: '2px' }}>{t.icon}</div>
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* YouTube Link Field */}
              {editType === 'youtube' && (
                <div className="cinema-form-field">
                  <label>Enlace de YouTube (Video o Short)</label>
                  <input
                    type="url"
                    value={editUrl}
                    onChange={(e) => setEditUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=Fj2F1l_P32E"
                    required
                    style={{ fontFamily: 'monospace', fontSize: '0.88rem' }}
                  />
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '6px', fontSize: '0.78rem' }}>
                    <span style={{ color: extractYouTubeId(editUrl) ? '#16a34a' : '#ea580c', fontWeight: 600 }}>
                      {extractYouTubeId(editUrl) ? `✓ ID Detectado: ${extractYouTubeId(editUrl)}` : '⚠️ Introduce un enlace válido de YouTube'}
                    </span>
                  </div>
                </div>
              )}

              {/* SVG Preset Selection */}
              {editType === 'svg_animated' && (
                <div className="cinema-form-field">
                  <label>Diseño Vectorial Animado (SVG Motion)</label>
                  <select
                    value={editSvgPreset}
                    onChange={(e) => setEditSvgPreset(e.target.value as any)}
                    style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'var(--canvas-elevated)', color: 'var(--text-primary)', fontWeight: 600 }}
                  >
                    <option value="luxury_runway">Pasarela Alta Costura París — Malabo (Reflectores & Silueta)</option>
                    <option value="golden_glamour">Brillo Diamante & Oro Imperial (Geometría 3D Luxe)</option>
                    <option value="haute_couture_neon">Gala Neón & Noche Chic (Ondas de Frecuencia Couture)</option>
                  </select>
                </div>
              )}

              {/* MP4 Link Field */}
              {editType === 'mp4' && (
                <div className="cinema-form-field">
                  <label>URL Directa de Video (MP4 / WebM)</label>
                  <input
                    type="url"
                    value={editUrl}
                    onChange={(e) => setEditUrl(e.target.value)}
                    placeholder="https://servidor.com/video-pasarela.mp4"
                    required
                  />
                </div>
              )}

              {/* Quick Presets Carousel */}
              <div className="cinema-form-field">
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Preajustes Rápidos Recomendados</label>
                <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '6px', marginTop: '4px' }}>
                  {FASHION_VIDEO_PRESETS.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => handleApplyPreset(p)}
                      style={{
                        flexShrink: 0,
                        padding: '6px 10px',
                        borderRadius: '8px',
                        background: 'rgba(216, 27, 96, 0.08)',
                        border: '1px solid rgba(216, 27, 96, 0.25)',
                        color: 'var(--brand-accent)',
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      {p.title.slice(0, 24)}...
                    </button>
                  ))}
                </div>
              </div>

              {/* Title & Subtitle */}
              <div className="cinema-form-field">
                <label>Título del Bloque Promocional</label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="Sindy Luxury: La Esencia de la Pasarela"
                />
              </div>

              <div className="cinema-form-field">
                <label>Subtítulo Descriptivo</label>
                <textarea
                  rows={2}
                  value={editSubtitle}
                  onChange={(e) => setEditSubtitle(e.target.value)}
                  placeholder="Espacio cinematográfico de alta costura en Guinea Ecuatorial"
                />
              </div>

              {/* Audio on default checkbox */}
              <div className="cinema-checkbox-field">
                <input
                  type="checkbox"
                  id="adminAudioDefault"
                  checked={editAudio}
                  onChange={(e) => setEditAudio(e.target.checked)}
                />
                <label htmlFor="adminAudioDefault">
                  Activar sonido automáticamente al ingresar los visitantes
                </label>
              </div>

              <div className="modal-actions-cinema" style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '1.2rem' }}>
                <button type="button" className="btn-cancel" onClick={() => setIsAdminConfigOpen(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-save" style={{ background: 'linear-gradient(135deg, #D81B60, #C2185B)', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '12px', fontWeight: 700, cursor: 'pointer' }}>
                  Guardar y Publicar al Instante
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
