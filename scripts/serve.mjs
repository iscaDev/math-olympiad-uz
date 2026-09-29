import { spawn } from 'node:child_process';

const children = [
  spawn(process.execPath, ['node_modules/tsx/dist/cli.mjs','server/index.ts'], {stdio:'inherit',env:{...process.env,NODE_ENV:'development'}}),
  spawn(process.execPath, ['node_modules/next/dist/bin/next','start','--hostname','127.0.0.1'], {stdio:'inherit',env:{...process.env,LOCAL_PREVIEW:'1'}}),
];

let closing=false;
function stop(){if(closing)return;closing=true;for(const child of children)child.kill('SIGTERM');}
process.on('SIGINT',stop);process.on('SIGTERM',stop);
let remaining=children.length;
for(const child of children)child.on('exit',code=>{remaining-=1;if(!closing){process.exitCode=code??1;stop();}else if(remaining===0)process.exit(process.exitCode??0);});
