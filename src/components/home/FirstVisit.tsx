"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Reveal, Stagger, Item } from "@/components/motion/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { FIRST_VISIT } from "@/content/about";

/** Three steps on a path that draws itself as you scroll down the section. */
export default function FirstVisit({ steps = FIRST_VISIT, eyebrow = "Your first visit", title = "What actually happens in the room.", hindi = "पहली मुलाक़ात में क्या होता है?" }: { steps?: { t: string; d: string }[]; eyebrow?: string; title?: string; hindi?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const line = useSpring(scrollYProgress, { stiffness: 80, damping: 22 });

  return (
    <section className="container-x section-y">
      <SectionHeading eyebrow={eyebrow} title={title} hindi={hindi} align="center" />
      <div ref={ref} className="relative mx-auto mt-14 max-w-3xl">
        <div aria-hidden className="absolute left-6 top-2 bottom-2 w-px bg-pink-100 sm:left-1/2" />
        <motion.div aria-hidden style={{ scaleY: line }} className="absolute left-6 top-2 bottom-2 w-px origin-top bg-gradient-to-b from-pink-500 to-navy-500 sm:left-1/2" />
        <Stagger className="space-y-10" gap={0.15}>
          {steps.map((s, i) => (
            <Item key={s.t} className={`relative flex gap-6 pl-16 sm:w-1/2 sm:pl-0 ${i % 2 ? "sm:ml-auto sm:pl-12" : "sm:pr-12 sm:text-right"}`}>
              <span className={`absolute left-0 top-0 grid size-12 place-items-center rounded-full bg-navy-900 font-display text-sm font-extrabold text-white ring-8 ring-blush sm:left-auto ${i % 2 ? "sm:-left-6" : "sm:-right-6"}`}>
                0{i + 1}
              </span>
              <Reveal className="card p-6">
                <h3 className="font-display text-xl font-extrabold text-navy-900">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">{s.d}</p>
              </Reveal>
            </Item>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
