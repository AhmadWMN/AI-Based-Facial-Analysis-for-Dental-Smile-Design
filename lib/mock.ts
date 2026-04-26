import type { FaceAnalysisResult } from "@/types/analysis";
import type { Locale } from "@/lib/i18n";

const fallbackMockAnalysisEn: FaceAnalysisResult = {
  faceShape: "Oval",
  facialProportion:
    "Upper, middle, and lower facial thirds appear generally balanced, with a slightly dominant middle third.",
  facialSymmetry:
    "Mild right-left asymmetry is visible around the cheek and oral commissure area, acceptable for esthetic planning.",
  jawLine:
    "Jaw contour appears smooth with moderate definition, supporting a soft-to-balanced restorative design.",
  lipLine:
    "Average lip mobility with a medium smile reveal; upper lip line supports conservative incisal exposure.",
  suggestedToothForm:
    "Use a softly contoured oval-to-ovoid anterior tooth form to harmonize with facial curvature.",
  smileLineRecommendation:
    "Follow a gentle convex smile arc parallel to the lower lip to improve visual harmony.",
  midlineRecommendation:
    "Keep dental midline close to facial midline; minor adjustment can prioritize lip philtrum alignment.",
  estheticNotes:
    "This is a demo educational estimate for dental smile design training. Final restorative planning should combine clinical exam, photographs, and patient-specific functional and esthetic preferences."
};

const fallbackMockAnalysisAr: FaceAnalysisResult = {
  faceShape: "Oval",
  facialProportion: "تبدو أثلاث الوجه العلوية والوسطى والسفلية متوازنة بشكل عام، مع سيطرة طفيفة للثلث الأوسط.",
  facialSymmetry:
    "يوجد عدم تناظر بسيط بين الجانبين الأيمن والأيسر حول منطقة الخد وزاوية الفم، وهو مقبول في التخطيط الجمالي.",
  jawLine: "يبدو خط الفك ناعما مع تحديد متوسط، مما يدعم تصميما ترميميا ناعما إلى متوازن.",
  lipLine: "حركة الشفاه متوسطة مع انكشاف ابتسامة معتدل؛ ويدعم خط الشفة العلوية انكشافا تحفظيا لحافة القواطع.",
  suggestedToothForm: "يوصى بشكل أسنان أمامية بيضاوي ناعم ليتناغم مع انحناءات الوجه.",
  smileLineRecommendation: "اتبع قوس ابتسامة محدبا لطيفا موازيا للشفة السفلية لتحسين الانسجام البصري.",
  midlineRecommendation: "اجعل الخط المتوسط السني قريبا من الخط المتوسط للوجه، مع تعديل بسيط حسب محاذاة النثرة الشفوية.",
  estheticNotes:
    "هذا تقدير تعليمي تجريبي لتدريب تصميم الابتسامة السنية. يجب أن يجمع التخطيط الترميمي النهائي بين الفحص السريري والصور وتفضيلات المريض الوظيفية والجمالية."
};

export function getFallbackMockAnalysis(locale: Locale): FaceAnalysisResult {
  return locale === "ar" ? fallbackMockAnalysisAr : fallbackMockAnalysisEn;
}
