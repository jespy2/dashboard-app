"use client";

import { MantineProvider, createTheme, type CSSVariablesResolver, type MantineColorsTuple } from "@mantine/core";
import { palette } from "@/lib/palette";
import { ReactNode } from "react";
import { ten } from "@/lib/tuple";

const brandScale: MantineColorsTuple = ten(palette.accent);

const cssVars: CSSVariablesResolver = () => ({
  variables: {
    "--mantine-color-body": palette.background,
    "--mantine-color-text": palette.textPrimary,
    "--mantine-color-anchor": palette.accent,
  },
  light: {},
  dark: {},
});

const theme = createTheme({
  primaryColor: 'brand',
  colors: { brand: brandScale },
  components: {
    Card: {
      defaultProps: { withBorder: true, radius: "lg" },
      styles: () => ({
        root: { backgroundColor: palette.cardBg },
      })
    },
    Anchor: { defaultProps: { c: 'brand.6' } },
    Text: { defaultProps: {c: 'var(--mantine-color-text'}},
  },
});

type ProvidersProps = { children: ReactNode };

const Providers = ({ children }: ProvidersProps) => {
  return (
    <MantineProvider
      defaultColorScheme="auto"
      theme={theme}
      cssVariablesResolver={cssVars}
    >
      {children}
    </MantineProvider>
  )
};

export default Providers;