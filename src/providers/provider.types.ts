export type ColorScheme = 'light' | 'dark';

export type ThemeContextType = {
  colorScheme: ColorScheme;
  set: (c: ColorScheme) => void;
  toggle: () => void;
};
