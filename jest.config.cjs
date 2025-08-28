// jest.config.cjs
const nextJest = require('next/jest');

const createJestConfig = nextJest({ dir: './' });

/** @type {import('jest').Config} */
const customJestConfig = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/test/setupTests.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss)$': 'identity-obj-proxy',
  },
  // If some ESM deps still need transforming, add them to the allowlist:
  // transformIgnorePatterns: ['/node_modules/(?!(?:@mantine)/)'],
};

module.exports = createJestConfig(customJestConfig);
