"use client";
import { useId, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import { safeNext } from '@/lib/platform-types';
import BrandMark from './brand-mark';
import Icon from './icons';
import { usePreferences } from './preferences';
export default function AuthForm({ next = '/dashboard/', onDone, onClose, initialMode = 'login', emailReady = false }: { next?: string; onDone?: () => void; onClose?: () => void; initialMode?: 'login' | 'register'; emailReady?: boolean }) {
  const { t } = usePreferences(); const router = useRouter(); const id = useId();
  const [mode, setMode] = useState<'login' | 'register' | 'reset'>(initialMode);
  const [name, setName] = useState(''); const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [message, setMessage] = useState(''); const [busy, setBusy] = useState(false);
  const emailNotice = message === 'Agar bu email bilan hisob mavjud bo‘lsa, parolni tiklash havolasi yuboriladi.' || message === 'Email tasdiqlanmagan. Yangi tasdiqlash havolasi emailingizga yuborildi.' || message === 'Emailingizni tekshiring va tasdiqlash havolasini bosing.';
  async function submit(e: React.FormEvent) {
    e.preventDefault(); setBusy(true); setMessage('');
    try {
      if (mode === 'reset') {
        const result = await authClient.requestPasswordReset({ email, redirectTo: '/reset-password/' });
        if (result.error) throw new Error('Hozir xat yuborib bo‘lmadi. Keyinroq urinib ko‘ring.');
        setMessage('Agar bu email bilan hisob mavjud bo‘lsa, parolni tiklash havolasi yuboriladi.'); return;
      }
      const result = mode === 'register' ? await authClient.signUp.email({ email, password, name, callbackURL: safeNext(next) }) : await authClient.signIn.email({ email, password, callbackURL: safeNext(next) });
      if (result.error) {
        if (mode === 'login' && result.error.code === 'EMAIL_NOT_VERIFIED') setMessage('Email tasdiqlanmagan. Yangi tasdiqlash havolasi emailingizga yuborildi.');
        else setMessage(mode === 'login' ? 'Email yoki parol noto‘g‘ri.' : 'Hisob yaratib bo‘lmadi. Ma’lumotlarni tekshiring yoki kirishga urinib ko‘ring.');
        return;
      }
      if (mode === 'register' && !result.data?.token) { setMessage('Emailingizni tekshiring va tasdiqlash havolasini bosing.'); return; }
      onDone?.(); router.push(safeNext(next)); router.refresh();
    } catch { setMessage('So‘rov bajarilmadi. Qayta urinib ko‘ring.'); } finally { setBusy(false); }
  }
  return <div className="auth-content"><div className="auth-top"><BrandMark />{onClose && <button className="header-tool" aria-label={t('Yopish')} onClick={onClose} autoFocus><Icon name="close" size={20} /></button>}</div><p className="eyebrow">MATH OLYMPIAD UZ</p><h2 id={`${id}-title`}>{t(mode === 'register' ? 'Birinchi qadamingiz shu yerdan.' : mode === 'reset' ? 'Parolni tiklash' : 'Yana bir kashfiyotga tayyormisiz?')}</h2><div className="auth-tabs" aria-label={t('Hisobga kirish usuli')}><button aria-pressed={mode === 'login'} onClick={() => {setMode('login');setMessage('');}}>{t('Kirish')}</button><button aria-pressed={mode === 'register'} onClick={() => {setMode('register');setMessage('');}}>{t('Ro‘yxatdan o‘tish')}</button></div>
    <form onSubmit={submit}><div className="auth-fields">{mode === 'register' && <label>{t('Ismingiz')}<input value={name} onChange={e => setName(e.target.value)} required minLength={2} maxLength={80} autoComplete="name" placeholder={t('Ism va familiya')} /></label>}<label>{t('Elektron pochta')}<input type="email" value={email} onChange={e => setEmail(e.target.value)} required maxLength={254} autoComplete="email" placeholder="name@example.com" /></label>{mode !== 'reset' && <label>{t('Parol')}<input type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={8} maxLength={128} autoComplete={mode === 'register' ? 'new-password' : 'current-password'} placeholder={t('Kamida 8 ta belgi')} /></label>}</div>
    {mode === 'login' && emailReady && <button type="button" className="auth-reset" onClick={() => {setMode('reset');setMessage('');}}>{t('Parolni unutdingizmi?')}</button>}
    {mode==='register'&&<p className="auth-terms">{t('Hisob yaratish orqali')} <Link href="/legal/" target={onClose?'_blank':undefined}>{t('Maxfiylik va foydalanish shartlariga')}</Link> {t('rozilik bildirasiz.')}</p>}
    {message&&<div className={`auth-message ${emailNotice?'delivery':'error'}`} role={emailNotice?'status':'alert'} aria-live={emailNotice?'polite':'assertive'}><Icon name={emailNotice?'email':'info'} size={20} weight="duotone"/><p>{t(message)}</p></div>}<button className="auth-submit" type="submit" disabled={busy || (mode === 'reset' && !emailReady)}><Icon name="lock" size={17} />{t(busy ? 'Kuting…' : mode === 'register' ? 'Hisob yaratish' : mode === 'reset' ? 'Havola yuborish' : 'Kirish')}</button></form><Link href="/problems/" className="auth-guest" onClick={onClose}>{t('Mehmon sifatida katalogni ko‘rish')}<Icon name="arrow" size={17} /></Link></div>;
}
