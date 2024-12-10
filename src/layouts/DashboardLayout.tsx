import React, { ReactNode } from 'react';

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="dashboard-layout">
      <nav>{/* Add dashboard navigation */}</nav>
      <main>{children}</main>
    </div>
  );
};

export default DashboardLayout;
