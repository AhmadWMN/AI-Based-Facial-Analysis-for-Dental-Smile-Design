"use client";

import { useLanguage } from "@/components/LanguageProvider";
import type { FaceAnalysisResult } from "@/types/analysis";

interface PrintableReportProps {
  analysis: FaceAnalysisResult;
  analyzedAt: string;
}

export function PrintableReport({ analysis, analyzedAt }: PrintableReportProps) {
  const { dateLocale, t } = useLanguage();

  const rows: Array<{ label: string; value: string }> = [
    { label: t.results.cards.faceShape, value: t.results.faceShapeValues[analysis.faceShape] },
    { label: t.results.cards.facialProportion, value: analysis.facialProportion },
    { label: t.results.cards.facialSymmetry, value: analysis.facialSymmetry },
    { label: t.results.cards.jawLine, value: analysis.jawLine },
    { label: t.results.cards.lipLine, value: analysis.lipLine },
    { label: t.results.cards.suggestedToothForm, value: analysis.suggestedToothForm },
    { label: t.results.cards.suggestedToothColor, value: analysis.suggestedToothColor },
    { label: t.results.cards.suggestedToothSize, value: analysis.suggestedToothSize },
    { label: t.results.cards.smileLineRecommendation, value: analysis.smileLineRecommendation },
    { label: t.results.cards.midlineRecommendation, value: analysis.midlineRecommendation },
    { label: t.results.notesTitle, value: analysis.estheticNotes }
  ];

  return (
    <section className="print-surface rounded-3xl border border-slate-200 bg-white p-6 shadow-soft md:p-8">
      <div className="print-hidden mb-4 flex justify-end">
        <button
          type="button"
          onClick={() => window.print()}
          className="rounded-xl bg-brand-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-800"
        >
          {t.report.printButton}
        </button>
      </div>

      <header className="border-b border-slate-200 pb-4">
        <h2 className="text-2xl text-brand-900" style={{ fontFamily: "var(--font-heading)" }}>
          {t.report.title}
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          {t.report.generatedOn} {new Date(analyzedAt).toLocaleString(dateLocale)}
        </p>
      </header>

      <div className="mt-5 space-y-3">
        {rows.map((row) => (
          <article key={row.label} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <h3 className="text-sm font-semibold text-brand-800">{row.label}</h3>
            <p className="mt-1 text-sm leading-6 text-slate-700">{row.value}</p>
          </article>
        ))}
      </div>

      <footer className="mt-6 rounded-xl border border-brand-100 bg-brand-50 p-4 text-xs leading-5 text-brand-900">
        {t.report.disclaimer}
      </footer>
    </section>
  );
}
