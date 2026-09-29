import Database from 'better-sqlite3';
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { randomBytes } from 'node:crypto';
import { join } from 'node:path';
import { dataDir } from './config';
mkdirSync(dataDir, { recursive: true, mode: 0o700 });
export const db = new Database(join(dataDir, 'platform.sqlite'));
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');
db.pragma('busy_timeout = 5000');
const secretPath = join(dataDir, '.auth-secret');
if (!process.env.BETTER_AUTH_SECRET && !existsSync(secretPath)) writeFileSync(secretPath, randomBytes(48).toString('hex'), { mode: 0o600 });
export const authSecret = process.env.BETTER_AUTH_SECRET || readFileSync(secretPath, 'utf8');
db.exec(`
  CREATE TABLE IF NOT EXISTS content (
    id TEXT PRIMARY KEY, slug TEXT NOT NULL UNIQUE, kind TEXT NOT NULL, title TEXT NOT NULL,
    summary TEXT NOT NULL, topic TEXT NOT NULL, group_key TEXT NOT NULL DEFAULT '', difficulty TEXT NOT NULL, duration INTEGER NOT NULL,
    status TEXT NOT NULL, author_id TEXT, updated_at TEXT NOT NULL, review_note TEXT NOT NULL DEFAULT '', data TEXT NOT NULL
  );
  CREATE INDEX IF NOT EXISTS content_status ON content(status, kind);
  CREATE TABLE IF NOT EXISTS notes (user_id TEXT NOT NULL, content_id TEXT NOT NULL, body TEXT NOT NULL, updated_at TEXT NOT NULL, PRIMARY KEY(user_id, content_id));
  CREATE TABLE IF NOT EXISTS attempts (id TEXT PRIMARY KEY, user_id TEXT NOT NULL, content_id TEXT NOT NULL, title TEXT NOT NULL, questions TEXT NOT NULL, answers TEXT NOT NULL DEFAULT '{}', started_at INTEGER NOT NULL, expires_at INTEGER NOT NULL, submitted_at INTEGER, score INTEGER, total INTEGER, written INTEGER);
  CREATE INDEX IF NOT EXISTS attempts_owner ON attempts(user_id,content_id,submitted_at);
  CREATE TABLE IF NOT EXISTS uploads (path TEXT PRIMARY KEY, owner_id TEXT NOT NULL, mime TEXT NOT NULL, size INTEGER NOT NULL, created_at TEXT NOT NULL);
  CREATE TABLE IF NOT EXISTS audit (id INTEGER PRIMARY KEY, actor_id TEXT NOT NULL, action TEXT NOT NULL, target_id TEXT NOT NULL, created_at TEXT NOT NULL);
  CREATE TABLE IF NOT EXISTS limits (key TEXT PRIMARY KEY, count INTEGER NOT NULL, expires INTEGER NOT NULL);
  CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT NOT NULL);
`);
const contentColumns = new Set((db.prepare('PRAGMA table_info(content)').all() as {name:string}[]).map(c=>c.name));
if (!contentColumns.has('group_key')) db.exec("ALTER TABLE content ADD COLUMN group_key TEXT NOT NULL DEFAULT ''");
db.prepare("UPDATE content SET kind='test' WHERE kind='competition'").run();
for (const [id,group] of [['00000000-0000-4000-8000-000000000201','grade-5'],['00000000-0000-4000-8000-000000000202','grade-7'],['00000000-0000-4000-8000-000000000203','grade-9'],['00000000-0000-4000-8000-000000000204','grade-11']]) db.prepare("UPDATE content SET group_key=? WHERE id=? AND group_key='' ").run(group,id);
export function audit(actor: string, action: string, target: string) { db.prepare('INSERT INTO audit(actor_id,action,target_id,created_at) VALUES(?,?,?,?)').run(actor,action,target,new Date().toISOString()); }
export function limit(key: string, max: number, windowMs: number) {
  return db.transaction(() => {
    const now = Date.now();
    db.prepare('DELETE FROM limits WHERE expires < ?').run(now);
    const old = db.prepare('SELECT count FROM limits WHERE key=?').get(key) as {count:number}|undefined;
    if (old && old.count >= max) return false;
    db.prepare('INSERT INTO limits(key,count,expires) VALUES(?,1,?) ON CONFLICT(key) DO UPDATE SET count=count+1').run(key,now+windowMs);
    return true;
  })();
}
