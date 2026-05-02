/**
 * lib/supabase.js
 * ─────────────────────────────────────────────────────────────────
 * Initialises a single shared Supabase client.
 *
 * Environment variables (Vite convention):
 *   VITE_SUPABASE_URL   – your project URL from supabase.com
 *   VITE_SUPABASE_ANON_KEY – the public anon key (safe to expose)
 *
 * If the variables are missing we export `null` so every consumer
 * can gracefully fall back to static data.
 */

import { createClient } from "@supabase/supabase-js";

const supabaseUrl  = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey  = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Only create the client when both values are present
const supabase =
  supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey)
    : null;

export default supabase;
