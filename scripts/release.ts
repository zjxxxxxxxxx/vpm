import { resolve } from 'node:path';
import { readFileSync, writeFileSync } from 'node:fs';
import { generate } from 'changelogithub';
import semver from 'semver';
import enquirer from 'enquirer';
import { consola } from 'consola';
import pkg from '../package.json';
import { run } from './run';

const BASE_BRANCH = 'main';
const TO_REF = 'HEAD';
const PACKAGE_FILE = resolve('package.json');
const CHANGELOG_FILE = resolve('CHANGELOG.md');
const LAST_VERSION = pkg.version;
const LAST_TAG = `v${LAST_VERSION}`;

const currentBranch = run('git', ['branch', '--show-current'], { stdio: 'pipe' }).toString().trim();
consola.info(`Current branch: ${currentBranch}`);
if (currentBranch !== BASE_BRANCH) {
  consola.error(`Please switch back to ${BASE_BRANCH} branch for distribution.`);
  process.exit(1);
}

consola.info(`Select version to release...`);
const { release } = await enquirer.prompt<{ release: string }>({
  type: 'select',
  name: 'release',
  message: 'Please select the version type',
  choices: [...createReleases(), 'custom'],
});

let targetVersion: string;
if (release === 'custom') {
  const { version } = await enquirer.prompt<{ version: string }>({
    type: 'input',
    name: 'version',
    message: 'Enter a custom version',
    initial: LAST_VERSION,
  });
  targetVersion = version;
} else {
  const match = release.match(/\((.+)\)/);
  if (!match) {
    consola.error(`Cannot parse version from selection: ${release}`);
    process.exit(1);
  }
  targetVersion = match[1];
}

if (!semver.valid(targetVersion) || !semver.gt(targetVersion, LAST_VERSION)) {
  consola.error(`Invalid version: ${targetVersion}`);
  process.exit(1);
}

const { yes: confirmRelease } = await enquirer.prompt<{ yes: boolean }>({
  type: 'confirm',
  name: 'yes',
  message: `Confirm release: v${targetVersion}?`,
});
if (!confirmRelease) {
  consola.error(`Cancelled release: v${targetVersion}`);
  process.exit(1);
}

consola.success(`Version bumped to v${targetVersion}`);

pkg.version = targetVersion;
writeFileSync(PACKAGE_FILE, JSON.stringify(pkg, null, 2), 'utf-8');

const releaseBranch = `release-v${targetVersion}`;
consola.info(`Creating release branch: ${releaseBranch}`);
run('git', ['checkout', ['-b', releaseBranch]]);

consola.info(`Generating changelog from ${LAST_TAG} -> v${targetVersion}...`);
const { output: changelog } = await generate({
  from: LAST_TAG,
  to: TO_REF,
  style: 'markdown',
  group: true,
  capitalize: true,
});

const prevContent = readFileSync(CHANGELOG_FILE, 'utf-8');
writeFileSync(CHANGELOG_FILE, `${changelog}\n\n${prevContent}`, 'utf-8');
consola.success(`✅ Changelog updated (${LAST_VERSION} -> v${targetVersion})`);

consola.info(`Staging files: ${CHANGELOG_FILE}, package.json`);
run('git', ['add', [CHANGELOG_FILE, 'package.json']]);

consola.info(`Committing release changes...`);
run('git', ['commit', ['-m', `chore: release v${targetVersion}`]]);

consola.info(`Pushing release branch ${releaseBranch} to origin...`);
run('git', ['push', 'origin', releaseBranch]);
consola.success(`✅ Release branch ${releaseBranch} pushed successfully.`);

function createReleases(): string[] {
  const types: Array<[string, string?]> = [
    ['patch'],
    ['minor'],
    ['major'],
    ['prepatch', 'beta'],
    ['preminor', 'beta'],
    ['premajor', 'beta'],
    ['prerelease', 'beta'],
  ];

  return types.map(([type, preid]) => {
    const next = semver.inc(
      LAST_VERSION,
      type as semver.ReleaseType,
      // @ts-ignore
      preid,
    );
    return `${type} (${next})`;
  });
}
