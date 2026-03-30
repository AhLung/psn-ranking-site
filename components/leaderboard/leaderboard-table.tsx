import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatNumber, formatPercent, getInitials } from "@/lib/utils";
import type { LeaderboardEntry } from "@/types/domain";

type LeaderboardTableProps = {
  players: LeaderboardEntry[];
  title?: string;
  description?: string;
  compact?: boolean;
};

export function LeaderboardTable({
  players,
  title = "Leaderboard",
  description = "Track live standings, total platinum count, and overall completion efficiency.",
  compact = false
}: LeaderboardTableProps) {
  return (
    <Card className="rounded-[1.8rem]">
      <CardHeader className="flex flex-col gap-2 border-b border-white/8 pb-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-cyan-200/80">Leaderboard</p>
          <CardTitle className="mt-2 text-2xl uppercase tracking-[0.14em]">
            {title}
          </CardTitle>
        </div>
        <p className="max-w-xl text-sm leading-6 text-slate-400">{description}</p>
      </CardHeader>

      <CardContent className="space-y-4 p-4 md:p-6">
        <div className="hidden grid-cols-[88px_minmax(0,1.5fr)_180px_minmax(220px,1fr)] gap-4 px-3 text-xs uppercase tracking-[0.28em] text-slate-500 md:grid">
          <span>Rank</span>
          <span>Player</span>
          <span>Platinum</span>
          <span>Completion</span>
        </div>

        <div className="space-y-3">
          {players.map((player) => (
            <div
              key={player.id}
              className="grid gap-4 rounded-[1.4rem] border border-white/8 bg-white/[0.03] p-4 transition hover:border-cyan-300/30 hover:bg-white/[0.05] md:grid-cols-[88px_minmax(0,1.5fr)_180px_minmax(220px,1fr)] md:items-center"
            >
              <div className="flex items-center gap-3">
                <Badge
                  variant={
                    player.rank === 1
                      ? "gold"
                      : player.rank === 2
                        ? "silver"
                        : player.rank === 3
                          ? "bronze"
                          : "default"
                  }
                  className="min-w-[64px] justify-center"
                >
                  #{player.rank}
                </Badge>
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-2xl text-sm font-semibold text-slate-950 md:hidden"
                  style={{
                    background: `linear-gradient(135deg, ${player.avatarGradient[0]}, ${player.avatarGradient[1]})`
                  }}
                >
                  {getInitials(player.displayName)}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div
                  className="hidden h-12 w-12 items-center justify-center rounded-2xl text-sm font-semibold text-slate-950 md:flex"
                  style={{
                    background: `linear-gradient(135deg, ${player.avatarGradient[0]}, ${player.avatarGradient[1]})`
                  }}
                >
                  {getInitials(player.displayName)}
                </div>
                <div className="min-w-0">
                  <Link
                    href={`/player/${player.id}`}
                    className="block truncate text-lg font-semibold text-white hover:text-cyan-200"
                  >
                    {player.displayName}
                  </Link>
                  <p className="truncate text-sm text-slate-400">
                    {player.handle} · {player.favoriteGenres.join(" / ")}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500 md:hidden">
                  Platinum
                </p>
                <p className="text-2xl font-semibold text-white">
                  {formatNumber(player.platinum)}
                </p>
                <p className="text-sm text-slate-400">+{player.weeklyGain} this week</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="uppercase tracking-[0.28em] text-slate-500 md:hidden">
                    Completion
                  </span>
                  <span className="font-semibold text-white">
                    {formatPercent(player.completion)}
                  </span>
                </div>
                <Progress value={player.completion} />
                {!compact ? (
                  <p className="text-sm text-slate-400">
                    {formatNumber(player.trophyPoints)} points · {player.gamesCompleted} completed games
                  </p>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
