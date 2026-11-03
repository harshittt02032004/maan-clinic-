"use client";

import { CheckCircle2 } from "lucide-react";
import { Stagger, Item } from "@/components/motion/Reveal";
import { ABOUT } from "@/content/about";

export default function CredentialList() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur sm:p-8">
      <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-pink-300">Credentials at a glance</h3>
      <Stagger className="mt-5 space-y-3" gap={0.06}>
        {ABOUT.credentials.map((c) => (
          <Item key={c} className="flex items-start gap-3 text-sm text-navy-100">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-pink-300" />
            <span>{c}</span>
          </Item>
        ))}
      </Stagger>
    </div>
  );
}
