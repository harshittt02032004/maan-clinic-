# Mann Clinic — Dr. Mohit Jain (Psychiatrist, Raebareli)

Next.js 16 App Router · Tailwind v4 · framer-motion · Lenis · lucide-react. Dev: `.claude/launch.json` → `mann-dev` (port 3171).

## Content rules (NMC Ethical Advertising guidelines, 6 Oct 2026 — content doc v4, Nov 2026)
- **No** testimonials, Google-review widgets, star ratings, patient stories, before/after, patient counts, success rates, "100%", "best/premier/renowned", guaranteed results, fear/urgency copy, or any free-camp/offer promotion.
- Treatment language stays educational ("depression is treatable"), never promissory.
- No AI-generated "patient"/"doctor" images. Doctor's real photo only (`CLINIC.doctorPhoto`).
- Dr. Jain must approve every page before it goes live.

## Where things live
- `src/content/site.ts` — clinic facts (phone, address, hours, maps, registration UP Medical Council 64417). The degree title is two constants at the top (`DEGREE`, `DEGREE_SHORT`); the hero, footer, tiles, metadata, OG image and schema read from them.
- `src/content/conditions.ts` — 10 condition pages (verbatim doc copy + motif per page; v4 added child & adolescent and memory/headache/seizure). `safetyNote` is the Tele-MANAS text for that page.
- `src/content/conditionGroups.ts` — grouping for the homepage tabs.
- `src/content/faq.ts` — FAQs; `pending: true` hides unconfirmed answers from page + schema.
- `src/content/about.ts` — About page (v4 biography, clinical interests, journey timeline), trust chips, credential tiles, pillars, first-visit steps. Pillar titles and first-visit steps follow the owner's animation brief, not the doc wording.
- v4 dropped the forensic psychiatry fellowship and the forensic/community special-interest lines: do not add them back unless Dr. Jain asks.
- `src/content/reels.ts` + `src/components/media/ReelsSection.tsx` — the clinic's six Instagram reels (owner-supplied, re-encoded) as tap-to-play cards on Home and About; `public/reels/` holds the mp4s + webp posters; nothing autoplays or preloads. `src/components/about/ClinicGallery.tsx` — four real photos from the clinic's Google profile in `public/images/clinic/`.
- `next.config.ts` — CSP + security headers. Keep `frame-src` in sync with the Maps embed.

## Still to confirm with Dr. Jain
Exact MD title as on the degree certificate and registration (site shows MD (Neuro-Psychiatry) per v4) · building / landmark line of the Gora Bazar address · regular Saturday hours · fee (optional) · online consultation (FAQ) · Agra visiting schedule · professional memberships (About) · which number is primary (GBP 98894 97550 vs poster 79918 22067).

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
