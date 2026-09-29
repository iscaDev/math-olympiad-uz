import { notFound } from 'next/navigation';
import PanelShell from '@/components/panel-shell';
import StudioPanel from '@/components/studio-panel';
import StudentPanel from '@/components/student-panel';
import MemberList from '@/components/member-list';
import { sampleItems, cardOnly } from '@/lib/sample-platform';
import { type Profile, type Role } from '@/lib/platform-types';
export const dynamic = 'force-dynamic';
export default async function Preview({ searchParams }: { searchParams: Promise<{role?:string;view?:string}> }) {
  if (process.env.NODE_ENV !== 'development' && process.env.LOCAL_PREVIEW !== '1') notFound();
  const q = await searchParams; const role: Role = q.role === 'student' ? 'student' : q.role === 'contributor' ? 'contributor' : 'admin';
  const profile: Profile = { id:'preview', display_name: role === 'admin' ? 'Isfandiyor' : role === 'contributor' ? 'Muallif namunasi' : 'O‘quvchi namunasi', role };
  const items = sampleItems.slice(0,8).map((item,i) => ({...cardOnly(item), status: i === 0 ? 'pending' as const : i === 1 ? 'draft' as const : item.status}));
  return <PanelShell profile={profile} demo active={q.view === 'users' ? 'users' : role === 'student' || q.view === 'dashboard' ? 'dashboard' : 'studio'}>{q.view === 'users' && role === 'admin' ? <MemberList members={[profile,{id:'example-contributor',display_name:'Muallif namunasi',role:'contributor'},{id:'example-student',display_name:'O‘quvchi namunasi',role:'student'}]} currentId={profile.id} demo /> : role === 'student' || q.view === 'dashboard' ? <StudentPanel profile={profile} /> : <StudioPanel profile={profile} items={role === 'contributor' ? items.slice(0,3) : items} demo />}</PanelShell>;
}
