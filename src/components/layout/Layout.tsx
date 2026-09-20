import React from 'react';
import { Outlet } from 'react-router';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { PWAInstallBanner } from '../ui/PWAInstallBanner';
import './layout.css';

export const Layout: React.FC = () => {
  return (
    <div className="luxury-canvas min-h-screen">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
      <PWAInstallBanner />
    </div>
  );
};
