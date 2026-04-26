import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { normalizeLocale, translations } from "@/lib/i18n";
import { getFallbackMockAnalysis } from "@/lib/mock";
import { analyzeFaceImageWithOpenAI } from "@/lib/openai";
import type { AnalyzeApiResponse } from "@/types/analysis";

export const runtime = "nodejs";

const MAX_FILE_SIZE_BYTES = 8 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const DEMO_MODE_ENABLED = process.env.DEMO_MODE === "true";

type OpenAIErrorShape = {
  status?: number;
  code?: string;
  type?: string;
  message?: string;
  error?: {
    code?: string;
    message?: string;
    param?: string | null;
    type?: string;
  };
};

function buildErrorResponse(message: string, status = 400) {
  return NextResponse.json<AnalyzeApiResponse>(
    {
      success: false,
      error: message
    },
    { status }
  );
}

function getFallbackMessage(error: unknown, locale: "en" | "ar"): string {
  const messages = translations[locale].api;
  const hasApiKey = Boolean(process.env.OPENAI_API_KEY);
  if (!hasApiKey) {
    return messages.liveMissingApiKey;
  }

  const maybeOpenAIError = (error ?? {}) as OpenAIErrorShape;
  const code = maybeOpenAIError.code ?? maybeOpenAIError.error?.code;
  const status = maybeOpenAIError.status;
  const message = maybeOpenAIError.message ?? maybeOpenAIError.error?.message;

  if (code === "insufficient_quota") {
    return messages.liveNoQuota;
  }

  if (status === 401) {
    return messages.liveUnauthorized;
  }

  if (status === 429) {
    return messages.liveRateLimited;
  }

  if (code === "invalid_value" || status === 400) {
    return messages.liveInvalidImage;
  }

  if (message) {
    return `${messages.liveFailedPrefix} ${message}`;
  }

  return messages.liveUnavailable;
}

export async function POST(request: Request) {
  let locale: "en" | "ar" = "en";

  try {
    const formData = await request.formData();
    locale = normalizeLocale(formData.get("locale"));
    const messages = translations[locale].api;
    const image = formData.get("image");

    if (!(image instanceof File)) {
      return buildErrorResponse(messages.noImageUploaded);
    }

    if (!ACCEPTED_IMAGE_TYPES.has(image.type)) {
      return buildErrorResponse(messages.unsupportedType);
    }

    if (image.size > MAX_FILE_SIZE_BYTES) {
      return buildErrorResponse(messages.imageTooLarge);
    }

    if (DEMO_MODE_ENABLED) {
      return NextResponse.json<AnalyzeApiResponse>({
        success: true,
        source: "mock",
        analyzedAt: new Date().toISOString(),
        message: messages.demoMode,
        data: getFallbackMockAnalysis(locale)
      });
    }

    const buffer = Buffer.from(await image.arrayBuffer());
    const imageDataUrl = `data:${image.type};base64,${buffer.toString("base64")}`;

    try {
      const analysis = await analyzeFaceImageWithOpenAI(imageDataUrl, locale);

      return NextResponse.json<AnalyzeApiResponse>({
        success: true,
        source: "openai",
        analyzedAt: new Date().toISOString(),
        data: analysis
      });
    } catch (error) {
      console.error("OpenAI analysis failed, returning fallback mock data.", error);

      return NextResponse.json<AnalyzeApiResponse>({
        success: true,
        source: "mock",
        analyzedAt: new Date().toISOString(),
        message: getFallbackMessage(error, locale),
        data: getFallbackMockAnalysis(locale)
      });
    }
  } catch (error) {
    const messages = translations[locale].api;

    if (error instanceof ZodError) {
      return buildErrorResponse(messages.responseValidationFailed, 422);
    }

    console.error("Unexpected analyze route error:", error);
    return buildErrorResponse(messages.unexpectedServerError, 500);
  }
}
