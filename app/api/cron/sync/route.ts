import { NextResponse } from "next/server";

import { isAuthorizedSyncRequest, runPsnSync } from "@/lib/sync/psn-sync";

export async function GET(request: Request) {
  if (!isAuthorizedSyncRequest(request.headers.get("authorization"))) {
    return NextResponse.json(
      {
        ok: false,
        error: "Unauthorized cron invocation"
      },
      {
        status: 401
      }
    );
  }

  const result = await runPsnSync("cron");

  return NextResponse.json({
    ok: result.status !== "not_configured",
    result
  });
}
