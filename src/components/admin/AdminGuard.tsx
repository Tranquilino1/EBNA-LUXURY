import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';
import { Loader } from '../ui/Loader';

export function AdminGuard() {
  const { user, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <Loader message="Verificando permisos de administrador..." fullScreen />
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
