import { resolve } from 'node:path';
import { existsSync, rmSync } from 'node:fs';
import { zipSync } from 'cross-zip';
import { consola } from 'consola';
import pkg from '../package.json';

const baseName = `${pkg.name}-${pkg.version}`;
const baseDir = resolve('.output');
const sourceDir = resolve(baseDir, `${baseName}-chrome`);
const finalZipPath = resolve(baseDir, `${baseName}-chrome.zip`);

if (!existsSync(sourceDir)) {
  consola.error(`Chrome extension source directory does not exist: ${sourceDir}`);
  process.exit(1);
}

if (existsSync(finalZipPath)) {
  rmSync(finalZipPath);
}

try {
  zipSync(sourceDir, finalZipPath);
} catch (err) {
  consola.error('Chrome extension ZIP packaging failed:\n', err);
  process.exit(1);
}

consola.success(`Chrome extension ZIP generated at: ${finalZipPath}`);
