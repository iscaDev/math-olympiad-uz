"use client";
import { useEffect, useRef } from 'react';
import AuthForm from './auth-form';
import { usePreferences } from './preferences';
export default function AuthDialog({ open, onClose, emailReady }: { open: boolean; onClose: () => void; emailReady: boolean }) {
  const dialog = useRef<HTMLDialogElement>(null); const { t } = usePreferences();
  useEffect(() => { const node = dialog.current; if (!node || !open) return; node.showModal(); const previous = document.body.style.overflow; document.body.style.overflow = 'hidden'; return () => { node.close(); document.body.style.overflow = previous; }; }, [open]);
  return <dialog className="auth-dialog" ref={dialog} aria-label={t('Kirish / Ro‘yxatdan o‘tish')} onCancel={onClose} onClick={e => { if(e.target === e.currentTarget) onClose(); }}>{open && <AuthForm onClose={onClose} onDone={onClose} emailReady={emailReady} />}</dialog>;
}
