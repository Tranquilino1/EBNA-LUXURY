import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { Menu, X, User, LogOut, ShieldCheck, QrCode, ShoppingBag, ShoppingCart, Circle, Sun, Moon, Headphones, Search } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTraffic } from '../../contexts/TrafficContext';
import { useCart } from '../../contexts/CartContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useGlobalSearch } from '../../contexts/GlobalSearchContext';
import { QRModal } from '../ui/QRModal';
import { AdminAuthModal } from '../admin/AdminAuthModal';
import { ContactSupportModal } from '../ui/ContactSupportModal';
import { useCustomization } from '../../contexts/CustomizationContext';
import { InteractiveSantaHat } from '../effects/InteractiveSantaHat';
import './layout.css';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isAdminAuthModalOpen, setIsAdminAuthModalOpen] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  
  const { user, profile, isAdmin, signOut } = useAuth();
  const { onlineCount } = useTraffic();
  const { setIsCartOpen, totalItemsCount } = useCart();
  const { theme, toggleTheme } = useTheme();
  const { openSearch } = useGlobalSearch();
  const { settings, isChristmasActive } = useCustomization();
  
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

  return (
    <header className={`navbar-wrapper ${isScrolled ? 'scrolled' : ''}`}>
      {/* 3D Christmas Holiday Promotional Banner */}
      {isChristmasActive && settings.christmasBanner && (
        <div 
          className="christmas-promo-banner"
          style={{
            background: 'linear-gradient(90deg, #991B1B, #DC2626, #B91C1C, #991B1B)',
            backgroundSize: '200% 100%',
            color: '#FEF3C7',
            textAlign: 'center',
            padding: '5px 12px',
            fontSize: '0.78rem',
            fontWeight: 700,
            letterSpacing: '0.03em',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            borderBottom: '1px solid rgba(254, 243, 199, 0.25)',
            boxShadow: '0 2px 10px rgba(153, 27, 27, 0.35)',
            position: 'relative',
            zIndex: 1002,
          }}
        >
          <span>🎄</span>
          <span>¡Colección Especial Fiestas Navideñas EBNA! Pedidos directos y envíos inmediatos por WhatsApp</span>
          <span style={{ background: 'rgba(254, 243, 199, 0.2)', padding: '2px 8px', borderRadius: '999px', fontSize: '0.7rem', border: '1px solid rgba(254, 243, 199, 0.35)' }}>
            1 Dic - 6 Ene
          </span>
          <span>✨</span>
        </div>
      )}

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
        <Link to="/" className="navbar-logo" style={{ position: 'relative' }}>
          {isChristmasActive && settings.christmasHats && (
            <InteractiveSantaHat 
              size={34} 
              style={{ 
                position: 'absolute', 
                top: '-15px', 
                left: '-10px', 
                zIndex: 25
              }} 
            />
          )}
          <img 
            key={theme}
            src={theme === 'dark' ? '/icons/ebna-logo-dark.png' : '/icons/ebna-logo-white.png'} 
            alt="EBNA" 
            className="logo-img" 
            onError={(e) => { 
              const img = e.currentTarget as HTMLImageElement;
              const fallback = theme === 'dark' ? '/icons/ebna-logo-dark.png' : '/icons/ebna-logo-white.png';
              if (img.src !== fallback) {
                img.src = fallback;
              } else {
                img.style.display = 'none';
              }
            }} 
          />
          <div className="logo-text-brand">
            <span className="brand-name-uppercase">SINDY LUXURY</span>
            <span className="brand-sub-syndy">BY EBNA</span>
          </div>
        </Link>

        {/* Desktop Nav: Inicio + Lupa de Búsqueda General + Catálogo */}
        <div className="navbar-links desktop-only">
          <Link to="/" className="nav-link">
            Inicio
          </Link>
          <button
            type="button"
            onClick={() => openSearch()}
            className="navbar-search-glass-btn glass-panel"
            title="Buscador General Rápido (Ctrl+K)"
            aria-label="Abrir buscador rápido"
          >
            <Search size={15} strokeWidth={2.4} />
            <span>Buscar</span>
          </button>
          <Link to="/catalogo" className="nav-link">
            Catálogo
          </Link>
        </div>

        {/* Right side: Search (Mobile), Theme Toggle, Cart, QR, Traffic and User */}
        <div className="navbar-actions">
          {/* Mobile Quick Search Button */}
          <button
            type="button"
            className="theme-toggle-btn mobile-only"
            onClick={() => openSearch()}
            title="Buscar productos"
            aria-label="Buscar productos"
            style={{ color: '#D81B60', border: '1px solid rgba(216, 27, 96, 0.3)' }}
          >
            <Search size={17} />
          </button>

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
          <div 
            className="profile-menu-container"
            onMouseLeave={() => setIsProfileOpen(false)}
          >
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

                  <button
                    className="dropdown-item"
                    onClick={() => { setIsProfileOpen(false); setIsSupportModalOpen(true); }}
                  >
                    <Headphones size={16} color="#184266" /> Soporte & Contacto <span className="aida-highlight-blue" style={{ fontSize: '0.96rem' }}>AiDA</span>
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
      {/* Mobile Menu Backdrop & Drawer */}
      {isMobileMenuOpen && (
        <>
          <div 
            className="mobile-menu-backdrop" 
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Cerrar menú móvil" 
          />
          <div className="mobile-menu glass-panel">
            <Link 
              to="/" 
              className="mobile-nav-link"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Inicio
            </Link>

            <button
              type="button"
              onClick={() => { setIsMobileMenuOpen(false); openSearch(); }}
              className="mobile-nav-link"
              style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(216, 27, 96, 0.08)', border: '1px solid rgba(216, 27, 96, 0.25)', color: '#D81B60', fontWeight: 700, cursor: 'pointer', textAlign: 'left', width: '100%', borderRadius: '12px' }}
            >
              <Search size={18} color="#D81B60" /> Buscar Producto (Catálogo)
            </button>

            <Link 
              to="/catalogo" 
              className="mobile-nav-link"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Catálogo Completo
            </Link>

            {/* App Android (.APK) / Universal PWA */}
            <button
              type="button"
              onClick={() => { setIsMobileMenuOpen(false); setIsQRModalOpen(true); }}
              className="mobile-nav-link"
              style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#059669', background: 'rgba(16, 185, 129, 0.09)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '12px', fontWeight: 700, cursor: 'pointer', textAlign: 'left', width: '100%' }}
            >
              <QrCode size={18} color="#059669" /> Descargar App Android (.APK) / Ver QR
            </button>

            {/* Live Traffic Presence Badge in Mobile Menu */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 14px', background: 'rgba(16, 185, 129, 0.08)', borderRadius: '12px', fontSize: '0.82rem', color: '#047857', fontWeight: 700 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Circle size={8} fill="#10B981" color="#10B981" className="pulse-dot" />
                <span>Clientas Conectadas en Vivo:</span>
              </div>
              <span style={{ background: '#10B981', color: 'white', padding: '2px 8px', borderRadius: '10px', fontSize: '0.74rem', fontWeight: 800 }}>
                {onlineCount} online
              </span>
            </div>

            {/* Theme Toggle shortcut in Mobile Menu */}
            <button
              type="button"
              onClick={() => { toggleTheme(); }}
              className="mobile-nav-link"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'transparent', border: '1px solid var(--border-light)', borderRadius: '12px', cursor: 'pointer', width: '100%' }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {theme === 'dark' ? <Sun size={18} color="#F59E0B" /> : <Moon size={18} color="#D81B60" />}
                <span>Tema: {theme === 'dark' ? 'Modo Día (Ivory Silk)' : 'Modo Noche (Obsidian)'}</span>
              </span>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>Cambiar</span>
            </button>

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

            <button
              onClick={() => { setIsMobileMenuOpen(false); setIsSupportModalOpen(true); }}
              className="mobile-nav-link"
              style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#184266', fontWeight: 800 }}
            >
              <Headphones size={18} color="#184266" /> Soporte Técnico <span className="aida-highlight-blue" style={{ fontSize: '1.05rem' }}>AiDA</span>
            </button>
          </div>
        </>
      )}

      {/* QR Modal */}
      <QRModal isOpen={isQRModalOpen} onClose={() => setIsQRModalOpen(false)} />


      {/* Contact & Support Modal */}
      <ContactSupportModal isOpen={isSupportModalOpen} onClose={() => setIsSupportModalOpen(false)} />

      {/* Admin Auth Modal (Strict Credential Verification) */}
      <AdminAuthModal isOpen={isAdminAuthModalOpen} onClose={() => setIsAdminAuthModalOpen(false)} />
    </header>
  );
};
