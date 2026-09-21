import React, { useState } from 'react';
import type { Product } from '../../types';
import { Modal } from '../ui/Modal';
import { Upload, Link as LinkIcon, Image as ImageIcon, AlertTriangle, Save, LogOut } from 'lucide-react';
import { PinterestImagePicker } from './PinterestImagePicker';

interface ProductFormModalProps {
  product: Product | null;
  onClose: () => void;
  onSave: (productData: Partial<Product>, imageFile?: File) => Promise<void>;
}

export function ProductFormModal({ product, onClose, onSave }: ProductFormModalProps) {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    slug: product?.slug || '',
    category: product?.category || 'VESTIDOS',
    description: product?.description || '',
    price: product?.price ? String(product.price) : '',
    in_stock: product?.in_stock ?? true,
    is_hidden: product?.is_hidden ?? false,
    sizes: product?.sizes ? product.sizes.join(', ') : 'S, M, L, XL, XXL',
    colors: product?.colors ? product.colors.join(', ') : 'Blanco, Negro, Rojo, Verde, Azul',
  });
  
  const [imageTab, setImageTab] = useState<'pinterest' | 'file' | 'url'>('pinterest');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(product?.images?.[0] || '');
  const [customUrl, setCustomUrl] = useState<string>('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isDirty, setIsDirty] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setIsDirty(true);
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setIsDirty(true);
    }
  };

  const handleUrlApply = () => {
    if (customUrl.trim()) {
      setImagePreview(customUrl.trim());
      setImageFile(null);
      setIsDirty(true);
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const priceNum = parseFloat(formData.price);
      if (isNaN(priceNum) || priceNum <= 0) {
        throw new Error('El precio debe ser un número válido mayor a 0 FCFA');
      }

      if (!formData.name.trim()) {
        throw new Error('El nombre del producto es obligatorio');
      }

      // Save price exactly as entered by the admin (no forced rounding or 25% markup)
      const finalPrice = Math.round(priceNum);

      const generatedSlug = formData.slug.trim() || formData.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

      const finalImageUrl = imagePreview || '/icons/ebna-logo.png';

      const parsedSizes = formData.sizes.split(',').map(s => s.trim()).filter(Boolean);
      const parsedColors = formData.colors.split(',').map(c => c.trim()).filter(Boolean);

      const productPayload: Partial<Product> = {
        name: formData.name.trim(),
        slug: generatedSlug,
        category: formData.category as any,
        description: formData.description.trim(),
        price: finalPrice,
        in_stock: formData.in_stock,
        is_hidden: formData.is_hidden,
        sizes: parsedSizes.length > 0 ? parsedSizes : ['S', 'M', 'L', 'XL'],
        colors: parsedColors.length > 0 ? parsedColors : ['Blanco', 'Negro', 'Rojo'],
        images: {
          primary: finalImageUrl,
          gallery: [finalImageUrl],
          0: finalImageUrl,
        },
      };

      if (product) {
        productPayload.id = product.id;
      }

      await onSave(productPayload, imageFile || undefined);
      setIsDirty(false);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Error al guardar el producto');
    } finally {
      setLoading(false);
    }
  };

  const handleAttemptClose = () => {
    if (isDirty) {
      setShowExitConfirm(true);
    } else {
      onClose();
    }
  };

  return (
    <Modal isOpen={true} onClose={handleAttemptClose} title={product ? 'Editar Producto en Catálogo' : 'Añadir Nuevo Producto'}>
      {error && <div className="auth-error mb-4" style={{ color: '#ef4444', background: 'rgba(239,68,68,0.1)', padding: '0.8rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.85rem' }}>{error}</div>}

      {/* Unsaved Changes Confirmation Dialog */}
      {showExitConfirm ? (
        <div style={{ padding: '1rem', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '16px', border: '1px solid #f59e0b', margin: '1rem 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.8rem' }}>
            <AlertTriangle size={24} color="#f59e0b" />
            <div>
              <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#92400e' }}>¿Tienes cambios sin guardar?</h4>
              <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.88rem', color: '#b45309' }}>
                ¿Deseas guardar los cambios antes de salir o descartar las modificaciones?
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', justifyContent: 'flex-end', marginTop: '1.2rem' }}>
            <button
              type="button"
              onClick={() => setShowExitConfirm(false)}
              style={{ padding: '8px 16px', borderRadius: '20px', border: '1px solid #cbd5e1', background: 'white', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={onClose}
              style={{ padding: '8px 16px', borderRadius: '20px', border: '1px solid rgba(239, 68, 68, 0.3)', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <LogOut size={16} /> Salir sin Guardar
            </button>
            <button
              type="button"
              onClick={() => handleSubmit()}
              disabled={loading}
              style={{ padding: '8px 18px', borderRadius: '20px', border: 'none', background: 'linear-gradient(135deg, #10B981, #059669)', color: 'white', fontWeight: 800, fontSize: '0.85rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px', boxShadow: '0 4px 12px rgba(16,185,129,0.3)' }}
            >
              <Save size={16} /> Guardar y Salir
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="product-form space-y-4" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="form-group">
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>Nombre del Producto *</label>
            <input
              type="text"
              name="name"
              className="glass-input"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ej: Vestido Satinado de Noche Zara Luxe"
              required
              style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid var(--color-glass-border)' }}
            />
          </div>

          <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>Categoría *</label>
              <select
                name="category"
                className="glass-input"
                value={formData.category}
                onChange={handleChange}
                style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid var(--color-glass-border)', background: 'white' }}
              >
                <option value="VESTIDOS">VESTIDOS & ROBES</option>
                <option value="CALZADO">CALZADO & SNEAKERS</option>
                <option value="MODA">MODA (ROPA / ZARA / SHEIN)</option>
                <option value="COSMETICA">COSMÉTICA & PERFUMES</option>
                <option value="JABONES">JABONES ARTESANALES</option>
                <option value="VASELINAS">VASELINAS & LIP CARE</option>
                <option value="POMADAS">POMADAS & SCRUBS</option>
                <option value="ACCESORIOS">ACCESORIOS & BONNETS</option>
                <option value="NIÑOS">NIÑOS & BEBÉS</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>Precio (FCFA) *</label>
              <input
                type="number"
                name="price"
                className="glass-input"
                value={formData.price}
                onChange={handleChange}
                placeholder="Ej: 15000"
                required
                min="0"
                style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid var(--color-glass-border)' }}
              />
            </div>
          </div>

          {/* Sizes and Colors Fields */}
          <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>Tallas Disponibles (Separadas por comas)</label>
              <input
                type="text"
                name="sizes"
                className="glass-input"
                value={formData.sizes}
                onChange={handleChange}
                placeholder="Ej: S, M, L, XL, XXL, 38, 39, 40"
                style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid var(--color-glass-border)' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>Colores / Tonos (Separados por comas)</label>
              <input
                type="text"
                name="colors"
                className="glass-input"
                value={formData.colors}
                onChange={handleChange}
                placeholder="Ej: Blanco, Negro, Rojo, Azul, Marrón, Mate"
                style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid var(--color-glass-border)' }}
              />
            </div>
          </div>

          <div className="form-group">
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>Descripción Detallada</label>
            <textarea
              name="description"
              className="glass-input"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              placeholder="Escribe la descripción del producto, materiales y detalles..."
              style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid var(--color-glass-border)' }}
            />
          </div>

          {/* IMAGE SELECTION MODULE */}
          <div className="form-group" style={{ marginTop: '0.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Imagen del Producto</label>
            
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.8rem' }}>
              <button
                type="button"
                onClick={() => setImageTab('pinterest')}
                style={{
                  flex: 1,
                  padding: '0.5rem 0.8rem',
                  borderRadius: '8px',
                  border: 'none',
                  background: imageTab === 'pinterest' ? 'linear-gradient(135deg, #E05A88, #C4436F)' : '#f1f5f9',
                  color: imageTab === 'pinterest' ? 'white' : '#64748b',
                  fontWeight: 600,
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem'
                }}
              >
                <ImageIcon size={16} /> Buscador Pinterest HD
              </button>

              <button
                type="button"
                onClick={() => setImageTab('file')}
                style={{
                  flex: 1,
                  padding: '0.5rem 0.8rem',
                  borderRadius: '8px',
                  border: 'none',
                  background: imageTab === 'file' ? 'linear-gradient(135deg, #E05A88, #C4436F)' : '#f1f5f9',
                  color: imageTab === 'file' ? 'white' : '#64748b',
                  fontWeight: 600,
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem'
                }}
              >
                <Upload size={16} /> Dispositivo Local
              </button>

              <button
                type="button"
                onClick={() => setImageTab('url')}
                style={{
                  flex: 1,
                  padding: '0.5rem 0.8rem',
                  borderRadius: '8px',
                  border: 'none',
                  background: imageTab === 'url' ? 'linear-gradient(135deg, #E05A88, #C4436F)' : '#f1f5f9',
                  color: imageTab === 'url' ? 'white' : '#64748b',
                  fontWeight: 600,
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem'
                }}
              >
                <LinkIcon size={16} /> URL Web
              </button>
            </div>

            {imagePreview && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.8rem', background: 'white', borderRadius: '12px', border: '1px solid var(--color-glass-border)', marginBottom: '0.8rem' }}>
                <img src={imagePreview} alt="Preview" style={{ width: '64px', height: '64px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--color-glass-border)' }} />
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#16a34a' }}>✓ Imagen Seleccionada</span>
                  <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', margin: '0.2rem 0 0 0', wordBreak: 'break-all' }}>
                    {imagePreview.length > 50 ? imagePreview.slice(0, 50) + '...' : imagePreview}
                  </p>
                </div>
              </div>
            )}

            {imageTab === 'pinterest' && (
              <PinterestImagePicker
                selectedUrl={imagePreview}
                onSelectUrl={(url) => {
                  setImagePreview(url);
                  setImageFile(null);
                  setIsDirty(true);
                }}
              />
            )}

            {imageTab === 'file' && (
              <div className="image-upload-area glass-card p-4 text-center cursor-pointer" style={{ border: '2px dashed var(--color-glass-border)', padding: '1.5rem', borderRadius: '14px', background: 'var(--color-bg-secondary)', textAlign: 'center' }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  id="product-image-input"
                  style={{ display: 'none' }}
                />
                <label htmlFor="product-image-input" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                  <Upload size={32} color="#E05A88" />
                  <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-primary-dark)' }}>
                    {imageFile ? imageFile.name : 'Haz clic para seleccionar foto desde tu PC o Teléfono'}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Soporta JPG, PNG, WEBP, JFIF</span>
                </label>
              </div>
            )}

            {imageTab === 'url' && (
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="url"
                  placeholder="Pega el enlace directo de la imagen (https://...)"
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  style={{ flex: 1, padding: '0.65rem 1rem', borderRadius: '10px', border: '1px solid var(--color-glass-border)', fontSize: '0.85rem' }}
                />
                <button
                  type="button"
                  onClick={handleUrlApply}
                  style={{ padding: '0.65rem 1.2rem', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #E05A88, #C4436F)', color: 'white', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}
                >
                  Aplicar
                </button>
              </div>
            )}
          </div>

          {/* Stock and Visibility Toggles */}
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
            <div className="form-group flex items-center gap-2" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <input
                type="checkbox"
                id="in_stock"
                name="in_stock"
                checked={formData.in_stock}
                onChange={handleChange}
                style={{ width: '18px', height: '18px', accentColor: '#E05A88', cursor: 'pointer' }}
              />
              <label htmlFor="in_stock" style={{ cursor: 'pointer', fontWeight: 600, fontSize: '0.88rem', color: formData.in_stock ? '#10B981' : '#EF4444' }}>
                {formData.in_stock ? '🟢 STOCK: DISPONIBLE' : '🔴 STOCK: AGOTADO'}
              </label>
            </div>

            <div className="form-group flex items-center gap-2" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <input
                type="checkbox"
                id="is_hidden"
                name="is_hidden"
                checked={formData.is_hidden}
                onChange={handleChange}
                style={{ width: '18px', height: '18px', accentColor: '#6B7280', cursor: 'pointer' }}
              />
              <label htmlFor="is_hidden" style={{ cursor: 'pointer', fontWeight: 600, fontSize: '0.88rem', color: formData.is_hidden ? '#6B7280' : '#E05A88' }}>
                {formData.is_hidden ? '👁️‍🗨️ VISIBILIDAD: OCULTO' : '👁️ VISIBILIDAD: PÚBLICO'}
              </label>
            </div>
          </div>

          <div className="modal-actions flex justify-end gap-3 mt-6" style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.8rem', marginTop: '1.5rem' }}>
            <button type="button" className="btn-secondary" onClick={handleAttemptClose} disabled={loading} style={{ padding: '0.75rem 1.4rem', borderRadius: '999px', border: '1px solid var(--color-glass-border)', background: 'white', fontWeight: 600, cursor: 'pointer' }}>
              Cancelar
            </button>
            <button type="submit" className="btn-primary" disabled={loading} style={{ padding: '0.75rem 1.6rem', borderRadius: '999px', border: 'none', background: 'linear-gradient(135deg, #E05A88, #C4436F)', color: 'white', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 15px rgba(224, 90, 136, 0.3)' }}>
              {loading ? 'Guardando...' : product ? 'Guardar Cambios' : 'Crear Producto'}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}
