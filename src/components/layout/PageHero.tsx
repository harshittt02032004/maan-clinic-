import Link from "next/link";
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
    <section className="rule-b">
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, ...crumbs])} />
      <div className={`container-x ${compact ? "py-10 sm:py-14" : "py-12 sm:py-20"}`}>
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-[13px] text-body">
          <Link href="/" className="hover:text-magenta">Home</Link>
          {crumbs.map((c, i) => (
            <span key={c.path} className="inline-flex items-center gap-2">
              <span aria-hidden className="text-rule">/</span>
              {i === crumbs.length - 1 ? <span className="font-medium text-ink">{c.name}</span> : <Link href={c.path} className="hover:text-magenta">{c.name}</Link>}
            </span>
          ))}
        </nav>
        <div className="mt-8 grid items-end gap-10 lg:grid-cols-12">
          <div className={children ? "lg:col-span-7" : "lg:col-span-10"}>
            {eyebrow && <p className="kicker"><span className="kicker-line" />{eyebrow}</p>}
            <WordReveal as="h1" text={title} className="mt-5 block text-4xl font-extrabold leading-[1.02] text-ink sm:text-6xl lg:text-7xl" />
            {hindi && <WordReveal as="p" text={hindi} delay={0.3} className="hindi mt-3 block text-2xl font-semibold text-magenta sm:text-3xl" />}
            {intro && (
              <Reveal delay={0.4}>
                <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-body sm:text-lg">{intro}</p>
              </Reveal>
            )}
          </div>
          {children && <div className="lg:col-span-5">{children}</div>}
        </div>
      </div>
    </section>
  );
}
