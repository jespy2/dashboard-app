'use client';

import { createContext, ReactNode, useContext } from 'react';
import {
  createTheme,
  MantineProvider,
  type CSSVariablesResolver,
  type MantineColorsTuple,
} from '@mantine/core';
import { useColorScheme, useLocalStorage } from '@mantine/hooks';
import { ThemeContextType, ColorScheme } from './provider.types';
import { palette } from '@/lib/palette';
import { ten } from '@/lib/tuple';

type ProvidersProps = { children: ReactNode };

const ThemeContext = createContext<ThemeContextType | null>(null);

const MantineThemeProvider = ({ children }: ProvidersProps) => {
  const preferred = useColorScheme();
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'color-scheme',
    defaultValue: preferred ?? 'light',
    getInitialValueInEffect: true,
  });

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
      Text: {
        styles: {
          root: {
            color: palette.textPrimary,
          },
        },
      },
    },
  });

  const colorSchemeSetter = (c: ColorScheme) => setColorScheme(c);
  const colorSchemeToggler = () => setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');

  return (
    <ThemeContext.Provider
      value={{ colorScheme, set: colorSchemeSetter, toggle: colorSchemeToggler }}
    >
      <MantineProvider
        defaultColorScheme={colorScheme}
        theme={theme}
        cssVariablesResolver={cssVars}
      >
        {children}
      </MantineProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) throw new Error('useTheme must be used within the MantineThemeProvider');
  return themeContext;
}
