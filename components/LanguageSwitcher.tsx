"use client";

import { useLanguage } from "@/components/LanguageProvider";

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useLanguage();

  return (
    <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-1 shadow-soft">
      <span className="px-2 text-xs font-semibold uppercase tracking-wide text-slate-500">{t.language.label}</span>
      <button
        type="button"
        onClick={() => setLocale("en")}
        aria-label={t.language.switchToEnglish}
        className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
          locale === "en" ? "bg-brand-700 text-white" : "text-slate-700 hover:bg-slate-100"
        }`}
      >
        {t.language.english}
      </button>
      <button
        type="button"
        onClick={() => setLocale("ar")}
        aria-label={t.language.switchToArabic}
        className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
          locale === "ar" ? "bg-brand-700 text-white" : "text-slate-700 hover:bg-slate-100"
        }`}
      >
        {t.language.arabic}
      </button>
    </div>
  );
}
