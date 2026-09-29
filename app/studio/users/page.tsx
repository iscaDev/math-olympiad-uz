import { api,requireProfile } from '@/lib/api';
import type { Profile } from '@/lib/platform-types';
import PanelShell from '@/components/panel-shell';
import MemberList from '@/components/member-list';
import {changeRole} from '@/app/actions/content';
export default async function Users(){const profile=await requireProfile('/studio/users/','admin');const members=await api<Profile[]>('/api/members');return <PanelShell profile={profile} active="users"><MemberList members={members} currentId={profile.id} roleAction={changeRole}/></PanelShell>;}
