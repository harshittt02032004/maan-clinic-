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
        <DoctorPortrait className="mx-auto w-full max-w-xs lg:max-w-sm" />
      </PageHero>

      <section className="container-x pb-6">
        <Reveal>
          <p className="rounded-2xl border border-pink-100 bg-white/70 px-5 py-3 text-sm font-semibold text-navy-800">{ABOUT.designation}</p>
        </Reveal>
      </section>

      <Journey />

      <section className="relative isolate overflow-hidden bg-navy-900 py-14 text-white sm:py-28">
        <div className="blob -right-20 top-0 size-96 bg-pink-600/30" />
        <div className="container-x grid items-center gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <span className="eyebrow !border-white/20 !bg-white/10 !text-pink-200">Philosophy</span>
            <blockquote className="mt-6 font-display text-3xl font-bold leading-snug sm:text-4xl lg:text-5xl">“{ABOUT.quote}”</blockquote>
            <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-pink-200">— Dr. Mohit Jain</p>
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
