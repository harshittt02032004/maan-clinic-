"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { EASE, EASE_OUT_BACK } from "@/lib/motion";

/**
 * The client's logo, unchanged in design, split into three transparent layers
 * (public/brand/logo-{mark,word,tag}.png — see scripts/logo-layers.mjs) so it can animate:
 * the two figures drop in and settle, "ann Clinic" wipes in from the left, the tagline
 * writes itself. All layers share one 560×475 canvas, so they stay pixel-aligned.
 *
 * `variant="nav"` crops to the top ~76% (figures + wordmark) to fit a header bar;
 * `variant="full"` shows everything including "We care about your feelings..".
 * `tone="light"` is the reversed logo for dark backgrounds: white figures and tagline, same pink wordmark.
 * `height` is the size from md up; `mobileHeight` (optional) the size on phones. Sizing is done in CSS
 * (.logo-box in globals.css), so there is no jump after the page hydrates.
 */
const NAV_CROP = 0.76; // share of height that holds figures + wordmark (tagline starts below)
const SIZES = "(max-width: 767px) 160px, 220px"; // the logo is never drawn wider than this

export default function Logo({
  variant = "nav",
  height = 56,
  mobileHeight,
  tone = "dark",
  className = "",
  animate = true,
  priority = false,
}: {
  variant?: "nav" | "full";
  height?: number;
  mobileHeight?: number;
  tone?: "dark" | "light";
  className?: string;
  animate?: boolean;
  priority?: boolean;
}) {
  const layer = "absolute inset-0 h-full w-full object-contain select-none";
  const init = animate ? "hidden" : "show";
  const light = tone === "light";
  const vars = { "--lh": `${mobileHeight ?? height}px`, "--lh-md": `${height}px`, "--crop": variant === "nav" ? NAV_CROP : 1 } as CSSProperties;

  return (
    <Link href="/" aria-label="Mann Clinic — home" className={`group inline-block ${className}`}>
      <motion.span initial={init} animate="show" whileHover="hover" className="logo-box relative block overflow-hidden" style={vars}>
        <span className="logo-canvas absolute left-0 top-0 block">
          {/* figures */}
          <motion.span
            className="absolute inset-0 block"
            variants={{
              hidden: { y: -18, opacity: 0, scale: 0.94 },
              show: { y: 0, opacity: 1, scale: 1, transition: { duration: 0.8, ease: EASE_OUT_BACK, delay: 0.05 } },
              hover: { y: -3, transition: { duration: 0.35, ease: EASE } },
            }}
            style={{ transformOrigin: "50% 100%" }}
          >
            <Image src={light ? "/brand/logo-mark-light.png" : "/brand/logo-mark.png"} alt="" width={560} height={475} sizes={SIZES} priority={priority} className={layer} draggable={false} />
          </motion.span>
          {/* wordmark */}
          <motion.span
            className="absolute inset-0 block"
            variants={{
              hidden: { clipPath: "inset(0 100% 0 0)", opacity: 0.6 },
              show: { clipPath: "inset(0 0% 0 0)", opacity: 1, transition: { duration: 0.9, ease: EASE, delay: 0.35 } },
              hover: { x: 2, transition: { duration: 0.35, ease: EASE } },
            }}
          >
            <Image src="/brand/logo-word.png" alt="Mann Clinic" width={560} height={475} sizes={SIZES} priority={priority} className={layer} draggable={false} />
          </motion.span>
          {/* tagline */}
          {variant === "full" && (
            <motion.span
              className="absolute inset-0 block"
              variants={{
                hidden: { clipPath: "inset(0 100% 0 0)", opacity: 0 },
                show: { clipPath: "inset(0 0% 0 0)", opacity: 1, transition: { duration: 1.1, ease: EASE, delay: 0.9 } },
              }}
            >
              <Image src={light ? "/brand/logo-tag-light.png" : "/brand/logo-tag.png"} alt="We care about your feelings" width={560} height={475} sizes={SIZES} className={layer} draggable={false} />
            </motion.span>
          )}
          {/* sheen on hover */}
          {!light && (
            <motion.span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/70 to-transparent"
              variants={{ hidden: { x: "-150%" }, show: { x: "-150%" }, hover: { x: "350%", transition: { duration: 0.9, ease: "easeInOut" } } }}
              style={{ mixBlendMode: "soft-light" }}
            />
          )}
        </span>
      </motion.span>
    </Link>
  );
}

/** Static square mark (the two figures) for small badges. */
export function LogoMark({ size = 40, className = "" }: { size?: number; className?: string }) {
  return <Image src="/icon.png" alt="" width={size} height={size} className={`select-none ${className}`} draggable={false} />;
}
