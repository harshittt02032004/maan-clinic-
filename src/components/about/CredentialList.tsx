"use client";

import { Stagger, Item } from "@/components/motion/Reveal";
import { ABOUT } from "@/content/about";

export default function CredentialList() {
  return (
    <div className="border-l-[1.5px] border-magenta-soft pl-6 sm:pl-8">
      <h3 className="text-[12px] font-bold uppercase tracking-[0.18em] text-magenta-soft">Credentials at a glance</h3>
      <Stagger className="mt-4" gap={0.06}>
        {ABOUT.credentials.map((c, i) => (
          <Item key={c} className={`flex items-baseline gap-4 py-3 text-[15px] ${i < ABOUT.credentials.length - 1 ? "border-b border-ink-2" : ""}`}>
            <span className="font-display text-[12px] font-bold text-magenta-soft">{String(i + 1).padStart(2, "0")}</span>
            <span>{c}</span>
          </Item>
        ))}
      </Stagger>
    </div>
  );
}
