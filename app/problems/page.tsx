import {api} from '@/lib/api';
import type {ContentCard} from '@/lib/platform-types';
import ContentCatalog from '@/components/content-catalog';
import {Intro} from '@/components/ui';
import {T,ContentLanguageNotice} from '@/components/preferences';
export default async function Page(){const items=await api<ContentCard[]>('/api/public/catalog');return <div className="shell"><Intro eyebrow="FIKRINGIZ UCHUN MASHQ MAYDONI" title="Har masala — yangi kashfiyot."><T>Qiziqqan yo‘nalishingizni tanlang. O‘z tezligingizda ishlang.</T></Intro><ContentLanguageNotice/><ContentCatalog section="problems" items={items.filter(i=>["problem"].includes(i.kind))}/></div>;}
