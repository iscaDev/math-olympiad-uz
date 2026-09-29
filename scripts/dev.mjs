import { spawn } from 'node:child_process';
const children = [
  spawn(process.execPath, ['node_modules/tsx/dist/cli.mjs','watch','server/index.ts'], {stdio:'inherit',env:process.env}),
  spawn(process.execPath, ['node_modules/next/dist/bin/next','dev','--webpack','--hostname','127.0.0.1'], {stdio:'inherit',env:{...process.env,WATCHPACK_POLLING:'true'}}),
];
let closing=false;
function stop(){if(closing)return;closing=true;for(const child of children)child.kill('SIGTERM');}
process.on('SIGINT',stop);process.on('SIGTERM',stop);
for(const child of children)child.on('exit',code=>{if(!closing){process.exitCode=code??1;stop();}});
