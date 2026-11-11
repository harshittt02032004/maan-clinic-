"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import LineReveal from "@/components/motion/LineReveal";

/**
 * Guided breathing: in 4 s · hold 4 s · out 6 s. Not autoplayed.
 *
 * One Web Animations API animation drives the circle (a GPU transform), and its own
 * clock (`currentTime`) drives the phase label, countdown and progress ring, so the
 * text can never drift from the movement and Pause freezes everything together.
 * General relaxation only — not presented as treatment.
 */
const PHASES = [
  { label: "Breathe In", hindi: "साँस अंदर", secs: 4 },
  { label: "Hold", hindi: "रोकिए", secs: 4 },
  { label: "Breathe Out", hindi: "साँस बाहर", secs: 6 },
] as const;
const CYCLE = PHASES.reduce((n, p) => n + p.secs, 0); // 14 s
const EASE = "cubic-bezier(0.45, 0, 0.55, 1)"; // slow in, slow out: no bounce, no snap

type Status = "idle" | "running" | "paused";

export default function BreathingGuide() {
  const circle = useRef<HTMLDivElement>(null);
  const ring = useRef<SVGCircleElement>(null);
  const dot = useRef<SVGCircleElement>(null);
  const anim = useRef<Animation | null>(null);
  const raf = useRef(0);
  const [status, setStatus] = useState<Status>("idle");
  const [phase, setPhase] = useState(0);
  const [left, setLeft] = useState<number>(PHASES[0].secs);

  const paintRing = useCallback((frac: number) => {
    ring.current?.style.setProperty("stroke-dashoffset", String(1 - frac));
    const a = frac * Math.PI * 2 - Math.PI / 2;
    dot.current?.setAttribute("cx", String(100 + 94 * Math.cos(a)));
    dot.current?.setAttribute("cy", String(100 + 94 * Math.sin(a)));
  }, []);

  const tick = useCallback(() => {
    const a = anim.current;
    if (!a) return;
    const t = (Number(a.currentTime ?? 0) / 1000) % CYCLE;
    let acc = 0;
    let idx = 0;
    for (; idx < PHASES.length; idx++) {
      if (t < acc + PHASES[idx].secs) break;
      acc += PHASES[idx].secs;
    }
    idx = Math.min(idx, PHASES.length - 1);
    setPhase((p) => (p === idx ? p : idx));
    const remaining = Math.max(1, Math.ceil(acc + PHASES[idx].secs - t));
    setLeft((l) => (l === remaining ? l : remaining));
    paintRing(t / CYCLE);
    raf.current = requestAnimationFrame(tick);
  }, [paintRing]);

  const build = useCallback(() => {
    const el = circle.current;
    if (!el) return null;
    anim.current?.cancel();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lo = reduced ? 0.92 : 0.58; // reduced motion: barely any size change; the text and ring carry it
    const a = el.animate(
      [
        { transform: `scale(${lo})`, offset: 0, easing: EASE },
        { transform: "scale(1)", offset: PHASES[0].secs / CYCLE },
        { transform: "scale(1)", offset: (PHASES[0].secs + PHASES[1].secs) / CYCLE, easing: EASE },
        { transform: `scale(${lo})`, offset: 1 },
      ],
      { duration: CYCLE * 1000, iterations: Infinity },
    );
    anim.current = a;
    return a;
  }, []);

  const run = (a: Animation) => {
    a.play();
    setStatus("running");
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(tick);
  };

  const onPrimary = () => {
    if (status === "running") {
      anim.current?.pause();
      cancelAnimationFrame(raf.current);
      setStatus("paused");
    } else if (status === "paused" && anim.current) {
      run(anim.current);
    } else {
      const a = build();
      if (a) run(a);
    }
  };

  const onRestart = () => {
    const a = build();
    if (!a) return;
    setPhase(0);
    setLeft(PHASES[0].secs);
    paintRing(0);
    run(a);
  };

  useEffect(
    () => () => {
      cancelAnimationFrame(raf.current);
      anim.current?.cancel();
    },
    [],
  );

  const ph = PHASES[phase];
  const active = status !== "idle";

  return (
    <section className="container-x section-y">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <span className="eyebrow">A moment for you</span>
          <LineReveal className="mt-4 text-3xl font-extrabold leading-[1.1] text-navy-900 sm:text-4xl lg:text-5xl">Before you read on, take one slow breath.</LineReveal>
          <p className="hindi mt-2 text-lg text-pink-600">घबराहट में सबसे पहले साँस धीमी कीजिए।</p>
          <p className="mt-5 max-w-lg text-muted sm:text-lg">
            Breathe in for four counts, hold for four, then breathe out slowly for six. Press Start and follow the circle at your own pace; pause whenever you like. It is a general relaxation exercise, not a treatment — if restlessness or panic keeps returning, a consultation is the right next step.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2 text-xs font-semibold text-navy-800" aria-label="Breathing pattern">
            {PHASES.map((p, i) => (
              <li key={p.label} className={`rounded-full border px-3.5 py-1.5 transition-colors duration-500 ${active && phase === i ? "border-accent bg-pink-50 text-pink-700" : "border-navy-100 bg-white/70"}`}>
                {p.label} · {p.secs}s
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1} className="mx-auto w-full max-w-md">
          <div className="relative grid aspect-square w-full place-items-center">
            {/* progress ring: one lap per breath cycle */}
            <svg viewBox="0 0 200 200" className="absolute inset-0 size-full -rotate-0" fill="none" aria-hidden>
              <circle cx="100" cy="100" r="94" stroke="var(--color-navy-100)" strokeWidth="1.5" />
              <circle ref={ring} cx="100" cy="100" r="94" pathLength={1} stroke="var(--color-accent)" strokeWidth="2.5" strokeLinecap="round" style={{ strokeDasharray: "1 1", strokeDashoffset: 1, transform: "rotate(-90deg)", transformOrigin: "100px 100px" }} />
              <circle ref={dot} cx="100" cy="6" r="4.5" fill="var(--color-accent)" style={{ opacity: active ? 1 : 0, transition: "opacity .4s" }} />
            </svg>

            <div className="absolute inset-[9%] grid place-items-center">
              <div ref={circle} aria-hidden className="size-full rounded-full border border-pink-200 bg-pink-100/80" style={{ transform: "scale(0.58)", willChange: "transform" }} />
            </div>

            <div className="relative text-center" role="status" aria-live="polite">
              {active ? (
                <>
                  <p className="font-display text-3xl font-extrabold text-navy-900 sm:text-4xl">{status === "paused" ? "Paused" : ph.label}</p>
                  <p className="hindi text-base text-pink-600">{status === "paused" ? ph.label : ph.hindi}</p>
                  <p className="mt-1 font-display text-lg font-bold tabular-nums text-navy-700">{left}</p>
                </>
              ) : (
                <>
                  <p className="font-display text-2xl font-extrabold text-navy-900">Ready when you are</p>
                  <p className="hindi text-base text-pink-600">जब आप चाहें</p>
                </>
              )}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-3">
            <button type="button" onClick={onPrimary} className="btn-primary" aria-label={status === "running" ? "Pause breathing exercise" : status === "paused" ? "Resume breathing exercise" : "Start breathing exercise"}>
              {status === "running" ? <><Pause className="size-4" /> Pause</> : <><Play className="size-4" /> {status === "paused" ? "Resume" : "Start"}</>}
            </button>
            <button type="button" onClick={onRestart} disabled={!active} className="btn-ghost disabled:cursor-not-allowed disabled:opacity-40">
              <RotateCcw className="size-4" /> Restart
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
