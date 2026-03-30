import { env, hasSupabaseCredentials } from "@/lib/env";
import type { SyncRunResult } from "@/types/domain";

export function isAuthorizedSyncRequest(authorizationHeader: string | null) {
  if (!env.CRON_SECRET) {
    return false;
  }

  return authorizationHeader === `Bearer ${env.CRON_SECRET}`;
}

export async function runPsnSync(source: "manual" | "cron"): Promise<SyncRunResult> {
  const timestamp = new Date().toISOString();

  if (!env.PSN_SYNC_ENABLED) {
    return {
      source,
      status: "skipped",
      target: env.PSN_SYNC_PROVIDER,
      message:
        "PSN sync is scaffolded but disabled. Set PSN_SYNC_ENABLED=true when a real provider is connected.",
      timestamp,
      nextStep:
        "Implement provider logic in lib/sync/psn-sync.ts and persist results through Supabase or another storage adapter."
    };
  }

  if (!hasSupabaseCredentials && env.PSN_SYNC_PROVIDER === "supabase") {
    return {
      source,
      status: "not_configured",
      target: env.PSN_SYNC_PROVIDER,
      message:
        "Supabase sync was selected, but the required Supabase environment variables are missing.",
      timestamp,
      nextStep:
        "Configure NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, and SUPABASE_SERVICE_ROLE_KEY."
    };
  }

  return {
    source,
    status: "queued",
    target: env.PSN_SYNC_PROVIDER,
    message:
      "Sync routing is ready. Replace the mock response with a real PSN ingestion job or queue trigger when credentials are available.",
    timestamp,
    nextStep:
      "Connect a provider, fetch trophy data, normalize snapshots, and write the results into Supabase tables."
  };
}
