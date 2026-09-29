import Sqlite from 'better-sqlite3';
import { Pool } from 'pg';
import { readFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';

if(!process.env.DATABASE_URL)throw new Error('DATABASE_URL must point to the target PostgreSQL database.');
if(process.env.MIGRATION_CONFIRM!=='replace-target')throw new Error('Set MIGRATION_CONFIRM=replace-target after verifying the target is the new empty production database.');

const sourceDir=resolve(process.argv[2]||'./data');
const source=new Sqlite(join(sourceDir,'platform.sqlite'),{readonly:true});
const { initializeDatabase, closeDatabase }=await import('../server/db');
const { migrateAuth }=await import('../server/auth');
const { storeFile, removeFile, objectStorageReady }=await import('../server/storage');
if(!objectStorageReady)throw new Error('Production bucket credentials are required for migration.');

await initializeDatabase();
await migrateAuth();

const uploads=source.prepare('SELECT path,mime FROM uploads').all() as {path:string;mime:string}[];
const copied:string[]=[];
try{
  for(const file of uploads){
    await storeFile(file.path,await readFile(join(sourceDir,'uploads',file.path)),file.mime);
    copied.push(file.path);
  }

  const pool=new Pool({connectionString:process.env.DATABASE_URL,max:1});
  const client=await pool.connect();
  const quote=(name:string)=>`"${name.replaceAll('"','""')}"`;
  const copyTable=async(table:string,options:{skip?:string[];transform?:(row:Record<string,unknown>)=>Record<string,unknown>}={})=>{
    const rows=source.prepare(`SELECT * FROM ${quote(table)}`).all() as Record<string,unknown>[];
    for(const original of rows){
      const row=options.transform?options.transform({...original}):{...original};
      for(const key of options.skip||[])delete row[key];
      const columns=Object.keys(row);
      if(!columns.length)continue;
      const values=columns.map(column=>row[column]);
      const placeholders=values.map((_,index)=>`$${index+1}`).join(',');
      await client.query(`INSERT INTO ${quote(table)} (${columns.map(quote).join(',')}) VALUES (${placeholders})`,values);
    }
    return rows.length;
  };

  try{
    await client.query('BEGIN');
    for(const table of ['verification','session','account','notes','attempts','uploads','audit','content','limits','settings','rateLimit','user']){
      await client.query(`DELETE FROM ${quote(table)}`);
    }
    const counts:Record<string,number>={};
    counts.user=await copyTable('user',{transform:row=>({...row,emailVerified:Boolean(row.emailVerified)})});
    counts.account=await copyTable('account');
    counts.content=await copyTable('content');
    counts.notes=await copyTable('notes');
    counts.attempts=await copyTable('attempts');
    counts.uploads=await copyTable('uploads');
    counts.audit=await copyTable('audit',{skip:['id']});
    counts.settings=await copyTable('settings');
    await client.query('COMMIT');
    console.log(`Migration complete: ${counts.user} users, ${counts.content} content items, ${counts.attempts} attempts, and ${counts.uploads} uploads.`);
  }catch(error){
    await client.query('ROLLBACK');
    throw error;
  }finally{
    client.release();
    await pool.end();
  }
}catch(error){
  await Promise.all(copied.map(path=>removeFile(path).catch(()=>undefined)));
  throw error;
}finally{
  source.close();
  await closeDatabase();
}
