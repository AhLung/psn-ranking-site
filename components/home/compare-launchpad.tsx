import type { Route } from "next";
import Link from "next/link";
import { ArrowRight, Swords } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatPercent } from "@/lib/utils";
import type { DashboardData } from "@/types/domain";

type CompareLaunchpadProps = {
  highlights: DashboardData["compareHighlights"];
  spotlightGames: DashboardData["spotlightGames"];
};

export function CompareLaunchpad({
  highlights,
  spotlightGames
}: CompareLaunchpadProps) {
  return (
    <section className="grid gap-4 lg:grid-cols-[1fr_1fr]">
      {highlights.map((highlight, index) => (
        <Card key={highlight.href} className="rounded-[1.8rem]">
          <CardContent className="grid gap-6 p-8">
            <div className="flex items-center justify-between">
              <Badge variant={index === 0 ? "cyan" : "default"}>{highlight.tag}</Badge>
              <Swords className="h-5 w-5 text-cyan-200" />
            </div>
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold text-white">{highlight.title}</h2>
              <p className="text-base leading-7 text-slate-300">{highlight.description}</p>
            </div>
            <Button asChild variant="secondary">
              <Link href={highlight.href as Route}>
                Explore
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      ))}

      <Card className="rounded-[1.8rem] lg:col-span-2">
        <CardContent className="grid gap-6 p-8">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.32em] text-cyan-200/80">
              Shared games in focus
            </p>
            <h2 className="text-2xl font-semibold uppercase tracking-[0.14em] text-white">
              What is deciding the season
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {spotlightGames.map((game) => (
              <div
                key={game.id}
                className="rounded-[1.6rem] border border-white/8 bg-white/[0.03] p-5"
              >
                <div
                  className="mb-4 h-2 w-full rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${game.coverGradient[0]}, ${game.coverGradient[1]})`
                  }}
                />
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-white">{game.title}</h3>
                  <p className="text-sm text-slate-400">
                    {game.genre} · {game.platform}
                  </p>
                </div>
                <div className="mt-5 space-y-2 text-sm">
                  <p className="text-slate-300">
                    Average completion:{" "}
                    <span className="font-semibold text-white">
                      {formatPercent(game.averageCompletion)}
                    </span>
                  </p>
                  <p className="text-slate-300">
                    Current leader:{" "}
                    <span className="font-semibold text-white">{game.leader.displayName}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
