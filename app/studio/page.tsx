import { api, requireProfile } from '@/lib/api';
import type { ContentCard } from '@/lib/platform-types';
import PanelShell from '@/components/panel-shell';
import StudioPanel from '@/components/studio-panel';
import { reviewContent, deleteContent } from '@/app/actions/content';
export default async function Studio(){const profile=await requireProfile('/studio/','writer');const items=await api<ContentCard[]>('/api/studio');return <PanelShell profile={profile}><StudioPanel profile={profile} items={items} reviewAction={reviewContent} deleteAction={deleteContent}/></PanelShell>;}
