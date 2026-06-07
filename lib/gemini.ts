import type { Locale } from "@/lib/i18n";
import { faceAnalysisSchema, geminiFaceAnalysisResponseSchema } from "@/lib/schema";
import type { FaceAnalysisResult } from "@/types/analysis";

const MODEL_NAME = process.env.GEMINI_MODEL ?? "gemini-2.0-flash";

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
- Suggested tooth color/shade range for a natural smile design
- Suggested anterior tooth size/proportions
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

type GeminiGenerateContentResponse = {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
    finishReason?: string;
  }>;
  error?: {
    code?: number;
    message?: string;
    status?: string;
  };
};

function getGeminiApiKey(): string {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is missing. Add it to your environment.");
  }

  return apiKey;
}

function buildUserPrompt(locale: Locale): string {
  return [USER_PROMPT_BASE, LOCALE_PROMPT_SUFFIX[locale], FACE_SHAPE_INSTRUCTION].join("\n");
}

function parseDataUrl(imageDataUrl: string): { mimeType: string; data: string } {
  const match = imageDataUrl.match(/^data:([^;]+);base64,(.+)$/);
  const mimeType = match?.[1];
  const data = match?.[2];

  if (!mimeType || !data) {
    throw new Error("Invalid image data URL.");
  }

  return { mimeType, data };
}

function extractGeminiText(response: GeminiGenerateContentResponse): string {
  const text = response.candidates?.[0]?.content?.parts?.map((part) => part.text ?? "").join("").trim();
  if (!text) {
    const finishReason = response.candidates?.[0]?.finishReason;
    throw new Error(finishReason ? `Gemini returned no text. Finish reason: ${finishReason}` : "Gemini returned no text.");
  }

  return text;
}

export async function analyzeFaceImageWithGemini(imageDataUrl: string, locale: Locale): Promise<FaceAnalysisResult> {
  const apiKey = getGeminiApiKey();
  const { mimeType, data } = parseDataUrl(imageDataUrl);
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${apiKey}`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      system_instruction: {
        parts: [{ text: SYSTEM_PROMPT }]
      },
      contents: [
        {
          role: "user",
          parts: [
            { text: buildUserPrompt(locale) },
            {
              inline_data: {
                mime_type: mimeType,
                data
              }
            }
          ]
        }
      ],
      generationConfig: {
        response_mime_type: "application/json",
        response_schema: geminiFaceAnalysisResponseSchema
      }
    })
  });

  const payload = (await response.json()) as GeminiGenerateContentResponse;
  if (!response.ok || payload.error) {
    const message = payload.error?.message ?? `Gemini request failed with status ${response.status}.`;
    throw new Error(message);
  }

  const jsonText = extractGeminiText(payload);
  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonText);
  } catch {
    throw new Error("Gemini response was not valid JSON.");
  }

  return faceAnalysisSchema.parse(parsed);
}
