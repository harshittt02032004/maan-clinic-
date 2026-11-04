import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, LifeBuoy } from "lucide-react";
import PageHero from "@/components/layout/PageHero";
import CtaBand from "@/components/layout/CtaBand";
import MindMotif from "@/components/motion/MindMotif";
import SignsCheck from "@/components/condition/SignsCheck";
import Accordion from "@/components/ui/Accordion";
import JsonLd from "@/components/ui/JsonLd";
import { Reveal, Stagger, Item } from "@/components/motion/Reveal";
import { CONDITIONS, CONDITION_CTA, conditionBySlug, shortName } from "@/content/conditions";
import { CLINIC } from "@/content/site";
import { conditionLd, faqLd } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return CONDITIONS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const c = conditionBySlug((await params).slug);
  if (!c) return {};
  return { title: c.metaTitle, description: c.metaDescription, alternates: { canonical: `/${c.slug}/` } };
}

const H2 = ({ children }: { children: React.ReactNode }) => <h2 className="text-[28px] font-extrabold leading-[1.05] text-ink sm:text-[36px]">{children}</h2>;

export default async function ConditionPage({ params }: { params: Promise<{ slug: string }> }) {
  const c = conditionBySlug((await params).slug);
  if (!c) notFound();
  const idx = CONDITIONS.findIndex((o) => o.slug === c.slug);
  const others = CONDITIONS.filter((o) => o.slug !== c.slug);

  return (
    <>
      <JsonLd data={conditionLd(c.name, `/${c.slug}/`, c.metaDescription)} />
      <JsonLd data={faqLd(c.faqs)} />

      <PageHero eyebrow={`Condition 0${idx + 1} · ${c.name}`} title={c.h1} hindi={c.hindi} crumbs={[{ name: "Conditions", path: "/conditions/" }, { name: shortName(c), path: `/${c.slug}/` }]}>
        <Reveal delay={0.3} className="relative">
          <div aria-hidden className="absolute inset-0 translate-x-4 translate-y-4 bg-magenta" />
          <div className="relative aspect-[4/3] overflow-hidden border-[1.5px] border-ink bg-white">
            <MindMotif motif={c.motif} />
            <span className="pointer-events-none absolute bottom-3 left-3 border border-ink bg-white px-2.5 py-1 text-[12px] font-semibold text-ink">{c.motifCaption}</span>
            <span className="pointer-events-none absolute right-3 top-3 text-[10px] font-bold uppercase tracking-[0.18em] text-magenta">move your cursor</span>
          </div>
        </Reveal>
      </PageHero>

      <article className="container-x grid gap-12 py-12 sm:py-16 lg:grid-cols-12 lg:gap-8">
        <div className="space-y-14 lg:col-span-8">
          {c.hindiLead && (
            <Reveal>
              <p className="hindi border-[1.5px] border-ink bg-magenta px-6 py-5 text-[22px] font-bold leading-snug text-white shadow-[var(--shadow-hard-lg)] sm:text-[28px]">{c.hindiLead}</p>
            </Reveal>
          )}
          <Reveal>
            <p className="max-w-3xl text-[19px] leading-relaxed text-ink sm:text-[22px]">{c.intro}</p>
          </Reveal>

          {c.treats && (
            <Reveal>
              <H2>{c.treats.title}</H2>
              <Stagger className="mt-5 flex flex-wrap gap-2" gap={0.05}>
                {c.treats.items.map((t) => (
                  <Item key={t} className="border-[1.5px] border-ink bg-white px-4 py-2 text-[14px] font-semibold text-ink">{t}</Item>
                ))}
              </Stagger>
            </Reveal>
          )}

          <SignsCheck title={c.signsTitle} signs={c.signs} />

          {c.honesty && (
            <Reveal>
              <div className="border-[1.5px] border-dashed border-magenta bg-blush p-6 sm:p-8">
                <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-magenta">Our promise of honesty</p>
                <p className="mt-3 text-[18px] font-medium leading-relaxed text-ink">{c.honesty}</p>
              </div>
            </Reveal>
          )}

          <Reveal>
            <H2>When to consult</H2>
            <p className="mt-4 max-w-3xl text-[16px] leading-relaxed text-body sm:text-[17px]">{c.whenToConsult}</p>
            {c.safetyNote && (
              <div className="mt-6 flex items-start gap-3 border-[1.5px] border-ink bg-white p-4 text-[15px]">
                <LifeBuoy className="mt-0.5 size-5 shrink-0 text-magenta" />
                <p className="text-ink">
                  If you are in severe distress right now, call the Government of India&apos;s free 24x7 helpline Tele-MANAS:{" "}
                  <a href={`tel:${CLINIC.teleManas}`} className="font-bold text-magenta underline underline-offset-2">{CLINIC.teleManas}</a>.
                </p>
              </div>
            )}
          </Reveal>

          <Reveal>
            <div className="bg-ink p-7 text-white sm:p-9">
              <p className="kicker !text-magenta-soft"><span className="kicker-line !bg-magenta-soft" />Treatment at Mann Clinic</p>
              <p className="mt-4 text-[17px] leading-relaxed sm:text-[19px]">{c.treatment}</p>
            </div>
          </Reveal>

          <Reveal>
            <H2>Questions about {shortName(c).toLowerCase()}</H2>
            <div className="mt-5">
              <Accordion items={c.faqs} />
            </div>
          </Reveal>
        </div>

        <aside className="lg:col-span-4">
          <div className="sticky top-32 space-y-6">
            <Reveal className="sticker p-6">
              <p className="font-display text-[20px] font-extrabold leading-snug text-ink">{CONDITION_CTA}</p>
              <Link href="/contact/" className="btn-ink mt-5 w-full">Book an appointment <ArrowRight className="size-4" /></Link>
              <a href={`https://wa.me/${CLINIC.whatsappE164}?text=${encodeURIComponent(`Hello, I would like to consult about ${shortName(c)}.`)}`} target="_blank" rel="noopener noreferrer" className="btn-line mt-2 w-full">WhatsApp {CLINIC.phoneDisplay}</a>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-ink">Other conditions</p>
              <ul className="rule-t mt-3">
                {others.map((o) => (
                  <li key={o.slug} className="border-b border-rule">
                    <Link href={`/${o.slug}/`} className="group flex items-center justify-between py-2.5 text-[15px] font-semibold text-ink hover:text-magenta">
                      {shortName(o)} <ArrowRight className="size-4 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </aside>
      </article>

      <CtaBand headline={CONDITION_CTA} hindi={null} />
    </>
  );
}
