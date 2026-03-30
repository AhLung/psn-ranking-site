import { notFound } from "next/navigation";

import { PlayerHero } from "@/components/players/player-hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { getPlayerDetail, getPlayerIds } from "@/lib/data/repository";
import { formatNumber, formatPercent, formatShortDate } from "@/lib/utils";

type PlayerPageProps = {
  params: {
    id: string;
  };
};

export async function generateStaticParams() {
  const ids = await getPlayerIds();
  return ids.map((id) => ({ id }));
}

export async function generateMetadata({ params }: PlayerPageProps) {
  const detail = await getPlayerDetail(params.id);

  if (!detail) {
    return {
      title: "Player not found"
    };
  }

  return {
    title: detail.player.displayName
  };
}

export default async function PlayerPage({ params }: PlayerPageProps) {
  const detail = await getPlayerDetail(params.id);

  if (!detail) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <PlayerHero detail={detail} />

      <section className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
        <Card className="rounded-[1.8rem]">
          <CardHeader className="border-b border-white/8 pb-5">
            <p className="text-xs uppercase tracking-[0.32em] text-cyan-200/80">Snapshot history</p>
            <CardTitle className="mt-2 text-2xl uppercase tracking-[0.14em]">
              Recent trend
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-6">
            {detail.player.snapshots.map((snapshot) => (
              <div key={snapshot.date} className="space-y-3 rounded-[1.4rem] border border-white/8 bg-white/[0.03] p-4">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-white">{formatShortDate(snapshot.date)}</p>
                  <p className="text-sm text-slate-400">{formatNumber(snapshot.trophyPoints)} pts</p>
                </div>
                <div className="grid gap-3 md:grid-cols-3">
                  <SnapshotStat label="Platinum" value={formatNumber(snapshot.platinum)} />
                  <SnapshotStat label="Completion" value={formatPercent(snapshot.completion)} />
                  <SnapshotStat label="Games completed" value={formatNumber(snapshot.gamesCompleted)} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-[1.8rem]">
          <CardHeader className="border-b border-white/8 pb-5">
            <p className="text-xs uppercase tracking-[0.32em] text-cyan-200/80">Recent milestones</p>
            <CardTitle className="mt-2 text-2xl uppercase tracking-[0.14em]">
              Momentum log
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-6">
            {detail.player.milestones.map((milestone, index) => (
              <div key={`${milestone.title}-${milestone.date}`} className="space-y-3">
                <div className="rounded-[1.4rem] border border-white/8 bg-white/[0.03] p-4">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-semibold text-white">{milestone.title}</h3>
                    <span className="text-sm text-slate-400">{formatShortDate(milestone.date)}</span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{milestone.detail}</p>
                </div>
                {index < detail.player.milestones.length - 1 ? <Separator /> : null}
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
        <Card className="rounded-[1.8rem]">
          <CardHeader className="border-b border-white/8 pb-5">
            <p className="text-xs uppercase tracking-[0.32em] text-cyan-200/80">Tracked games</p>
            <CardTitle className="mt-2 text-2xl uppercase tracking-[0.14em]">
              Featured games
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 p-6 md:grid-cols-2">
            {detail.featuredGames.map((item) => (
              <div
                key={item.game.id}
                className="rounded-[1.4rem] border border-white/8 bg-white/[0.03] p-5"
              >
                <div
                  className="mb-4 h-2 w-full rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${item.game.coverGradient[0]}, ${item.game.coverGradient[1]})`
                  }}
                />
                <h3 className="text-lg font-semibold text-white">{item.game.title}</h3>
                <p className="mt-1 text-sm text-slate-400">
                  {item.game.genre} · {item.game.platform}
                </p>
                <div className="mt-5 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Completion</span>
                    <span className="font-semibold text-white">
                      {formatPercent(item.completion)}
                    </span>
                  </div>
                  <Progress value={item.completion} />
                  <p className="text-sm text-slate-400">
                    {item.platinumUnlocked ? "Platinum secured" : "Platinum in progress"} · {item.trophiesEarned}/{item.game.trophyCount} trophies
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-[1.8rem]">
          <CardHeader className="border-b border-white/8 pb-5">
            <p className="text-xs uppercase tracking-[0.32em] text-cyan-200/80">Closest rivals</p>
            <CardTitle className="mt-2 text-2xl uppercase tracking-[0.14em]">
              Pressure zone
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-6">
            {detail.rivals.map((rival) => (
              <div
                key={rival.id}
                className="rounded-[1.4rem] border border-white/8 bg-white/[0.03] p-4"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-white">{rival.displayName}</p>
                    <p className="text-sm text-slate-400">{rival.handle}</p>
                  </div>
                  <span className="text-sm font-semibold text-cyan-200">#{rival.rank}</span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <SnapshotStat label="Platinum" value={formatNumber(rival.platinum)} />
                  <SnapshotStat label="Completion" value={formatPercent(rival.completion)} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function SnapshotStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/8 bg-slate-950/70 p-4">
      <p className="text-xs uppercase tracking-[0.28em] text-slate-500">{label}</p>
      <p className="mt-3 text-lg font-semibold text-white">{value}</p>
    </div>
  );
}
