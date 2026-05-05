/**
 * components/Footer.jsx
 * ─────────────────────────────────────────────────────────────────
 * Site footer with brand, contact info, and quick links.
 *
 * Props:
 *  tx          – translation object
 *  onNavClick  – (key) => void  (quick links filter)
 */

import { IconWA, IconPin } from "./Icons";
import LOGO_IMG from "../assets/borama-logo.png";

const QUICK_LINK_KEYS = ["buy", "rent", "land", "commercial"];

export default function Footer({ tx, onNavClick }) {
  return (
    <footer className="bg-slate-900 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">

        {/* ── Top grid ──────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 pb-10 border-b border-slate-800">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={LOGO_IMG} alt="Borama Homes" className="w-9 h-9 object-contain rounded-full bg-blue-50 p-1" />
              <span className="font-extrabold text-lg text-white">
                Borama<span className="text-blue-400">Homes</span>
              </span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              {tx.footer.tagline}
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-white text-sm mb-4 uppercase tracking-widest">
              {tx.footer.contactTitle}
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <IconPin className="w-4 h-4 flex-shrink-0" />
                {tx.footer.address}
              </li>
              <li>
                <a
                  href="https://wa.me/971529096058"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-green-400 hover:text-green-300 font-semibold transition-colors"
                >
                  <IconWA className="w-4 h-4" />
                  +252 63 1234567
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span>✉️</span>
                info@boramahomes.so
              </li>
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-bold text-white text-sm mb-4 uppercase tracking-widest">
              {tx.footer.quickLinks}
            </h3>
            <ul className="space-y-2">
              {QUICK_LINK_KEYS.map((key) => (
                <li key={key}>
                  <button
                    onClick={() => onNavClick(key)}
                    className="text-sm text-slate-500 hover:text-blue-400 transition-colors"
                  >
                    {tx.nav[key]}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Copyright ─────────────────────────────────────── */}
        <p className="text-center text-xs text-slate-700 pt-6">
          © {new Date().getFullYear()} {tx.footer.copyright}
        </p>
      </div>
    </footer>
  );
}
