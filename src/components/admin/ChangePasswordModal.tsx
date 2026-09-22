import React, { useState } from 'react';
import { KeyRound, CheckCircle2, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const ChangePasswordModal: React.FC = () => {
  const { user, updatePassword } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (newPassword.length < 6) {
      setError('La nueva contraseña debe tener al menos 6 caracteres.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden. Por favor verifica.');
      return;
    }

    setLoading(true);
    try {
      if (updatePassword) {
        const res = await updatePassword(newPassword);
        if (res.error) {
          setError(res.error.message || 'Error al actualizar la contraseña.');
        } else {
          setSuccess('¡Contraseña actualizada con éxito!');
          setCurrentPassword('');
          setNewPassword('');
          setConfirmPassword('');
        }
      } else {
        setSuccess('¡Contraseña actualizada con éxito en la sesión demo!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch (err: any) {
      setError('Ocurrió un error inesperado. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="change-password-module" style={{ maxWidth: '600px', background: 'white', padding: '2rem', borderRadius: '20px', border: '1px solid var(--color-glass-border)', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
        <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(224, 90, 136, 0.1)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <KeyRound size={22} />
        </div>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', color: 'var(--color-primary-dark)', margin: 0 }}>
            Cambiar Contraseña y Credenciales
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', margin: '0.2rem 0 0 0' }}>
            Usuario en sesión: <strong>{user?.email || 'admin@ebna.com'}</strong>
          </p>
        </div>
      </div>

      {success && (
        <div style={{ padding: '0.8rem 1.2rem', borderRadius: '10px', background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.3)', color: '#15803d', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
          <CheckCircle2 size={18} />
          {success}
        </div>
      )}

      {error && (
        <div style={{ padding: '0.8rem 1.2rem', borderRadius: '10px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#b91c1c', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
          <AlertCircle size={18} />
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
            Contraseña Actual
          </label>
          <input
            type="password"
            required
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="••••••••"
            style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '12px', border: '1.5px solid rgba(216, 27, 96, 0.2)', background: '#FFFFFF', fontSize: '0.92rem', color: '#1E293B', outline: 'none' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
            Nueva Contraseña
          </label>
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Mínimo 6 caracteres"
              style={{ width: '100%', padding: '0.8rem 2.8rem 0.8rem 1rem', borderRadius: '12px', border: '1.5px solid rgba(216, 27, 96, 0.2)', background: '#FFFFFF', fontSize: '0.92rem', color: '#1E293B', outline: 'none' }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
            Confirmar Nueva Contraseña
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Repite la nueva contraseña"
            style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '12px', border: '1.5px solid rgba(216, 27, 96, 0.2)', background: '#FFFFFF', fontSize: '0.92rem', color: '#1E293B', outline: 'none' }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '0.9rem 1.8rem',
            borderRadius: '30px',
            border: 'none',
            background: 'linear-gradient(135deg, #D81B60, #C2185B)',
            color: 'white',
            fontWeight: 800,
            fontSize: '0.95rem',
            cursor: loading ? 'wait' : 'pointer',
            boxShadow: '0 6px 20px rgba(216, 27, 96, 0.35)',
            marginTop: '0.5rem',
            transition: 'all 0.2s ease'
          }}
        >
          {loading ? 'Actualizando...' : 'Guardar Nueva Contraseña'}
        </button>
      </form>
    </div>
  );
};
