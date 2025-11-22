import { resolve } from 'node:path';
import { parseArgs } from 'node:util';
import { defineConfig } from 'vite';
import { crx } from '@crxjs/vite-plugin';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import manifest from './manifest.config.js';
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
const fileName = `${pkg.name}-${pkg.version}-${browser}`;

export default defineConfig({
  build: {
    outDir: resolve(`.output/${fileName}`),
  },
  resolve: {
    alias: {
      '@': `${resolve(__dirname, 'src')}`,
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
        ],
      },
    }),
    tailwindcss(),
    crx({
      browser,
      manifest,
    }),
    // zip({
    //   outDir: 'release',
    //   outFileName: `${pkg.name}-${pkg.version}-${browser}.zip`,
    // }),
  ],
  server: {
    cors: {
      origin: [/chrome-extension:\/\//],
    },
  },
});
