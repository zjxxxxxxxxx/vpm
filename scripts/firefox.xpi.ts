import { resolve } from 'node:path';
import { existsSync, renameSync, rmSync, readdirSync } from 'node:fs';
import { consola } from 'consola';
import pkg from '../package.json';
import { run } from './run';

const baseName = `${pkg.name}-${pkg.version}`;
const baseDir = resolve('.output');
const sourceDir = resolve(baseDir, `${baseName}-firefox`);
const artifactsDir = resolve(baseDir, 'web-ext-artifacts');
const finalXpiPath = resolve(baseDir, `${baseName}-firefox.xpi`);

if (!existsSync(sourceDir)) {
  consola.error(`Extension directory does not exist: ${sourceDir}`);
  process.exit(1);
}

if (existsSync(artifactsDir)) {
  rmSync(artifactsDir, { recursive: true, force: true });
}

try {
  consola.info(`Signing Firefox extension ${sourceDir} with web-ext CLI...`);
  run('web-ext', ['sign', ['-s', sourceDir], ['-a', artifactsDir], ['--channel', 'unlisted']]);
} catch (err) {
  consola.error('Official signing failed, no .xpi generated.\n');
  process.exit(1);
}

const files = readdirSync(artifactsDir);
if (files.length === 0) {
  consola.error('Signed .xpi generated successfully, but file not found in artifacts directory.');
  process.exit(1);
}

const signedFileName = files.find((f) => f.endsWith('.xpi'));
if (!signedFileName) {
  consola.error('Could not find a signed .xpi file in the artifacts directory.');
  process.exit(1);
}

const generatedXpiPath = resolve(artifactsDir, signedFileName);
renameSync(generatedXpiPath, finalXpiPath);
rmSync(artifactsDir, { recursive: true, force: true });

consola.success(`Official signed .xpi generated at: ${finalXpiPath}`);
