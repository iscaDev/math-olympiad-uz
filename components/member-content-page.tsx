import { notFound } from 'next/navigation';
import { api, ApiError, getProfile } from '@/lib/api';
import { type ContentCard, type ContentItem, contentHref } from '@/lib/platform-types';
import AccessGate from './access-gate';
import ContentReader from './content-reader';
import TestRunner from './test-runner';
import { ContentLanguageNotice } from './preferences';
export default async function MemberContentPage({slug,section}:{slug:string;section:'problems'|'tests'|'learn'}) {
  let card:ContentCard;
  try{card=await api<ContentCard>(`/api/public/card/${encodeURIComponent(slug)}`);}catch(e){if(e instanceof ApiError && e.status===404)notFound();throw e;}
  if(!contentHref(card).startsWith(`/${section}/`))notFound();
  if(!await getProfile())return <AccessGate next={contentHref(card)} title={card.title}/>;
  const {item,note}=await api<{item:ContentItem;note:string}>(`/api/content/${card.id}`);
  return <div className="shell"><ContentLanguageNotice/>{section==='tests'?<TestRunner item={item}/>:<ContentReader item={item} initialNote={note}/>}</div>;
}
