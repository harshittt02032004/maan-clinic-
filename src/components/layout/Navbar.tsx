"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X, Phone } from "lucide-react";
import Logo from "./Logo";
import { NAV, telLink } from "@/content/site";
import { CONDITIONS, shortName } from "@/content/conditions";
import { EASE } from "@/lib/motion";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dd, setDd] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setDd(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.classList.toggle("lenis-stopped", open);
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href.replace(/\/$/, "")));

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div
        animate={{ paddingTop: scrolled ? 8 : 16, paddingBottom: scrolled ? 8 : 16 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="container-x"
      >
        <div
          className={`flex items-center justify-between gap-4 rounded-full border px-3 pl-4 transition-all duration-500 sm:px-4 sm:pl-6 ${
            scrolled ? "border-white/80 bg-white/90 py-1 shadow-[var(--shadow-soft)] backdrop-blur-xl max-md:bg-white" : "border-white/70 bg-white/70 py-1.5 backdrop-blur-md max-md:bg-white max-md:shadow-[var(--shadow-soft)]"
          }`}
        >
          <Logo variant="full" height={scrolled ? 62 : 78} mobileHeight={scrolled ? 50 : 58} priority />

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) =>
              "dropdown" in item && item.dropdown ? (
                <div key={item.href} className="relative" onMouseEnter={() => setDd(true)} onMouseLeave={() => setDd(false)}>
                  <Link
                    href={item.href}
                    className={`inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${isActive(item.href) || CONDITIONS.some((c) => pathname.startsWith(`/${c.slug}`)) ? "text-pink-600" : "text-navy-800 hover:text-pink-600"}`}
                    aria-haspopup="true"
                    aria-expanded={dd}
                  >
                    {item.label}
                    <ChevronDown className={`size-4 transition-transform ${dd ? "rotate-180" : ""}`} />
                  </Link>
                  <AnimatePresence>
                    {dd && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.25, ease: EASE }}
                        className="absolute left-1/2 top-full w-[560px] -translate-x-1/2 pt-3"
                      >
                        <div className="card grid grid-cols-2 gap-1 p-3">
                          {CONDITIONS.map((c, i) => (
                            <motion.div key={c.slug} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.03 * i }}>
                              <Link href={`/${c.slug}/`} className="group flex items-start gap-3 rounded-2xl px-3 py-2.5 transition-colors hover:bg-pink-50">
                                <span className="mt-1.5 size-2 shrink-0 rounded-full bg-pink-300 transition-all group-hover:scale-150 group-hover:bg-pink-600" />
                                <span>
                                  <span className="block text-sm font-bold text-navy-900">{shortName(c)}</span>
                                  <span className="hindi block text-xs text-muted">{c.hindi}</span>
                                </span>
                              </Link>
                            </motion.div>
                          ))}
                          <Link href="/conditions/" className="col-span-2 mt-1 rounded-2xl bg-navy-900 px-4 py-2.5 text-center text-xs font-bold uppercase tracking-[0.18em] text-white hover:bg-navy-800">
                            All conditions
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative rounded-full px-4 py-2 text-sm font-semibold transition-colors ${isActive(item.href) ? "text-pink-600" : "text-navy-800 hover:text-pink-600"}`}
                >
                  {item.label}
                  {isActive(item.href) && <motion.span layoutId="nav-dot" className="absolute -bottom-0.5 left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-pink-500" />}
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center gap-2">
            <a href={telLink} className="btn-ghost hidden !px-4 !py-2.5 xl:inline-flex" aria-label="Call Mann Clinic">
              <Phone className="size-4" /> Call
            </a>
            <Link href="/contact/" className="btn-primary hidden !px-5 !py-2.5 md:inline-flex">
              Book Appointment
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid size-11 place-items-center rounded-full border border-navy-100 bg-white text-navy-900 lg:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at calc(100% - 40px) 40px)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            transition={{ duration: 0.55, ease: EASE }}
            className="fixed inset-0 z-[-1] flex flex-col bg-navy-900 pt-28 text-white lg:hidden"
            data-lenis-prevent
          >
            <div className="container-x flex-1 overflow-y-auto pb-10">
              <ul className="space-y-1">
                {NAV.map((item, i) => (
                  <motion.li key={item.href} initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.06 }}>
                    <Link href={item.href} className="block py-3 font-display text-3xl font-extrabold tracking-tight">
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} className="mt-6 grid grid-cols-2 gap-2 border-t border-white/10 pt-6">
                {CONDITIONS.map((c) => (
                  <Link key={c.slug} href={`/${c.slug}/`} className="rounded-2xl bg-white/5 px-3 py-3 text-sm font-semibold text-pink-100 hover:bg-white/10">
                    {shortName(c)}
                  </Link>
                ))}
              </motion.div>
              <div className="mt-8 flex flex-col gap-3">
                <Link href="/contact/" className="btn-primary">Book Appointment</Link>
                <a href={telLink} className="btn-ghost !border-white/20 !bg-white/5 !text-white"><Phone className="size-4" /> Call the clinic</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
