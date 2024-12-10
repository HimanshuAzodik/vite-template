import { useNavigate } from 'react-router-dom';
import { useAuthStore } from 'store/store';
import { Button } from '@mantine/core';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    useAuthStore.getState().setToken('');
    navigate('/');
  };
  return (
    <div>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default Dashboard;
