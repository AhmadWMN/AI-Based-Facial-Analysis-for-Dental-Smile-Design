export type FaceShape = "Oval" | "Round" | "Square" | "Rectangular" | "Triangular";

export interface FaceAnalysisResult {
  faceShape: FaceShape;
  facialProportion: string;
  facialSymmetry: string;
  jawLine: string;
  lipLine: string;
  suggestedToothForm: string;
  suggestedToothColor: string;
  suggestedToothSize: string;
  smileLineRecommendation: string;
  midlineRecommendation: string;
  estheticNotes: string;
}

export interface AnalyzeApiSuccessResponse {
  success: true;
  source: "openai" | "gemini" | "openrouter" | "mock";
  analyzedAt: string;
  message?: string;
  data: FaceAnalysisResult;
}

export interface AnalyzeApiErrorResponse {
  success: false;
  error: string;
}

export type AnalyzeApiResponse = AnalyzeApiSuccessResponse | AnalyzeApiErrorResponse;
