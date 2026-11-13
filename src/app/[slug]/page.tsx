import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { LifeBuoy, ArrowRight } from "lucide-react";
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

export default async function ConditionPage({ params }: { params: Promise<{ slug: string }> }) {
  const c = conditionBySlug((await params).slug);
  if (!c) notFound();
  const others = CONDITIONS.filter((o) => o.slug !== c.slug);

  return (
    <>
      <JsonLd data={conditionLd(c.name, `/${c.slug}/`, c.metaDescription)} />
      <JsonLd data={faqLd(c.faqs)} />

      <PageHero eyebrow={c.name} title={c.h1} hindi={c.hindi} crumbs={[{ name: "Conditions", path: "/conditions/" }, { name: shortName(c), path: `/${c.slug}/` }]}>
        <Reveal delay={0.3} className="relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2.5rem] border border-white/70 bg-white/60 shadow-[var(--shadow-soft)] backdrop-blur">
            <MindMotif motif={c.motif} />
            <span className="pointer-events-none absolute bottom-4 left-4 right-4 w-fit rounded-2xl bg-navy-900/85 px-3 py-1 text-[11px] font-semibold text-white sm:left-5 sm:rounded-full">{c.motifCaption}</span>
            <span className="pointer-events-none absolute right-5 top-4 text-[10px] font-bold uppercase tracking-[0.2em] text-pink-500">
              <span className="[@media(hover:none)]:hidden">move your cursor</span>
              <span className="hidden [@media(hover:none)]:inline">touch the drawing</span>
            </span>
          </div>
        </Reveal>
      </PageHero>

      <article className="container-x grid gap-12 pb-10 lg:grid-cols-12">
        <div className="space-y-14 lg:col-span-8">
          {c.hindiLead && (
            <Reveal>
              <p className="hindi rounded-3xl bg-gradient-to-r from-pink-600 to-pink-500 px-6 py-5 text-xl font-bold text-white shadow-[var(--shadow-pink)] sm:text-2xl">{c.hindiLead}</p>
            </Reveal>
          )}
          <Reveal>
            <p className="text-lg leading-relaxed text-navy-800 sm:text-xl">{c.intro}</p>
          </Reveal>

          {c.treats && (
            <Reveal>
              <h2 className="text-2xl font-extrabold text-navy-900 sm:text-3xl">{c.treats.title}</h2>
              <Stagger className="mt-5 flex flex-wrap gap-2" gap={0.05}>
                {c.treats.items.map((t) => (
                  <Item key={t} className="rounded-full border border-navy-100 bg-white px-4 py-2 text-sm font-semibold text-navy-800">{t}</Item>
                ))}
              </Stagger>
            </Reveal>
          )}

          <SignsCheck title={c.signsTitle} signs={c.signs} />

          {c.honesty && (
            <Reveal>
              <div className="rounded-3xl border-2 border-dashed border-pink-300 bg-pink-50/70 p-6 sm:p-8">
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-pink-700">Honesty block</h2>
                <p className="mt-3 text-lg font-semibold leading-relaxed text-navy-900">{c.honesty}</p>
              </div>
            </Reveal>
          )}

          <Reveal>
            <h2 className="text-2xl font-extrabold text-navy-900 sm:text-3xl">When to consult</h2>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{c.whenToConsult}</p>
            {c.safetyNote && (
              <div className="mt-6 flex items-start gap-3 rounded-2xl border border-navy-100 bg-white p-4 text-sm">
                <LifeBuoy className="mt-0.5 size-5 shrink-0 text-pink-600" />
                <p className="text-navy-800">
                  If you are in severe distress right now, call the Government of India's free 24x7 helpline Tele-MANAS:{" "}
                  <a href={`tel:${CLINIC.teleManas}`} className="font-bold text-pink-700 underline underline-offset-2">{CLINIC.teleManas}</a>.
                </p>
              </div>
            )}
          </Reveal>

          <Reveal>
            <div className="card p-7 sm:p-9">
              <span className="eyebrow">Treatment at Mann Clinic</span>
              <p className="mt-4 text-base leading-relaxed text-navy-800 sm:text-lg">{c.treatment}</p>
            </div>
          </Reveal>

          <Reveal>
            <h2 className="text-2xl font-extrabold text-navy-900 sm:text-3xl">Questions about {shortName(c).toLowerCase()}</h2>
            <div className="mt-5">
              <Accordion items={c.faqs} />
            </div>
          </Reveal>
        </div>

        <aside className="lg:col-span-4">
          <div className="sticky top-28 space-y-4">
            <Reveal className="card p-6">
              <p className="font-display text-lg font-extrabold text-navy-900">{CONDITION_CTA}</p>
              <Link href="/contact/" className="btn-primary mt-4 w-full">Book an Appointment</Link>
              <a href={`https://wa.me/${CLINIC.whatsappE164}?text=${encodeURIComponent(`Hello, I would like to consult about ${shortName(c)}.`)}`} target="_blank" rel="noopener noreferrer" className="btn-ghost mt-2 w-full">WhatsApp {CLINIC.phoneDisplay}</a>
            </Reveal>
            <Reveal delay={0.1} className="card p-6">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-pink-700">Other conditions</h3>
              <ul className="mt-3 divide-y divide-pink-50">
                {others.map((o) => (
                  <li key={o.slug}>
                    <Link href={`/${o.slug}/`} className="group flex items-center justify-between py-2.5 text-sm font-semibold text-navy-800 hover:text-pink-600">
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
