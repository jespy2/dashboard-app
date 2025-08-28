// eslint.config.mjs
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import eslintPluginImport from 'eslint-plugin-import'; // <-- ESM import, no `require`
import path from 'node:path';
import tseslint from 'typescript-eslint';

const compat = new FlatCompat({ baseDirectory: process.cwd() });

export default [
  // 1) Replace .eslintignore
  {
    ignores: ['.next/**', 'node_modules/**', 'dist/**', 'coverage/**'],
  },

  // 2) Base JS + TS (type-aware) recommendations
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,

  // 3) Next.js configs (legacy -> flat via compat)
  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  // 4) Plugins and project settings
  {
    plugins: {
      import: eslintPluginImport, // <-- works in flat config
    },
    settings: {
      // keep path alias `@/*` working for eslint-plugin-import
      'import/resolver': {
        typescript: { project: ['./tsconfig.json'] },
      },
    },
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: path.resolve('.'),
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      quotes: ['error', 'single', { avoidEscape: true }],
      semi: ['error', 'always'],
      'comma-dangle': ['error', 'always-multiline'],

      // Force wrapped import members when >=2 named imports
      'object-curly-newline': [
        'error',
        {
          ImportDeclaration: { multiline: true, minProperties: 2 },
        },
      ],

      // From react plugin (already included by Next core-web-vitals via compat)
      'react/jsx-closing-bracket-location': ['error', 'line-aligned'],

      // TS handles undefined symbols in type-aware mode
      'no-undef': 'off',
    },
  },
];
