import { useNavigate } from 'react-router-dom';
import { useAuthStore } from 'store/store';
import { Button } from '@mantine/core';
import DashboardLayout from '@/layouts/DashboardLayout';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    useAuthStore.getState().setToken('');
    navigate('/');
  };
  return (
    <DashboardLayout>
      <Button onClick={handleLogout}>Logout</Button>
    </DashboardLayout>
  );
};

export default Dashboard;
