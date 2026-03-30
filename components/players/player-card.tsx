import Link from "next/link";
import { ArrowUpRight, CalendarClock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatNumber, formatPercent, formatShortDate, getInitials } from "@/lib/utils";
import type { PlayerCardModel } from "@/types/domain";

type PlayerCardProps = {
  player: PlayerCardModel;
};

export function PlayerCard({ player }: PlayerCardProps) {
  return (
    <Card className="rounded-[1.7rem]">
      <CardContent className="grid gap-5 p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div
              className="flex h-14 w-14 items-center justify-center rounded-2xl text-lg font-semibold text-slate-950"
              style={{
                background: `linear-gradient(135deg, ${player.avatarGradient[0]}, ${player.avatarGradient[1]})`
              }}
            >
              {getInitials(player.displayName)}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-xl font-semibold text-white">{player.displayName}</h3>
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
                >
                  Rank #{player.rank}
                </Badge>
              </div>
              <p className="text-sm text-slate-400">{player.handle}</p>
            </div>
          </div>

          <Link
            href={`/player/${player.id}`}
            className="rounded-full border border-white/10 p-2 text-slate-300 transition hover:border-cyan-300/40 hover:text-cyan-200"
          >
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-white/8 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Platinum</p>
            <p className="mt-3 text-2xl font-semibold text-white">{formatNumber(player.platinum)}</p>
          </div>
          <div className="rounded-2xl border border-white/8 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Completion</p>
            <p className="mt-3 text-2xl font-semibold text-white">
              {formatPercent(player.completion)}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Best tracked game</span>
            <span className="font-semibold text-white">
              {formatPercent(player.topGameCompletion)}
            </span>
          </div>
          <Progress value={player.topGameCompletion} />
          <p className="text-sm text-slate-400">{player.topGameTitle}</p>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-400">
          <CalendarClock className="h-4 w-4" />
          Last snapshot: {formatShortDate(player.latestSnapshot)}
        </div>
      </CardContent>
    </Card>
  );
}
