import { resolve, join } from 'node:path';
import { existsSync, readdirSync, statSync, rmSync } from 'node:fs';
import type { Plugin } from 'vite';

export function cleanDotfiles(): Plugin {
  let outDir: string;

  return {
    name: 'clean-dotfiles',
    apply: 'build',
    configResolved(config) {
      outDir = config.build.outDir;
    },
    closeBundle() {
      if (!outDir) return;

      const dirPath = resolve(outDir);
      if (existsSync(dirPath)) {
        removeDotFiles(dirPath);
      }
    },
  };
}

function removeDotFiles(dirPath: string) {
  const entries = readdirSync(dirPath);
  for (const entry of entries) {
    const fullPath = join(dirPath, entry);
    const isDir = statSync(fullPath).isDirectory();

    if (entry.startsWith('.')) {
      rmSync(fullPath, { recursive: isDir, force: true });
    } else if (isDir) {
      removeDotFiles(fullPath);
    }
  }
}
