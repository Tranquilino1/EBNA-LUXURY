import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { Shield, Loader2, Lock } from 'lucide-react';
import { SEOHead } from '../components/seo/SEOHead';

export function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
      const cleanEmail = email.trim().toLowerCase();
      
      // Validate official admin credentials
      if (cleanEmail === 'ebna@luxury.com' && password === 'ebna@luxury2026') {
        const adminProfile = {
          id: 'admin-ebna-1',
          role: 'ADMIN',
          full_name: 'Administrador EBNA Luxury',
          phone: '+240 555 633 687',
          created_at: new Date().toISOString(),
          last_seen: new Date().toISOString(),
        };
        localStorage.setItem('demo_session', 'admin-ebna-1');
        localStorage.setItem('demo_email', 'ebna@luxury.com');
        localStorage.setItem('demo_profile_admin-ebna-1', JSON.stringify(adminProfile));
        window.location.href = '/admin';
        return;
      }

      const { error: signInError } = await signIn(email, password);
      if (signInError) {
        setError(signInError.message || 'Credenciales de administración no válidas');
      } else {
        navigate('/admin/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Error al autenticar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F8F9FA', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <SEOHead 
        title="Acceso Panel de Administración — EBNA Luxury"
        description="Portal de administración de EBNA Moda y Cosmética."
      />
      <div className="glass-panel" style={{ width: '100%', maxWidth: '420px', padding: '40px 30px', borderRadius: '24px', background: 'white', boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}>
        <div className="auth-header" style={{ textAlign: 'center', marginBottom: '1.8rem' }}>
          <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(216, 27, 96, 0.12)', color: '#D81B60', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.8rem', border: '2px solid rgba(216, 27, 96, 0.25)' }}>
            <Shield size={30} />
          </div>
          <h2 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-serif)', color: '#1E293B', margin: 0, fontWeight: 800 }}>
            Panel Administrador EBNA
          </h2>
          <p style={{ color: '#64748B', fontSize: '0.85rem', margin: '0.3rem 0 0 0' }}>
            Acceso exclusivo mediante credenciales autorizadas
          </p>
        </div>

        {error && (
          <div style={{
            background: 'rgba(220, 38, 38, 0.1)',
            border: '1px solid rgba(220, 38, 38, 0.3)',
            borderRadius: '12px',
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
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#1E293B', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Correo de Administrador
            </label>
            <input
              type="email"
              className="glass-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ebna@luxury.com"
              autoCapitalize="none"
              autoCorrect="off"
              required
              style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '14px', border: '1.5px solid rgba(216, 27, 96, 0.25)', fontSize: '0.92rem', color: '#1E293B', background: '#FFFFFF', outline: 'none' }}
            />
          </div>

          <div className="form-group">
            <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 800, color: 'var(--text-secondary)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Contraseña de Seguridad
            </label>
            <input
              type="password"
              className="glass-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              autoCapitalize="none"
              autoCorrect="off"
              required
              style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '14px', border: '1.5px solid rgba(216, 27, 96, 0.25)', fontSize: '0.92rem', color: '#1E293B', background: '#FFFFFF', outline: 'none' }}
            />
          </div>

          <button 
            type="submit" 
            className="btn-primary" 
            style={{ width: '100%', padding: '0.9rem 1.8rem', borderRadius: '30px', border: 'none', background: 'linear-gradient(135deg, #D81B60, #C2185B)', color: 'white', fontWeight: 800, fontSize: '0.95rem', letterSpacing: '0.03em', cursor: loading ? 'wait' : 'pointer', boxShadow: '0 6px 20px rgba(216, 27, 96, 0.35)', marginTop: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }} 
            disabled={loading}
          >
            <Lock size={18} />
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <Loader2 size={18} className="animate-spin" /> Verificando Credenciales...
              </span>
            ) : 'Acceder al Panel Admin'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <Link to="/" style={{ color: '#64748B', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600 }}>
            ← Volver a la página principal
          </Link>
        </div>
      </div>
    </div>
  );
}

