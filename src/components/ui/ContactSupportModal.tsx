import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Mail, Phone, MessageSquare, Send, Sparkles, Headphones } from 'lucide-react';
import './contactSupportModal.css';

interface ContactSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactSupportModal: React.FC<ContactSupportModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [topic, setTopic] = useState('soporte_tecnico');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

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

    const topicLabel = topic === 'soporte_tecnico' ? 'Soporte Técnico AiDA' : topic === 'pedidos' ? 'Consulta de Pedidos' : 'Incidencia General';
    const text = `*EBNA LUXURY - TICKET DE CONTACTO*%0A%0A*Remitente:* ${encodeURIComponent(name || 'Cliente')}%0A*Contacto:* ${encodeURIComponent(contactInfo || 'No indicado')}%0A*Motivo:* ${encodeURIComponent(topicLabel)}%0A*Mensaje:*%0A${encodeURIComponent(message)}`;

    // Dispatch via WhatsApp AiDA Tech Support
    window.open(`https://wa.me/240555320017?text=${text}`, '_blank');
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
              <p>Asistencia técnica, desarrollo web y atención al cliente</p>
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
              <div className="aida-startup-name">Startup AiDA</div>
              <div className="aida-startup-desc">Soluciones tecnológicas de alto rendimiento e ingeniería e-commerce de lujo.</div>
            </div>
            <img 
              src="/icons/aida-logo.jpg" 
              alt="AiDA Logo" 
              style={{ width: '75px', height: 'auto', borderRadius: '8px', border: '1px solid rgba(24, 66, 102, 0.25)', boxShadow: '0 3px 12px rgba(24, 66, 102, 0.15)', background: 'white', padding: '3px' }} 
            />
          </div>

          {/* Quick Channels Grid */}
          <div className="contact-channels-grid">
            {/* WhatsApp AiDA Support */}
            <a 
              href="https://wa.me/240555320017?text=Hola%20AiDA,%20necesito%20soporte%20t%C3%A9cnico%20sobre%20la%20plataforma%20EBNA%20Luxury" 
              target="_blank" 
              rel="noopener noreferrer"
              className="channel-card-link"
              title="Abrir WhatsApp AiDA"
            >
              <div className="channel-card-icon" style={{ background: 'rgba(37, 211, 102, 0.15)', color: '#25D366' }}>
                <MessageSquare size={20} />
              </div>
              <div className="channel-card-text">
                <span className="channel-card-label">WhatsApp Soporte</span>
                <span className="channel-card-val">+240 555 32 00 17</span>
              </div>
            </a>

            {/* Direct Phone Call */}
            <a 
              href="tel:+240222075662" 
              className="channel-card-link"
              title="Llamar a Asistencia Técnica"
            >
              <div className="channel-card-icon" style={{ background: 'rgba(216, 27, 96, 0.15)', color: '#D81B60' }}>
                <Phone size={20} />
              </div>
              <div className="channel-card-text">
                <span className="channel-card-label">Teléfono AiDA</span>
                <span className="channel-card-val">+240 222 07 56 62</span>
              </div>
            </a>

            {/* Official Support Email */}
            <a 
              href="mailto:thetrapkinzofafrica@gmail.com?subject=Soporte%20T%C3%A9cnico%20EBNA%20Luxury" 
              className="channel-card-link"
              style={{ gridColumn: '1 / -1' }}
              title="Enviar Correo Electrónico"
            >
              <div className="channel-card-icon" style={{ background: 'rgba(197, 168, 128, 0.2)', color: '#C5A880' }}>
                <Mail size={20} />
              </div>
              <div className="channel-card-text" style={{ overflow: 'hidden' }}>
                <span className="channel-card-label">Email Oficial de Ingeniería AiDA</span>
                <span className="channel-card-val" style={{ wordBreak: 'break-all', fontSize: '0.85rem' }}>
                  thetrapkinzofafrica@gmail.com
                </span>
              </div>
            </a>
          </div>

          {/* Direct Ticket Form */}
          <div className="contact-ticket-section">
            <div className="ticket-header">
              <Sparkles size={16} color="var(--brand-accent)" />
              <span>Enviar Consulta Directa a Ingeniería</span>
            </div>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '20px 10px' }}>
                <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🚀</div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
                  ¡Consulta Enviada con Éxito!
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                  El equipo de ingeniería de AiDA atenderá su requerimiento a la mayor brevedad posible.
                </p>
                <button 
                  type="button" 
                  onClick={() => setSubmitted(false)}
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
                  Enviar otro mensaje
                </button>
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
                  <label className="ticket-label">Motivo</label>
                  <select 
                    className="ticket-input"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                  >
                    <option value="soporte_tecnico">Soporte Técnico / Plataforma Web</option>
                    <option value="pedidos">Gestión de Pedidos & Envíos</option>
                    <option value="personalizacion">Personalización & Nuevas Funciones</option>
                    <option value="otro">Otra Consulta</option>
                  </select>
                </div>

                <div className="ticket-form-group">
                  <label className="ticket-label">Detalle del Mensaje o Incidencia *</label>
                  <textarea 
                    className="ticket-textarea" 
                    rows={3}
                    placeholder="Describe en qué te podemos ayudar..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="ticket-submit-btn">
                  <Send size={16} />
                  <span>Transmitir Consulta a Soporte AiDA</span>
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
