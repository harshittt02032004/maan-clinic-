"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal, Stagger, Item } from "@/components/motion/Reveal";
import { EASE } from "@/lib/motion";

/**
 * Signs list you can tick. Deliberately non-diagnostic: it never scores, labels or
 * alarms — it only echoes the content doc's own "a consultation is a sensible next step".
 * Nothing is stored or sent anywhere.
 */
export default function SignsCheck({ title, signs }: { title: string; signs: string[] }) {
  const [sel, setSel] = useState<Set<number>>(new Set());
  const toggle = (i: number) =>
    setSel((s) => {
      const n = new Set(s);
      n.has(i) ? n.delete(i) : n.add(i);
      return n;
    });

  return (
    <Reveal>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h2 className="text-[28px] font-extrabold leading-[1.05] text-ink sm:text-[36px]">{title}</h2>
        <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-body">Tap what feels familiar · nothing is saved</p>
      </div>
      <Stagger className="rule-t mt-6" gap={0.04}>
        {signs.map((s, i) => {
          const on = sel.has(i);
          return (
            <Item key={s} className="border-b border-rule">
              <button type="button" onClick={() => toggle(i)} aria-pressed={on} className={`flex w-full items-start gap-4 py-3.5 text-left text-[15px] transition-colors sm:text-[16px] ${on ? "text-magenta" : "text-ink hover:text-magenta"}`}>
                <span className={`mt-[3px] grid size-5 shrink-0 place-items-center border-[1.5px] transition-colors ${on ? "border-magenta bg-magenta" : "border-ink"}`}>
                  <AnimatePresence>{on && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="block size-2 bg-white" />}</AnimatePresence>
                </span>
                <span className="font-display text-[12px] font-bold text-body">{String(i + 1).padStart(2, "0")}</span>
                {s}
              </button>
            </Item>
          );
        })}
      </Stagger>
      <AnimatePresence>
        {sel.size > 0 && (
          <motion.p initial={{ opacity: 0, y: 8, height: 0 }} animate={{ opacity: 1, y: 0, height: "auto" }} exit={{ opacity: 0, y: 8, height: 0 }} transition={{ duration: 0.35, ease: EASE }} className="mt-5 overflow-hidden bg-ink px-5 py-4 text-[15px] text-white">
            {sel.size === 1 ? "One sign on its own means little." : `You picked ${sel.size}.`} This list is for awareness, not diagnosis — if some of these have stayed for a while, a confidential consultation is a sensible next step.
          </motion.p>
        )}
      </AnimatePresence>
    </Reveal>
  );
}
