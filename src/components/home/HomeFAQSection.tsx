import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Sparkles, Truck, ShieldCheck, CreditCard, MessageCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
  icon: typeof HelpCircle;
}

const FAQ_DATA: FAQItem[] = [
  {
    question: '¿Dónde comprar ropa de fiesta, cosmética y perfumes árabes originales en Guinea Ecuatorial?',
    answer: 'En EBNA Luxury (Sindy Luxury), la boutique online de alta gama de referencia en Guinea Ecuatorial. Nuestro catálogo oficial está disponible 24/7 en https://ebna-luxury.vercel.app con pedidos directos y atención personalizada por WhatsApp al +240 222 633 687 para entregas en Malabo y Bata.',
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
    <section 
      className="home-faq-section" 
      style={{
        marginTop: '3.5rem',
        marginBottom: '3rem',
        padding: '2.5rem 1.5rem',
        borderRadius: '24px',
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.92) 0%, rgba(253, 242, 248, 0.85) 100%)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1.5px solid rgba(216, 27, 96, 0.18)',
        boxShadow: '0 12px 35px rgba(216, 27, 96, 0.06)'
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 2.5rem auto' }}>
        <div 
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(216, 27, 96, 0.1)',
            color: 'var(--brand-accent)',
            padding: '5px 16px',
            borderRadius: '20px',
            fontSize: '0.78rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '0.8rem'
          }}
        >
          <Sparkles size={14} /> Centro de Información y Preguntas Frecuentes
        </div>

        <h2 
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '2.1rem',
            color: 'var(--text-primary)',
            lineHeight: 1.25,
            margin: '0 0 0.8rem 0'
          }}
        >
          Todo lo que Necesitas Saber sobre EBNA Luxury
        </h2>

        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
          Resolvemos tus dudas sobre compras, opciones de envío express a Malabo y Bata, métodos de pago en FCFA y garantía de autenticidad.
        </p>
      </div>

      <div style={{ maxWidth: '840px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {FAQ_DATA.map((item, idx) => {
          const isOpen = openIndex === idx;
          const IconComponent = item.icon;

          return (
            <div
              key={idx}
              style={{
                borderRadius: '16px',
                border: isOpen ? '1.5px solid var(--brand-accent)' : '1px solid rgba(216, 27, 96, 0.12)',
                background: isOpen ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.7)',
                overflow: 'hidden',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: isOpen ? '0 8px 24px rgba(216, 27, 96, 0.12)' : 'none'
              }}
            >
              <button
                type="button"
                onClick={() => toggleItem(idx)}
                aria-expanded={isOpen}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '14px',
                  padding: '1.2rem 1.4rem',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                  <div 
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      background: isOpen ? 'var(--brand-accent)' : 'rgba(216, 27, 96, 0.08)',
                      color: isOpen ? '#FFFFFF' : 'var(--brand-accent)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <IconComponent size={18} />
                  </div>
                  <span 
                    style={{
                      fontSize: '0.98rem',
                      fontWeight: 700,
                      color: isOpen ? 'var(--brand-accent)' : 'var(--text-primary)',
                      fontFamily: 'var(--font-sans)',
                      lineHeight: 1.4
                    }}
                  >
                    {item.question}
                  </span>
                </div>

                <div 
                  style={{
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.25s ease',
                    color: isOpen ? 'var(--brand-accent)' : '#94A3B8',
                    flexShrink: 0
                  }}
                >
                  <ChevronDown size={20} />
                </div>
              </button>

              {isOpen && (
                <div 
                  style={{
                    padding: '0 1.4rem 1.3rem 4.2rem',
                    color: 'var(--text-secondary)',
                    fontSize: '0.92rem',
                    lineHeight: 1.7,
                    borderTop: '1px solid rgba(216, 27, 96, 0.06)'
                  }}
                >
                  <div style={{ paddingTop: '0.8rem' }}>
                    {item.answer}
                  </div>
                  <div style={{ marginTop: '0.8rem', display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <span 
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        background: 'rgba(216, 27, 96, 0.06)',
                        color: 'var(--brand-accent)',
                        padding: '2px 8px',
                        borderRadius: '6px'
                      }}
                    >
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
