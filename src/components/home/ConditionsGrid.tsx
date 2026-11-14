"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Stagger, Item } from "@/components/motion/Reveal";
import TiltCard from "@/components/motion/TiltCard";
import { CONDITIONS, shortName } from "@/content/conditions";
import MotifIcon from "@/components/motion/MotifIcon";

export default function ConditionsGrid({ cta = "Learn more" }: { cta?: string }) {
  return (
    <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" gap={0.07}>
      {CONDITIONS.map((c, i) => (
        <Item key={c.slug} className="h-full">
          <TiltCard className="group h-full">
            <Link
              href={`/${c.slug}/`}
              className="card relative isolate flex h-full flex-col overflow-hidden p-6 transition-[transform,box-shadow] duration-500 hoverable:-translate-y-1.5 hoverable:shadow-[var(--shadow-pink)] active:scale-[0.985]"
            >
              {/* AI-generated artwork behind the copy, faded under a white wash for contrast */}
              <span aria-hidden className="absolute inset-0 -z-10">
                <Image
                  src={`/images/conditions/${c.slug}.webp`}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hoverable:scale-105"
                />
                <span className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/85 to-white/45" />
              </span>
              <span className="flex items-center justify-between">
                <span className="grid size-12 place-items-center rounded-2xl bg-pink-50/90 text-pink-600 transition-colors duration-500 group-hoverable:bg-pink-600 group-hoverable:text-white">
                  <MotifIcon motif={c.motif} className="size-6" />
                </span>
                <span className="text-xs font-bold tabular-nums text-pink-400">{String(i + 1).padStart(2, "0")}</span>
              </span>
              <span className="mt-6 block font-display text-xl font-extrabold leading-tight text-navy-900">{shortName(c)}</span>
              <span className="hindi mt-1 block text-sm text-pink-600">{c.hindi}</span>
              <span className="mt-3 block flex-1 text-sm leading-relaxed text-muted">{c.card}</span>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-navy-900">
                {cta}
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hoverable:-translate-y-0.5 group-hoverable:translate-x-0.5" />
              </span>
            </Link>
          </TiltCard>
        </Item>
      ))}
      {/* NMC: AI-generated visuals must be labelled */}
      <p className="col-span-full mt-1 text-xs text-muted">Card backgrounds: AI-generated artwork (no real patients or places).</p>
    </Stagger>
  );
}
