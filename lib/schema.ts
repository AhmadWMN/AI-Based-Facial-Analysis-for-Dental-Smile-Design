import { z } from "zod";

export const faceShapeEnum = z.enum(["Oval", "Round", "Square", "Rectangular", "Triangular"]);

export const faceAnalysisSchema = z.object({
  faceShape: faceShapeEnum,
  facialProportion: z.string().min(3),
  facialSymmetry: z.string().min(3),
  jawLine: z.string().min(3),
  lipLine: z.string().min(3),
  suggestedToothForm: z.string().min(3),
  suggestedToothColor: z.string().min(3),
  suggestedToothSize: z.string().min(3),
  smileLineRecommendation: z.string().min(3),
  midlineRecommendation: z.string().min(3),
  estheticNotes: z.string().min(10)
});

export const faceAnalysisTextFormat = {
  type: "json_schema" as const,
  name: "dental_smile_design_analysis",
  strict: true,
  schema: {
    type: "object",
    additionalProperties: false,
    properties: {
      faceShape: {
        type: "string",
        enum: ["Oval", "Round", "Square", "Rectangular", "Triangular"]
      },
      facialProportion: { type: "string" },
      facialSymmetry: { type: "string" },
      jawLine: { type: "string" },
      lipLine: { type: "string" },
      suggestedToothForm: { type: "string" },
      suggestedToothColor: { type: "string" },
      suggestedToothSize: { type: "string" },
      smileLineRecommendation: { type: "string" },
      midlineRecommendation: { type: "string" },
      estheticNotes: { type: "string" }
    },
    required: [
      "faceShape",
      "facialProportion",
      "facialSymmetry",
      "jawLine",
      "lipLine",
      "suggestedToothForm",
      "suggestedToothColor",
      "suggestedToothSize",
      "smileLineRecommendation",
      "midlineRecommendation",
      "estheticNotes"
    ]
  }
};

export const geminiFaceAnalysisResponseSchema = {
  type: "OBJECT",
  properties: {
    faceShape: {
      type: "STRING",
      enum: ["Oval", "Round", "Square", "Rectangular", "Triangular"]
    },
    facialProportion: { type: "STRING" },
    facialSymmetry: { type: "STRING" },
    jawLine: { type: "STRING" },
    lipLine: { type: "STRING" },
    suggestedToothForm: { type: "STRING" },
    suggestedToothColor: { type: "STRING" },
    suggestedToothSize: { type: "STRING" },
    smileLineRecommendation: { type: "STRING" },
    midlineRecommendation: { type: "STRING" },
    estheticNotes: { type: "STRING" }
  },
  required: [
    "faceShape",
    "facialProportion",
    "facialSymmetry",
    "jawLine",
    "lipLine",
    "suggestedToothForm",
    "suggestedToothColor",
    "suggestedToothSize",
    "smileLineRecommendation",
    "midlineRecommendation",
    "estheticNotes"
  ]
} as const;
