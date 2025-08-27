import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    plugins: {
      import: require('eslint-plugin-import'),
    },
  },
  {
    rules: {
      quotes: ['error', 'single', { avoidEscape: true }],
      semi: ["error", "always"],
      "comma-dangle": ["error", "always"],
      // Key rule for wrapping import members:
      'object-curly-newline': [
        'error',
        {
          ImportDeclaration: {
            multiline: true,
            minProperties: 2, // force line breaks if >= 2 members
          },
        },
      ],
      // JSX wrapping rules
      "react/jsx-first-prop-new-line": ["error", "multiline"],

      "react/jsx-max-props-per-line": [
        "error",
        {
          maximum: 1, // force one prop per line if wrapped
        },
      ],

      "react/jsx-closing-bracket-location": ["error", "line-aligned"],
    },
  },
];

export default eslintConfig;
