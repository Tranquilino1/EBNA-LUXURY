import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { Loader } from '../components/ui/Loader';
import { Sparkles } from 'lucide-react';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    <div className="auth-page">
      <div className="auth-card glass-panel">
        <div className="auth-header">
          <Sparkles className="brand-icon" size={32} />
          <h2>Iniciar Sesión</h2>
          <p>Bienvenido de nuevo a EBNA</p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Correo Electrónico</label>
            <input 
              type="email" 
              className="glass-input" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          
          <div className="form-group">
            <label>Contraseña</label>
            <input 
              type="password" 
              className="glass-input" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <button type="submit" className="btn-primary full-width" disabled={loading}>
            {loading ? <Loader size="small" /> : 'Iniciar Sesión'}
          </button>
        </form>

        <div className="auth-footer" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
          <p>¿No tienes una cuenta? <Link to="/registro">Crear una cuenta</Link></p>
          <p style={{ fontSize: '0.85rem', marginTop: '0.4rem' }}>
            <Link to="/admin/login" style={{ color: '#D97706', fontWeight: 700 }}>
              👑 ¿Eres Administrador? Accede al Panel Admin aquí →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
