"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Icon from "./icons";
import BrandMark from "./brand-mark";
import AuthDialog from "./auth-dialog";
import {authClient} from "@/lib/auth-client";
import { usePreferences } from "./preferences";
import type { Language } from "@/lib/translations";
const links = [
  ["/", "Bosh sahifa"],
  ["/problems", "Masalalar"],
  ["/tests", "Testlar"],
  ["/learn", "O‘rganish"],
  ["/about", "Loyiha haqida"],
];
const languages: { id: Language; name: string; detail: string }[] = [
  { id: "uz", name: "O‘zbekcha", detail: "Uzbek" },
  { id: "ru", name: "Русский", detail: "Russian" },
  { id: "en", name: "English", detail: "English" },
];
export default function Header({emailReady=false}:{emailReady?:boolean}) {
  const {data:session}=authClient.useSession();
  const path = usePathname();
  const { language, theme, setLanguage, toggleTheme, t } = usePreferences();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const languagePanel = useRef<HTMLDivElement>(null);
  const languageTrigger = useRef<HTMLButtonElement>(null);
  const mobileTrigger = useRef<HTMLButtonElement>(null);
  const loginTrigger = useRef<HTMLButtonElement>(null);
  const options = useRef<(HTMLButtonElement | null)[]>([]);
  useEffect(() => {
    setMobileOpen(false);
    setLanguageOpen(false);
  }, [path]);
  useEffect(() => {
    if (!languageOpen) return;
    options.current[languages.findIndex((l) => l.id === language)]?.focus();
    const close = (event: PointerEvent) => {
      if (!languagePanel.current?.contains(event.target as Node))
        setLanguageOpen(false);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [languageOpen, language]);
  function closeAuth() {
    setAuthOpen(false);
    requestAnimationFrame(() => {
      const target = window.matchMedia("(max-width: 600px)").matches
        ? mobileTrigger.current
        : loginTrigger.current;
      target?.focus();
    });
  }
  function openAuth() {
    setMobileOpen(false);
    setLanguageOpen(false);
    setAuthOpen(true);
  }
  return (
    <>
      <header
        className="site-header"
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            if (languageOpen) {
              setLanguageOpen(false);
              languageTrigger.current?.focus();
            } else if (mobileOpen) {
              setMobileOpen(false);
              mobileTrigger.current?.focus();
            }
          }
        }}
      >
        <div className="header-inner">
          <Link href="/" className="brand" onClick={() => setMobileOpen(false)}>
            <BrandMark />
            <span>
              matholympiad<span className="brand-uz">.uz</span>
            </span>
          </Link>
          <nav className="desktop-nav" aria-label={t("Asosiy menyu")}>
            {links.map(([href, label]) => (
              <Link
                key={href}
                href={href}
                aria-current={
                  (href === "/" ? path === "/" : path.startsWith(href))
                    ? "page"
                    : undefined
                }
              >
                {t(label)}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            <Link className="assistant-entry" href="/assistant/" aria-label={t("AI yordamchi")}><Icon name="sparkle" size={18} /><span>AI</span></Link>
            <button
              className="header-tool theme-toggle"
              onClick={toggleTheme}
              aria-label={t(
                theme === "light"
                  ? "Tungi rejimga o‘tish"
                  : "Kunduzgi rejimga o‘tish",
              )}
              title={t(
                theme === "light"
                  ? "Tungi rejimga o‘tish"
                  : "Kunduzgi rejimga o‘tish",
              )}
            >
              <Icon name={theme === "light" ? "moon" : "sun"} size={19} />
            </button>
            <div
              className="language-control"
              ref={languagePanel}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget))
                  setLanguageOpen(false);
              }}
            >
              <button
                className="language-trigger"
                ref={languageTrigger}
                aria-expanded={languageOpen}
                aria-controls="language-options"
                aria-label={`${t("Tilni tanlash")}: ${languages.find((l) => l.id === language)?.name}`}
                onClick={() => setLanguageOpen(!languageOpen)}
              >
                <Icon name="globe" size={18} />
                <span>{language.toUpperCase()}</span>
                <Icon name="down" size={12} />
              </button>
              {languageOpen && (
                <div
                  className="language-popover"
                  id="language-options"
                  role="group"
                  aria-label={t("Tilni tanlash")}
                  onKeyDown={(event) => {
                    if (
                      !["ArrowDown", "ArrowUp", "Home", "End"].includes(
                        event.key,
                      )
                    )
                      return;
                    event.preventDefault();
                    const index = options.current.findIndex(
                      (option) => option === document.activeElement,
                    );
                    const next =
                      event.key === "Home"
                        ? 0
                        : event.key === "End"
                          ? 2
                          : (index + (event.key === "ArrowDown" ? 1 : 2)) % 3;
                    options.current[next]?.focus();
                  }}
                >
                  <p>{t("Sayt tili")}</p>
                  {languages.map((l, i) => (
                    <button
                      key={l.id}
                      ref={(node) => {
                        options.current[i] = node;
                      }}
                      aria-pressed={language === l.id}
                      lang={l.id}
                      onClick={() => {
                        setLanguage(l.id);
                        setLanguageOpen(false);
                        languageTrigger.current?.focus();
                      }}
                    >
                      <span>
                        <strong>{l.name}</strong>
                        <small>{l.detail}</small>
                      </span>
                      {language === l.id && <Icon name="check" size={18} />}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <span className="header-divider" aria-hidden="true" />
            {session ? <Link className="header-login" href="/dashboard/"><Icon name="user" size={17}/><span>{t("Kabinetim")}</span></Link> : <button
              ref={loginTrigger}
              className="header-login"
              onClick={openAuth}
            >
              <span>{t("Kirish")}</span>
              <Icon name="login" size={17} />
            </button>}
            <button
              ref={mobileTrigger}
              className="mobile-toggle header-tool"
              aria-label={t(mobileOpen ? "Menyuni yopish" : "Menyuni ochish")}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              onClick={() => {
                setMobileOpen(!mobileOpen);
                setLanguageOpen(false);
              }}
            >
              <Icon name={mobileOpen ? "close" : "menu"} size={21} />
            </button>
          </div>
        </div>
        {mobileOpen && (
          <nav
            id="mobile-nav"
            aria-label={t("Mobil menyu")}
            className="mobile-nav"
          >
            {links.map(([href, label]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                aria-current={
                  (href === "/" ? path === "/" : path.startsWith(href))
                    ? "page"
                    : undefined
                }
              >
                {t(label)}
                <Icon name="arrow" size={17} />
              </Link>
            ))}
            {session ? <Link href="/dashboard/">{t("Kabinetim")}</Link> : <button className="mobile-account" onClick={openAuth}>
              <Icon name="user" size={18} />
              {t("Kirish / Ro‘yxatdan o‘tish")}
              <Icon name="arrow" size={17} />
            </button>}
          </nav>
        )}
      </header>
      <AuthDialog open={authOpen} onClose={closeAuth} emailReady={emailReady} />
    </>
  );
}
