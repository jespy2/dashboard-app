'use client';

import { palette } from '@/lib/palette';
import { ten } from '@/lib/tuple';
import {
  createTheme,
  MantineProvider,
  type CSSVariablesResolver,
  type MantineColorsTuple,
} from '@mantine/core';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  ColorScheme, ThemeContextType,
} from './provider.types';

type ProvidersProps = { children: ReactNode };

const ThemeContext = createContext<ThemeContextType | null>(null);

/**
 * Hydration-safe theme provider:
 * - Server HTML color scheme is produced by <ColorSchemeScript defaultColorScheme="auto" /> in layout.tsx.
 * - After mount, we read localStorage/system and optionally "force" the scheme.
 * - We DO NOT pass undefined to `forceColorScheme` (avoids TS error with exactOptionalPropertyTypes).
 */
export const MantineThemeProvider = ({ children }: ProvidersProps) => {
  // Start null so we don't control scheme during SSR; SSR uses ColorSchemeScript
  const [colorScheme, setColorScheme] = useState<ColorScheme | null>(null);

  useEffect(() => {
    const stored =
      typeof window !== 'undefined'
        ? (localStorage.getItem('color-scheme') as ColorScheme | null)
        : null;

    const prefersDark =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-color-scheme: dark)').matches;

    setColorScheme(stored ?? (prefersDark ? 'dark' : 'light'));
  }, []);

  // Build theme once (no client-only values inside)
  const brandScale: MantineColorsTuple = ten(palette.accent);

  const cssVars: CSSVariablesResolver = () => ({
    variables: {
      '--mantine-color-body': palette.background,
      '--mantine-color-text': palette.textPrimary,
      '--mantine-color-anchor': palette.accent,
    },
    light: {},
    dark: {},
  });

  const theme = createTheme({
    primaryColor: 'brand',
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
    defaultRadius: 'md',
    colors: { brand: brandScale },
    components: {
      Card: {
        defaultProps: { withBorder: true, radius: 'lg' },
        styles: () => ({
          root: { backgroundColor: palette.cardBg },
        }),
      },
      Anchor: { defaultProps: { c: 'brand.6' } },
      Text: { styles: { root: { color: palette.textPrimary } } },
    },
  });

  // Context helpers
  const set = (c: ColorScheme) => {
    setColorScheme(c);
    if (typeof window !== 'undefined') localStorage.setItem('color-scheme', c);
  };

  const toggle = () =>
    set((colorScheme ?? 'light') === 'dark' ? 'light' : 'dark');

  // Build props so we only include forceColorScheme when defined (fixes TS error)
  const providerProps = {
    defaultColorScheme: 'auto' as const,
    theme,
    cssVariablesResolver: cssVars,
    ...(colorScheme ? ({ forceColorScheme: colorScheme } as const) : {}),
  };

  return (
    <ThemeContext.Provider
      value={{ colorScheme: colorScheme ?? 'light', set, toggle }}
    >
      <MantineProvider {...providerProps}>{children}</MantineProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const themeContext = useContext(ThemeContext);
  if (!themeContext)
    throw new Error('useTheme must be used within the MantineThemeProvider');
  return themeContext;
};
