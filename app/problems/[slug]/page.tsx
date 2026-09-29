import MemberContentPage from '@/components/member-content-page';
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;return <MemberContentPage slug={slug} section="problems"/>;}
