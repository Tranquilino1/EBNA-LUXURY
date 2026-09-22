import React, { useState } from 'react';
import { useAdminCrud } from '../../contexts/AdminCrudContext';
import { ShieldCheck, Plus, LayoutDashboard, ChevronDown, ChevronUp } from 'lucide-react';
import { Link, useLocation } from 'react-router';

export const AdminFloatingDock: React.FC = () => {
  const { isAdmin, openCreateModal } = useAdminCrud();
  const [isMinimized, setIsMinimized] = useState(false);
  const location = useLocation();

  // If not admin, or already on the admin dashboard route, we can hide or show minimal
  if (!isAdmin) return null;

  const isOnAdminDashboard = location.pathname.startsWith('/admin');

  return (
    <aside 
      aria-label="Panel de control flotante de Administrador"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 99999,
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        filter: 'drop-shadow(0 8px 30px rgba(216, 27, 96, 0.35))'
      }}
    >
      {isMinimized ? (
        <button
          type="button"
          onClick={() => setIsMinimized(false)}
          style={{
            background: 'linear-gradient(135deg, #D81B60, #880E4F)',
            color: 'white',
            border: '2px solid rgba(255, 255, 255, 0.4)',
            borderRadius: '30px',
            padding: '10px 18px',
            fontSize: '0.82rem',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
          }}
          title="Restaurar barra de administrador"
        >
          <ShieldCheck size={16} />
          <span>Modo Admin</span>
          <ChevronUp size={14} />
        </button>
      ) : (
        <div
          style={{
            background: 'rgba(25, 15, 25, 0.92)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1.5px solid rgba(216, 27, 96, 0.4)',
            borderRadius: '24px',
            padding: '10px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            color: 'white',
            boxShadow: '0 12px 36px rgba(0, 0, 0, 0.4)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', paddingRight: '4px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', display: 'inline-block' }}></span>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#F48FB1', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                ADMIN ACTIVO
              </span>
              <span style={{ fontSize: '0.65rem', color: '#CBD5E1' }}>CRUD en Vivo</span>
            </div>
          </div>

          <button
            type="button"
            onClick={openCreateModal}
            style={{
              background: 'linear-gradient(135deg, #D81B60, #C2185B)',
              border: 'none',
              borderRadius: '16px',
              color: 'white',
              padding: '8px 14px',
              fontSize: '0.82rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 4px 12px rgba(216, 27, 96, 0.4)',
              transition: 'transform 0.15s ease'
            }}
            title="Crear un nuevo producto en cualquier sección"
          >
            <Plus size={16} />
            <span>+ Nuevo Producto</span>
          </button>

          {!isOnAdminDashboard && (
            <Link
              to="/admin"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '16px',
                color: '#FFFFFF',
                padding: '8px 12px',
                fontSize: '0.8rem',
                fontWeight: 700,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'background 0.2s ease'
              }}
              title="Ir al Panel de Inventario Completo"
            >
              <LayoutDashboard size={15} />
              <span>Panel Admin</span>
            </Link>
          )}

          <button
            type="button"
            onClick={() => setIsMinimized(true)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94A3B8',
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title="Minimizar barra flotante"
          >
            <ChevronDown size={16} />
          </button>
        </div>
      )}
    </aside>
  );
};
