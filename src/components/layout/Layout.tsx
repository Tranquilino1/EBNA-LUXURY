import React from 'react';
import { Outlet } from 'react-router';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { PWAInstallBanner } from '../ui/PWAInstallBanner';
import { CartDrawer } from '../cart/CartDrawer';
import { ParticleBackground } from '../effects/ParticleBackground';
import { AdminCrudProvider } from '../../contexts/AdminCrudContext';
import { GlobalSearchProvider } from '../../contexts/GlobalSearchContext';
import { GlobalSearchModal } from '../search/GlobalSearchModal';
import { AdminFloatingDock } from '../admin/AdminFloatingDock';
import { ChristmasSnowOverlay } from '../effects/ChristmasSnowOverlay';
import { ChristmasMagicOverlay } from '../effects/ChristmasMagicOverlay';
import { ScrollToTopButton } from '../ui/ScrollToTopButton';
import { SmartInputCentering } from '../ui/SmartInputCentering';
import { useCustomization } from '../../contexts/CustomizationContext';
import './layout.css';

export const Layout: React.FC = () => {
  const { isChristmasActive, settings } = useCustomization();

  return (
    <GlobalSearchProvider>
      <AdminCrudProvider>
        <div className="luxury-canvas min-h-screen">
          <SmartInputCentering />
          <ParticleBackground />
          {isChristmasActive && settings.christmasSnow && <ChristmasSnowOverlay />}
          {isChristmasActive && <ChristmasMagicOverlay />}
          <Navbar />
          <main className="main-content">
            <Outlet />
          </main>
          <Footer />
          <GlobalSearchModal />
          <CartDrawer />
          <PWAInstallBanner />
          <AdminFloatingDock />
          <ScrollToTopButton />
        </div>
      </AdminCrudProvider>
    </GlobalSearchProvider>
  );
};

