'use client'

import { Group, Text } from '@mantine/core';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

export const AppHeader = () => {
  return (
    <Group px='md' h={56} justify='space-between' >
      <Text fw={600} size='sm' >Regional Equity & Commute Flow</Text>
      <ThemeToggle />
    </Group>
  )
}