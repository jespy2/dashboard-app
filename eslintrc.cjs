/* eslint-env node */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
    project: ['./tsconfig.json'],
  },
  settings: {
    react: { version: 'detect' },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: ['./tsconfig.json'],
      },
      node: { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    },
  },
  env: {
    browser: true,
    es2023: true,
    node: true,
  },
  extends: [
    'eslint:recommended',

    // TypeScript
    'plugin:@typescript-eslint/recommended',

    // React / a11y / hooks
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',

    // Import hygiene
    'plugin:import/recommended',
    'plugin:import/typescript',

    // Promise, security, complexity checks
    'plugin:promise/recommended',
    'plugin:security/recommended',
    'plugin:sonarjs/recommended',

    // Next.js (includes Core Web Vitals, React optimizations)
    'next/core-web-vitals',

    // Prettier last to disable conflicting stylistic rules
    'plugin:prettier/recommended',
  ],
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks',
    'jsx-a11y',
    'import',
    'unused-imports',
    'promise',
    'security',
    'sonarjs',
  ],
  rules: {
    // 2-space indentation & spacing: handled by Prettier
    'eol-last': ['error', 'always'],

    // Unused vars/imports
    '@typescript-eslint/no-unused-vars': 'off', // replaced by plugin below
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      { args: 'after-used', argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],

    // Strict type checking
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unsafe-assignment': 'off', // enable if you want stricter
    '@typescript-eslint/consistent-type-imports': [
      'error',
      { prefer: 'type-imports' },
    ],
    '@typescript-eslint/no-unnecessary-type-assertion': 'error',
    '@typescript-eslint/no-misused-promises': 'error',
    '@typescript-eslint/strict-boolean-expressions': [
      'warn',
      {
        allowNullableBoolean: true,
        allowNullableString: false,
        allowAny: false,
      },
    ],
    '@typescript-eslint/no-floating-promises': 'error',

    // React rules
    'react/no-danger': 'error',
    'react/jsx-props-no-spreading': [
      'warn',
      {
        html: 'enforce',
        custom: 'ignore',
        // Allow common Next/React component patterns
        exceptions: ['Component', 'Page', 'App', 'Svg', 'Icon'],
      },
    ],
    'react/no-array-index-key': 'warn',
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
    'react/react-in-jsx-scope': 'off', // React 17+

    // Imports
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'object',
          'type',
        ],
        pathGroups: [
          { pattern: 'react', group: 'external', position: 'before' },
        ],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
    'import/no-cycle': 'warn',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.test.*',
          '**/*.spec.*',
          '**/vite.config.*',
          '**/jest.config.*',
        ],
      },
    ],

    // Arrow body style
    'arrow-body-style': [
      'error',
      'as-needed',
      { requireReturnForObjectLiteral: false },
    ],

    // Early returns instead of if/else
    'no-else-return': ['error', { allowElseIf: false }],

    //single quotes
    quotes: ['error', 'single', { avoidEscape: true }],

    // No for loops (prefer map/reduce/etc.) or ForOfStatement
    'no-restricted-syntax': [
      'error',
      {
        selector: 'ForStatement',
        message:
          'Prefer array methods (map/filter/reduce/forEach) over for-loops.',
      },
      {
        selector: 'ForInStatement',
        message: 'Prefer Object.entries/keys + array methods.',
      },
      {
        selector: 'ForOfStatement',
        message: 'Prefer array methods when possible.',
      },
    ],

    // No nested ternaries
    'no-nested-ternary': 'error',

    // --- Good-practice extras ---
    'prefer-const': 'error',
    'no-var': 'error',
    'object-shorthand': ['error', 'always'],
    'promise/catch-or-return': 'error',
    'promise/no-nesting': 'warn',

    // Keep console mostly clean; allow warn/error
    'no-console': ['warn', { allow: ['warn', 'error'] }],

    // SonarJS helps nudge early-return patterns by lowering complexity
    'sonarjs/cognitive-complexity': ['warn', 15],
  },
  overrides: [
    {
      files: ['*.js', '*.jsx'],
      rules: {
        // Don’t demand TS-only patterns in JS files
        '@typescript-eslint/consistent-type-imports': 'off',
      },
    },
    {
      files: ['**/*.test.*', '**/*.spec.*'],
      env: { jest: true },
      rules: {
        'no-restricted-syntax': 'off', // allow loops in tests if you like
      },
    },
  ],
  ignorePatterns: [
    'node_modules',
    'dist',
    'build',
    '.next',
    'coverage',
    '*.d.ts',
  ],
};
