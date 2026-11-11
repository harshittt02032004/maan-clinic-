"use client";

import { useEffect, useRef, useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import { initGsap, NO_REDUCE } from "@/lib/gsap";
import { FIRST_VISIT } from "@/content/about";

/**
 * Steps on a thin line that draws itself when the section comes into view:
 * left to right on tablets/desktops, top to bottom on phones. The numbered circles,
 * then each title and description, appear one after the other as the line reaches them.
 */
export default function FirstVisit({
  steps = FIRST_VISIT,
  eyebrow = "Your first visit",
  title = "What actually happens in the room.",
  hindi = "पहली मुलाक़ात में क्या होता है?",
}: {
  steps?: { t: string; d: string }[];
  eyebrow?: string;
  title?: string;
  hindi?: string;
}) {
  const root = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const { gsap } = initGsap();
    const mm = gsap.matchMedia();
    mm.add(NO_REDUCE, () => {
      const el = root.current;
      if (!el) return;
      const q = gsap.utils.selector(el);
      const dots = q("[data-dot]");
      const texts = q("[data-text]");
      const lineH = q("[data-line-h]");
      const lineV = q("[data-line-v]");

      gsap.set(dots, { scale: 0.7, opacity: 0 });
      gsap.set(texts, { y: 16, opacity: 0 });
      gsap.set(lineH, { scaleX: 0, transformOrigin: "0% 50%" });
      gsap.set(lineV, { scaleY: 0, transformOrigin: "50% 0%" });

      const STEP = 0.95;
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 75%", once: true } });
      dots.forEach((_, i) => {
        const t = i * STEP;
        tl.to(dots[i], { scale: 1, opacity: 1, duration: 0.55, ease: "power2.out" }, t);
        tl.to(texts[i], { y: 0, opacity: 1, duration: 0.75, ease: "power3.out" }, t + 0.15);
        tl.call(() => setActive(i), undefined, t + 0.2);
        if (lineH[i]) tl.to(lineH[i], { scaleX: 1, duration: STEP, ease: "none" }, t + 0.1);
        if (lineV[i]) tl.to(lineV[i], { scaleY: 1, duration: STEP, ease: "none" }, t + 0.1);
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section className="container-x section-y">
      <SectionHeading eyebrow={eyebrow} title={title} hindi={hindi} align="center" />

      <ol ref={root} className="mx-auto mt-14 grid max-w-5xl gap-10 md:grid-cols-3 md:gap-x-8">
        {steps.map((s, i) => {
          const last = i === steps.length - 1;
          const on = active === i;
          return (
            <li key={s.t} className="relative flex gap-5 md:flex-col md:items-center md:gap-5 md:text-center" onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)}>
              {/* connector to the next step: vertical on phones, horizontal from md */}
              {!last && (
                <>
                  <span aria-hidden data-line-v className="absolute left-7 top-7 h-[calc(100%+2.5rem)] w-px bg-pink-300 md:hidden" />
                  <span aria-hidden data-line-h className="absolute left-1/2 top-7 hidden h-px w-[calc(100%+2rem)] bg-pink-300 md:block" />
                </>
              )}
              <span
                data-dot
                className={`relative z-10 grid size-14 shrink-0 place-items-center rounded-full border font-display text-sm font-extrabold transition-colors duration-500 ${
                  on ? "border-accent bg-accent text-white" : "border-pink-200 bg-white text-navy-900"
                }`}
              >
                0{i + 1}
              </span>
              <div data-text className="pt-1.5 md:pt-0">
                <p className={`text-[11px] font-bold uppercase tracking-[0.22em] transition-colors duration-500 ${on ? "text-pink-600" : "text-muted"}`}>Step 0{i + 1}</p>
                <h3 className="mt-1 font-display text-xl font-extrabold uppercase tracking-wide text-navy-900">{s.t}</h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted sm:text-base md:mx-auto">{s.d}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
