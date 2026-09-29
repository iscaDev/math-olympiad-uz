import {api} from '@/lib/api';
import type {ContentCard} from '@/lib/platform-types';
import ContentCatalog from '@/components/content-catalog';
import {Intro} from '@/components/ui';
import {T,ContentLanguageNotice} from '@/components/preferences';
export default async function Page(){const items=await api<ContentCard[]>('/api/public/catalog');return <div className="shell"><Intro eyebrow="O‘ZINGIZNI SINAB KO‘RING" title="Tayyorgarlikni natijaga aylantiring."><T>5-sinfdan 11-sinfgacha vaqtli testlar, avtomatik tekshiruv va batafsil tahlil.</T></Intro><ContentLanguageNotice/><ContentCatalog section="tests" items={items.filter(i=>i.kind==='test')}/></div>;}
