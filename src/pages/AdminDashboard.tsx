import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useAdminProducts } from '../hooks/useAdminProducts';
import { Loader } from '../components/ui/Loader';
import { Pencil, Trash2, Eye, EyeOff, Plus, LogOut, Package, Users, KeyRound, BarChart3, Search, ShieldCheck, Megaphone, Sparkles, Check } from 'lucide-react';
import { ProductFormModal } from '../components/admin/ProductFormModal';
import { DeleteConfirmModal } from '../components/admin/DeleteConfirmModal';
import { UserRoleManagement } from '../components/admin/UserRoleManagement';
import { ChangePasswordModal } from '../components/admin/ChangePasswordModal';
import type { Product, ProductCategory } from '../types';
import { formatPrice } from '../lib/utils';
import { getActiveHeroPromo, setActiveHeroPromo, DEFAULT_PROMO_TEMPLATES, PROMO_IMAGES_PUB, type HeroPromoConfig } from '../lib/promoManager';

export function AdminDashboard() {
  const { user, profile, signOut } = useAuth();
  const { products, loading, addProduct, updateProduct, deleteProduct, toggleStock, refetch } = useAdminProducts();
  const [activeTab, setActiveTab] = useState<'inventory' | 'promos' | 'users' | 'security' | 'analytics'>('inventory');
  const [promoConfig, setPromoConfig] = useState<HeroPromoConfig>(getActiveHeroPromo());
  const [promoSavedNotice, setPromoSavedNotice] = useState(false);
  
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
            <span style={{ background: 'rgba(216, 27, 96, 0.15)', color: 'var(--color-primary-dark)', padding: '0.2rem 0.6rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
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
          { id: 'promos' as const, label: 'Promociones & Anuncios Hero', icon: <Megaphone size={18} /> },
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
              background: activeTab === tab.id ? 'linear-gradient(135deg, #D81B60, #C2185B)' : 'transparent',
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
              <button onClick={handleCreate} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.4rem', borderRadius: '999px', border: 'none', background: 'linear-gradient(135deg, #D81B60, #C2185B)', color: 'white', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', boxShadow: '0 4px 15px rgba(216, 27, 96, 0.3)' }}>
                <Plus size={20} /> Añadir Producto
              </button>
            </div>
          </div>

          {/* Product List: Table for Desktop, Responsive Cards for Mobile */}
          <div className="admin-inventory-container" style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--color-glass-border)', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
            {filteredProducts.length === 0 ? (
              <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                <Package size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 600, margin: '0 0 0.5rem 0' }}>No hay productos en el catálogo</h3>
                <p style={{ fontSize: '0.9rem', margin: 0 }}>Haz clic en <strong>"Añadir Producto"</strong> para empezar a crear tu inventario.</p>
              </div>
            ) : (
              <>
                {/* Desktop Table (Hidden on Mobile) */}
                <div className="table-responsive-wrapper desktop-only">
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
                            <span style={{ padding: '0.25rem 0.6rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700, background: 'rgba(216, 27, 96, 0.1)', color: '#D81B60' }}>
                              {product.category}
                            </span>
                          </td>
                          <td style={{ padding: '0.8rem 1rem', fontWeight: 700, color: '#1E293B' }}>
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
                                padding: '0.3rem 0.75rem',
                                borderRadius: '999px',
                                border: 'none',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                background: product.is_hidden ? '#f1f5f9' : 'rgba(216, 27, 96, 0.12)',
                                color: product.is_hidden ? '#64748b' : '#D81B60',
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px'
                              }}
                            >
                              {product.is_hidden ? <><EyeOff size={12} /> Oculto</> : <><Eye size={12} /> Público</>}
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
                </div>

                {/* Mobile Cards Container (Visible on Mobile Screens) */}
                <div className="mobile-admin-cards-grid" style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '12px' }}>
                  {filteredProducts.map(product => (
                    <div 
                      key={product.id} 
                      className="glass-card"
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        padding: '14px',
                        borderRadius: '16px',
                        background: '#FFFFFF',
                        border: '1px solid rgba(216, 27, 96, 0.15)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                        opacity: product.is_hidden ? 0.65 : 1
                      }}
                    >
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <img 
                          src={product.images?.[0] || '/icons/ebna-logo.png'} 
                          alt={product.name} 
                          style={{ width: '56px', height: '56px', objectFit: 'cover', borderRadius: '10px', border: '1px solid var(--color-glass-border)' }} 
                        />
                        <div style={{ flex: 1 }}>
                          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1E293B', margin: '0 0 4px 0' }}>{product.name}</h4>
                          <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
                            <span style={{ padding: '2px 8px', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 700, background: 'rgba(216, 27, 96, 0.1)', color: '#D81B60' }}>
                              {product.category}
                            </span>
                            <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#1E293B' }}>
                              {formatPrice(product.price)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '8px' }}>
                        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                          <span style={{ padding: '3px 8px', borderRadius: '12px', fontSize: '0.72rem', fontWeight: 700, background: product.in_stock ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)', color: product.in_stock ? '#15803d' : '#b91c1c' }}>
                            {product.in_stock ? 'En Stock' : 'Agotado'}
                          </span>

                          <button
                            onClick={() => updateProduct(product.id, { is_hidden: !product.is_hidden })}
                            style={{
                              padding: '3px 8px',
                              borderRadius: '12px',
                              border: 'none',
                              fontSize: '0.72rem',
                              fontWeight: 700,
                              background: product.is_hidden ? '#f1f5f9' : 'rgba(216, 27, 96, 0.12)',
                              color: product.is_hidden ? '#64748b' : '#D81B60',
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '3px'
                            }}
                          >
                            {product.is_hidden ? <><EyeOff size={12} /> Oculto</> : <><Eye size={12} /> Público</>}
                          </button>
                        </div>

                        <div style={{ display: 'flex', gap: '6px' }}>
                          <button onClick={() => handleEdit(product)} style={{ padding: '6px 12px', borderRadius: '10px', border: '1px solid var(--color-glass-border)', background: '#F8FAFC', color: '#475569', fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <Pencil size={14} /> Editar
                          </button>
                          <button onClick={() => handleDeleteClick(product)} style={{ padding: '6px 10px', borderRadius: '10px', border: '1px solid rgba(239, 68, 68, 0.3)', background: 'rgba(239, 68, 68, 0.08)', color: '#ef4444', fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* TAB PROMOS: HERO ADVERTISING & PROMOTIONS EDITING */}
      {activeTab === 'promos' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {/* Editor Form */}
          <div style={{ background: 'white', padding: '2rem', borderRadius: '24px', border: '1px solid var(--color-glass-border)', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.2rem' }}>
              <div style={{ background: 'linear-gradient(135deg, #D81B60, #C2185B)', padding: '0.5rem', borderRadius: '12px', color: 'white', display: 'flex' }}>
                <Megaphone size={20} />
              </div>
              <div>
                <h2 style={{ fontSize: '1.3rem', fontFamily: 'var(--font-serif)', color: 'var(--color-primary-dark)', margin: 0 }}>
                  Configurar Anuncio Hero (Cada 30 min)
                </h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', margin: '2px 0 0 0' }}>
                  Edita el espacio publicitario que acompaña al producto destacado en la página de inicio.
                </p>
              </div>
            </div>

            {/* Template Presets */}
            <div style={{ marginBottom: '1.5rem', background: '#F8FAFC', padding: '1rem', borderRadius: '16px', border: '1px solid var(--color-glass-border)' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.6rem' }}>
                Plantillas por Defecto Rapidas
              </label>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {DEFAULT_PROMO_TEMPLATES.map((tmpl) => (
                  <button
                    key={tmpl.id}
                    onClick={() => setPromoConfig(tmpl)}
                    style={{
                      padding: '0.45rem 0.85rem',
                      borderRadius: '999px',
                      border: promoConfig.id === tmpl.id ? '2px solid #D81B60' : '1px solid var(--color-glass-border)',
                      background: promoConfig.id === tmpl.id ? 'rgba(216, 27, 96, 0.1)' : 'white',
                      color: promoConfig.id === tmpl.id ? '#D81B60' : '#475569',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    ⚡ {tmpl.badge}
                  </button>
                ))}
              </div>
            </div>

            {/* IMG PUB Gallery Selector */}
            <div style={{ marginBottom: '1.5rem', background: '#FFF5F8', padding: '1rem', borderRadius: '16px', border: '1px solid rgba(216, 27, 96, 0.2)' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 800, color: '#D81B60', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.6rem' }}>
                <Sparkles size={14} /> Galería de Imágenes Promocionales Secuenciales (Carpeta IMG PUB)
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(64px, 1fr))', gap: '8px', maxHeight: '140px', overflowY: 'auto', paddingRight: '4px' }}>
                {PROMO_IMAGES_PUB.map((imgItem) => (
                  <button
                    key={imgItem.id}
                    onClick={() => setPromoConfig(prev => ({ ...prev, imageUrl: imgItem.url }))}
                    title={imgItem.title}
                    style={{
                      position: 'relative',
                      border: promoConfig.imageUrl === imgItem.url ? '2px solid #D81B60' : '1px solid rgba(0,0,0,0.1)',
                      borderRadius: '10px',
                      overflow: 'hidden',
                      padding: 0,
                      background: '#fff',
                      cursor: 'pointer',
                      aspectRatio: '1',
                      boxShadow: promoConfig.imageUrl === imgItem.url ? '0 0 10px rgba(216, 27, 96, 0.4)' : 'none',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <img src={imgItem.url} alt={imgItem.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    {promoConfig.imageUrl === imgItem.url && (
                      <span style={{ position: 'absolute', top: 2, right: 2, background: '#D81B60', color: 'white', borderRadius: '999px', padding: '1px', display: 'flex' }}>
                        <Check size={10} />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Product Select */}
            {products.length > 0 && (
              <div style={{ marginBottom: '1.2rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '0.4rem' }}>
                  Seleccionar Imagen de Producto del Catálogo (Opcional):
                </label>
                <select
                  onChange={(e) => {
                    const prod = products.find(p => p.id === e.target.value);
                    if (prod && prod.images?.[0]) {
                      setPromoConfig(prev => ({
                        ...prev,
                        imageUrl: prod.images[0],
                        title: prod.name
                      }));
                    }
                  }}
                  style={{ width: '100%', padding: '0.65rem 0.9rem', borderRadius: '12px', border: '1px solid var(--color-glass-border)', fontSize: '0.85rem', background: 'white' }}
                >
                  <option value="">-- Elige un producto para extraer su imagen --</option>
                  {products.map(p => (
                    <option key={p.id} value={p.id}>{p.name} ({formatPrice(p.price)})</option>
                  ))}
                </select>
              </div>
            )}

            {/* Form Fields */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '0.3rem' }}>
                  URL de Imagen del Anuncio:
                </label>
                <input
                  type="text"
                  value={promoConfig.imageUrl}
                  onChange={(e) => setPromoConfig({ ...promoConfig, imageUrl: e.target.value })}
                  placeholder="https://..."
                  style={{ width: '100%', padding: '0.65rem 0.9rem', borderRadius: '12px', border: '1px solid var(--color-glass-border)', fontSize: '0.85rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '0.3rem' }}>
                    Etiqueta Superior (Badge):
                  </label>
                  <input
                    type="text"
                    value={promoConfig.badge}
                    onChange={(e) => setPromoConfig({ ...promoConfig, badge: e.target.value })}
                    placeholder="Ej: OFERTA DE LA SEMANA"
                    style={{ width: '100%', padding: '0.65rem 0.9rem', borderRadius: '12px', border: '1px solid var(--color-glass-border)', fontSize: '0.85rem' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '0.3rem' }}>
                    Descuento / Tag:
                  </label>
                  <input
                    type="text"
                    value={promoConfig.discountBadge}
                    onChange={(e) => setPromoConfig({ ...promoConfig, discountBadge: e.target.value })}
                    placeholder="Ej: -50% DESC"
                    style={{ width: '100%', padding: '0.65rem 0.9rem', borderRadius: '12px', border: '1px solid var(--color-glass-border)', fontSize: '0.85rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '0.3rem' }}>
                  Título del Anuncio (Con Animación de Texto):
                </label>
                <input
                  type="text"
                  value={promoConfig.title}
                  onChange={(e) => setPromoConfig({ ...promoConfig, title: e.target.value })}
                  placeholder="Ej: Elegancia y Estilo Hecho Para Ti"
                  style={{ width: '100%', padding: '0.65rem 0.9rem', borderRadius: '12px', border: '1px solid var(--color-glass-border)', fontSize: '0.85rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '0.3rem' }}>
                  Descripción Corta del Anuncio:
                </label>
                <textarea
                  rows={3}
                  value={promoConfig.description}
                  onChange={(e) => setPromoConfig({ ...promoConfig, description: e.target.value })}
                  placeholder="Ej: Producto exclusivo rebajado al 50%..."
                  style={{ width: '100%', padding: '0.65rem 0.9rem', borderRadius: '12px', border: '1px solid var(--color-glass-border)', fontSize: '0.85rem', resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '0.3rem' }}>
                    Texto Botón CTA:
                  </label>
                  <input
                    type="text"
                    value={promoConfig.buttonText}
                    onChange={(e) => setPromoConfig({ ...promoConfig, buttonText: e.target.value })}
                    placeholder="Ej: Ver Producto ➔"
                    style={{ width: '100%', padding: '0.65rem 0.9rem', borderRadius: '12px', border: '1px solid var(--color-glass-border)', fontSize: '0.85rem' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '0.3rem' }}>
                    Enlace de Destino:
                  </label>
                  <input
                    type="text"
                    value={promoConfig.buttonLink}
                    onChange={(e) => setPromoConfig({ ...promoConfig, buttonLink: e.target.value })}
                    placeholder="Ej: /#catalogo"
                    style={{ width: '100%', padding: '0.65rem 0.9rem', borderRadius: '12px', border: '1px solid var(--color-glass-border)', fontSize: '0.85rem' }}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1rem', alignItems: 'center' }}>
                <button
                  onClick={() => {
                    setActiveHeroPromo(promoConfig);
                    setPromoSavedNotice(true);
                    setTimeout(() => setPromoSavedNotice(false), 3000);
                  }}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    padding: '0.85rem 1.4rem',
                    borderRadius: '999px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #D81B60, #C2185B)',
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 15px rgba(216, 27, 96, 0.35)'
                  }}
                >
                  <Sparkles size={18} /> Publicar Anuncio en Inicio
                </button>
              </div>

              {promoSavedNotice && (
                <div style={{ padding: '0.75rem', borderRadius: '12px', background: 'rgba(34, 197, 94, 0.15)', color: '#15803d', fontWeight: 700, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Check size={18} /> ¡Anuncio actualizado y publicado en directo en la página de inicio!
                </div>
              )}
            </div>
          </div>

          {/* Live Interactive Preview */}
          <div>
            <h3 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-serif)', color: 'var(--color-primary-dark)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Eye size={18} /> Vista Previa Directa (En Vivo)
            </h3>

            <div className="hero-promo-spotlight-card" style={{ maxWidth: '480px', margin: '0 auto' }}>
              <div style={{ position: 'relative', width: '100%', height: '220px', borderRadius: '16px', overflow: 'hidden', marginBottom: '1rem' }}>
                <img
                  src={promoConfig.imageUrl || '/icons/ebna-logo.png'}
                  alt={promoConfig.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span className="hero-promo-badge">
                  {promoConfig.badge}
                </span>
                <span className="hero-promo-discount">
                  {promoConfig.discountBadge}
                </span>
              </div>

              <h4 className="text-promo-video-animated" style={{ fontSize: '1.3rem', margin: '0 0 0.6rem 0', lineHeight: 1.3 }}>
                {promoConfig.title}
              </h4>

              <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.5, margin: '0 0 1.2rem 0' }}>
                {promoConfig.description}
              </p>

              <a
                href={promoConfig.buttonLink}
                className="btn-primary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  width: '100%',
                  padding: '0.75rem 1.2rem',
                  borderRadius: '999px',
                  background: 'linear-gradient(135deg, #D81B60, #C2185B)',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  textDecoration: 'none'
                }}
              >
                {promoConfig.buttonText}
              </a>
            </div>
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

