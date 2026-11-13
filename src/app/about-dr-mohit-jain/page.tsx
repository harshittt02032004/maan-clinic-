import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/layout/PageHero";
import CtaBand from "@/components/layout/CtaBand";
import DoctorPortrait from "@/components/ui/DoctorPortrait";
import SectionHeading from "@/components/ui/SectionHeading";
import Journey from "@/components/about/Journey";
import Timeline from "@/components/about/Timeline";
import { Reveal, Stagger, Item } from "@/components/motion/Reveal";
import { ABOUT } from "@/content/about";
import { CLINIC } from "@/content/site";

export const metadata: Metadata = {
  title: "About Dr. Mohit Jain — Psychiatrist, MD (KGMU) | Mann Clinic Raebareli",
  description: `Dr. Mohit Jain — MBBS & ${CLINIC.degreeShort} (KGMU Lucknow), ex-Assistant Professor at IMHH Agra, US research experience. Consultant Psychiatrist at Mann Clinic, Raebareli.`,
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

      <section className="container-x section-y">
        <SectionHeading eyebrow="Clinical interests" title={"The concerns Dr. Jain consults for."} hindi="हर उम्र के लिए" />
        <Stagger className="mt-8 flex flex-wrap gap-2.5" gap={0.05}>
          {ABOUT.interests.map((it) => (
            <Item key={it.slug}>
              <Link
                href={`/${it.slug}/`}
                className="inline-flex min-h-11 items-center rounded-full border border-navy-100 bg-white px-4 py-2 text-sm font-semibold text-navy-800 transition-colors duration-300 hover:border-pink-300 hover:text-pink-700"
              >
                {it.label}
              </Link>
            </Item>
          ))}
        </Stagger>
      </section>

      <section className="relative isolate overflow-hidden bg-navy-900 py-14 text-white sm:py-28">
        <div className="blob -right-20 top-0 size-96 bg-pink-600/30" />
        <div className="container-x grid items-center gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <span className="eyebrow !border-white/20 !bg-white/10 !text-pink-200">Philosophy</span>
            <blockquote className="mt-6 font-display text-3xl font-bold leading-snug sm:text-4xl lg:text-5xl">“{ABOUT.quote}”</blockquote>
            <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-pink-200">— Dr. Mohit Jain</p>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-navy-100 sm:text-lg">{ABOUT.approach}</p>
          </Reveal>
          <div className="lg:col-span-5">
            <Timeline />
          </div>
        </div>
      </section>

      <CtaBand headline={ABOUT.ctaLine} hindi={null} />
    </>
  );
}
