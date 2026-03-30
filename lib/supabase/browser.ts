import { createBrowserClient } from "@supabase/ssr";

import { getSupabaseConfig } from "@/lib/supabase/config";

export function getBrowserSupabaseClient() {
  const config = getSupabaseConfig();

  if (!config.ready) {
    return null;
  }

  return createBrowserClient(config.url, config.anonKey);
}
