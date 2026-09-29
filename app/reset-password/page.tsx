import ResetPasswordForm from '@/components/reset-password-form';
export default async function ResetPassword({searchParams}:{searchParams:Promise<{token?:string}>}){const {token}=await searchParams;return <div className="shell login-page"><div className="login-card"><ResetPasswordForm token={token||''}/></div></div>;}
