'use client';

import { useTheme } from '@/providers/MantineThemeProvider';
import {
  ActionIcon, Tooltip,
} from '@mantine/core';
import {
  Moon, Sun,
} from 'lucide-react';

export const ThemeToggle = () => {
  const { colorScheme, toggle } = useTheme();
  const dark = colorScheme === 'dark';

  return (
    <Tooltip label={dark ? 'Switch to light mode' : 'Switch to dark mode'}>
      <ActionIcon
        aria-label="Toggle color scheme"
        onClick={toggle}
        variant="default"
        radius="xl"
        size="lg"
      >
        {dark ? <Sun size={16} /> : <Moon size={16} />}
      </ActionIcon>
    </Tooltip>
  );
};
