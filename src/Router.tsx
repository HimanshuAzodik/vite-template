import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';

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
    element: <Dashboard />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
