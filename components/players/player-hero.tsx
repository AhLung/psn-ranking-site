import { Activity, MapPin, Trophy } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatNumber, formatPercent, getInitials } from "@/lib/utils";
import type { PlayerDetailModel } from "@/types/domain";

type PlayerHeroProps = {
  detail: PlayerDetailModel;
};

export function PlayerHero({ detail }: PlayerHeroProps) {
  const { leaderboardEntry, player } = detail;

  return (
    <section className="grid gap-4 lg:grid-cols-[1.3fr_0.9fr]">
      <Card className="overflow-hidden rounded-[2rem] border-white/10 bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900">
        <CardContent className="grid gap-8 p-8 md:p-10">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="flex items-center gap-5">
              <div
                className="flex h-20 w-20 items-center justify-center rounded-[1.8rem] text-2xl font-semibold text-slate-950"
                style={{
                  background: `linear-gradient(135deg, ${player.avatarGradient[0]}, ${player.avatarGradient[1]})`
                }}
              >
                {getInitials(player.displayName)}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <Badge
                    variant={
                      leaderboardEntry.rank === 1
                        ? "gold"
                        : leaderboardEntry.rank === 2
                          ? "silver"
                          : leaderboardEntry.rank === 3
                            ? "bronze"
                            : "default"
                    }
                  >
                    Rank #{leaderboardEntry.rank}
                  </Badge>
                  <Badge variant="cyan">{player.psnId}</Badge>
                </div>
                <h1 className="mt-4 text-4xl font-semibold text-white md:text-5xl">
                  {player.displayName}
                </h1>
                <p className="mt-3 max-w-2xl text-balance text-base leading-7 text-slate-300">
                  {player.motto}
                </p>
              </div>
            </div>

            <div className="grid gap-2 text-sm text-slate-400">
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {player.region}
              </span>
              <span className="inline-flex items-center gap-2">
                <Activity className="h-4 w-4" />
                {player.favoriteGenres.join(" · ")}
              </span>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-4">
            <Stat label="Platinum" value={formatNumber(player.stats.platinum)} />
            <Stat label="Completion" value={formatPercent(player.stats.completion)} />
            <Stat label="Trophy points" value={formatNumber(player.stats.trophyPoints)} />
            <Stat label="Completed games" value={formatNumber(player.stats.gamesCompleted)} />
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-[2rem]">
        <CardContent className="grid h-full gap-6 p-8">
          <div className="flex items-center justify-between">
            <Badge variant="cyan">Trophy mix</Badge>
            <Trophy className="h-5 w-5 text-cyan-200" />
          </div>

          <div className="space-y-4">
            <MixRow label="Platinum" value={player.trophyMix.platinum} accent="bg-amber-300" />
            <MixRow label="Gold" value={player.trophyMix.gold} accent="bg-yellow-300" />
            <MixRow label="Silver" value={player.trophyMix.silver} accent="bg-slate-300" />
            <MixRow label="Bronze" value={player.trophyMix.bronze} accent="bg-orange-400" />
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/5 p-4">
      <p className="text-xs uppercase tracking-[0.28em] text-slate-500">{label}</p>
      <p className="mt-3 text-2xl font-semibold text-white">{value}</p>
    </div>
  );
}

function MixRow({
  label,
  value,
  accent
}: {
  label: string;
  value: number;
  accent: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/5 px-4 py-3">
      <div className="flex items-center gap-3">
        <span className={`h-3 w-3 rounded-full ${accent}`} />
        <span className="text-sm text-slate-300">{label}</span>
      </div>
      <span className="font-semibold text-white">{formatNumber(value)}</span>
    </div>
  );
}
