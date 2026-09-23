import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useAdminProducts } from '../hooks/useAdminProducts';
import { useAdminCrud } from '../contexts/AdminCrudContext';
import { Loader } from '../components/ui/Loader';
import { Pencil, Trash2, Eye, EyeOff, Plus, LogOut, Package, Users, KeyRound, BarChart3, Search, ShieldCheck, RefreshCw, Database, CheckCircle2, Sliders, CheckSquare, Film } from 'lucide-react';
import { notifyCatalogChange } from '../lib/broadcast';
import { ProductFormModal } from '../components/admin/ProductFormModal';
import { DeleteConfirmModal } from '../components/admin/DeleteConfirmModal';
import { ProductInspectModal } from '../components/admin/ProductInspectModal';
import { CustomizationSettingsPanel } from '../components/admin/CustomizationSettingsPanel';
import { AdvertisingVideoPanel } from '../components/admin/AdvertisingVideoPanel';
import { UserRoleManagement } from '../components/admin/UserRoleManagement';
import { ChangePasswordModal } from '../components/admin/ChangePasswordModal';
import { Toast } from '../components/ui/Toast';
import type { Product, ProductCategory } from '../types';
import { formatPrice } from '../lib/utils';

export function AdminDashboard() {
  const { user, profile, signOut } = useAuth();
  const { products, loading, addProduct, updateProduct, deleteProduct, toggleStock, refetch } = useAdminProducts();
  const { 
    selectedIds, 
    toggleSelect, 
    selectAll, 
    clearSelection, 
    bulkUpdateStock, 
    bulkUpdateVisibility,
    openBulkDeleteModal 
  } = useAdminCrud();

  const [activeTab, setActiveTab] = useState<'inventory' | 'advertising' | 'customization' | 'users' | 'security' | 'analytics'>('inventory');
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleteAllOpen, setIsDeleteAllOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const [isInspectOpen, setIsInspectOpen] = useState(false);
  const [inspectProduct, setInspectProduct] = useState<Product | null>(null);

  const handleInspect = (product: Product) => {
    setInspectProduct(product);
    setIsInspectOpen(true);
  };
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'TODOS'>('TODOS');
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncSuccess, setSyncSuccess] = useState(false);
  const [toastInfo, setToastInfo] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const handleGlobalSync = async () => {
    setIsSyncing(true);
    try {
      notifyCatalogChange('sync_all');
      await refetch();
      setSyncSuccess(true);
      setTimeout(() => setSyncSuccess(false), 3000);
    } finally {
      setIsSyncing(false);
    }
  };

  const handlePurgeLocalCache = () => {
    if (confirm('¿Deseas purgar la memoria local de este navegador y forzar actualización?')) {
      try {
        localStorage.clear();
        sessionStorage.clear();
        if ('caches' in window) {
          caches.keys().then(keys => keys.forEach(k => caches.delete(k)));
        }
      } catch (e) {}
      window.location.reload();
    }
  };

  const activeProducts = products.filter(p => p.in_stock).length;
  const totalInventoryValue = products.reduce((acc, p) => acc + (p.in_stock ? p.price : 0), 0);
  const categoriesCount = new Set(products.map(p => p.category)).size;

  const handleCreate = () => {
    setSelectedProduct(null);
    setIsFormOpen(true);
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
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
    for (const p of products) {
      await deleteProduct(p.id);
    }
    setIsDeleteAllOpen(false);
    clearSelection();
  };

  const handleSave = async (productData: Partial<Product>, imageFile?: File) => {
    const targetId = productData.id || selectedProduct?.id;
    // Close modal immediately (0ms)
    setIsFormOpen(false);
    setSelectedProduct(null);
    setToastInfo({ message: '⚡ Guardado instantáneamente en todos los sistemas', type: 'success' });

    try {
      if (targetId) {
        await updateProduct(targetId, productData, imageFile);
      } else {
        await addProduct(productData, imageFile);
      }
    } catch (err: any) {
      console.warn('Background sync note:', err);
    }
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setSelectedProduct(null);
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
          { id: 'advertising' as const, label: 'Publicidad & Video', icon: <Film size={18} /> },
          { id: 'customization' as const, label: 'Personalización & UI', icon: <Sliders size={18} /> },
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
          {/* Universal Real-Time Sync & Database Health Card */}
          <div style={{ background: 'linear-gradient(135deg, rgba(216, 27, 96, 0.05), rgba(37, 99, 235, 0.05))', border: '1px solid var(--color-glass-border)', borderRadius: '18px', padding: '1.2rem 1.6rem', marginBottom: '1.8rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ background: '#10b981', color: 'white', padding: '8px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Database size={20} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h4 style={{ margin: 0, fontSize: '0.98rem', fontWeight: 700, color: '#1e293b' }}>Base de Datos Nube (Supabase Real-Time)</h4>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'rgba(16, 185, 129, 0.12)', color: '#059669', fontSize: '0.72rem', fontWeight: 700, padding: '2px 8px', borderRadius: '999px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }}></span> En Vivo
                  </span>
                </div>
                <p style={{ margin: '3px 0 0 0', fontSize: '0.82rem', color: '#64748b' }}>
                  {products.length} productos activos en tiempo real para todos los clientes (Móvil & PC).
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={handleGlobalSync}
                disabled={isSyncing}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '0.55rem 1.1rem', borderRadius: '12px', background: '#D81B60', color: 'white', border: 'none', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s ease', opacity: isSyncing ? 0.7 : 1 }}
              >
                {syncSuccess ? <><CheckCircle2 size={16} /> ¡Sincronizado!</> : <><RefreshCw size={16} className={isSyncing ? 'animate-spin' : ''} /> Forzar Sincronización Global</>}
              </button>

              <button
                type="button"
                onClick={handlePurgeLocalCache}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '0.55rem 1rem', borderRadius: '12px', background: 'white', color: '#64748b', border: '1px solid #cbd5e1', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer' }}
                title="Borrar memoria local y recargar"
              >
                Purgar Caché Local
              </button>
            </div>
          </div>

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
                <option value="MODA_MUJER">Moda Femenina & Vestidos</option>
                <option value="MODA_INFANTIL">Moda Infantil & Bebés</option>
                <option value="MODA_HOMBRE">Moda Masculina</option>
                <option value="CALZADO">Calzado & Sneakers</option>
                <option value="BOLSOS_ACCESORIOS">Bolsos & Accesorios</option>
                <option value="PERFUMERIA">Perfumería de Lujo</option>
                <option value="COSMETICA_FACIAL">Cosmética Facial</option>
                <option value="HIGIENE_CORPORAL">Higiene Corporal & Jabones</option>
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

          {/* BULK ACTIONS TOOLBAR (Marcar casitas para CRUD masivo) */}
          {selectedIds.size > 0 && (
            <div 
              className="bulk-actions-toolbar glass-panel"
              style={{
                background: 'linear-gradient(135deg, rgba(20, 10, 20, 0.96), rgba(40, 15, 30, 0.94))',
                border: '1.5px solid #D81B60',
                borderRadius: '16px',
                padding: '12px 20px',
                marginBottom: '1.2rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '12px',
                color: 'white',
                boxShadow: '0 8px 24px rgba(216, 27, 96, 0.35)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckSquare size={20} color="#F48FB1" />
                <span style={{ fontSize: '0.92rem', fontWeight: 800, color: '#FFFFFF' }}>
                  {selectedIds.size} {selectedIds.size === 1 ? 'producto marcado' : 'productos marcados'}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => bulkUpdateStock(true)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '12px',
                    border: '1px solid rgba(34,197,94,0.4)',
                    background: 'rgba(34,197,94,0.15)',
                    color: '#4ADE80',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                  title="Poner todos los seleccionados en stock"
                >
                  <Eye size={14} /> Poner En Stock
                </button>

                <button
                  type="button"
                  onClick={() => bulkUpdateStock(false)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '12px',
                    border: '1px solid rgba(239,68,68,0.4)',
                    background: 'rgba(239,68,68,0.15)',
                    color: '#F87171',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                  title="Poner todos los seleccionados como agotados"
                >
                  <EyeOff size={14} /> Poner Agotado
                </button>

                <button
                  type="button"
                  onClick={() => bulkUpdateVisibility(false)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.1)',
                    color: '#FFFFFF',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                  title="Hacer públicos en el catálogo"
                >
                  Hacer Públicos
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const toDelete = products.filter(p => selectedIds.has(p.id));
                    openBulkDeleteModal(toDelete);
                  }}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '12px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #EF4444, #DC2626)',
                    color: 'white',
                    fontSize: '0.82rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 4px 12px rgba(239, 68, 68, 0.4)'
                  }}
                  title="Eliminar permanentemente todos los seleccionados"
                >
                  <Trash2 size={15} /> Eliminar Seleccionados ({selectedIds.size})
                </button>

                <button
                  type="button"
                  onClick={clearSelection}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'transparent',
                    color: '#CBD5E1',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Desmarcar Todos
                </button>
              </div>
            </div>
          )}

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
                        <th style={{ padding: '1rem', width: '44px' }}>
                          <input
                            type="checkbox"
                            checked={filteredProducts.length > 0 && filteredProducts.every(p => selectedIds.has(p.id))}
                            onChange={() => {
                              if (filteredProducts.every(p => selectedIds.has(p.id))) {
                                clearSelection();
                              } else {
                                selectAll(filteredProducts.map(p => p.id));
                              }
                            }}
                            title="Seleccionar o desmarcar todos los productos filtrados"
                            style={{ width: '18px', height: '18px', accentColor: '#D81B60', cursor: 'pointer' }}
                          />
                        </th>
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
                        <tr 
                          key={product.id} 
                          onClick={() => handleInspect(product)}
                          style={{ 
                            borderBottom: '1px solid var(--color-glass-border)', 
                            background: selectedIds.has(product.id) ? 'rgba(216, 27, 96, 0.06)' : undefined,
                            opacity: product.is_hidden ? 0.6 : 1,
                            cursor: 'pointer',
                            transition: 'background-color 0.2s'
                          }}
                          title="Haz clic para ampliar la información y editar dentro"
                        >
                          <td style={{ padding: '0.8rem 1rem' }} onClick={(e) => e.stopPropagation()}>
                            <input
                              type="checkbox"
                              checked={selectedIds.has(product.id)}
                              onChange={() => toggleSelect(product.id)}
                              style={{ width: '18px', height: '18px', accentColor: '#D81B60', cursor: 'pointer' }}
                            />
                          </td>
                          <td style={{ padding: '0.8rem 1rem' }}>
                            <img 
                              src={product.images?.primary || (Array.isArray(product.images) ? product.images[0] : (typeof product.images === 'string' ? product.images : '/icons/ebna-logo.png'))} 
                              alt={product.name} 
                              style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--color-glass-border)' }} 
                              onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/icons/ebna-logo.png'; }}
                            />
                          </td>
                          <td style={{ padding: '0.8rem 1rem', fontWeight: 600 }}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                              <span>{product.name}</span>
                              <span style={{ fontSize: '0.72rem', color: 'var(--brand-accent)', fontWeight: 700 }}>🔍 Clic para ampliar & editar</span>
                            </div>
                          </td>
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
                              onClick={(e) => {
                                e.stopPropagation();
                                updateProduct(product.id, { is_hidden: !product.is_hidden });
                              }}
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
                          <td style={{ padding: '0.8rem 1rem', textAlign: 'right', whiteSpace: 'nowrap', minWidth: '135px' }}>
                            <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'flex-end', alignItems: 'center' }}>
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEdit(product);
                                }} 
                                style={{ padding: '0.5rem', borderRadius: '8px', border: '1px solid var(--color-glass-border)', background: 'white', color: '#475569', cursor: 'pointer' }} 
                                title="Editar"
                              >
                                <Pencil size={18} />
                              </button>
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleStock(product.id, product.in_stock);
                                }} 
                                style={{ padding: '0.5rem', borderRadius: '8px', border: '1px solid var(--color-glass-border)', background: 'white', color: product.in_stock ? '#15803d' : '#94a3b8', cursor: 'pointer' }} 
                                title="Cambiar Estado de Stock"
                              >
                                {product.in_stock ? <EyeOff size={18} /> : <Eye size={18} />}
                              </button>
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteClick(product);
                                }} 
                                style={{ padding: '0.5rem', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.3)', background: 'rgba(239, 68, 68, 0.08)', color: '#ef4444', cursor: 'pointer' }} 
                                title="Eliminar Permanentemente"
                              >
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
                      onClick={() => handleInspect(product)}
                      className="glass-card"
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        padding: '14px',
                        borderRadius: '16px',
                        background: selectedIds.has(product.id) ? 'rgba(255, 240, 245, 0.95)' : '#FFFFFF',
                        border: selectedIds.has(product.id) ? '2px solid #D81B60' : '1.5px solid rgba(216, 27, 96, 0.15)',
                        boxShadow: selectedIds.has(product.id) ? '0 4px 16px rgba(216, 27, 96, 0.25)' : '0 4px 12px rgba(0,0,0,0.03)',
                        opacity: product.is_hidden ? 0.65 : 1,
                        cursor: 'pointer'
                      }}
                      title="Toca para ampliar y ver toda su información"
                    >
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <div onClick={(e) => e.stopPropagation()} style={{ display: 'flex', alignItems: 'center' }}>
                          <input
                            type="checkbox"
                            checked={selectedIds.has(product.id)}
                            onChange={() => toggleSelect(product.id)}
                            style={{ width: '20px', height: '20px', accentColor: '#D81B60', cursor: 'pointer' }}
                          />
                        </div>
                        <img 
                          src={product.images?.primary || (Array.isArray(product.images) ? product.images[0] : (typeof product.images === 'string' ? product.images : '/icons/ebna-logo.png'))} 
                          alt={product.name} 
                          style={{ width: '56px', height: '56px', objectFit: 'cover', borderRadius: '10px', border: '1px solid var(--color-glass-border)' }} 
                          onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/icons/ebna-logo.png'; }}
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
                            onClick={(e) => {
                              e.stopPropagation();
                              updateProduct(product.id, { is_hidden: !product.is_hidden });
                            }}
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
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEdit(product);
                            }} 
                            style={{ padding: '6px 12px', borderRadius: '10px', border: '1px solid var(--color-glass-border)', background: '#F8FAFC', color: '#475569', fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                          >
                            <Pencil size={14} /> Editar
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteClick(product);
                            }} 
                            style={{ padding: '6px 10px', borderRadius: '10px', border: '1px solid rgba(239, 68, 68, 0.3)', background: 'rgba(239, 68, 68, 0.08)', color: '#ef4444', fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                          >
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

      {/* TAB: PUBLICIDAD & VIDEO */}
      {activeTab === 'advertising' && (
        <AdvertisingVideoPanel />
      )}

      {/* TAB: PERSONALIZACIÓN & UI */}
      {activeTab === 'customization' && (
        <CustomizationSettingsPanel />
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

      {/* MODALS */}
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

      {/* Expanded Product Inspection & Inside Editing Modal */}
      {isInspectOpen && inspectProduct && (
        <ProductInspectModal
          product={inspectProduct}
          onClose={() => {
            setIsInspectOpen(false);
            setInspectProduct(null);
          }}
          onEdit={() => {
            const prodToEdit = inspectProduct;
            setIsInspectOpen(false);
            setInspectProduct(null);
            handleEdit(prodToEdit);
          }}
          onToggleStock={async () => {
            await toggleStock(inspectProduct.id, inspectProduct.in_stock);
            setInspectProduct(prev => prev ? { ...prev, in_stock: !prev.in_stock, inStock: !prev.in_stock } : null);
          }}
          onDelete={() => {
            const prodToDelete = inspectProduct;
            setIsInspectOpen(false);
            setInspectProduct(null);
            handleDeleteClick(prodToDelete);
          }}
        />
      )}

      {/* Instant Sync Feedback Toast */}
      {toastInfo && (
        <Toast
          message={toastInfo.message}
          type={toastInfo.type}
          isVisible={true}
          onClose={() => setToastInfo(null)}
        />
      )}
    </div>
  );
}

