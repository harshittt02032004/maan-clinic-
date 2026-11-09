"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Phone } from "lucide-react";
import { CLINIC, telLink } from "@/content/site";
import { CONDITIONS, shortName } from "@/content/conditions";

/**
 * Composes a WhatsApp message on the device — no backend, nothing stored, nothing
 * posted to a server. Input is length-capped and URL-encoded; the message preview
 * is rendered as text (never HTML).
 */
const MAX = 80;
const clean = (s: string) => s.replace(/[\u0000-\u001f<>]/g, "").slice(0, MAX);

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
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.3 }}
      onSubmit={(e) => { e.preventDefault(); window.open(href, "_blank", "noopener,noreferrer"); }}
      className="card p-6 sm:p-7"
      aria-label="Compose a WhatsApp booking message"
    >
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-pink-700">Quick WhatsApp booking</p>
      <p className="mt-1 text-sm text-muted">Fill what you like — or send it blank. Opens WhatsApp on your phone; we never store this.</p>

      <div className="mt-5 grid gap-3">
        <label className="block">
          <span className="text-xs font-semibold text-navy-800">Your name (optional)</span>
          <input value={name} onChange={(e) => setName(clean(e.target.value))} maxLength={MAX} autoComplete="name" className="mt-1 w-full rounded-xl border border-navy-100 bg-white px-4 py-3 text-sm outline-none transition focus:border-pink-500 focus:ring-4 focus:ring-pink-200/60" />
        </label>
        <label className="block">
          <span className="text-xs font-semibold text-navy-800">Concern (optional)</span>
          <select value={concern} onChange={(e) => setConcern(clean(e.target.value))} className="mt-1 w-full rounded-xl border border-navy-100 bg-white px-4 py-3 text-sm outline-none transition focus:border-pink-500 focus:ring-4 focus:ring-pink-200/60">
            <option value="">Prefer not to say</option>
            {CONDITIONS.map((c) => (
              <option key={c.slug} value={shortName(c)}>{shortName(c)}</option>
            ))}
            <option value="Something else">Something else</option>
          </select>
        </label>
        <label className="block">
          <span className="text-xs font-semibold text-navy-800">Preferred day / time (optional)</span>
          <input value={when} onChange={(e) => setWhen(clean(e.target.value))} maxLength={MAX} placeholder="e.g. Saturday evening" className="mt-1 w-full rounded-xl border border-navy-100 bg-white px-4 py-3 text-sm outline-none transition focus:border-pink-500 focus:ring-4 focus:ring-pink-200/60" />
        </label>
      </div>

      <pre className="mt-4 whitespace-pre-wrap rounded-xl bg-navy-50 px-4 py-3 font-sans text-xs text-navy-800">{msg}</pre>

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <button type="submit" className="btn-primary"><MessageCircle className="size-4" /> Send on WhatsApp</button>
        <a href={telLink} className="btn-ghost"><Phone className="size-4" /> Call instead</a>
      </div>
    </motion.form>
  );
}
