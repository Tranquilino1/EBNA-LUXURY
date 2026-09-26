import React, { useState } from 'react';
import { ChevronDown, Sparkles, Truck, ShieldCheck, CreditCard, MessageCircle, MapPin, RefreshCw, Gift } from 'lucide-react';
import './homeFAQSection.css';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  icon: React.ElementType;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'envios',
    icon: Truck,
    question: '¿Cómo funcionan los envíos y entregas en Malabo, Bata y Mongomo?',
    answer: 'Ofrecemos Envío Exprés Prioritario con entrega garantizada en 24 a 48 horas (o entrega el mismo día en Malabo) por 3.000 FCFA, y Envío Estándar Gratuito en 5 a 7 días a toda Guinea Ecuatorial. Todas las prendas se entregan precintadas en embalaje protector de lujo.'
  },
  {
    id: 'pagos',
    icon: CreditCard,
    question: '¿Qué métodos de pago en FCFA se aceptan?',
    answer: 'Aceptamos pagos en Francos CFA (XAF) a través de Muni Dinero (+240 555 439 904), efectivo contra entrega (pagas en mano al mensajero tras inspeccionar tu prenda) y transferencias bancarias locales directas (BANGE / CCEI Bank).'
  },
  {
    id: 'autenticidad',
    icon: ShieldCheck,
    question: '¿Los vestidos de fiesta, calzado joya y perfumes árabes son 100% auténticos?',
    answer: 'Garantizamos total autenticidad. Las fragancias (Lattafa Yara) cuentan con precinto de importación y código de lote verificable; los cosméticos son fórmulas botánicas certificadas, y los vestidos se confeccionan con telas nobles y pedrería fina de alta costura.'
  },
  {
    id: 'whatsapp',
    icon: MessageCircle,
    question: '¿Cómo se realiza un pedido y la asesoría personalizada por WhatsApp?',
    answer: 'Al pulsar "Pedir por WhatsApp", se genera automáticamente tu Ticket Oficial Digital con desglose en FCFA y folio único. Nuestro equipo Concierge (+240 555 633 687) te asiste de inmediato confirmando tus medidas anatómicas y coordinando la entrega.'
  },
  {
    id: 'cambios',
    icon: RefreshCw,
    question: '¿Cuál es la política de cambios de talla si una prenda no me queda bien?',
    answer: 'Dispones de 48 a 72 horas desde la recepción para solicitar cambio de talla sin complicaciones, manteniendo el precinto y etiqueta intactos. Nuestro mensajero coordina la recogida y entrega de la nueva talla directamente en tu domicilio en Malabo o Bata.'
  },
  {
    id: 'empaque',
    icon: Gift,
    question: '¿Puedo solicitar empaque de regalo exclusivo?',
    answer: 'Sí. Todos nuestros pedidos se presentan con cuidado en bolsas y cajas de lujo EBNA con lazo satinado y tarjeta personalizada sin costo adicional, listos para regalar o estrenar.'
  },
  {
    id: 'sede',
    icon: MapPin,
    question: '¿Dónde está ubicada la sede física oficial de la boutique?',
    answer: 'Nuestra boutique física central se encuentra en Mongomo, en Barrio Koete (al otro lado de la Agencia FORAMA, GPS: 01°37′49.2″N, 11°18′28.99″E). Atendemos de forma presencial y con envíos coordinados a todo el territorio nacional.'
  }
];

export const HomeFAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('envios');

  const toggleItem = (id: string) => {
    setOpenId(prev => prev === id ? null : id);
  };

  return (
    <section id="faq" className="luxury-clean-faq-section" aria-label="Preguntas Frecuentes">
      <div className="clean-faq-container">
        {/* Minimal Luxury Header */}
        <div className="clean-faq-header">
          <div className="clean-faq-badge">
            <Sparkles size={12} color="#D81B60" />
            <span>ATENCIÓN VIP & DUDAS FRECUENTES</span>
            <Sparkles size={12} color="#D81B60" />
          </div>
          <h2 className="clean-faq-title">
            Preguntas Frecuentes
          </h2>
          <p className="clean-faq-subtitle">
            Claridad, transparencia y confianza en cada compra en Guinea Ecuatorial.
          </p>
        </div>

        {/* Clean Luxury Accordion */}
        <div className="clean-faq-list">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            const Icon = item.icon;

            return (
              <div 
                key={item.id} 
                className={`clean-faq-card ${isOpen ? 'is-active' : ''}`}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  className="clean-faq-button"
                  aria-expanded={isOpen}
                >
                  <div className="clean-faq-q-left">
                    <span className="clean-faq-icon-wrap">
                      <Icon size={18} />
                    </span>
                    <span className="clean-faq-question-text">
                      {item.question}
                    </span>
                  </div>
                  <div className={`clean-faq-chevron ${isOpen ? 'is-open' : ''}`}>
                    <ChevronDown size={18} />
                  </div>
                </button>

                {isOpen && (
                  <div className="clean-faq-answer-panel">
                    <p className="clean-faq-answer-text">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Concierge Contact Banner */}
        <div className="clean-faq-footer-banner">
          <div className="clean-faq-contact-info">
            <span className="contact-dot"></span>
            <span>¿Tienes otra consulta? Estamos disponibles 24/7 en WhatsApp: <strong>+240 555 633 687</strong></span>
          </div>
          <a 
            href="https://wa.me/240555633687?text=Hola%20Sindy%20Luxury,%20tengo%20una%20consulta%20sobre%20sus%20prendas"
            target="_blank"
            rel="noopener noreferrer"
            className="clean-faq-wa-link"
          >
            Chatear con Concierge VIP
          </a>
        </div>
      </div>
    </section>
  );
};
