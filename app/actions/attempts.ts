"use server";
import { revalidatePath } from 'next/cache';
import { api, actionError } from '@/lib/api';
import type { ActiveAttempt, AttemptResult } from '@/lib/attempt-types';
export async function startAttempt(content_id:string):Promise<{error:string}|ActiveAttempt>{try{return await api('/api/attempts/start',{method:'POST',body:{content_id}});}catch(e){return actionError(e);}}
export async function saveAttempt(id:string,answers:Record<string,string>):Promise<{error?:string}>{try{await api(`/api/attempts/${encodeURIComponent(id)}/save`,{method:'POST',body:{answers}});return {};}catch(e){return actionError(e);}}
export async function submitAttempt(id:string,answers:Record<string,string>):Promise<{error:string}|AttemptResult>{try{await api(`/api/attempts/${encodeURIComponent(id)}/submit`,{method:'POST',body:{answers}});const result=await api<AttemptResult>(`/api/attempts/${encodeURIComponent(id)}`);revalidatePath('/dashboard');return result;}catch(e){return actionError(e);}}
export async function deleteAttempt(id:string):Promise<{error?:string}>{try{await api(`/api/attempts/${encodeURIComponent(id)}`,{method:'DELETE'});revalidatePath('/dashboard');return {};}catch(e){return actionError(e);}}
