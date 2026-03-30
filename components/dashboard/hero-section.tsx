import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, Radar, Trophy, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatNumber, formatPercent } from "@/lib/utils";
import type { DashboardData, LeaderboardEntry } from "@/types/domain";

type HeroSectionProps = {
  metrics: DashboardData["metrics"];
  leader: LeaderboardEntry;
};

export function HeroSection({ metrics, leader }: HeroSectionProps) {
  return (
    <section className="grid gap-4 lg:grid-cols-[1.3fr_0.9fr]">
      <Card className="overflow-hidden rounded-[2rem] border-cyan-400/15 bg-gradient-to-br from-slate-950 via-slate-950 to-cyan-950/40">
        <CardContent className="grid gap-8 p-8 md:p-10">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/80">
              Live trophy competition
            </p>
            <h1 className="max-w-3xl text-balance text-4xl font-semibold uppercase tracking-[0.12em] text-white md:text-6xl">
              A proper PSN platinum race dashboard, not a one-page mock.
            </h1>
            <p className="max-w-2xl text-balance text-base leading-7 text-slate-300 md:text-lg">
              Track the leaderboard, inspect player detail pages, compare rivals, and prepare for future historical snapshots with a product-ready front-end architecture.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/players">
                Browse Players
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/compare/players">Open Rivalry Comparison</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
        <MetricCard
          icon={<Users className="h-4 w-4" />}
          label="Tracked players"
          value={`${metrics.totalPlayers}`}
          hint={`Across ${metrics.totalTrackedGames} shared games`}
        />
        <MetricCard
          icon={<Trophy className="h-4 w-4" />}
          label="Total platinum count"
          value={formatNumber(metrics.totalPlatinum)}
          hint={`Leader gap: ${metrics.leaderGap} platinum`}
        />
        <MetricCard
          icon={<Radar className="h-4 w-4" />}
          label="Current leader"
          value={leader.displayName}
          hint={`${formatPercent(metrics.averageCompletion)} avg completion`}
        />
      </div>
    </section>
  );
}

type MetricCardProps = {
  icon: ReactNode;
  label: string;
  value: string;
  hint: string;
};

function MetricCard({ icon, label, value, hint }: MetricCardProps) {
  return (
    <Card className="rounded-[1.6rem]">
      <CardContent className="grid gap-6 p-6">
        <div className="flex items-center justify-between text-sm text-cyan-200">
          <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 p-2">
            {icon}
          </span>
          <span className="uppercase tracking-[0.28em] text-slate-500">{label}</span>
        </div>
        <div>
          <p className="text-2xl font-semibold text-white">{value}</p>
          <p className="mt-2 text-sm text-slate-400">{hint}</p>
        </div>
      </CardContent>
    </Card>
  );
}
