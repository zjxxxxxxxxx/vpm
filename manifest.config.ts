import { defineManifest } from '@crxjs/vite-plugin';
import pkg from './package.json';

export default defineManifest({
  manifest_version: 3,
  name: pkg.name,
  description: pkg.description,
  version: pkg.version,
  icons: {
    16: 'public/icons/16.png',
    32: 'public/icons/32.png',
    48: 'public/icons/48.png',
    64: 'public/icons/64.png',
    128: 'public/icons/128.png',
    256: 'public/icons/256.png',
  },
  permissions: ['proxy', 'storage', 'management'],
  action: {
    default_popup: 'src/popup/index.html',
  },
  background: {
    scripts: ['src/sw.ts'],
    service_worker: 'src/sw.ts',
  },
  content_scripts: [
    {
      matches: ['<all_urls>'],
      js: ['src/dark.ts'],
    },
  ],
});
