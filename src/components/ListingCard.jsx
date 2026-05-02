/**
 * components/ListingCard.jsx
 * ─────────────────────────────────────────────────────────────────
 * Displays a single property listing.
 *
 * Props:
 *  listing   – listing object (see data/listings.js for shape)
 *  tx        – translation object (featured section strings)
 *  typeLabel – human-readable property type in current language
 */

import { IconWA, IconPin, IconBed, IconBath, IconArea } from "./Icons";

export default function ListingCard({ listing, tx, typeLabel }) {
  const waText = encodeURIComponent(
    `${tx.waMsg}: ${typeLabel} — ${listing.location}`
  );

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col">

      {/* ── Image ───────────────────────────────────────────── */}
      <div className="relative h-52 overflow-hidden flex-shrink-0">
        <img
          src={listing.image_url}
          alt={typeLabel}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Featured badge */}
        <span className="absolute top-3 left-3 bg-blue-700 text-white text-xs font-bold px-2.5 py-1 rounded-md tracking-wide">
          {tx.badge}
        </span>
        {/* Type label gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-4 py-3">
          <span className="text-white text-xs font-semibold opacity-90">
            {typeLabel}
          </span>
        </div>
      </div>

      {/* ── Body ────────────────────────────────────────────── */}
      <div className="p-5 flex flex-col flex-1">
        {/* Title (if available) */}
        {listing.title && (
          <p className="font-semibold text-slate-700 text-sm mb-1 truncate">
            {listing.title}
          </p>
        )}

        {/* Price */}
        <p className="text-2xl font-extrabold text-blue-700 mb-1">
          {listing.price}
        </p>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-slate-500 text-sm mb-3">
          <IconPin className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="truncate">{listing.location}</span>
        </div>

        {/* Stats chips */}
        <div className="flex flex-wrap gap-2 mb-4">
          {listing.beds && (
            <Chip icon={<IconBed />} label={`${listing.beds} ${tx.beds}`} />
          )}
          {listing.baths && (
            <Chip icon={<IconBath />} label={`${listing.baths} ${tx.baths}`} />
          )}
          {listing.area && (
            <Chip icon={<IconArea />} label={listing.area} />
          )}
        </div>

        {/* WhatsApp CTA — pushed to bottom */}
        <div className="mt-auto">
          <a
            href={`https://wa.me/${listing.phone}?text=${waText}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 active:scale-[0.98] text-white font-bold text-sm py-3 rounded-xl transition-all"
          >
            <IconWA className="w-4 h-4" />
            {tx.contactBtn}
          </a>
        </div>
      </div>
    </div>
  );
}

/** Small stat chip used inside the card */
function Chip({ icon, label }) {
  return (
    <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
      {icon}
      {label}
    </div>
  );
}
