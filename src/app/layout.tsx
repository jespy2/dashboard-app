import MantineThemeProvider from '@/providers';
import { ColorSchemeScript } from '@mantine/core';
import '@mantine/core/styles.css';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Regional Equity & Commute Flow',
  description: 'Dashboard for commute, income and equity indicators',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript defaultColorScheme="auto" />
      </head>
      <body>
        <MantineThemeProvider>{children}</MantineThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
