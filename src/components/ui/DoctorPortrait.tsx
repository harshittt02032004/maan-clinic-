"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CLINIC } from "@/content/site";
import { LogoMark } from "@/components/layout/Logo";

/**
 * Doctor photo with a poster-style pink arch behind it.
 * Until the real photo arrives (CLINIC.doctorPhoto), renders a tasteful placeholder —
 * no AI-generated "doctor" image, per the NMC note in the content doc.
 */
export default function DoctorPortrait({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <motion.div
        aria-hidden
        className="absolute inset-x-6 bottom-0 top-10 rounded-t-[999px] rounded-b-[2.5rem] bg-gradient-to-b from-pink-400 to-pink-600"
        initial={{ scaleY: 0.85, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        style={{ transformOrigin: "bottom" }}
      />
      <motion.div
        aria-hidden
        className="absolute -left-2 top-1/3 size-24 rounded-full border-[10px] border-white/70"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute -right-3 top-16 size-14 rounded-full bg-navy-800"
        animate={{ y: [0, 10, 0], rotate: [0, 15, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.35 }}
        className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[2.5rem]"
      >
        {CLINIC.doctorPhoto ? (
          <Image src={CLINIC.doctorPhoto} alt={`${CLINIC.doctor}, Consultant Psychiatrist, Mann Clinic Raebareli`} fill priority sizes="(min-width:1024px) 40vw, 90vw" className="object-cover object-top" />
        ) : (
          <div className="absolute inset-0 grid place-items-end bg-gradient-to-b from-pink-100 via-pink-200/70 to-pink-500/60">
            <svg viewBox="0 0 200 250" className="w-full text-navy-900/15" aria-hidden>
              <circle cx="100" cy="86" r="46" fill="currentColor" />
              <path d="M20 250c0-56 36-92 80-92s80 36 80 92z" fill="currentColor" />
            </svg>
            <span className="absolute left-1/2 top-6 -translate-x-1/2 rounded-full bg-white/80 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-navy-700">Photo pending</span>
          </div>
        )}
      </motion.div>

      {/* name card */}
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="card absolute -bottom-5 left-2 right-2 flex items-center gap-3 px-4 py-3 sm:left-auto sm:right-[-12px] sm:w-72"
      >
        <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-pink-50"><LogoMark size={36} /></span>
        <span className="leading-tight">
          <span className="block font-display text-sm font-extrabold text-navy-900">{CLINIC.doctor}</span>
          <span className="block text-[11px] font-semibold text-muted">{CLINIC.qualifications} · {CLINIC.university}</span>
        </span>
      </motion.div>
    </div>
  );
}
