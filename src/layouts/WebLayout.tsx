import React, { ReactNode } from 'react';
import { NavBar } from '@/components/web/header/NavBar';

const WebLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="website-layout">
      <header>
        <NavBar />
      </header>
      <main>{children}</main>
      <footer>{/* Add website footer */}</footer>
    </div>
  );
};
export default WebLayout;
