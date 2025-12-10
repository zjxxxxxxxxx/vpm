import { parseArgs } from 'node:util';
import { resolve } from 'node:path';
import { existsSync, rmSync } from 'node:fs';
import { zipSync } from 'cross-zip';
import { consola } from 'consola';
import pkg from '../package.json';

const { values } = parseArgs({
  args: process.argv.slice(2),
  options: {
    browser: {
      type: 'string',
      short: 'b',
      default: 'chrome',
    },
  },
});

const browser = values.browser as 'chrome' | 'firefox';
const sourceName = `${pkg.name}-${pkg.version}-${browser}`;
const sourceDir = resolve('.output', sourceName);
const finalZipPath = resolve('.output', `${sourceName}.zip`);

if (!existsSync(sourceDir)) {
  consola.error(`${browser} extension source directory does not exist: ${sourceDir}`);
  process.exit(1);
}

if (existsSync(finalZipPath)) {
  rmSync(finalZipPath);
}

try {
  zipSync(sourceDir, finalZipPath);
} catch (err) {
  consola.error(`${browser} extension zip packaging failed:\n`, err);
  process.exit(1);
}

consola.success(`${browser} extension zip generated at: ${finalZipPath}`);
