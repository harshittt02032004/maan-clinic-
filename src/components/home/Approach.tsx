"use client";

import { useEffect, useRef } from "react";
import { HeartHandshake, LockKeyhole, Microscope, Sun } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { initGsap, NO_REDUCE, pathLength } from "@/lib/gsap";
import { PILLARS } from "@/content/about";

const ICONS = { HeartHandshake, LockKeyhole, Microscope, Sun };

/**
 * Four slightly different pen-drawn circles (not perfect geometry): each starts at the top,
 * goes round clockwise and overshoots its own start, the way a hand closes a circle.
 */
const CIRCLES = [
  "M62 9 C92 7 113 30 111 62 C109 93 86 113 57 111 C27 109 8 87 10 58 C12 29 35 9 65 10 C74 10 80 12 87 16",
  "M58 10 C88 8 112 28 110 60 C108 92 84 112 56 110 C26 108 9 86 11 57 C13 28 33 11 60 10 C71 9 79 11 85 14",
  "M64 9 C94 9 112 33 110 63 C108 92 85 111 56 110 C27 109 10 86 11 57 C12 30 33 9 62 9 C72 8 80 11 88 17",
  "M60 11 C90 9 111 31 110 61 C109 91 87 112 59 110 C29 108 9 87 10 59 C11 31 31 10 61 10 C70 9 78 12 86 15",
];

export default function Approach() {
  const root = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const { gsap } = initGsap();
    const mm = gsap.matchMedia();
    mm.add(NO_REDUCE, () => {
      const el = root.current;
      if (!el) return;
      const q = gsap.utils.selector(el);
      const mains = q(".main");
      const texts = q("[data-text]");
      const lineH = q("[data-line-h]");
      const lineV = q("[data-line-v]");
      const iconParts = (i: number) => Array.from(el.querySelectorAll(`[data-circle="${i}"] [data-icon] svg *`));

      // start state: nothing drawn, text low and transparent
      gsap.set(mains, { strokeDasharray: "1 1", strokeDashoffset: 1 });
      gsap.set(texts, { y: 18, opacity: 0 });
      gsap.set(lineH, { scaleX: 0, transformOrigin: "0% 50%" });
      gsap.set(lineV, { scaleY: 0, transformOrigin: "50% 0%" });
      PILLARS.forEach((_, i) => {
        iconParts(i).forEach((p) => {
          const len = pathLength(p);
          gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
        });
      });

      // drawn one after the other, a pen lifting between circles
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 72%", once: true } });
      PILLARS.forEach((_, i) => {
        const t = i * 1.25;
        tl.to(mains[i], { strokeDashoffset: 0, duration: 1.1, ease: "power2.inOut" }, t);
        tl.to(iconParts(i), { strokeDashoffset: 0, duration: 0.8, ease: "power1.inOut", stagger: 0.07, clearProps: "strokeDasharray,strokeDashoffset" }, t + 0.55);
        tl.to(texts[i], { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, t + 0.6);
        if (lineH[i]) tl.to(lineH[i], { scaleX: 1, duration: 0.7, ease: "none" }, t + 0.95);
        if (lineV[i]) tl.to(lineV[i], { scaleY: 1, duration: 0.7, ease: "none" }, t + 0.95);
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section className="relative overflow-hidden bg-navy-900 text-white">
      <div className="container-x section-y">
        <SectionHeading eyebrow="Our approach" title="Four things you can expect in every consultation." hindi="हर बात सुनी जाएगी — बिना जल्दबाज़ी, बिना फ़ैसले।" tone="light" align="center" />

        <ol ref={root} className="mt-16 grid gap-10 lg:grid-cols-4 lg:gap-8">
          {PILLARS.map((p, i) => {
            const Icon = ICONS[p.icon];
            const last = i === PILLARS.length - 1;
            return (
              <li key={p.t} className="group relative flex items-start gap-5 lg:flex-col lg:items-center lg:gap-6 lg:text-center">
                {/* thin line to the next principle: vertical on phones, horizontal from lg */}
                {!last && (
                  <>
                    <span aria-hidden data-line-v className="absolute left-14 top-14 h-[calc(100%+2.5rem)] w-px bg-white/25 lg:hidden" />
                    <span aria-hidden data-line-h className="absolute left-1/2 top-[4.5rem] hidden h-px w-[calc(100%+2rem)] bg-white/25 lg:block" />
                  </>
                )}

                <div data-circle={i} className="relative z-10 grid size-28 shrink-0 place-items-center rounded-full bg-navy-900 lg:size-36">
                  <svg viewBox="0 0 120 120" className="hand-circle absolute inset-0 size-full overflow-visible" fill="none" aria-hidden style={{ rotate: `${i * 7 - 6}deg` }}>
                    {/* second pen-pass, only visible on hover */}
                    <path className="retrace" d={CIRCLES[(i + 1) % 4]} stroke="var(--color-accent)" strokeWidth={2} strokeLinecap="round" style={{ transform: "rotate(10deg)", transformOrigin: "60px 60px" }} />
                    <path className="main" d={CIRCLES[i]} pathLength={1} stroke="rgba(255,255,255,0.88)" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span data-icon className="icon-draw relative text-pink-200 transition-colors duration-300 group-hover:text-white">
                    <Icon className="size-8 lg:size-10" strokeWidth={1.5} />
                  </span>
                </div>

                <div data-text className="pt-1 lg:pt-0">
                  <span className="text-[11px] font-bold tracking-[0.22em] text-accent-soft">0{i + 1}</span>
                  <h3 className="mt-1 font-display text-xl font-extrabold">{p.t}</h3>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-navy-100">{p.d}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
