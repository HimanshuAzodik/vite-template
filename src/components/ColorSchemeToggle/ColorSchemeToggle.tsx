import { Button, Group } from '@mantine/core';
import { useTheme } from '@/components/theme-provider';

export function ColorSchemeToggle() {
  const { setTheme } = useTheme();

  return (
    <Group justify="center" mt="xl">
      <Button onClick={() => setTheme('light')}>Light</Button>
      <Button onClick={() => setTheme('dark')}>Dark</Button>
    </Group>
  );
}
