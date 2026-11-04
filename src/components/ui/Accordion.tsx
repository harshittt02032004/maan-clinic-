"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Faq } from "@/content/conditions";
import { EASE } from "@/lib/motion";

export default function Accordion({ items, defaultOpen = 0 }: { items: Faq[]; defaultOpen?: number | null }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  return (
    <div className="rule-t">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className={i === items.length - 1 ? "rule-b" : "border-b border-rule"}>
            <button type="button" onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen} className="flex w-full items-start justify-between gap-6 py-5 text-left">
              <span className={`font-display text-[17px] font-bold leading-snug sm:text-[20px] ${isOpen ? "text-magenta" : "text-ink"}`}>{f.q}</span>
              <span aria-hidden className="relative mt-1 size-5 shrink-0">
                <span className="absolute left-0 top-1/2 h-[2px] w-5 -translate-y-1/2 bg-magenta" />
                <motion.span animate={{ scaleY: isOpen ? 0 : 1 }} transition={{ duration: 0.25, ease: EASE }} className="absolute left-1/2 top-0 h-5 w-[2px] -translate-x-1/2 bg-magenta" />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: EASE }} className="overflow-hidden">
                  <p className="max-w-2xl pb-6 text-[15px] leading-relaxed text-body sm:text-[16px]">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
