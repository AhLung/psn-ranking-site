import type { ReactNode } from "react";
import { Trophy, Users } from "lucide-react";

import { PlayerCard } from "@/components/players/player-card";
import { Card, CardContent } from "@/components/ui/card";
import { getPlayersDirectory } from "@/lib/data/repository";
import { formatNumber } from "@/lib/utils";

export const metadata = {
  title: "Players"
};

export default async function PlayersPage() {
  const players = await getPlayersDirectory();

  return (
    <div className="space-y-8">
      <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="rounded-[1.9rem]">
          <CardContent className="space-y-4 p-8">
            <p className="text-xs uppercase tracking-[0.32em] text-cyan-200/80">Players</p>
            <h1 className="text-4xl font-semibold uppercase tracking-[0.12em] text-white md:text-5xl">
              Player directory
            </h1>
            <p className="max-w-3xl text-base leading-7 text-slate-300">
              Every tracked player has a profile-ready summary with rank, platinum totals, completion rate, and strongest shared game progress.
            </p>
          </CardContent>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <StatCard label="Tracked players" value={`${players.length}`} icon={<Users className="h-5 w-5" />} />
          <StatCard
            label="Total platinum"
            value={formatNumber(players.reduce((sum, player) => sum + player.platinum, 0))}
            icon={<Trophy className="h-5 w-5" />}
          />
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {players.map((player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </section>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon
}: {
  label: string;
  value: string;
  icon: ReactNode;
}) {
  return (
    <Card className="rounded-[1.6rem]">
      <CardContent className="flex items-center justify-between p-6">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-slate-500">{label}</p>
          <p className="mt-3 text-2xl font-semibold text-white">{value}</p>
        </div>
        <div className="rounded-2xl border border-cyan-300/15 bg-cyan-300/10 p-3 text-cyan-200">
          {icon}
        </div>
      </CardContent>
    </Card>
  );
}
