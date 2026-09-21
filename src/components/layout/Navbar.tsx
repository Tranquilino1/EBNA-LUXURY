import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { Menu, X, User, LogOut, Settings, Circle, QrCode, ShoppingBag } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTraffic } from '../../contexts/TrafficContext';
import { useCart } from '../../contexts/CartContext';
import { QRModal } from '../ui/QRModal';
import './layout.css';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  
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
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <img src="/icons/ebna-logo.png" alt="EBNA" className="logo-img" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
          <div className="logo-text-brand">
            <span className="brand-name-uppercase">EBNA</span>
            <span className="brand-sub-syndy">SYNDY LUXURY</span>
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

        {/* Right side: Traffic, Cart, and Auth */}
        <div className="navbar-actions">
          <button
            className="cart-trigger-nav-btn"
            onClick={() => setIsCartOpen(true)}
            title="Ver Carrito de Compras"
            style={{
              position: 'relative',
              background: 'rgba(224, 90, 136, 0.12)',
              border: '1px solid rgba(224, 90, 136, 0.25)',
              borderRadius: '20px',
              padding: '8px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: '#E05A88',
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
                  background: '#E05A88',
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
                  boxShadow: '0 2px 6px rgba(224,90,136,0.4)',
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

          {user ? (
            <div className="profile-menu-container">
              <button 
                className="profile-button"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <User size={20} />
              </button>
              
              {isProfileOpen && (
                <div className="profile-dropdown glass-panel">
                  <div className="profile-header">
                    <span className="profile-name">{profile?.full_name || user.email}</span>
                  </div>
                  <div className="profile-actions">
                    {isAdmin && (
                      <Link to="/admin" className="dropdown-item" onClick={() => setIsProfileOpen(false)}>
                        <Settings size={16} /> Panel Admin
                      </Link>
                    )}
                    <button className="dropdown-item logout" onClick={handleLogout}>
                      <LogOut size={16} /> Cerrar Sesión
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="login-link">
              Iniciar Sesión
            </Link>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu glass-panel">
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
          {!user && (
            <Link 
              to="/login" 
              className="mobile-nav-link"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Iniciar Sesión
            </Link>
          )}
          <Link 
            to="/admin/login" 
            className="mobile-nav-link"
            style={{ color: '#D97706', fontWeight: 700 }}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            👑 Panel Administrador
          </Link>
        </div>
      )}
      {/* QR Modal */}
      <QRModal isOpen={isQRModalOpen} onClose={() => setIsQRModalOpen(false)} />
    </header>
  );
};
