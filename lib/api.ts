import 'server-only';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import type { Profile } from './platform-types';
export class ApiError extends Error { constructor(public status:number,message:string){super(message);} }
export async function api<T>(path:string, options:{method?:string;body?:unknown}={}):Promise<T> {
  const jar=await cookies();
  const publicUrl=process.env.PUBLIC_APP_URL||(process.env.NODE_ENV==='production'?'https://matholympiad.uz':'http://127.0.0.1:3000');
  // Internal production writes must always identify the canonical site. A stale
  // deployment URL in Vercel must not make server actions fail CSRF validation.
  const origin=process.env.NODE_ENV==='production'?'https://matholympiad.uz':new URL(publicUrl).origin;
  const headers:Record<string,string>={Cookie:jar.toString(),Origin:origin};
  if(process.env.BACKEND_PROXY_SECRET)headers['x-matholympiad-gateway']=process.env.BACKEND_PROXY_SECRET;
  const isForm=options.body instanceof FormData;
  if(options.body!==undefined && !isForm) headers['Content-Type']='application/json';
  let response:Response;
  try {response=await fetch(`${process.env.BACKEND_URL||'http://127.0.0.1:4000'}${path}`,{method:options.method||'GET',headers,body:options.body===undefined ? undefined : isForm ? options.body as FormData : JSON.stringify(options.body),cache:'no-store',signal:AbortSignal.timeout(20000)});}
  catch {throw new ApiError(503,'Serverga ulanib bo‘lmadi. Bir ozdan keyin qayta urinib ko‘ring.');}
  const result=await response.json();
  if(!response.ok) throw new ApiError(response.status,result.error||'So‘rov bajarilmadi.');
  return result;
}
export async function getProfile() {try{return await api<Profile>('/api/me');}catch(e){if(e instanceof ApiError && e.status===401)return null;throw e;}}
export async function requireProfile(next='/dashboard/',role?:'writer'|'admin') { const p=await getProfile(); if(!p) redirect(`/login/?next=${encodeURIComponent(next)}`); if(role && (p.role==='student' || (role==='admin' && p.role!=='admin'))) redirect('/dashboard/'); return p; }
export function actionError(error:unknown){return {error:error instanceof ApiError ? error.message : 'So‘rov bajarilmadi. Qayta urinib ko‘ring.'};}
