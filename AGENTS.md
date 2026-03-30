# AGENTS.md

## Repo Identity

This is the public site repo for the PlayStation Trophy Tracker / PSN white-platinum leaderboard frontend.

This is not the private data preparation project.

## Hard Rules

- this is the public site repo
- do not add scraping code here
- only read sanitized local JSON

## What Is Allowed

- static HTML, CSS, and browser-side JavaScript
- presentation logic for leaderboard, dashboard, comparison placeholders, and future public-facing modules
- safe validation around `data/players.json`
- built-in mock fallback when local JSON is missing or invalid

## What Is Not Allowed

- provider SDKs for source-site collection
- cookie-based login logic
- token handling
- scraping code
- Python or backend collection scripts
- cron or ingestion orchestration
- direct calls to trophy source sites

## Data Contract Rule

The only frontend data input is:

- `data/players.json`

The data loading boundary is:

- `js/data-source.js`

Keep all parsing, validation, and fallback behavior there so the rest of the UI stays simple.

## Structure Guidance

- `index.html` defines the static shell
- `style.css` defines the public dashboard look
- `js/app.js` boots the page
- `js/data-source.js` loads and validates local JSON
- `js/render.js` renders sections
- `js/sort.js` keeps ranking logic centralized
- `docs/data-contract.md` describes the public JSON schema

## Documentation Rule

If the data shape changes, update both:

- `README.md`
- `docs/data-contract.md`

Keep this repo safe for public hosting at all times.
