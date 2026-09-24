import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function ProtectedRoute({ children, requiredRole }) {
  const { isAuthenticated, login, logout } = useAuth();
  // Get user role from localStorage
  const user = JSON.parse(localStorage.getItem('fanhub_auth') || '{}');
  const role = user.role;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}