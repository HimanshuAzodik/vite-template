import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Dashboard from './pages/dashboard/Dashboard';
import Categories from './pages/sidebar-pages/Categories';
import Orders from './pages/sidebar-pages/Orders';
import Products from './pages/sidebar-pages/Products';
import Transactions from './pages/sidebar-pages/Transactions';
import ProtectedRoute from './routes/ProtectedRoute';

const token = localStorage.getItem('token');

const router = createBrowserRouter([
  {
    path: '/login',
    element: token ? <Navigate to="/dashboard" /> : <Login />,
  },
  {
    path: '/signup',
    element: token ? <Navigate to="/dashboard" /> : <Signup />,
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'products',
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: 'orders',
        element: (
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        ),
      },
      {
        path: 'transactions',
        element: (
          <ProtectedRoute>
            <Transactions />
          </ProtectedRoute>
        ),
      },
      {
        path: 'categories',
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
