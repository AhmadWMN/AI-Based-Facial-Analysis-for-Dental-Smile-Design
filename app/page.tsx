import { HeroSection } from "@/components/HeroSection";
import { HowItWorks } from "@/components/HowItWorks";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { UploadAnalysisSection } from "@/components/UploadAnalysisSection";

export default function HomePage() {
  return (
    <main className="page-shell space-y-8" style={{ fontFamily: "var(--font-body)" }}>
      <div className="print-hidden flex justify-end">
        <LanguageSwitcher />
      </div>
      <HeroSection />
      <UploadAnalysisSection />
      <HowItWorks />
    </main>
  );
}
