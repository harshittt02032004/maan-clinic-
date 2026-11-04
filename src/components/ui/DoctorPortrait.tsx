"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CLINIC } from "@/content/site";
import { EASE } from "@/lib/motion";

/**
 * Poster-style portrait block: a flat magenta slab offset behind a blush panel with the
 * doctor's photo, and a rotated "sticker" name card. Placeholder silhouette until the
 * real photo arrives (no AI-generated faces, per the NMC note).
 */
export default function DoctorPortrait({ className = "", compact = false }: { className?: string; compact?: boolean }) {
  return (
    <div className={`relative ${compact ? "min-h-[320px]" : "min-h-[420px] sm:min-h-[560px] lg:min-h-[640px]"} ${className}`}>
      <motion.div aria-hidden initial={{ opacity: 0, x: 24, y: 24 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ duration: 0.8, ease: EASE, delay: 0.2 }} className="absolute inset-0 translate-x-6 translate-y-6 bg-magenta" />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.35 }} className="absolute inset-0 flex items-end justify-center overflow-hidden border-[1.5px] border-ink bg-blush-2 -translate-x-0 -translate-y-0 mr-6 mb-6">
        {CLINIC.doctorPhoto ? (
          <Image src={CLINIC.doctorPhoto} alt={`${CLINIC.doctor}, Consultant Psychiatrist, Mann Clinic Raebareli`} fill priority sizes="(min-width:1024px) 40vw, 90vw" className="object-cover object-top" />
        ) : (
          <>
            <svg viewBox="0 0 300 380" className="w-[70%] text-ink/15" aria-hidden><circle cx="150" cy="120" r="78" fill="currentColor" /><path d="M20 380C20 280 80 230 150 230s130 50 130 150z" fill="currentColor" /></svg>
            <span className="absolute left-4 top-4 border border-ink bg-white px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink">Photo pending</span>
          </>
        )}
      </motion.div>
      <motion.div initial={{ opacity: 0, x: -18, rotate: -8 }} animate={{ opacity: 1, x: 0, rotate: -3 }} transition={{ duration: 0.7, delay: 0.8, ease: EASE }} className="sticker absolute -left-3 bottom-12 px-4 py-3 sm:-left-7">
        <span className="block font-display text-lg font-extrabold text-ink sm:text-xl">{CLINIC.doctor}</span>
        <span className="block text-[13px] text-body">{CLINIC.qualifications} · {CLINIC.university}</span>
        <span className="block text-[13px] font-semibold text-magenta">{CLINIC.role}, Mann Clinic</span>
      </motion.div>
      {!compact && (
        <motion.div initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 8 }} transition={{ type: "spring", stiffness: 180, damping: 14, delay: 1.1 }} className="absolute -top-4 right-0 grid size-[88px] place-items-center rounded-full bg-blue text-center font-display text-[13px] font-bold leading-tight text-white">
          Judgement-<br />free
        </motion.div>
      )}
    </div>
  );
}
