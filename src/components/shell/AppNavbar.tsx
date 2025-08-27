'use client';

import { NavLink, Stack } from '@mantine/core';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Dashboard' },
  { href: '/datasets', label: 'Datasets' },
  { href: '/health', label: 'System Health' },
] as const;

export const AppNavbar = () => {
  const pathname = usePathname();
  return (
    <Stack p="sm" gap="xs">
      {links.map((link) => (
        <NavLink
          key={link.href}
          component={Link}
          href={link.href}
          label={link.label}
          active={pathname === link.href}
          variant="light"
        />
      ))}
    </Stack>
  );
};
