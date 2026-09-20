import { useState } from 'react';
import type { Product } from '../../types';
import { useAdminProducts } from '../../hooks/useAdminProducts';
import { Modal } from '../ui/Modal';
import { Upload } from 'lucide-react';

interface ProductFormModalProps {
  product: Product | null;
  onClose: () => void;
}

export function ProductFormModal({ product, onClose }: ProductFormModalProps) {
  const { addProduct, updateProduct } = useAdminProducts();
  const [formData, setFormData] = useState({
    name: product?.name || '',
    slug: product?.slug || '',
    category: product?.category || 'MODA',
    description: product?.description || '',
    price: product?.price ? String(product.price) : '',
    in_stock: product?.in_stock ?? true,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(product?.images?.[0] || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
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
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const priceNum = parseFloat(formData.price);
      if (isNaN(priceNum) || priceNum <= 0) {
        throw new Error('El precio debe ser un número válido mayor a 0');
      }

      const generatedSlug = formData.slug.trim() || formData.name.toLowerCase().replace(/[^a-z0-0]/g, '-').replace(/-+/g, '-');

      const productPayload = {
        name: formData.name,
        slug: generatedSlug,
        category: formData.category as 'MODA' | 'COSMETICA' | 'ACCESORIOS',
        description: formData.description,
        price: priceNum,
        in_stock: formData.in_stock,
        images: imagePreview ? [imagePreview] : ['/icons/ebna-logo.png'],
      };

      if (product) {
        await updateProduct(product.id, productPayload, imageFile || undefined);
      } else {
        await addProduct(productPayload, imageFile || undefined);
      }

      onClose();
    } catch (err: any) {
      setError(err.message || 'Error al guardar el producto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose} title={product ? 'Editar Producto' : 'Nuevo Producto'}>
      {error && <div className="auth-error mb-4">{error}</div>}
      
      <form onSubmit={handleSubmit} className="product-form space-y-4">
        <div className="form-group">
          <label>Nombre del Producto *</label>
          <input
            type="text"
            name="name"
            className="glass-input"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Categoría *</label>
          <select
            name="category"
            className="glass-input"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="MODA">MODA</option>
            <option value="COSMETICA">COSMÉTICA</option>
            <option value="ACCESORIOS">ACCESORIOS</option>
          </select>
        </div>

        <div className="form-group">
          <label>Precio (FCFA) *</label>
          <input
            type="number"
            name="price"
            className="glass-input"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
          />
        </div>

        <div className="form-group">
          <label>Descripción</label>
          <textarea
            name="description"
            className="glass-input"
            rows={3}
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Imagen del Producto</label>
          <div className="image-upload-area glass-card p-4 text-center cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              id="product-image-input"
              className="hidden"
            />
            <label htmlFor="product-image-input" className="cursor-pointer flex flex-col items-center justify-center">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="h-32 object-cover rounded-lg mb-2" />
              ) : (
                <Upload size={32} className="text-brand mb-2" />
              )}
              <span>{imageFile ? imageFile.name : 'Haz clic para seleccionar una imagen'}</span>
            </label>
          </div>
        </div>

        <div className="form-group flex items-center gap-2">
          <input
            type="checkbox"
            id="in_stock"
            name="in_stock"
            checked={formData.in_stock}
            onChange={handleChange}
          />
          <label htmlFor="in_stock" className="cursor-pointer">Producto en stock</label>
        </div>

        <div className="modal-actions flex justify-end gap-3 mt-6">
          <button type="button" className="btn-secondary" onClick={onClose} disabled={loading}>
            Cancelar
          </button>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Guardando...' : product ? 'Guardar Cambios' : 'Crear Producto'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
