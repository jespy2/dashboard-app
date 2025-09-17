/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/providers/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: { extend: {
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '16px',
      },
      boxShadow: {
        xs: '0 4px 6px rgba(29, 17, 51, 0.02), 0 2px 8px rgba(9, 32, 77, 0.08), 0 3px 5px -2px rgba(29, 17, 51, 0.08)',
        sm: '0 8px 12px 1px rgba(29, 17, 51, 0.04), 0 3px 16px 2px rgba(9, 32, 77, 0.12), 0 5px 10px -3px rgba(29, 17, 51, 0.12)',
        md: '0 16px 24px 2px rgba(29, 17, 51, 0.04), 0 6px 32px 4px rgba(9, 32, 77, 0.12), 0 8px 12px -5px rgba(29, 17, 51, 0.12)',
        lg: '0 24px 38px 3px rgba(29, 17, 51, 0.04), 0 10px 48px 8px rgba(9, 32, 77, 0.12), 0 12px 16px -6px rgba(29, 17, 51, 0.12)',
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        '2xl': '48px',
      },
      screens: {
        xs: '320px',
        sm: '480px',
        md: '768px',
        lg: '1024px',
        xl: '1312px',
      },
      maxWidth: {
        xs: '304px',
        sm: '432px',
        md: '688px',
        lg: '928px',
        xl: '1152px',
        max: '1440px',
      },
    },
  },
  plugins: [],
};
