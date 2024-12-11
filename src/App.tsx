import '@mantine/core/styles.css';

import { useEffect } from 'react';
import { useAuthStore } from 'store/store';
import { MantineProvider } from '@mantine/core';
import { ThemeProvider, useTheme } from '@/components/theme-provider';
import { Router } from './Router';
import { theme } from './theme';

export default function App() {
  const setToken = useAuthStore((state) => state.setToken);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setToken(token);
    }
  }, [setToken]);

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
        colors: {
          dark: [
            'var(--shadcn-dark-background-color)',
            'var(--shadcn-dark-background-color)',
            'var(--shadcn-dark-background-color)',
            'var(--shadcn-dark-background-color)',
            'var(--shadcn-dark-background-color)',
            'var(--shadcn-dark-background-color)',
            'var(--shadcn-dark-background-color)',
            'var(--shadcn-dark-background-color)',
            'var(--shadcn-dark-background-color)',
            'var(--shadcn-dark-background-color)',
          ],
        },
      }}
      defaultColorScheme={currentTheme}
    >
      {children}
    </MantineProvider>
  );
}
