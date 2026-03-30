import Link from "next/link";
import { Crown, Medal, Trophy } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatNumber, formatPercent, getInitials } from "@/lib/utils";
import type { LeaderboardEntry } from "@/types/domain";

const podiumVariants = {
  1: {
    badge: "gold" as const,
    label: "Champion",
    icon: <Crown className="h-4 w-4" />,
    className:
      "border-amber-300/20 bg-gradient-to-br from-amber-400/10 via-slate-950 to-slate-950 lg:-translate-y-6"
  },
  2: {
    badge: "silver" as const,
    label: "Runner Up",
    icon: <Medal className="h-4 w-4" />,
    className:
      "border-slate-200/15 bg-gradient-to-br from-slate-300/8 via-slate-950 to-slate-950"
  },
  3: {
    badge: "bronze" as const,
    label: "Third Place",
    icon: <Trophy className="h-4 w-4" />,
    className:
      "border-orange-300/15 bg-gradient-to-br from-orange-400/8 via-slate-950 to-slate-950"
  }
};

type TopThreePodiumProps = {
  players: LeaderboardEntry[];
};

export function TopThreePodium({ players }: TopThreePodiumProps) {
  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-cyan-200/80">Top 3 showcase</p>
          <h2 className="text-2xl font-semibold uppercase tracking-[0.14em] text-white">
            Podium spotlight
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-slate-400">
          Gold, silver, and bronze each get their own visual hierarchy so the race feels like a live competition dashboard.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {players.map((player) => {
          const variant = podiumVariants[player.rank as 1 | 2 | 3];

          return (
            <Card key={player.id} className={`rounded-[1.8rem] ${variant.className}`}>
              <CardContent className="grid h-full gap-6 p-6">
                <div className="flex items-start justify-between gap-4">
                  <Badge variant={variant.badge} className="gap-2">
                    {variant.icon}
                    {variant.label}
                  </Badge>
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-2xl text-lg font-semibold text-slate-950"
                    style={{
                      background: `linear-gradient(135deg, ${player.avatarGradient[0]}, ${player.avatarGradient[1]})`
                    }}
                  >
                    {getInitials(player.displayName)}
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-5xl font-semibold tracking-tight text-white">#{player.rank}</p>
                  <div>
                    <h3 className="text-2xl font-semibold text-white">{player.displayName}</h3>
                    <p className="mt-2 text-sm text-slate-400">{player.motto}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-white/8 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Platinum</p>
                    <p className="mt-3 text-2xl font-semibold text-white">
                      {formatNumber(player.platinum)}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/8 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Completion</p>
                    <p className="mt-3 text-2xl font-semibold text-white">
                      {formatPercent(player.completion)}
                    </p>
                  </div>
                </div>

                <Link
                  href={`/player/${player.id}`}
                  className="text-sm font-semibold text-cyan-200 transition hover:text-cyan-100"
                >
                  Open player profile
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
