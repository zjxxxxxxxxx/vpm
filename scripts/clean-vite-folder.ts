import { resolve } from 'node:path';
import { existsSync, rmSync } from 'node:fs';
import type { Plugin } from 'vite';

export function cleanViteFolder(): Plugin {
  let outDir: string;
  return {
    name: 'clean-vite-folder',
    apply: 'build',
    configResolved(config) {
      outDir = config.build.outDir;
    },
    closeBundle() {
      if (!outDir) return;

      const viteDir = resolve(outDir, '.vite');
      if (existsSync(viteDir)) {
        rmSync(viteDir, { recursive: true, force: true });
      }
    },
  };
}
