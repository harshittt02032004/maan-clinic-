"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { CalendarCheck, MessageCircle, ShieldCheck, GraduationCap, Landmark, BadgeCheck } from "lucide-react";
import LangFlip from "@/components/motion/LangFlip";
import Magnetic from "@/components/motion/Magnetic";
import { CLINIC, whatsappLink } from "@/content/site";
import { TRUST_CHIPS } from "@/content/about";
import { EASE } from "@/lib/motion";

/**
 * Split hero in the "Expert Care. Personal Connection." layout the owner supplied
 * (16 Nov 2026): copy on the left with an underline swoosh, name block, reassurance
 * pill, CTAs and a credential icon row; the doctor's photo fills the right half in
 * an organic rounded frame over brand waves. Same copy and header as before.
 */
const CHIP_ICONS = [GraduationCap, Landmark, BadgeCheck];

const up = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: EASE },
});

export default function Hero() {
  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 600], [0, 60]);
  const fade = useTransform(scrollY, [0, 420], [1, 0.4]);

  return (
    <section className="relative isolate overflow-hidden pt-28 pb-10 sm:pt-36 sm:pb-14 lg:pb-0">
      <div className="bg-dots absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(70%_60%_at_40%_30%,#000,transparent)]" />
      <div className="blob -left-40 top-10 size-[30rem] bg-pink-300/50" />

      <div className="container-x grid items-center gap-12 lg:grid-cols-12 lg:gap-6">
        {/* copy */}
        <motion.div style={{ y: yText, opacity: fade }} className="relative z-10 lg:col-span-6 lg:pb-20">
          <motion.span {...up(0)} className="eyebrow whitespace-nowrap max-sm:px-3 max-sm:text-[9.5px] max-sm:tracking-[0.1em]">
            <span className="size-1.5 shrink-0 rounded-full bg-pink-500" /> Psychiatry & Mental Wellness · Raebareli
          </motion.span>

          <LangFlip
            hindi="मन का इलाज भी इलाज है।"
            english="Mental health is health."
            className="mt-6 max-w-2xl text-[2.6rem] font-extrabold leading-[1.08] text-navy-900 sm:text-6xl lg:text-[4rem]"
          />
          {/* name block, like the reference's "Dr. Maya Patel, MD" row */}
          <motion.div {...up(0.25)} className="mt-7 flex items-center gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-pink-50 text-pink-600 ring-1 ring-pink-100">
              <ShieldCheck className="size-6" />
            </span>
            <span className="border-l-2 border-pink-200 pl-4">
              <span className="block font-display text-xl font-extrabold text-navy-900 sm:text-2xl">{CLINIC.doctor}</span>
              <span className="block text-sm font-semibold text-muted">{CLINIC.qualifications} · {CLINIC.university}</span>
            </span>
          </motion.div>

          <motion.p {...up(0.35)} className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Dr. Mohit Jain, {CLINIC.degreeShort} (KGMU, Lucknow), provides confidential, judgement-free care for depression, anxiety, OCD, sleep, addiction, sexual health, children's behavioural concerns, and memory or seizure problems — for every age, backed by science.
          </motion.p>

          {/* reassurance pill, like the reference's "Accepting New Patients" */}
          <motion.p {...up(0.45)} className="mt-6 inline-flex items-center gap-2.5 rounded-full bg-pink-50 py-2.5 pl-3 pr-5 text-sm font-bold text-navy-800 ring-1 ring-pink-100">
            <ShieldCheck className="size-4 shrink-0 text-pink-600" /> Completely confidential consultations · No referral needed
          </motion.p>

          <motion.div {...up(0.55)} className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
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

          {/* credential row with separators, like the reference's icon strip */}
          <motion.ul {...up(0.7)} className="mt-9 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:flex-wrap min-[420px]:items-stretch min-[420px]:gap-0 lg:mt-11">
            {TRUST_CHIPS.map((c, i) => {
              const Icon = CHIP_ICONS[i] ?? BadgeCheck;
              const [k, v] = c.split(" — ");
              return (
                <li key={c} className="flex min-w-0 flex-1 items-center gap-3 min-[420px]:flex-col min-[420px]:items-start min-[420px]:gap-2 min-[420px]:border-l min-[420px]:border-navy-100 min-[420px]:px-4 min-[420px]:first:border-l-0 min-[420px]:first:pl-0">
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-white text-pink-600 shadow-[0_2px_10px_rgba(236,45,132,0.14)] ring-1 ring-pink-100">
                    <Icon className="size-[18px]" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[13px] font-extrabold leading-tight text-navy-900">{k}</span>
                    <span className="block text-[11px] font-semibold leading-tight text-muted">{v}</span>
                  </span>
                </li>
              );
            })}
          </motion.ul>
        </motion.div>

        {/* photo */}
        <motion.div
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
          className="relative mx-auto w-full max-w-md lg:col-span-6 lg:max-w-none lg:self-end"
        >
          {/* soft shape behind the photo */}
          <div aria-hidden className="absolute -right-10 -top-10 -z-10 size-72 rounded-full bg-gradient-to-br from-pink-100 to-navy-100/60 sm:size-96" />
          <div className="blob -left-16 bottom-0 size-80 bg-navy-200/50" />

          <div className="relative overflow-hidden rounded-[2.5rem] rounded-bl-[5.5rem] border border-white/80 bg-gradient-to-b from-pink-50 via-white to-navy-50 shadow-[var(--shadow-soft)] lg:rounded-b-none lg:border-b-0">
            <div className="relative aspect-[4/5] sm:aspect-[5/5.4] lg:aspect-[6/5.9]">
              <Image
                src="/images/dr-mohit-jain-hero.webp"
                alt={`${CLINIC.doctor}, ${CLINIC.role}, at Mann Clinic, Raebareli`}
                fill
                priority
                sizes="(min-width: 1024px) 46vw, (min-width: 640px) 28rem, 100vw"
                className="object-cover object-top"
              />
              {/* brand wave along the bottom, like the reference's teal sweep */}
              <svg aria-hidden viewBox="0 0 640 110" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-16 w-full sm:h-20">
                <path d="M0 68 C 140 18, 260 102, 420 62 C 520 38, 590 52, 640 70 L 640 110 L 0 110 Z" fill="rgba(18,23,56,0.92)" />
                <path d="M0 86 C 150 44, 300 108, 470 72 C 560 54, 610 62, 640 74 L 640 110 L 0 110 Z" fill="var(--color-pink-500)" opacity="0.35" />
              </svg>
            </div>

            {/* name tag on the photo */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.9, ease: EASE }}
              className="absolute bottom-5 left-5 rounded-2xl bg-white/90 px-4 py-2.5 shadow-[var(--shadow-soft)] backdrop-blur sm:bottom-7 sm:left-7"
            >
              <span className="block font-display text-sm font-extrabold text-navy-900">{CLINIC.doctor}</span>
              <span className="block text-[11px] font-semibold text-muted">{CLINIC.role} · {CLINIC.degreeShort}</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
