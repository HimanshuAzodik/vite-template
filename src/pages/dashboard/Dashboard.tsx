import { Outlet, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/layouts/DashboardLayout';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
};

export default Dashboard;
