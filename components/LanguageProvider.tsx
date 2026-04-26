"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

import {
  DEFAULT_LOCALE,
  getDateLocale,
  getLocaleDirection,
  normalizeLocale,
  translations,
  type Locale,
  type TranslationDictionary
} from "@/lib/i18n";

const STORAGE_KEY = "ui-locale";

type LanguageContextValue = {
  locale: Locale;
  direction: "ltr" | "rtl";
  dateLocale: string;
  t: TranslationDictionary;
  setLocale: (nextLocale: Locale) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [locale, setLocale] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setLocale(normalizeLocale(stored));
      return;
    }

    const browserLocale = navigator.language.toLowerCase();
    if (browserLocale.startsWith("ar")) {
      setLocale("ar");
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, locale);
    document.documentElement.lang = locale;
    document.documentElement.dir = getLocaleDirection(locale);
  }, [locale]);

  const value = useMemo<LanguageContextValue>(() => {
    return {
      locale,
      direction: getLocaleDirection(locale),
      dateLocale: getDateLocale(locale),
      t: translations[locale],
      setLocale
    };
  }, [locale]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider.");
  }

  return context;
}
