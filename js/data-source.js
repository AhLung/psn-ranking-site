const PLAYERS_URL = new URL("../data/players.json", import.meta.url);

const FALLBACK_DATA = {
  site: {
    title: "PSN Rank Dashboard",
    season: "Spring 2026",
    updatedAt: "2026-03-30 20:00 UTC+8",
    sourceLabel: "Built-in mock data",
  },
  players: [
    {
      id: "night-raven",
      onlineId: "NightRavenTW",
      displayName: "Night Raven",
      tagline: "Finishes the hard platinum before breakfast.",
      location: "Taipei",
      avatar: {
        initials: "NR",
        accent: "#fbbf24",
        gradient: ["#fbbf24", "#f97316"],
      },
      stats: {
        platinum: 85,
        completion: 68.4,
        trophyPoints: 184620,
        gamesCompleted: 142,
        weeklyGain: 1,
      },
      recentProgress: [
        "Astro Bot platinum secured",
        "Final Fantasy VII Rebirth pushed to 92%",
        "Still protecting first place",
      ],
      featuredGames: [
        { title: "Astro Bot", platform: "PS5", completion: 100, platinumUnlocked: true },
        { title: "Final Fantasy VII Rebirth", platform: "PS5", completion: 92, platinumUnlocked: false },
      ],
    },
    {
      id: "astra-raid",
      onlineId: "AstraRaid88",
      displayName: "Astra Raid",
      tagline: "Constant pressure, constant clean-up.",
      location: "Taichung",
      avatar: {
        initials: "AR",
        accent: "#c0c7d1",
        gradient: ["#cbd5e1", "#64748b"],
      },
      stats: {
        platinum: 78,
        completion: 64.1,
        trophyPoints: 169440,
        gamesCompleted: 129,
        weeklyGain: 2,
      },
      recentProgress: [
        "Helldivers 2 trophy cleanup in progress",
        "Closed the weekly gap by 2 plats",
        "Speedrunning backlog maintenance",
      ],
      featuredGames: [
        { title: "Helldivers 2", platform: "PS5", completion: 88, platinumUnlocked: false },
        { title: "Resident Evil 4", platform: "PS5", completion: 100, platinumUnlocked: true },
      ],
    },
    {
      id: "pixel-ronin",
      onlineId: "PixelRonin",
      displayName: "Pixel Ronin",
      tagline: "Indie hunter with a boss-rush habit.",
      location: "Kaohsiung",
      avatar: {
        initials: "PR",
        accent: "#d97706",
        gradient: ["#f59e0b", "#b45309"],
      },
      stats: {
        platinum: 72,
        completion: 61.3,
        trophyPoints: 158120,
        gamesCompleted: 118,
        weeklyGain: 1,
      },
      recentProgress: [
        "Prince of Persia challenge rooms cleared",
        "One more collectible sweep for another plat",
        "Moving steadily inside top 3",
      ],
      featuredGames: [
        { title: "Prince of Persia: The Lost Crown", platform: "PS5", completion: 96, platinumUnlocked: false },
        { title: "Hades", platform: "PS5", completion: 100, platinumUnlocked: true },
      ],
    },
    {
      id: "luna-circuit",
      onlineId: "LunaCircuit",
      displayName: "Luna Circuit",
      tagline: "Rhythm games and precision routing.",
      location: "Tainan",
      avatar: {
        initials: "LC",
        accent: "#38bdf8",
        gradient: ["#22d3ee", "#2563eb"],
      },
      stats: {
        platinum: 59,
        completion: 57.8,
        trophyPoints: 131980,
        gamesCompleted: 101,
        weeklyGain: 0,
      },
      recentProgress: [
        "Persona 3 Reload social links nearly done",
        "Current focus: clean 90%+ completion runs",
        "Holding mid-table with consistent clears",
      ],
      featuredGames: [
        { title: "Persona 3 Reload", platform: "PS5", completion: 89, platinumUnlocked: false },
        { title: "Beat Saber", platform: "PS5", completion: 100, platinumUnlocked: true },
      ],
    },
    {
      id: "crimson-byte",
      onlineId: "CrimsonByte",
      displayName: "Crimson Byte",
      tagline: "Backlog assassin with a spreadsheet soul.",
      location: "Hsinchu",
      avatar: {
        initials: "CB",
        accent: "#fb7185",
        gradient: ["#f43f5e", "#7f1d1d"],
      },
      stats: {
        platinum: 51,
        completion: 52.6,
        trophyPoints: 118420,
        gamesCompleted: 88,
        weeklyGain: 1,
      },
      recentProgress: [
        "Like a Dragon cleanup week",
        "Raised overall completion above 52%",
        "Watching the top 4 race closely",
      ],
      featuredGames: [
        { title: "Like a Dragon: Infinite Wealth", platform: "PS5", completion: 84, platinumUnlocked: false },
        { title: "Marvel's Spider-Man 2", platform: "PS5", completion: 100, platinumUnlocked: true },
      ],
    },
    {
      id: "nova-pulse",
      onlineId: "NovaPulse",
      displayName: "Nova Pulse",
      tagline: "Story-driven runner with a late surge.",
      location: "Taoyuan",
      avatar: {
        initials: "NP",
        accent: "#a78bfa",
        gradient: ["#8b5cf6", "#ec4899"],
      },
      stats: {
        platinum: 43,
        completion: 47.9,
        trophyPoints: 104900,
        gamesCompleted: 73,
        weeklyGain: 2,
      },
      recentProgress: [
        "Alan Wake 2 chapter cleanup underway",
        "Strongest weekly growth in the field",
        "Pushing to break into the next tier",
      ],
      featuredGames: [
        { title: "Alan Wake 2", platform: "PS5", completion: 76, platinumUnlocked: false },
        { title: "Ghost of Tsushima", platform: "PS5", completion: 100, platinumUnlocked: true },
      ],
    },
  ],
};

function isFiniteNumber(value) {
  return typeof value === "number" && Number.isFinite(value);
}

function isValidPlayer(player) {
  if (!player || typeof player !== "object") {
    return false;
  }

  const avatar = player.avatar || {};
  const stats = player.stats || {};

  return (
    typeof player.id === "string" &&
    typeof player.onlineId === "string" &&
    typeof player.displayName === "string" &&
    typeof player.tagline === "string" &&
    typeof avatar.initials === "string" &&
    Array.isArray(avatar.gradient) &&
    avatar.gradient.length >= 2 &&
    isFiniteNumber(stats.platinum) &&
    isFiniteNumber(stats.completion) &&
    isFiniteNumber(stats.trophyPoints) &&
    isFiniteNumber(stats.gamesCompleted) &&
    isFiniteNumber(stats.weeklyGain)
  );
}

function normalizePlayer(player) {
  return {
    id: player.id,
    onlineId: player.onlineId,
    displayName: player.displayName,
    tagline: player.tagline,
    location: player.location || "Unknown",
    avatar: {
      initials: player.avatar.initials,
      accent: player.avatar.accent || player.avatar.gradient[0],
      gradient: player.avatar.gradient.slice(0, 2),
    },
    stats: {
      platinum: player.stats.platinum,
      completion: player.stats.completion,
      trophyPoints: player.stats.trophyPoints,
      gamesCompleted: player.stats.gamesCompleted,
      weeklyGain: player.stats.weeklyGain,
    },
    recentProgress: Array.isArray(player.recentProgress) ? player.recentProgress.slice(0, 3) : [],
    featuredGames: Array.isArray(player.featuredGames) ? player.featuredGames.slice(0, 3) : [],
  };
}

function normalizeDataset(input, sourceLabel) {
  const site = input.site && typeof input.site === "object" ? input.site : {};
  const players = Array.isArray(input.players) ? input.players.filter(isValidPlayer).map(normalizePlayer) : [];

  if (players.length === 0) {
    throw new Error("No valid players in payload");
  }

  return {
    site: {
      title: typeof site.title === "string" ? site.title : "PSN Rank Dashboard",
      season: typeof site.season === "string" ? site.season : "Current Season",
      updatedAt: typeof site.updatedAt === "string" ? site.updatedAt : "Unknown",
      sourceLabel,
    },
    players,
  };
}

export async function loadSiteData() {
  try {
    const response = await fetch(PLAYERS_URL, { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const json = await response.json();
    const dataset = normalizeDataset(json, "data/players.json");

    return {
      dataset,
      usingFallback: false,
      message: "",
    };
  } catch (error) {
    return {
      dataset: normalizeDataset(FALLBACK_DATA, FALLBACK_DATA.site.sourceLabel),
      usingFallback: true,
      message: `Falling back to built-in mock data because data/players.json could not be used (${error.message}).`,
    };
  }
}
