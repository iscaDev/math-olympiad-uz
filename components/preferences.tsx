"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { translate, type Language } from "@/lib/translations";
type Theme = "light" | "dark";
type Preferences = {
  language: Language;
  theme: Theme;
  setLanguage: (value: Language) => void;
  toggleTheme: () => void;
  t: (value: string) => string;
};
const Context = createContext<Preferences | null>(null);
const languageKey = "matholympiad-language";
const themeKey = "matholympiad-theme";
export default function PreferencesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [language, updateLanguage] = useState<Language>("uz");
  const [theme, updateTheme] = useState<Theme>("light");
  useEffect(() => {
    updateTheme(
      document.documentElement.dataset.theme === "dark" ? "dark" : "light",
    );
    try {
      const saved = localStorage.getItem(languageKey);
      if (saved === "uz" || saved === "ru" || saved === "en") {
        updateLanguage(saved);
        document.documentElement.lang = saved;
      }
    } catch {}
  }, []);
  function setLanguage(value: Language) {
    updateLanguage(value);
    document.documentElement.lang = value;
    try {
      localStorage.setItem(languageKey, value);
    } catch {}
  }
  function toggleTheme() {
    const next = theme === "light" ? "dark" : "light";
    updateTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(themeKey, next);
    } catch {}
  }
  return (
    <Context.Provider
      value={{
        language,
        theme,
        setLanguage,
        toggleTheme,
        t: (value) => translate(value, language),
      }}
    >
      {children}
    </Context.Provider>
  );
}
export function usePreferences() {
  const context = useContext(Context);
  if (!context) throw new Error("PreferencesProvider is required");
  return context;
}
export function T({ children }: { children: string | number }) {
  const { t } = usePreferences();
  return <>{typeof children === "string" ? t(children) : children}</>;
}
export function ContentLanguageNotice() {
  const { language, t } = usePreferences();
  return language === "uz" ? null : (
    <p className="content-language-notice">
      {t("Interfeys siz tanlagan tilda. Kontent hozircha o‘zbek tilida.")}
    </p>
  );
}
