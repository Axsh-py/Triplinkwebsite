import { spawn } from 'node:child_process';

const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';

const children = [
  spawn(process.execPath, ['server/index.mjs', '--api-only'], {
    stdio: 'inherit',
    env: {
      ...process.env,
      TRIPLINK_PORT: process.env.TRIPLINK_PORT || '8787',
    },
  }),
  spawn(npmCommand, ['run', 'dev'], {
    stdio: 'inherit',
    env: process.env,
  }),
];

let shuttingDown = false;

function stopAll(exitCode = 0) {
  if (shuttingDown) return;
  shuttingDown = true;

  for (const child of children) {
    if (!child.killed) {
      child.kill();
    }
  }

  process.exit(exitCode);
}

for (const child of children) {
  child.on('exit', (code) => {
    if (!shuttingDown && code) {
      stopAll(code);
    }
  });
}

process.on('SIGINT', () => stopAll(0));
process.on('SIGTERM', () => stopAll(0));
