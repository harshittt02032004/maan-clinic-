# Mann Clinic — Dr. Mohit Jain (Psychiatrist, Raebareli)

Next.js 16 App Router · Tailwind v4 · framer-motion · Lenis · lucide-react. Dev: `.claude/launch.json` → `mann-dev` (port 3171).

## Content rules (NMC Ethical Advertising guidelines, 6 Oct 2026 — content doc v3)
- **No** testimonials, Google-review widgets, star ratings, patient stories, before/after, patient counts, success rates, "100%", "best/premier/renowned", guaranteed results, fear/urgency copy, or any free-camp/offer promotion.
- Treatment language stays educational ("depression is treatable"), never promissory.
- No AI-generated "patient"/"doctor" images. Doctor's real photo only (`CLINIC.doctorPhoto`).
- Dr. Jain must approve every page before it goes live.

## Where things live
- `src/content/site.ts` — clinic facts (phone, address, hours, maps, registration placeholders).
- `src/content/conditions.ts` — 8 condition pages (verbatim doc copy + motif per page).
- `src/content/faq.ts` — FAQs; `pending: true` hides unconfirmed answers from page + schema.
- `src/content/about.ts` — About page, trust chips, pillars, first-visit steps.
- `next.config.ts` — CSP + security headers. Keep `frame-src` in sync with the Maps embed.

## Still to confirm with Dr. Jain
Registration number + council · regular Saturday hours · fee (optional) · online consultation (FAQ) · under-18 patients (FAQ) · Agra visiting schedule · doctor photo · which number is primary (GBP 98894 97550 vs poster 79918 22067).

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
