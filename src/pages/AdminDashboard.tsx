import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useAdminProducts } from '../hooks/useAdminProducts';
import { Loader } from '../components/ui/Loader';
import { Pencil, Trash2, Eye, EyeOff, Plus, LogOut, Package, Users, KeyRound, BarChart3, Search, ShieldCheck } from 'lucide-react';
import { ProductFormModal } from '../components/admin/ProductFormModal';
import { DeleteConfirmModal } from '../components/admin/DeleteConfirmModal';
import { UserRoleManagement } from '../components/admin/UserRoleManagement';
import { ChangePasswordModal } from '../components/admin/ChangePasswordModal';
import type { Product, ProductCategory } from '../types';
import { formatPrice } from '../lib/utils';

export function AdminDashboard() {
  const { user, profile, signOut } = useAuth();
  const { products, loading, addProduct, updateProduct, deleteProduct, toggleStock, refetch } = useAdminProducts();
  const [activeTab, setActiveTab] = useState<'inventory' | 'users' | 'security' | 'analytics'>('inventory');
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleteAllOpen, setIsDeleteAllOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'TODOS'>('TODOS');

  const activeProducts = products.filter(p => p.in_stock).length;
  const totalInventoryValue = products.reduce((acc, p) => acc + (p.in_stock ? p.price : 0), 0);
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

  const handleDeleteAll = async () => {
    // Delete all products one by one
    for (const p of products) {
      await deleteProduct(p.id);
    }
    setIsDeleteAllOpen(false);
    refetch();
  };

  const handleSave = async (productData: Partial<Product>, imageFile?: File) => {
    if (selectedProduct) {
      // Editing existing product
      await updateProduct(selectedProduct.id, productData, imageFile);
    } else {
      // Creating new product
      await addProduct(productData, imageFile);
    }
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setSelectedProduct(null);
    refetch();
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'TODOS' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) return <div className="admin-loader-wrapper" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Loader /></div>;

  return (
    <div className="admin-dashboard" style={{ padding: '2rem 1rem', maxWidth: '1280px', margin: '0 auto' }}>
      {/* Admin Top Header */}
      <header className="admin-dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem', background: 'white', padding: '1.5rem 2rem', borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', border: '1px solid var(--color-glass-border)' }}>
        <div className="header-info">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <h1 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-serif)', color: 'var(--color-primary-dark)', margin: 0 }}>
              Panel EBNA Luxury Admin
            </h1>
            <span style={{ background: 'rgba(224, 90, 136, 0.15)', color: 'var(--color-primary-dark)', padding: '0.2rem 0.6rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
              <ShieldCheck size={14} />
              {profile?.role || 'ADMIN'}
            </span>
          </div>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', margin: '0.3rem 0 0 0' }}>
            Bienvenido, <strong>{profile?.full_name || user?.email}</strong> ({user?.email})
          </p>
        </div>

        <button onClick={signOut} className="btn-logout" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.65rem 1.2rem', borderRadius: '999px', border: '1px solid rgba(239, 68, 68, 0.3)', background: 'rgba(239, 68, 68, 0.08)', color: '#ef4444', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s ease' }}>
          <LogOut size={18}/> Cerrar Sesión
        </button>
      </header>

      {/* Navigation Tabs Bar */}
      <nav style={{ display: 'flex', gap: '0.8rem', marginBottom: '2rem', borderBottom: '1px solid var(--color-glass-border)', paddingBottom: '0.5rem', overflowX: 'auto' }}>
        {[
          { id: 'inventory' as const, label: `Inventario (${products.length})`, icon: <Package size={18} /> },
          { id: 'users' as const, label: 'Usuarios & Roles', icon: <Users size={18} /> },
          { id: 'security' as const, label: 'Mi Cuenta & Seguridad', icon: <KeyRound size={18} /> },
          { id: 'analytics' as const, label: 'Analítica', icon: <BarChart3 size={18} /> },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.4rem',
              borderRadius: '14px',
              border: 'none',
              background: activeTab === tab.id ? 'linear-gradient(135deg, #E05A88, #C4436F)' : 'transparent',
              color: activeTab === tab.id ? 'white' : 'var(--color-text-muted)',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap'
            }}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </nav>

      {/* TAB 1: INVENTORY MANAGEMENT */}
      {activeTab === 'inventory' && (
        <div>
          {/* Quick Metrics Bar */}
          <div className="admin-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.2rem', marginBottom: '2rem' }}>
            <div className="stat-card glass-panel" style={{ background: 'white', padding: '1.2rem 1.5rem', borderRadius: '16px', border: '1px solid var(--color-glass-border)' }}>
              <h3 style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', margin: 0 }}>Total Catalogo</h3>
              <p className="stat-value" style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-primary-dark)', margin: '0.3rem 0 0 0' }}>{products.length}</p>
            </div>
            <div className="stat-card glass-panel" style={{ background: 'white', padding: '1.2rem 1.5rem', borderRadius: '16px', border: '1px solid var(--color-glass-border)' }}>
              <h3 style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', margin: 0 }}>En Stock Activo</h3>
              <p className="stat-value" style={{ fontSize: '2rem', fontWeight: 800, color: '#16a34a', margin: '0.3rem 0 0 0' }}>{activeProducts}</p>
            </div>
            <div className="stat-card glass-panel" style={{ background: 'white', padding: '1.2rem 1.5rem', borderRadius: '16px', border: '1px solid var(--color-glass-border)' }}>
              <h3 style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', margin: 0 }}>Categorías</h3>
              <p className="stat-value" style={{ fontSize: '2rem', fontWeight: 800, color: '#2563eb', margin: '0.3rem 0 0 0' }}>{categoriesCount}</p>
            </div>
            <div className="stat-card glass-panel" style={{ background: 'white', padding: '1.2rem 1.5rem', borderRadius: '16px', border: '1px solid var(--color-glass-border)' }}>
              <h3 style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', margin: 0 }}>Valor Inventario</h3>
              <p className="stat-value" style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-gold-dark)', margin: '0.3rem 0 0 0' }}>{formatPrice(totalInventoryValue)}</p>
            </div>
          </div>

          {/* Action & Filter Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem', background: 'white', padding: '1rem 1.5rem', borderRadius: '16px', border: '1px solid var(--color-glass-border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', flexWrap: 'wrap', flex: 1 }}>
              <div style={{ position: 'relative', minWidth: '240px' }}>
                <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                <input
                  type="text"
                  placeholder="Buscar por nombre..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ width: '100%', padding: '0.6rem 0.8rem 0.6rem 2.4rem', borderRadius: '10px', border: '1px solid var(--color-glass-border)', fontSize: '0.85rem' }}
                />
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as any)}
                style={{ padding: '0.6rem 1rem', borderRadius: '10px', border: '1px solid var(--color-glass-border)', fontSize: '0.85rem', background: 'white', cursor: 'pointer' }}
              >
                <option value="TODOS">Todas las Categorías</option>
                <option value="VESTIDOS">Vestidos & Robes</option>
                <option value="CALZADO">Calzado & Sneakers</option>
                <option value="MODA">Moda & Hoodies</option>
                <option value="COSMETICA">Cosmética / Cremas</option>
                <option value="JABONES">Jabones</option>
                <option value="VASELINAS">Vaselinas</option>
                <option value="POMADAS">Pomadas</option>
                <option value="ACCESORIOS">Accesorios</option>
                <option value="NIÑOS">Niños / Bebés</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '0.6rem' }}>

              {products.length > 0 && (
                <button onClick={() => setIsDeleteAllOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.2rem', borderRadius: '999px', border: '1px solid rgba(239, 68, 68, 0.3)', background: 'rgba(239, 68, 68, 0.08)', color: '#ef4444', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}>
                  <Trash2 size={18} /> Borrar Todo Permanentemente
                </button>
              )}
              <button onClick={handleCreate} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.4rem', borderRadius: '999px', border: 'none', background: 'linear-gradient(135deg, #E05A88, #C4436F)', color: 'white', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', boxShadow: '0 4px 15px rgba(224, 90, 136, 0.3)' }}>
                <Plus size={20} /> Añadir Producto
              </button>
            </div>
          </div>

          {/* Product Table */}
          <div className="table-container" style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--color-glass-border)', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
            {filteredProducts.length === 0 ? (
              <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                <Package size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 600, margin: '0 0 0.5rem 0' }}>No hay productos en el catálogo</h3>
                <p style={{ fontSize: '0.9rem', margin: 0 }}>Haz clic en <strong>"Añadir Producto"</strong> para empezar a crear tu inventario.</p>
              </div>
            ) : (
              <table className="admin-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'var(--color-bg-secondary)', borderBottom: '1px solid var(--color-glass-border)', textAlign: 'left' }}>
                    <th style={{ padding: '1rem' }}>Imagen</th>
                    <th style={{ padding: '1rem' }}>Nombre del Producto</th>
                    <th style={{ padding: '1rem' }}>Categoría</th>
                    <th style={{ padding: '1rem' }}>Precio (FCFA)</th>
                    <th style={{ padding: '1rem' }}>Estado Stock</th>
                    <th style={{ padding: '1rem' }}>Visibilidad</th>
                    <th style={{ padding: '1rem', textAlign: 'right' }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map(product => (
                    <tr key={product.id} style={{ borderBottom: '1px solid var(--color-glass-border)', opacity: product.is_hidden ? 0.6 : 1 }}>
                      <td style={{ padding: '0.8rem 1rem' }}>
                        <img src={product.images?.[0] || '/icons/ebna-logo.png'} alt={product.name} style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--color-glass-border)' }} />
                      </td>
                      <td style={{ padding: '0.8rem 1rem', fontWeight: 600 }}>{product.name}</td>
                      <td style={{ padding: '0.8rem 1rem' }}>
                        <span style={{ padding: '0.25rem 0.6rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700, background: 'rgba(224, 90, 136, 0.1)', color: 'var(--color-primary-dark)' }}>
                          {product.category}
                        </span>
                      </td>
                      <td style={{ padding: '0.8rem 1rem', fontWeight: 700, color: 'var(--color-text-main)' }}>
                        {formatPrice(product.price)}
                      </td>
                      <td style={{ padding: '0.8rem 1rem' }}>
                        <span style={{ padding: '0.25rem 0.7rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700, background: product.in_stock ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)', color: product.in_stock ? '#15803d' : '#b91c1c' }}>
                          {product.in_stock ? 'En Stock' : 'Agotado'}
                        </span>
                      </td>
                      <td style={{ padding: '0.8rem 1rem' }}>
                        <button
                          onClick={() => updateProduct(product.id, { is_hidden: !product.is_hidden })}
                          style={{
                            padding: '0.25rem 0.7rem',
                            borderRadius: '999px',
                            border: 'none',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            background: product.is_hidden ? '#f3f4f6' : 'rgba(224, 90, 136, 0.15)',
                            color: product.is_hidden ? '#6b7280' : '#E05A88',
                            cursor: 'pointer'
                          }}
                        >
                          {product.is_hidden ? '👁️‍🗨️ OCULTO' : '👁️ PÚBLICO'}
                        </button>
                      </td>
                      <td style={{ padding: '0.8rem 1rem', textAlign: 'right' }}>
                        <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'flex-end' }}>
                          <button onClick={() => handleEdit(product)} style={{ padding: '0.5rem', borderRadius: '8px', border: '1px solid var(--color-glass-border)', background: 'white', color: '#475569', cursor: 'pointer' }} title="Editar">
                            <Pencil size={18} />
                          </button>
                          <button onClick={() => toggleStock(product.id, product.in_stock)} style={{ padding: '0.5rem', borderRadius: '8px', border: '1px solid var(--color-glass-border)', background: 'white', color: product.in_stock ? '#15803d' : '#94a3b8', cursor: 'pointer' }} title="Cambiar Estado de Stock">
                            {product.in_stock ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                          <button onClick={() => handleDeleteClick(product)} style={{ padding: '0.5rem', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.3)', background: 'rgba(239, 68, 68, 0.08)', color: '#ef4444', cursor: 'pointer' }} title="Eliminar Permanentemente">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: USERS & ROLES */}
      {activeTab === 'users' && (
        <UserRoleManagement />
      )}

      {/* TAB 3: ACCOUNT & SECURITY */}
      {activeTab === 'security' && (
        <ChangePasswordModal />
      )}

      {/* TAB 4: ANALYTICS */}
      {activeTab === 'analytics' && (
        <div style={{ background: 'white', padding: '2rem', borderRadius: '20px', border: '1px solid var(--color-glass-border)' }}>
          <h2 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', color: 'var(--color-primary-dark)', marginBottom: '1rem' }}>
            Métricas Principales & Análisis de Ventas
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
            <div style={{ padding: '1.5rem', borderRadius: '16px', background: 'var(--color-bg-secondary)', border: '1px solid var(--color-glass-border)' }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', margin: 0 }}>Canal Principal de Ventas</p>
              <h3 style={{ fontSize: '1.2rem', color: '#16a34a', margin: '0.4rem 0' }}>WhatsApp Pedido Directo</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', margin: 0 }}>+240 222 633 687 (EBNA Luxury)</p>
            </div>
            <div style={{ padding: '1.5rem', borderRadius: '16px', background: 'var(--color-bg-secondary)', border: '1px solid var(--color-glass-border)' }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', margin: 0 }}>Productos en Catálogo</p>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: '0.4rem 0' }}>{products.length} productos</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', margin: 0 }}>{activeProducts} activos en stock</p>
            </div>
          </div>
        </div>
      )}

      {isFormOpen && (
        <ProductFormModal 
          product={selectedProduct} 
          onClose={handleFormClose}
          onSave={handleSave}
        />
      )}

      {isDeleteOpen && (
        <DeleteConfirmModal 
          onConfirm={confirmDelete} 
          onCancel={() => setIsDeleteOpen(false)} 
        />
      )}

      {/* Delete All Confirmation Modal */}
      {isDeleteAllOpen && (
        <DeleteConfirmModal
          onConfirm={handleDeleteAll}
          onCancel={() => setIsDeleteAllOpen(false)}
        />
      )}
    </div>
  );
}
