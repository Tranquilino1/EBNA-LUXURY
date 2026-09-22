import React from 'react';
import type { Product } from '../../types';
import { Modal } from '../ui/Modal';
import { Pencil, Trash2, PackageCheck, PackageX, ExternalLink, Sparkles, Tag, Layers, Palette } from 'lucide-react';
import { formatPrice } from '../../lib/utils';
import { Link } from 'react-router';

interface ProductInspectModalProps {
  product: Product;
  onClose: () => void;
  onEdit: () => void;
  onToggleStock: () => void;
  onDelete: () => void;
}

export const ProductInspectModal: React.FC<ProductInspectModalProps> = ({
  product,
  onClose,
  onEdit,
  onToggleStock,
  onDelete,
}) => {
  const isCosmetic = ['COSMETICA_FACIAL', 'HIGIENE_CORPORAL', 'PERFUMERIA'].includes(product.category || '');
  const isFootwear = product.category === 'CALZADO';
  const isAccessory = product.category === 'BOLSOS_ACCESORIOS';

  const mainImage = product.images?.primary || (Array.isArray(product.images) ? product.images[0] : '/icons/ebna-logo.png');
  const priceVal = product.priceFCFA || product.price || 0;

  return (
    <Modal isOpen={true} onClose={onClose} title="Inspección Detallada de Producto">
      <div 
        className="product-inspect-container"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          alignItems: 'start',
          color: 'var(--text-primary)'
        }}
      >
        {/* Enlarged Photo Section */}
        <div style={{ position: 'relative', borderRadius: '18px', overflow: 'hidden', border: '1.5px solid var(--border-subtle)', background: 'var(--canvas-elevated)' }}>
          <img
            src={mainImage}
            alt={product.name}
            style={{
              width: '100%',
              maxHeight: '420px',
              objectFit: 'cover',
              display: 'block',
              transition: 'transform 0.3s ease'
            }}
            onError={(e) => {
              e.currentTarget.src = '/icons/ebna-logo.png';
            }}
          />

          <div style={{ position: 'absolute', top: '14px', left: '14px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            <span
              style={{
                background: product.in_stock ? 'rgba(16, 185, 129, 0.92)' : 'rgba(239, 68, 68, 0.92)',
                color: 'white',
                fontWeight: 800,
                fontSize: '0.75rem',
                padding: '4px 12px',
                borderRadius: '20px',
                backdropFilter: 'blur(4px)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              {product.in_stock ? <PackageCheck size={14} /> : <PackageX size={14} />}
              {product.in_stock ? 'EN STOCK' : 'AGOTADO'}
            </span>

            {product.sku && (
              <span
                style={{
                  background: 'rgba(0,0,0,0.7)',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '0.72rem',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Tag size={12} /> {product.sku}
              </span>
            )}
          </div>
        </div>

        {/* Detailed Information & Inline Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span
                style={{
                  background: 'rgba(216, 27, 96, 0.1)',
                  color: '#D81B60',
                  fontWeight: 800,
                  fontSize: '0.78rem',
                  padding: '3px 10px',
                  borderRadius: '12px'
                }}
              >
                {product.category}
              </span>
              <span style={{ fontSize: '0.78rem', color: '#10B981', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                <Sparkles size={12} /> Sindy Luxury Original
              </span>
            </div>

            <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', margin: '0 0 8px 0', color: 'var(--text-primary)', lineHeight: 1.3 }}>
              {product.name}
            </h3>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--brand-accent)' }}>
                {formatPrice(priceVal)}
              </span>
            </div>
          </div>

          {/* Description */}
          <div style={{ background: 'var(--canvas-elevated)', padding: '1rem', borderRadius: '14px', border: '1px solid var(--border-light)' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '4px' }}>
              Descripción:
            </span>
            <p style={{ fontSize: '0.88rem', lineHeight: 1.5, color: 'var(--text-primary)', margin: 0 }}>
              {product.description || 'Sin descripción asignada.'}
            </p>
          </div>

          {/* Sizing / Formats */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '130px', background: 'var(--canvas-elevated)', padding: '0.75rem', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Layers size={13} /> {isCosmetic ? 'Formato:' : isFootwear ? 'Tallas EU:' : isAccessory ? 'Medida:' : 'Tallas:'}
              </span>
              <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginTop: '6px' }}>
                {(product.sizes || ['Estándar']).map(sz => (
                  <span key={sz} style={{ background: 'var(--brand-gold-light)', color: 'var(--brand-accent)', fontWeight: 800, fontSize: '0.72rem', padding: '2px 8px', borderRadius: '6px' }}>
                    {sz}
                  </span>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div style={{ flex: 1, minWidth: '130px', background: 'var(--canvas-elevated)', padding: '0.75rem', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Palette size={13} /> Colores / Variantes:
              </span>
              <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginTop: '6px' }}>
                {(product.colors || ['Único']).map(col => (
                  <span key={col} style={{ background: 'var(--canvas-surface)', color: 'var(--text-primary)', fontWeight: 700, fontSize: '0.72rem', padding: '2px 8px', borderRadius: '6px', border: '1px solid var(--border-light)' }}>
                    {col}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '0.5rem' }}>
            <button
              type="button"
              onClick={onEdit}
              style={{
                width: '100%',
                padding: '12px 18px',
                borderRadius: '14px',
                border: 'none',
                background: 'linear-gradient(135deg, #D81B60, #C2185B)',
                color: 'white',
                fontWeight: 700,
                fontSize: '0.92rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 4px 14px rgba(216, 27, 96, 0.35)',
                transition: 'all 0.2s ease'
              }}
            >
              <Pencil size={18} /> Editar este Producto
            </button>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                onClick={onToggleStock}
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  borderRadius: '12px',
                  border: '1px solid var(--border-subtle)',
                  background: product.in_stock ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                  color: product.in_stock ? '#DC2626' : '#059669',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                {product.in_stock ? <PackageX size={16} /> : <PackageCheck size={16} />}
                {product.in_stock ? 'Marcar Agotado' : 'Marcar en Stock'}
              </button>

              <Link
                to={`/producto/${product.slug}`}
                target="_blank"
                style={{
                  padding: '10px 14px',
                  borderRadius: '12px',
                  border: '1px solid var(--border-subtle)',
                  background: 'var(--canvas-surface)',
                  color: 'var(--text-primary)',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <ExternalLink size={16} /> Ver en Tienda
              </Link>

              <button
                type="button"
                onClick={onDelete}
                style={{
                  padding: '10px 14px',
                  borderRadius: '12px',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  background: 'rgba(239, 68, 68, 0.08)',
                  color: '#EF4444',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                title="Eliminar producto"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
