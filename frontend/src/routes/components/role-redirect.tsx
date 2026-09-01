import { Navigate } from 'react-router-dom';

import { useAuth } from 'src/auth/auth-context';

// ----------------------------------------------------------------------

export function RoleRedirect() {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  if (user?.role === 'admin') {
    return <Navigate to="/admin" replace />;
  }

  return <Navigate to="/user" replace />;
}