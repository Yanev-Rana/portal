import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from 'src/auth/auth-context';

// ----------------------------------------------------------------------

type ProtectedRouteProps = {
  children: React.ReactNode;
  allowedRole?: 'user' | 'admin';
};

export function ProtectedRoute({
  children,
  allowedRole,
}: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuth();

  const location = useLocation();

  // User is not logged in
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/sign-in"
        replace
        state={{ from: location }}
      />
    );
  }

  // User is logged in but does not have the required role
  if (allowedRole && user?.role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}