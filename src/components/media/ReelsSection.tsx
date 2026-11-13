"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Play } from "lucide-react";

/** lucide 1.x has no brand icons: the Instagram glyph, hand-drawn to match. */
const InstagramIcon = ({ className = "size-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <path d="M16.8 7.2h.01" />
  </svg>
);
import { Reveal, Stagger, Item } from "@/components/motion/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { REELS } from "@/content/reels";
import { CLINIC } from "@/content/site";

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

/**
 * The clinic's own Instagram reels as tap-to-play phone cards in a snap scroller.
 * Nothing autoplays and nothing preloads: each card is a poster image until tapped,
 * so the section costs a few images, not 14 MB of video (mobile rule: no idle work).
 */
export default function ReelsSection({ intro }: { intro?: string }) {
  const refs = useRef<(HTMLVideoElement | null)[]>([]);
  const [active, setActive] = useState<number | null>(null);

  // A reel that scrolls out of view pauses instead of talking over the page.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (!e.isIntersecting) (e.target as HTMLVideoElement).pause(); }),
      { threshold: 0.3 },
    );
    refs.current.forEach((v) => v && io.observe(v));
    return () => io.disconnect();
  }, []);

  const toggle = (i: number) => {
    const v = refs.current[i];
    if (!v) return;
    if (v.paused) {
      refs.current.forEach((o, k) => { if (o && k !== i) o.pause(); });
      setActive(i);
      void v.play().catch(() => {});
    } else {
      v.pause();
    }
  };

  return (
    <section className="relative isolate overflow-hidden section-y">
      <div className="blob -left-32 top-24 size-96 bg-pink-200/60" />
      <div className="container-x flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="Watch"
          title="Straight talk, one minute at a time."
          hindi="मन की बातें — रील्स में"
          intro={intro ?? "Short videos from the clinic's Instagram — mental health explained simply, in Hindi."}
        />
        <Reveal delay={0.2}>
          <a
            href={CLINIC.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-navy-100 bg-white px-5 py-2.5 text-sm font-bold text-navy-800 transition-colors duration-300 hover:border-pink-300 hover:text-pink-700"
          >
            <InstagramIcon className="size-4 text-pink-600" /> @drmohitjainpsy
          </a>
        </Reveal>
      </div>

      <Stagger
        className="container-x mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:thin] sm:gap-6"
        gap={0.07}
      >
        {REELS.map((r, i) => (
          <Item key={r.src} className="w-[13.5rem] shrink-0 snap-start sm:w-[15rem]">
            <figure className="group">
              <div className="relative aspect-[9/16] overflow-hidden rounded-[1.9rem] border-4 border-navy-900 bg-navy-900 shadow-[var(--shadow-soft)]">
                <video
                  ref={(el) => { refs.current[i] = el; }}
                  src={r.src}
                  poster={r.poster}
                  preload="none"
                  playsInline
                  controls={active === i}
                  onClick={() => active !== i && toggle(i)}
                  onPlay={() => setActive(i)}
                  className="size-full cursor-pointer object-cover"
                />
                {active !== i && (
                  <button
                    type="button"
                    aria-label={`Play: ${r.title}`}
                    onClick={() => toggle(i)}
                    className="absolute inset-0 grid cursor-pointer place-items-center focus-visible:outline-none"
                  >
                    <span className="grid size-14 place-items-center rounded-full bg-white/90 text-pink-600 shadow-[var(--shadow-pink)] transition-transform duration-300 group-hover:scale-110">
                      <Play className="ml-0.5 size-6 fill-current" />
                    </span>
                    <span className="absolute bottom-3 right-3 rounded-full bg-navy-900/80 px-2.5 py-1 text-[11px] font-bold tabular-nums text-white">{fmt(r.seconds)}</span>
                  </button>
                )}
              </div>
              <figcaption className="mt-3 px-1">
                {r.href ? (
                  <Link href={r.href} className="group/t inline-flex items-center gap-1 font-display text-[15px] font-extrabold text-navy-900 hover:text-pink-600">
                    {r.title}
                    <ArrowUpRight className="size-3.5 opacity-0 transition-all duration-300 group-hover/t:opacity-100" />
                  </Link>
                ) : (
                  <span className="font-display text-[15px] font-extrabold text-navy-900">{r.title}</span>
                )}
                {r.hindi && <span className="hindi block text-[13px] text-pink-600">{r.hindi}</span>}
              </figcaption>
            </figure>
          </Item>
        ))}
      </Stagger>
    </section>
  );
}
