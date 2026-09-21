import { Component, type ErrorInfo, type ReactNode } from 'react';
import { RefreshCw, AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('EBNA App Error Boundary caught an error:', error, errorInfo);
  }

  private handleReload = () => {
    try {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(regs => {
          regs.forEach(r => r.unregister());
        });
      }
      if ('caches' in window) {
        caches.keys().then(names => {
          names.forEach(name => caches.delete(name));
        });
      }
    } catch (e) {}
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          textAlign: 'center',
          background: 'linear-gradient(135deg, #FBF8F9 0%, #F5EBF0 100%)',
          color: '#23191E',
          fontFamily: 'Plus Jakarta Sans, sans-serif'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(20px)',
            padding: '2.5rem',
            borderRadius: '24px',
            boxShadow: '0 20px 40px rgba(224, 90, 136, 0.15)',
            border: '1px solid rgba(224, 90, 136, 0.2)',
            maxWidth: '480px',
            width: '100%'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(239, 68, 68, 0.1)',
              color: '#EF4444',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem auto'
            }}>
              <AlertTriangle size={32} />
            </div>

            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.6rem', marginBottom: '0.75rem', color: '#23191E' }}>
              Actualización disponible
            </h2>
            
            <p style={{ fontSize: '0.95rem', color: '#6E5B65', lineHeight: 1.5, marginBottom: '2rem' }}>
              Hemos actualizado la tienda con nuevas mejoras de velocidad y productos. Haz clic abajo para cargar la última versión.
            </p>

            <button
              onClick={this.handleReload}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                width: '100%',
                padding: '14px 24px',
                borderRadius: '30px',
                background: 'linear-gradient(135deg, #E05A88 0%, #B82C5E 100%)',
                color: 'white',
                border: 'none',
                fontWeight: 700,
                fontSize: '1rem',
                cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(224, 90, 136, 0.35)',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
            >
              <RefreshCw size={18} /> Cargar Última Versión
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
