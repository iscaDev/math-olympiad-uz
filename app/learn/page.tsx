import {api} from '@/lib/api';
import type {ContentCard} from '@/lib/platform-types';
import ContentCatalog from '@/components/content-catalog';
import {Intro} from '@/components/ui';
import {T,ContentLanguageNotice} from '@/components/preferences';
import type {Metadata} from 'next';
export const metadata:Metadata={title:'Matematikani o‘rganish',description:'Matematik mavzular, nazariy maqolalar va kitoblar orqali olimpiada bilimlaringizni mustahkamlang.',alternates:{canonical:'/learn/'}};
export default async function Page(){const items=await api<ContentCard[]>('/api/public/catalog');return <div className="shell"><Intro eyebrow="BILIM YODLASHDAN EMAS, TUSHUNISHDAN BOSHLANADI" title="Kichik darslar. Katta g‘oyalar."><T>Mavzular, nazariy maqolalar va kitoblar bilan bilimingizni kengaytiring.</T></Intro><ContentLanguageNotice/><ContentCatalog section="learn" items={items.filter(i=>["lesson", "article", "book"].includes(i.kind))}/></div>;}
