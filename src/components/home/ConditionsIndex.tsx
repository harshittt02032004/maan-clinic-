"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Stagger, Item } from "@/components/motion/Reveal";
import { CONDITIONS, shortName } from "@/content/conditions";

/** Numbered index rows — editorial, not cards. Used on Home and /conditions. */
export default function ConditionsIndex({ current }: { current?: string }) {
  return (
    <Stagger className="rule-t" gap={0.05}>
      {CONDITIONS.map((c, i) => {
        const last = i === CONDITIONS.length - 1;
        const active = c.slug === current;
        return (
          <Item key={c.slug} className={last ? "rule-b" : "border-b border-rule"}>
            <Link
              href={`/${c.slug}/`}
              aria-current={active ? "page" : undefined}
              className={`group -mx-3 grid grid-cols-[40px_1fr_32px] items-center gap-x-3 px-3 py-4 transition-colors duration-200 hover:bg-blush sm:grid-cols-[56px_1.1fr_1.8fr_40px] sm:gap-x-5 sm:py-5 ${active ? "bg-blush" : ""}`}
            >
              <span className="font-display text-[14px] font-bold text-magenta">0{i + 1}</span>
              <span>
                <span className={`block font-display text-[20px] font-bold leading-tight transition-colors sm:text-[24px] ${active ? "text-magenta" : "text-ink group-hover:text-magenta"}`}>{shortName(c)}</span>
                <span className="hindi block text-[14px] text-body">{c.hindi}</span>
              </span>
              <span className="col-span-2 mt-1 text-[14px] leading-snug text-body sm:col-span-1 sm:mt-0 sm:text-[15px]">{c.card}</span>
              <ArrowRight className="hidden size-5 text-ink transition-transform duration-200 group-hover:translate-x-1 group-hover:text-magenta sm:block" />
            </Link>
          </Item>
        );
      })}
    </Stagger>
  );
}
