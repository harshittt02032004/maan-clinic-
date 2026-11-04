"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { telLink, whatsappLink } from "@/content/site";
import { EASE } from "@/lib/motion";

/** Mobile-only bottom action bar; appears once the hero has scrolled away. */
export default function StickyBookBar() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 560);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.nav
          aria-label="Quick actions"
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          exit={{ y: 80 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t-[1.5px] border-ink bg-paper font-display text-[13px] font-bold md:hidden"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          <a href={telLink} className="border-r-[1.5px] border-ink py-4 text-center text-ink">Call</a>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="border-r-[1.5px] border-ink py-4 text-center text-ink">WhatsApp</a>
          <Link href="/contact/" className="bg-magenta py-4 text-center text-white">Book</Link>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
