import type { Locale } from "@/lib/i18n";
import { faceAnalysisSchema, faceAnalysisTextFormat } from "@/lib/schema";
import type { FaceAnalysisResult } from "@/types/analysis";

const MODEL_NAME = process.env.OPENROUTER_MODEL ?? "google/gemini-2.5-flash";

const SYSTEM_PROMPT = `
You are an educational dental-esthetic assistant for a graduation project demo.
Analyze one FRONT-FACING face photo and provide a descriptive smile-design recommendation.
Do not provide medical diagnosis, disease detection, or treatment claims.
Keep language clear and educational for dental technician students.
If image quality is low, still provide a best-effort educational estimate and mention uncertainty in estheticNotes.
Return only valid JSON matching the requested schema.
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

type OpenRouterChatResponse = {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
  error?: {
    code?: number | string;
    message?: string;
  };
};

function getOpenRouterApiKey(): string {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is missing. Add it to your environment.");
  }

  return apiKey;
}

function buildUserPrompt(locale: Locale): string {
  return [USER_PROMPT_BASE, LOCALE_PROMPT_SUFFIX[locale], FACE_SHAPE_INSTRUCTION].join("\n");
}

function extractOpenRouterText(response: OpenRouterChatResponse): string {
  const text = response.choices?.[0]?.message?.content?.trim();
  if (!text) {
    throw new Error("OpenRouter returned an empty response.");
  }

  return text;
}

function parseJsonObject(jsonText: string): unknown {
  try {
    return JSON.parse(jsonText);
  } catch {
    const match = jsonText.match(/\{[\s\S]*\}/);
    if (!match) {
      throw new Error("OpenRouter response was not valid JSON.");
    }

    return JSON.parse(match[0]);
  }
}

export async function analyzeFaceImageWithOpenRouter(imageDataUrl: string, locale: Locale): Promise<FaceAnalysisResult> {
  const apiKey = getOpenRouterApiKey();

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": process.env.OPENROUTER_SITE_URL ?? "http://localhost:3000",
      "X-Title": process.env.OPENROUTER_APP_NAME ?? "AI Dental Smile Design Assistant"
    },
    body: JSON.stringify({
      model: MODEL_NAME,
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: buildUserPrompt(locale)
            },
            {
              type: "image_url",
              image_url: {
                url: imageDataUrl
              }
            }
          ]
        }
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: faceAnalysisTextFormat.name,
          strict: faceAnalysisTextFormat.strict,
          schema: faceAnalysisTextFormat.schema
        }
      },
      max_tokens: 1200,
      temperature: 0.2
    })
  });

  const payload = (await response.json()) as OpenRouterChatResponse;
  if (!response.ok || payload.error) {
    const message = payload.error?.message ?? `OpenRouter request failed with status ${response.status}.`;
    throw new Error(message);
  }

  const parsed = parseJsonObject(extractOpenRouterText(payload));
  return faceAnalysisSchema.parse(parsed);
}
