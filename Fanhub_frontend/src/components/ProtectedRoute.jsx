import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function ProtectedRoute({ children, requiredRole }) {
  const { isAuthenticated, user } = useAuth();
  const role = user?.role;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && role?.toUpperCase() !== requiredRole.toUpperCase()) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}