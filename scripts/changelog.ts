import { resolve } from 'node:path';
import { readFileSync, writeFileSync } from 'node:fs';
import { generate } from 'changelogithub';
import { consola } from 'consola';
import pkg from '../package.json';
import { run } from './run';

const changelogFile = resolve('CHANGELOG.md');
const fromTag = getLastTag();

try {
  consola.info(`Generating changelog from ${fromTag} -> v${pkg.version}...`);

  const { output } = await generate({
    from: fromTag,
    to: 'HEAD',
    style: 'markdown',
    group: true,
    capitalize: true,
  });

  writeFileSync(changelogFile, `${output}\n\n${readFileSync(changelogFile, 'utf-8')}`, 'utf-8');

  consola.success(`✅ Changelog updated (${fromTag} -> v${pkg.version})`);
} catch (err) {
  consola.error('Failed to generate changelog:\n', err);
  process.exit(1);
}

function getLastTag(): string {
  try {
    return run('git', ['describe', '--tags', '--abbrev=0'], {
      stdio: 'pipe',
    })
      .toString()
      .trim();
  } catch {
    return 'v0.0.0';
  }
}
