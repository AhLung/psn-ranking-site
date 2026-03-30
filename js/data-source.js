const PLAYERS_URL = new URL("../data/players.json", import.meta.url);

const FALLBACK_DATA = {
  site: {
    title: "PSN 排行戰報",
    season: "2026 春季賽",
    updatedAt: "2026-03-30 20:00 UTC+8",
    sourceLabel: "內建示意資料",
  },
  players: [
    {
      id: "night-raven",
      onlineId: "NightRavenTW",
      displayName: "Night Raven",
      tagline: "高難度白金也能穩定收下。",
      location: "台北",
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
        "完成最新白金收尾",
        "主力遊戲完成率推進到 92%",
        "暫時守住第一名",
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
      tagline: "穩定追分，最擅長清理尾盤。",
      location: "台中",
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
        "本週白金增量持續追近",
        "正在收尾大型動作遊戲",
        "第二名位置相對穩定",
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
      tagline: "偏愛獨立與動作挑戰。",
      location: "高雄",
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
        "挑戰房間全部清完",
        "距離下一個白金只差最後掃尾",
        "維持前三名競爭力",
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
      tagline: "節奏與精準路線的代表。",
      location: "台南",
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
        "主要 RPG 還在穩定推進",
        "最近專注把完成率拉高",
        "中段班位置相當穩定",
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
      tagline: "擅長把待辦清單一口氣清空。",
      location: "新竹",
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
        "完成率重新往上拉升",
        "正在整理大型作品的支線獎盃",
        "持續緊咬前段班",
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
      tagline: "最近追分速度最快的黑馬。",
      location: "桃園",
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
        "本週增量是全場最快",
        "主力劇情作正在補完",
        "有機會往上一個級距推進",
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
    location: player.location || "未知",
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
    throw new Error("沒有可用的玩家資料");
  }

  return {
    site: {
      title: typeof site.title === "string" ? site.title : "PSN 排行戰報",
      season: typeof site.season === "string" ? site.season : "本季",
      updatedAt: typeof site.updatedAt === "string" ? site.updatedAt : "未提供",
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
    const dataset = normalizeDataset(json, "本地 players.json");

    return {
      dataset,
      usingFallback: false,
      message: "",
    };
  } catch (error) {
    return {
      dataset: normalizeDataset(FALLBACK_DATA, FALLBACK_DATA.site.sourceLabel),
      usingFallback: true,
      message: `因 data/players.json 無法使用，已改用內建示意資料（${error.message}）。`,
    };
  }
}
