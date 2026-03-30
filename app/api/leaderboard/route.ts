import { NextResponse } from "next/server";

import { getLeaderboard } from "@/lib/data/repository";

export async function GET() {
  const leaderboard = await getLeaderboard();

  return NextResponse.json({
    ok: true,
    leaderboard,
    updatedAt: new Date().toISOString()
  });
}
