import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import ProtectedRoute from './routes/ProtectedRoute';




const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />

  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    )
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
