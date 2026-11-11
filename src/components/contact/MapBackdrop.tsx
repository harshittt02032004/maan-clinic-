import { ArrowUpRight, MapPin } from "lucide-react";
import { CLINIC } from "@/content/site";

/**
 * The live Google map as the background of the contact hero.
 *
 * The embed draws its pin at the centre of the iframe, so the iframe is made 2.2× the section's height
 * and shifted so that centre falls PIN_FROM_BOTTOM px above the section's bottom edge: the pin lands in the
 * clear strip left under the cards (see `MapFooter`) instead of hiding behind them.
 */
const PIN_FROM_BOTTOM = 190;

export function MapBackdrop() {
  return (
    <div aria-hidden={false} className="absolute inset-0 -z-10 overflow-hidden bg-pink-50">
      <iframe
        title="Mann Clinic location on Google Maps"
        src={CLINIC.mapsEmbed}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="absolute inset-x-0 h-[220%] w-full border-0 [filter:saturate(0.9)_contrast(1.02)]"
        style={{ top: `calc(100% - ${PIN_FROM_BOTTOM}px)`, transform: "translateY(-50%)" }}
      />
      {/* readability wash: strong behind the headings and cards, nearly clear at the bottom where the pin is */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-blush/95 from-0% via-blush/80 via-55% to-blush/5 to-100%" />
      {/* name chip above the pin */}
      <div aria-hidden className="pointer-events-none absolute left-1/2 hidden -translate-x-1/2 flex-col items-center sm:flex" style={{ bottom: PIN_FROM_BOTTOM + 58 }}>
        <span className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-extrabold text-navy-900 shadow-[var(--shadow-soft)]">
          <MapPin className="size-4 text-pink-600" /> Mann Clinic
        </span>
      </div>
    </div>
  );
}

/** Clear strip under the cards: lets the map (and its pin) show, with a directions button. */
export function MapFooter() {
  return (
    <div className="pointer-events-none flex h-72 items-end justify-center pb-1 lg:h-[23rem]">
      <a
        href={CLINIC.mapsLink}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary pointer-events-auto"
      >
        Get directions <ArrowUpRight className="size-4" />
      </a>
    </div>
  );
}
