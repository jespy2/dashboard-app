import React from 'react';
import { renderWithProviders } from '@/test/utils';
import { AppShell } from '@/components/shell/AppShell';
import { screen, within } from '@testing-library/react';

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({ push: jest.fn(), replace: jest.fn(), prefetch: jest.fn() }),
}));

describe('AppShell', () => {
  test('renders header, navbar, and main content', () => {
    renderWithProviders(
      <AppShell>
        <div data-testid="content">Hello</div>
      </AppShell>
    );

    // Header (brand text from AppHeader)
    expect(screen.getByText(/Regional Equity & Commute Flow/i)).toBeInTheDocument();

    // Navbar role (Mantine renders <nav> inside AppNavbar)
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();

    // Main content slot
    expect(screen.getByTestId('content')).toBeInTheDocument();
  });

  test('highlights the current route in navbar (if implemented)', () => {
    renderWithProviders(
      <AppShell>
        <div>Page</div>
      </AppShell>
    );

    // Example assertion if your NavLink sets aria-current="page"
    // Adjust the label to a real link, e.g., "Dashboard"
    const nav = screen.getByRole('navigation');
    const dashboardLink = within(nav).getByRole('link', { name: /dashboard/i });
    expect(dashboardLink).toBeInTheDocument();

    // If your NavLink sets active attribute/aria:
    const aria = dashboardLink.getAttribute('aria-current');
    if (aria !== null) {
      expect(aria).toBe('page');
    }
  });
});
