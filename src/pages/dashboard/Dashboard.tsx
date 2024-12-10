import { Button } from "@mantine/core";

const Dashboard = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
  };
  return <div>

    <Button onClick={handleLogout}>Logout</Button>
  </div>;
};

export default Dashboard;
