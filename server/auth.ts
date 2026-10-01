import { betterAuth } from 'better-auth';
import { getMigrations } from 'better-auth/db/migration';
import nodemailer from 'nodemailer';
import { authDatabase, authSecret } from './db';
import { appOrigin, emailReady, production, trustedOrigins } from './config';
const smtpReady = Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
const mailer = smtpReady ? nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: process.env.SMTP_PORT === '465',
  auth: {user:process.env.SMTP_USER,pass:process.env.SMTP_PASS},
  connectionTimeout: 10_000,
  greetingTimeout: 10_000,
  socketTimeout: 15_000,
}) : null;

function sender() {
  const value = process.env.EMAIL_FROM || '';
  const match = value.match(/^\s*(.*?)\s*<([^>]+)>\s*$/);
  return match ? {name:match[1] || 'Math Olympiad Uz',email:match[2]} : {name:'Math Olympiad Uz',email:value};
}

async function send(to:string, subject:string, url:string) {
  const fullSubject = `Math Olympiad Uz — ${subject}`;
  const text = `${subject}\n\n${url}\n\nAgar bu so‘rov sizdan bo‘lmasa, xatni e’tiborsiz qoldiring.`;
  const from = sender();

  if (process.env.BREVO_API_KEY) {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method:'POST',
      headers:{'api-key':process.env.BREVO_API_KEY,'content-type':'application/json','accept':'application/json'},
      body:JSON.stringify({sender:from,to:[{email:to}],subject:fullSubject,textContent:text}),
      signal:AbortSignal.timeout(12_000),
    });
    if (!response.ok) throw new Error(`Brevo email failed (${response.status}): ${await response.text()}`);
    return;
  }

  if (process.env.RESEND_API_KEY) {
    const response = await fetch('https://api.resend.com/emails', {
      method:'POST',
      headers:{authorization:`Bearer ${process.env.RESEND_API_KEY}`,'content-type':'application/json'},
      body:JSON.stringify({from:`${from.name} <${from.email}>`,to:[to],subject:fullSubject,text}),
      signal:AbortSignal.timeout(12_000),
    });
    if (!response.ok) throw new Error(`Resend email failed (${response.status}): ${await response.text()}`);
    return;
  }

  if (!mailer) throw new Error('Email is not configured.');
  await mailer.sendMail({ from: process.env.EMAIL_FROM, to, subject:fullSubject, text });
}
export const auth = betterAuth({
  database: authDatabase, secret: authSecret, baseURL: appOrigin, trustedOrigins,
  emailAndPassword: { enabled:true, minPasswordLength:8, maxPasswordLength:128, requireEmailVerification:emailReady,
    ...(emailReady ? { sendResetPassword: async ({user,url}:{user:{email:string};url:string}) => send(user.email,'Parolni tiklash',url), revokeSessionsOnPasswordReset:true } : {}) },
  ...(emailReady ? { emailVerification: { sendOnSignUp:true, sendOnSignIn:true, autoSignInAfterVerification:true, sendVerificationEmail: async ({user,url}:{user:{email:string};url:string}) => send(user.email,'Emailingizni tasdiqlang',url) } } : {}),
  user: { additionalFields: { role: {type:'string',defaultValue:'student',input:false} } },
  session: { expiresIn:60*60*24*7, updateAge:60*60*24, cookieCache:{enabled:false} },
  advanced: { useSecureCookies:production, ipAddress:{ipAddressHeaders:['x-matholympiad-client-ip']} },
  rateLimit: { enabled:true, storage:'database', window:60, max:60, customRules:{ '/sign-in/email':{window:60,max:8}, '/sign-up/email':{window:60,max:5}, '/request-password-reset':{window:60,max:3} } },
});
export async function migrateAuth() { const {runMigrations} = await getMigrations(auth.options); await runMigrations(); }
