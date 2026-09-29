import {api,getProfile} from '@/lib/api';
import AccessGate from '@/components/access-gate';
import AssistantChat from '@/components/assistant-chat';
import { T } from '@/components/preferences';
import Icon from '@/components/icons';
export const metadata = { title: 'AI yordamchi' };
export default async function AssistantPage() {
  if(!await getProfile())return <AccessGate next="/assistant/"/>;
  const config=await api<{aiReady:boolean}>('/api/public/config');
  return <div className="assistant-page"><p className="eyebrow"><Icon name="sparkle" size={18} /><T>AI YORDAMCHI</T></p><h1><T>Birga fikrlab ko‘ramiz.</T></h1><p className="muted"><T>Matematika uchun suhbatdosh. Avval ishora, keyin tushunish.</T></p><AssistantChat enabled={config.aiReady} /></div>;
}
