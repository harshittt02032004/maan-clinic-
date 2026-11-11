"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "@/lib/motion";

/**
 * Hero headline that flips between Hindi and English like a split-flap board —
 * auto every 5.5 s, instantly on hover / tap. Both H1 options from the content doc
 * are shown; the Hindi line (recommended) is the default and the accessible name.
 */
export default function LangFlip({ hindi, english, className = "" }: { hindi: string; english: string; className?: string }) {
  const [en, setEn] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (hover) return;
    const id = setInterval(() => setEn((v) => !v), 5500);
    return () => clearInterval(id);
  }, [hover]);

  const text = en ? english : hindi;
  const words = text.split(" ");

  return (
    <h1
      className={`relative cursor-default select-none ${className}`}
      aria-label={hindi}
      onMouseEnter={() => { setHover(true); setEn(true); }}
      onMouseLeave={() => { setHover(false); setEn(false); }}
      onClick={() => setEn((v) => !v)}
      style={{ perspective: 900 }}
    >
      {/* first load and every language change: each word rises out of its own mask (no flipping, no bounce) */}
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
      <span className="absolute -bottom-6 left-0 text-[10px] font-bold uppercase tracking-[0.22em] text-pink-500/80">
        {en ? "English" : "हिंदी"} · hover to switch
      </span>
    </h1>
  );
}
