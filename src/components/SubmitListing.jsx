/**
 * components/SubmitListing.jsx
 * ─────────────────────────────────────────────────────────────────
 * "Post your property" form.
 *
 * - Validates required fields before submission
 * - Writes to Supabase `listings` table when configured
 * - Falls back to a console.log + success message when no Supabase
 *
 * Props:
 *  tx – translation object (submitForm strings)
 */

import { useState } from "react";
import supabase from "../lib/supabase";

const PROPERTY_TYPES = [
  "House for Sale",
  "Land for Sale",
  "Apartment for Rent",
  "Shop for Rent",
];

const EMPTY_FORM = {
  title: "",
  price: "",
  location: "",
  type_key: "",
  phone: "",
  description: "",
};

export default function SubmitListing({ tx }) {
  const [form, setForm]         = useState(EMPTY_FORM);
  const [errors, setErrors]     = useState({});
  const [status, setStatus]     = useState("idle"); // idle | loading | success | error

  // ── Validation ─────────────────────────────────────────────────
  const validate = () => {
    const e = {};
    if (!form.title.trim())    e.title    = "Required";
    if (!form.price.trim())    e.price    = "Required";
    if (!form.location.trim()) e.location = "Required";
    if (!form.type_key)        e.type_key = "Required";
    if (!form.phone.trim())    e.phone    = "Required";
    return e;
  };

  // ── Submit ──────────────────────────────────────────────────────
  const handleSubmit = async () => {
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus("loading");

    // Build the row to insert
    const payload = {
      ...form,
      image_url: `https://placehold.co/600x420/dbeafe/1e40af?text=${encodeURIComponent(form.title)}`,
      featured: false,
    };

    if (!supabase) {
      // No Supabase — log and show success
      console.log("[SubmitListing] Would insert:", payload);
      await new Promise((r) => setTimeout(r, 800)); // fake latency
      setStatus("success");
      setForm(EMPTY_FORM);
      return;
    }

    try {
      const { error } = await supabase.from("listings").insert([payload]);
      if (error) throw error;
      setStatus("success");
      setForm(EMPTY_FORM);
    } catch (err) {
      console.error("[SubmitListing] insert error:", err);
      setStatus("error");
    }
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    // Clear error on change
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  return (
    <section
      id="submit"
      className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 py-20 px-4"
    >
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
            {tx.title}
          </h2>
          <p className="text-blue-200 text-base leading-relaxed">{tx.subtitle}</p>
        </div>

        {/* Success state */}
        {status === "success" ? (
          <div className="bg-white rounded-2xl p-10 text-center shadow-2xl">
            <div className="text-5xl mb-4">🎉</div>
            <p className="text-lg font-bold text-slate-800">{tx.successMsg}</p>
          </div>
        ) : (
          /* Form card */
          <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field
                label={tx.titleLabel}
                error={errors.title}
                className="sm:col-span-2"
              >
                <input
                  value={form.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder={tx.titlePlaceholder}
                  className={inputCls(errors.title)}
                />
              </Field>

              <Field label={tx.priceLabel} error={errors.price}>
                <input
                  value={form.price}
                  onChange={(e) => handleChange("price", e.target.value)}
                  placeholder={tx.pricePlaceholder}
                  className={inputCls(errors.price)}
                />
              </Field>

              <Field label={tx.locationLabel} error={errors.location}>
                <input
                  value={form.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                  placeholder={tx.locationPlaceholder}
                  className={inputCls(errors.location)}
                />
              </Field>

              <Field label={tx.typeLabel} error={errors.type_key}>
                <select
                  value={form.type_key}
                  onChange={(e) => handleChange("type_key", e.target.value)}
                  className={inputCls(errors.type_key)}
                >
                  <option value="">— Select —</option>
                  {PROPERTY_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </Field>

              <Field label={tx.phoneLabel} error={errors.phone}>
                <input
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder={tx.phonePlaceholder}
                  className={inputCls(errors.phone)}
                />
              </Field>

              <Field
                label={tx.descLabel}
                error={errors.description}
                className="sm:col-span-2"
              >
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  placeholder={tx.descPlaceholder}
                  className={`${inputCls()} resize-none`}
                />
              </Field>
            </div>

            {/* Error banner */}
            {status === "error" && (
              <p className="mt-4 text-sm text-red-600 font-semibold text-center">
                {tx.errorMsg}
              </p>
            )}

            {/* Submit button */}
            <button
              onClick={handleSubmit}
              disabled={status === "loading"}
              className="mt-6 w-full bg-blue-700 hover:bg-blue-800 disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition-all active:scale-[0.98] text-base"
            >
              {status === "loading" ? tx.submitting : tx.submitBtn}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

/** Reusable form field wrapper */
function Field({ label, error, children, className = "" }) {
  return (
    <div className={className}>
      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-xs text-red-500 font-medium">{error}</p>
      )}
    </div>
  );
}

/** Tailwind classes for inputs — red ring when there's an error */
function inputCls(error) {
  return `w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-800 bg-slate-50 outline-none transition-colors focus:bg-white focus:ring-2 ${
    error
      ? "border-red-400 focus:ring-red-200"
      : "border-slate-200 focus:ring-blue-200 focus:border-blue-400"
  }`;
}
