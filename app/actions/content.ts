'use server';
import { revalidatePath } from 'next/cache';
import { api, actionError } from '@/lib/api';
export async function saveNote(id:string,body:string):Promise<{error?:string}>{try{await api(`/api/notes/${encodeURIComponent(id)}`,{method:'POST',body:{body}});revalidatePath('/dashboard');return {};}catch(e){return actionError(e);}}
export async function checkAnswer(id:string,answer:string):Promise<{correct?:boolean;error?:string}>{try{return await api(`/api/check/${encodeURIComponent(id)}`,{method:'POST',body:{answer}});}catch(e){return actionError(e);}}
export async function saveContent(input:unknown,intent:'draft'|'pending'|'published'){try{await api('/api/studio',{method:'POST',body:{input,intent}});revalidatePath('/','layout');return {};}catch(e){return actionError(e);}}
export async function reviewContent(id:string,status:'draft'|'published'|'archived',note:string){try{await api(`/api/studio/${encodeURIComponent(id)}/review`,{method:'POST',body:{status,note}});revalidatePath('/','layout');return {};}catch(e){return actionError(e);}}
export async function deleteContent(id:string){try{await api(`/api/studio/${encodeURIComponent(id)}`,{method:'DELETE'});revalidatePath('/','layout');return {};}catch(e){return actionError(e);}}
export async function changeRole(id:string,role:'student'|'contributor'|'admin'){try{await api(`/api/members/${encodeURIComponent(id)}`,{method:'POST',body:{role}});revalidatePath('/studio/users');return {};}catch(e){return actionError(e);}}
export async function deleteMember(id:string){try{await api(`/api/members/${encodeURIComponent(id)}`,{method:'DELETE'});revalidatePath('/studio/users');return {};}catch(e){return actionError(e);}}
