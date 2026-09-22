import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { Menu, X, User, LogOut, ShieldCheck, QrCode, ShoppingBag, ShoppingCart, Circle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTraffic } from '../../contexts/TrafficContext';
import { useCart } from '../../contexts/CartContext';
import { QRModal } from '../ui/QRModal';
import { AdminAuthModal } from '../admin/AdminAuthModal';
import './layout.css';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isAdminAuthModalOpen, setIsAdminAuthModalOpen] = useState(false);
  
  const { user, profile, isAdmin, signOut } = useAuth();
  const { onlineCount } = useTraffic();
  const { setIsCartOpen, totalItemsCount } = useCart();
  
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await signOut();
    setIsProfileOpen(false);
    navigate('/');
  };

  const handleAdminAccess = () => {
    setIsProfileOpen(false);
    setIsMobileMenuOpen(false);
    if (user && isAdmin) {
      navigate('/admin');
    } else {
      setIsAdminAuthModalOpen(true);
    }
  };

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Catálogo', path: '/catalogo' },
  ];

  return (
    <header className={`navbar-wrapper ${isScrolled ? 'scrolled' : ''}`}>
      <nav className="navbar glass-panel">
        {/* Mobile Menu Toggle */}
        <button 
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Abrir menú"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <img src="/icons/ebna-logo.png" alt="EBNA" className="logo-img" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
          <div className="logo-text-brand">
            <span className="brand-name-uppercase">SINDY LUXURY</span>
            <span className="brand-sub-syndy">BY EBNA</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="navbar-links desktop-only">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} className="nav-link">
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right side: Traffic, Cart, QR and User Icon */}
        <div className="navbar-actions">
          <button
            className="cart-trigger-nav-btn"
            onClick={() => setIsCartOpen(true)}
            title="Ver Carrito de Compras"
            style={{
              position: 'relative',
              background: 'rgba(216, 27, 96, 0.12)',
              border: '1px solid rgba(216, 27, 96, 0.25)',
              borderRadius: '20px',
              padding: '8px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: '#D81B60',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: '0.85rem',
            }}
          >
            <ShoppingBag size={18} />
            <span className="desktop-only">Carrito</span>
            {totalItemsCount > 0 && (
              <span
                style={{
                  background: '#D81B60',
                  color: 'white',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: '2px',
                  boxShadow: '0 2px 6px rgba(216, 27, 96, 0.4)',
                }}
              >
                {totalItemsCount}
              </span>
            )}
          </button>

          <button 
            className="qr-trigger-btn"
            onClick={() => setIsQRModalOpen(true)}
            title="Ver Código QR de la App"
          >
            <QrCode size={18} />
            <span className="desktop-only">App QR</span>
          </button>

          <div className="traffic-counter">
            <Circle className="pulse-dot" size={10} fill="#10B981" color="#10B981" />
            <span>{onlineCount} en línea</span>
          </div>

          {/* User Icon Menu (Icono de Persona Unificado) */}
          <div className="profile-menu-container">
            <button 
              className="profile-button"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              title="Cuenta & Accesos"
              aria-label="Menú de Usuario"
              style={{
                background: 'rgba(216, 27, 96, 0.12)',
                border: '1.5px solid rgba(216, 27, 96, 0.3)',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#D81B60',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <User size={20} />
            </button>
            
            {isProfileOpen && (
              <div className="profile-dropdown glass-panel" style={{ width: '240px', right: 0, borderRadius: '16px', border: '1px solid rgba(216,27,96,0.25)', boxShadow: '0 10px 30px rgba(0,0,0,0.15)' }}>
                <div className="profile-header" style={{ background: 'rgba(216,27,96,0.06)', padding: '10px 16px', borderRadius: '14px 14px 0 0' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#D81B60', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {user ? (profile?.full_name || user.email) : 'Menú de Accesos'}
                  </span>
                </div>

                <div className="profile-actions" style={{ padding: '6px 0' }}>
                  <Link 
                    to="/catalogo" 
                    className="dropdown-item" 
                    onClick={() => setIsProfileOpen(false)}
                    style={{ fontSize: '0.88rem', fontWeight: 600, color: '#1E293B', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}
                  >
                    <ShoppingCart size={16} color="#25D366" /> Cliente / Usuario Normal
                  </Link>

                  <button 
                    className="dropdown-item" 
                    onClick={handleAdminAccess}
                    style={{ fontSize: '0.88rem', fontWeight: 700, color: '#D81B60', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}
                  >
                    <ShieldCheck size={16} color="#D81B60" /> Panel Administrador
                  </button>

                  {user ? (
                    <button className="dropdown-item logout" onClick={handleLogout} style={{ fontSize: '0.85rem', color: '#EF4444', borderTop: '1px solid rgba(0,0,0,0.06)', marginTop: '4px', paddingTop: '8px' }}>
                      <LogOut size={16} /> Cerrar Sesión
                    </button>
                  ) : (
                    <Link to="/login" className="dropdown-item" onClick={() => setIsProfileOpen(false)} style={{ fontSize: '0.85rem', color: '#64748B', borderTop: '1px solid rgba(0,0,0,0.06)', marginTop: '4px', paddingTop: '8px' }}>
                      <User size={16} /> Iniciar Sesión Cliente
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu glass-panel" style={{ padding: '16px', borderRadius: '20px' }}>
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              className="mobile-nav-link"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          <div style={{ height: '1px', background: 'rgba(216,27,96,0.15)', margin: '8px 0' }} />

          <button
            onClick={() => { setIsMobileMenuOpen(false); navigate('/catalogo'); }}
            className="mobile-nav-link"
            style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'transparent', border: 'none', textAlign: 'left', cursor: 'pointer', width: '100%', fontSize: '1rem', fontWeight: 600, color: '#1E293B' }}
          >
            <ShoppingCart size={18} color="#25D366" /> Modo Cliente / Usuario Normal
          </button>

          <button
            onClick={handleAdminAccess}
            className="mobile-nav-link"
            style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(216,27,96,0.08)', border: '1px solid rgba(216,27,96,0.2)', borderRadius: '12px', textAlign: 'left', cursor: 'pointer', width: '100%', fontSize: '0.95rem', fontWeight: 800, color: '#D81B60', padding: '10px 12px', marginTop: '4px' }}
          >
            <ShieldCheck size={18} color="#D81B60" /> Acceso Panel Administrador
          </button>
        </div>
      )}

      {/* QR Modal */}
      <QRModal isOpen={isQRModalOpen} onClose={() => setIsQRModalOpen(false)} />

      {/* Admin Auth Modal (Strict Credential Verification) */}
      <AdminAuthModal isOpen={isAdminAuthModalOpen} onClose={() => setIsAdminAuthModalOpen(false)} />
    </header>
  );
};
