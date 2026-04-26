"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import { useLanguage } from "@/components/LanguageProvider";
import { PrintableReport } from "@/components/PrintableReport";
import { ResultsDashboard } from "@/components/ResultsDashboard";
import type { AnalyzeApiResponse, AnalyzeApiSuccessResponse } from "@/types/analysis";

export function UploadAnalysisSection() {
  const { locale, t } = useLanguage();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [apiResult, setApiResult] = useState<AnalyzeApiSuccessResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const hasResult = useMemo(() => Boolean(apiResult), [apiResult]);

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const nextFile = event.target.files?.[0] ?? null;

    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setApiResult(null);
    setErrorMessage("");
    setSelectedFile(nextFile);
    setPreviewUrl(nextFile ? URL.createObjectURL(nextFile) : "");
  }

  async function runAnalysis() {
    if (!selectedFile) {
      setErrorMessage(t.upload.errors.selectImage);
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("locale", locale);

    try {
      setIsLoading(true);
      setErrorMessage("");

      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData
      });

      const payload = (await response.json()) as AnalyzeApiResponse;
      if (!response.ok || !payload.success) {
        const error = payload.success ? t.upload.errors.requestFailed : payload.error;
        throw new Error(error);
      }

      setApiResult(payload);
    } catch (error) {
      const message = error instanceof Error ? error.message : t.upload.errors.unexpectedClientError;
      setErrorMessage(message);
      setApiResult(null);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section id="analysis" className="space-y-6" aria-busy={isLoading}>
      <div className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft md:p-8">
          <h2 className="section-title" style={{ fontFamily: "var(--font-heading)" }}>
            {t.upload.title}
          </h2>
          <p className="section-subtitle">{t.upload.subtitle}</p>

          <label
            htmlFor="face-upload"
            className="mt-6 block rounded-2xl border border-dashed border-brand-300 bg-brand-50/70 px-4 py-6 text-center text-sm text-brand-800"
          >
            {t.upload.uploadLabel}
            <input
              id="face-upload"
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif"
              onChange={handleImageChange}
              disabled={isLoading}
              className="mt-3 block w-full cursor-pointer rounded-lg border border-brand-200 bg-white p-2 text-xs text-slate-600"
            />
          </label>

          <button
            type="button"
            onClick={runAnalysis}
            disabled={isLoading}
            className="mt-5 inline-flex items-center rounded-xl bg-brand-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-800 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {isLoading ? (
              <span className="inline-flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/35 border-t-white" />
                {t.upload.loadingButton}
              </span>
            ) : (
              t.upload.startButton
            )}
          </button>

          {isLoading ? (
            <div className="mt-4 rounded-xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm text-brand-900">
              <p className="font-medium">{t.upload.progressTitle}</p>
              <p className="mt-1 text-brand-800">{t.upload.progressDescription}</p>
            </div>
          ) : null}

          {errorMessage ? (
            <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{errorMessage}</p>
          ) : null}

          {apiResult?.message ? (
            <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              {apiResult.message}
            </p>
          ) : null}
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft md:p-8">
          <h3 className="text-xl font-semibold text-brand-900" style={{ fontFamily: "var(--font-heading)" }}>
            {t.upload.previewTitle}
          </h3>
          <div className="mt-4 flex min-h-[260px] items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 p-4">
            {previewUrl && !isLoading ? (
              <Image
                src={previewUrl}
                alt={t.upload.previewAlt}
                width={420}
                height={420}
                className="max-h-[360px] w-auto rounded-xl object-contain"
                unoptimized
              />
            ) : previewUrl && isLoading ? (
              <div className="w-full max-w-[420px] rounded-xl border border-brand-200 bg-white p-5 text-center">
                <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-brand-300 border-t-brand-700" />
                <p className="mt-3 text-sm font-medium text-brand-900">{t.upload.previewLoadingTitle}</p>
                <p className="mt-1 text-xs text-slate-600">{t.upload.previewLoadingDescription}</p>
              </div>
            ) : (
              <p className="text-sm text-slate-500">{t.upload.noImageSelected}</p>
            )}
          </div>
        </article>
      </div>

      {hasResult && apiResult ? (
        <div className="space-y-6">
          <ResultsDashboard analysis={apiResult.data} source={apiResult.source} analyzedAt={apiResult.analyzedAt} />
          <PrintableReport analysis={apiResult.data} analyzedAt={apiResult.analyzedAt} />
        </div>
      ) : null}
    </section>
  );
}
