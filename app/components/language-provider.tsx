"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";

export type Language = "id" | "en";

type LanguageContextValue = {
  language: Language;
  t: (id: string, en: string) => string;
  changeLanguage: (next: Language) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("id");

  useEffect(() => {
    const saved = window.localStorage.getItem("pouk-language");
    const timer = window.setTimeout(() => {
      if (saved === "id" || saved === "en") setLanguage(saved);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  function changeLanguage(next: Language) {
    setLanguage(next);
    window.localStorage.setItem("pouk-language", next);
  }

  return (
    <LanguageContext.Provider value={{ language, t: (id, en) => language === "id" ? id : en, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
