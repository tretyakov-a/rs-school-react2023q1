/** @type {import('ts-jest').JestConfigWithTsJest} */

import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/__mocks__/**',
    '!<rootDir>/src/vite-env.d.ts',
    '!<rootDir>/src/index.tsx',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(scss)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/__mocks__/file-mock.js',
    '^@assets/(.*)$': '<rootDir>/src/assets/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@common/(.*)$': '<rootDir>/src/common/$1',
    '^@styles/(.*)$': '<rootDir>/src/styles/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
};

export default config;
