import OpenAI from "openai";

import type { Locale } from "@/lib/i18n";
import { faceAnalysisSchema, faceAnalysisTextFormat } from "@/lib/schema";
import type { FaceAnalysisResult } from "@/types/analysis";

const MODEL_NAME = process.env.OPENAI_MODEL ?? "gpt-4.1-mini";

const SYSTEM_PROMPT = `
You are an educational dental-esthetic assistant for a graduation project demo.
Analyze one FRONT-FACING face photo and provide a descriptive smile-design recommendation.
Do not provide medical diagnosis, disease detection, or treatment claims.
Keep language clear and educational for dental technician students.
If image quality is low, still provide a best-effort educational estimate and mention uncertainty in estheticNotes.
`.trim();

const USER_PROMPT_BASE = `
Analyze this face image for dental smile-design learning purposes.
Return only the JSON fields requested by the schema.
Focus on:
- Face shape classification
- Facial proportion
- Facial symmetry
- Jaw line
- Lip line
- Suggested anterior tooth form
- Smile line recommendation
- Midline recommendation
- General esthetic notes
`.trim();

const LOCALE_PROMPT_SUFFIX: Record<Locale, string> = {
  en: "Write all descriptive text fields in English.",
  ar: "اكتب جميع الحقول الوصفية النصية باللغة العربية الفصحى الواضحة."
};

const FACE_SHAPE_INSTRUCTION =
  "Keep faceShape in English and choose exactly one of: Oval, Round, Square, Rectangular, Triangular.";

function getOpenAIClient(): OpenAI {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is missing. Add it to your environment.");
  }

  return new OpenAI({ apiKey });
}

function buildUserPrompt(locale: Locale): string {
  return [USER_PROMPT_BASE, LOCALE_PROMPT_SUFFIX[locale], FACE_SHAPE_INSTRUCTION].join("\n");
}

export async function analyzeFaceImageWithOpenAI(imageDataUrl: string, locale: Locale): Promise<FaceAnalysisResult> {
  const openai = getOpenAIClient();

  const response = await openai.responses.create({
    model: MODEL_NAME,
    input: [
      {
        role: "system",
        content: [{ type: "input_text", text: SYSTEM_PROMPT }]
      },
      {
        role: "user",
        content: [
          { type: "input_text", text: buildUserPrompt(locale) },
          { type: "input_image", image_url: imageDataUrl, detail: "high" }
        ]
      }
    ],
    text: {
      format: faceAnalysisTextFormat
    }
  });

  const jsonText = response.output_text?.trim();
  if (!jsonText) {
    throw new Error("The model returned an empty response.");
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonText);
  } catch {
    throw new Error("The model response was not valid JSON.");
  }

  return faceAnalysisSchema.parse(parsed);
}

export const openAIPromptExample = {
  system: SYSTEM_PROMPT,
  user: USER_PROMPT_BASE
};
