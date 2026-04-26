"use client";

import { useLanguage } from "@/components/LanguageProvider";

export function HowItWorks() {
  const { t } = useLanguage();

  return (
    <section id="how-it-works" className="print-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-soft md:p-8">
      <h2 className="section-title" style={{ fontFamily: "var(--font-heading)" }}>
        {t.howItWorks.title}
      </h2>
      <p className="section-subtitle">{t.howItWorks.subtitle}</p>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {t.howItWorks.steps.map((step) => (
          <article key={step.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <h3 className="text-sm font-semibold text-brand-800">{step.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{step.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
