import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatPercent } from "@/lib/utils";
import type { GameComparisonRow } from "@/types/domain";

type GameComparisonGridProps = {
  rows: GameComparisonRow[];
};

export function GameComparisonGrid({ rows }: GameComparisonGridProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {rows.map((row) => (
        <Card key={row.id} className="rounded-[1.7rem] overflow-hidden">
          <div
            className="h-2 w-full"
            style={{
              background: `linear-gradient(90deg, ${row.coverGradient[0]}, ${row.coverGradient[1]})`
            }}
          />
          <CardContent className="grid gap-5 p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-xl font-semibold text-white">{row.title}</h3>
                  <Badge variant="cyan">{row.platform}</Badge>
                  <Badge>{row.genre}</Badge>
                </div>
                <p className="mt-2 text-sm text-slate-400">
                  {row.platinumHolders} platinum holders · {row.totalPlayers} tracked players
                </p>
              </div>
              <Badge variant={row.rarity === "Ultra Rare" ? "gold" : "default"}>
                {row.rarity}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Stat label="Average completion" value={formatPercent(row.averageCompletion)} />
              <Stat label="Current leader" value={row.leader.displayName} />
            </div>

            <div className="space-y-3">
              {row.playerCompletions.map((player) => (
                <div key={player.playerId} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-300">{player.playerName}</span>
                    <span className="font-semibold text-white">
                      {formatPercent(player.completion)}
                    </span>
                  </div>
                  <Progress value={player.completion} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/5 p-4">
      <p className="text-xs uppercase tracking-[0.28em] text-slate-500">{label}</p>
      <p className="mt-3 text-lg font-semibold text-white">{value}</p>
    </div>
  );
}
