"use client";

import Link from "next/link";
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
            <Link href={`/${c.slug}/`} className="card flex h-full flex-col p-6 transition-[transform,box-shadow] duration-500 hover:-translate-y-1.5 hover:shadow-[var(--shadow-pink)]">
              <span className="flex items-center justify-between">
                <span className="grid size-12 place-items-center rounded-2xl bg-pink-50 text-pink-600 transition-colors duration-500 group-hover:bg-pink-600 group-hover:text-white">
                  <MotifIcon motif={c.motif} className="size-6" />
                </span>
                <span className="text-xs font-bold tabular-nums text-pink-300">{String(i + 1).padStart(2, "0")}</span>
              </span>
              <span className="mt-6 block font-display text-xl font-extrabold leading-tight text-navy-900">{shortName(c)}</span>
              <span className="hindi mt-1 block text-sm text-pink-600">{c.hindi}</span>
              <span className="mt-3 block flex-1 text-sm leading-relaxed text-muted">{c.card}</span>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-navy-900">
                {cta}
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </Link>
          </TiltCard>
        </Item>
      ))}
    </Stagger>
  );
}
