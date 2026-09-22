import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { Menu, X, User, LogOut, ShieldCheck, QrCode, ShoppingBag, ShoppingCart, Circle, Sun, Moon } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTraffic } from '../../contexts/TrafficContext';
import { useCart } from '../../contexts/CartContext';
import { useTheme } from '../../contexts/ThemeContext';
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
  const { theme, toggleTheme } = useTheme();
  
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

        {/* Right side: Theme Toggle, Cart, QR, Traffic and User */}
        <div className="navbar-actions">
          {/* Theme Toggle Button */}
          <button
            type="button"
            className="theme-toggle-btn"
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Cambiar a Modo Día (Ivory Silk)' : 'Cambiar a Modo Noche (Deep Obsidian)'}
            aria-label="Cambiar tema de color"
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          <button
            className="cart-trigger-nav-btn"
            onClick={() => setIsCartOpen(true)}
            title="Ver Carrito de Compras"
          >
            <ShoppingBag size={18} />
            <span className="desktop-only">Carrito</span>
            {totalItemsCount > 0 && (
              <span className="cart-badge-counter">
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
            >
              <User size={19} />
            </button>
            
            {isProfileOpen && (
              <div className="profile-dropdown glass-panel">
                <div className="profile-header">
                  <span className="profile-header-title">
                    {user ? (profile?.full_name || user.email) : 'Menú de Accesos'}
                  </span>
                </div>

                <div className="profile-actions">
                  <Link 
                    to="/catalogo" 
                    className="dropdown-item" 
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <ShoppingCart size={16} color="#25D366" /> Cliente / Catálogo
                  </Link>

                  <button 
                    className="dropdown-item admin-link" 
                    onClick={handleAdminAccess}
                  >
                    <ShieldCheck size={16} color="var(--brand-accent)" /> Panel Administrador
                  </button>

                  {user ? (
                    <button className="dropdown-item logout" onClick={handleLogout}>
                      <LogOut size={16} /> Cerrar Sesión
                    </button>
                  ) : (
                    <Link to="/login" className="dropdown-item" onClick={() => setIsProfileOpen(false)}>
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

          <div className="mobile-menu-divider" />

          <button
            onClick={() => { setIsMobileMenuOpen(false); navigate('/catalogo'); }}
            className="mobile-nav-link mobile-client-btn"
          >
            <ShoppingCart size={18} color="#25D366" /> Modo Cliente / Catálogo
          </button>

          <button
            onClick={handleAdminAccess}
            className="mobile-nav-link mobile-admin-btn"
          >
            <ShieldCheck size={18} color="var(--brand-accent)" /> Acceso Panel Administrador
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
