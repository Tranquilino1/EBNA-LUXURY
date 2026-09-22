import React from 'react';
import { Modal } from '../ui/Modal';
import { AlertTriangle, Trash2 } from 'lucide-react';
import type { Product } from '../../types';

interface BulkDeleteModalProps {
  isOpen: boolean;
  selectedProducts: Product[];
  onConfirm: () => void;
  onCancel: () => void;
}

export const BulkDeleteModal: React.FC<BulkDeleteModalProps> = ({
  isOpen,
  selectedProducts,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onCancel} title="Confirmación de Eliminación Múltiple">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', padding: '0.5rem 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(239, 68, 68, 0.1)', padding: '1rem', borderRadius: '16px', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
          <div style={{ background: '#EF4444', color: 'white', padding: '10px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AlertTriangle size={24} />
          </div>
          <div>
            <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#B91C1C' }}>
              ¿Estás seguro de eliminar {selectedProducts.length} productos?
            </h4>
            <p style={{ margin: '4px 0 0 0', fontSize: '0.84rem', color: '#7F1D1D', lineHeight: 1.4 }}>
              Esta acción no se puede deshacer. Los productos seleccionados serán eliminados permanentemente del catálogo y de la base de datos.
            </p>
          </div>
        </div>

        <div>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '8px' }}>
            Productos a eliminar ({selectedProducts.length}):
          </span>
          <div style={{ maxHeight: '180px', overflowY: 'auto', border: '1px solid var(--border-light)', borderRadius: '12px', padding: '6px', background: 'var(--canvas-elevated)' }}>
            {selectedProducts.map((p, idx) => (
              <div
                key={p.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 8px',
                  borderBottom: idx < selectedProducts.length - 1 ? '1px solid var(--border-light)' : 'none',
                  fontSize: '0.85rem'
                }}
              >
                <img
                  src={p.images?.primary || (Array.isArray(p.images) ? p.images[0] : '/icons/ebna-logo.png')}
                  alt={p.name}
                  style={{ width: '28px', height: '28px', borderRadius: '6px', objectFit: 'cover' }}
                  onError={(e) => { e.currentTarget.src = '/icons/ebna-logo.png'; }}
                />
                <span style={{ fontWeight: 600, color: 'var(--text-primary)', flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {p.name}
                </span>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--brand-accent)' }}>
                  {p.category}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '0.5rem' }}>
          <button
            type="button"
            onClick={onCancel}
            style={{
              padding: '10px 18px',
              borderRadius: '20px',
              border: '1px solid var(--border-light)',
              background: 'var(--canvas-surface)',
              color: 'var(--text-primary)',
              fontWeight: 600,
              fontSize: '0.88rem',
              cursor: 'pointer'
            }}
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            style={{
              padding: '10px 20px',
              borderRadius: '20px',
              border: 'none',
              background: 'linear-gradient(135deg, #EF4444, #B91C1C)',
              color: 'white',
              fontWeight: 800,
              fontSize: '0.88rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 4px 14px rgba(239, 68, 68, 0.4)'
            }}
          >
            <Trash2 size={16} /> Eliminar {selectedProducts.length} Productos Definitivamente
          </button>
        </div>
      </div>
    </Modal>
  );
};
