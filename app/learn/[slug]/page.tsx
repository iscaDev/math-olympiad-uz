import MemberContentPage from '@/components/member-content-page';
import type {Metadata} from 'next';
import {api} from '@/lib/api';
import type {ContentCard} from '@/lib/platform-types';
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;try{const item=await api<ContentCard>(`/api/public/card/${encodeURIComponent(slug)}`);return{title:item.title,description:item.summary,alternates:{canonical:`/learn/${slug}/`},openGraph:{title:item.title,description:item.summary,url:`/learn/${slug}/`,type:'article'}};}catch{return{title:'Matematik o‘quv materiali'};}}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;return <MemberContentPage slug={slug} section="learn"/>;}
