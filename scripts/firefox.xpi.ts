import { resolve } from 'node:path';
import { existsSync, renameSync, rmSync, readdirSync } from 'node:fs';
import webExt from 'web-ext';
import { consola } from 'consola';
import pkg from '../package.json';

const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;

const baseName = `${pkg.name}-${pkg.version}`;
const baseDir = resolve('.output');
const sourceDir = resolve(baseDir, `${baseName}-firefox`);
const artifactsDir = resolve(baseDir, 'web-ext-artifacts');
const finalXpiPath = resolve(baseDir, `${baseName}-firefox.xpi`);

if (!existsSync(sourceDir)) {
  consola.error(`Extension ZIP file does not exist: ${sourceDir}`);
  process.exit(1);
}

if (!API_KEY || !API_SECRET) {
  consola.error('Please set environment variables FF_API_KEY and FF_API_SECRET');
  process.exit(1);
}

if (existsSync(artifactsDir)) {
  rmSync(artifactsDir, { recursive: true, force: true });
}

consola.info(`Signing Firefox extension ${sourceDir} with official AMO API...`);

try {
  await webExt.cmd.sign({
    amoBaseUrl: 'https://addons.mozilla.org/api/v4',
    apiKey: API_KEY,
    apiSecret: API_SECRET,
    sourceDir,
    artifactsDir,
    channel: 'unlisted',
    overwriteDest: true,
  });

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
} catch (err) {
  consola.error('Official signing failed, no .xpi generated.\n', err);
  process.exit(1);
}
