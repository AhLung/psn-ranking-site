export type GradientPair = [string, string];

export type TrophyMix = {
  platinum: number;
  gold: number;
  silver: number;
  bronze: number;
};

export type PlayerSnapshot = {
  date: string;
  platinum: number;
  completion: number;
  trophyPoints: number;
  gamesCompleted: number;
};

export type PlayerGameProgress = {
  gameId: string;
  completion: number;
  platinumUnlocked: boolean;
  trophiesEarned: number;
  lastPlayedAt: string;
};

export type RecentMilestone = {
  title: string;
  detail: string;
  date: string;
};

export type Player = {
  id: string;
  psnId: string;
  displayName: string;
  handle: string;
  motto: string;
  region: string;
  joinedAt: string;
  accent: string;
  avatarGradient: GradientPair;
  favoriteGenres: string[];
  trophyMix: TrophyMix;
  stats: {
    platinum: number;
    completion: number;
    trophyPoints: number;
    gamesCompleted: number;
    weeklyTarget: number;
  };
  snapshots: PlayerSnapshot[];
  gameProgress: PlayerGameProgress[];
  milestones: RecentMilestone[];
  featuredGameIds: string[];
};

export type Game = {
  id: string;
  title: string;
  platform: string;
  genre: string;
  rarity: "Common" | "Rare" | "Ultra Rare";
  releaseYear: number;
  trophyCount: number;
  coverGradient: GradientPair;
};

export type LeaderboardEntry = {
  rank: number;
  id: string;
  displayName: string;
  handle: string;
  motto: string;
  platinum: number;
  completion: number;
  trophyPoints: number;
  gamesCompleted: number;
  weeklyGain: number;
  avatarGradient: GradientPair;
  favoriteGenres: string[];
  accent: string;
};

export type PlayerCardModel = LeaderboardEntry & {
  topGameTitle: string;
  topGameCompletion: number;
  latestSnapshot: string;
};

export type FeaturedGameComparison = {
  id: string;
  title: string;
  genre: string;
  platform: string;
  averageCompletion: number;
  platinumHolders: number;
  totalPlayers: number;
  rarity: Game["rarity"];
  leader: {
    playerId: string;
    displayName: string;
    completion: number;
  };
  coverGradient: GradientPair;
};

export type GameComparisonRow = FeaturedGameComparison & {
  playerCompletions: Array<{
    playerId: string;
    playerName: string;
    completion: number;
    platinumUnlocked: boolean;
    lastPlayedAt: string;
  }>;
};

export type PlayerDetailModel = {
  rank: number;
  player: Player;
  leaderboardEntry: LeaderboardEntry;
  featuredGames: Array<{
    game: Game;
    completion: number;
    platinumUnlocked: boolean;
    trophiesEarned: number;
    lastPlayedAt: string;
  }>;
  rivals: LeaderboardEntry[];
};

export type PlayerComparisonRow = {
  id: string;
  displayName: string;
  handle: string;
  rank: number;
  platinum: number;
  completion: number;
  trophyPoints: number;
  gamesCompleted: number;
  weeklyGain: number;
  winsAgainstField: number;
  momentumLabel: string;
};

export type DashboardData = {
  leaderboard: LeaderboardEntry[];
  metrics: {
    totalPlayers: number;
    totalTrackedGames: number;
    totalPlatinum: number;
    averageCompletion: number;
    leaderGap: number;
  };
  spotlightGames: FeaturedGameComparison[];
  compareHighlights: Array<{
    title: string;
    description: string;
    href: string;
    tag: string;
  }>;
  upcoming: Array<{
    title: string;
    description: string;
    eta: string;
  }>;
};

export type SyncRunResult = {
  source: "manual" | "cron";
  status: "queued" | "skipped" | "not_configured";
  target: string;
  message: string;
  timestamp: string;
  nextStep: string;
};
