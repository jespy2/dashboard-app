'use client';

import { AppShell as MantineAppShell, ScrollArea } from '@mantine/core';
import { AppHeader } from './AppHeader';
import { AppNavbar } from './AppNavbar';

type AppShellProps = {
  children: React.ReactNode;
};

export const AppShell = ({ children }: AppShellProps) => {
  return (
    <MantineAppShell
      header={{ height: 56 }}
      navbar={{ width: 260, breakpoint: 'md' }}
      padding="md"
    >
      <MantineAppShell.Header>
        <AppHeader />
      </MantineAppShell.Header>

      <MantineAppShell.Navbar p='xs' >
        <ScrollArea style={{ height: '100%'}} >
          <AppNavbar />
        </ScrollArea>
      </MantineAppShell.Navbar>

      <MantineAppShell.Main>{children}</MantineAppShell.Main>
    </MantineAppShell>
  );
};
