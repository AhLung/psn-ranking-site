import { NextResponse } from "next/server";

import { getPlayersDirectory } from "@/lib/data/repository";

export async function GET() {
  const players = await getPlayersDirectory();
  return NextResponse.json({ ok: true, players });
}
