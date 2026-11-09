"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/content/site";

export default function FloatingWhatsApp() {
  return (
    <motion.a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 18 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      className="fixed bottom-5 right-5 z-40 hidden size-14 place-items-center md:grid rounded-full bg-[#25D366] text-white shadow-[0_14px_36px_-10px_rgba(37,211,102,0.7)]"
    >
      <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/40 [animation-duration:2.4s]" />
      <MessageCircle className="relative size-6" />
    </motion.a>
  );
}
