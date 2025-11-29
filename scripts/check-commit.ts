import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { consola } from 'consola';

const types = ['feat', 'fix', 'perf', 'test', 'chore'];

const msgPath = resolve('.git/COMMIT_EDITMSG');
const msg = readFileSync(msgPath, 'utf-8').trim();

// Allow type + colon + space + 1~100 characters
const commitRE = new RegExp(`^(${types.map((type) => type + ':').join('|')}) .{1,100}$`);

if (!commitRE.test(msg)) {
  consola.error(`
❌ Commit message "${msg}" does not follow the conventional format.
Expected format: <type>: <description>
Where <type> is one of: ${types.join(', ')}, and the description should be 1-100 characters.
  `);
  process.exit(1);
}
