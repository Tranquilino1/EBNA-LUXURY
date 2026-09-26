import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { 
  Menu, X, User, LogOut, ShieldCheck, QrCode, ShoppingBag, 
  ShoppingCart, Circle, Sun, Moon, Headphones, Search, 
  Sparkles, ChevronRight, Home, Smartphone, CheckCircle2
} from 'lucide-react';
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
import { isStandaloneApp } from '../../lib/deviceDetection';
import { useModalLock } from '../../hooks/useModalLock';
import './layout.css';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isAdminAuthModalOpen, setIsAdminAuthModalOpen] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [inApp, setInApp] = useState(false);
  
  const { user, profile, isAdmin, signOut } = useAuth();
  const { onlineCount } = useTraffic();
  const { setIsCartOpen, totalItemsCount } = useCart();
  const { theme, toggleTheme } = useTheme();
  const { openSearch } = useGlobalSearch();
  const { settings, isChristmasActive } = useCustomization();
  
  const navigate = useNavigate();

  // Background isolation, touch lock, and Escape key listener for Mobile Drawer
  useModalLock(isMobileMenuOpen, () => setIsMobileMenuOpen(false));

  useEffect(() => {
    setInApp(isStandaloneApp());
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await signOut();
    setIsProfileOpen(false);
    setIsMobileMenuOpen(false);
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

  const handleCategoryNav = (cat: string) => {
    setIsMobileMenuOpen(false);
    navigate(`/catalogo?cat=${cat}`);
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
          <span>¡Colección Especial Fiestas Navideñas EBNA! Pedidos directos por WhatsApp</span>
          <span style={{ background: 'rgba(254, 243, 199, 0.2)', padding: '2px 8px', borderRadius: '999px', fontSize: '0.7rem', border: '1px solid rgba(254, 243, 199, 0.35)' }}>
            1 Dic - 6 Ene
          </span>
          <span>✨</span>
        </div>
      )}

      <nav className="navbar glass-panel">
        {/* Left: Mobile Menu Toggle Button */}
        <button 
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Abrir menú de navegación"
          title="Menú de Navegación"
        >
          <Menu size={22} strokeWidth={2.2} />
        </button>

        {/* Center / Brand: Logo + Typography */}
        <Link to="/" className="navbar-logo">
          {isChristmasActive && settings.christmasHats && (
            <InteractiveSantaHat 
              size={30} 
              style={{ 
                position: 'absolute', 
                top: '-14px', 
                left: '-8px', 
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
            <span className="brand-sub-syndy desktop-only">BY EBNA</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
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

        {/* Right Actions: Clean, Uncluttered 2-Action Mobile Layout vs Full Desktop Actions */}
        <div className="navbar-actions">
          {/* Mobile Action 1: Search Button */}
          <button
            type="button"
            className="mobile-header-action-btn mobile-only"
            onClick={() => openSearch()}
            title="Buscar productos"
            aria-label="Buscar productos"
          >
            <Search size={18} strokeWidth={2.3} />
          </button>

          {/* Mobile Action 2: Shopping Bag Button */}
          <button
            type="button"
            className="mobile-header-action-btn mobile-cart-btn mobile-only"
            onClick={() => setIsCartOpen(true)}
            title="Ver Cesta de Compras"
            aria-label="Ver Cesta de Compras"
          >
            <ShoppingBag size={18} strokeWidth={2.3} />
            {totalItemsCount > 0 && (
              <span className="cart-badge-counter">
                {totalItemsCount}
              </span>
            )}
          </button>

          {/* Desktop-Only Actions */}
          <button
            type="button"
            className="theme-toggle-btn desktop-only"
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Cambiar a Modo Día (Ivory Silk)' : 'Cambiar a Modo Noche (Deep Obsidian)'}
            aria-label="Cambiar tema de color"
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          <button
            className="cart-trigger-nav-btn desktop-only"
            onClick={() => setIsCartOpen(true)}
            title="Ver Carrito de Compras"
          >
            <ShoppingBag size={18} />
            <span>Carrito</span>
            {totalItemsCount > 0 && (
              <span className="cart-badge-counter">
                {totalItemsCount}
              </span>
            )}
          </button>

          {!inApp && (
            <button 
              className="qr-trigger-btn desktop-only"
              onClick={() => setIsQRModalOpen(true)}
              title="Descargar App Android (.APK) / Ver QR"
            >
              <QrCode size={18} />
              <span>App APK</span>
            </button>
          )}

          <div className="traffic-counter desktop-only">
            <Circle className="pulse-dot" size={10} fill="#10B981" color="#10B981" />
            <span>{onlineCount} en línea</span>
          </div>

          {/* User Icon Menu (Desktop) */}
          <div 
            className="profile-menu-container desktop-only"
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

      {/* =========================================================================
          NATIVE-GRADE SLIDE-OVER MOBILE DRAWER (iOS 18 / LUXURY STANDARD)
          ========================================================================= */}
      {isMobileMenuOpen && (
        <div className="mobile-drawer-root">
          {/* Dimmed Backdrop */}
          <div 
            className="mobile-drawer-backdrop"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Cerrar menú"
          />

          {/* Slide-in Drawer Container */}
          <aside className="mobile-drawer-panel glass-panel" aria-label="Menú de Navegación Móvil">
            {/* Drawer Header */}
            <div className="mobile-drawer-header">
              <div className="mobile-drawer-brand">
                <img 
                  src={theme === 'dark' ? '/icons/ebna-logo-dark.png' : '/icons/ebna-logo-white.png'} 
                  alt="EBNA" 
                  className="mobile-drawer-logo"
                  onError={(e) => {
                    const img = e.currentTarget as HTMLImageElement;
                    img.src = '/icons/ebna-logo-white.png';
                  }}
                />
                <div>
                  <div className="mobile-drawer-title">SINDY LUXURY</div>
                  <div className="mobile-drawer-subtitle">HAUTE COUTURE • MALABO</div>
                </div>
              </div>
              <button 
                type="button" 
                className="luxury-close-circle-btn"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Cerrar menú (ESC)"
                title="Cerrar menú (ESC)"
              >
                <X size={20} />
              </button>
            </div>

            {/* Spotlight Search Shortcut */}
            <div className="mobile-drawer-search-wrap">
              <button 
                type="button" 
                className="mobile-drawer-search-btn"
                onClick={() => { setIsMobileMenuOpen(false); openSearch(); }}
              >
                <Search size={16} color="var(--brand-accent)" />
                <span>Buscar vestidos, calzado, perfumes...</span>
              </button>
            </div>

            {/* Scrollable Navigation Body */}
            <div className="mobile-drawer-body">
              {/* Group 1: Main Navigation */}
              <div className="mobile-drawer-group">
                <div className="mobile-group-title">Navegación Principal</div>
                
                <Link 
                  to="/" 
                  className="mobile-drawer-item"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="mobile-item-left">
                    <div className="mobile-item-icon-box">
                      <Home size={18} />
                    </div>
                    <span>Inicio Boutique</span>
                  </div>
                  <ChevronRight size={16} className="mobile-item-chevron" />
                </Link>

                <Link 
                  to="/catalogo" 
                  className="mobile-drawer-item"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="mobile-item-left">
                    <div className="mobile-item-icon-box highlight">
                      <Sparkles size={18} />
                    </div>
                    <div>
                      <span style={{ display: 'block', fontWeight: 700 }}>Catálogo Completo</span>
                      <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-secondary)' }}>188 Prendas de Lujo en Stock</span>
                    </div>
                  </div>
                  <ChevronRight size={16} className="mobile-item-chevron" />
                </Link>
              </div>

              {/* Group 2: Quick Categories */}
              <div className="mobile-drawer-group">
                <div className="mobile-group-title">Colecciones Exclusivas</div>
                
                <button 
                  type="button"
                  className="mobile-drawer-item"
                  onClick={() => handleCategoryNav('VESTIDOS_GALA')}
                >
                  <div className="mobile-item-left">
                    <span className="category-bullet">👗</span>
                    <span>Vestidos de Gala</span>
                  </div>
                  <ChevronRight size={16} className="mobile-item-chevron" />
                </button>

                <button 
                  type="button"
                  className="mobile-drawer-item"
                  onClick={() => handleCategoryNav('COSMETICA_FACIAL')}
                >
                  <div className="mobile-item-left">
                    <span className="category-bullet">✨</span>
                    <span>Cosmética Facial Coreana</span>
                  </div>
                  <ChevronRight size={16} className="mobile-item-chevron" />
                </button>

                <button 
                  type="button"
                  className="mobile-drawer-item"
                  onClick={() => handleCategoryNav('CALZADO')}
                >
                  <div className="mobile-item-left">
                    <span className="category-bullet">👠</span>
                    <span>Calzado & Tacones de Fiesta</span>
                  </div>
                  <ChevronRight size={16} className="mobile-item-chevron" />
                </button>

                <button 
                  type="button"
                  className="mobile-drawer-item"
                  onClick={() => handleCategoryNav('BOLSOS_ACCESORIOS')}
                >
                  <div className="mobile-item-left">
                    <span className="category-bullet">👜</span>
                    <span>Bolsos & Carteras de Lujo</span>
                  </div>
                  <ChevronRight size={16} className="mobile-item-chevron" />
                </button>
              </div>

              {/* Group 3: Preferences & Experience */}
              <div className="mobile-drawer-group">
                <div className="mobile-group-title">Ajustes & Experiencia</div>
                
                {/* Theme Switch Row */}
                <div className="mobile-drawer-item" onClick={toggleTheme} style={{ cursor: 'pointer' }}>
                  <div className="mobile-item-left">
                    <div className="mobile-item-icon-box">
                      {theme === 'dark' ? <Moon size={18} color="#D81B60" /> : <Sun size={18} color="#F59E0B" />}
                    </div>
                    <span>{theme === 'dark' ? 'Modo Noche (Obsidian)' : 'Modo Día (Ivory Silk)'}</span>
                  </div>
                  <div className={`ios-switch-pill ${theme === 'dark' ? 'is-active' : ''}`}>
                    <div className="ios-switch-thumb" />
                  </div>
                </div>

                {/* Live Client Count Pill */}
                <div className="mobile-drawer-item live-presence-item">
                  <div className="mobile-item-left">
                    <Circle size={8} fill="#10B981" color="#10B981" className="pulse-dot" />
                    <span>Clientas conectadas en vivo</span>
                  </div>
                  <span className="live-counter-tag">{onlineCount} online</span>
                </div>
              </div>

              {/* Group 4: Concierge & Administration */}
              <div className="mobile-drawer-group">
                <div className="mobile-group-title">Atención & Seguridad</div>

                <button
                  type="button"
                  className="mobile-drawer-item"
                  onClick={() => { setIsMobileMenuOpen(false); setIsSupportModalOpen(true); }}
                >
                  <div className="mobile-item-left">
                    <div className="mobile-item-icon-box aida-box">
                      <Headphones size={18} />
                    </div>
                    <div>
                      <span style={{ display: 'block', fontWeight: 700 }}>Soporte Técnico AiDA</span>
                      <span style={{ display: 'block', fontSize: '0.72rem', color: '#184266' }}>WhatsApp Concierge e Incidencias</span>
                    </div>
                  </div>
                  <ChevronRight size={16} className="mobile-item-chevron" />
                </button>

                <button
                  type="button"
                  className="mobile-drawer-item"
                  onClick={handleAdminAccess}
                >
                  <div className="mobile-item-left">
                    <div className="mobile-item-icon-box admin-box">
                      <ShieldCheck size={18} />
                    </div>
                    <span>Acceso Administrador</span>
                  </div>
                  <ChevronRight size={16} className="mobile-item-chevron" />
                </button>

                {user ? (
                  <button
                    type="button"
                    className="mobile-drawer-item logout-item"
                    onClick={handleLogout}
                  >
                    <div className="mobile-item-left">
                      <div className="mobile-item-icon-box">
                        <LogOut size={18} />
                      </div>
                      <span>Cerrar Sesión</span>
                    </div>
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="mobile-drawer-item"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="mobile-item-left">
                      <div className="mobile-item-icon-box">
                        <User size={18} />
                      </div>
                      <span>Iniciar Sesión Cliente</span>
                    </div>
                    <ChevronRight size={16} className="mobile-item-chevron" />
                  </Link>
                )}
              </div>

              {/* App Status / Download Section */}
              <div className="mobile-drawer-footer-card">
                {inApp ? (
                  <div className="app-installed-badge">
                    <CheckCircle2 size={16} color="#10B981" />
                    <span>App Oficial Android EBNA • v1.0.0 (Instalada)</span>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="app-download-cta-btn"
                    onClick={() => { setIsMobileMenuOpen(false); setIsQRModalOpen(true); }}
                  >
                    <Smartphone size={18} />
                    <span>Descargar App Android (.APK) / Ver QR</span>
                  </button>
                )}
                <div className="mobile-drawer-copyright">
                  © 2026 EBNA SINDY LUXURY. Malabo, Guinea Ecuatorial.
                </div>
              </div>
            </div>
          </aside>
        </div>
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
