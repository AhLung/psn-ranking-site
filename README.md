# PSN Rank Public Frontend

This repository is the public frontend for a PlayStation Trophy Tracker / PSN platinum leaderboard site.

Its job is simple:

- read sanitized local data from `data/players.json`
- render a static dark dashboard for GitHub Pages
- fall back to built-in mock data only when `data/players.json` is missing, empty, or invalid

This repo does not fetch PlayStation data directly.

## Scope

The public site currently includes:

- hero dashboard
- top 3 podium
- full leaderboard
- recent progress teaser
- future sections for player comparison / game comparison / recent progress

## Repo Structure

```text
data/
  players.json
docs/
  data-contract.md
js/
  app.js
  data-source.js
  render.js
  sort.js
AGENTS.md
index.html
README.md
style.css
```

## Data Source Rule

The frontend reads only one external file:

- `data/players.json`

The data loading flow is:

1. `js/app.js` boots the page
2. `js/data-source.js` fetches `data/players.json`
3. if the file is missing, malformed, or has no valid players, the app uses built-in mock data
4. `js/render.js` renders the sanitized dataset

There are no scraping scripts, source-site fetchers, cookies, tokens, or private credentials in this repository.

## Local Development

Because the page fetches JSON, avoid opening `index.html` with `file://`.

Use a local static server instead. Example with Python:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000/
```

## GitHub Pages Deployment

This project is designed for static hosting.

Deployment notes:

- keep all asset paths relative
- keep `data/players.json` committed in the repo
- replace `data/players.json` with sanitized output from your private local pipeline before deploy
- no build step is required for the current structure

## Updating Data

This public repo should only receive already-sanitized JSON.

Recommended flow:

1. generate clean player data in a separate private project
2. overwrite `data/players.json` in this repo
3. commit and deploy the updated frontend

See `docs/data-contract.md` for the expected schema.
