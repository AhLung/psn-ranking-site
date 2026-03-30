export function sortPlayers(players) {
  return [...players].sort((left, right) => {
    const platinumGap = (right.stats?.platinum ?? 0) - (left.stats?.platinum ?? 0);
    if (platinumGap !== 0) {
      return platinumGap;
    }

    const completionGap = (right.stats?.completion ?? 0) - (left.stats?.completion ?? 0);
    if (completionGap !== 0) {
      return completionGap;
    }

    const pointsGap = (right.stats?.trophyPoints ?? 0) - (left.stats?.trophyPoints ?? 0);
    if (pointsGap !== 0) {
      return pointsGap;
    }

    return String(left.displayName ?? "").localeCompare(String(right.displayName ?? ""));
  });
}

export function rankPlayers(players) {
  return sortPlayers(players).map((player, index) => ({
    ...player,
    rank: index + 1
  }));
}

export function getSummary(players) {
  const ranked = rankPlayers(players);
  const totalPlayers = ranked.length;
  const totalPlatinum = ranked.reduce((sum, player) => sum + (player.stats?.platinum ?? 0), 0);
  const averageCompletion =
    totalPlayers > 0
      ? ranked.reduce((sum, player) => sum + (player.stats?.completion ?? 0), 0) / totalPlayers
      : 0;
  const totalCompletedGames = ranked.reduce(
    (sum, player) => sum + (player.stats?.gamesCompleted ?? 0),
    0
  );
  const leaderGap =
    totalPlayers > 1
      ? (ranked[0].stats?.platinum ?? 0) - (ranked[1].stats?.platinum ?? 0)
      : ranked[0]?.stats?.platinum ?? 0;

  return {
    ranked,
    totalPlayers,
    totalPlatinum,
    averageCompletion,
    totalCompletedGames,
    leaderGap
  };
}

export function getTopThree(players) {
  return rankPlayers(players).slice(0, 3);
}
