import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
import { ThemeProvider, useTheme } from '@/components/theme-provider';
import { Router } from './Router';
import { theme } from './theme';
import { useEffect } from 'react';
import { set } from 'react-hook-form';
import { useAuthStore } from 'store/store';

export default function App() {
  const setToken = useAuthStore((state) => state.setToken);

  useEffect(()=>{
    const token = localStorage.getItem('token');
    if(token){
      setToken(token);
    }
  },[setToken]);

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <ThemeSync>
        <Router />
      </ThemeSync>
    </ThemeProvider>
  );
}

function ThemeSync({ children }: { children: React.ReactNode }) {
  const { theme: currentTheme } = useTheme();

  return (
    <MantineProvider
      theme={{
        ...theme,
      }}
      defaultColorScheme={currentTheme}
    >
      {children}
    </MantineProvider>
  );
}
