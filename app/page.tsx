import { CompareLaunchpad } from "@/components/home/compare-launchpad";
import { ComingSoonPanel } from "@/components/home/coming-soon-panel";
import { HeroSection } from "@/components/dashboard/hero-section";
import { TopThreePodium } from "@/components/dashboard/top-three-podium";
import { LeaderboardTable } from "@/components/leaderboard/leaderboard-table";
import { getDashboardData } from "@/lib/data/repository";

export const revalidate = 60;

export default async function HomePage() {
  const dashboard = await getDashboardData();

  return (
    <div className="space-y-10">
      <HeroSection metrics={dashboard.metrics} leader={dashboard.leaderboard[0]} />
      <TopThreePodium players={dashboard.leaderboard.slice(0, 3)} />
      <LeaderboardTable
        players={dashboard.leaderboard}
        title="Full competition board"
        description="A live view of the full season standings with weekly gains, trophy points, and completion efficiency."
      />
      <CompareLaunchpad
        highlights={dashboard.compareHighlights}
        spotlightGames={dashboard.spotlightGames}
      />
      <ComingSoonPanel items={dashboard.upcoming} />
    </div>
  );
}
