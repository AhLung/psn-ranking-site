import { readFile } from "node:fs/promises";
import path from "node:path";

import { env } from "@/lib/env";
import { games as mockGames, players as mockPlayers } from "@/lib/mock";
import type { Game, Player, SyncedPlayersFile } from "@/types/domain";

type DataBundle = {
  players: Player[];
  games: Game[];
};

const playersFilePath = path.join(process.cwd(), "data", "players.json");

function isPlayer(value: unknown): value is Player {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Partial<Player>;
  return (
    typeof candidate.id === "string" &&
    typeof candidate.displayName === "string" &&
    typeof candidate.psnId === "string" &&
    Array.isArray(candidate.gameProgress) &&
    Array.isArray(candidate.snapshots)
  );
}

function isGame(value: unknown): value is Game {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Partial<Game>;
  return (
    typeof candidate.id === "string" &&
    typeof candidate.title === "string" &&
    typeof candidate.platform === "string"
  );
}

function isSyncedPlayersFile(value: unknown): value is SyncedPlayersFile {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Partial<SyncedPlayersFile>;
  return Array.isArray(candidate.players) && Array.isArray(candidate.games);
}

async function readSyncedFile(): Promise<DataBundle | null> {
  try {
    const raw = await readFile(playersFilePath, "utf-8");
    const parsed = JSON.parse(raw) as unknown;

    if (!isSyncedPlayersFile(parsed)) {
      return null;
    }

    const players = parsed.players.filter(isPlayer);
    const games = parsed.games.filter(isGame);

    if (players.length === 0 || games.length === 0) {
      return null;
    }

    return { players, games };
  } catch {
    return null;
  }
}

export async function getDataBundle(): Promise<DataBundle> {
  if (env.NEXT_PUBLIC_DATA_SOURCE === "mock") {
    return {
      players: mockPlayers,
      games: mockGames
    };
  }

  if (
    env.NEXT_PUBLIC_DATA_SOURCE === "auto" ||
    env.NEXT_PUBLIC_DATA_SOURCE === "sync-file"
  ) {
    const synced = await readSyncedFile();

    if (synced) {
      return synced;
    }
  }

  return {
    players: mockPlayers,
    games: mockGames
  };
}
