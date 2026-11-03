"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Quote } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { ABOUT } from "@/content/about";

export default function AboutPreview() {
  return (
    <section className="container-x section-y">
      <div className="grid items-center gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-6">
          <span className="eyebrow">About the doctor</span>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight text-navy-900 sm:text-4xl lg:text-5xl">
            Trained at KGMU. <span className="text-gradient">Practising in Raebareli.</span>
          </h2>
          <p className="mt-5 text-muted sm:text-lg">{ABOUT.intro}</p>
          <Link href="/about-dr-mohit-jain/" className="btn-navy mt-8 group">
            Know Dr. Jain <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>

        <Reveal delay={0.15} className="lg:col-span-6">
          <motion.blockquote
            whileHover={{ rotate: -1, scale: 1.01 }}
            className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-pink-500 to-pink-700 p-8 text-white shadow-[var(--shadow-pink)] sm:p-12"
          >
            <Quote className="absolute -right-4 -top-4 size-40 text-white/10" />
            <p className="relative font-display text-2xl font-bold leading-snug sm:text-3xl">“{ABOUT.quote}”</p>
            <footer className="relative mt-6 text-sm font-bold uppercase tracking-[0.2em] text-pink-100">— Dr. Mohit Jain</footer>
          </motion.blockquote>
        </Reveal>
      </div>
    </section>
  );
}
