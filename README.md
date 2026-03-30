# PSN Rank

PSN Rank is a product-ready PlayStation Trophy Tracker / PSN platinum leaderboard scaffold built for long-term development.

The repo now includes:

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn-style UI primitives
- mock data for fast iteration
- file-based sync ingestion hooks
- Python + PSNAWP sync skeleton
- API route examples
- future Supabase integration seams
- Vercel-ready deployment structure

## Product Scope

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

## Repo Structure

```text
app/
  api/
  compare/
  player/[id]/
  players/
components/
  compare/
  dashboard/
  home/
  layout/
  leaderboard/
  players/
  ui/
data/
  friends.json
  players.json
lib/
  constants.ts
  data/
  env.ts
  mock/
  supabase/
  sync/
scripts/
  psn_sync.py
types/
  domain.ts
.github/workflows/
  psn-sync.yml
AGENTS.md
README.md
requirements-sync.txt
```

## Local Web Development

1. Install Node dependencies

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

3. Start the app

```bash
npm run dev
```

4. Run checks when needed

```bash
npm run lint
npm run typecheck
npm run build
```

## Data Source Modes

`NEXT_PUBLIC_DATA_SOURCE` supports:

- `mock`: always use the built-in mock dataset
- `sync-file`: try `data/players.json`, then fall back to mock if it is empty or invalid
- `auto`: same as `sync-file`, and is the recommended default during development

The app currently reads synced file data through:

- [lib/data/sync-file.ts](C:/Users/fkklw/Desktop/1.Project/25.PSNRank/lib/data/sync-file.ts)
- [lib/data/repository.ts](C:/Users/fkklw/Desktop/1.Project/25.PSNRank/lib/data/repository.ts)

## PSN Sync Skeleton

The sync skeleton uses Python and PSNAWP, reads NPSSO from `.env`, reads friend targets from `data/friends.json`, and writes the result to `data/players.json`.

Files involved:

- [scripts/psn_sync.py](C:/Users/fkklw/Desktop/1.Project/25.PSNRank/scripts/psn_sync.py)
- [data/friends.json](C:/Users/fkklw/Desktop/1.Project/25.PSNRank/data/friends.json)
- [data/players.json](C:/Users/fkklw/Desktop/1.Project/25.PSNRank/data/players.json)
- [requirements-sync.txt](C:/Users/fkklw/Desktop/1.Project/25.PSNRank/requirements-sync.txt)

### Install sync dependencies

```bash
pip install -r requirements-sync.txt
```

### Configure friends

Edit `data/friends.json`:

```json
{
  "friends": [
    { "onlineId": "NightRavenTW" },
    { "onlineId": "AstraRaid88" }
  ]
}
```

### Configure NPSSO locally

Add this to `.env` or `.env.local`:

```env
NPSSO_CODE=your_npsso_here
PSN_SYNC_MAX_FRIENDS=3
PSN_SYNC_MAX_TITLES_PER_FRIEND=3
```

### Run the sync

```bash
npm run sync:psn
```

or

```bash
python scripts/psn_sync.py
```

### Safety behavior

The script is intentionally conservative:

- it reads only the first `PSN_SYNC_MAX_FRIENDS` friends
- it reads only the first `PSN_SYNC_MAX_TITLES_PER_FRIEND` titles per friend
- it writes a mock-safe fallback file when NPSSO is missing or PSNAWP is unavailable
- it never writes tokens into the repo

This keeps the project usable before a full sync pipeline is ready and reduces the chance of sending too many PSN requests in one run.

## How To Get NPSSO

The PSNAWP documentation explains the login flow and NPSSO retrieval steps.

Recommended reference:

- [PSNAWP README](https://psnawp.readthedocs.io/en/stable/additional_resources/README.html)

The documented flow is:

1. Sign in to your PlayStation account on [My PlayStation](https://my.playstation.com/).
2. Open `https://ca.account.sony.com/api/v1/ssocookie` in another tab while still signed in.
3. Copy the returned `npsso` value.
4. Put that value into `NPSSO_CODE` locally or into a GitHub Actions secret.

Important:

- PSNAWP is an unofficial reverse-engineered wrapper.
- The PSNAWP docs explicitly warn against bulk or abusive request patterns.
- Consider using a dedicated account if you want extra risk separation.

## GitHub Actions Secret Setup

A safe workflow skeleton is included at:

- [\.github/workflows/psn-sync.yml](C:/Users/fkklw/Desktop/1.Project/25.PSNRank/.github/workflows/psn-sync.yml)

It currently supports manual runs through `workflow_dispatch`.

### Add the required secret

In GitHub:

1. Open the repository
2. Go to `Settings`
3. Go to `Secrets and variables` > `Actions`
4. Add a new repository secret named `NPSSO_CODE`
5. Paste your NPSSO value

Optional repository variables:

- `PSN_SYNC_MAX_FRIENDS`
- `PSN_SYNC_MAX_TITLES_PER_FRIEND`

The workflow creates a runtime `.env` file inside the runner and does not commit it back to the repository.

## Sync Output Shape

`data/players.json` stores:

- `generatedAt`
- `source`
- `requestBudget`
- `friends`
- `players`
- `games`
- `notes`

When the sync succeeds, it includes:

- player summaries shaped to the current front-end domain model
- per-title progress
- per-title trophy lists
- enough structured data for the current Next.js pages to read from file mode later

When the sync cannot run safely, it still writes a fallback payload so downstream tooling does not crash.

## Supabase Integration Plan

Supabase placeholders are already scaffolded in:

- [lib/supabase/config.ts](C:/Users/fkklw/Desktop/1.Project/25.PSNRank/lib/supabase/config.ts)
- [lib/supabase/browser.ts](C:/Users/fkklw/Desktop/1.Project/25.PSNRank/lib/supabase/browser.ts)
- [lib/supabase/server.ts](C:/Users/fkklw/Desktop/1.Project/25.PSNRank/lib/supabase/server.ts)

Suggested next step after the sync skeleton:

1. Create tables for `players`, `games`, `player_game_progress`, `player_snapshots`, and `sync_runs`
2. Add a server-side import path from `data/players.json` into Supabase
3. Replace the repository backend with a Supabase adapter while preserving route-level function signatures

Required env vars when you switch to Supabase:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## Deployment

This project is structured for Vercel deployment.

Basic flow:

1. Push the repo to GitHub
2. Import into Vercel
3. Add environment variables from `.env.example`
4. Deploy

No paid service is required for the current scaffold.
