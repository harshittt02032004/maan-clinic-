"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { ABOUT } from "@/content/about";

/**
 * Career journey as a horizontal "film strip" that scrubs sideways with vertical scroll
 * on desktop (sticky), stacking normally on mobile.
 */
export default function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // three cards (v4): the strip is shorter, so it travels less and needs less scroll than the old four
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-38%"]);

  return (
    <section>
      <div className="container-x pt-16">
        <SectionHeading eyebrow="The journey" title="From KGMU to Raebareli — via the United States and Agra." hindi="शिक्षा, शोध और अनुभव" />
      </div>

      {/* desktop: sticky horizontal scrub */}
      <div ref={ref} className="relative hidden h-[220vh] lg:block">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <motion.div style={{ x }} className="flex gap-6 pl-[calc((100vw-80rem)/2+2.5rem)]">
            {ABOUT.sections.map((s, i) => (
              <article key={s.title} className="card relative w-[34rem] shrink-0 p-10">
                <span className="font-display text-7xl font-black text-pink-100">0{i + 1}</span>
                <span className="absolute right-8 top-8 rounded-full bg-navy-900 px-3 py-1 text-xs font-bold text-white">{s.year}</span>
                <h3 className="mt-2 font-display text-2xl font-extrabold text-navy-900">{s.title}</h3>
                <p className="mt-4 leading-relaxed text-muted">{s.body}</p>
              </article>
            ))}
            <div className="w-[20vw] shrink-0" />
          </motion.div>
        </div>
      </div>

      {/* mobile: stacked */}
      <div className="container-x mt-10 space-y-5 lg:hidden">
        {ABOUT.sections.map((s, i) => (
          <Reveal key={s.title} className="card relative p-6">
            <span className="font-display text-5xl font-black text-pink-100">0{i + 1}</span>
            <span className="absolute right-5 top-5 rounded-full bg-navy-900 px-3 py-1 text-xs font-bold text-white">{s.year}</span>
            <h3 className="mt-1 font-display text-xl font-extrabold text-navy-900">{s.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{s.body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
