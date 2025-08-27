'use client'

import { ActionIcon, Tooltip } from '@mantine/core';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/providers/MantineThemeProvider';

export const ThemeToggle = () => {
  const { colorScheme, toggle } = useTheme();
  const dark = colorScheme === 'dark';

  return (
    <Tooltip label={dark ? 'Switch to light mode' : 'Switch to dark mode'} >
      <ActionIcon
        aria-label='Toggle color scheme'
        onClick={toggle}
        variant='defualt'
        radius='xl'
        size='lg'
      >
        {dark ? <Sun size={16} /> : <Moon size={16} />}
      </ActionIcon>
    </Tooltip>
  )
}