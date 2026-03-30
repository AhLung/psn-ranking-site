# AGENTS.md

## Purpose

This repository is a long-term product scaffold for PSN Rank, a PlayStation Trophy Tracker / PSN platinum leaderboard app.

Agents and contributors should treat it as an evolving product, not a disposable demo.

## Core Architecture

- App Router pages live in `app/`
- Reusable UI lives in `components/`
- shadcn-style base primitives live in `components/ui/`
- Domain types live in `types/domain.ts`
- The current data access boundary is `lib/data/repository.ts`
- Mock content lives in `lib/mock/`
- Future Supabase adapters live in `lib/supabase/`
- Future sync logic lives in `lib/sync/`

## Current Product Routes

- `/` dashboard
- `/players` player directory
- `/player/[id]` player detail
- `/compare/players` player comparison
- `/compare/games` game comparison

## Data Layer Rules

- Do not import mock files directly into route components unless there is a very strong reason.
- Prefer reading through `lib/data/repository.ts`.
- If you add Supabase or another backend, preserve the repository function signatures whenever possible.
- Keep derived ranking logic centralized so ranking rules do not drift across pages and API routes.

## UI Rules

- Maintain the dark, game-dashboard visual language.
- Keep first, second, and third place visually distinct.
- Mobile behavior matters as much as desktop behavior.
- Favor reusable sections and small display components over page-local duplication.
- If adding a new primitive, place it in `components/ui/` and keep the API consistent with shadcn patterns.

## API Rules

- API routes should return structured JSON with an `ok` flag.
- Sync endpoints must stay protected by secret-based authorization before real sync is enabled.
- Keep route handlers thin; business logic should live in `lib/`.

## Sync Rules

- `lib/sync/psn-sync.ts` is currently a scaffold, not a real PSN integration.
- When implementing real sync:
  - normalize raw provider data
  - write snapshots and progress records through the storage layer
  - log sync runs for observability
  - keep cron and manual sync flows using the same shared sync function

## Supabase Rules

- Put connection details behind the existing config helpers.
- Avoid scattering `process.env` usage across the app.
- Use server-side clients for privileged writes.
- Keep browser-side Supabase usage optional unless interactive features truly need it.

## Documentation

- Update `README.md` when routes, setup steps, or env requirements change.
- Update this file when architecture conventions change.

