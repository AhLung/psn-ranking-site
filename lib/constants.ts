export const siteNavigation = [
  { href: "/", label: "Dashboard" },
  { href: "/players", label: "Players" },
  { href: "/compare/players", label: "Compare Players" },
  { href: "/compare/games", label: "Compare Games" }
] as const;

export const compareCallouts = [
  {
    title: "Players Head-to-Head",
    description:
      "Track platinum totals, completion rates, momentum, and overall positioning for your core rivalry group.",
    href: "/compare/players",
    tag: "Direct rivalry"
  },
  {
    title: "Games Pressure Map",
    description:
      "See which shared games are deciding the season, who owns the highest completion, and where platinum breakthroughs are likely.",
    href: "/compare/games",
    tag: "Shared backlog"
  }
] as const;

export const upcomingFeatures = [
  {
    title: "Historical Snapshots",
    description:
      "Weekly snapshot history, position changes, and momentum charts are planned as the next product milestone.",
    eta: "Phase 2"
  },
  {
    title: "Automated PSN Sync",
    description:
      "The sync routes and service layer are scaffolded so you can wire in Supabase storage and scheduled ingestion later.",
    eta: "Phase 2"
  },
  {
    title: "Game-Level Trend Views",
    description:
      "Shared game race breakdowns will expand into release cohorts, rarity bands, and progress deltas per player.",
    eta: "Phase 3"
  }
] as const;
