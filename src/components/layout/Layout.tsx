import React from 'react';
import { Outlet } from 'react-router';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { PWAInstallBanner } from '../ui/PWAInstallBanner';
import { CartDrawer } from '../cart/CartDrawer';
import { ParticleBackground } from '../effects/ParticleBackground';
import { AdminCrudProvider } from '../../contexts/AdminCrudContext';
import { AdminFloatingDock } from '../admin/AdminFloatingDock';
import './layout.css';

export const Layout: React.FC = () => {
  return (
    <AdminCrudProvider>
      <div className="luxury-canvas min-h-screen">
        <ParticleBackground />
        <Navbar />
        <main className="main-content">
          <Outlet />
        </main>
        <Footer />
        <CartDrawer />
        <PWAInstallBanner />
        <AdminFloatingDock />
      </div>
    </AdminCrudProvider>
  );
};
