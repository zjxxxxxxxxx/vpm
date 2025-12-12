import { resolve } from 'node:path';
import { parseArgs } from 'node:util';
import { defineConfig } from 'vite';
import { crx } from '@crxjs/vite-plugin';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { cleanDotfiles } from './scripts/clean-dotfiles.ts';
import manifest from './manifest.config.ts';
import pkg from './package.json';

const { values } = parseArgs({
  args: process.argv.slice(4),
  options: {
    browser: {
      type: 'string',
      short: 'b',
      default: 'chrome',
    },
  },
});

const browser = values.browser as 'chrome' | 'firefox';
const bundle = `${pkg.name}-${pkg.version}-${browser}`;

export default defineConfig({
  build: {
    outDir: resolve('.output', bundle),
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      react: 'preact/compat',
      'react-dom': 'preact/compat',
    },
  },
  define: {
    __BROWSER__: JSON.stringify(browser),
  },
  plugins: [
    react({
      babel: {
        plugins: [
          [
            'clsx',
            {
              importSource: '@/utils/clsx',
            },
          ],
          [
            'optimize-clsx',
            {
              libraries: ['@/utils/clsx'],
              removeUnnecessaryCalls: false,
            },
          ],
        ],
      },
    }),
    tailwindcss(),
    crx({
      browser,
      manifest,
    }),
    cleanDotfiles(),
  ],
  server: {
    cors: {
      origin: [/chrome-extension:\/\//],
    },
  },
});
