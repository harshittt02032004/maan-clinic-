"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MessageCircle, CalendarCheck } from "lucide-react";
import Magnetic from "@/components/motion/Magnetic";
import { Reveal } from "@/components/motion/Reveal";
import { CLINIC, whatsappLink } from "@/content/site";

export default function CtaBand({
  headline = "The first step is the hardest. It is also the most important.",
  hindi = "पहला कदम आप उठाइए — बाकी हम संभाल लेंगे।",
}: {
  headline?: string;
  hindi?: string | null;
}) {
  return (
    <section className="container-x section-y !pb-8">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2.5rem] bg-navy-900 px-6 py-14 text-center text-white sm:px-12 sm:py-20">
          {/* breathing aurora */}
          <motion.div
            aria-hidden
            className="absolute -left-20 -top-20 size-[26rem] rounded-full bg-pink-600/40 blur-3xl"
            animate={{ scale: [1, 1.25, 1], x: [0, 40, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="absolute -bottom-24 -right-16 size-[22rem] rounded-full bg-navy-400/40 blur-3xl"
            animate={{ scale: [1.2, 1, 1.2], y: [0, -30, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="relative">
            <h2 className="mx-auto max-w-3xl text-3xl font-extrabold leading-tight sm:text-5xl">{headline}</h2>
            {hindi && <p className="hindi mt-4 text-lg text-pink-200 sm:text-2xl">{hindi}</p>}
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Magnetic>
                <Link href="/contact/" className="btn-primary">
                  <CalendarCheck className="size-4" /> Book an Appointment
                </Link>
              </Magnetic>
              <Magnetic>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-ghost !border-white/25 !bg-white/10 !text-white hover:!bg-white/20">
                  <MessageCircle className="size-4" /> WhatsApp {CLINIC.phoneDisplay}
                </a>
              </Magnetic>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
