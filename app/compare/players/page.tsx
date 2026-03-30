import { Card, CardContent } from "@/components/ui/card";
import { PlayerComparisonTable } from "@/components/compare/player-comparison-table";
import { getPlayerComparisonRows } from "@/lib/data/repository";
import { formatNumber } from "@/lib/utils";

export const metadata = {
  title: "Compare Players"
};

export default async function ComparePlayersPage() {
  const rows = await getPlayerComparisonRows();
  const closestRace =
    rows.length > 1 ? Math.abs(rows[0].platinum - rows[1].platinum) : rows[0]?.platinum ?? 0;

  return (
    <div className="space-y-8">
      <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="rounded-[1.9rem]">
          <CardContent className="space-y-4 p-8">
            <p className="text-xs uppercase tracking-[0.32em] text-cyan-200/80">
              Compare players
            </p>
            <h1 className="text-4xl font-semibold uppercase tracking-[0.12em] text-white md:text-5xl">
              Rivalry comparison
            </h1>
            <p className="max-w-3xl text-base leading-7 text-slate-300">
              Compare the field on platinum count, completion, trophy points, and weekly momentum to see who is actually controlling the season.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-[1.9rem]">
          <CardContent className="grid h-full gap-5 p-8">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Closest race</p>
              <p className="mt-3 text-4xl font-semibold text-white">{formatNumber(closestRace)}</p>
              <p className="mt-2 text-sm text-slate-400">Platinum gap between first and second place.</p>
            </div>
            <div className="rounded-[1.5rem] border border-white/8 bg-white/[0.03] p-4 text-sm leading-6 text-slate-300">
              Weekly gain and games-completed volume make it easier to spot who is just holding position versus who is building real pressure.
            </div>
          </CardContent>
        </Card>
      </section>

      <PlayerComparisonTable rows={rows} />
    </div>
  );
}
