import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { AuthProvider } from './contexts/AuthContext';
import { TrafficProvider } from './contexts/TrafficContext';
import { CartProvider } from './contexts/CartContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Layout } from './components/layout/Layout';
import { AdminGuard } from './components/admin/AdminGuard';
import { Loader } from './components/ui/Loader';
import { ErrorBoundary } from './components/ui/ErrorBoundary';

// Lazy imports for pages
const HomePage = React.lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const CatalogPage = React.lazy(() => import('./pages/CatalogPage').then(m => ({ default: m.CatalogPage })));
const ProductPage = React.lazy(() => import('./pages/ProductPage').then(m => ({ default: m.ProductPage })));
const LoginPage = React.lazy(() => import('./pages/LoginPage').then(m => ({ default: m.LoginPage })));
const WelcomePage = React.lazy(() => import('./pages/WelcomePage').then(m => ({ default: m.WelcomePage })));
const RegisterPage = React.lazy(() => import('./pages/RegisterPage').then(m => ({ default: m.RegisterPage })));
const AdminLoginPage = React.lazy(() => import('./pages/AdminLoginPage').then(m => ({ default: m.AdminLoginPage })));
const AdminDashboard = React.lazy(() => import('./pages/AdminDashboard').then(m => ({ default: m.AdminDashboard })));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { 
        index: true, 
        element: (
          <Suspense fallback={<div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Loader message="Cargando EBNA Luxury..." /></div>}>
            <HomePage />
          </Suspense>
        ) 
      },
      { 
        path: 'catalogo', 
        element: (
          <Suspense fallback={<div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Loader message="Cargando catálogo..." /></div>}>
            <CatalogPage />
          </Suspense>
        ) 
      },
      { 
        path: 'producto/:slug', 
        element: (
          <Suspense fallback={<div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Loader message="Cargando producto..." /></div>}>
            <ProductPage />
          </Suspense>
        ) 
      },
      { 
        path: 'login', 
        element: (
          <Suspense fallback={<div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Loader /></div>}>
            <LoginPage />
          </Suspense>
        ) 
      },
      { 
        path: 'bienvenida', 
        element: (
          <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Loader /></div>}>
            <WelcomePage />
          </Suspense>
        ) 
      },
      { 
        path: 'registro', 
        element: (
          <Suspense fallback={<div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Loader /></div>}>
            <RegisterPage />
          </Suspense>
        ) 
      },
      { 
        path: 'admin/login', 
        element: (
          <Suspense fallback={<div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Loader /></div>}>
            <AdminLoginPage />
          </Suspense>
        ) 
      },
      {
        path: 'admin',
        element: <AdminGuard />,
        children: [
          { 
            index: true, 
            element: (
              <Suspense fallback={<div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Loader message="Cargando panel de administración..." /></div>}>
                <AdminDashboard />
              </Suspense>
            ) 
          },
          { 
            path: 'dashboard', 
            element: (
              <Suspense fallback={<div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Loader message="Cargando panel..." /></div>}>
                <AdminDashboard />
              </Suspense>
            ) 
          },
        ],
      },
    ],
  },
]);

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <TrafficProvider>
            <CartProvider>
              <RouterProvider router={router} />
            </CartProvider>
          </TrafficProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
