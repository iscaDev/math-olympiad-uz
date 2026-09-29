"use client";
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { roleLabels, type Profile, type Role } from '@/lib/platform-types';
import { usePreferences } from './preferences';
export default function MemberList({ members, currentId, demo = false, roleAction }: { members: Profile[]; currentId: string; demo?: boolean; roleAction?: (id:string,role:Role) => Promise<{error?:string}> }) {
  const { t } = usePreferences(); const router = useRouter(); const [message, setMessage] = useState(''); const [pending, start] = useTransition();
  const [selection, setSelection] = useState<Record<string, Role>>({});
  function save(id: string) { if (demo || !roleAction) { setMessage('Bu panel namunasi. Rollar o‘zgarmaydi.'); return; } start(async () => { const result = await roleAction(id, selection[id]); setMessage(result.error ?? 'Rol yangilandi.'); if (!result.error) router.refresh(); }); }
  return <><div className="studio-title"><div><p className="eyebrow">{t('Administrator')}</p><h1>{t('Foydalanuvchilar')}</h1><p>{t('Mualliflarni tayinlang. Nashr qilish nazorati sizda qoladi.')}</p></div></div><div className="panel-card member-list">{members.map(member => <div className="member-row" key={member.id}><span className="member-avatar">{member.display_name.slice(0,1).toUpperCase()}</span><div><strong>{member.display_name}</strong><small>{member.id === currentId ? t('Siz') : t(roleLabels[member.role])}</small></div><select aria-label={`${member.display_name}: ${t('Rol')}`} disabled={member.id === currentId || pending} value={selection[member.id] ?? member.role} onChange={e => setSelection(v => ({ ...v, [member.id]: e.target.value as Role }))}>{(['student','contributor','admin'] as const).map(role => <option key={role} value={role}>{t(roleLabels[role])}</option>)}</select><button className="button secondary small" disabled={pending || !selection[member.id] || selection[member.id] === member.role || member.id === currentId} onClick={() => save(member.id)}>{t('Saqlash')}</button></div>)}</div><p className="form-message" role="status">{t(message)}</p></>;
}
