import type { Player } from "@/types/domain";

export const players: Player[] = [
  {
    id: "night-raven",
    psnId: "NightRavenTW",
    displayName: "Night Raven",
    handle: "@nightraven",
    motto: "Finishes the hard platinum before breakfast.",
    region: "Taipei",
    joinedAt: "2022-08-14",
    accent: "#fbbf24",
    avatarGradient: ["#fbbf24", "#f97316"],
    favoriteGenres: ["Action RPG", "Platformer", "JRPG"],
    trophyMix: { platinum: 85, gold: 412, silver: 1386, bronze: 4978 },
    stats: {
      platinum: 85,
      completion: 68.4,
      trophyPoints: 184620,
      gamesCompleted: 142,
      weeklyTarget: 2
    },
    snapshots: [
      { date: "2026-03-09", platinum: 82, completion: 67.1, trophyPoints: 181980, gamesCompleted: 139 },
      { date: "2026-03-16", platinum: 83, completion: 67.5, trophyPoints: 182840, gamesCompleted: 140 },
      { date: "2026-03-23", platinum: 84, completion: 67.9, trophyPoints: 183690, gamesCompleted: 141 },
      { date: "2026-03-30", platinum: 85, completion: 68.4, trophyPoints: 184620, gamesCompleted: 142 }
    ],
    gameProgress: [
      { gameId: "astro-bot", completion: 100, platinumUnlocked: true, trophiesEarned: 44, lastPlayedAt: "2026-03-28" },
      { gameId: "ff7-rebirth", completion: 92, platinumUnlocked: false, trophiesEarned: 56, lastPlayedAt: "2026-03-25" },
      { gameId: "elden-ring", completion: 100, platinumUnlocked: true, trophiesEarned: 43, lastPlayedAt: "2026-02-17" },
      { gameId: "hades", completion: 88, platinumUnlocked: false, trophiesEarned: 44, lastPlayedAt: "2026-03-19" },
      { gameId: "ghost-of-tsushima", completion: 100, platinumUnlocked: true, trophiesEarned: 52, lastPlayedAt: "2026-01-10" }
    ],
    milestones: [
      { title: "Astro Bot platinum secured", detail: "Pulled ahead with a clean 100% finish on the team’s shared platformer sprint.", date: "2026-03-28" },
      { title: "Top spot defended", detail: "Maintained leaderboard control for a fourth straight weekly snapshot.", date: "2026-03-30" }
    ],
    featuredGameIds: ["astro-bot", "ff7-rebirth", "elden-ring"]
  },
  {
    id: "astra-raid",
    psnId: "AstraRaid88",
    displayName: "Astra Raid",
    handle: "@astraraid",
    motto: "Clean routes, fast clears, no wasted trophies.",
    region: "Taichung",
    joinedAt: "2022-10-02",
    accent: "#cbd5e1",
    avatarGradient: ["#cbd5e1", "#60a5fa"],
    favoriteGenres: ["Shooter", "Roguelike", "Action RPG"],
    trophyMix: { platinum: 79, gold: 398, silver: 1278, bronze: 4652 },
    stats: {
      platinum: 79,
      completion: 65.2,
      trophyPoints: 176300,
      gamesCompleted: 131,
      weeklyTarget: 2
    },
    snapshots: [
      { date: "2026-03-09", platinum: 77, completion: 64.2, trophyPoints: 174040, gamesCompleted: 129 },
      { date: "2026-03-16", platinum: 78, completion: 64.7, trophyPoints: 175050, gamesCompleted: 130 },
      { date: "2026-03-23", platinum: 78, completion: 64.9, trophyPoints: 175420, gamesCompleted: 130 },
      { date: "2026-03-30", platinum: 79, completion: 65.2, trophyPoints: 176300, gamesCompleted: 131 }
    ],
    gameProgress: [
      { gameId: "helldivers-2", completion: 96, platinumUnlocked: false, trophiesEarned: 37, lastPlayedAt: "2026-03-29" },
      { gameId: "hades", completion: 100, platinumUnlocked: true, trophiesEarned: 50, lastPlayedAt: "2026-03-14" },
      { gameId: "resident-evil-4", completion: 84, platinumUnlocked: false, trophiesEarned: 32, lastPlayedAt: "2026-03-22" },
      { gameId: "elden-ring", completion: 91, platinumUnlocked: false, trophiesEarned: 39, lastPlayedAt: "2026-03-17" },
      { gameId: "astro-bot", completion: 82, platinumUnlocked: false, trophiesEarned: 34, lastPlayedAt: "2026-03-26" }
    ],
    milestones: [
      { title: "Helldivers clean-up week", detail: "Closed in on first place by sweeping squad objectives and hidden trophy cleanup.", date: "2026-03-29" },
      { title: "Hades platinum", detail: "Converted a long-running roguelike save into a decisive platinum finish.", date: "2026-03-14" }
    ],
    featuredGameIds: ["helldivers-2", "hades", "resident-evil-4"]
  },
  {
    id: "pixel-ronin",
    psnId: "PixelRonin",
    displayName: "Pixel Ronin",
    handle: "@pixelronin",
    motto: "Backlog hunter with dangerous late-season form.",
    region: "Kaohsiung",
    joinedAt: "2023-01-21",
    accent: "#fb923c",
    avatarGradient: ["#fb923c", "#ef4444"],
    favoriteGenres: ["JRPG", "Open World", "Survival Horror"],
    trophyMix: { platinum: 62, gold: 320, silver: 1011, bronze: 3880 },
    stats: {
      platinum: 62,
      completion: 59.1,
      trophyPoints: 149880,
      gamesCompleted: 108,
      weeklyTarget: 1
    },
    snapshots: [
      { date: "2026-03-09", platinum: 60, completion: 58.2, trophyPoints: 147930, gamesCompleted: 106 },
      { date: "2026-03-16", platinum: 60, completion: 58.5, trophyPoints: 148210, gamesCompleted: 106 },
      { date: "2026-03-23", platinum: 61, completion: 58.8, trophyPoints: 149040, gamesCompleted: 107 },
      { date: "2026-03-30", platinum: 62, completion: 59.1, trophyPoints: 149880, gamesCompleted: 108 }
    ],
    gameProgress: [
      { gameId: "ff7-rebirth", completion: 87, platinumUnlocked: false, trophiesEarned: 53, lastPlayedAt: "2026-03-27" },
      { gameId: "ghost-of-tsushima", completion: 93, platinumUnlocked: false, trophiesEarned: 48, lastPlayedAt: "2026-03-18" },
      { gameId: "resident-evil-4", completion: 100, platinumUnlocked: true, trophiesEarned: 40, lastPlayedAt: "2026-03-12" },
      { gameId: "astro-bot", completion: 76, platinumUnlocked: false, trophiesEarned: 28, lastPlayedAt: "2026-03-20" }
    ],
    milestones: [
      { title: "Resident Evil 4 platinum", detail: "Turned a speedrun route into a full platinum conversion.", date: "2026-03-12" },
      { title: "Rebirth push", detail: "Pushed deep into endgame VR challenges to stay in the podium hunt.", date: "2026-03-27" }
    ],
    featuredGameIds: ["ff7-rebirth", "resident-evil-4", "ghost-of-tsushima"]
  },
  {
    id: "luna-circuit",
    psnId: "LunaCircuit",
    displayName: "Luna Circuit",
    handle: "@lunacircuit",
    motto: "Precision routes, completion-first planning.",
    region: "Tainan",
    joinedAt: "2023-04-06",
    accent: "#38bdf8",
    avatarGradient: ["#38bdf8", "#8b5cf6"],
    favoriteGenres: ["Platformer", "Puzzle", "JRPG"],
    trophyMix: { platinum: 57, gold: 287, silver: 920, bronze: 3510 },
    stats: {
      platinum: 57,
      completion: 54.8,
      trophyPoints: 138440,
      gamesCompleted: 97,
      weeklyTarget: 1
    },
    snapshots: [
      { date: "2026-03-09", platinum: 56, completion: 54.0, trophyPoints: 137330, gamesCompleted: 96 },
      { date: "2026-03-16", platinum: 56, completion: 54.1, trophyPoints: 137510, gamesCompleted: 96 },
      { date: "2026-03-23", platinum: 57, completion: 54.5, trophyPoints: 138010, gamesCompleted: 97 },
      { date: "2026-03-30", platinum: 57, completion: 54.8, trophyPoints: 138440, gamesCompleted: 97 }
    ],
    gameProgress: [
      { gameId: "astro-bot", completion: 94, platinumUnlocked: false, trophiesEarned: 39, lastPlayedAt: "2026-03-24" },
      { gameId: "hades", completion: 72, platinumUnlocked: false, trophiesEarned: 34, lastPlayedAt: "2026-03-16" },
      { gameId: "ghost-of-tsushima", completion: 81, platinumUnlocked: false, trophiesEarned: 41, lastPlayedAt: "2026-03-10" },
      { gameId: "ff7-rebirth", completion: 68, platinumUnlocked: false, trophiesEarned: 42, lastPlayedAt: "2026-03-29" }
    ],
    milestones: [
      { title: "Astro Bot cleanup session", detail: "Moved within striking distance of another platinum with near-full collectible completion.", date: "2026-03-24" }
    ],
    featuredGameIds: ["astro-bot", "ff7-rebirth", "ghost-of-tsushima"]
  },
  {
    id: "crimson-byte",
    psnId: "CrimsonByte",
    displayName: "Crimson Byte",
    handle: "@crimsonbyte",
    motto: "Hard mode first, trophies second, still climbing.",
    region: "Taipei",
    joinedAt: "2023-08-19",
    accent: "#f87171",
    avatarGradient: ["#f87171", "#fb7185"],
    favoriteGenres: ["Survival Horror", "Shooter", "Action RPG"],
    trophyMix: { platinum: 49, gold: 241, silver: 802, bronze: 3120 },
    stats: {
      platinum: 49,
      completion: 50.3,
      trophyPoints: 126820,
      gamesCompleted: 84,
      weeklyTarget: 1
    },
    snapshots: [
      { date: "2026-03-09", platinum: 48, completion: 49.7, trophyPoints: 125930, gamesCompleted: 83 },
      { date: "2026-03-16", platinum: 48, completion: 49.8, trophyPoints: 126080, gamesCompleted: 83 },
      { date: "2026-03-23", platinum: 49, completion: 50.0, trophyPoints: 126420, gamesCompleted: 84 },
      { date: "2026-03-30", platinum: 49, completion: 50.3, trophyPoints: 126820, gamesCompleted: 84 }
    ],
    gameProgress: [
      { gameId: "helldivers-2", completion: 78, platinumUnlocked: false, trophiesEarned: 29, lastPlayedAt: "2026-03-21" },
      { gameId: "resident-evil-4", completion: 88, platinumUnlocked: false, trophiesEarned: 35, lastPlayedAt: "2026-03-27" },
      { gameId: "elden-ring", completion: 66, platinumUnlocked: false, trophiesEarned: 27, lastPlayedAt: "2026-03-08" }
    ],
    milestones: [
      { title: "Resident Evil S+ attempt", detail: "Still short of the platinum, but route consistency is improving week over week.", date: "2026-03-27" }
    ],
    featuredGameIds: ["resident-evil-4", "helldivers-2", "elden-ring"]
  },
  {
    id: "nova-pulse",
    psnId: "NovaPulse",
    displayName: "Nova Pulse",
    handle: "@novapulse",
    motto: "Momentum player who spikes when the season gets noisy.",
    region: "Hsinchu",
    joinedAt: "2024-01-05",
    accent: "#a78bfa",
    avatarGradient: ["#a78bfa", "#22d3ee"],
    favoriteGenres: ["Roguelike", "Co-op Shooter", "Platformer"],
    trophyMix: { platinum: 43, gold: 210, silver: 690, bronze: 2804 },
    stats: {
      platinum: 43,
      completion: 47.6,
      trophyPoints: 119240,
      gamesCompleted: 76,
      weeklyTarget: 1
    },
    snapshots: [
      { date: "2026-03-09", platinum: 42, completion: 47.0, trophyPoints: 118220, gamesCompleted: 75 },
      { date: "2026-03-16", platinum: 42, completion: 47.1, trophyPoints: 118360, gamesCompleted: 75 },
      { date: "2026-03-23", platinum: 42, completion: 47.3, trophyPoints: 118640, gamesCompleted: 75 },
      { date: "2026-03-30", platinum: 43, completion: 47.6, trophyPoints: 119240, gamesCompleted: 76 }
    ],
    gameProgress: [
      { gameId: "hades", completion: 83, platinumUnlocked: false, trophiesEarned: 40, lastPlayedAt: "2026-03-26" },
      { gameId: "helldivers-2", completion: 70, platinumUnlocked: false, trophiesEarned: 25, lastPlayedAt: "2026-03-23" },
      { gameId: "astro-bot", completion: 65, platinumUnlocked: false, trophiesEarned: 24, lastPlayedAt: "2026-03-18" }
    ],
    milestones: [
      { title: "Back into motion", detail: "Re-entered the platinum race after a quiet month and immediately notched a new finish.", date: "2026-03-30" }
    ],
    featuredGameIds: ["hades", "helldivers-2", "astro-bot"]
  }
];
