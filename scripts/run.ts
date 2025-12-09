import { execSync, type ExecSyncOptions } from 'node:child_process';

export function run(file: string, args: (string | string[])[] = [], options: ExecSyncOptions = {}) {
  return execSync([file, args].flat(2).join(' '), {
    stdio: 'inherit',
    encoding: 'utf-8',
    ...options,
  });
}
