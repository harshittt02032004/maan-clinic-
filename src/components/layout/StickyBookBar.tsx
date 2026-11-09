"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Phone, MessageCircle, CalendarCheck } from "lucide-react";
import { telLink, whatsappLink } from "@/content/site";
import { EASE } from "@/lib/motion";

/** Mobile-only bottom action bar; appears once the hero has scrolled away. */
export default function StickyBookBar() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.nav
          aria-label="Quick actions"
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-3 gap-1 rounded-2xl border border-white/70 bg-white/90 p-1.5 shadow-[var(--shadow-soft)] backdrop-blur-xl md:hidden"
          style={{ paddingBottom: "max(0.375rem, env(safe-area-inset-bottom))" }}
        >
          <a href={telLink} className="flex flex-col items-center gap-0.5 rounded-xl py-2 text-[11px] font-bold text-navy-800 active:bg-pink-50">
            <Phone className="size-4 text-pink-600" /> Call
          </a>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-0.5 rounded-xl py-2 text-[11px] font-bold text-navy-800 active:bg-pink-50">
            <MessageCircle className="size-4 text-[#25D366]" /> WhatsApp
          </a>
          <Link href="/contact/" className="flex flex-col items-center gap-0.5 rounded-xl bg-pink-600 py-2 text-[11px] font-bold text-white">
            <CalendarCheck className="size-4" /> Book
          </Link>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
