"use client";
import { useMemo, useState, useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { kindLabels, statusLabels, roleLabels, type ContentCard, type Profile, type Status } from '@/lib/platform-types';
import Icon from './icons';
import { usePreferences } from './preferences';

const kindSearchAliases: Record<ContentCard['kind'], string> = {
  problem: 'masala masalalar misol misollar problem problems задача задачи',
  test: 'test testlar sinov sinovlar quiz quizzes тест тесты',
  competition: 'olimpiada olimpiadalar musobaqa musobaqalar competition competitions олимпиада олимпиады',
  lesson: 'mavzu mavzular dars darslar lesson lessons topic topics тема темы урок уроки',
  article: 'maqola maqolalar article articles статья статьи',
  book: 'kitob kitoblar book books книга книги',
};

function normalizeSearch(value: string) {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[ʻʼ’‘`´]/g, "'")
    .toLocaleLowerCase()
    .trim();
}

export default function StudioPanel({ profile, items, demo = false, reviewAction, deleteAction }: { profile: Profile; items: ContentCard[]; demo?: boolean; reviewAction?: (id:string,status:'draft'|'published'|'archived',note:string) => Promise<{error?:string}>; deleteAction?: (id:string)=>Promise<{error?:string}> }) {
  const { t } = usePreferences(); const router = useRouter();
  const [tab, setTab] = useState('all'); const [query, setQuery] = useState(''); const [message, setMessage] = useState('');
  const [pending, start] = useTransition(); const [reviewId, setReviewId] = useState<string | null>(null); const [note, setNote] = useState('');
  const pendingCount = items.filter(i => i.status === 'pending').length;
  const filteredItems = useMemo(() => {
    const terms = normalizeSearch(query).split(/\s+/).filter(Boolean);

    return items.filter(item => {
      if (tab !== 'all' && item.status !== tab) return false;
      if (!terms.length) return true;

      const searchableText = normalizeSearch([
        item.title,
        item.summary,
        item.topic,
        item.group_key,
        item.difficulty,
        item.kind,
        kindLabels[item.kind],
        t(kindLabels[item.kind]),
        kindSearchAliases[item.kind],
      ].filter(Boolean).join(' '));

      return terms.every(term => searchableText.includes(term));
    });
  }, [items, query, tab, t]);
  function review(id: string, status: 'draft'|'published'|'archived') {
    if (demo || !reviewAction) { setMessage('Bu panel namunasi. Haqiqiy o‘zgarishlar saqlanmaydi.'); return; }
    start(async () => { const result = await reviewAction(id, status, note); setMessage(result.error ?? 'Holat yangilandi.'); if (!result.error) { setReviewId(null); setNote(''); router.refresh(); } });
  }
  function remove(id:string,title:string){if(demo||!deleteAction){setMessage('Namuna rejimida o‘chirib bo‘lmaydi.');return;}if(!confirm(`“${title}” kontentini butunlay o‘chirishni xohlaysizmi?`))return;start(async()=>{const result=await deleteAction(id);setMessage(result.error??'Kontent o‘chirildi.');if(!result.error)router.refresh();});}
  return <>
    <div className="studio-title"><div><p className="eyebrow">{t(roleLabels[profile.role])}</p><h1>{t('Kontent ustaxonasi')}</h1><p>{t(profile.role === 'admin' ? 'Yarating, ko‘rib chiqing va nashr eting.' : 'G‘oyalaringizni boshqalar bilan ulashing.')}</p></div><Link className="button primary" href={demo ? `/preview/editor/?role=${profile.role}` : '/studio/edit/'}><span>+</span>{t('Yangi kontent')}</Link></div>
    <div className="studio-overview">{[['Qoralamalar',items.filter(i => i.status === 'draft').length],['Tekshiruvda',pendingCount],['Nashr etilgan',items.filter(i => i.status === 'published').length]].map(([label,count]) => <div key={label}><span>{t(String(label))}</span><strong>{count}</strong></div>)}</div>
    <div className="panel-card studio-library"><div className="studio-list-controls"><div className="catalog-tabs">{[['all','Barchasi'],['pending','Tekshiruvda'],['draft','Qoralama'],['published','Nashr etilgan'],['archived','Arxivda']].map(([key,label]) => <button key={key} aria-pressed={tab === key} onClick={() => setTab(key)}>{t(label)}</button>)}</div><label className="studio-search"><Icon name="search" size={18} /><input aria-label={t('Kontent qidirish')} placeholder={t('Kontent qidirish')} value={query} onChange={e => setQuery(e.target.value)} /></label></div>
    <div className="content-rows">{filteredItems.map(item => <div className="content-row" key={item.id}><div className="content-row-icon"><Icon name={item.kind === 'problem' ? 'pencil' : ['test','competition'].includes(item.kind) ? 'trophy' : 'resources'} size={24} /></div><div className="content-row-title"><Link href={demo ? `/preview/editor/?role=${profile.role}&id=${item.id}` : `/studio/edit/?id=${item.id}`}>{item.title}</Link><small>{t(kindLabels[item.kind])} · {t(item.difficulty)}</small></div><span className={`status-tag ${item.status}`}>{t(statusLabels[item.status])}</span><div className="row-actions"><Link className="header-tool" title={t('Tahrirlash')} aria-label={`${t('Tahrirlash')}: ${item.title}`} href={demo ? `/preview/editor/?role=${profile.role}&id=${item.id}` : `/studio/edit/?id=${item.id}`}><Icon name="pencil" size={18} /></Link>{profile.role === 'admin' && <button className="header-tool" aria-label={`${t('Holatni boshqarish')}: ${item.title}`} onClick={() => { setReviewId(reviewId === item.id ? null : item.id); setNote(item.review_note); }}><Icon name="filter" size={18} /></button>}{profile.role==='admin'&&<button className="header-tool danger-tool" title={t('Butunlay o‘chirish')} aria-label={`${t('Butunlay o‘chirish')}: ${item.title}`} onClick={()=>remove(item.id,item.title)}><Icon name="close" size={18}/></button>}</div>{reviewId === item.id && <div className="review-controls"><label className="field-label">{t('Muallifga izoh')}<textarea rows={2} maxLength={1000} value={note} onChange={e => setNote(e.target.value)} /></label><div><button className="button primary small" disabled={pending} onClick={() => review(item.id, 'published')}>{t('Tasdiqlash va nashr etish')}</button><button className="button secondary small" disabled={pending} onClick={() => review(item.id, 'draft')}>{t('Tahrirga qaytarish')}</button><button className="button secondary small" disabled={pending} onClick={() => review(item.id, 'archived')}>{t('Arxivlash')}</button></div></div>}</div>)}</div>
    {!filteredItems.length && <div className="empty-state"><Icon name="book" size={30} /><h2>{t('Bu yer hozircha bo‘sh')}</h2><p>{t('Yangi kontent qo‘shing yoki boshqa bo‘limni tanlang.')}</p></div>}
    </div><p className="form-message" role="status">{t(message)}</p>
  </>;
}
