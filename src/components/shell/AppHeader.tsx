'use client';

import { ThemeToggle } from '@/components/theme/ThemeToggle';
import {
  Group, Text,
} from '@mantine/core';

export const AppHeader = () => {
  return (
    <Group px="md" h={56} justify="space-between" style={{ zIndex: 10}}>
      <Text fw={600} size="sm">
        Gun Violence Data
      </Text>
      <ThemeToggle />
    </Group>
  );
};
