import Sqlite from 'better-sqlite3';
import { Kysely, PostgresDialect, SqliteDialect, sql, type Generated } from 'kysely';
import { Pool } from 'pg';
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { randomBytes } from 'node:crypto';
import { join } from 'node:path';
import { dataDir, production } from './config';

export interface PlatformDatabase {
  content: {
    id: string; slug: string; kind: string; title: string; summary: string; topic: string;
    group_key: string; difficulty: string; duration: number; status: string; author_id: string | null;
    updated_at: string; review_note: string; data: string;
  };
  notes: { user_id: string; content_id: string; body: string; updated_at: string };
  attempts: {
    id: string; user_id: string; content_id: string; title: string; questions: string; answers: string;
    started_at: number; expires_at: number; submitted_at: number | null; score: number | null;
    total: number | null; written: number | null;
  };
  uploads: { path: string; owner_id: string; mime: string; size: number; created_at: string };
  audit: { id: Generated<number>; actor_id: string; action: string; target_id: string; created_at: string };
  limits: { key: string; count: number; expires: number };
  settings: { key: string; value: string };
  user: { id: string; name: string; email: string; emailVerified: boolean | number; role: string; createdAt: Date | string };
}

mkdirSync(dataDir, { recursive: true, mode: 0o700 });
const connectionString = process.env.DATABASE_URL?.trim();
export const usingPostgres = Boolean(connectionString);

let sqlite: Sqlite.Database | null = null;
let postgresPool: Pool | null = null;

if (usingPostgres) {
  postgresPool = new Pool({
    connectionString,
    max: Number(process.env.DATABASE_POOL_SIZE || 10),
    connectionTimeoutMillis: 10_000,
    idleTimeoutMillis: 30_000,
  });
} else {
  sqlite = new Sqlite(join(dataDir, 'platform.sqlite'));
  sqlite.pragma('journal_mode = WAL');
  sqlite.pragma('foreign_keys = ON');
  sqlite.pragma('busy_timeout = 5000');
}

export const db = new Kysely<PlatformDatabase>({
  dialect: usingPostgres
    ? new PostgresDialect({ pool: postgresPool! })
    : new SqliteDialect({ database: sqlite! }),
});

const secretPath = join(dataDir, '.auth-secret');
if (!process.env.BETTER_AUTH_SECRET && !existsSync(secretPath)) {
  writeFileSync(secretPath, randomBytes(48).toString('hex'), { mode: 0o600 });
}
export const authSecret = process.env.BETTER_AUTH_SECRET || readFileSync(secretPath, 'utf8');
export const authDatabase = usingPostgres ? { db, type: 'postgres' as const } : sqlite!;
export const sqliteDatabase = sqlite;

export async function initializeDatabase() {
  if (production && !usingPostgres) {
    throw new Error('Production requires DATABASE_URL. SQLite is available only for local development and migration.');
  }
  if (sqlite) {
    sqlite.exec(`
      CREATE TABLE IF NOT EXISTS content (
        id TEXT PRIMARY KEY, slug TEXT NOT NULL UNIQUE, kind TEXT NOT NULL, title TEXT NOT NULL,
        summary TEXT NOT NULL, topic TEXT NOT NULL, group_key TEXT NOT NULL DEFAULT '', difficulty TEXT NOT NULL, duration INTEGER NOT NULL,
        status TEXT NOT NULL, author_id TEXT, updated_at TEXT NOT NULL, review_note TEXT NOT NULL DEFAULT '', data TEXT NOT NULL
      );
      CREATE INDEX IF NOT EXISTS content_status ON content(status, kind);
      CREATE TABLE IF NOT EXISTS notes (user_id TEXT NOT NULL, content_id TEXT NOT NULL, body TEXT NOT NULL, updated_at TEXT NOT NULL, PRIMARY KEY(user_id, content_id));
      CREATE TABLE IF NOT EXISTS attempts (id TEXT PRIMARY KEY, user_id TEXT NOT NULL, content_id TEXT NOT NULL, title TEXT NOT NULL, questions TEXT NOT NULL, answers TEXT NOT NULL DEFAULT '{}', started_at INTEGER NOT NULL, expires_at INTEGER NOT NULL, submitted_at INTEGER, score REAL, total REAL, written INTEGER);
      CREATE INDEX IF NOT EXISTS attempts_owner ON attempts(user_id,content_id,submitted_at);
      CREATE TABLE IF NOT EXISTS uploads (path TEXT PRIMARY KEY, owner_id TEXT NOT NULL, mime TEXT NOT NULL, size INTEGER NOT NULL, created_at TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS audit (id INTEGER PRIMARY KEY, actor_id TEXT NOT NULL, action TEXT NOT NULL, target_id TEXT NOT NULL, created_at TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS limits (key TEXT PRIMARY KEY, count INTEGER NOT NULL, expires INTEGER NOT NULL);
      CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT NOT NULL);
    `);
    const columns = new Set((sqlite.prepare('PRAGMA table_info(content)').all() as {name:string}[]).map(column=>column.name));
    if (!columns.has('group_key')) sqlite.exec("ALTER TABLE content ADD COLUMN group_key TEXT NOT NULL DEFAULT ''");
  } else {
    await sql.raw(`
      CREATE TABLE IF NOT EXISTS content (
        id TEXT PRIMARY KEY, slug TEXT NOT NULL UNIQUE, kind TEXT NOT NULL, title TEXT NOT NULL,
        summary TEXT NOT NULL, topic TEXT NOT NULL, group_key TEXT NOT NULL DEFAULT '', difficulty TEXT NOT NULL, duration INTEGER NOT NULL,
        status TEXT NOT NULL, author_id TEXT, updated_at TEXT NOT NULL, review_note TEXT NOT NULL DEFAULT '', data TEXT NOT NULL
      );
      CREATE INDEX IF NOT EXISTS content_status ON content(status, kind);
      CREATE TABLE IF NOT EXISTS notes (user_id TEXT NOT NULL, content_id TEXT NOT NULL, body TEXT NOT NULL, updated_at TEXT NOT NULL, PRIMARY KEY(user_id, content_id));
      CREATE TABLE IF NOT EXISTS attempts (id TEXT PRIMARY KEY, user_id TEXT NOT NULL, content_id TEXT NOT NULL, title TEXT NOT NULL, questions TEXT NOT NULL, answers TEXT NOT NULL DEFAULT '{}', started_at BIGINT NOT NULL, expires_at BIGINT NOT NULL, submitted_at BIGINT, score DOUBLE PRECISION, total DOUBLE PRECISION, written INTEGER);
      CREATE INDEX IF NOT EXISTS attempts_owner ON attempts(user_id,content_id,submitted_at);
      CREATE TABLE IF NOT EXISTS uploads (path TEXT PRIMARY KEY, owner_id TEXT NOT NULL, mime TEXT NOT NULL, size BIGINT NOT NULL, created_at TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS audit (id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, actor_id TEXT NOT NULL, action TEXT NOT NULL, target_id TEXT NOT NULL, created_at TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS limits (key TEXT PRIMARY KEY, count INTEGER NOT NULL, expires BIGINT NOT NULL);
      CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT NOT NULL);
    `).execute(db);
  }
  await sql`UPDATE content SET kind='test' WHERE kind='competition'`.execute(db);
  for (const [id, group] of [
    ['00000000-0000-4000-8000-000000000201', 'grade-5'],
    ['00000000-0000-4000-8000-000000000202', 'grade-7'],
    ['00000000-0000-4000-8000-000000000203', 'grade-9'],
    ['00000000-0000-4000-8000-000000000204', 'grade-11'],
  ]) {
    await sql`UPDATE content SET group_key=${group} WHERE id=${id} AND group_key=''`.execute(db);
  }
}

export async function audit(actor: string, action: string, target: string, trx = db) {
  await trx.insertInto('audit').values({
    actor_id: actor,
    action,
    target_id: target,
    created_at: new Date().toISOString(),
  }).execute();
}

export async function limit(key: string, max: number, windowMs: number) {
  return db.transaction().execute(async trx => {
    const now = Date.now();
    await trx.deleteFrom('limits').where('expires', '<', now).execute();
    const old = await trx.selectFrom('limits').select('count').where('key', '=', key).executeTakeFirst();
    if (old && old.count >= max) return false;
    await trx.insertInto('limits').values({ key, count: 1, expires: now + windowMs })
      .onConflict(oc => oc.column('key').doUpdateSet({ count: sql`limits.count + 1`, expires: now + windowMs }))
      .execute();
    return true;
  });
}

export async function closeDatabase() {
  await db.destroy();
}
