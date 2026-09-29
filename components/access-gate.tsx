import Link from 'next/link';
import Icon from './icons';
import { T } from './preferences';
export default function AccessGate({ next, title }: { next: string; title?: string }) {
  return <div className="shell"><section className="member-gate"><div className="gate-icon"><Icon name="lock" size={29} weight="duotone" /></div><p className="eyebrow"><T>KASHFIYOTNI DAVOM ETTIRING</T></p><h1><T>Bir hisob. Ko‘proq imkoniyat.</T></h1>{title && <p lang="uz">{title}</p>}<p><T>Masalalar, testlar va o‘quv resurslarini ochish uchun ro‘yxatdan o‘ting. Katalogni esa bemalol ko‘rishingiz mumkin.</T></p><Link className="button primary" href={`/login/?mode=register&next=${encodeURIComponent(next)}`}><T>Ro‘yxatdan o‘tish</T><Icon name="arrow" size={18} /></Link><Link className="text-link" href={`/login/?next=${encodeURIComponent(next)}`}><T>Hisobingiz bormi? Kirish</T></Link></section></div>;
}
