import type { Metadata } from "next";
import { MapPin, Clock, Phone, MessageCircle, FileText, IndianRupee } from "lucide-react";
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
    { icon: MapPin, k: "Address", v: fullAddress, href: CLINIC.mapsLink },
    { icon: Clock, k: "Timings", v: CLINIC.timings },
    { icon: Phone, k: "Phone", v: CLINIC.phoneDisplay, href: telLink },
    { icon: MessageCircle, k: "WhatsApp", v: `${CLINIC.phoneDisplay} — preferred for bookings`, href: whatsappLink() },
    ...(CLINIC.fee ? [{ icon: IndianRupee, k: "Consultation fee", v: CLINIC.fee }] : []),
  ];

  return (
    <>
      <PageHero eyebrow="Contact" title="Book an Appointment" hindi="अपॉइंटमेंट चाहिए? बस एक मैसेज।" intro="Booking is simple, and everything that follows is confidential." crumbs={[{ name: "Contact", path: "/contact/" }]} compact>
        <BookingComposer />
      </PageHero>

      <section className="container-x grid gap-6 pb-6 lg:grid-cols-12">
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:col-span-7 lg:grid-cols-1" gap={0.07}>
          {details.map((d) => (
            <Item key={d.k} className="card flex items-start gap-4 p-5">
              <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-pink-50 text-pink-600"><d.icon className="size-5" /></span>
              <span>
                <span className="block text-xs font-bold uppercase tracking-[0.18em] text-muted">{d.k}</span>
                {d.href ? (
                  <a href={d.href} target={d.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="mt-1 block font-semibold text-navy-900 hover:text-pink-600">{d.v}</a>
                ) : (
                  <span className="mt-1 block font-semibold text-navy-900">{d.v}</span>
                )}
              </span>
            </Item>
          ))}
          <Item className="flex items-start gap-3 rounded-2xl border border-dashed border-navy-200 p-5 text-sm text-navy-800">
            <FileText className="mt-0.5 size-5 shrink-0 text-pink-600" />
            <span><strong>What to bring:</strong> any previous prescriptions, reports, and a list of medicines you currently take. Nothing else is needed — just yourself.</span>
          </Item>
        </Stagger>

        <Reveal delay={0.15} className="lg:col-span-5">
          <div className="card overflow-hidden p-2">
            <iframe
              title="Mann Clinic on Google Maps"
              src={CLINIC.mapsEmbed}
              className="h-[380px] w-full rounded-[1.25rem] lg:h-full lg:min-h-[480px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </Reveal>
      </section>

      <FirstVisit steps={HOW_TO_BOOK} eyebrow="How to book" title="Three steps. That's it." hindi="तीन आसान कदम" />
    </>
  );
}
