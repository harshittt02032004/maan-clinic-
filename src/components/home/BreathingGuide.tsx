"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Square } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Interactive box-breathing guide (4-4-4-4). A calm, useful moment on the page —
 * framed as a general relaxation exercise, not as treatment.
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
    <section className="container-x section-y">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <span className="eyebrow">A moment for you</span>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight text-navy-900 sm:text-4xl lg:text-5xl">
            Before you read on, <span className="text-gradient">take one slow breath.</span>
          </h2>
          <p className="hindi mt-2 text-lg text-pink-600">घबराहट में सबसे पहले साँस धीमी कीजिए।</p>
          <p className="mt-5 max-w-lg text-muted sm:text-lg">
            Box breathing — four counts in, hold, four counts out, hold — is a simple technique many people find steadying. Press play and follow the circle. It is a general relaxation exercise, not a treatment; if restlessness or panic keeps returning, a consultation is the right next step.
          </p>
          <button
            type="button"
            onClick={() => setOn((v) => !v)}
            aria-pressed={on}
            className={`${on ? "btn-navy" : "btn-primary"} mt-8`}
          >
            {on ? <><Square className="size-4" /> Stop</> : <><Play className="size-4" /> Start breathing</>}
          </button>
        </Reveal>

        <Reveal delay={0.15} className="relative mx-auto grid aspect-square w-full max-w-md place-items-center">
          {/* rings */}
          {[0, 1, 2].map((r) => (
            <motion.div
              key={r}
              aria-hidden
              className="absolute rounded-full border border-pink-300/60"
              style={{ inset: `${r * 9}%` }}
              animate={{ scale: on ? ph.scale * (1 + r * 0.04) : 0.78, opacity: on ? 0.9 - r * 0.25 : 0.4 }}
              transition={{ duration: on ? ph.secs : 1.2, ease: "easeInOut" }}
            />
          ))}
          <motion.div
            aria-hidden
            className="absolute inset-[18%] rounded-full bg-gradient-to-br from-pink-400 via-pink-500 to-navy-500 shadow-[var(--shadow-pink)]"
            animate={{ scale: on ? ph.scale : 0.72 }}
            transition={{ duration: on ? ph.secs : 1.2, ease: "easeInOut" }}
          />
          <div className="relative text-center text-white">
            <AnimatePresence mode="wait">
              <motion.div key={on ? ph.label + i : "idle"} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
                {on ? (
                  <>
                    <div className="font-display text-5xl font-black tabular-nums">{count}</div>
                    <div className="mt-1 text-sm font-bold uppercase tracking-[0.2em]">{ph.label}</div>
                    <div className="hindi text-sm text-pink-100">{ph.hindi}</div>
                  </>
                ) : (
                  <>
                    <div className="hindi font-display text-4xl font-bold">मन</div>
                    <div className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-pink-100">press start</div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
