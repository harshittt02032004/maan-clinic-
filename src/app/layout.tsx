import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Sans, Baloo_2 } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/motion/SmoothScroll";
import ScrollProgress from "@/components/motion/ScrollProgress";
import MotionProvider from "@/components/motion/MotionProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StickyBookBar from "@/components/layout/StickyBookBar";
import JsonLd from "@/components/ui/JsonLd";
import { SITE_URL } from "@/content/site";
import { clinicLd, doctorLd } from "@/lib/seo";

const bricolage = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], style: ["normal"] });
const instrument = Instrument_Sans({ variable: "--font-instrument", subsets: ["latin"], weight: ["400", "500", "600", "700"], style: ["normal", "italic"] });
const baloo = Baloo_2({ variable: "--font-baloo", subsets: ["devanagari", "latin"], weight: ["500", "600", "700", "800"] });

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
  themeColor: "#e5147e",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bricolage.variable} ${instrument.variable} ${baloo.variable}`} suppressHydrationWarning>
      <body className="min-h-screen">
        <JsonLd data={clinicLd} />
        <JsonLd data={doctorLd} />
        <MotionProvider>
          <SmoothScroll />
          <ScrollProgress />
          <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-ink focus:px-4 focus:py-2 focus:text-white">
            Skip to content
          </a>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main id="main" className="flex-1">{children}</main>
            <Footer />
          </div>
          <StickyBookBar />
        </MotionProvider>
      </body>
    </html>
  );
}
