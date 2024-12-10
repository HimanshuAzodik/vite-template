import React, { ReactNode } from 'react';
import { AppSidebar } from '@/components/dashboard/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="dashboard-layout">
      <SidebarProvider>
        <AppSidebar />
        <main>
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;
