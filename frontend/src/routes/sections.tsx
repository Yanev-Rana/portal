import type { RouteObject } from 'react-router';

import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { RoleRedirect , ProtectedRoute } from 'src/routes/components';

import { AuthLayout } from 'src/layouts/auth';
import { DashboardLayout } from 'src/layouts/dashboard';
import { ResetPasswordView } from 'src/pages/reset-password';
import { ForgotPasswordView } from 'src/pages/forgot-password';

// ----------------------------------------------------------------------

export const DashboardPage = lazy(() => import('src/pages/dashboard'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const SignInPage = lazy(() => import('src/pages/sign-in'));
export const SignUpPage = lazy(() => import('src/pages/sign-up'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const AdminDashboardPage = lazy(() => import('src/pages/admin-dashboard'));
export const AdminUsersPage = lazy(() => import('src/pages/admin-users'));

const renderFallback = () => (
  <Box
    sx={{
      display: 'flex',
      flex: '1 1 auto',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
      }}
    />
  </Box>
);

export const routesSection: RouteObject[] = [
  {
  element: (
    <DashboardLayout>
      <Suspense fallback={renderFallback()}>
        <Outlet />
      </Suspense>
    </DashboardLayout>
  ),
  children: [
  { index: true, element: <RoleRedirect /> },

  {
    path: 'user-dashboard',
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },

  {
    path: 'admin-dashboard',
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },

  {
  path: 'user',
  element: (
    <ProtectedRoute allowedRole="user">
      <UserPage />
    </ProtectedRoute>
  ),
},

{
  path: 'admin',
  element: (
    <ProtectedRoute allowedRole="admin">
      <AdminDashboardPage />
    </ProtectedRoute>
  ),
},

{
  path: 'admin/users',
  element: (
    <ProtectedRoute allowedRole="admin">
      <AdminUsersPage />
    </ProtectedRoute>
  ),
},

  { path: 'products', element: <ProductsPage /> },
  { path: 'blog', element: <BlogPage /> },
],
},
  {
    path: 'sign-in',
    element: (
      <AuthLayout>
        <SignInPage />
      </AuthLayout>
    ),
  },

  {
  path: 'sign-up',
  element: (
    <AuthLayout>
      <SignUpPage />
    </AuthLayout>
  ),
},

  {
  path: 'forgot-password',
  element: <ForgotPasswordView />,
},
{
  path: 'reset-password/:token',
  element: <ResetPasswordView />,
},

  {
    path: '404',
    element: <Page404 />,
  },
  { path: '*', element: <Page404 /> },
];
