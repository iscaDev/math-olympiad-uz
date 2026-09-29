import { api, requireProfile } from '@/lib/api';
import PanelShell from '@/components/panel-shell';
import StudentPanel, {type RecentWork} from '@/components/student-panel';
export default async function Dashboard(){const profile=await requireProfile();const data=await api<{notes:RecentWork[];attempts:RecentWork[]}>('/api/dashboard');return <PanelShell profile={profile} active="dashboard"><StudentPanel profile={profile} {...data}/></PanelShell>;}
