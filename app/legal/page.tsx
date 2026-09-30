import type { Metadata } from 'next';
import LegalPage from '@/components/legal-page';

export const metadata:Metadata={title:'Maxfiylik va foydalanish shartlari',description:'Math Olympiad Uz maxfiylik siyosati, foydalanish va mualliflik huquqi shartlari.'};
export default function Page(){return <LegalPage/>;}
