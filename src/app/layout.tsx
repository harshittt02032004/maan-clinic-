import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Outfit, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/motion/SmoothScroll";
import ScrollProgress from "@/components/motion/ScrollProgress";
import MotionProvider from "@/components/motion/MotionProvider";
import CalmHalo from "@/components/motion/CalmHalo";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import StickyBookBar from "@/components/layout/StickyBookBar";
import JsonLd from "@/components/ui/JsonLd";
import { SITE_URL } from "@/content/site";
import { clinicLd, doctorLd } from "@/lib/seo";

const jakarta = Plus_Jakarta_Sans({ variable: "--font-jakarta", subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });
const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"], weight: ["500", "600", "700", "800", "900"] });
const devanagari = Noto_Sans_Devanagari({ variable: "--font-devanagari", subsets: ["devanagari"], weight: ["400", "600", "700"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Psychiatrist in Raebareli | Dr. Mohit Jain, MD (KGMU) — Mann Clinic",
    template: "%s",
  },
  description:
    "Confidential, evidence-based psychiatric care at Mann Clinic, Raebareli. Dr. Mohit Jain (MD Psychiatry, KGMU) treats depression, anxiety, OCD, addiction & more.",
  openGraph: { type: "website", siteName: "Mann Clinic — Dr. Mohit Jain, Psychiatrist, Raebareli", locale: "en_IN", images: [{ url: "/opengraph-image", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ec2d84",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${outfit.variable} ${devanagari.variable}`} suppressHydrationWarning>
      <body className="min-h-screen">
        {/* scroll reveals start hidden and are shown by a script; without JavaScript show everything */}
        <noscript>
          <style>{`[data-reveal],[data-reveal-item]{opacity:1!important}`}</style>
        </noscript>
        <JsonLd data={clinicLd} />
        <JsonLd data={doctorLd} />
        <MotionProvider>
          <SmoothScroll />
          <ScrollProgress />
          <CalmHalo />
          <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-navy-900 focus:px-4 focus:py-2 focus:text-white">
            Skip to content
          </a>
          <div className="relative z-[2] flex min-h-screen flex-col">
            <Navbar />
            <main id="main" className="flex-1">{children}</main>
            <Footer />
          </div>
          <FloatingWhatsApp />
          <StickyBookBar />
        </MotionProvider>
      </body>
    </html>
  );
}
