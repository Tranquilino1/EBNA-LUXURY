import React, { useState, useEffect } from 'react';
import { ShieldCheck, ShieldAlert, User, Search, CheckCircle2 } from 'lucide-react';
import { demoGetUsers, demoUpdateUserRole, type UserAccount } from '../../lib/demoData';

export const UserRoleManagement: React.FC = () => {
  const [users, setUsers] = useState<UserAccount[]>([]);
  const [search, setSearch] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    setUsers(demoGetUsers());
  }, []);

  const handleRoleToggle = (userId: string, currentRole: 'ADMIN' | 'USER') => {
    const newRole = currentRole === 'ADMIN' ? 'USER' : 'ADMIN';
    const updated = demoUpdateUserRole(userId, newRole);
    setUsers(updated);
    setFeedback(`Rol de usuario actualizado a ${newRole} con éxito.`);
    setTimeout(() => setFeedback(null), 3000);
  };

  const filteredUsers = users.filter(u => 
    u.full_name.toLowerCase().includes(search.toLowerCase()) || 
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.phone.includes(search)
  );

  return (
    <div className="user-role-management">
      <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-serif)', color: 'var(--color-primary-dark)', margin: 0 }}>
            Gestión de Usuarios y Roles de Acceso
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', margin: '0.25rem 0 0 0' }}>
            Asigna permisos de Administrador (`ADMIN`) o Cliente (`USER`) a las cuentas registradas.
          </p>
        </div>

        <div style={{ position: 'relative', width: '280px' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
          <input
            type="text"
            placeholder="Buscar usuario o email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '0.6rem 0.8rem 0.6rem 2.4rem',
              borderRadius: '999px',
              border: '1px solid var(--color-glass-border)',
              background: 'white',
              fontSize: '0.85rem'
            }}
          />
        </div>
      </div>

      {feedback && (
        <div style={{
          padding: '0.8rem 1.2rem',
          borderRadius: '12px',
          background: 'rgba(34, 197, 94, 0.1)',
          border: '1px solid rgba(34, 197, 94, 0.3)',
          color: '#15803d',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.9rem'
        }}>
          <CheckCircle2 size={18} />
          {feedback}
        </div>
      )}

      <div className="table-container" style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--color-glass-border)', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
        <table className="admin-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--color-bg-secondary)', borderBottom: '1px solid var(--color-glass-border)', textAlign: 'left' }}>
              <th style={{ padding: '1rem' }}>Usuario</th>
              <th style={{ padding: '1rem' }}>Email</th>
              <th style={{ padding: '1rem' }}>Teléfono</th>
              <th style={{ padding: '1rem' }}>Rol Actual</th>
              <th style={{ padding: '1rem', textAlign: 'right' }}>Acciones de Rol</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-muted)' }}>
                  No se encontraron usuarios registrados con el criterio de búsqueda.
                </td>
              </tr>
            ) : (
              filteredUsers.map(user => (
                <tr key={user.id} style={{ borderBottom: '1px solid var(--color-glass-border)' }}>
                  <td style={{ padding: '1rem', fontWeight: 600 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: user.role === 'ADMIN' ? 'linear-gradient(135deg, #E05A88, #C4436F)' : '#f1f5f9',
                        color: user.role === 'ADMIN' ? 'white' : '#64748b',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <User size={18} />
                      </div>
                      <div>
                        <div>{user.full_name}</div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>ID: {user.id.slice(0, 8)}...</span>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '1rem', color: 'var(--color-text-muted)' }}>{user.email}</td>
                  <td style={{ padding: '1rem', color: 'var(--color-text-muted)' }}>{user.phone || 'No especificado'}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{
                      padding: '0.3rem 0.8rem',
                      borderRadius: '999px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      background: user.role === 'ADMIN' ? 'rgba(224, 90, 136, 0.15)' : 'rgba(100, 116, 139, 0.1)',
                      color: user.role === 'ADMIN' ? 'var(--color-primary-dark)' : '#64748b',
                      border: user.role === 'ADMIN' ? '1px solid rgba(224, 90, 136, 0.3)' : '1px solid rgba(100, 116, 139, 0.2)'
                    }}>
                      {user.role === 'ADMIN' ? <ShieldCheck size={14} /> : <ShieldAlert size={14} />}
                      {user.role}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <button
                      onClick={() => handleRoleToggle(user.id, user.role)}
                      style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '8px',
                        border: 'none',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        background: user.role === 'ADMIN' ? '#f1f5f9' : 'linear-gradient(135deg, #E05A88, #C4436F)',
                        color: user.role === 'ADMIN' ? '#475569' : 'white',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {user.role === 'ADMIN' ? 'Cambiar a USER' : 'Promover a ADMIN'}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
