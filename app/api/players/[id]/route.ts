import { NextResponse } from "next/server";

import { getPlayerDetail } from "@/lib/data/repository";

type RouteProps = {
  params: {
    id: string;
  };
};

export async function GET(_: Request, { params }: RouteProps) {
  const player = await getPlayerDetail(params.id);

  if (!player) {
    return NextResponse.json(
      {
        ok: false,
        error: "Player not found"
      },
      {
        status: 404
      }
    );
  }

  return NextResponse.json({ ok: true, player });
}
