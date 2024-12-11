import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuthStore } from 'store/store';
import { Button } from '@mantine/core';
import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle';
import DashboardLayout from '@/layouts/DashboardLayout';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="w-full flex items-center justify-between p-4"></div>
      <Outlet />
    </DashboardLayout>
  );
};

export default Dashboard;
