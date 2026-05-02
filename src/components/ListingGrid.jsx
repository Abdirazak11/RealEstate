/**
 * components/ListingGrid.jsx
 * ─────────────────────────────────────────────────────────────────
 * Renders the filtered listings section including:
 *  - Section header with results count
 *  - Quick-filter pill strip
 *  - Property cards grid
 *  - Empty state
 *  - Loading skeleton
 *
 * Props:
 *  listings      – full array of listing objects
 *  loading       – boolean fetch state
 *  activeFilter  – current filter key (null = all)
 *  onFilter      – (key) => void  — set a filter
 *  clearFilter   – () => void     — reset filter
 *  tx            – translation object
 *  lang          – current language string
 */

import ListingCard from "./ListingCard";
import { IconX, IconEmpty } from "./Icons";
import { NAV_FILTER_MAP } from "../data/listings";

// Filter pill definitions (always in English keys, labels come from tx)
const FILTER_PILLS = [
  { key: null,         labelFn: (tx, lang) => lang === "en" ? "All" : "Dhammaan" },
  { key: "buy",        labelFn: (tx) => tx.nav.buy },
  { key: "rent",       labelFn: (tx) => tx.nav.rent },
  { key: "land",       labelFn: (tx) => tx.nav.land },
  { key: "commercial", labelFn: (tx) => tx.nav.commercial },
];

export default function ListingGrid({
  listings,
  loading,
  activeFilter,
  onFilter,
  clearFilter,
  tx,
  lang,
}) {
  // ── Filter listings ────────────────────────────────────────────
  const allowedTypes = activeFilter ? NAV_FILTER_MAP[activeFilter] : null;
  const filtered = allowedTypes
    ? listings.filter((p) => allowedTypes.includes(p.type_key))
    : listings;

  return (
    <section
      id="listings"
      className="max-w-7xl mx-auto px-4 sm:px-6 py-14 scroll-mt-20"
    >
      {/* ── Header ──────────────────────────────────────────── */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 flex flex-wrap items-center gap-2">
            {tx.featured.title}
            {activeFilter && (
              <span className="text-base font-semibold text-blue-700 bg-blue-50 px-3 py-0.5 rounded-full">
                {tx.nav[activeFilter]}
              </span>
            )}
          </h2>
          {/* Results count */}
          {!loading && (
            <p className="mt-1 text-sm text-slate-500">
              {tx.featured.showing}{" "}
              <strong className="text-slate-700">{filtered.length}</strong>{" "}
              {tx.featured.of}{" "}
              <strong className="text-slate-700">{listings.length}</strong>{" "}
              {tx.featured.properties}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          {activeFilter && (
            <button
              onClick={clearFilter}
              className="flex items-center gap-1.5 text-slate-500 text-sm font-semibold bg-slate-100 hover:bg-slate-200 border border-slate-200 px-3 py-1.5 rounded-lg transition-colors"
            >
              <IconX className="w-3.5 h-3.5" />
              {tx.featured.clearFilter}
            </button>
          )}
          <button className="text-blue-700 hover:text-blue-800 font-semibold text-sm transition-colors hidden sm:block">
            {tx.featured.viewAll}
          </button>
        </div>
      </div>

      {/* ── Filter pills ────────────────────────────────────── */}
      <div className="flex flex-wrap gap-2 mb-8">
        {FILTER_PILLS.map(({ key, labelFn }) => {
          const isActive = activeFilter === key;
          return (
            <button
              key={String(key)}
              onClick={() => (key === null ? clearFilter() : onFilter(key))}
              className={`px-4 py-1.5 text-sm font-semibold rounded-full border-2 transition-all ${
                isActive
                  ? "bg-blue-700 border-blue-700 text-white"
                  : "bg-white border-slate-200 text-slate-500 hover:border-blue-500 hover:text-blue-600"
              }`}
            >
              {labelFn(tx, lang)}
            </button>
          );
        })}
      </div>

      {/* ── Loading skeletons ────────────────────────────────── */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm animate-pulse">
              <div className="h-52 bg-slate-200" />
              <div className="p-5 space-y-3">
                <div className="h-5 bg-slate-200 rounded w-2/3" />
                <div className="h-4 bg-slate-200 rounded w-1/2" />
                <div className="h-10 bg-slate-200 rounded-xl mt-4" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Empty state ─────────────────────────────────────── */}
      {!loading && filtered.length === 0 && (
        <div className="flex flex-col items-center py-20 text-slate-400">
          <IconEmpty className="w-16 h-16 mb-4 text-slate-300" />
          <p className="text-lg font-semibold text-slate-500 mb-2">
            {tx.featured.noResults}
          </p>
          <button
            onClick={clearFilter}
            className="text-blue-700 font-bold text-sm underline"
          >
            {tx.featured.clearFilter}
          </button>
        </div>
      )}

      {/* ── Cards grid ──────────────────────────────────────── */}
      {!loading && filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              tx={tx.featured}
              typeLabel={tx.propertyTypes[listing.type_key] ?? listing.type_key}
            />
          ))}
        </div>
      )}
    </section>
  );
}
