"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import Logo from "./Logo";
import { CLINIC, NAV, telLink } from "@/content/site";
import { CONDITIONS, shortName } from "@/content/conditions";
import { EASE } from "@/lib/motion";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [dd, setDd] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => { setOpen(false); setDd(false); }, [pathname]);
  useEffect(() => {
    document.documentElement.classList.toggle("lenis-stopped", open);
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href.replace(/\/$/, "")));
  const inConditions = CONDITIONS.some((c) => pathname.startsWith(`/${c.slug}`)) || pathname.startsWith("/conditions");

  return (
    <header className="sticky top-0 z-50 bg-paper">
      {/* utility strip */}
      <div className="bg-ink text-white">
        <div className="container-x flex items-center justify-between gap-4 py-1.5 text-[12px] tracking-wide sm:text-[13px]">
          <p className="flex items-center gap-2 truncate">
            <span className="size-2 shrink-0 rounded-full bg-magenta" />
            <span className="truncate">Free 24x7 mental-health helpline Tele-MANAS <a href={`tel:${CLINIC.teleManas}`} className="font-semibold underline-offset-2 hover:underline">{CLINIC.teleManas}</a></span>
          </p>
          <p className="hidden gap-6 md:flex"><span>{CLINIC.timings}</span><span>Civil Lines, Raebareli</span></p>
        </div>
      </div>

      <div className="rule-b">
        <div className={`container-x flex items-center justify-between gap-6 transition-[padding] duration-300 ${scrolled ? "py-2" : "py-3 sm:py-4"}`}>
          <Logo variant="full" height={scrolled ? 52 : 64} priority />

          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            {NAV.filter((n) => n.href !== "/").map((item) =>
              "dropdown" in item && item.dropdown ? (
                <div key={item.href} className="relative" onMouseEnter={() => setDd(true)} onMouseLeave={() => setDd(false)}>
                  <Link href={item.href} aria-haspopup="true" aria-expanded={dd} className={`relative py-2 text-[15px] font-medium ${inConditions ? "text-magenta" : "text-ink hover:text-magenta"}`}>
                    {item.label}
                    <span className={`absolute inset-x-0 -bottom-0.5 h-[2px] bg-magenta transition-transform duration-300 ${inConditions || dd ? "scale-x-100" : "scale-x-0"}`} style={{ transformOrigin: "left" }} />
                  </Link>
                  <AnimatePresence>
                    {dd && (
                      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }} transition={{ duration: 0.2, ease: EASE }} className="absolute left-1/2 top-full w-[620px] -translate-x-1/2 pt-4">
                        <div className="sticker grid grid-cols-2 bg-paper p-2">
                          {CONDITIONS.map((c, i) => (
                            <Link key={c.slug} href={`/${c.slug}/`} className="group flex items-baseline gap-3 px-3 py-2.5 hover:bg-blush">
                              <span className="font-display text-xs font-bold text-magenta">0{i + 1}</span>
                              <span>
                                <span className="block font-display text-[15px] font-bold text-ink">{shortName(c)}</span>
                                <span className="hindi block text-[13px] text-body">{c.hindi}</span>
                              </span>
                            </Link>
                          ))}
                          <Link href="/conditions/" className="col-span-2 mt-1 flex items-center justify-between bg-ink px-4 py-3 font-display text-sm font-bold text-white hover:bg-ink-2">
                            All conditions <ArrowRight className="size-4" />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link key={item.href} href={item.href} className={`relative py-2 text-[15px] font-medium ${isActive(item.href) ? "text-magenta" : "text-ink hover:text-magenta"}`}>
                  {item.label}
                  <span className={`absolute inset-x-0 -bottom-0.5 h-[2px] bg-magenta transition-transform duration-300 ${isActive(item.href) ? "scale-x-100" : "scale-x-0"}`} style={{ transformOrigin: "left" }} />
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center gap-3 sm:gap-4">
            <a href={telLink} className="hidden font-display text-[15px] font-semibold text-ink hover:text-magenta xl:block">{CLINIC.phoneDisplay}</a>
            <Link href="/contact/" className="btn-magenta !px-4 !py-2.5 text-[13px] sm:!px-5 sm:!py-3.5 sm:text-[15px]">
              <span className="sm:hidden">Book</span><span className="hidden sm:inline">Book an appointment</span> <ArrowRight className="size-4" />
            </Link>
            <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? "Close menu" : "Open menu"} className="grid size-11 place-items-center border-[1.5px] border-ink bg-white lg:hidden">
              {open ? <X className="size-5" /> : (
                <span className="flex flex-col items-end gap-[5px]"><span className="h-[2px] w-5 bg-ink" /><span className="h-[2px] w-5 bg-ink" /><span className="h-[2px] w-3 bg-magenta" /></span>
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div id="mobile-nav" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3, ease: EASE }} className="fixed inset-0 z-40 overflow-y-auto bg-paper pt-[124px] lg:hidden" data-lenis-prevent>
            <div className="container-x py-6">
              <ul className="rule-t">
                {NAV.map((item, i) => (
                  <motion.li key={item.href} initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 + i * 0.05 }} className="border-b border-rule">
                    <Link href={item.href} className="flex items-center justify-between py-4 font-display text-2xl font-bold text-ink">
                      {item.label} <ArrowRight className="size-5 text-magenta" />
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <p className="kicker mt-8"><span className="kicker-line" />Conditions</p>
              <ul className="mt-3 grid grid-cols-2 gap-x-6">
                {CONDITIONS.map((c, i) => (
                  <li key={c.slug} className="border-b border-rule">
                    <Link href={`/${c.slug}/`} className="flex items-baseline gap-2 py-3 text-[15px] font-semibold text-ink">
                      <span className="font-display text-xs text-magenta">0{i + 1}</span>{shortName(c)}
                    </Link>
                  </li>
                ))}
              </ul>
              <a href={telLink} className="btn-line mt-8 w-full">Call {CLINIC.phoneDisplay}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
