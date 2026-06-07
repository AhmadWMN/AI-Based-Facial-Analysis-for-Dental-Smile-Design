"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { ResultCard } from "@/components/ResultCard";
import type { FaceAnalysisResult } from "@/types/analysis";

interface ResultsDashboardProps {
  analysis: FaceAnalysisResult;
  source: "openai" | "gemini" | "openrouter" | "mock";
  analyzedAt: string;
}

export function ResultsDashboard({ analysis, source, analyzedAt }: ResultsDashboardProps) {
  const { dateLocale, t } = useLanguage();

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="section-title" style={{ fontFamily: "var(--font-heading)" }}>
          {t.results.title}
        </h2>
        <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
          {t.results.sourceLabel}: {t.results.sourceValues[source]}
        </div>
      </div>

      <p className="mt-2 text-sm text-slate-500">
        {t.results.analyzedAt} {new Date(analyzedAt).toLocaleString(dateLocale)}
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <ResultCard title={t.results.cards.faceShape} value={t.results.faceShapeValues[analysis.faceShape]} />
        <ResultCard title={t.results.cards.facialProportion} value={analysis.facialProportion} />
        <ResultCard title={t.results.cards.facialSymmetry} value={analysis.facialSymmetry} />
        <ResultCard title={t.results.cards.jawLine} value={analysis.jawLine} />
        <ResultCard title={t.results.cards.lipLine} value={analysis.lipLine} />
        <ResultCard title={t.results.cards.suggestedToothForm} value={analysis.suggestedToothForm} />
        <ResultCard title={t.results.cards.suggestedToothColor} value={analysis.suggestedToothColor} />
        <ResultCard title={t.results.cards.suggestedToothSize} value={analysis.suggestedToothSize} />
        <ResultCard title={t.results.cards.smileLineRecommendation} value={analysis.smileLineRecommendation} />
        <ResultCard title={t.results.cards.midlineRecommendation} value={analysis.midlineRecommendation} />
      </div>

      <div className="mt-4 rounded-2xl border border-brand-100 bg-brand-50 p-4">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-brand-700">{t.results.notesTitle}</h3>
        <p className="mt-2 text-sm leading-6 text-brand-900">{analysis.estheticNotes}</p>
      </div>
    </section>
  );
}
