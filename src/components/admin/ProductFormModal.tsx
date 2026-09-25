import React, { useState } from 'react';
import type { Product } from '../../types';
import { Modal } from '../ui/Modal';
import { 
  Tag, 
  FolderTree, 
  Coins, 
  Ruler, 
  Palette, 
  FileText, 
  Image as ImageIcon, 
  Upload, 
  Link as LinkIcon, 
  CheckCircle2, 
  PackageCheck, 
  PackageX, 
  Eye, 
  EyeOff, 
  Save, 
  AlertTriangle, 
  LogOut,
  Sparkles
} from 'lucide-react';
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
    category: product?.category || 'MODA_MUJER',
    description: product?.description || '',
    price: product?.price ? String(product.price) : '',
    in_stock: product?.in_stock ?? true,
    is_hidden: product?.is_hidden ?? false,
    sizes: product?.sizes ? product.sizes.join(', ') : '',
    colors: product?.colors ? product.colors.join(', ') : '',
  });
  
  const [imageTab, setImageTab] = useState<'pinterest' | 'file' | 'url'>('pinterest');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const initialImg = product?.images?.primary || (Array.isArray(product?.images) ? product.images[0] : (typeof product?.images === 'string' ? product.images : ''));
  const cleanInitialImg = typeof initialImg === 'string' ? initialImg.replace(/\.jfif$/i, '.jpg') : '';
  const [imagePreview, setImagePreview] = useState<string>(cleanInitialImg || '');
  const [customUrl, setCustomUrl] = useState<string>('');
  
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

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError('');

    try {
      const priceNum = parseFloat(formData.price);
      if (isNaN(priceNum) || priceNum <= 0) {
        throw new Error('El precio debe ser un número entero válido mayor a 0 FCFA');
      }

      if (!formData.name.trim()) {
        throw new Error('El nombre de la prenda o artículo es obligatorio');
      }

      const finalPrice = Math.round(priceNum);
      const generatedSlug = formData.slug.trim() || formData.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      const finalImageUrl = imagePreview || initialImg || product?.images?.primary || (Array.isArray(product?.images) ? product.images[0] : '') || '/icons/ebna-logo.png';

      const parsedSizes = formData.sizes.split(',').map(s => s.trim()).filter(Boolean);
      const parsedColors = formData.colors.split(',').map(c => c.trim()).filter(Boolean);

      const productPayload: Partial<Product> = {
        name: formData.name.trim(),
        slug: generatedSlug,
        category: formData.category as any,
        description: formData.description.trim(),
        price: finalPrice,
        priceFCFA: finalPrice,
        in_stock: formData.in_stock,
        inStock: formData.in_stock,
        is_hidden: formData.is_hidden,
        sizes: parsedSizes,
        colors: parsedColors,
        images: {
          primary: finalImageUrl,
          gallery: [finalImageUrl],
        },
      };

      if (product) {
        productPayload.id = product.id;
        productPayload.sku = product.sku;
      }

      setIsDirty(false);
      onClose();
      Promise.resolve(onSave(productPayload, imageFile || undefined)).catch((err) => {
        console.error('Error al guardar el producto:', err);
      });
    } catch (err: any) {
      setError(err.message || 'Error al procesar el formulario');
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
    <Modal isOpen={true} onClose={handleAttemptClose} title={product ? 'Editar Artículo del Catálogo' : 'Añadir Nueva Prenda o Artículo'}>
      {error && (
        <div style={{ color: '#EF4444', background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.25)', padding: '0.85rem 1rem', borderRadius: '12px', marginBottom: '1.2rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AlertTriangle size={18} />
          <span>{error}</span>
        </div>
      )}

      {/* Diálogo de Confirmación de Cambios sin Guardar */}
      {showExitConfirm ? (
        <div style={{ padding: '1.2rem', background: 'rgba(245, 158, 11, 0.08)', borderRadius: '16px', border: '1px solid rgba(245, 158, 11, 0.35)', margin: '1rem 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.8rem' }}>
            <AlertTriangle size={22} color="#D97706" />
            <div>
              <h4 style={{ margin: 0, fontSize: '0.98rem', fontWeight: 700, color: '#92400E' }}>¿Deseas salir sin guardar los cambios?</h4>
              <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.84rem', color: '#B45309' }}>
                Hay modificaciones en el producto que no han sido confirmadas.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', justifyContent: 'flex-end', marginTop: '1.2rem' }}>
            <button
              type="button"
              onClick={() => setShowExitConfirm(false)}
              style={{ padding: '8px 16px', borderRadius: '20px', border: '1px solid #CBD5E1', background: 'white', fontWeight: 600, fontSize: '0.84rem', cursor: 'pointer' }}
            >
              Continuar Editando
            </button>
            <button
              type="button"
              onClick={onClose}
              style={{ padding: '8px 16px', borderRadius: '20px', border: '1px solid rgba(239, 68, 68, 0.3)', background: 'rgba(239, 68, 68, 0.08)', color: '#EF4444', fontWeight: 700, fontSize: '0.84rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <LogOut size={15} /> Descartar y Salir
            </button>
            <button
              type="button"
              onClick={() => handleSubmit()}
              style={{ padding: '8px 18px', borderRadius: '20px', border: 'none', background: 'linear-gradient(135deg, #10B981, #059669)', color: 'white', fontWeight: 800, fontSize: '0.84rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.25)' }}
            >
              <Save size={15} /> Guardar Cambios
            </button>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="product-form-senior-ux"
          style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}
        >
          {/* Cuadrícula armónica de 2 columnas para campos principales */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
            {/* Campo 1: Nombre */}
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.45rem' }}>
                <Tag size={15} color="#D81B60" />
                <span>Nombre del Producto *</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ej: Vestido Largo de Noche Soleil"
                required
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  border: '1.5px solid rgba(216, 27, 96, 0.2)',
                  fontSize: '0.9rem',
                  color: 'var(--text-primary)',
                  background: 'var(--canvas-base, #FFFFFF)',
                  outline: 'none',
                  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {/* Campo 2: Categoría */}
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.45rem' }}>
                <FolderTree size={15} color="#D81B60" />
                <span>Categoría de Lujo *</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  border: '1.5px solid rgba(216, 27, 96, 0.2)',
                  fontSize: '0.9rem',
                  color: 'var(--text-primary)',
                  background: 'var(--canvas-base, #FFFFFF)',
                  outline: 'none',
                  cursor: 'pointer',
                  boxSizing: 'border-box'
                }}
              >
                <option value="MODA_MUJER">Moda Femenina & Vestidos de Gala</option>
                <option value="MODA_INFANTIL">Moda Infantil & Bebés Chicco/Nenuco</option>
                <option value="MODA_HOMBRE">Moda Masculina</option>
                <option value="CALZADO">Calzado de Gala & Sneakers</option>
                <option value="BOLSOS_ACCESORIOS">Bolsos & Accesorios de Pasarela</option>
                <option value="PERFUMERIA">Perfumería & Fragancias Exclusivas</option>
                <option value="COSMETICA_FACIAL">Cosmética & Cuidado Facial</option>
                <option value="HIGIENE_CORPORAL">Higiene Corporal, Jabones & Vaselinas</option>
              </select>
            </div>

            {/* Campo 3: Precio */}
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.45rem' }}>
                <Coins size={15} color="#D81B60" />
                <span>Precio Oficial (FCFA) *</span>
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Ej: 25000"
                required
                min="0"
                step="1"
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  border: '1.5px solid rgba(216, 27, 96, 0.2)',
                  fontSize: '0.9rem',
                  color: 'var(--text-primary)',
                  background: 'var(--canvas-base, #FFFFFF)',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {/* Campo 4: Tallas */}
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.45rem' }}>
                <Ruler size={15} color="#D81B60" />
                <span>Tallas Disponibles (Separadas por comas)</span>
              </label>
              <input
                type="text"
                name="sizes"
                value={formData.sizes}
                onChange={handleChange}
                placeholder="Opcional (ej: S, M, L o 38, 39, 40)"
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  border: '1.5px solid rgba(216, 27, 96, 0.2)',
                  fontSize: '0.9rem',
                  color: 'var(--text-primary)',
                  background: 'var(--canvas-base, #FFFFFF)',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {/* Campo 5: Colores */}
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.45rem' }}>
                <Palette size={15} color="#D81B60" />
                <span>Colores y Tonos (Separados por comas)</span>
              </label>
              <input
                type="text"
                name="colors"
                value={formData.colors}
                onChange={handleChange}
                placeholder="Opcional (ej: Negro, Dorado, Blanco Perla)"
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  border: '1.5px solid rgba(216, 27, 96, 0.2)',
                  fontSize: '0.9rem',
                  color: 'var(--text-primary)',
                  background: 'var(--canvas-base, #FFFFFF)',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {/* Campo 6: Stock y Visibilidad (Mini tarjetas interactivas) */}
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.45rem' }}>
                <PackageCheck size={15} color="#D81B60" />
                <span>Estado de Stock y Visibilidad</span>
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {/* Botón Switch Stock */}
                <button
                  type="button"
                  onClick={() => {
                    setIsDirty(true);
                    setFormData(prev => ({ ...prev, in_stock: !prev.in_stock }));
                  }}
                  style={{
                    padding: '8px 10px',
                    borderRadius: '10px',
                    border: formData.in_stock ? '1.5px solid #10B981' : '1.5px solid #EF4444',
                    background: formData.in_stock ? 'rgba(16, 185, 129, 0.08)' : 'rgba(239, 68, 68, 0.08)',
                    color: formData.in_stock ? '#059669' : '#DC2626',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  {formData.in_stock ? <PackageCheck size={15} /> : <PackageX size={15} />}
                  <span>{formData.in_stock ? 'Disponible' : 'Agotado'}</span>
                </button>

                {/* Botón Switch Visibilidad */}
                <button
                  type="button"
                  onClick={() => {
                    setIsDirty(true);
                    setFormData(prev => ({ ...prev, is_hidden: !prev.is_hidden }));
                  }}
                  style={{
                    padding: '8px 10px',
                    borderRadius: '10px',
                    border: formData.is_hidden ? '1.5px solid #94A3B8' : '1.5px solid #D81B60',
                    background: formData.is_hidden ? 'rgba(148, 163, 184, 0.08)' : 'rgba(216, 27, 96, 0.08)',
                    color: formData.is_hidden ? '#64748B' : '#D81B60',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  {formData.is_hidden ? <EyeOff size={15} /> : <Eye size={15} />}
                  <span>{formData.is_hidden ? 'Oculto' : 'Público'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Campo Descripción (Ancho Completo) */}
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.45rem' }}>
              <FileText size={15} color="#D81B60" />
              <span>Descripción y Detalles del Material</span>
            </label>
            <textarea
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              placeholder="Detalla los acabados, tejido de alta costura, corte o recomendaciones..."
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '12px',
                border: '1.5px solid rgba(216, 27, 96, 0.2)',
                fontSize: '0.9rem',
                color: 'var(--text-primary)',
                background: 'var(--canvas-base, #FFFFFF)',
                outline: 'none',
                minHeight: '75px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Módulo de Selección de Imagen */}
          <div style={{ marginTop: '0.3rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.6rem' }}>
              <ImageIcon size={15} color="#D81B60" />
              <span>Fotografía Oficial de la Prenda</span>
            </label>
            
            {/* Pestañas de Selección */}
            <div style={{ display: 'flex', gap: '6px', marginBottom: '0.8rem' }}>
              <button
                type="button"
                onClick={() => setImageTab('pinterest')}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  borderRadius: '10px',
                  border: imageTab === 'pinterest' ? '1.5px solid #D81B60' : '1px solid #E2E8F0',
                  background: imageTab === 'pinterest' ? 'linear-gradient(135deg, #D81B60, #C2185B)' : '#F8FAFC',
                  color: imageTab === 'pinterest' ? 'white' : '#64748B',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  transition: 'all 0.2s ease'
                }}
              >
                <Sparkles size={14} /> Catálogo HD
              </button>

              <button
                type="button"
                onClick={() => setImageTab('file')}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  borderRadius: '10px',
                  border: imageTab === 'file' ? '1.5px solid #D81B60' : '1px solid #E2E8F0',
                  background: imageTab === 'file' ? 'linear-gradient(135deg, #D81B60, #C2185B)' : '#F8FAFC',
                  color: imageTab === 'file' ? 'white' : '#64748B',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  transition: 'all 0.2s ease'
                }}
              >
                <Upload size={14} /> Subir desde PC
              </button>

              <button
                type="button"
                onClick={() => setImageTab('url')}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  borderRadius: '10px',
                  border: imageTab === 'url' ? '1.5px solid #D81B60' : '1px solid #E2E8F0',
                  background: imageTab === 'url' ? 'linear-gradient(135deg, #D81B60, #C2185B)' : '#F8FAFC',
                  color: imageTab === 'url' ? 'white' : '#64748B',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  transition: 'all 0.2s ease'
                }}
              >
                <LinkIcon size={14} /> Enlace Web
              </button>
            </div>

            {/* Vista Previa de Imagen Activa */}
            {imagePreview && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 14px', background: 'var(--canvas-subtle, #F8FAFC)', borderRadius: '12px', border: '1px solid rgba(216, 27, 96, 0.2)', marginBottom: '0.8rem' }}>
                <img 
                  src={imagePreview} 
                  alt="Vista previa" 
                  style={{ width: '56px', height: '56px', objectFit: 'cover', borderRadius: '10px', border: '1.5px solid rgba(216, 27, 96, 0.3)' }} 
                  onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/icons/ebna-logo.png'; }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#16A34A', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <CheckCircle2 size={13} /> Fotografía Lista para Publicar
                  </span>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary, #64748B)', margin: '2px 0 0 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {imagePreview}
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
              <div style={{ border: '2px dashed rgba(216, 27, 96, 0.3)', padding: '1.5rem', borderRadius: '14px', background: 'var(--canvas-subtle, #F8FAFC)', textAlign: 'center', cursor: 'pointer' }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  id="product-image-input"
                  style={{ display: 'none' }}
                />
                <label htmlFor="product-image-input" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                  <Upload size={30} color="#D81B60" />
                  <span style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                    {imageFile ? imageFile.name : 'Haz clic para seleccionar foto desde tu PC o Teléfono'}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Formatos soportados: JPG, PNG, WEBP</span>
                </label>
              </div>
            )}

            {imageTab === 'url' && (
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="url"
                  placeholder="https://ejemplo.com/foto-prenda.jpg"
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  style={{ flex: 1, padding: '10px 14px', borderRadius: '10px', border: '1.5px solid rgba(216, 27, 96, 0.2)', fontSize: '0.85rem' }}
                />
                <button
                  type="button"
                  onClick={handleUrlApply}
                  style={{ padding: '10px 18px', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #D81B60, #C2185B)', color: 'white', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}
                >
                  Cargar
                </button>
              </div>
            )}
          </div>

          {/* Barra de Acciones Final */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '1.2rem', paddingTop: '1rem', borderTop: '1px solid rgba(0, 0, 0, 0.06)' }}>
            <button 
              type="button" 
              onClick={handleAttemptClose} 
              style={{ padding: '10px 20px', borderRadius: '25px', border: '1px solid #CBD5E1', background: 'white', color: '#475569', fontWeight: 600, fontSize: '0.88rem', cursor: 'pointer' }}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              style={{ 
                padding: '10px 24px', 
                borderRadius: '25px', 
                border: 'none', 
                background: 'linear-gradient(135deg, #D81B60, #C2185B)', 
                color: 'white', 
                fontWeight: 800, 
                fontSize: '0.88rem', 
                cursor: 'pointer', 
                boxShadow: '0 4px 15px rgba(216, 27, 96, 0.35)', 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '8px' 
              }}
            >
              <Save size={16} /> {product ? 'Guardar Cambios' : 'Publicar Producto'}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}
