import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Mail, Phone, MessageSquare, Send, Sparkles, Headphones, ArrowRight, MapPin } from 'lucide-react';
import { TikTokIcon } from './TikTokIcon';
import './contactSupportModal.css';

interface ContactSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactSupportModal: React.FC<ContactSupportModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [topic, setTopic] = useState('incidencia');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submittedUrl, setSubmittedUrl] = useState('');

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEscape);
    } else {
      document.body.style.overflow = '';
      setSubmitted(false);
    }

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const topicLabels: Record<string, string> = {
      incidencia: '🚨 Reporte de Incidencia en la Plataforma',
      soporte_tecnico: '🛠️ Soporte Técnico General',
      pagos: '💳 Incidencia con Pago Muni Dinero',
      pedidos: '📦 Consulta o Problema con Pedido',
      personalizacion: '✨ Sugerencia o Personalización',
      otro: 'ℹ️ Otra Consulta'
    };

    const topicLabel = topicLabels[topic] || '🚨 Incidencia Plataforma';

    const textLines = [
      '🚨 *EBNA LUXURY - REPORTE DE INCIDENCIA / SOPORTE TÉCNICO*',
      '',
      `👤 *Remitente:* ${name.trim() || 'Cliente / Usuario'}`,
      `📱 *Contacto:* ${contactInfo.trim() || 'No indicado'}`,
      `🏷️ *Motivo:* ${topicLabel}`,
      '',
      '📝 *Detalle del Mensaje o Incidencia:*',
      message.trim(),
      '',
      '🌐 _Enviado desde el Centro de Soporte Técnico EBNA Luxury_'
    ];

    const waText = encodeURIComponent(textLines.join('\n'));
    // Enlazar directamente al número oficial de WhatsApp para incidencias: 555320017
    const waUrl = `https://wa.me/240555320017?text=${waText}`;
    setSubmittedUrl(waUrl);

    // Despacho directo a WhatsApp
    window.open(waUrl, '_blank');
    setSubmitted(true);
  };

  return createPortal(
    <div className="contact-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="contact-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="contact-modal-header">
          <div className="contact-header-left">
            <div className="contact-header-icon">
              <Headphones size={24} />
            </div>
            <div className="contact-header-titles">
              <h2>Centro de Soporte & Contacto</h2>
              <p>Asistencia técnica para incidencias, plataforma web y pedidos</p>
            </div>
          </div>
          <button className="contact-close-btn" onClick={onClose} aria-label="Cerrar ventana">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="contact-modal-body">
          {/* Startup AiDA Developer Banner */}
          <div className="aida-startup-banner">
            <div>
              <div className="aida-startup-tag">Desarrollo & Arquitectura Digital</div>
              <div className="aida-startup-name">
                Startup <span className="aida-logo-text" style={{ fontSize: '1.5rem', color: '#184266' }}>AiDA</span>
              </div>
              <div className="aida-startup-desc">Centro oficial de resolución de incidencias e ingeniería e-commerce.</div>
            </div>
            <img 
              src="/icons/aida-logo.jpg" 
              alt="AiDA Logo" 
              style={{ width: '85px', height: 'auto', borderRadius: '10px', border: '1.5px solid rgba(24, 66, 102, 0.3)', boxShadow: '0 4px 16px rgba(24, 66, 102, 0.18)', background: 'white', padding: '4px' }} 
            />
          </div>

          {/* Quick Channels Grid */}
          <div className="contact-channels-grid">
            {/* WhatsApp AiDA Incident Support (555320017) */}
            <a 
              href="https://wa.me/240555320017?text=Hola%20AiDA,%20deseo%20reportar%20una%20incidencia%20t%C3%A9cnica%20en%20la%20plataforma%20EBNA%20Luxury" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="channel-card-link"
              title="Abrir WhatsApp AiDA (555320017)"
            >
              <div className="channel-card-icon" style={{ background: 'rgba(37, 211, 102, 0.15)', color: '#25D366' }}>
                <MessageSquare size={20} />
              </div>
              <div className="channel-card-text">
                <span className="channel-card-label">WhatsApp Incidencias <span className="aida-highlight-blue" style={{ fontSize: '0.85rem' }}>AiDA</span></span>
                <span className="channel-card-val" style={{ fontWeight: 800, color: '#25D366' }}>+240 555 32 00 17</span>
              </div>
            </a>

            {/* Direct Phone Call (555320017) */}
            <a 
              href="tel:+240555320017" 
              className="channel-card-link"
              title="Llamar a Asistencia Técnica (555320017)"
            >
              <div className="channel-card-icon" style={{ background: 'rgba(24, 66, 102, 0.12)', color: '#184266' }}>
                <Phone size={20} />
              </div>
              <div className="channel-card-text">
                <span className="channel-card-label" style={{ color: '#184266', fontWeight: 800 }}>Teléfono <span className="aida-highlight-blue">AiDA</span></span>
                <span className="channel-card-val">+240 555 32 00 17</span>
              </div>
            </a>

            {/* Official Support Email */}
            <a 
              href="mailto:thetrapkinzofafrica@gmail.com?subject=Reporte%20de%20Incidencia%20EBNA%20Luxury" 
              className="channel-card-link"
              style={{ gridColumn: '1 / -1' }}
              title="Enviar Correo Electrónico"
            >
              <div className="channel-card-icon" style={{ background: 'rgba(24, 66, 102, 0.12)', color: '#184266' }}>
                <Mail size={20} />
              </div>
              <div className="channel-card-text" style={{ overflow: 'hidden' }}>
                <span className="channel-card-label" style={{ color: '#184266', fontWeight: 800 }}>Email Oficial de Ingeniería <span className="aida-highlight-blue">AiDA</span></span>
                <span className="channel-card-val" style={{ wordBreak: 'break-all', fontSize: '0.85rem' }}>
                  thetrapkinzofafrica@gmail.com
                </span>
              </div>
            </a>
          </div>

          {/* Sede Física Oficial & Canales de la Tienda */}
          <div style={{ marginTop: '14px', marginBottom: '18px', padding: '14px', borderRadius: '16px', background: 'rgba(216, 27, 96, 0.05)', border: '1px solid rgba(216, 27, 96, 0.16)' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--brand-accent)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={14} /> Sede Física Oficial & Canales de Sindy Luxury
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '10px' }}>
              {/* Sede Física con GPS */}
              <a 
                href="https://www.google.com/maps/search/?api=1&query=1.630333,11.308053"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '10px', background: 'var(--canvas-surface)', borderRadius: '12px', border: '1px solid var(--border-subtle)', textDecoration: 'none', color: 'inherit' }}
                title="Abrir ubicación exacta en Google Maps (01°37′49.2″N 11°18′28.99″E)"
              >
                <MapPin size={20} style={{ color: 'var(--brand-accent)', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ fontSize: '0.84rem', fontWeight: 800, color: 'var(--text-primary)' }}>Sede Física: Mongomo</div>
                    <span style={{ fontSize: '0.64rem', background: 'var(--brand-accent)', color: 'white', padding: '1px 5px', borderRadius: '6px', fontWeight: 700 }}>GPS</span>
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', lineHeight: 1.35, marginTop: '2px' }}>
                    Barrio Koete • Al otro lado de la Agencia FORAMA
                  </div>
                  <div style={{ fontSize: '0.70rem', color: 'var(--brand-accent)', fontWeight: 600, marginTop: '2px' }}>
                    📍 Ver en Google Maps →
                  </div>
                </div>
              </a>

              {/* Correo Oficial de la Tienda */}
              <a 
                href="mailto:sindyluxury@gmail.com" 
                style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', background: 'var(--canvas-surface)', borderRadius: '12px', border: '1px solid var(--border-subtle)', textDecoration: 'none', color: 'inherit' }}
                title="Enviar correo a sindyluxury@gmail.com"
              >
                <Mail size={20} style={{ color: 'var(--brand-accent)', flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '0.84rem', fontWeight: 800, color: 'var(--text-primary)' }}>Correo Oficial Tienda</div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--brand-accent)', fontWeight: 600 }}>sindyluxury@gmail.com</div>
                </div>
              </a>

              {/* TikTok Oficial */}
              <a 
                href="https://www.tiktok.com/@sindyluxury" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', background: 'var(--canvas-surface)', borderRadius: '12px', border: '1px solid var(--border-subtle)', textDecoration: 'none', color: 'inherit' }}
                title="Seguir en TikTok oficial (@sindyluxury)"
              >
                <TikTokIcon size={20} variant="color" />
                <div>
                  <div style={{ fontSize: '0.84rem', fontWeight: 800, color: 'var(--text-primary)' }}>TikTok Oficial</div>
                  <div style={{ fontSize: '0.74rem', color: '#FE2C55', fontWeight: 700 }}>@sindyluxury</div>
                </div>
              </a>
            </div>
          </div>

          {/* Direct Ticket Form */}
          <div className="contact-ticket-section">
            <div className="ticket-header">
              <Sparkles size={16} color="var(--brand-accent)" />
              <span>Reportar Incidencia o Consulta Directa a Ingeniería</span>
            </div>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '24px 14px' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>🚀</div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px' }}>
                  ¡Incidencia Transmitida a Soporte!
                </h3>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: 1.5 }}>
                  Tu mensaje ha sido conectado directamente con el WhatsApp oficial de soporte técnico e incidencias: <strong style={{ color: '#25D366' }}>+240 555 32 00 17</strong>.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
                  {submittedUrl && (
                    <a
                      href={submittedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        padding: '12px 24px',
                        borderRadius: '25px',
                        background: 'linear-gradient(135deg, #25D366, #128C7E)',
                        color: 'white',
                        fontWeight: 800,
                        fontSize: '0.9rem',
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        boxShadow: '0 4px 14px rgba(37, 211, 102, 0.35)'
                      }}
                    >
                      <MessageSquare size={18} /> Continuar en WhatsApp (+240 555 32 00 17) <ArrowRight size={16} />
                    </a>
                  )}
                  <button 
                    type="button" 
                    onClick={() => { setSubmitted(false); setMessage(''); }}
                    style={{
                      padding: '8px 18px',
                      borderRadius: '12px',
                      background: 'var(--canvas-surface)',
                      border: '1px solid var(--border-subtle)',
                      cursor: 'pointer',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)'
                    }}
                  >
                    Enviar otro mensaje o incidencia
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
                  <div className="ticket-form-group">
                    <label className="ticket-label">Tu Nombre</label>
                    <input 
                      type="text" 
                      className="ticket-input" 
                      placeholder="Ej: Sindy o Cliente"
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                    />
                  </div>

                  <div className="ticket-form-group">
                    <label className="ticket-label">Tu Teléfono o Email</label>
                    <input 
                      type="text" 
                      className="ticket-input" 
                      placeholder="+240 ..."
                      value={contactInfo} 
                      onChange={(e) => setContactInfo(e.target.value)} 
                    />
                  </div>
                </div>

                <div className="ticket-form-group">
                  <label className="ticket-label">Tipo de Consulta o Incidencia</label>
                  <select 
                    className="ticket-input"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                  >
                    <option value="incidencia">🚨 Reportar Incidencia / Error en la Plataforma</option>
                    <option value="soporte_tecnico">🛠️ Soporte Técnico General</option>
                    <option value="pagos">💳 Incidencia con Pago Muni Dinero (555439904)</option>
                    <option value="pedidos">📦 Gestión de Pedidos & Envíos</option>
                    <option value="personalizacion">✨ Personalización & Nuevas Funciones</option>
                    <option value="otro">ℹ️ Otra Consulta</option>
                  </select>
                </div>

                <div className="ticket-form-group">
                  <label className="ticket-label">Detalle del Mensaje o Incidencia *</label>
                  <textarea 
                    className="ticket-textarea" 
                    rows={3}
                    placeholder="Describe exactamente qué ha sucedido o la incidencia que deseas reportar..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="ticket-submit-btn">
                  <Send size={16} />
                  <span>Transmitir Incidencia a WhatsApp (+240 555 32 00 17)</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
