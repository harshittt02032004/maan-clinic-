"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { CalendarCheck, MessageCircle, ShieldCheck, ArrowRight } from "lucide-react";
import LangFlip from "@/components/motion/LangFlip";
import Magnetic from "@/components/motion/Magnetic";
import UntangleCanvas from "@/components/home/UntangleCanvas";
import { LogoMark } from "@/components/layout/Logo";
import { CLINIC, whatsappLink } from "@/content/site";
import { TRUST_CHIPS } from "@/content/about";
import { EASE } from "@/lib/motion";

/**
 * "Untangle" hero: headline on the left; on the right a tangled thought-line the visitor
 * smooths out with the cursor (or by scrolling on touch). Once calm, it flows into the
 * "Start here" CTA, which lights up.
 */
export default function Hero() {
  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 600], [0, 70]);
  const fade = useTransform(scrollY, [0, 420], [1, 0.35]);
  const [lit, setLit] = useState(false);
  const onCalm = useCallback((v: boolean) => setLit(v), []);

  return (
    <section className="relative isolate overflow-hidden pt-28 pb-12 sm:pt-36 sm:pb-16 lg:min-h-[92vh] lg:pb-24">
      <div className="bg-dots absolute inset-0 -z-10 opacity-70 [mask-image:radial-gradient(70%_60%_at_50%_30%,#000,transparent)]" />
      <div className="blob -left-40 top-10 size-[30rem] bg-pink-300/50" />
      <div className="blob right-[-10rem] top-32 size-[26rem] bg-navy-200/60" />

      <div className="container-x grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
        {/* copy */}
        <motion.div style={{ y: yText, opacity: fade }} className="relative z-10 lg:col-span-6">
          <motion.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }} className="eyebrow whitespace-nowrap max-sm:px-3 max-sm:text-[9.5px] max-sm:tracking-[0.1em]">
            <span className="size-1.5 shrink-0 rounded-full bg-pink-500" /> Psychiatry & Mental Wellness · Raebareli
          </motion.span>

          <LangFlip
            hindi="मन का इलाज भी इलाज है।"
            english="Mental health is health."
            className="mt-6 max-w-2xl text-[2.6rem] font-extrabold leading-[1.08] text-navy-900 sm:text-6xl lg:text-[4.2rem]"
          />

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5, ease: EASE }} className="mt-12 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Dr. Mohit Jain, {CLINIC.degreeShort} (KGMU, Lucknow), provides confidential, judgement-free care for depression, anxiety, OCD, sleep, addiction, sexual health, children's behavioural concerns, and memory or seizure problems — for every age, backed by science.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.65, ease: EASE }} className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            {/* full-width, thumb-sized buttons on phones */}
            <Magnetic className="block sm:inline-block">
              <Link href="/contact/" className="btn-primary w-full sm:w-auto">
                <CalendarCheck className="size-4" /> Book an Appointment
              </Link>
            </Magnetic>
            <Magnetic className="block sm:inline-block">
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-ghost w-full sm:w-auto">
                <MessageCircle className="size-4" /> WhatsApp Us — {CLINIC.phoneDisplay}
              </a>
            </Magnetic>
          </motion.div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="mt-5 flex items-start gap-2 text-sm font-semibold text-navy-700">
            <ShieldCheck className="mt-0.5 size-4 shrink-0 text-pink-600" /> Completely confidential consultations · No referral needed
          </motion.p>

          <motion.ul initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: 1 } } }} className="mt-8 flex flex-wrap gap-2">
            {TRUST_CHIPS.map((c) => (
              <motion.li key={c} variants={{ hidden: { opacity: 0, scale: 0.9, y: 8 }, show: { opacity: 1, scale: 1, y: 0 } }} className="rounded-full border border-navy-100 bg-white/80 px-4 py-2 text-xs font-bold text-navy-800 backdrop-blur">
                {c}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* untangle stage */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: EASE }}
          className="relative mx-auto aspect-[4/5] w-full max-w-xl sm:aspect-[5/4] lg:col-span-6 lg:max-w-none"
        >
          <div className="absolute inset-0 rounded-[2.5rem] border border-white/70 bg-white/55 shadow-[var(--shadow-soft)] backdrop-blur-sm" />
          <UntangleCanvas onCalm={onCalm} className="relative rounded-[2.5rem]" />

          {/* labels */}
          <span className="hindi pointer-events-none absolute left-6 top-5 text-sm font-bold text-navy-900/70">उलझन</span>
          <span className="pointer-events-none absolute left-6 top-10 text-[10px] font-bold uppercase tracking-[0.22em] text-pink-500">
            <span className="hidden sm:inline">move your cursor over the line</span>
            <span className="sm:hidden">scroll to untangle</span>
          </span>

          {/* doctor chip */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 1.1 }}
            className="card absolute bottom-[4.75rem] left-4 flex max-w-[calc(100%-2rem)] items-center gap-3 px-3.5 py-2.5 pr-5 sm:bottom-5 sm:left-5"
          >
            {CLINIC.doctorPhoto ? (
              <span className="relative size-11 overflow-hidden rounded-full ring-2 ring-pink-200">
                <Image src={CLINIC.doctorPhoto} alt={CLINIC.doctor} fill sizes="44px" className="object-cover object-top" />
              </span>
            ) : (
              <span className="grid size-11 place-items-center rounded-full bg-pink-50"><LogoMark size={30} /></span>
            )}
            <span className="leading-tight">
              <span className="block font-display text-sm font-extrabold text-navy-900">{CLINIC.doctor}</span>
              <span className="block text-[11px] font-semibold text-muted">{CLINIC.qualifications} · {CLINIC.university}</span>
            </span>
          </motion.div>

          {/* CTA the line flows into */}
          {/* When the line settles the button pulses three times, then rests. This is a CSS transform animation
              (runs on the compositor); the old JS-driven pulse repeated forever and cost a frame's work on every
              tick for the rest of the page, even after the hero had scrolled away. */}
          <div className={`absolute inset-x-4 bottom-4 sm:inset-x-auto sm:bottom-5 sm:right-5 ${lit ? "motion-safe:animate-[cta-pulse_1.6s_ease-in-out_3]" : ""}`}>
            {/* phones: the chip sits above and this button spans the panel, so the two never overlap */}
            <Link
              href="/contact/"
              className={`group flex w-full items-center justify-center gap-2 rounded-full border-2 px-5 py-3 text-sm font-bold transition-all duration-500 sm:inline-flex sm:w-auto ${
                lit ? "border-pink-600 bg-pink-600 text-white shadow-[var(--shadow-pink)]" : "border-pink-200 bg-white/90 text-navy-900 hover:border-pink-400"
              }`}
            >
              <span className="hindi">सुलझन</span>
              <span className="text-navy-300 group-hover:text-current">·</span>
              Start here
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
