import type { Metadata } from "next";
import { Cairo, Merriweather, Noto_Naskh_Arabic, Source_Sans_3 } from "next/font/google";

import { LanguageProvider } from "@/components/LanguageProvider";

import "./globals.css";

const headingFont = Merriweather({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "700"]
});

const bodyFont = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"]
});

const arabicHeadingFont = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  variable: "--font-heading-ar",
  weight: ["400", "700"]
});

const arabicBodyFont = Cairo({
  subsets: ["arabic"],
  variable: "--font-body-ar",
  weight: ["400", "500", "600", "700"]
});

export const metadata: Metadata = {
  title: "AI Dental Smile Design Assistant",
  description: "Graduation-project demo app for educational dental smile design analysis."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${headingFont.variable} ${bodyFont.variable} ${arabicHeadingFont.variable} ${arabicBodyFont.variable} bg-slate-50 text-slate-900`}
      >
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
