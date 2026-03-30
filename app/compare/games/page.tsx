import { GameComparisonGrid } from "@/components/compare/game-comparison-grid";
import { Card, CardContent } from "@/components/ui/card";
import { getGameComparisons } from "@/lib/data/repository";

export const metadata = {
  title: "Compare Games"
};

export default async function CompareGamesPage() {
  const rows = await getGameComparisons();

  return (
    <div className="space-y-8">
      <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="rounded-[1.9rem]">
          <CardContent className="space-y-4 p-8">
            <p className="text-xs uppercase tracking-[0.32em] text-cyan-200/80">Compare games</p>
            <h1 className="text-4xl font-semibold uppercase tracking-[0.12em] text-white md:text-5xl">
              Shared game pressure map
            </h1>
            <p className="max-w-3xl text-base leading-7 text-slate-300">
              Focus on the shared backlog. Each card shows average completion, platinum holders, and the player currently dictating progress in that game.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-[1.9rem]">
          <CardContent className="grid h-full gap-4 p-8 text-sm leading-6 text-slate-300">
            <p>
              This page is scaffolded for deeper analytics later: rarity clusters, completion deltas over time, and game-specific rivalry snapshots.
            </p>
            <p className="rounded-[1.5rem] border border-white/8 bg-white/[0.03] p-4 text-slate-400">
              For now, the grid is powered by the same mock repository as the dashboard and API routes.
            </p>
          </CardContent>
        </Card>
      </section>

      <GameComparisonGrid rows={rows} />
    </div>
  );
}
