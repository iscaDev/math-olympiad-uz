import { dataDir } from '../server/config';
import { sqliteDatabase } from '../server/db';
import { mkdir, cp, copyFile, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';

if(!sqliteDatabase)throw new Error('This command backs up the local SQLite workspace. Production PostgreSQL backups use the Railway backup job.');
const destination=resolve(process.argv[2]||`./backups/${new Date().toISOString().replace(/[:.]/g,'-')}`);
await mkdir(destination,{recursive:true,mode:0o700});
await sqliteDatabase.backup(join(destination,'platform.sqlite'));
let uploadFiles=false;
let authSecret=false;
try{await cp(join(dataDir,'uploads'),join(destination,'uploads'),{recursive:true});uploadFiles=true;}catch(error){if(!(error&&typeof error==='object'&&'code'in error&&error.code==='ENOENT'))throw error;}
try{await copyFile(join(dataDir,'.auth-secret'),join(destination,'.auth-secret'));authSecret=true;}catch(error){if(!(error&&typeof error==='object'&&'code'in error&&error.code==='ENOENT'))throw error;}
await writeFile(join(destination,'backup-manifest.json'),JSON.stringify({created_at:new Date().toISOString(),database:'platform.sqlite',uploads:uploadFiles,auth_secret:authSecret},null,2),{mode:0o600});
console.log('Database, uploaded files, and authentication secret backed up. Keep this folder private.');
sqliteDatabase.close();
