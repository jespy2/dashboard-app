import { renderWithProviders } from '@/test/utils';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeToggle } from './ThemeToggle';

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({ push: jest.fn(), replace: jest.fn(), prefetch: jest.fn() }),
}));

test('writes to localStorage only after toggle and syncs DOM attribute', async () => {
  localStorage.clear();
  renderWithProviders(<ThemeToggle />);

  // Before any interaction: no persisted value required
  expect(localStorage.getItem('color-scheme')).toBeNull();

  const button = await screen.findByRole('button', { name: /toggle/i });
  await userEvent.click(button);

  // After click: now persisted and reflected in data attribute
  await waitFor(() => {
    const stored = localStorage.getItem('color-scheme');
    const themeOptons = stored === 'light' || stored === 'dark';
    expect(themeOptons).toBe(true);
    expect(
      document.documentElement.getAttribute('data-mantine-color-scheme')
    ).toBe(stored);
  });
});


