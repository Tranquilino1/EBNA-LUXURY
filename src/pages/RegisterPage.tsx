import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { Loader } from '../components/ui/Loader';
import { Sparkles } from 'lucide-react';

export function RegisterPage() {
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    email: '',
    password: '',
    confirm_password: ''
  });
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
    <div className="auth-page">
      <div className="auth-card glass-panel">
        <div className="auth-header">
          <Sparkles className="brand-icon" size={32} />
          <h2>Crear Cuenta</h2>
          <p>Únete a la familia EBNA</p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Nombre Completo</label>
            <input type="text" name="full_name" className="glass-input" value={formData.full_name} onChange={handleChange} required />
          </div>
          
          <div className="form-group">
            <label>Teléfono (WhatsApp)</label>
            <input type="tel" name="phone" className="glass-input" value={formData.phone} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Correo Electrónico</label>
            <input type="email" name="email" className="glass-input" value={formData.email} onChange={handleChange} required />
          </div>
          
          <div className="form-group">
            <label>Contraseña</label>
            <input type="password" name="password" className="glass-input" value={formData.password} onChange={handleChange} required minLength={6} />
          </div>

          <div className="form-group">
            <label>Confirmar Contraseña</label>
            <input type="password" name="confirm_password" className="glass-input" value={formData.confirm_password} onChange={handleChange} required minLength={6} />
          </div>

          <button type="submit" className="btn-primary full-width" disabled={loading}>
            {loading ? <Loader size="small" /> : 'Crear Cuenta'}
          </button>
        </form>

        <div className="auth-footer">
          <p>¿Ya tienes una cuenta? <Link to="/login">Iniciar Sesión</Link></p>
        </div>
      </div>
    </div>
  );
}
