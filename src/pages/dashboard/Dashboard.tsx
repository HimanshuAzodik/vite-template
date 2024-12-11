import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from 'store/store';
import { Button } from '@mantine/core';
import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle';
import DashboardLayout from '@/layouts/DashboardLayout';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="w-full flex items-center justify-between  p-4">
        <h1>Layout</h1>
        <div className="flex items-center justify-center">
          <ColorSchemeToggle />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
