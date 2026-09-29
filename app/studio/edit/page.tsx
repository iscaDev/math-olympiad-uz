import { api, requireProfile } from '@/lib/api';
import type { ContentCard,ContentItem } from '@/lib/platform-types';
import PanelShell from '@/components/panel-shell';
import ContentEditor from '@/components/content-editor';
export default async function Edit({searchParams}:{searchParams:Promise<{id?:string}>}){const profile=await requireProfile('/studio/edit/','writer');const {id}=await searchParams;const initial=id?await api<ContentItem>(`/api/studio/${encodeURIComponent(id)}`):undefined;const workspaceItems=await api<ContentCard[]>('/api/studio');return <PanelShell profile={profile}><ContentEditor initial={initial} role={profile.role} catalog={workspaceItems}/></PanelShell>;}
