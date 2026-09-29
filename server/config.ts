import { config } from 'dotenv';
import { resolve } from 'node:path';
config({ path: '.env.local', quiet: true });
config({ quiet: true });
export const production = process.env.NODE_ENV === 'production';
export const appOrigin = new URL(process.env.PUBLIC_APP_URL || 'http://127.0.0.1:3000').origin;
export const dataDir = resolve(process.env.DATA_DIR || './data');
export const emailReady = Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS && process.env.EMAIL_FROM);
if (production && ((process.env.BETTER_AUTH_SECRET?.length||0)<32 || !emailReady || !appOrigin.startsWith('https://'))) {
  throw new Error('Production requires BETTER_AUTH_SECRET, HTTPS PUBLIC_APP_URL and SMTP email settings.');
}
