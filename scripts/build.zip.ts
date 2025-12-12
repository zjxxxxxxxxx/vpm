import { parseArgs } from 'node:util';
import { resolve } from 'node:path';
import { existsSync, rmSync, readdirSync, statSync } from 'node:fs';
import archiver from 'archiver';
import { createWriteStream } from 'node:fs';
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
  const output = createWriteStream(finalZipPath);
  const archive = archiver('zip', { zlib: { level: 9 } });

  output.on('close', () => {
    consola.success(
      `${browser} extension zip generated at: ${finalZipPath} (${archive.pointer()} bytes)`,
    );
  });

  archive.on('error', (err) => {
    consola.error(`${browser} extension zip packaging failed:\n`, err);
    process.exit(1);
  });

  archive.pipe(output);

  const items = readdirSync(sourceDir).filter((item) => !item.startsWith('.'));

  items.forEach((item) => {
    const fullPath = resolve(sourceDir, item);
    const stats = statSync(fullPath);

    if (stats.isDirectory()) {
      archive.directory(fullPath, item);
    } else if (stats.isFile()) {
      archive.file(fullPath, { name: item });
    }
  });

  archive.finalize();
} catch (err) {
  consola.error(`${browser} extension zip packaging failed:\n`, err);
  process.exit(1);
}
