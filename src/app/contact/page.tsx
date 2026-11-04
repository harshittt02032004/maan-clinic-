import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import FirstVisit from "@/components/home/FirstVisit";
import BookingComposer from "@/components/contact/BookingComposer";
import { Reveal, Stagger, Item } from "@/components/motion/Reveal";
import { CLINIC, fullAddress, telLink, whatsappLink } from "@/content/site";
import { HOW_TO_BOOK } from "@/content/about";

export const metadata: Metadata = {
  title: "Contact Mann Clinic, Raebareli — Book an Appointment",
  description: `Book an appointment with Dr. Mohit Jain, Psychiatrist in Raebareli. Call or WhatsApp ${CLINIC.phoneDisplay}. ${fullAddress}.`,
  alternates: { canonical: "/contact/" },
};

export default function ContactPage() {
  const details = [
    { k: "Address", v: fullAddress, href: CLINIC.mapsLink },
    { k: "Timings", v: CLINIC.timings },
    { k: "Phone", v: CLINIC.phoneDisplay, href: telLink },
    { k: "WhatsApp", v: `${CLINIC.phoneDisplay} — preferred for bookings`, href: whatsappLink() },
    ...(CLINIC.fee ? [{ k: "Consultation fee", v: CLINIC.fee }] : []),
    { k: "What to bring", v: "Any previous prescriptions, reports, and a list of medicines you currently take. Nothing else is needed — just yourself." },
  ];

  return (
    <>
      <PageHero eyebrow="Contact" title="Book an Appointment" hindi="अपॉइंटमेंट चाहिए? बस एक मैसेज।" intro="Booking is simple, and everything that follows is confidential." crumbs={[{ name: "Contact", path: "/contact/" }]} compact>
        <BookingComposer />
      </PageHero>

      <section className="rule-b">
        <div className="container-x grid gap-10 py-12 sm:py-16 lg:grid-cols-12 lg:gap-8">
          <Stagger className="rule-t lg:col-span-6" gap={0.07}>
            {details.map((d) => (
              <Item key={d.k} className="grid grid-cols-1 gap-1 border-b border-rule py-4 sm:grid-cols-[140px_1fr] sm:gap-6">
                <span className="text-[12px] font-bold uppercase tracking-[0.18em] text-body">{d.k}</span>
                {d.href ? (
                  <a href={d.href} target={d.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="font-medium text-ink hover:text-magenta">{d.v}</a>
                ) : (
                  <span className="font-medium text-ink">{d.v}</span>
                )}
              </Item>
            ))}
          </Stagger>
          <Reveal delay={0.15} className="lg:col-span-6">
            <div className="relative">
              <div aria-hidden className="absolute inset-0 translate-x-4 translate-y-4 bg-magenta" />
              <iframe
                title="Mann Clinic on Google Maps"
                src={CLINIC.mapsEmbed}
                className="relative block h-[380px] w-full border-[1.5px] border-ink bg-white lg:h-full lg:min-h-[460px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </Reveal>
        </div>
      </section>

      <FirstVisit steps={HOW_TO_BOOK} eyebrow="How to book" title="Three steps. That's it." />
    </>
  );
}
