"use client";

import { Stagger, Item } from "@/components/motion/Reveal";
import { ABOUT } from "@/content/about";

/** "The Journey (timeline)" + registration line from the content doc, in the navy philosophy band. */
export default function Timeline() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur sm:p-8">
      <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-pink-300">The journey at a glance</h3>
      <Stagger className="relative mt-6 space-y-5 before:absolute before:bottom-2 before:left-[5px] before:top-2 before:w-px before:bg-white/15" gap={0.06}>
        {ABOUT.journey.map((j) => (
          <Item key={j.t} className="relative pl-7">
            <span aria-hidden="true" className="absolute left-0 top-1.5 size-[11px] rounded-full border-2 border-pink-300 bg-navy-900" />
            <span className="block text-sm font-bold leading-snug text-white">{j.t}</span>
            <span className="mt-0.5 block text-[13px] leading-snug text-navy-200">
              {j.d}
              {j.when && <span className="text-pink-200"> · {j.when}</span>}
            </span>
          </Item>
        ))}
      </Stagger>
      <p className="mt-6 border-t border-white/10 pt-5 text-xs leading-relaxed text-navy-200">{ABOUT.registrationLine}</p>
    </div>
  );
}
