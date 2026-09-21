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

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <input 
              type="text" 
              name="full_name" 
              placeholder="Nombre Completo"
              value={formData.full_name} 
              onChange={handleChange} 
              required 
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
          
          <div>
            <input 
              type="tel" 
              name="phone" 
              placeholder="Teléfono (WhatsApp)"
              value={formData.phone} 
              onChange={handleChange} 
              required 
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

          <div>
            <input 
              type="email" 
              name="email" 
              placeholder="Correo Electrónico"
              value={formData.email} 
              onChange={handleChange} 
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
          
          <div style={{ position: 'relative' }}>
            <input 
              type={showPassword ? "text" : "password"} 
              name="password" 
              placeholder="Contraseña"
              value={formData.password} 
              onChange={handleChange} 
              required 
              minLength={6} 
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

          <div style={{ position: 'relative' }}>
            <input 
              type={showConfirmPassword ? "text" : "password"} 
              name="confirm_password" 
              placeholder="Confirmar Contraseña"
              value={formData.confirm_password} 
              onChange={handleChange} 
              required 
              minLength={6} 
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
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
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
            alignItems: 'center',
            marginTop: '8px'
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
