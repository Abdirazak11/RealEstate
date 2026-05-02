/**
 * App.jsx
 * ─────────────────────────────────────────────────────────────────
 * Root component. Owns global state (language, active filter) and
 * composes all page sections.
 *
 * State:
 *  lang         – "en" | "so"
 *  activeFilter – null | "buy" | "rent" | "land" | "commercial"
 */

import { useState, useRef } from "react";

import Header        from "./components/Header";
import ListingGrid   from "./components/ListingGrid";
import SubmitListing from "./components/SubmitListing";
import Footer        from "./components/Footer";

import { useListings }    from "./hooks/useListings";
import { TRANSLATIONS }   from "./data/translations";
import { NAV_FILTER_MAP } from "./data/listings";

export default function App() {
  const [lang, setLang]               = useState("en");
  const [activeFilter, setActiveFilter] = useState(null);

  // Fetch listings (Supabase when configured, static fallback otherwise)
  const { listings, loading, error } = useListings();

  const tx = TRANSLATIONS[lang];

  // ── Filter helpers ─────────────────────────────────────────────
  const handleFilter = (key) => {
    if (!NAV_FILTER_MAP[key]) return; // non-filterable link
    setActiveFilter((prev) => (prev === key ? null : key));
  };

  const clearFilter = () => setActiveFilter(null);

  // ── Quick scroll to listings (used by footer links) ────────────
  const handleFooterNavClick = (key) => {
    handleFilter(key);
    setTimeout(() => {
      document
        .getElementById("listings")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">

      {/* ── Navigation + Hero + Category tiles ─────────────── */}
      <Header
        tx={tx}
        lang={lang}
        onLangToggle={() => setLang((l) => (l === "en" ? "so" : "en"))}
        activeFilter={activeFilter}
        onFilter={handleFilter}
        clearFilter={clearFilter}
      />

      {/* ── Trust / Why Us section ──────────────────────────── */}
      <section className="bg-blue-50 border-y border-blue-100 py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-slate-800 mb-8">
            {tx.trust.title}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {tx.trust.items.map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl p-7 text-center border border-blue-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-slate-800 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Property listings grid ──────────────────────────── */}
      {/* Show a fetch-error banner if Supabase is down */}
      {error && (
        <div className="max-w-7xl mx-auto px-4 pt-6">
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 text-sm font-medium px-4 py-3 rounded-xl">
            ⚠️ Could not reach the database — showing cached listings.
          </div>
        </div>
      )}

      <ListingGrid
        listings={listings}
        loading={loading}
        activeFilter={activeFilter}
        onFilter={handleFilter}
        clearFilter={clearFilter}
        tx={tx}
        lang={lang}
      />

      {/* ── Submit listing form ─────────────────────────────── */}
      <SubmitListing tx={tx.submitForm} />

      {/* ── Footer ──────────────────────────────────────────── */}
      <Footer tx={tx} onNavClick={handleFooterNavClick} />
    </div>
  );
}
