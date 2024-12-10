import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react(), eslint()],
  css: {
    postcss: './postcss.config.ts',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    minify: 'esbuild', // використання esbuild для мінімізації
    cssCodeSplit: true, // розділення CSS на окремі файли
  }
});
