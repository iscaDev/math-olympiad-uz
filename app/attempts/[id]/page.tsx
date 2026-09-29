import { api, requireProfile } from '@/lib/api';
import type { AttemptResult } from '@/lib/attempt-types';
import PanelShell from '@/components/panel-shell';
import AttemptReview from '@/components/attempt-review';
export default async function Page({params}:{params:Promise<{id:string}>}){const {id}=await params;const profile=await requireProfile(`/attempts/${id}/`);const result=await api<AttemptResult>(`/api/attempts/${encodeURIComponent(id)}`);return <PanelShell profile={profile} active="dashboard"><AttemptReview result={result} standalone/></PanelShell>;}
