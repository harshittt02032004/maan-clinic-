"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
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
        <h2 className="text-2xl font-extrabold text-navy-900 sm:text-3xl">{title}</h2>
        <p className="text-xs font-semibold text-muted">Tap the ones that feel familiar · nothing is saved</p>
      </div>
      <Stagger className="mt-6 grid gap-3 sm:grid-cols-2" gap={0.05}>
        {signs.map((s, i) => {
          const on = sel.has(i);
          return (
            <Item key={s}>
              <button
                type="button"
                onClick={() => toggle(i)}
                aria-pressed={on}
                className={`flex w-full items-start gap-3 rounded-2xl border p-4 text-left text-sm transition-all duration-300 sm:text-[15px] ${
                  on ? "border-pink-500 bg-pink-50 text-navy-900 shadow-[var(--shadow-pink)]" : "border-navy-100 bg-white text-navy-800 hover:border-pink-300"
                }`}
              >
                <span className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border transition-colors ${on ? "border-pink-600 bg-pink-600 text-white" : "border-navy-200"}`}>
                  <AnimatePresence>{on && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><Check className="size-3" /></motion.span>}</AnimatePresence>
                </span>
                {s}
              </button>
            </Item>
          );
        })}
      </Stagger>
      <AnimatePresence>
        {sel.size > 0 && (
          <motion.p
            initial={{ opacity: 0, y: 10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: 10, height: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="mt-5 overflow-hidden rounded-2xl bg-navy-900 px-5 py-4 text-sm text-white"
          >
            {sel.size === 1 ? "One sign on its own means little." : `You picked ${sel.size}.`} This list is for awareness, not diagnosis — if some of these have stayed for a while, a confidential consultation is a sensible next step.
          </motion.p>
        )}
      </AnimatePresence>
    </Reveal>
  );
}
