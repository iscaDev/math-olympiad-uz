import {T} from '@/components/preferences';
import { notFound } from 'next/navigation';
import ContentEditor from '@/components/content-editor';
import { sampleItems, cardOnly } from '@/lib/sample-platform';
export const dynamic = 'force-dynamic';
export default async function EditorPreview({ searchParams }: { searchParams: Promise<{role?:string;id?:string}> }) {
  if (process.env.NODE_ENV !== 'development' && process.env.LOCAL_PREVIEW !== '1') notFound();
  const q = await searchParams;
  return <div className="shell panel-shell"><div className="setup-notice"><p><T>Panel va muharrir namunasi. Kontent bazaga saqlanmaydi.</T></p></div><ContentEditor role={q.role === 'contributor' ? 'contributor' : 'admin'} initial={sampleItems.find(i => i.id === q.id)} catalog={sampleItems.map(cardOnly)} demo /></div>;
}
