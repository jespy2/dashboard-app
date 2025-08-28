import React from 'react';
import { renderWithProviders } from '@/test/utils';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useTheme } from './MantineThemeProvider';

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({ push: jest.fn(), replace: jest.fn(), prefetch: jest.fn() }),
}));

function Probe() {
  const { colorScheme, set } = useTheme();
  return (
    <button aria-label="set-dark" onClick={() => set('dark')}>
      {colorScheme}
    </button>
  );
}

describe('MantineThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-mantine-color-scheme');
  });

  test('set() updates scheme and DOM attribute (no act warning)', async () => {
    renderWithProviders(<Probe />);

    const btn = await screen.findByLabelText('set-dark');
    await userEvent.click(btn);

    await waitFor(() => {
      expect(localStorage.getItem('color-scheme')).toBe('dark');
      expect(document.documentElement.getAttribute('data-mantine-color-scheme')).toBe('dark');
    });
  });
});
