import { NextResponse } from "next/server";

import { env } from "@/lib/env";
import { isAuthorizedSyncRequest, runPsnSync } from "@/lib/sync/psn-sync";

export async function GET() {
  return NextResponse.json({
    ok: true,
    endpoint: "/api/sync",
    syncEnabled: env.PSN_SYNC_ENABLED,
    provider: env.PSN_SYNC_PROVIDER,
    instructions:
      "POST to this route with Authorization: Bearer <CRON_SECRET> once a real sync provider is ready."
  });
}

export async function POST(request: Request) {
  if (env.CRON_SECRET && !isAuthorizedSyncRequest(request.headers.get("authorization"))) {
    return NextResponse.json(
      {
        ok: false,
        error: "Unauthorized"
      },
      {
        status: 401
      }
    );
  }

  const result = await runPsnSync("manual");

  return NextResponse.json({
    ok: result.status !== "not_configured",
    result
  });
}
