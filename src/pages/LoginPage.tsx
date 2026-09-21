import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { Loader } from '../components/ui/Loader';
import { Eye, EyeOff } from 'lucide-react';
import { SEOHead } from '../components/seo/SEOHead';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { error: signInError } = await signIn(email, password);
      if (signInError) {
        setError(signInError.message || 'Error al iniciar sesión');
      } else {
        navigate('/');
      }
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
      <SEOHead 
        title="Iniciar Sesión — EBNA Luxury"
        description="Accede a tu cuenta en EBNA Moda y Cosmética de Lujo en Guinea Ecuatorial."
      />
      <div className="wave-header" style={{
        backgroundColor: '#D81B60',
        padding: '40px 20px 60px',
        borderBottomLeftRadius: '30px',
        borderBottomRightRadius: '30px',
        textAlign: 'center',
        color: 'white',
        marginBottom: '20px'
      }}>
        <div style={{
          width: '70px',
          height: '70px',
          margin: '0 auto 16px',
          borderRadius: '50%',
          overflow: 'hidden',
          backgroundColor: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <img src="/icons/ebna-logo.png" alt="EBNA Logo" className="wave-logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>
        <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 700 }}>Iniciar Sesión</h2>
        <p style={{ margin: '8px 0 0', opacity: 0.9 }}>Accede a tu cuenta EBNA</p>
      </div>

      <div style={{ padding: '0 20px', maxWidth: '400px', margin: '0 auto' }}>
        {error && <div style={{ color: '#ef4444', backgroundColor: '#fee2e2', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '14px' }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <input 
              type="email" 
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              autoCapitalize="none"
              autoCorrect="off"
              style={{
                width: '100%',
                border: '1px solid #E2E8F0',
                borderRadius: '10px',
                padding: '12px 14px',
                fontSize: '16px',
                color: '#1E293B',
                boxSizing: 'border-box'
              }}
            />
          </div>
          
          <div style={{ marginBottom: '16px', position: 'relative' }}>
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              autoCapitalize="none"
              autoCorrect="off"
              style={{
                width: '100%',
                border: '1px solid #E2E8F0',
                borderRadius: '10px',
                padding: '12px 14px',
                fontSize: '16px',
                color: '#1E293B',
                boxSizing: 'border-box',
                paddingRight: '40px'
              }}
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: '#64748B',
                cursor: 'pointer',
                padding: 0,
                display: 'flex'
              }}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div style={{ textAlign: 'right', marginBottom: '24px' }}>
            <button type="button" style={{ 
              background: 'none', 
              border: 'none', 
              color: '#64748B', 
              fontSize: '0.82rem',
              cursor: 'pointer' 
            }}>
              Recuperar contraseña
            </button>
          </div>

          <button type="submit" disabled={loading} style={{
            background: '#D81B60',
            color: 'white',
            borderRadius: '14px',
            width: '100%',
            padding: '14px',
            fontWeight: 700,
            border: 'none',
            fontSize: '16px',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            {loading ? <Loader size="small" /> : 'Iniciar Sesión'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Link to="/registro" style={{ color: '#1E293B', textDecoration: 'none', fontSize: '15px' }}>
            ¿No tienes una cuenta? <span style={{ color: '#D81B60', fontWeight: 600 }}>Crear cuenta</span>
          </Link>
          
          <Link to="/admin/login" style={{ color: '#64748B', textDecoration: 'none', fontSize: '14px', fontWeight: 600 }}>
            👑 ¿Eres Administrador?
          </Link>
        </div>
      </div>
    </div>
  );
}
