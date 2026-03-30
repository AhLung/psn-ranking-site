# PSN Rank

PSN Rank is a product-ready PlayStation Trophy Tracker / PSN platinum leaderboard scaffold built for long-term development.

This repo is no longer a static one-page demo. It now includes:

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn-style UI primitives in `components/ui`
- Mock data repository for fast iteration
- API route examples
- Sync route skeletons for future PSN ingestion
- Supabase integration placeholders
- Vercel-friendly structure

## Product Scope

The product is designed to track your PSN trophy race with friends and evolve into a richer analytics app.

Current routes:

- `/` dashboard
- `/players` player directory
- `/player/[id]` player detail page
- `/compare/players` rivalry comparison
- `/compare/games` shared game comparison

Current API routes:

- `/api/health`
- `/api/leaderboard`
- `/api/players`
- `/api/players/[id]`
- `/api/sync`
- `/api/cron/sync`

## Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- shadcn-style component structure
- Lucide icons
- Supabase-ready service layer

## Repo Structure

```text
app/
  api/
  compare/
  player/[id]/
  players/
  globals.css
  layout.tsx
  page.tsx
components/
  compare/
  dashboard/
  home/
  layout/
  leaderboard/
  players/
  ui/
lib/
  constants.ts
  data/repository.ts
  env.ts
  mock/
  supabase/
  sync/
  utils.ts
types/
  domain.ts
AGENTS.md
README.md
```

## Local Development

1. Install dependencies

```bash
npm install
```

2. Copy the environment template

```bash
cp .env.example .env.local
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env.local
```

3. Start the dev server

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

Recommended checks:

```bash
npm run lint
npm run typecheck
```

## Data Model Today

The current UI is powered by mock data stored in:

- [lib/mock/players.ts](C:/Users/fkklw/Desktop/1.Project/25.PSNRank/lib/mock/players.ts)
- [lib/mock/games.ts](C:/Users/fkklw/Desktop/1.Project/25.PSNRank/lib/mock/games.ts)

The main access layer is:

- [lib/data/repository.ts](C:/Users/fkklw/Desktop/1.Project/25.PSNRank/lib/data/repository.ts)

This is intentional. Future storage can swap in without rewriting the page layer.

## Supabase Integration Plan

Supabase placeholders are already scaffolded in:

- [lib/supabase/config.ts](C:/Users/fkklw/Desktop/1.Project/25.PSNRank/lib/supabase/config.ts)
- [lib/supabase/browser.ts](C:/Users/fkklw/Desktop/1.Project/25.PSNRank/lib/supabase/browser.ts)
- [lib/supabase/server.ts](C:/Users/fkklw/Desktop/1.Project/25.PSNRank/lib/supabase/server.ts)

Suggested next step:

1. Create tables for `players`, `games`, `player_game_progress`, `player_snapshots`, and `sync_runs`.
2. Replace the mock repository with a Supabase-backed adapter.
3. Keep the exported function signatures in `lib/data/repository.ts` stable so pages and API routes stay unchanged.

Required env vars when you switch to Supabase:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## Sync and Vercel Cron

Sync scaffolding is in:

- [lib/sync/psn-sync.ts](C:/Users/fkklw/Desktop/1.Project/25.PSNRank/lib/sync/psn-sync.ts)
- [app/api/sync/route.ts](C:/Users/fkklw/Desktop/1.Project/25.PSNRank/app/api/sync/route.ts)
- [app/api/cron/sync/route.ts](C:/Users/fkklw/Desktop/1.Project/25.PSNRank/app/api/cron/sync/route.ts)

Current behavior:

- `/api/sync` documents the manual sync endpoint and accepts authorized `POST` requests
- `/api/cron/sync` is a protected cron-ready endpoint
- Both currently return scaffold responses until a real provider is wired in

Suggested Vercel setup later:

1. Add `CRON_SECRET` in Vercel project settings.
2. Enable `PSN_SYNC_ENABLED=true` when the provider is ready.
3. Add a `vercel.json` cron entry that targets `/api/cron/sync`.

Example future cron entry:

```json
{
  "crons": [
    {
      "path": "/api/cron/sync",
      "schedule": "0 10 * * *"
    }
  ]
}
```

Do not add the cron schedule until the real sync logic is implemented.

## Deployment

This project is structured for Vercel deployment.

Basic deployment flow:

1. Push the repo to GitHub
2. Import the repo into Vercel
3. Add environment variables from `.env.example`
4. Deploy

No paid service is required to run the scaffold itself.

## Suggested Next Product Milestones

1. Replace the mock repository with Supabase storage
2. Add historical snapshot pages and charting
3. Add game detail routes
4. Add sync provider integration for PSN trophy ingestion
5. Add authentication if private friend groups need protected access

