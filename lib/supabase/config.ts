import { env, hasSupabaseCredentials } from "@/lib/env";

export function getSupabaseConfig() {
  return {
    url: env.NEXT_PUBLIC_SUPABASE_URL,
    anonKey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    serviceRoleKey: env.SUPABASE_SERVICE_ROLE_KEY,
    ready: hasSupabaseCredentials
  };
}
