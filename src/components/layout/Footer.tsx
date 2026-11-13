import Link from "next/link";
import { MapPin, Phone, MessageCircle, Clock, LifeBuoy } from "lucide-react";
import Logo from "./Logo";
import GsapStagger from "@/components/motion/GsapStagger";
import { CLINIC, CRISIS_LINE, DISCLAIMER, fullAddress, telLink, whatsappLink } from "@/content/site";
import { CONDITIONS, shortName } from "@/content/conditions";

export default function Footer() {
  return (
    <footer className="relative isolate mt-10 overflow-hidden bg-navy-900 text-navy-100">
      <div className="blob -left-32 top-10 size-96 bg-pink-600/25" />
      <div className="blob -right-24 bottom-0 size-80 bg-navy-500/40" />

      {/* Crisis line — NMC footer requirement, kept prominent */}
      <div className="relative border-b border-white/10 bg-white/5">
        <div className="container-x flex flex-col items-start gap-3 py-5 text-sm sm:flex-row sm:items-center">
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-pink-500/20 text-pink-200"><LifeBuoy className="size-4" /></span>
          <p className="text-navy-100/90">
            {CRISIS_LINE.replace("14416.", "")}
            {/* the number is one unbreakable pill: on its own line on phones, inline from sm */}
            <a href={`tel:${CLINIC.teleManas}`} className="mt-3 block w-fit whitespace-nowrap rounded-full bg-white px-4 py-1.5 font-bold text-navy-900 sm:ml-1 sm:mt-0 sm:inline-block sm:px-3 sm:py-1">Tele-MANAS {CLINIC.teleManas}</a>
          </p>
        </div>
      </div>

      <GsapStagger className="container-x relative grid gap-12 py-16 md:grid-cols-12" gap={0.14}>
        <div className="md:col-span-5">
          {/* reversed logo straight on the navy: no white box */}
          <Logo variant="full" tone="light" height={148} mobileHeight={124} />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-navy-200">{CLINIC.tagline}</p>
          <p className="mt-6 text-sm font-semibold text-white">
            {CLINIC.doctor} — {CLINIC.qualifications}
          </p>
          <p className="text-xs text-navy-300">
            Reg. No. {CLINIC.registration}, {CLINIC.council}
          </p>
        </div>

        <div className="md:col-span-3">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-pink-300">Conditions</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {CONDITIONS.map((c) => (
              <li key={c.slug}>
                <Link href={`/${c.slug}/`} className="text-navy-100 transition-colors hover:text-white">{shortName(c)}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-pink-300">Visit</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex gap-3"><MapPin className="mt-0.5 size-4 shrink-0 text-pink-300" /><a href={CLINIC.mapsLink} target="_blank" rel="noopener noreferrer" className="hover:text-white">{fullAddress}</a></li>
            <li className="flex gap-3"><Clock className="mt-0.5 size-4 shrink-0 text-pink-300" /><span>{CLINIC.timings}</span></li>
            <li className="flex gap-3"><Phone className="mt-0.5 size-4 shrink-0 text-pink-300" /><a href={telLink} className="hover:text-white">{CLINIC.phoneDisplay}</a></li>
            <li className="flex gap-3"><MessageCircle className="mt-0.5 size-4 shrink-0 text-pink-300" /><a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="hover:text-white">WhatsApp — preferred for bookings</a></li>
          </ul>
          <nav aria-label="Footer" className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs font-bold uppercase tracking-[0.16em]">
            <Link href="/conditions/" className="hover:text-white">Conditions</Link>
            <Link href="/about-dr-mohit-jain/" className="hover:text-white">About Dr. Jain</Link>
            <Link href="/faq/" className="hover:text-white">FAQ</Link>
            <Link href="/contact/" className="hover:text-white">Contact</Link>
          </nav>
        </div>
      </GsapStagger>

      {/* extra bottom room on phones so the fixed Call / WhatsApp / Book bar never covers the last lines */}
      <div className="container-x relative border-t border-white/10 pb-28 pt-6 text-xs leading-relaxed text-navy-300 md:pb-6">
        <p>{DISCLAIMER}</p>
        <p className="mt-3 flex flex-wrap items-center justify-between gap-2">
          <span>© {new Date().getFullYear()} Mann Clinic, Raebareli. All rights reserved.</span>
          <span className="text-pink-200">We care about your feelings..</span>
        </p>
      </div>
    </footer>
  );
}
