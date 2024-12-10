import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Dashboard from './pages/dashboard/Dashboard';
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
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
