import { T } from "@/components/preferences";
import type { Metadata } from "next";
import Link from "next/link";
import PreferencesProvider from "@/components/preferences";
import {api} from "@/lib/api";
import Header from "@/components/header";
import BrandMark from "@/components/brand-mark";
import NavigationIndicator from "@/components/navigation-indicator";
import Icon from "@/components/icons";
import "@fontsource-variable/manrope";
import "katex/dist/katex.min.css";
import "./globals.css";
import "./platform.css";
export const metadata: Metadata = {
  title: {
    default: "Math Olympiad Uz — matematikani kashf eting",
    template: "%s | Math Olympiad Uz",
  },
  description:
    "O‘zbek tilida matematik masalalar, vizual izohlar va olimpiadalarga tayyorgarlik. Matematika bilan birga o‘sing.",
};
export default async function Layout({ children }: { children: React.ReactNode }) {
  const settings=await api<{emailReady:boolean}>('/api/public/config').catch(()=>({emailReady:false}));
  return (
    <html
      lang="uz"
      data-theme="light"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{document.documentElement.dataset.theme=localStorage.getItem("matholympiad-theme")==="dark"?"dark":"light";}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <PreferencesProvider>
          <NavigationIndicator />
          <a className="skip-link" href="#main">
            <T>{"Asosiy mazmunga o‘tish"}</T>
          </a>
          <Header emailReady={settings.emailReady} />
          <main id="main">{children}</main>
          {process.env.NODE_ENV === "development" && <div className="shell" style={{paddingBottom:20}}><Link className="text-link" href="/preview/"><T>Panel dizaynlarini ko‘rish →</T></Link></div>}
          <footer className="footer">
            <div className="shell footer-top">
              <div>
                <Link className="brand" href="/">
                  <BrandMark />
                  <span>
                    matholympiad<span className="brand-uz">.uz</span>
                  </span>
                </Link>
                <p>
                  <T>{"Bir savoldan boshlanadi."}</T>
                  <br />
                  <T>{"Yangi fikrga aylanadi."}</T>
                </p>
              </div>
              <div>
                <h2>
                  <T>{"Kashf eting"}</T>
                </h2>
                <Link href="/problems">
                  <T>{"Masalalar kutubxonasi"}</T>
                </Link>
                <Link href="/learn">
                  <T>{"Qisqa darslar"}</T>
                </Link>
                <Link href="/tests">
                  <T>{"Testlar"}</T>
                </Link>
              </div>
              <div>
                <h2>
                  <T>{"Loyiha"}</T>
                </h2>
                <Link href="/about">
                  <T>{"Maqsadimiz"}</T>
                </Link>
                <Link href="/about#questions">
                  <T>{"Ko‘p so‘raladigan savollar"}</T>
                </Link>
                <span className="footer-note">
                  <T>{"O‘zbek tilida, qiziquvchilar uchun."}</T>
                </span>
              </div>
              <div>
                <h2><T>{"Aloqa"}</T></h2>
                <a href="https://t.me/math_olympiaduz" target="_blank" rel="noreferrer" className="footer-contact">
                  <Icon name="telegram" size={16} />
                  <span><T>{"Telegram kanali"}</T></span>
                </a>
                <a href="mailto:matholympiaduz.team@gmail.com" className="footer-contact">
                  <Icon name="email" size={16} />
                  <span><T>{"Savol va takliflar"}</T></span>
                </a>
              </div>
            </div>
            <div className="shell footer-bottom">
              <span>© 2026 Math Olympiad Uz</span>
              <span>
                <T>{"Matematika bilan birga o‘sing"}</T>
              </span>
              <a href="#main">
                <T>{"Yuqoriga qaytish ↑"}</T>
              </a>
            </div>
          </footer>
        </PreferencesProvider>
      </body>
    </html>
  );
}
