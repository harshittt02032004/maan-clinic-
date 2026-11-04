"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { CLINIC } from "@/content/site";

/** The clinic's own Instagram posters, drifting past like a pinboard. Pauses on hover. */
const TILES = [1, 2, 4, 6, 7, 13, 15, 3, 8, 9, 11, 16, 17, 18, 19, 20].map((n) => `/posters/p${String(n).padStart(2, "0")}.webp`);
const ROT = [0, -1.5, 0.8, 1.5, -0.6, 1, -1.2, 0.5];

export default function PosterStrip() {
  const reduced = useReducedMotion();
  const loop = [...TILES, ...TILES];
  return (
    <section className="rule-b overflow-hidden py-7">
      <div className="container-x flex items-center gap-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-ink">
        <span>From the clinic&apos;s Instagram</span>
        <a href={CLINIC.instagram} target="_blank" rel="noopener noreferrer" className="text-magenta hover:underline">@drmohitjainpsy</a>
        <span className="h-px flex-1 bg-rule" />
      </div>
      <div className="group mt-5 [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
        <motion.div
          className="flex w-max gap-4 pl-5 sm:pl-8"
          animate={reduced ? undefined : { x: ["0%", "-50%"] }}
          transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
          style={{ animationPlayState: "running" }}
        >
          {loop.map((src, i) => (
            <div key={i} className="relative size-[150px] shrink-0 border-[1.5px] border-ink bg-white sm:size-[196px]" style={{ transform: `rotate(${ROT[i % ROT.length]}deg)` }}>
              <Image src={src} alt="" width={196} height={196} className="size-full object-cover" sizes="196px" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
