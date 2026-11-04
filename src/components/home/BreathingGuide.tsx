"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Interactive box-breathing guide (4-4-4-4), drawn flat in the poster palette.
 * Framed as a general relaxation exercise, not a treatment.
 */
const PHASES = [
  { label: "Breathe in", hindi: "साँस अंदर", scale: 1, secs: 4 },
  { label: "Hold", hindi: "रोकिए", scale: 1, secs: 4 },
  { label: "Breathe out", hindi: "साँस बाहर", scale: 0.55, secs: 4 },
  { label: "Hold", hindi: "रोकिए", scale: 0.55, secs: 4 },
] as const;

export default function BreathingGuide() {
  const [on, setOn] = useState(false);
  const [i, setI] = useState(0);
  const [count, setCount] = useState(4);

  useEffect(() => {
    if (!on) { setI(0); setCount(4); return; }
    let phase = 0, left = PHASES[0].secs;
    setI(0); setCount(left);
    const id = setInterval(() => {
      left -= 1;
      if (left <= 0) { phase = (phase + 1) % PHASES.length; left = PHASES[phase].secs; setI(phase); }
      setCount(left);
    }, 1000);
    return () => clearInterval(id);
  }, [on]);

  const ph = PHASES[i];

  return (
    <section className="rule-b">
      <div className="container-x grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-6">
          <p className="kicker"><span className="kicker-line" />A moment for you</p>
          <h2 className="mt-4 text-4xl font-extrabold leading-[1] text-ink sm:text-5xl lg:text-[56px]">Before you read on, take one slow breath.</h2>
          <p className="hindi mt-3 text-xl font-semibold text-magenta sm:text-2xl">घबराहट में सबसे पहले साँस धीमी कीजिए।</p>
          <p className="mt-5 max-w-lg text-[16px] leading-relaxed text-body sm:text-[17px]">
            Box breathing — four counts in, hold, four counts out, hold — is a simple technique many people find steadying. Press start and follow the circle. It is a general relaxation exercise, not a treatment; if restlessness or panic keeps returning, a consultation is the right next step.
          </p>
          <button type="button" onClick={() => setOn((v) => !v)} aria-pressed={on} className={`${on ? "btn-line" : "btn-ink"} mt-8`}>
            {on ? "Stop" : "Start breathing"}
          </button>
        </Reveal>

        <Reveal delay={0.15} className="lg:col-span-5 lg:col-start-8">
          <div className="relative mx-auto grid aspect-square w-full max-w-sm place-items-center border-[1.5px] border-ink bg-blush">
            <span className="absolute left-4 top-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink">4 · 4 · 4 · 4</span>
            <motion.div aria-hidden className="absolute inset-[12%] rounded-full border-[1.5px] border-ink" animate={{ scale: on ? ph.scale : 0.78 }} transition={{ duration: on ? ph.secs : 1, ease: "easeInOut" }} />
            <motion.div aria-hidden className="absolute inset-[20%] rounded-full bg-magenta" animate={{ scale: on ? ph.scale : 0.72 }} transition={{ duration: on ? ph.secs : 1, ease: "easeInOut" }} />
            <div className="relative text-center text-white">
              <AnimatePresence mode="wait">
                <motion.div key={on ? ph.label + i : "idle"} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }}>
                  {on ? (
                    <>
                      <div className="font-display text-5xl font-extrabold tabular-nums">{count}</div>
                      <div className="mt-1 text-[12px] font-bold uppercase tracking-[0.18em]">{ph.label}</div>
                      <div className="hindi text-[14px]">{ph.hindi}</div>
                    </>
                  ) : (
                    <>
                      <div className="hindi text-4xl font-bold">मन</div>
                      <div className="mt-1 text-[11px] font-bold uppercase tracking-[0.18em]">press start</div>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
