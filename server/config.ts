import { config } from 'dotenv';
import { resolve } from 'node:path';
config({ path: '.env.local', quiet: true });
config({ quiet: true });
export const production = process.env.NODE_ENV === 'production';
export const appOrigin = new URL(process.env.PUBLIC_APP_URL || 'http://127.0.0.1:3000').origin;
const canonicalProductionOrigin = 'https://matholympiad.uz';
const configuredOrigins = (process.env.TRUSTED_APP_ORIGINS || '')
  .split(',')
  .map(value => value.trim())
  .filter(Boolean)
  .map(value => new URL(value).origin);
export const trustedOrigins = [...new Set([
  appOrigin,
  ...(production ? [canonicalProductionOrigin] : []),
  ...configuredOrigins,
])];
export function isTrustedOrigin(origin: string | undefined) {
  if (!origin) return false;
  try { return trustedOrigins.includes(new URL(origin).origin); }
  catch { return false; }
}
export const dataDir = resolve(process.env.DATA_DIR || './data');
export const emailReady = Boolean(
  process.env.EMAIL_FROM && (
    process.env.BREVO_API_KEY ||
    process.env.RESEND_API_KEY ||
    (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS)
  )
);
if (production && ((process.env.BETTER_AUTH_SECRET?.length||0)<32 || (process.env.BACKEND_PROXY_SECRET?.length||0)<32 || !emailReady || !appOrigin.startsWith('https://'))) {
  throw new Error('Production requires BETTER_AUTH_SECRET, BACKEND_PROXY_SECRET, HTTPS PUBLIC_APP_URL and transactional email settings.');
}
