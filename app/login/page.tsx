import { redirect } from 'next/navigation';
import { api,getProfile } from '@/lib/api';
import { safeNext } from '@/lib/platform-types';
import AuthForm from '@/components/auth-form';
import {T} from '@/components/preferences';
export default async function Login({searchParams}:{searchParams:Promise<{next?:string;mode?:string}>}){const {next,mode}=await searchParams; if(await getProfile())redirect(safeNext(next)); const config=await api<{emailReady:boolean;local:boolean}>('/api/public/config');return <div className="shell login-page"><div className="login-card"><AuthForm next={safeNext(next)} initialMode={mode==='register'?'register':'login'} emailReady={config.emailReady}/>{config.local && !config.emailReady && <p className="local-account-note"><T>Mahalliy versiya: hisoblar shu kompyuterda saqlanadi. Email tasdiqlash hali ulanmagan.</T></p>}</div></div>;}
