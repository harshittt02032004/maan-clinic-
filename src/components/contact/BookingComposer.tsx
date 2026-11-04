"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { CLINIC, telLink } from "@/content/site";
import { CONDITIONS, shortName } from "@/content/conditions";

/**
 * Composes a WhatsApp message on the device — no backend, nothing stored, nothing
 * posted to a server. Input is length-capped and URL-encoded; the preview is rendered
 * as text (never HTML).
 */
const MAX = 80;
const clean = (s: string) => s.replace(/[\u0000-\u001f<>]/g, "").slice(0, MAX);
const field = "mt-1 w-full border-[1.5px] border-ink bg-white px-4 py-3 text-[15px] outline-none transition focus:bg-blush focus:ring-4 focus:ring-magenta/30";

export default function BookingComposer() {
  const [name, setName] = useState("");
  const [concern, setConcern] = useState("");
  const [when, setWhen] = useState("");

  const msg = useMemo(() => {
    const parts = ["Hello Mann Clinic, appointment chahiye."];
    if (name) parts.push(`Name: ${name}`);
    if (concern) parts.push(`Concern: ${concern}`);
    if (when) parts.push(`Preferred time: ${when}`);
    return parts.join("\n");
  }, [name, concern, when]);

  const href = `https://wa.me/${CLINIC.whatsappE164}?text=${encodeURIComponent(msg)}`;

  return (
    <motion.form
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      onSubmit={(e) => { e.preventDefault(); window.open(href, "_blank", "noopener,noreferrer"); }}
      className="sticker p-6 sm:p-7"
      aria-label="Compose a WhatsApp booking message"
    >
      <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-magenta">Quick WhatsApp booking</p>
      <p className="mt-1 text-[14px] text-body">Fill what you like — or send it blank. Opens WhatsApp on your phone; we never store this.</p>

      <div className="mt-5 grid gap-3">
        <label className="block">
          <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-ink">Your name (optional)</span>
          <input value={name} onChange={(e) => setName(clean(e.target.value))} maxLength={MAX} autoComplete="name" className={field} />
        </label>
        <label className="block">
          <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-ink">Concern (optional)</span>
          <select value={concern} onChange={(e) => setConcern(clean(e.target.value))} className={field}>
            <option value="">Prefer not to say</option>
            {CONDITIONS.map((c) => (
              <option key={c.slug} value={shortName(c)}>{shortName(c)}</option>
            ))}
            <option value="Something else">Something else</option>
          </select>
        </label>
        <label className="block">
          <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-ink">Preferred day / time (optional)</span>
          <input value={when} onChange={(e) => setWhen(clean(e.target.value))} maxLength={MAX} placeholder="e.g. Saturday evening" className={field} />
        </label>
      </div>

      <pre className="mt-4 whitespace-pre-wrap border-l-[3px] border-magenta bg-blush px-4 py-3 font-sans text-[13px] text-ink">{msg}</pre>

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <button type="submit" className="btn-magenta">Send on WhatsApp <ArrowRight className="size-4" /></button>
        <a href={telLink} className="btn-line">Call instead</a>
      </div>
    </motion.form>
  );
}
