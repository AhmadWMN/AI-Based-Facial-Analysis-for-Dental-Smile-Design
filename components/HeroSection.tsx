"use client";

import { useLanguage } from "@/components/LanguageProvider";

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="print-hidden relative overflow-hidden rounded-3xl border border-brand-100 bg-white/95 p-6 shadow-soft md:p-10">
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand-100 blur-2xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-24 w-72 bg-gradient-to-r from-brand-100/60 to-transparent" />

      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-700">
        {t.hero.eyebrow}
      </p>
      <h1 className="mt-3 text-3xl text-brand-900 md:text-5xl" style={{ fontFamily: "var(--font-heading)" }}>
        {t.hero.title}
      </h1>
      <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 md:text-lg">
        {t.hero.description}
      </p>
      <p className="mt-5 max-w-3xl rounded-xl border border-brand-100 bg-brand-50/70 px-4 py-3 text-sm text-brand-900">
        {t.hero.disclaimer}
      </p>
    </section>
  );
}
