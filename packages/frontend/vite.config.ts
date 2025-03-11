import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import react from '@vitejs/plugin-react';
import { copy } from 'vite-plugin-copy';
import path from 'path';
import fs from 'fs';
import { mkdirp } from 'mkdirp';

export default defineConfig((mode) => {
  const aliases = {
    '@': path.resolve(__dirname, 'src'),
    '@shared': path.resolve(__dirname, '../'),
  };

  if (mode === 'production') {
    aliases['@shared'] = path.resolve(__dirname, './src/common');
  }

  if (mode === 'production') {
    const commonDir = path.resolve(__dirname, './src/common');

    if (!fs.existsSync(commonDir)) {
      mkdirp.sync(commonDir);
    }
  }

  return ({
    plugins: [
      react(),
      eslint(),
      copy({
        targets: [
          { src: 'public/locales', dest: 'dist' },
          {
            src: 'src/assets/*',
            dest: 'dist/assets/',
          },
          {
            src: '../api-urls/**/*',
            dest: 'src/common/api-urls',
          },
          {
            src: '../types/**/*',
            dest: 'src/common/types',
          },
          {
            src: '../constants/**/*',
            dest: 'src/common/constants',
          }
        ],
        hook: 'buildEnd'
      }),
    ],
    server: {
      host: true,
    },
    css: {
      postcss: './postcss.config.ts',
    },
    base: './',
    resolve: {
      alias: aliases,
    },
    build: {
      minify: true,
      cssCodeSplit: true,
      sourcemap: true,
    }
  });
});
