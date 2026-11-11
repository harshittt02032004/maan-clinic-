"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { CONDITION_GROUPS, type GroupIcon } from "@/content/conditionGroups";
import { EASE } from "@/lib/motion";

const D = 0.42; // 350–500ms window from the brief

/** Minimal line icons, one per category. */
function GroupIconSvg({ icon, className = "size-5" }: { icon: GroupIcon; className?: string }) {
  const p = { className, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  switch (icon) {
    case "mood":
      return <svg {...p}><circle cx="12" cy="12" r="8.5" /><path d="M8.5 14c1 1.3 2.2 2 3.5 2s2.5-.7 3.5-2" /><path d="M9 9.5h.01M15 9.5h.01" /></svg>;
    case "anxiety":
      return <svg {...p}><path d="M3 12h3.5l2-5 3.5 10 2.5-7 1.5 2H21" /></svg>;
    case "psychotic":
      return <svg {...p}><path d="M12 3.5a6.5 6.5 0 0 0-6.5 6.5c0 2.3 1 3.6 2 4.8.7.9 1 1.6 1 2.7h7c0-1.1.3-1.8 1-2.7 1-1.2 2-2.5 2-4.8A6.5 6.5 0 0 0 12 3.5z" /><path d="M9.5 20.5h5" /><path d="M10 10.5c.6-.8 1.3-1.2 2-1.2s1.4.4 2 1.2" /></svg>;
    case "sleep":
      return <svg {...p}><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" /><path d="M16 3h4l-4 4h4" /></svg>;
    case "addiction":
      return <svg {...p}><path d="M10 14a3.5 3.5 0 0 0 5 0l3-3a3.5 3.5 0 0 0-5-5l-1 1" /><path d="M14 10a3.5 3.5 0 0 0-5 0l-3 3a3.5 3.5 0 0 0 5 5l1-1" /></svg>;
    case "other":
      return <svg {...p}><circle cx="12" cy="12" r="8.5" /><path d="M12 8v4l2.5 1.5" /><path d="M7.5 7.5l1 1M16.5 7.5l-1 1" /></svg>;
  }
}

/** Larger illustration for the content panel: the same icon language, drawn bigger and lighter. */
function GroupIllustration({ icon }: { icon: GroupIcon }) {
  return (
    <div className="relative grid size-24 shrink-0 place-items-center rounded-[22px] bg-pink-50 text-pink-600 sm:size-28">
      <span aria-hidden="true" className="absolute inset-0 rounded-[22px] border border-pink-100" />
      <GroupIconSvg icon={icon} className="size-11 sm:size-12" />
    </div>
  );
}

export default function ConditionsTabs() {
  const [group, setGroup] = useState(0);
  const [picked, setPicked] = useState(0);
  const reduce = useReducedMotion();
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const listRef = useRef<HTMLDivElement>(null);

  // The tab list is vertical from lg and a horizontal scroller below it: tell assistive tech which.
  const [vertical, setVertical] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setVertical(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const g = CONDITION_GROUPS[group];
  const c = g.conditions[Math.min(picked, g.conditions.length - 1)];

  const select = (i: number) => {
    if (i === group) return;
    setGroup(i);
    setPicked(0);
  };

  // Keep the active tab visible when the list scrolls horizontally (phones).
  useEffect(() => {
    const el = tabRefs.current[group];
    const list = listRef.current;
    if (!el || !list) return;
    if (list.scrollWidth <= list.clientWidth) return;
    const left = el.offsetLeft - (list.clientWidth - el.offsetWidth) / 2;
    list.scrollTo({ left, behavior: reduce ? "auto" : "smooth" });
  }, [group, reduce]);

  const onKey = (e: React.KeyboardEvent) => {
    const n = CONDITION_GROUPS.length;
    let next = group;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (group + 1) % n;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (group - 1 + n) % n;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = n - 1;
    else return;
    e.preventDefault();
    select(next);
    tabRefs.current[next]?.focus();
  };

  const fade = {
    initial: reduce ? { opacity: 1 } : { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: reduce ? { opacity: 1 } : { opacity: 0, y: -6 },
  };

  return (
    <LayoutGroup id={baseId}>
      <div className="grid gap-5 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-7 xl:grid-cols-[330px_minmax(0,1fr)]">
        {/* LEFT: category navigation (vertical on desktop, horizontal scroll on phones) */}
        <div
          ref={listRef}
          role="tablist"
          aria-label="Condition categories"
          aria-orientation={vertical ? "vertical" : "horizontal"}
          onKeyDown={onKey}
          className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] lg:mx-0 lg:flex-col lg:gap-1.5 lg:overflow-visible lg:rounded-3xl lg:border lg:border-navy-100/70 lg:bg-white/70 lg:p-3 lg:pb-3 lg:shadow-[var(--shadow-soft)] [&::-webkit-scrollbar]:hidden"
        >
          {CONDITION_GROUPS.map((item, i) => {
            const active = i === group;
            return (
              <button
                key={item.id}
                ref={(el) => { tabRefs.current[i] = el; }}
                type="button"
                role="tab"
                id={`${baseId}-tab-${item.id}`}
                aria-selected={active}
                aria-controls={`${baseId}-panel`}
                tabIndex={active ? 0 : -1}
                onClick={() => select(i)}
                className={`group relative isolate flex shrink-0 cursor-pointer items-center gap-3 whitespace-nowrap rounded-2xl border px-4 py-3 text-left text-sm font-bold transition-colors duration-300 lg:w-full lg:whitespace-normal lg:px-4 lg:py-3.5 lg:text-[15px] ${
                  active ? "border-pink-100 text-navy-900 lg:border-transparent" : "border-navy-100/70 bg-white/70 text-navy-700 hover:border-pink-200 hover:text-navy-900 lg:border-transparent lg:bg-transparent"
                } focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-pink-300/50`}
              >
                {active && (
                  <motion.span
                    layoutId="conditions-active-tab"
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 rounded-2xl bg-pink-50"
                    transition={reduce ? { duration: 0 } : { duration: D, ease: EASE }}
                  />
                )}
                <span
                  className={`grid size-9 shrink-0 place-items-center rounded-xl transition-colors duration-300 ${
                    active ? "bg-white text-pink-600 shadow-[0_2px_8px_rgba(236,45,132,0.12)]" : "bg-navy-50 text-navy-400 group-hover:text-pink-600"
                  }`}
                >
                  <GroupIconSvg icon={item.icon} />
                </span>
                <span className="leading-tight">{item.name}</span>
                <span
                  aria-hidden="true"
                  className={`ml-auto hidden h-5 w-[3px] rounded-full bg-pink-500 transition-opacity duration-300 lg:block ${active ? "opacity-100" : "opacity-0"}`}
                />
              </button>
            );
          })}
        </div>

        {/* RIGHT: content panel */}
        <div
          id={`${baseId}-panel`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${g.id}`}
          className="relative grid overflow-hidden rounded-3xl border border-navy-100/70 bg-white p-6 shadow-[var(--shadow-soft)] sm:p-8 lg:p-10"
        >
          {/* Invisible copies of every condition's layout, stacked in the same grid cell as the live content:
              the panel is always exactly as tall as the tallest one, so switching never moves the page. */}
          <div aria-hidden="true" className="pointer-events-none invisible col-start-1 row-start-1 grid">
            {CONDITION_GROUPS.flatMap((gr) =>
              gr.conditions.map((cond) => (
                <div key={`${gr.id}-${cond.name}`} className="col-start-1 row-start-1 flex flex-col">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-7">
                    <div className="size-24 shrink-0 sm:size-28" />
                    <div className="min-w-0">
                      <span className="text-[11px] font-bold uppercase tracking-[0.18em]">00 / 00</span>
                      <h3 className="mt-2 font-display text-2xl font-extrabold leading-tight sm:text-3xl">{gr.name}</h3>
                      <p className="mt-3 max-w-xl text-[15px] leading-relaxed">{gr.intro}</p>
                    </div>
                  </div>
                  <div className="mt-7 flex flex-wrap gap-2.5">
                    {gr.conditions.map((x) => (
                      <span key={x.name} className="inline-flex min-h-11 items-center rounded-full border px-4 py-2 text-sm font-bold">{x.name}</span>
                    ))}
                  </div>
                  <div className="mt-6 flex flex-1 flex-col justify-between gap-6 border-t pt-6">
                    <div>
                      <h4 className="font-display text-lg font-extrabold">{cond.name}</h4>
                      <p className="mt-2 max-w-2xl text-[15px] leading-relaxed">{cond.description}</p>
                    </div>
                    <div>
                      <span className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold">
                        Learn more about {cond.name}
                        <span className="size-4" />
                      </span>
                    </div>
                  </div>
                </div>
              )),
            )}
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={g.id}
              initial={fade.initial}
              animate={fade.animate}
              exit={fade.exit}
              transition={{ duration: reduce ? 0 : D * 0.7, ease: EASE }}
              className="col-start-1 row-start-1 flex h-full flex-col"
            >
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-7">
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: D, ease: EASE, delay: 0.05 }}
                  className="motion-safe:animate-[cond-float_6s_ease-in-out_infinite]"
                >
                  <GroupIllustration icon={g.icon} />
                </motion.div>
                <div className="min-w-0">
                  <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-pink-600">
                    {String(group + 1).padStart(2, "0")} / {String(CONDITION_GROUPS.length).padStart(2, "0")}
                  </span>
                  <motion.h3
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: D, ease: EASE, delay: 0.08 }}
                    className="mt-2 font-display text-2xl font-extrabold leading-tight text-navy-900 sm:text-3xl"
                  >
                    {g.name}
                  </motion.h3>
                  <motion.p
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: D, ease: EASE, delay: 0.16 }}
                    className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted"
                  >
                    {g.intro}
                  </motion.p>
                </div>
              </div>

              {/* condition selectors */}
              <div className="mt-7 flex flex-wrap gap-2.5" role="group" aria-label={`${g.name}: conditions`}>
                {g.conditions.map((item, i) => {
                  const on = i === Math.min(picked, g.conditions.length - 1);
                  return (
                    <motion.button
                      key={item.name}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setPicked(i)}
                      initial={reduce ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: D * 0.8, ease: EASE, delay: 0.18 + i * 0.07 }}
                      className={`inline-flex min-h-11 cursor-pointer items-center rounded-full border px-4 py-2 text-sm font-bold transition-[border-color,background-color,color,box-shadow] duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-pink-300/50 ${
                        on ? "border-pink-500 bg-pink-500 text-white shadow-[0_8px_20px_-10px_rgba(236,45,132,0.6)]" : "border-navy-100 bg-white text-navy-800 hover:border-pink-300 hover:text-pink-700"
                      }`}
                    >
                      {item.name}
                    </motion.button>
                  );
                })}
              </div>

              {/* selected condition */}
              <div className="mt-6 flex flex-1 flex-col justify-between gap-6 border-t border-navy-100/70 pt-6">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={c.name}
                    initial={reduce ? { opacity: 1 } : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={reduce ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: reduce ? 0 : D * 0.6, ease: EASE }}
                  >
                    <h4 className="font-display text-lg font-extrabold text-navy-900">{c.name}</h4>
                    <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-muted">{c.description}</p>
                  </motion.div>
                </AnimatePresence>
                <div>
                  <Link
                    href={`/${c.slug}/`}
                    className="group/link inline-flex items-center gap-2 rounded-full bg-navy-900 px-5 py-3 text-sm font-bold text-white transition-[background-color,transform] duration-300 hover:bg-pink-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-pink-300/60 active:scale-[0.98]"
                  >
                    Learn more about {c.name}
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </LayoutGroup>
  );
}
