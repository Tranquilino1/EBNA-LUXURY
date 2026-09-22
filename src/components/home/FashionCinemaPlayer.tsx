import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, Pause, Volume2, VolumeX, Maximize, Minimize, 
  Settings, Sparkles, Check, ChevronDown, Film, X 
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useCustomization } from '../../contexts/CustomizationContext';
import './fashionCinemaPlayer.css';

type QualityOption = '4K' | '1080p' | '720p' | 'auto';

export const FashionCinemaPlayer: React.FC = () => {
  const { isAdmin } = useAuth();
  const { settings, updateSettings } = useCustomization();

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
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
  const [editUrl, setEditUrl] = useState(settings.videoUrl || '');
  const [editPoster, setEditPoster] = useState(settings.videoPoster || '');
  const [editTitle, setEditTitle] = useState(settings.videoTitle || 'Sindy Luxury: La Esencia de la Pasarela en Guinea Ecuatorial');
  const [editSubtitle, setEditSubtitle] = useState(settings.videoSubtitle || 'Espacio cinematográfico de alta costura, vestidos de gala y estilo internacional en Malabo y Bata.');
  const [editAudio, setEditAudio] = useState(settings.videoAudioDefault || false);

  const controlsTimeoutRef = useRef<any>(null);

  // Default video sources for different qualities (reliable high quality public fashion streams)
  const defaultVideo = settings.videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';
  const posterImg = settings.videoPoster || '/products/sindy_luxury/vestido_amarillo_drapeado.jpg';

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

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
  }, []);

  const handlePlayPause = () => {
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
    if (!videoRef.current) return;
    const newMuted = !isMuted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
    if (!newMuted && videoRef.current.volume === 0) {
      videoRef.current.volume = 0.8;
      setVolume(0.8);
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
    const targetTime = parseFloat(e.target.value);
    setCurrentTime(targetTime);
    if (videoRef.current) {
      videoRef.current.currentTime = targetTime;
    }
  };

  const handleToggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying && !isQualityOpen) {
        setShowControls(false);
      }
    }, 2800);
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelectQuality = (q: QualityOption) => {
    setQuality(q);
    setIsQualityOpen(false);
    updateSettings({ videoQuality: q });
  };

  const handleSaveAdminConfig = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      videoUrl: editUrl,
      videoPoster: editPoster,
      videoTitle: editTitle,
      videoSubtitle: editSubtitle,
      videoAudioDefault: editAudio,
    });
    if (videoRef.current) {
      videoRef.current.src = editUrl;
      videoRef.current.load();
    }
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
            <Film size={13} /> {quality === 'auto' ? '1080P FULL HD' : quality + ' CINEMATIC STREAM'}
          </span>
          {isAdmin && (
            <button 
              type="button" 
              className="cinema-admin-trigger-btn"
              onClick={() => setIsAdminConfigOpen(true)}
              title="Configurar video, audio y resolución (Modo Administrador)"
            >
              <Settings size={13} /> ⚙️ Modo Admin: Configurar Video
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
        {/* Ambient Backlight Glow (YouTube Ambient Mode effect) */}
        <div className={`cinema-ambient-glow ${isPlaying ? 'is-glowing' : ''}`} />

        <div className="cinema-video-frame">
          <video
            ref={videoRef}
            className="cinema-html5-video"
            src={defaultVideo}
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
                <div className="cinema-quality-menu-wrapper">
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
                          className={`quality-option-item ${quality === q ? 'is-selected' : ''}`}
                          onClick={() => handleSelectQuality(q)}
                        >
                          <span className="quality-label">
                            {q === '4K' && '4K Ultra HD (2160p)'}
                            {q === '1080p' && 'Full HD (1080p)'}
                            {q === '720p' && 'Alta Definición (720p)'}
                            {q === 'auto' && 'Automática (Smart Buffer)'}
                          </span>
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
        </div>
      </div>

      {/* Admin Video Customization Modal */}
      {isAdmin && isAdminConfigOpen && (
        <div className="cinema-admin-modal-overlay" onClick={() => setIsAdminConfigOpen(false)}>
          <div className="cinema-admin-modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-cinema">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Film size={20} color="#D81B60" />
                <h3>Configuración del Video Promocional (Admin)</h3>
              </div>
              <button type="button" className="cinema-close-btn" onClick={() => setIsAdminConfigOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveAdminConfig} className="cinema-admin-form">
              <div className="cinema-form-field">
                <label>URL Directa del Video (MP4 / WebM / CDN)</label>
                <input
                  type="url"
                  value={editUrl}
                  onChange={(e) => setEditUrl(e.target.value)}
                  placeholder="https://servidor.com/video-campana.mp4"
                  required
                />
              </div>

              <div className="cinema-form-field">
                <label>Imagen de Miniatura / Poster (URL)</label>
                <input
                  type="text"
                  value={editPoster}
                  onChange={(e) => setEditPoster(e.target.value)}
                  placeholder="/products/sindy_luxury/vestido_amarillo_drapeado.jpg"
                />
              </div>

              <div className="cinema-form-field">
                <label>Título del Bloque Promocional</label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
              </div>

              <div className="cinema-form-field">
                <label>Subtítulo Descriptivo</label>
                <textarea
                  rows={2}
                  value={editSubtitle}
                  onChange={(e) => setEditSubtitle(e.target.value)}
                />
              </div>

              <div className="cinema-checkbox-field">
                <input
                  type="checkbox"
                  id="adminAudioDefault"
                  checked={editAudio}
                  onChange={(e) => setEditAudio(e.target.checked)}
                />
                <label htmlFor="adminAudioDefault">
                  Activar sonido automáticamente al iniciar reproducción
                </label>
              </div>

              <div className="modal-actions-cinema">
                <button type="button" className="btn-cancel" onClick={() => setIsAdminConfigOpen(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-save">
                  Guardar Cambios de Video
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
