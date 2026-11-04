import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import CtaBand from "@/components/layout/CtaBand";
import DoctorPortrait from "@/components/ui/DoctorPortrait";
import Journey from "@/components/about/Journey";
import CredentialList from "@/components/about/CredentialList";
import { Reveal } from "@/components/motion/Reveal";
import { ABOUT } from "@/content/about";

export const metadata: Metadata = {
  title: "About Dr. Mohit Jain — Psychiatrist, MD (KGMU) | Mann Clinic Raebareli",
  description:
    "Dr. Mohit Jain — MBBS & MD Psychiatry (KGMU Lucknow), ex-Assistant Professor at IMHH Agra, US research experience. Consultant Psychiatrist at Mann Clinic, Raebareli.",
  alternates: { canonical: "/about-dr-mohit-jain/" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="Consultant Psychiatrist" title={ABOUT.h1} hindi="मनोचिकित्सक · रायबरेली" intro={ABOUT.intro} crumbs={[{ name: "About Dr. Jain", path: "/about-dr-mohit-jain/" }]}>
        <DoctorPortrait compact className="mx-auto w-full max-w-sm" />
      </PageHero>

      <section className="rule-b">
        <div className="container-x py-4">
          <Reveal>
            <p className="text-[14px] font-medium text-ink">{ABOUT.designation}</p>
          </Reveal>
        </div>
      </section>

      <Journey />

      <section className="bg-ink text-white">
        <div className="container-x grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-7">
            <p className="kicker !text-magenta-soft"><span className="kicker-line !bg-magenta-soft" />Philosophy</p>
            <blockquote className="mt-6 font-display text-[30px] font-semibold leading-[1.15] sm:text-[40px] lg:text-[48px]">“{ABOUT.quote}”</blockquote>
            <p className="mt-6 text-[13px] font-bold uppercase tracking-[0.18em] text-magenta-soft">— Dr. Mohit Jain</p>
          </Reveal>
          <div className="lg:col-span-5">
            <CredentialList />
          </div>
        </div>
      </section>

      <CtaBand headline={ABOUT.ctaLine} hindi={null} />
    </>
  );
}
