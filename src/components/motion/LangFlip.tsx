"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { EASE } from "@/lib/motion";

/**
 * Hero headline that alternates between Hindi and English: auto every 5.5 s, on hover with a mouse,
 * on tap with a finger. Both H1 options from the content doc are shown; the Hindi line (recommended)
 * is the default and the accessible name.
 *
 * Both strings are also rendered invisibly in the same grid cell, so the heading always reserves the
 * height of the taller one: the page below never jumps when the language changes.
 */
export default function LangFlip({ hindi, english, className = "" }: { hindi: string; english: string; className?: string }) {
  const [en, setEn] = useState(false);
  const [hover, setHover] = useState(false);
  const mouse = useRef(false);
  const ref = useRef<HTMLHeadingElement>(null);
  const seen = useInView(ref);

  // alternate only while the headline is actually on screen
  useEffect(() => {
    if (hover || !seen) return;
    const id = setInterval(() => setEn((v) => !v), 5500);
    return () => clearInterval(id);
  }, [hover, seen]);

  const text = en ? english : hindi;
  const words = text.split(" ");

  return (
    <h1
      ref={ref}
      className={`relative grid cursor-default select-none ${className}`}
      aria-label={hindi}
      onPointerEnter={(e) => { if (e.pointerType === "mouse") { mouse.current = true; setHover(true); setEn(true); } }}
      onPointerLeave={(e) => { if (e.pointerType === "mouse") { setHover(false); setEn(false); } }}
      onPointerDown={(e) => { mouse.current = e.pointerType === "mouse"; }}
      onClick={() => { if (!mouse.current) setEn((v) => !v); }}
    >
      {/* height reservation */}
      <span aria-hidden className="hindi invisible col-start-1 row-start-1">{hindi}</span>
      <span aria-hidden className="invisible col-start-1 row-start-1">{english}</span>

      {/* first load and every language change: each word rises out of its own mask (no flipping, no bounce) */}
      <span className="relative col-start-1 row-start-1">
        <AnimatePresence mode="popLayout">
          <motion.span key={text} className={`block ${en ? "" : "hindi"}`} aria-hidden>
            {words.map((w, i) => (
              <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.14em] -mb-[0.14em]">
                <motion.span
                  className="inline-block will-change-transform"
                  initial={{ y: "115%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-115%" }}
                  transition={{ duration: 0.85, ease: EASE, delay: 0.15 + i * 0.09 }}
                >
                  {w}
                </motion.span>
                {i < words.length - 1 ? " " : ""}
              </span>
            ))}
          </motion.span>
        </AnimatePresence>
      </span>

      <span className="absolute -bottom-6 left-0 text-[10px] font-bold uppercase tracking-[0.22em] text-pink-500/80">
        {en ? "English" : "हिंदी"} · <span className="[@media(hover:none)]:hidden">hover to switch</span>
        <span className="hidden [@media(hover:none)]:inline">tap to switch</span>
      </span>
    </h1>
  );
}
