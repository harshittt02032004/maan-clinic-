"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Scribble from "@/components/motion/Scribble";
import DoctorPortrait from "@/components/ui/DoctorPortrait";
import { CLINIC, whatsappLink } from "@/content/site";
import { EASE } from "@/lib/motion";

const rise = (delay: number) => ({ initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay, ease: EASE } });

const CREDS = [
  { k: "MD Psychiatry", v: "KGMU, Lucknow · est. 1905" },
  { k: "Ex-Asst. Professor", v: "IMHH Agra · est. 1859" },
  { k: "Research, USA", v: "2012–2016 · ECFMG certified" },
];

export default function Hero() {
  return (
    <section className="rule-b">
      <div className="container-x grid items-center gap-12 py-12 sm:py-16 lg:grid-cols-12 lg:gap-8 lg:py-20">
        <div className="flex flex-col gap-6 lg:col-span-7 lg:gap-7">
          <motion.p {...rise(0)} className="kicker"><span className="kicker-line" />Psychiatry &amp; mental wellness · Raebareli</motion.p>

          <motion.h1 {...rise(0.1)} className="hindi text-[54px] font-extrabold leading-[1.02] text-ink sm:text-7xl lg:text-[104px]">
            मन का <Scribble className="text-magenta">इलाज</Scribble> भी<br className="hidden sm:block" /> इलाज है।
          </motion.h1>

          <motion.p {...rise(0.25)} className="font-display text-2xl font-medium italic text-blue sm:text-[30px]">Mental health is health.</motion.p>

          <motion.p {...rise(0.35)} className="max-w-xl text-[17px] leading-relaxed text-body sm:text-lg">
            Dr. Mohit Jain, MD Psychiatry (KGMU, Lucknow), provides confidential, judgement-free care for depression, anxiety, OCD, addiction, sleep and sexual health concerns — treatment backed by science, delivered with compassion.
          </motion.p>

          <motion.div {...rise(0.45)} className="flex flex-wrap items-center gap-3 sm:gap-4">
            <Link href="/contact/" className="btn-ink">Book an appointment <ArrowRight className="size-4" /></Link>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-line">WhatsApp us</a>
            <span className="text-[14px] text-body">Completely confidential · No referral needed</span>
          </motion.div>

          <motion.ul {...rise(0.6)} className="rule-t mt-2 grid grid-cols-1 sm:grid-cols-3">
            {CREDS.map((c, i) => (
              <li key={c.k} className={`py-4 ${i < CREDS.length - 1 ? "sm:border-r sm:border-rule sm:pr-4" : ""} ${i > 0 ? "border-t border-rule sm:border-t-0 sm:pl-4" : ""}`}>
                <span className="block font-display text-[18px] font-bold text-ink">{c.k}</span>
                <span className="block text-[14px] text-body">{c.v}</span>
              </li>
            ))}
          </motion.ul>
        </div>

        <div className="lg:col-span-5">
          <DoctorPortrait />
        </div>
      </div>
      <span className="sr-only">{CLINIC.doctor}, {CLINIC.role}</span>
    </section>
  );
}
