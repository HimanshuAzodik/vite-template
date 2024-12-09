import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
import { ThemeProvider, useTheme } from '@/components/theme-provider';
import { Router } from './Router';
import { theme } from './theme';

export default function App() {
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
