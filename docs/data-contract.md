# `data/players.json` Data Contract

This document defines the schema used by the public frontend repo.

The site reads only one external data file:

- `data/players.json`

If the file is missing, invalid, or contains no valid players, the frontend falls back to built-in mock data from `js/data-source.js`.

## Top-Level Shape

```json
{
  "site": {
    "title": "PSN Rank Dashboard",
    "season": "Spring 2026",
    "updatedAt": "2026-03-30 20:00 UTC+8",
    "sourceLabel": "Sanitized local JSON"
  },
  "players": []
}
```

## `site`

`site` controls small pieces of dashboard metadata.

Fields:

- `title`: string. Main dashboard title.
- `season`: string. Human-readable label for the current competition period.
- `updatedAt`: string. Display-only timestamp or label for the latest JSON update.
- `sourceLabel`: string. Display-only description of the data origin, such as `Sanitized local JSON`.

## `players`

`players` is an array of player records.

Each player must include:

```json
{
  "id": "night-raven",
  "onlineId": "NightRavenTW",
  "displayName": "Night Raven",
  "tagline": "Finishes the hard platinum before breakfast.",
  "location": "Taipei",
  "avatar": {
    "initials": "NR",
    "accent": "#fbbf24",
    "gradient": ["#fbbf24", "#f97316"]
  },
  "stats": {
    "platinum": 85,
    "completion": 68.4,
    "trophyPoints": 184620,
    "gamesCompleted": 142,
    "weeklyGain": 1
  },
  "recentProgress": [
    "Astro Bot platinum secured",
    "Final Fantasy VII Rebirth pushed to 92%"
  ],
  "featuredGames": [
    {
      "title": "Astro Bot",
      "platform": "PS5",
      "completion": 100,
      "platinumUnlocked": true
    }
  ]
}
```

## Field Meanings

### Player identity

- `id`: string. Stable slug used as an internal frontend key.
- `onlineId`: string. PSN-facing handle shown in the UI.
- `displayName`: string. Friendly display label.
- `tagline`: string. Short descriptive sentence for cards and leaderboard rows.
- `location`: string. Optional display label for region or city.

### Avatar

- `avatar.initials`: string. Text shown in avatar blocks.
- `avatar.accent`: string. Accent color for small UI usage.
- `avatar.gradient`: array with at least two color strings. Used to render the avatar gradient.

### Stats

- `stats.platinum`: number. Primary ranking field.
- `stats.completion`: number. Completion percentage shown in UI.
- `stats.trophyPoints`: number. Total trophy points for summary and future views.
- `stats.gamesCompleted`: number. Count of fully completed games.
- `stats.weeklyGain`: number. Small recent delta used in dashboard summaries.

### Recent progress

- `recentProgress`: array of short strings.
- Used for the recent progress cards.
- Recommended length: 1 to 3 items.

### Featured games

- `featuredGames`: array of compact game records.
- Used for leaderboard chips and future compare modules.

Fields:

- `title`: string. Game name.
- `platform`: string. Example: `PS5`, `PS4`.
- `completion`: number. Completion percentage for this title.
- `platinumUnlocked`: boolean. Whether platinum is already earned.

## Validation Notes

The public frontend currently requires these fields to treat a player as valid:

- `id`
- `onlineId`
- `displayName`
- `tagline`
- `avatar.initials`
- `avatar.gradient`
- `stats.platinum`
- `stats.completion`
- `stats.trophyPoints`
- `stats.gamesCompleted`
- `stats.weeklyGain`

If all players fail validation, the site falls back to internal mock data instead of breaking.

## Non-Goals

This public schema should not include:

- tokens
- cookies
- scraping metadata
- request budgets
- raw provider responses
- private ingestion notes

Keep the JSON sanitized and presentation-focused.
