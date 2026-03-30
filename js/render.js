import { getSummary, getTopThree } from "./sort.js";

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatNumber(value) {
  return new Intl.NumberFormat("en-US").format(value);
}

function formatPercent(value) {
  return `${value.toFixed(1)}%`;
}

function renderTopThreeCard(player) {
  return `
    <article class="podium-card rank-${player.rank}">
      <div class="podium-rank">#${player.rank}</div>
      <div class="podium-avatar" style="--avatar-start:${player.avatar.gradient[0]}; --avatar-end:${player.avatar.gradient[1]};">
        ${escapeHtml(player.avatar.initials)}
      </div>
      <div class="podium-copy">
        <p class="eyebrow">${escapeHtml(player.onlineId)}</p>
        <h3>${escapeHtml(player.displayName)}</h3>
        <p class="podium-tagline">${escapeHtml(player.tagline)}</p>
      </div>
      <div class="podium-stats">
        <div>
          <span>Platinum</span>
          <strong>${formatNumber(player.stats.platinum)}</strong>
        </div>
        <div>
          <span>Completion</span>
          <strong>${formatPercent(player.stats.completion)}</strong>
        </div>
        <div>
          <span>Weekly</span>
          <strong>+${formatNumber(player.stats.weeklyGain)}</strong>
        </div>
      </div>
    </article>
  `;
}

function renderLeaderboardRow(player) {
  const featuredGames = player.featuredGames
    .map(
      (game) => `
        <li class="game-chip">
          <span>${escapeHtml(game.title)}</span>
          <small>${escapeHtml(game.platform)} · ${formatPercent(game.completion)}</small>
        </li>
      `,
    )
    .join("");

  return `
    <article class="leaderboard-row rank-${player.rank}">
      <div class="leaderboard-main">
        <div class="rank-badge">#${player.rank}</div>
        <div class="player-avatar" style="--avatar-start:${player.avatar.gradient[0]}; --avatar-end:${player.avatar.gradient[1]};">
          ${escapeHtml(player.avatar.initials)}
        </div>
        <div class="player-copy">
          <div class="player-line">
            <h3>${escapeHtml(player.displayName)}</h3>
            <span class="handle">${escapeHtml(player.onlineId)}</span>
          </div>
          <p>${escapeHtml(player.tagline)}</p>
          <ul class="game-chip-list">${featuredGames}</ul>
        </div>
      </div>
      <div class="leaderboard-stats">
        <div class="stat-box">
          <span>Platinum</span>
          <strong>${formatNumber(player.stats.platinum)}</strong>
        </div>
        <div class="stat-box">
          <span>Completion</span>
          <strong>${formatPercent(player.stats.completion)}</strong>
          <div class="progress-track">
            <div class="progress-bar" style="width:${Math.min(player.stats.completion, 100)}%"></div>
          </div>
        </div>
        <div class="stat-box">
          <span>Completed</span>
          <strong>${formatNumber(player.stats.gamesCompleted)}</strong>
        </div>
      </div>
    </article>
  `;
}

function renderRecentProgress(players) {
  const items = players
    .slice(0, 4)
    .map(
      (player) => `
        <article class="progress-card">
          <header>
            <span class="mini-rank">#${player.rank}</span>
            <h3>${escapeHtml(player.displayName)}</h3>
          </header>
          <ul class="progress-list">
            ${player.recentProgress
              .map((item) => `<li>${escapeHtml(item)}</li>`)
              .join("")}
          </ul>
        </article>
      `,
    )
    .join("");

  return items;
}

export function renderApp(root, dataset, usingFallback, message) {
  const summary = getSummary(dataset.players);
  const topThree = getTopThree(dataset.players);
  const rankedPlayers = summary.ranked;

  root.innerHTML = `
    <section class="hero">
      <div class="hero-copy">
        <p class="eyebrow">PlayStation Trophy Tracker</p>
        <h1>${escapeHtml(dataset.site.title)}</h1>
        <p class="hero-text">
          A public dashboard for platinum races, completion pressure, and friend-group momentum.
        </p>
        <div class="hero-meta">
          <span>${escapeHtml(dataset.site.season)}</span>
          <span>${escapeHtml(dataset.site.updatedAt)}</span>
          <span>${escapeHtml(dataset.site.sourceLabel)}</span>
        </div>
        ${
          usingFallback
            ? `<div class="notice-banner">${escapeHtml(message)}</div>`
            : ""
        }
      </div>
      <div class="hero-metrics">
        <article class="metric-card">
          <span>Tracked Players</span>
          <strong>${formatNumber(summary.totalPlayers)}</strong>
        </article>
        <article class="metric-card">
          <span>Total Platinum</span>
          <strong>${formatNumber(summary.totalPlatinum)}</strong>
        </article>
        <article class="metric-card">
          <span>Average Completion</span>
          <strong>${formatPercent(summary.averageCompletion)}</strong>
        </article>
        <article class="metric-card">
          <span>Leader Gap</span>
          <strong>${formatNumber(summary.leaderGap)}</strong>
        </article>
      </div>
    </section>

    <section class="section-shell" id="top-three">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Podium</p>
          <h2>Top 3 Pressure Zone</h2>
        </div>
        <p class="section-note">Gold, silver, and bronze stay visually distinct to keep the race readable at a glance.</p>
      </div>
      <div class="podium-grid">
        ${topThree.map(renderTopThreeCard).join("")}
      </div>
    </section>

    <section class="section-shell" id="leaderboard">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Leaderboard</p>
          <h2>Full Ranking</h2>
        </div>
        <p class="section-note">Rank, name, platinum count, completion rate, and current featured targets.</p>
      </div>
      <div class="leaderboard-list">
        ${rankedPlayers.map(renderLeaderboardRow).join("")}
      </div>
    </section>

    <section class="section-shell">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Recent Progress</p>
          <h2>Momentum Check</h2>
        </div>
        <p class="section-note">A lightweight teaser area for the next iteration of snapshot and history views.</p>
      </div>
      <div class="progress-grid">
        ${renderRecentProgress(rankedPlayers)}
      </div>
    </section>

    <section class="section-shell" id="future">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Coming Soon</p>
          <h2>Future Modules</h2>
        </div>
        <p class="section-note">These blocks stay visible so the repo has a clear growth path without adding non-static logic here.</p>
      </div>
      <div class="future-grid">
        <article class="future-card">
          <h3>玩家比較</h3>
          <p>Head-to-head ranking, shared library overlap, platinum pace, and rivalry snapshots.</p>
        </article>
        <article class="future-card">
          <h3>遊戲比較</h3>
          <p>Which players cleared the same games, who finished faster, and where completion diverges.</p>
        </article>
        <article class="future-card">
          <h3>近期進度</h3>
          <p>Time-based snapshots for weekly deltas, streaks, and climb/fall indicators once external JSON is updated.</p>
        </article>
      </div>
    </section>
  `;
}
