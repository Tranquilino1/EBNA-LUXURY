import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Sparkles, Truck, ShieldCheck, CreditCard, MessageCircle, MapPin } from 'lucide-react';
import './homeFAQSection.css';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
  icon: typeof HelpCircle;
}

const FAQ_DATA: FAQItem[] = [
  {
    question: '¿Dónde está ubicada la sede física de la tienda y cómo contactar de forma oficial?',
    answer: 'La sede física oficial de Sindy Luxury by EBNA se encuentra ubicada en la ciudad de Mongomo, específicamente en Barrio Koete, justo al otro lado de la Agencia FORAMA (coordenadas GPS exactas: 01°37′49.2″N, 11°18′28.99″E). Atendemos de forma presencial con navegación directa en Google Maps y mediante envíos directos a Malabo, Bata y todo el ámbito nacional. Contáctanos por nuestro correo oficial sindyluxury@gmail.com, síguenos en TikTok en @sindyluxury o pide vía WhatsApp al +240 555 633 687.',
    category: 'Sede Física & Contacto',
    icon: MapPin
  },
  {
    question: '¿Dónde comprar ropa de fiesta, cosmética y perfumes árabes originales en Guinea Ecuatorial?',
    answer: 'En EBNA Luxury (Sindy Luxury), la boutique de alta gama de referencia en Guinea Ecuatorial con sede física en Mongomo (Barrio Koete) y envíos express a Malabo y Bata. Nuestro catálogo oficial está disponible 24/7 en https://ebna-luxury.vercel.app con pedidos directos y atención personalizada por WhatsApp al +240 555 633 687 y correo sindyluxury@gmail.com.',
    category: 'Compras & Tienda',
    icon: Sparkles
  },
  {
    question: '¿Cuáles son los tiempos y costos de entrega en Malabo y Bata?',
    answer: 'Ofrecemos dos modalidades de entrega: Envío Estándar Gratuito (0 FCFA) con un plazo de 5 a 7 días, y Envío Exprés Exclusivo por 3.000 FCFA con entrega garantizada en un plazo máximo de 3 días directamente a tu domicilio o punto de encuentro.',
    category: 'Envíos & Logística',
    icon: Truck
  },
  {
    question: '¿Cómo se genera el ticket oficial de compra y el pedido por WhatsApp?',
    answer: 'Al seleccionar tus prendas o productos y pulsar "Pagar por WhatsApp", el sistema genera automáticamente un Ticket Oficial de Pedido (comprobante digital con número de folio, desglose de artículos, tallas, tipo de envío y precio en FCFA) que se envía listo a nuestro canal de atención para coordinar la entrega al instante.',
    category: 'Proceso de Pedido',
    icon: MessageCircle
  },
  {
    question: '¿Qué métodos de pago en FCFA están disponibles?',
    answer: 'Aceptamos pagos en Francos CFA (XAF) a través de Muni Dinero (+240 555 439 904), transferencias bancarias locales y pago en efectivo contra entrega en Malabo y Bata previa confirmación.',
    category: 'Pagos en FCFA',
    icon: CreditCard
  },
  {
    question: '¿Los productos de cosmética, perfumería y fajas son 100% auténticos?',
    answer: 'Sí. Todos nuestros productos de cosmética (Vaseline, Dove, Wokali), perfumería árabe (Lattafa Yara) y fajas reductoras colombianas son 100% originales, precintados y sometidos a control de autenticidad antes de su entrega.',
    category: 'Garantía & Calidad',
    icon: ShieldCheck
  },
  {
    question: '¿Cómo puedo recibir asesoría personalizada sobre tallas o medidas?',
    answer: 'Puedes contactar directamente a nuestras asesoras VIP por WhatsApp pulsando el botón flotante en la tienda. Te orientamos en tiempo real sobre la talla perfecta para vestidos, calzado o fajas modeladoras antes de formalizar tu compra.',
    category: 'Atención al Cliente',
    icon: HelpCircle
  }
];

export const HomeFAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (idx: number) => {
    setOpenIndex(prev => prev === idx ? null : idx);
  };

  return (
    <section className="home-faq-section" aria-label="Centro de Información y Preguntas Frecuentes">
      <div className="home-faq-header">
        <div className="home-faq-pill">
          <Sparkles size={14} /> Centro de Información y Preguntas Frecuentes
        </div>

        <h2 className="home-faq-title">
          Todo lo que Necesitas Saber sobre Sindy Luxury by EBNA
        </h2>

        <p className="home-faq-subtitle">
          Resolvemos tus dudas sobre compras, opciones de envío express a Malabo y Bata, métodos de pago en FCFA y garantía de autenticidad.
        </p>
      </div>

      <div className="home-faq-list">
        {FAQ_DATA.map((item, idx) => {
          const isOpen = openIndex === idx;
          const IconComponent = item.icon;

          return (
            <div
              key={idx}
              className={`home-faq-item ${isOpen ? 'is-open' : ''}`}
            >
              <button
                type="button"
                onClick={() => toggleItem(idx)}
                aria-expanded={isOpen}
                className="home-faq-trigger"
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                  <div className="home-faq-icon-box">
                    <IconComponent size={18} />
                  </div>
                  <span className="home-faq-question">
                    {item.question}
                  </span>
                </div>

                <div 
                  className="home-faq-chevron"
                  style={{
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                  }}
                >
                  <ChevronDown size={20} />
                </div>
              </button>

              {isOpen && (
                <div className="home-faq-answer-wrap">
                  <div style={{ paddingTop: '0.8rem' }}>
                    {item.answer}
                  </div>
                  <div style={{ marginTop: '0.8rem', display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <span className="home-faq-tag">
                      {item.category}
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
