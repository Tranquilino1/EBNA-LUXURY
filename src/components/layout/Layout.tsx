import React from 'react';
import { Outlet } from 'react-router';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { PWAInstallBanner } from '../ui/PWAInstallBanner';
import { CartDrawer } from '../cart/CartDrawer';
import { ParticleBackground } from '../effects/ParticleBackground';
import './layout.css';

export const Layout: React.FC = () => {
  return (
    <div className="luxury-canvas min-h-screen">
      <ParticleBackground />
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <PWAInstallBanner />
    </div>
  );
};
