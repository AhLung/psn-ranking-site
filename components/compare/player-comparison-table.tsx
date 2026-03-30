import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatNumber, formatPercent } from "@/lib/utils";
import type { PlayerComparisonRow } from "@/types/domain";

type PlayerComparisonTableProps = {
  rows: PlayerComparisonRow[];
};

export function PlayerComparisonTable({ rows }: PlayerComparisonTableProps) {
  return (
    <Card className="rounded-[1.8rem]">
      <CardHeader className="border-b border-white/8 pb-5">
        <p className="text-xs uppercase tracking-[0.32em] text-cyan-200/80">
          Compare players
        </p>
        <CardTitle className="mt-2 text-2xl uppercase tracking-[0.14em]">
          Head-to-head matrix
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 p-4 md:p-6">
        {rows.map((row) => (
          <div
            key={row.id}
            className="grid gap-4 rounded-[1.4rem] border border-white/8 bg-white/[0.03] p-4 md:grid-cols-[1.2fr_repeat(5,minmax(0,1fr))]"
          >
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-semibold text-white">{row.displayName}</h3>
                <Badge
                  variant={
                    row.rank === 1 ? "gold" : row.rank === 2 ? "silver" : row.rank === 3 ? "bronze" : "default"
                  }
                >
                  #{row.rank}
                </Badge>
              </div>
              <p className="text-sm text-slate-400">{row.handle}</p>
              <p className="text-sm text-cyan-200">{row.momentumLabel}</p>
            </div>

            <Metric label="Platinum" value={formatNumber(row.platinum)} />
            <Metric label="Completion" value={formatPercent(row.completion)} />
            <Metric label="Points" value={formatNumber(row.trophyPoints)} />
            <Metric label="Games" value={formatNumber(row.gamesCompleted)} />
            <Metric label="Weekly gain" value={`+${row.weeklyGain}`} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/8 bg-slate-950/70 p-4">
      <p className="text-xs uppercase tracking-[0.28em] text-slate-500">{label}</p>
      <p className="mt-3 text-xl font-semibold text-white">{value}</p>
    </div>
  );
}
