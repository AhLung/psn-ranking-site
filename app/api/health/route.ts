import { NextResponse } from "next/server";

import { env, hasSupabaseCredentials } from "@/lib/env";

export async function GET() {
  return NextResponse.json({
    ok: true,
    app: "psn-rank",
    dataSource: env.NEXT_PUBLIC_DATA_SOURCE,
    supabaseReady: hasSupabaseCredentials,
    timestamp: new Date().toISOString()
  });
}
