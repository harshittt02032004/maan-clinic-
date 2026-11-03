"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { CalendarCheck, MessageCircle, ShieldCheck } from "lucide-react";
import LangFlip from "@/components/motion/LangFlip";
import Magnetic from "@/components/motion/Magnetic";
import DoctorPortrait from "@/components/ui/DoctorPortrait";
import { CLINIC, whatsappLink } from "@/content/site";
import { TRUST_CHIPS } from "@/content/about";
import { EASE } from "@/lib/motion";

export default function Hero() {
  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 600], [0, 80]);
  const yArt = useTransform(scrollY, [0, 600], [0, -60]);
  const fade = useTransform(scrollY, [0, 400], [1, 0.4]);

  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 lg:pb-28">
      <div className="bg-dots absolute inset-0 -z-10 opacity-70 [mask-image:radial-gradient(70%_60%_at_50%_30%,#000,transparent)]" />
      <div className="blob -left-40 top-10 size-[30rem] bg-pink-300/50" />
      <div className="blob right-[-10rem] top-32 size-[26rem] bg-navy-200/60" />

      <div className="container-x grid items-center gap-16 lg:grid-cols-12">
        <motion.div style={{ y: yText, opacity: fade }} className="lg:col-span-7">
          <motion.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }} className="eyebrow">
            <span className="size-1.5 rounded-full bg-pink-500" /> Psychiatry & Mental Wellness · Raebareli
          </motion.span>

          <LangFlip
            hindi="मन का इलाज भी इलाज है।"
            english="Mental health is health."
            className="mt-6 max-w-3xl text-[2.6rem] font-extrabold leading-[1.08] text-navy-900 sm:text-6xl lg:text-7xl"
          />

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5, ease: EASE }} className="mt-12 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Dr. Mohit Jain, MD Psychiatry (KGMU, Lucknow), provides confidential, judgement-free care for depression, anxiety, OCD, addiction, sleep and sexual health concerns — treatment backed by science, delivered with compassion.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.65, ease: EASE }} className="mt-8 flex flex-wrap items-center gap-3">
            <Magnetic>
              <Link href="/contact/" className="btn-primary">
                <CalendarCheck className="size-4" /> Book an Appointment
              </Link>
            </Magnetic>
            <Magnetic>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                <MessageCircle className="size-4" /> WhatsApp Us — {CLINIC.phoneDisplay}
              </a>
            </Magnetic>
          </motion.div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="mt-5 flex items-center gap-2 text-sm font-semibold text-navy-700">
            <ShieldCheck className="size-4 text-pink-600" /> Completely confidential consultations · No referral needed
          </motion.p>

          <motion.ul initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: 1 } } }} className="mt-8 flex flex-wrap gap-2">
            {TRUST_CHIPS.map((c) => (
              <motion.li key={c} variants={{ hidden: { opacity: 0, scale: 0.9, y: 8 }, show: { opacity: 1, scale: 1, y: 0 } }} className="rounded-full border border-navy-100 bg-white/80 px-4 py-2 text-xs font-bold text-navy-800 backdrop-blur">
                {c}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div style={{ y: yArt }} className="relative mx-auto w-full max-w-sm lg:col-span-5 lg:max-w-none">
          <DoctorPortrait />
        </motion.div>
      </div>
    </section>
  );
}
