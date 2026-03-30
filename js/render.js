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
  return new Intl.NumberFormat("zh-TW").format(value);
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
          <span>白金數</span>
          <strong>${formatNumber(player.stats.platinum)}</strong>
        </div>
        <div>
          <span>完成率</span>
          <strong>${formatPercent(player.stats.completion)}</strong>
        </div>
        <div>
          <span>本週增量</span>
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
          <small>${escapeHtml(game.platform)} ・ ${formatPercent(game.completion)}</small>
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
          <span>白金數</span>
          <strong>${formatNumber(player.stats.platinum)}</strong>
        </div>
        <div class="stat-box">
          <span>完成率</span>
          <strong>${formatPercent(player.stats.completion)}</strong>
          <div class="progress-track">
            <div class="progress-bar" style="width:${Math.min(player.stats.completion, 100)}%"></div>
          </div>
        </div>
        <div class="stat-box">
          <span>已完成遊戲</span>
          <strong>${formatNumber(player.stats.gamesCompleted)}</strong>
        </div>
      </div>
    </article>
  `;
}

function renderRecentProgress(players) {
  return players
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
}

export function renderApp(root, dataset, usingFallback, message) {
  const summary = getSummary(dataset.players);
  const topThree = getTopThree(dataset.players);
  const rankedPlayers = summary.ranked;

  root.innerHTML = `
    <section class="hero">
      <div class="hero-copy">
        <p class="eyebrow">PSN 白金競賽</p>
        <h1>${escapeHtml(dataset.site.title)}</h1>
        <p class="hero-text">
          集中顯示朋友之間的白金排名、完成率、近期追分狀態與後續比較區塊。
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
          <span>追蹤玩家</span>
          <strong>${formatNumber(summary.totalPlayers)}</strong>
        </article>
        <article class="metric-card">
          <span>總白金數</span>
          <strong>${formatNumber(summary.totalPlatinum)}</strong>
        </article>
        <article class="metric-card">
          <span>平均完成率</span>
          <strong>${formatPercent(summary.averageCompletion)}</strong>
        </article>
        <article class="metric-card">
          <span>榜首差距</span>
          <strong>${formatNumber(summary.leaderGap)}</strong>
        </article>
      </div>
    </section>

    <section class="section-shell" id="top-three">
      <div class="section-heading">
        <div>
          <p class="eyebrow">頒獎台</p>
          <h2>前三名焦點</h2>
        </div>
        <p class="section-note">第一、第二、第三名保持清楚層級，桌機和手機都能快速辨識目前戰況。</p>
      </div>
      <div class="podium-grid">
        ${topThree.map(renderTopThreeCard).join("")}
      </div>
    </section>

    <section class="section-shell" id="leaderboard">
      <div class="section-heading">
        <div>
          <p class="eyebrow">排行榜</p>
          <h2>完整排名</h2>
        </div>
        <p class="section-note">顯示名次、名稱、白金數、完成率與目前重點遊戲。</p>
      </div>
      <div class="leaderboard-list">
        ${rankedPlayers.map(renderLeaderboardRow).join("")}
      </div>
    </section>

    <section class="section-shell">
      <div class="section-heading">
        <div>
          <p class="eyebrow">近期進度</p>
          <h2>本週動態</h2>
        </div>
        <p class="section-note">先用簡潔卡片呈現最新變化，之後可再擴充成歷史快照與進度曲線。</p>
      </div>
      <div class="progress-grid">
        ${renderRecentProgress(rankedPlayers)}
      </div>
    </section>

    <section class="section-shell" id="future">
      <div class="section-heading">
        <div>
          <p class="eyebrow">即將推出</p>
          <h2>後續功能</h2>
        </div>
        <p class="section-note">先把區塊保留下來，之後可以直接擴充更多純前端展示模組。</p>
      </div>
      <div class="future-grid">
        <article class="future-card">
          <h3>玩家比較</h3>
          <p>支援雙人或多人對照，顯示白金節奏、共同遊戲與追分差距。</p>
        </article>
        <article class="future-card">
          <h3>遊戲比較</h3>
          <p>觀察哪些人玩過同一款遊戲，誰的完成率更高，差距在哪裡。</p>
        </article>
        <article class="future-card">
          <h3>近期進度</h3>
          <p>未來可加入每週快照、名次升降與穩定追分趨勢。</p>
        </article>
      </div>
    </section>
  `;
}
