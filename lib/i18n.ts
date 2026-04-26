export type Locale = "en" | "ar";

export const DEFAULT_LOCALE: Locale = "en";

export function normalizeLocale(value: unknown): Locale {
  return value === "ar" ? "ar" : "en";
}

export function getLocaleDirection(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}

export function getDateLocale(locale: Locale): string {
  return locale === "ar" ? "ar" : "en-US";
}

export const translations = {
  en: {
    language: {
      label: "Language",
      english: "English",
      arabic: "Arabic",
      switchToEnglish: "Switch to English",
      switchToArabic: "Switch to Arabic"
    },
    hero: {
      eyebrow: "Graduation Demo Project",
      title: "AI Dental Smile Design Assistant",
      description:
        "A learning-focused web application for dental technician students. Upload a front face photo, receive educational smile-design guidance, and export a print-friendly esthetic report for presentation.",
      disclaimer:
        "Educational use only: this demo provides descriptive esthetic recommendations and is not a medical diagnosis tool."
    },
    howItWorks: {
      title: "How It Works",
      subtitle: "The workflow is intentionally simple so it can be extended with real datasets later.",
      steps: [
        {
          title: "1. Upload",
          description: "Student uploads a front-view patient face image for educational analysis."
        },
        {
          title: "2. Validate",
          description: "The server verifies image type and size before processing."
        },
        {
          title: "3. Analyze",
          description: "OpenAI Responses API analyzes visual facial features with structured JSON output."
        },
        {
          title: "4. Recommend",
          description: "The app presents smile-design suggestions based on esthetic principles."
        },
        {
          title: "5. Report",
          description: "Results are formatted into a printable final report for class presentation."
        }
      ]
    },
    upload: {
      title: "Upload and Analysis",
      subtitle: "Use a clear, front-facing facial image with good lighting for better educational recommendations.",
      uploadLabel: "Upload patient face image",
      startButton: "Start Analysis",
      loadingButton: "Analyzing with OpenAI...",
      progressTitle: "Analysis in progress",
      progressDescription: "Please wait. This can take around 10-30 seconds for image processing and model response.",
      previewTitle: "Image Preview",
      previewAlt: "Uploaded patient preview",
      previewLoadingTitle: "Analyzing uploaded image...",
      previewLoadingDescription: "Generating educational smile-design recommendations",
      noImageSelected: "No image selected yet.",
      errors: {
        selectImage: "Please select a face image before running analysis.",
        requestFailed: "Analysis request failed.",
        unexpectedClientError: "Unexpected client error."
      }
    },
    results: {
      title: "Results Dashboard",
      sourceLabel: "Source",
      sourceValues: {
        openai: "OpenAI",
        mock: "Demo Fallback"
      },
      analyzedAt: "Analyzed at",
      cards: {
        faceShape: "Face Shape",
        facialProportion: "Facial Proportion",
        facialSymmetry: "Facial Symmetry",
        jawLine: "Jaw Line",
        lipLine: "Lip Line",
        suggestedToothForm: "Suggested Tooth Form",
        smileLineRecommendation: "Smile Line Recommendation",
        midlineRecommendation: "Midline Recommendation"
      },
      faceShapeValues: {
        Oval: "Oval",
        Round: "Round",
        Square: "Square",
        Rectangular: "Rectangular",
        Triangular: "Triangular"
      },
      notesTitle: "General Esthetic Notes"
    },
    report: {
      printButton: "Print Final Report",
      title: "AI Dental Smile Design Assistant Report",
      generatedOn: "Generated on",
      disclaimer:
        "Educational disclaimer: this document is intended for dental esthetic learning and graduation-demo use only. It does not replace clinical examination, diagnosis, or treatment planning by licensed professionals."
    },
    api: {
      noImageUploaded: "No image was uploaded. Please choose a face image first.",
      unsupportedType: "Unsupported file type. Use JPG, PNG, WEBP, or GIF.",
      imageTooLarge: "Image is too large. Please upload a file under 8MB.",
      demoMode: "Demo mode is enabled, so educational sample analysis is shown.",
      liveMissingApiKey: "Live analysis is unavailable because OPENAI_API_KEY is missing. Add a valid key in .env.local and restart the app.",
      liveNoQuota: "Live analysis failed because this OpenAI project has no available quota. Add billing/credits in OpenAI, then retry.",
      liveUnauthorized: "Live analysis failed because the API key was rejected. Verify OPENAI_API_KEY and the key's project permissions.",
      liveRateLimited: "Live analysis is rate-limited right now. Wait a moment and retry.",
      liveInvalidImage: "Live analysis could not process this image format/content. Try a clear JPG or PNG face photo and retry.",
      liveFailedPrefix: "Live analysis failed:",
      liveUnavailable:
        "Live analysis is temporarily unavailable, so demo fallback data is shown. Check OpenAI key, project quota, and model access.",
      responseValidationFailed: "Response validation failed.",
      unexpectedServerError: "Unexpected server error. Please try again."
    }
  },
  ar: {
    language: {
      label: "اللغة",
      english: "English",
      arabic: "العربية",
      switchToEnglish: "التبديل إلى الإنجليزية",
      switchToArabic: "التبديل إلى العربية"
    },
    hero: {
      eyebrow: "مشروع تخرج تجريبي",
      title: "مساعد تصميم الابتسامة السنية بالذكاء الاصطناعي",
      description:
        "تطبيق ويب تعليمي موجه لطلاب فنيي الأسنان. ارفع صورة أمامية للوجه، واحصل على إرشادات تعليمية لتصميم الابتسامة، ثم صدّر تقريرا جماليا مناسبًا للطباعة والعرض.",
      disclaimer: "للاستخدام التعليمي فقط: هذا العرض يقدم توصيات جمالية وصفية وليس أداة للتشخيص الطبي."
    },
    howItWorks: {
      title: "كيف يعمل",
      subtitle: "تم تصميم سير العمل ليكون بسيطا، بحيث يمكن تطويره لاحقا باستخدام بيانات واقعية.",
      steps: [
        {
          title: "١. رفع الصورة",
          description: "يقوم الطالب برفع صورة أمامية لوجه المريض لغرض التحليل التعليمي."
        },
        {
          title: "٢. التحقق",
          description: "يتحقق الخادم من نوع الصورة وحجمها قبل المعالجة."
        },
        {
          title: "٣. التحليل",
          description: "تقوم واجهة OpenAI Responses API بتحليل السمات الوجهية مع إخراج JSON منظم."
        },
        {
          title: "٤. التوصية",
          description: "يعرض التطبيق اقتراحات تصميم الابتسامة بناء على مبادئ جمالية."
        },
        {
          title: "٥. التقرير",
          description: "يتم تنسيق النتائج في تقرير نهائي قابل للطباعة لعرضه داخل الصف."
        }
      ]
    },
    upload: {
      title: "الرفع والتحليل",
      subtitle: "استخدم صورة وجه أمامية واضحة وإضاءة جيدة للحصول على توصيات تعليمية أفضل.",
      uploadLabel: "رفع صورة وجه المريض",
      startButton: "بدء التحليل",
      loadingButton: "جارٍ التحليل باستخدام OpenAI...",
      progressTitle: "التحليل قيد التنفيذ",
      progressDescription: "يرجى الانتظار. قد يستغرق ذلك حوالي 10-30 ثانية لمعالجة الصورة واستجابة النموذج.",
      previewTitle: "معاينة الصورة",
      previewAlt: "معاينة صورة المريض المرفوعة",
      previewLoadingTitle: "جارٍ تحليل الصورة المرفوعة...",
      previewLoadingDescription: "جارٍ إنشاء توصيات تعليمية لتصميم الابتسامة",
      noImageSelected: "لم يتم اختيار صورة بعد.",
      errors: {
        selectImage: "يرجى اختيار صورة وجه قبل بدء التحليل.",
        requestFailed: "فشل طلب التحليل.",
        unexpectedClientError: "حدث خطأ غير متوقع في الواجهة."
      }
    },
    results: {
      title: "لوحة النتائج",
      sourceLabel: "المصدر",
      sourceValues: {
        openai: "OpenAI",
        mock: "وضع تجريبي"
      },
      analyzedAt: "وقت التحليل",
      cards: {
        faceShape: "شكل الوجه",
        facialProportion: "التناسب الوجهي",
        facialSymmetry: "التناظر الوجهي",
        jawLine: "خط الفك",
        lipLine: "خط الشفاه",
        suggestedToothForm: "شكل الأسنان الأمامية المقترح",
        smileLineRecommendation: "توصية خط الابتسامة",
        midlineRecommendation: "توصية الخط المتوسط"
      },
      faceShapeValues: {
        Oval: "بيضاوي",
        Round: "دائري",
        Square: "مربع",
        Rectangular: "مستطيل",
        Triangular: "مثلث"
      },
      notesTitle: "ملاحظات جمالية عامة"
    },
    report: {
      printButton: "طباعة التقرير النهائي",
      title: "تقرير مساعد تصميم الابتسامة السنية بالذكاء الاصطناعي",
      generatedOn: "تاريخ الإنشاء",
      disclaimer:
        "تنبيه تعليمي: هذا المستند مخصص للتعلم الجمالي في طب الأسنان ولمشروع التخرج فقط. ولا يغني عن الفحص السريري أو التشخيص أو التخطيط العلاجي من قبل مختصين مرخصين."
    },
    api: {
      noImageUploaded: "لم يتم رفع أي صورة. يرجى اختيار صورة وجه أولا.",
      unsupportedType: "نوع الملف غير مدعوم. استخدم JPG أو PNG أو WEBP أو GIF.",
      imageTooLarge: "حجم الصورة كبير جدا. يرجى رفع ملف أقل من 8 ميجابايت.",
      demoMode: "وضع العرض التجريبي مفعل، لذلك يتم عرض نتائج تعليمية نموذجية.",
      liveMissingApiKey: "التحليل المباشر غير متاح لأن OPENAI_API_KEY غير موجود. أضف مفتاحا صالحا في .env.local ثم أعد تشغيل التطبيق.",
      liveNoQuota: "فشل التحليل المباشر لأن مشروع OpenAI لا يحتوي على رصيد متاح. أضف فواتير/رصيد ثم أعد المحاولة.",
      liveUnauthorized: "فشل التحليل المباشر لأن مفتاح API مرفوض. تحقق من OPENAI_API_KEY وصلاحيات المشروع.",
      liveRateLimited: "التحليل المباشر مقيد بالمعدل حاليا. انتظر قليلا ثم أعد المحاولة.",
      liveInvalidImage: "تعذر على التحليل المباشر معالجة صيغة/محتوى الصورة. جرب صورة وجه واضحة بصيغة JPG أو PNG ثم أعد المحاولة.",
      liveFailedPrefix: "فشل التحليل المباشر:",
      liveUnavailable:
        "التحليل المباشر غير متاح مؤقتا، لذلك يتم عرض بيانات تجريبية بديلة. تحقق من مفتاح OpenAI ورصيد المشروع وإمكانية الوصول إلى النموذج.",
      responseValidationFailed: "فشل التحقق من صحة الاستجابة.",
      unexpectedServerError: "حدث خطأ غير متوقع في الخادم. يرجى المحاولة مرة أخرى."
    }
  }
} as const;

export type TranslationDictionary = (typeof translations)[Locale];
