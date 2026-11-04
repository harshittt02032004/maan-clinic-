"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { ABOUT } from "@/content/about";

/** Career journey: a horizontal strip that scrubs sideways with vertical scroll on desktop; stacked on mobile. */
export default function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-58%"]);

  return (
    <section className="rule-b">
      <div className="container-x pt-16">
        <SectionHeading eyebrow="The journey" title="From KGMU to Raebareli — via the United States and Agra." hindi="शिक्षा, शोध और अनुभव" />
      </div>

      <div ref={ref} className="relative hidden h-[280vh] lg:block">
        <div className="sticky top-28 flex h-[70vh] items-center overflow-hidden">
          <motion.div style={{ x }} className="flex gap-0 pl-[calc((100vw-1440px)/2+3rem)]">
            {ABOUT.sections.map((s, i) => (
              <article key={s.title} className={`relative flex w-[36rem] shrink-0 flex-col justify-between border-[1.5px] border-ink p-10 ${i > 0 ? "-ml-[1.5px]" : ""} ${i % 2 ? "bg-blush" : "bg-white"}`}>
                <div className="flex items-start justify-between">
                  <span className="font-display text-[88px] font-extrabold leading-none text-magenta">0{i + 1}</span>
                  <span className="border-[1.5px] border-ink bg-ink px-3 py-1 font-display text-[13px] font-bold text-white">{s.year}</span>
                </div>
                <div>
                  <h3 className="font-display text-[26px] font-bold leading-tight text-ink">{s.title}</h3>
                  <p className="mt-4 text-[16px] leading-relaxed text-body">{s.body}</p>
                </div>
              </article>
            ))}
            <div className="w-[24vw] shrink-0" />
          </motion.div>
        </div>
      </div>

      <div className="container-x mt-10 pb-14 lg:hidden">
        {ABOUT.sections.map((s, i) => (
          <Reveal key={s.title} className={`border-[1.5px] border-ink p-6 ${i > 0 ? "-mt-[1.5px]" : ""} ${i % 2 ? "bg-blush" : "bg-white"}`}>
            <div className="flex items-start justify-between">
              <span className="font-display text-[56px] font-extrabold leading-none text-magenta">0{i + 1}</span>
              <span className="bg-ink px-3 py-1 font-display text-[12px] font-bold text-white">{s.year}</span>
            </div>
            <h3 className="mt-4 font-display text-[22px] font-bold leading-tight text-ink">{s.title}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-body">{s.body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
