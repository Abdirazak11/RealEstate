/**
 * hooks/useListings.js
 * ─────────────────────────────────────────────────────────────────
 * Custom hook that fetches property listings.
 *
 * Strategy:
 *  1. If Supabase is configured → fetch from `listings` table.
 *  2. If Supabase is NOT configured → return STATIC_LISTINGS.
 *
 * Returns: { listings, loading, error, refetch }
 */

import { useState, useEffect, useCallback } from "react";
import supabase from "../lib/supabase";
import { STATIC_LISTINGS } from "../data/listings";

export function useListings() {
  const [listings, setListings] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);

  const fetchListings = useCallback(async () => {
    setLoading(true);
    setError(null);

    // ── No Supabase → use static data ──────────────────────────
    if (!supabase) {
      // Simulate a tiny async delay so UI feels consistent
      await new Promise((r) => setTimeout(r, 300));
      setListings(STATIC_LISTINGS);
      setLoading(false);
      return;
    }

    // ── Supabase configured → fetch from DB ───────────────────
    try {
      const { data, error: sbError } = await supabase
        .from("listings")
        .select("*")
        .order("created_at", { ascending: false });

      if (sbError) throw sbError;

      // Fall back to static data if table is empty
      setListings(data?.length ? data : STATIC_LISTINGS);
    } catch (err) {
      console.error("[useListings] fetch error:", err);
      setError(err.message);
      setListings(STATIC_LISTINGS); // always show something
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  return { listings, loading, error, refetch: fetchListings };
}
