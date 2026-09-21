import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router';
import { ShieldCheck, Lock, Mail, X, KeyRound, AlertCircle, CheckCircle2 } from 'lucide-react';
import { supabase } from '../../config/supabase';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      // 1. Authenticate credentials via Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (error) {
        throw new Error(error.message === 'Invalid login credentials' 
          ? 'Credenciales incorrectas. Verifica tu correo de administrador y contraseña.' 
          : error.message);
      }

      if (!data.user) {
        throw new Error('No se pudo verificar la sesión de usuario.');
      }

      // 2. Fetch role from profiles table
      const { data: profileData, error: profileErr } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single();

      if (profileErr || !profileData || (profileData.role !== 'admin' && profileData.role !== 'superadmin')) {
        // Sign out if not admin
        await supabase.auth.signOut();
        throw new Error('Acceso denegado: Esta cuenta no posee privilegios de Administrador.');
      }

      setSuccessMsg('¡Credenciales de Administrador verificadas correctamente!');

      setTimeout(() => {
        onClose();
        navigate('/admin');
      }, 1000);
    } catch (err: any) {
      setErrorMsg(err.message || 'Error de autenticación');
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(15, 10, 20, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        zIndex: 999999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
      onClick={onClose}
    >
      <div 
        className="glass-panel"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '420px',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(253, 248, 250, 0.95))',
          borderRadius: '28px',
          border: '1.5px solid rgba(216, 27, 96, 0.3)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)',
          padding: '2.2rem 1.8rem',
          color: '#1E293B',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '14px',
            right: '14px',
            background: '#D81B60',
            border: '2px solid #FFFFFF',
            color: '#FFFFFF',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(216, 27, 96, 0.4)',
          }}
          aria-label="Cerrar modal de autenticación"
        >
          <X size={20} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'rgba(216, 27, 96, 0.12)',
            border: '2px solid rgba(216, 27, 96, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 0.8rem auto',
            color: '#D81B60',
          }}>
            <ShieldCheck size={32} />
          </div>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', fontWeight: 800, color: '#1E293B', margin: '0 0 0.3rem 0' }}>
            Acceso Administrador
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#64748B', margin: 0 }}>
            Ingresa tus credenciales autorizadas de EBNA Admin
          </p>
        </div>

        {errorMsg && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#DC2626',
            padding: '0.8rem 1rem',
            borderRadius: '14px',
            fontSize: '0.85rem',
            marginBottom: '1.2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div style={{
            background: 'rgba(34, 197, 94, 0.12)',
            border: '1px solid rgba(34, 197, 94, 0.3)',
            color: '#15803D',
            padding: '0.8rem 1rem',
            borderRadius: '14px',
            fontSize: '0.85rem',
            marginBottom: '1.2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <CheckCircle2 size={18} style={{ flexShrink: 0 }} />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#1E293B', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Correo de Administrador:
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
              <input
                type="email"
                required
                placeholder="admin@ebna-luxury.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem 0.75rem 2.6rem',
                  borderRadius: '12px',
                  border: '1px solid rgba(216, 27, 96, 0.3)',
                  background: '#FFFFFF',
                  fontSize: '0.9rem',
                  color: '#1E293B',
                  outline: 'none',
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#1E293B', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Contraseña de Seguridad:
            </label>
            <div style={{ position: 'relative' }}>
              <KeyRound size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem 0.75rem 2.6rem',
                  borderRadius: '12px',
                  border: '1px solid rgba(216, 27, 96, 0.3)',
                  background: '#FFFFFF',
                  fontSize: '0.9rem',
                  color: '#1E293B',
                  outline: 'none',
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.85rem',
              borderRadius: '14px',
              border: 'none',
              background: loading ? '#CBD5E1' : 'linear-gradient(135deg, #D81B60, #C2185B)',
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: '0.95rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginTop: '0.5rem',
              boxShadow: '0 4px 15px rgba(216, 27, 96, 0.35)',
              transition: 'all 0.2s ease',
            }}
          >
            <Lock size={18} />
            <span>{loading ? 'Verificando Credenciales...' : 'Validar y Entrar como Admin'}</span>
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
};
