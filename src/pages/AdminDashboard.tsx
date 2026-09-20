import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useAdminProducts } from '../hooks/useAdminProducts';
import { Loader } from '../components/ui/Loader';
import { Pencil, Trash2, Eye, EyeOff, Plus, LogOut } from 'lucide-react';
import { ProductFormModal } from '../components/admin/ProductFormModal';
import { DeleteConfirmModal } from '../components/admin/DeleteConfirmModal';
import type { Product } from '../types';

export function AdminDashboard() {
  const { user, signOut } = useAuth();
  const { products, loading, toggleStock, deleteProduct } = useAdminProducts();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const activeProducts = products.filter(p => p.in_stock).length;
  const categoriesCount = new Set(products.map(p => p.category)).size;

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsFormOpen(true);
  };

  const handleCreate = () => {
    setSelectedProduct(null);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedProduct) {
      await deleteProduct(selectedProduct.id);
      setIsDeleteOpen(false);
      setSelectedProduct(null);
    }
  };

  if (loading) return <div className="admin-loader-wrapper"><Loader /></div>;

  return (
    <div className="admin-dashboard">
      <header className="admin-dashboard-header">
        <div className="header-info">
          <h1>Panel de Administración EBNA</h1>
          <p>Usuario: {user?.email}</p>
        </div>
        <button onClick={signOut} className="btn-logout"><LogOut size={18}/> Cerrar Sesión</button>
      </header>

      <div className="admin-stats-grid">
        <div className="stat-card glass-panel">
          <h3>Total Productos</h3>
          <p className="stat-value">{products.length}</p>
        </div>
        <div className="stat-card glass-panel">
          <h3>Productos Activos</h3>
          <p className="stat-value">{activeProducts}</p>
        </div>
        <div className="stat-card glass-panel">
          <h3>Categorías</h3>
          <p className="stat-value">{categoriesCount}</p>
        </div>
      </div>

      <div className="admin-actions-bar">
        <h2>Gestión de Productos</h2>
        <button onClick={handleCreate} className="btn-primary">
          <Plus size={20} /> Añadir Producto
        </button>
      </div>

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio (FCFA)</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id} className="table-row-glass">
                <td>
                  <img src={product.images?.[0] || '/icons/ebna-logo.png'} alt={product.name} className="admin-thumbnail" />
                </td>
                <td className="font-medium">{product.name}</td>
                <td><span className={`badge badge-${product.category.toLowerCase()}`}>{product.category}</span></td>
                <td>{product.price.toLocaleString()}</td>
                <td>
                  <span className={`status-badge ${product.in_stock ? 'active' : 'inactive'}`}>
                    {product.in_stock ? 'En Stock' : 'Agotado'}
                  </span>
                </td>
                <td className="action-cells">
                  <button onClick={() => handleEdit(product)} className="action-btn edit" title="Editar">
                    <Pencil size={18} />
                  </button>
                  <button onClick={() => toggleStock(product.id, product.in_stock)} className="action-btn toggle" title="Cambiar Stock">
                    {product.in_stock ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                  <button onClick={() => handleDeleteClick(product)} className="action-btn delete" title="Eliminar">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isFormOpen && (
        <ProductFormModal 
          product={selectedProduct} 
          onClose={() => setIsFormOpen(false)} 
        />
      )}

      {isDeleteOpen && (
        <DeleteConfirmModal 
          onConfirm={confirmDelete} 
          onCancel={() => setIsDeleteOpen(false)} 
        />
      )}
    </div>
  );
}
