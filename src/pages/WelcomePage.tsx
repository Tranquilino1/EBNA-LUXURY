import { Link } from 'react-router';

export function WelcomePage() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(circle at center, #ffffff 0%, #f8fafc 100%)',
      padding: '24px'
    }}>
      <div style={{
        maxWidth: '400px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          border: '3px solid rgba(216,27,96,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          marginBottom: '24px',
          backgroundColor: '#fff'
        }}>
          <img 
            src="/icons/ebna-logo.png" 
            alt="EBNA Logo" 
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </div>
        
        <h1 style={{
          color: '#1E293B',
          fontSize: '24px',
          fontWeight: 800,
          marginBottom: '12px',
          lineHeight: 1.2
        }}>
          Bienvenido a EBNA Luxury
        </h1>
        
        <p style={{
          color: '#64748B',
          fontSize: '16px',
          marginBottom: '40px',
          lineHeight: 1.5
        }}>
          Tu boutique exclusiva de moda, perfumería y cosmética de lujo en Guinea Ecuatorial
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
          <Link to="/registro" style={{
            background: '#D81B60',
            color: 'white',
            borderRadius: '14px',
            width: '100%',
            padding: '14px',
            fontWeight: 700,
            textAlign: 'center',
            textDecoration: 'none',
            fontSize: '16px',
            display: 'block'
          }}>
            Crear cuenta
          </Link>
          
          <Link to="/login" style={{
            background: 'transparent',
            color: '#D81B60',
            border: '2px solid #D81B60',
            borderRadius: '14px',
            width: '100%',
            padding: '14px',
            fontWeight: 700,
            textAlign: 'center',
            textDecoration: 'none',
            fontSize: '16px',
            display: 'block'
          }}>
            Iniciar sesión
          </Link>
        </div>
      </div>
    </div>
  );
}
