import Link from "next/link";
import Logo from "./Logo";
import { CLINIC, DISCLAIMER, fullAddress, telLink, whatsappLink } from "@/content/site";
import { CONDITIONS, shortName } from "@/content/conditions";

export default function Footer() {
  return (
    <footer className="rule-t bg-paper">
      <div className="container-x grid gap-10 py-14 md:grid-cols-12">
        <div className="md:col-span-4">
          <Logo variant="full" height={150} animate={false} />
          <p className="mt-4 max-w-xs text-[14px] text-body">
            {CLINIC.doctor} — {CLINIC.qualifications} · Reg. No. {CLINIC.registration}, {CLINIC.council}
          </p>
          <p className="mt-3 max-w-xs text-[14px] text-body">{CLINIC.tagline}</p>
        </div>

        <div className="md:col-span-3">
          <h3 className="font-display text-[13px] font-bold uppercase tracking-[0.16em] text-ink">Conditions</h3>
          <ul className="mt-3 space-y-1.5 text-[15px]">
            {CONDITIONS.map((c) => (
              <li key={c.slug}><Link href={`/${c.slug}/`} className="text-ink hover:text-magenta">{shortName(c)}</Link></li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <h3 className="font-display text-[13px] font-bold uppercase tracking-[0.16em] text-ink">Pages</h3>
          <ul className="mt-3 space-y-1.5 text-[15px]">
            <li><Link href="/conditions/" className="hover:text-magenta">Conditions</Link></li>
            <li><Link href="/about-dr-mohit-jain/" className="hover:text-magenta">About Dr. Jain</Link></li>
            <li><Link href="/faq/" className="hover:text-magenta">FAQ</Link></li>
            <li><Link href="/contact/" className="hover:text-magenta">Contact</Link></li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <h3 className="font-display text-[13px] font-bold uppercase tracking-[0.16em] text-ink">Visit</h3>
          <ul className="mt-3 space-y-2 text-[15px]">
            <li><a href={CLINIC.mapsLink} target="_blank" rel="noopener noreferrer" className="hover:text-magenta">{fullAddress}</a></li>
            <li>{CLINIC.timings}</li>
            <li><a href={telLink} className="hover:text-magenta">{CLINIC.phoneDisplay}</a></li>
            <li><a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="hover:text-magenta">WhatsApp — preferred for bookings</a></li>
            <li><a href={CLINIC.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-magenta">Instagram @drmohitjainpsy</a></li>
          </ul>
        </div>
      </div>

      <div className="container-x border-t border-rule py-5 text-[13px] leading-relaxed text-body">
        <p>{DISCLAIMER}</p>
        <p className="mt-2">
          If you or someone you know is in severe emotional distress, the Government of India&apos;s free 24x7 mental health helpline Tele-MANAS is available at{" "}
          <a href={`tel:${CLINIC.teleManas}`} className="font-bold text-ink">{CLINIC.teleManas}</a>.
        </p>
        <p className="mt-3 flex flex-wrap items-center justify-between gap-2">
          <span>© {new Date().getFullYear()} Mann Clinic, Raebareli. All rights reserved.</span>
          <span className="font-medium text-magenta">We care about your feelings..</span>
        </p>
      </div>
    </footer>
  );
}
