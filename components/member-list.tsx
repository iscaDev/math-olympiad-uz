"use client";
import { useMemo, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { roleLabels, type MemberProfile, type Role } from '@/lib/platform-types';
import { usePreferences } from './preferences';
import Icon from './icons';

type Result = Promise<{error?:string}>;
export default function MemberList({ members, currentId, demo = false, roleAction, deleteAction }: {
  members: MemberProfile[]; currentId: string; demo?: boolean;
  roleAction?: (id:string,role:Role) => Result; deleteAction?: (id:string) => Result;
}) {
  const { t } = usePreferences(); const router = useRouter();
  const [message, setMessage] = useState(''); const [query,setQuery]=useState('');
  const [pending, start] = useTransition(); const [selection, setSelection] = useState<Record<string, Role>>({});
  const filtered=useMemo(()=>{const value=query.trim().toLowerCase();return value?members.filter(member=>
    `${member.display_name} ${member.email} ${t(roleLabels[member.role])}`.toLowerCase().includes(value)):members;},[members,query,t]);
  function save(id: string) { if (demo || !roleAction) { setMessage('Bu panel namunasi. Rollar o‘zgarmaydi.'); return; } start(async () => { const result = await roleAction(id, selection[id]); setMessage(result.error ?? 'Rol yangilandi.'); if (!result.error) router.refresh(); }); }
  function remove(member:MemberProfile){
    if(demo||!deleteAction){setMessage('Bu panel namunasi. Hisob o‘chirilmaydi.');return;}
    if(!window.confirm(`${member.display_name}: ${t('Hisobni o‘chirasizmi? Shaxsiy qaydlar va test natijalari butunlay o‘chadi. Nashr qilingan materiallar platformada qoladi.')}`))return;
    start(async()=>{const result=await deleteAction(member.id);setMessage(result.error??'Foydalanuvchi hisobi o‘chirildi.');if(!result.error)router.refresh();});
  }
  return <><div className="studio-title"><div><p className="eyebrow">{t('Administrator')}</p><h1>{t('Foydalanuvchilar')}</h1><p>{t('Foydalanuvchini toping, rolini boshqaring yoki hisobini o‘chiring.')}</p></div></div>
    <div className="member-search"><Icon name="search" size={18}/><input value={query} onChange={event=>setQuery(event.target.value)} placeholder={t('Ism, email yoki rol bo‘yicha qidirish')} aria-label={t('Foydalanuvchilarni qidirish')}/><span>{filtered.length}</span></div>
    <div className="panel-card member-list">{filtered.map(member => <div className="member-row" key={member.id}><span className="member-avatar">{member.display_name.slice(0,1).toUpperCase()}</span><div className="member-identity"><strong>{member.display_name}</strong><span>{member.email}</span><small>{member.id === currentId ? t('Siz') : t(roleLabels[member.role])}</small></div><select aria-label={`${member.display_name}: ${t('Rol')}`} disabled={member.id === currentId || pending} value={selection[member.id] ?? member.role} onChange={e => setSelection(v => ({ ...v, [member.id]: e.target.value as Role }))}>{(['student','contributor','admin'] as const).map(role => <option key={role} value={role}>{t(roleLabels[role])}</option>)}</select><button className="button secondary small" disabled={pending || !selection[member.id] || selection[member.id] === member.role || member.id === currentId} onClick={() => save(member.id)}>{t('Saqlash')}</button><button className="member-delete" type="button" disabled={pending||member.id===currentId} onClick={()=>remove(member)} aria-label={`${member.display_name}: ${t('Hisobni o‘chirish')}`} title={t('Hisobni o‘chirish')}><Icon name="trash" size={17}/></button></div>)}{!filtered.length&&<p className="member-empty">{t('Mos foydalanuvchi topilmadi.')}</p>}</div><p className="form-message" role="status">{t(message)}</p></>;
}
