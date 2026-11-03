import Link from "next/link";
import { ChevronRight } from "lucide-react";
import WordReveal from "@/components/motion/WordReveal";
import { Reveal } from "@/components/motion/Reveal";
import JsonLd from "@/components/ui/JsonLd";
import { breadcrumbLd } from "@/lib/seo";

export default function PageHero({
  eyebrow,
  title,
  hindi,
  intro,
  crumbs,
  children,
  compact = false,
}: {
  eyebrow?: string;
  title: string;
  hindi?: string;
  intro?: string;
  crumbs: { name: string; path: string }[];
  children?: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <section className={`relative overflow-hidden ${compact ? "pt-28 pb-10 sm:pt-36" : "pt-32 pb-14 sm:pt-40 sm:pb-20"}`}>
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, ...crumbs])} />
      <div className="bg-dots absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(60%_60%_at_30%_20%,#000,transparent)]" />
      <div className="blob -left-32 -top-10 size-[24rem] bg-pink-300/50" />
      <div className="container-x">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-xs font-semibold text-muted">
          <Link href="/" className="hover:text-pink-600">Home</Link>
          {crumbs.map((c, i) => (
            <span key={c.path} className="inline-flex items-center gap-1">
              <ChevronRight className="size-3" />
              {i === crumbs.length - 1 ? <span className="text-navy-800">{c.name}</span> : <Link href={c.path} className="hover:text-pink-600">{c.name}</Link>}
            </span>
          ))}
        </nav>
        <div className="mt-6 grid items-end gap-10 lg:grid-cols-12">
          <div className={children ? "lg:col-span-7" : "lg:col-span-9"}>
            {eyebrow && <span className="eyebrow">{eyebrow}</span>}
            <WordReveal as="h1" text={title} className="mt-4 block text-4xl font-extrabold leading-[1.08] text-navy-900 sm:text-5xl lg:text-6xl" />
            {hindi && <WordReveal as="p" text={hindi} delay={0.3} className="hindi mt-3 block text-xl text-pink-600 sm:text-2xl" />}
            {intro && (
              <Reveal delay={0.4}>
                <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{intro}</p>
              </Reveal>
            )}
          </div>
          {children && <div className="lg:col-span-5">{children}</div>}
        </div>
      </div>
    </section>
  );
}
