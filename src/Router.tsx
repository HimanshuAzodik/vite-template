import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import { HomePage } from './pages/Home.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
