import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { Shield, Loader2, KeyRound } from 'lucide-react';

export function AdminLoginPage() {
  const [email, setEmail] = useState('Admin@ebna.com');
  const [password, setPassword] = useState('@sindyluxury2026');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, isAdmin, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && isAdmin) {
      navigate('/admin/dashboard');
    }
  }, [user, isAdmin, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { error: signInError } = await signIn(email, password);
      if (signInError) {
        setError(signInError.message || 'Error de autenticación');
        setLoading(false);
        return;
      }
    } catch (err: any) {
      setError(err.message || 'Error de autenticación');
      setLoading(false);
    }
  };

  const handleQuickLogin = async () => {
    setError('');
    setLoading(true);
    try {
      const { error: signInError } = await signIn('Admin@ebna.com', '@sindyluxury2026');
      if (signInError) {
        setError(signInError.message || 'Error de autenticación');
      } else {
        navigate('/admin/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Error de autenticación');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
      <div className="auth-card glass-panel" style={{ maxWidth: '440px', width: '100%', background: 'white', padding: '2.5rem', borderRadius: '24px', border: '1px solid var(--color-glass-border)', boxShadow: '0 8px 30px rgba(0,0,0,0.05)' }}>
        <div className="auth-header" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'rgba(224, 90, 136, 0.12)', color: 'var(--color-primary-dark)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.8rem' }}>
            <Shield size={32} />
          </div>
          <h2 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-serif)', color: 'var(--color-primary-dark)', margin: 0 }}>
            Panel Administrador EBNA
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', margin: '0.3rem 0 0 0' }}>
            Acceso único reservado para administración
          </p>
        </div>

        {/* 1-Tap Quick Mobile Admin Login */}
        <button
          type="button"
          onClick={handleQuickLogin}
          disabled={loading}
          style={{
            width: '100%',
            background: 'linear-gradient(135deg, #10B981, #059669)',
            color: 'white',
            border: 'none',
            borderRadius: '14px',
            padding: '0.9rem',
            fontWeight: 800,
            fontSize: '0.9rem',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(16,185,129,0.3)',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}
        >
          <KeyRound size={18} /> ⚡ ENTRAR DIRECTO COMO ADMIN
        </button>

        {error && (
          <div style={{
            background: 'rgba(220, 38, 38, 0.1)',
            border: '1px solid rgba(220, 38, 38, 0.3)',
            borderRadius: '10px',
            padding: '0.75rem 1rem',
            color: '#dc2626',
            fontSize: '0.85rem',
            marginBottom: '1.2rem',
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form" style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <div className="form-group">
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-main)', marginBottom: '0.4rem' }}>
              Correo de Administrador
            </label>
            <input
              type="email"
              className="glass-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Admin@ebna.com"
              autoCapitalize="none"
              autoCorrect="off"
              required
              style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid var(--color-glass-border)', fontSize: '0.9rem' }}
            />
          </div>

          <div className="form-group">
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-main)', marginBottom: '0.4rem' }}>
              Contraseña
            </label>
            <input
              type="password"
              className="glass-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="@sindyluxury2026"
              autoCapitalize="none"
              autoCorrect="off"
              required
              style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid var(--color-glass-border)', fontSize: '0.9rem' }}
            />
          </div>

          <button 
            type="submit" 
            className="btn-primary" 
            style={{ width: '100%', padding: '0.85rem', borderRadius: '999px', border: 'none', background: 'linear-gradient(135deg, #E05A88, #C4436F)', color: 'white', fontWeight: 700, fontSize: '0.95rem', cursor: loading ? 'wait' : 'pointer', boxShadow: '0 4px 15px rgba(224, 90, 136, 0.3)', marginTop: '0.5rem' }} 
            disabled={loading}
          >
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <Loader2 size={18} className="animate-spin" /> Verificando Credenciales...
              </span>
            ) : 'Acceder al Panel Admin'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <Link to="/" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.85rem' }}>
            ← Volver al catálogo principal
          </Link>
        </div>
      </div>
    </div>
  );
}
