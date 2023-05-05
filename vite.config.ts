import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import istanbul from 'vite-plugin-istanbul';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    watch: {
      ignored: ['**/coverage/**'],
    },
  },
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@common': path.resolve(__dirname, './src/common'),
      '@src': path.resolve(__dirname, './src'),
      '@styles': path.resolve(__dirname, './src/styles'),
    },
  },
  build: {
    sourcemap: true,
  },
  plugins: [
    react(),
    istanbul({
      requireEnv: true,
      cypress: true,
    }),
  ],
});
