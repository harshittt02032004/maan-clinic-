"use client";

import { GraduationCap, Landmark, FlaskConical, BadgeCheck } from "lucide-react";
import { Stagger, Item } from "@/components/motion/Reveal";
import { CREDENTIAL_TILES } from "@/content/about";

const ICONS = { GraduationCap, Landmark, FlaskConical, BadgeCheck };

export default function Credentials() {
  return (
    <section className="container-x -mt-4 relative z-10">
      <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {CREDENTIAL_TILES.map((c) => {
          const Icon = ICONS[c.icon];
          return (
            <Item key={c.k} className="card group flex items-start gap-4 p-5 transition-transform duration-500 hover:-translate-y-1">
              <span className="icon-draw grid size-11 shrink-0 place-items-center rounded-2xl bg-navy-900 text-pink-200 transition-colors duration-500 group-hover:bg-pink-600 group-hover:text-white">
                <Icon className="size-5" />
              </span>
              <span>
                <span className="block font-display text-[15px] font-extrabold leading-tight text-navy-900">{c.k}</span>
                <span className="mt-1 block text-xs leading-relaxed text-muted">{c.v}</span>
              </span>
            </Item>
          );
        })}
      </Stagger>
    </section>
  );
}
