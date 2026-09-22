import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { Loader } from '../components/ui/Loader';
import { Eye, EyeOff } from 'lucide-react';

export function RegisterPage() {
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    email: '',
    password: '',
    confirm_password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirm_password) {
      return setError('Las contraseñas no coinciden');
    }

    setLoading(true);
    try {
      const { error: signUpError } = await signUp(
        formData.email,
        formData.password,
        formData.full_name,
        formData.phone
      );
      if (signUpError) {
        setError(signUpError.message || 'Error al crear la cuenta');
      } else {
        navigate('/');
      }
    } catch (err: any) {
      setError(err.message || 'Error al crear la cuenta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
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
        <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 700 }}>Crear Cuenta</h2>
        <p style={{ margin: '8px 0 0', opacity: 0.9 }}>Únete a la familia EBNA</p>
      </div>

      <div style={{ padding: '0 20px', maxWidth: '400px', margin: '0 auto', paddingBottom: '40px' }}>
        {error && <div style={{ color: '#ef4444', backgroundColor: '#fee2e2', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '14px' }}>{error}</div>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
          <div className="form-group">
            <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
              Nombre Completo *
            </label>
            <input 
              type="text" 
              name="full_name" 
              placeholder="Ej: Sindy Tranquilino"
              value={formData.full_name} 
              onChange={handleChange} 
              required 
              style={{
                width: '100%',
                border: '1.5px solid rgba(216, 27, 96, 0.2)',
                borderRadius: '14px',
                padding: '13px 16px',
                fontSize: '0.95rem',
                color: '#1E293B',
                background: '#FFFFFF',
                boxSizing: 'border-box',
                outline: 'none'
              }}
            />
          </div>
          
          <div className="form-group">
            <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
              Teléfono (WhatsApp) *
            </label>
            <input 
              type="tel" 
              name="phone" 
              placeholder="+240 222 ..."
              value={formData.phone} 
              onChange={handleChange} 
              required 
              style={{
                width: '100%',
                border: '1.5px solid rgba(216, 27, 96, 0.2)',
                borderRadius: '14px',
                padding: '13px 16px',
                fontSize: '0.95rem',
                color: '#1E293B',
                background: '#FFFFFF',
                boxSizing: 'border-box',
                outline: 'none'
              }}
            />
          </div>

          <div className="form-group">
            <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
              Correo Electrónico *
            </label>
            <input 
              type="email" 
              name="email" 
              placeholder="tu.correo@ejemplo.com"
              value={formData.email} 
              onChange={handleChange} 
              required 
              autoCapitalize="none"
              autoCorrect="off"
              style={{
                width: '100%',
                border: '1.5px solid rgba(216, 27, 96, 0.2)',
                borderRadius: '14px',
                padding: '13px 16px',
                fontSize: '0.95rem',
                color: '#1E293B',
                background: '#FFFFFF',
                boxSizing: 'border-box',
                outline: 'none'
              }}
            />
          </div>
          
          <div className="form-group" style={{ position: 'relative' }}>
            <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
              Contraseña *
            </label>
            <div style={{ position: 'relative' }}>
              <input 
                type={showPassword ? "text" : "password"} 
                name="password" 
                placeholder="Mínimo 6 caracteres"
                value={formData.password} 
                onChange={handleChange} 
                required 
                minLength={6} 
                autoCapitalize="none"
                autoCorrect="off"
                style={{
                  width: '100%',
                  border: '1.5px solid rgba(216, 27, 96, 0.2)',
                  borderRadius: '14px',
                  padding: '13px 16px',
                  fontSize: '0.95rem',
                  color: '#1E293B',
                  background: '#FFFFFF',
                  boxSizing: 'border-box',
                  paddingRight: '44px',
                  outline: 'none'
                }}
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#94A3B8',
                  cursor: 'pointer',
                  padding: 0,
                  display: 'flex'
                }}
              >
                {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
              </button>
            </div>
          </div>

          <div className="form-group" style={{ position: 'relative' }}>
            <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
              Confirmar Contraseña *
            </label>
            <div style={{ position: 'relative' }}>
              <input 
                type={showConfirmPassword ? "text" : "password"} 
                name="confirm_password" 
                placeholder="Repite tu contraseña"
                value={formData.confirm_password} 
                onChange={handleChange} 
                required 
                minLength={6} 
                autoCapitalize="none"
                autoCorrect="off"
                style={{
                  width: '100%',
                  border: '1.5px solid rgba(216, 27, 96, 0.2)',
                  borderRadius: '14px',
                  padding: '13px 16px',
                  fontSize: '0.95rem',
                  color: '#1E293B',
                  background: '#FFFFFF',
                  boxSizing: 'border-box',
                  paddingRight: '44px',
                  outline: 'none'
                }}
              />
              <button 
                type="button" 
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{
                  position: 'absolute',
                  right: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#94A3B8',
                  cursor: 'pointer',
                  padding: 0,
                  display: 'flex'
                }}
              >
                {showConfirmPassword ? <EyeOff size={19} /> : <Eye size={19} />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading} style={{
            background: 'linear-gradient(135deg, #D81B60 0%, #C2185B 100%)',
            color: 'white',
            borderRadius: '30px',
            width: '100%',
            padding: '14px 24px',
            fontWeight: 800,
            letterSpacing: '0.03em',
            border: 'none',
            fontSize: '0.98rem',
            cursor: loading ? 'wait' : 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 6px 20px rgba(216, 27, 96, 0.35)',
            marginTop: '0.5rem',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
          }}>
            {loading ? <Loader size="small" /> : 'Crear Cuenta'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <Link to="/login" style={{ color: '#1E293B', textDecoration: 'none', fontSize: '15px' }}>
            ¿Ya tienes una cuenta? <span style={{ color: '#D81B60', fontWeight: 600 }}>Iniciar Sesión</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
