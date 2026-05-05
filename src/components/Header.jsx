/**
 * components/Header.jsx
 * ─────────────────────────────────────────────────────────────────
 * Contains:
 *  1. Sticky top navigation bar
 *  2. Hero section (full-bleed Borama photo + search bar)
 *  3. Category tiles row
 *
 * Props:
 *  tx           – translation object
 *  lang         – current language key
 *  onLangToggle – () => void
 *  activeFilter – current filter key
 *  onFilter     – (key) => void
 *  clearFilter  – () => void
 */

import { useState } from "react";
import {
  IconWA, IconHome, IconPin, IconTag, IconSearch, IconMenu, IconX,
} from "./Icons";
import { NAV_FILTER_MAP } from "../data/listings";

// ── Your real Borama sunset photo (hero background) ─────────────
import BORAMA_IMG from "../assets/borama-bg.png";

// ── Logo image (the Borama cityscape screenshot) ─────────────────
import LOGO_IMG from "../assets/borama-logo.png";

const NAV_LINKS = [
  { key: "buy",        labelKey: "buy" },
  { key: "rent",       labelKey: "rent" },
  { key: "land",       labelKey: "land" },
  { key: "commercial", labelKey: "commercial" },
  { key: "newDev",     labelKey: "newDev",  disabled: true },
  { key: "agents",     labelKey: "agents",  disabled: true },
];

export default function Header({
  tx,
  lang,
  onLangToggle,
  activeFilter,
  onFilter,
  clearFilter,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [locVal, setLocVal]   = useState("");
  const [typeVal, setTypeVal] = useState("");
  const [priceVal, setPriceVal] = useState("");

  /** Scroll to listings after applying a filter */
  const handleNavClick = (key) => {
    if (!NAV_FILTER_MAP[key]) return; // disabled link
    if (activeFilter === key) {
      clearFilter();
    } else {
      onFilter(key);
      setTimeout(() => {
        document
          .getElementById("listings")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 60);
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* ══════════════════════════════════════════ NAV ══ */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-4">

          {/* Logo — flat house icon + wordmark */}
          <a href="/" className="flex items-center gap-2 flex-shrink-0 mr-4">
            <img
              src={LOGO_IMG}
              alt="Borama Homes logo"
              className="w-10 h-10 object-contain rounded-full bg-blue-50 p-1"
            />
            <div className="leading-tight">
              <div className="font-extrabold text-base text-blue-700 tracking-tight leading-none">
                Borama
              </div>
              <div className="font-semibold text-xs text-slate-500 leading-none mt-0.5">
                Homes
              </div>
            </div>
          </a>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1 flex-1">
            {NAV_LINKS.map(({ key, labelKey, disabled }) => {
              const isActive = activeFilter === key;
              return (
                <button
                  key={key}
                  onClick={() => !disabled && handleNavClick(key)}
                  title={disabled ? "Coming soon" : undefined}
                  className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
                    disabled
                      ? "text-slate-300 cursor-default"
                      : isActive
                      ? "text-blue-700 bg-blue-50 font-bold"
                      : "text-slate-600 hover:text-blue-600 hover:bg-slate-50"
                  }`}
                >
                  {tx.nav[labelKey]}
                  {/* Active underline */}
                  <span
                    className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 bg-blue-600 rounded-full transition-all duration-200 ${
                      isActive ? "w-4/5" : "w-0"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2 ml-auto">
            {/* Active filter badge */}
            {activeFilter && (
              <div className="hidden sm:flex items-center gap-1.5 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                <span className="capitalize">{tx.nav[activeFilter]}</span>
                <button onClick={clearFilter} className="text-blue-500 hover:text-blue-700">
                  <IconX className="w-3 h-3" />
                </button>
              </div>
            )}

            {/* Language toggle */}
            <button
              onClick={onLangToggle}
              className="text-xs font-bold text-orange-600 bg-orange-50 border border-orange-200 px-3 py-1.5 rounded-full hover:bg-orange-100 transition-colors"
            >
              {tx.langBtn}
            </button>

            {/* WhatsApp number (desktop only) */}
            <a
              href="https://wa.me/971529096058"
              target="_blank"
              rel="noreferrer"
              className="hidden lg:flex items-center gap-1.5 text-green-700 text-xs font-semibold bg-green-50 border border-green-200 px-3 py-1.5 rounded-lg hover:bg-green-100 transition-colors"
            >
              <IconWA className="w-3.5 h-3.5" />
              {tx.nav.phone}
            </a>

            {/* Post Property CTA */}
            <a
              href="#submit"
              className="bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm px-4 py-2 rounded-xl transition-colors whitespace-nowrap"
            >
              {tx.nav.postProperty}
            </a>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="md:hidden p-2 border border-slate-200 rounded-lg text-slate-600"
            >
              {mobileMenuOpen ? <IconX /> : <IconMenu />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white px-4 py-3 flex flex-col gap-1">
            {NAV_LINKS.map(({ key, labelKey, disabled }) => (
              <button
                key={key}
                onClick={() => !disabled && handleNavClick(key)}
                className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  disabled
                    ? "text-slate-300"
                    : activeFilter === key
                    ? "bg-blue-50 text-blue-700 font-bold"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {tx.nav[labelKey]}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ══════════════════════════════════════════ HERO ══ */}
      <section className="relative h-[520px] overflow-hidden">
        {/* Background photo */}
        <img
          src={BORAMA_IMG}
          alt="Borama sunset cityscape"
          className="absolute inset-0 w-full h-full object-cover object-[center_25%]"
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70" />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
          <h1
            className="text-3xl sm:text-5xl lg:text-6xl font-black text-white mb-3 tracking-tight leading-tight"
            style={{ textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}
          >
            {tx.hero.title}
          </h1>
          <p
            className="text-white/85 text-base sm:text-xl mb-8 max-w-xl leading-relaxed"
            style={{ textShadow: "0 1px 8px rgba(0,0,0,0.4)" }}
          >
            {tx.hero.subtitle}
          </p>

          {/* Search bar */}
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden">
            <div className="flex flex-col sm:flex-row">
              {/* Location */}
              <div className="flex-[1.5] px-4 py-3 border-b sm:border-b-0 sm:border-r border-slate-100">
                <label className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  <IconPin className="w-3 h-3" /> {tx.hero.locationLabel}
                </label>
                <input
                  value={locVal}
                  onChange={(e) => setLocVal(e.target.value)}
                  placeholder={tx.hero.locationPlaceholder}
                  className="w-full text-sm font-medium text-slate-800 placeholder-slate-400 outline-none bg-transparent"
                />
              </div>

              {/* Type */}
              <div className="flex-1 px-4 py-3 border-b sm:border-b-0 sm:border-r border-slate-100">
                <label className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  <IconHome className="w-3 h-3" /> {tx.hero.typeLabel}
                </label>
                <select
                  value={typeVal}
                  onChange={(e) => setTypeVal(e.target.value)}
                  className="w-full text-sm font-semibold text-slate-800 outline-none bg-transparent cursor-pointer"
                >
                  <option value="">{tx.hero.typePlaceholder}</option>
                  {Object.values(tx.propertyTypes).map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>

              {/* Price */}
              <div className="flex-1 px-4 py-3 border-b sm:border-b-0 sm:border-r border-slate-100">
                <label className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  <IconTag className="w-3 h-3" /> {tx.hero.priceLabel}
                </label>
                <select
                  value={priceVal}
                  onChange={(e) => setPriceVal(e.target.value)}
                  className="w-full text-sm font-semibold text-slate-800 outline-none bg-transparent cursor-pointer"
                >
                  <option value="">{tx.hero.pricePlaceholder}</option>
                  <option>Under $10,000</option>
                  <option>$10,000 – $30,000</option>
                  <option>$30,000 – $60,000</option>
                  <option>$60,000+</option>
                </select>
              </div>

              {/* Button */}
              <button className="m-2 bg-blue-700 hover:bg-blue-800 active:scale-[0.98] text-white font-bold text-sm px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-all whitespace-nowrap">
                <IconSearch className="w-4 h-4" />
                {tx.hero.searchBtn}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════ CATEGORIES ══ */}
      <section className="bg-white border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-slate-100">
            {tx.categories.map((cat, i) => {
              const isActive = activeFilter === cat.filterKey;
              return (
                <button
                  key={cat.label}
                  onClick={() => handleNavClick(cat.filterKey)}
                  className={`group flex flex-col items-center gap-1 py-6 px-4 transition-all border-b-2 ${
                    isActive
                      ? "bg-blue-50 border-blue-600"
                      : "border-transparent hover:bg-slate-50"
                  }`}
                >
                  <span className="text-3xl mb-1">{cat.icon}</span>
                  <span className={`font-bold text-sm ${isActive ? "text-blue-700" : "text-slate-700 group-hover:text-blue-600"}`}>
                    {cat.label}
                  </span>
                  <span className="text-xs text-slate-400">{cat.sub}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
