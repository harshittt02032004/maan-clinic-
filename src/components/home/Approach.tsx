"use client";

import { HeartHandshake, LockKeyhole, Microscope, Sun } from "lucide-react";
import { Stagger, Item } from "@/components/motion/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import ThoughtUntangle from "@/components/motion/ThoughtUntangle";
import { PILLARS } from "@/content/about";

const ICONS = { HeartHandshake, LockKeyhole, Microscope, Sun };

export default function Approach() {
  return (
    <section className="relative overflow-hidden bg-navy-900 text-white">
      <div className="blob -right-32 top-0 size-[28rem] bg-pink-600/30" />
      <div className="container-x section-y">
        <SectionHeading eyebrow="Our approach" title="Four things you can expect in every consultation." hindi="हर बात सुनी जाएगी — बिना जल्दबाज़ी, बिना फ़ैसले।" tone="light" align="center" />

        <ThoughtUntangle className="mx-auto my-10 max-w-4xl" />

        <Stagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p, i) => {
            const Icon = ICONS[p.icon];
            return (
              <Item key={p.t} className="group relative rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur transition-colors duration-500 hover:bg-white/10">
                <span className="absolute right-5 top-5 text-xs font-bold text-pink-300/60">0{i + 1}</span>
                <span className="grid size-12 place-items-center rounded-2xl bg-pink-500/20 text-pink-200 transition-all duration-500 group-hover:bg-pink-500 group-hover:text-white">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-6 font-display text-xl font-extrabold">{p.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-100">{p.d}</p>
              </Item>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
