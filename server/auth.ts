import { betterAuth } from 'better-auth';
import { getMigrations } from 'better-auth/db/migration';
import nodemailer from 'nodemailer';
import { authDatabase, authSecret } from './db';
import { appOrigin, emailReady, production } from './config';
const mailer = emailReady ? nodemailer.createTransport({ host: process.env.SMTP_HOST, port: Number(process.env.SMTP_PORT || 587), secure: process.env.SMTP_PORT === '465', auth: {user:process.env.SMTP_USER,pass:process.env.SMTP_PASS} }) : null;
async function send(to:string, subject:string, url:string) {
  if (!mailer) throw new Error('Email is not configured.');
  await mailer.sendMail({ from: process.env.EMAIL_FROM, to, subject: `Math Olympiad Uz — ${subject}`, text: `${subject}\n\n${url}\n\nAgar bu so‘rov sizdan bo‘lmasa, xatni e’tiborsiz qoldiring.` });
}
export const auth = betterAuth({
  database: authDatabase, secret: authSecret, baseURL: appOrigin, trustedOrigins: [appOrigin],
  emailAndPassword: { enabled:true, minPasswordLength:10, maxPasswordLength:128, requireEmailVerification:emailReady,
    ...(emailReady ? { sendResetPassword: async ({user,url}:{user:{email:string};url:string}) => send(user.email,'Parolni tiklash',url), revokeSessionsOnPasswordReset:true } : {}) },
  ...(emailReady ? { emailVerification: { sendOnSignUp:true, autoSignInAfterVerification:true, sendVerificationEmail: async ({user,url}:{user:{email:string};url:string}) => send(user.email,'Emailingizni tasdiqlang',url) } } : {}),
  user: { additionalFields: { role: {type:'string',defaultValue:'student',input:false} } },
  session: { expiresIn:60*60*24*7, updateAge:60*60*24, cookieCache:{enabled:false} },
  advanced: { useSecureCookies:production, ipAddress:{ipAddressHeaders:['x-matholympiad-client-ip']} },
  rateLimit: { enabled:true, storage:'database', window:60, max:60, customRules:{ '/sign-in/email':{window:60,max:8}, '/sign-up/email':{window:60,max:5}, '/request-password-reset':{window:60,max:3} } },
});
export async function migrateAuth() { const {runMigrations} = await getMigrations(auth.options); await runMigrations(); }
