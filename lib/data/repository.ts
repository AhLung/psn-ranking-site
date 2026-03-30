import { compareCallouts, upcomingFeatures } from "@/lib/constants";
import { getDataBundle } from "@/lib/data/sync-file";
import type {
  DashboardData,
  FeaturedGameComparison,
  Game,
  GameComparisonRow,
  LeaderboardEntry,
  Player,
  PlayerCardModel,
  PlayerComparisonRow,
  PlayerDetailModel
} from "@/types/domain";

function getWeeklyGain(player: Player) {
  const [previous, current] = player.snapshots.slice(-2);
  return current && previous ? current.platinum - previous.platinum : 0;
}

function sortPlayers(list: Player[]) {
  return [...list].sort((left, right) => {
    if (right.stats.platinum !== left.stats.platinum) {
      return right.stats.platinum - left.stats.platinum;
    }

    if (right.stats.completion !== left.stats.completion) {
      return right.stats.completion - left.stats.completion;
    }

    return right.stats.trophyPoints - left.stats.trophyPoints;
  });
}

function buildLeaderboardEntry(player: Player, rank: number): LeaderboardEntry {
  return {
    rank,
    id: player.id,
    displayName: player.displayName,
    handle: player.handle,
    motto: player.motto,
    platinum: player.stats.platinum,
    completion: player.stats.completion,
    trophyPoints: player.stats.trophyPoints,
    gamesCompleted: player.stats.gamesCompleted,
    weeklyGain: getWeeklyGain(player),
    avatarGradient: player.avatarGradient,
    favoriteGenres: player.favoriteGenres,
    accent: player.accent
  };
}

export async function getLeaderboard() {
  const { players } = await getDataBundle();

  return sortPlayers(players).map((player, index) =>
    buildLeaderboardEntry(player, index + 1)
  );
}

export async function getPlayersDirectory(): Promise<PlayerCardModel[]> {
  const leaderboard = await getLeaderboard();
  const { players, games } = await getDataBundle();

  return leaderboard.map((entry) => {
    const player = players.find((candidate) => candidate.id === entry.id);
    const topProgress = [...(player?.gameProgress ?? [])].sort((left, right) => {
      if (right.completion !== left.completion) {
        return right.completion - left.completion;
      }

      return Number(right.platinumUnlocked) - Number(left.platinumUnlocked);
    })[0];

    return {
      ...entry,
      topGameTitle: topProgress
        ? games.find((game) => game.id === topProgress.gameId)?.title ?? "Unknown Game"
        : "No tracked games yet",
      topGameCompletion: topProgress?.completion ?? 0,
      latestSnapshot: player?.snapshots.at(-1)?.date ?? ""
    };
  });
}

export async function getPlayerIds() {
  const { players } = await getDataBundle();
  return players.map((player) => player.id);
}

export async function getPlayerDetail(id: string): Promise<PlayerDetailModel | null> {
  const leaderboard = await getLeaderboard();
  const { games, players } = await getDataBundle();
  const leaderboardEntry = leaderboard.find((entry) => entry.id === id);
  const player = players.find((candidate) => candidate.id === id);

  if (!leaderboardEntry || !player) {
    return null;
  }

  const featuredGames = player.featuredGameIds
    .map((gameId) => {
      const game = games.find((candidate) => candidate.id === gameId);
      const progress = player.gameProgress.find((candidate) => candidate.gameId === gameId);

      if (!game || !progress) {
        return null;
      }

      return {
        game,
        completion: progress.completion,
        platinumUnlocked: progress.platinumUnlocked,
        trophiesEarned: progress.trophiesEarned,
        lastPlayedAt: progress.lastPlayedAt
      };
    })
    .filter(Boolean) as PlayerDetailModel["featuredGames"];

  const rivals = leaderboard
    .filter((entry) => entry.id !== id)
    .sort(
      (left, right) =>
        Math.abs(left.rank - leaderboardEntry.rank) -
        Math.abs(right.rank - leaderboardEntry.rank)
    )
    .slice(0, 3);

  return {
    rank: leaderboardEntry.rank,
    player,
    leaderboardEntry,
    featuredGames,
    rivals
  };
}

export async function getPlayerComparisonRows(): Promise<PlayerComparisonRow[]> {
  const leaderboard = await getLeaderboard();

  return leaderboard.map((entry) => ({
    id: entry.id,
    displayName: entry.displayName,
    handle: entry.handle,
    rank: entry.rank,
    platinum: entry.platinum,
    completion: entry.completion,
    trophyPoints: entry.trophyPoints,
    gamesCompleted: entry.gamesCompleted,
    weeklyGain: entry.weeklyGain,
    winsAgainstField: leaderboard.length - entry.rank,
    momentumLabel:
      entry.weeklyGain >= 2 ? "Hot streak" : entry.weeklyGain === 1 ? "Steady climb" : "Holding line"
  }));
}

function buildGameComparisonRows(players: Player[], games: Game[]): GameComparisonRow[] {
  return games
    .map((game) => {
      const playerCompletions = players
        .map((player) => {
          const progress = player.gameProgress.find((candidate) => candidate.gameId === game.id);

          if (!progress) {
            return null;
          }

          return {
            playerId: player.id,
            playerName: player.displayName,
            completion: progress.completion,
            platinumUnlocked: progress.platinumUnlocked,
            lastPlayedAt: progress.lastPlayedAt
          };
        })
        .filter(Boolean) as GameComparisonRow["playerCompletions"];

      const totalCompletion = playerCompletions.reduce(
        (sum, progress) => sum + progress.completion,
        0
      );
      const averageCompletion =
        playerCompletions.length > 0 ? totalCompletion / playerCompletions.length : 0;
      const platinumHolders = playerCompletions.filter(
        (progress) => progress.platinumUnlocked
      ).length;
      const leader = [...playerCompletions].sort((left, right) => {
        if (right.completion !== left.completion) {
          return right.completion - left.completion;
        }

        return Number(right.platinumUnlocked) - Number(left.platinumUnlocked);
      })[0];

      return {
        id: game.id,
        title: game.title,
        genre: game.genre,
        platform: game.platform,
        averageCompletion,
        platinumHolders,
        totalPlayers: playerCompletions.length,
        rarity: game.rarity,
        leader: leader
          ? {
              playerId: leader.playerId,
              displayName: leader.playerName,
              completion: leader.completion
            }
          : {
              playerId: "",
              displayName: "No activity yet",
              completion: 0
            },
        coverGradient: game.coverGradient,
        playerCompletions
      };
    })
    .sort((left, right) => {
      if (right.platinumHolders !== left.platinumHolders) {
        return right.platinumHolders - left.platinumHolders;
      }

      return right.averageCompletion - left.averageCompletion;
    });
}

export async function getGameComparisons() {
  const { games, players } = await getDataBundle();
  return buildGameComparisonRows(players, games);
}

export async function getDashboardData(): Promise<DashboardData> {
  const leaderboard = await getLeaderboard();
  const { games } = await getDataBundle();
  const spotlightGames = (await getGameComparisons()).slice(
    0,
    3
  ) as FeaturedGameComparison[];

  const totalPlatinum = leaderboard.reduce((sum, player) => sum + player.platinum, 0);
  const totalCompletion = leaderboard.reduce(
    (sum, player) => sum + player.completion,
    0
  );

  return {
    leaderboard,
    metrics: {
      totalPlayers: leaderboard.length,
      totalTrackedGames: games.length,
      totalPlatinum,
      averageCompletion: totalCompletion / leaderboard.length,
      leaderGap:
        leaderboard.length > 1
          ? leaderboard[0].platinum - leaderboard[1].platinum
          : leaderboard[0]?.platinum ?? 0
    },
    spotlightGames,
    compareHighlights: [...compareCallouts],
    upcoming: [...upcomingFeatures]
  };
}
