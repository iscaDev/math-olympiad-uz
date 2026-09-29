import { db } from '../server/db';
import { dataDir } from '../server/config';
import { mkdir, cp } from 'node:fs/promises';
import { join, resolve } from 'node:path';
const destination=resolve(process.argv[2]||`./backups/${new Date().toISOString().replace(/[:.]/g,'-')}`);
await mkdir(destination,{recursive:true,mode:0o700});
await db.backup(join(destination,'platform.sqlite'));
try{await cp(join(dataDir,'uploads'),join(destination,'uploads'),{recursive:true});}catch(e){if(!(e && typeof e==='object' && 'code' in e && e.code==='ENOENT'))throw e;}
console.log('Database and uploaded files backed up. Keep this folder private.');db.close();
