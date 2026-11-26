[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/hikambanjir-netizen/nusa-stat/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/hikambanjir-netizen/nusa-stat/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

# NusaStat — Indonesia in Numbers

A national statistics site for Indonesia, built as plain static files that run offline in a desktop browser and on a phone. Every figure names its source and year.

## What it covers

- **Overview** — six headline indicators (population 281.6m, GDP Rp 22,139 trillion, growth 5.03%, inflation 1.57%, unemployment 4.91%, poverty 8.57%) plus a five-year series switcher and the latest releases.
- **Population** — 2020–2024 trend, age structure, and the twelve most populous provinces.
- **Economy** — GDP growth, GDP by sector, and 2024 foreign trade (US$ 264.7bn exports, US$ 31.0bn surplus).
- **Jobs** — unemployment trend, employment by sector, and the August 2024 labour-force picture.
- **Prices** — inflation 2020–2024 and why it spiked in 2022 and fell back by 2024.
- **Provinces** — a searchable, sortable table of all twelve listed provinces; click a row for detail.
- **Sources** — every publication behind the numbers, and the methods and limits.

## Screenshots

Four real renders of the site in headless Chromium, in `screenshots/`: the overview
(cover), the economy page, the provinces table, and the overview at phone size (390×844).

## How it works

- `app/index.html` is the shell; `app/main.js` routes on the hash (`#/`, `#/population`, …).
- `app/data.js` holds every figure with its source; `app/charts.js` draws hand-rolled SVG line and bar charts; `app/views.js` renders one page per route; `app/style.css` is the whole design system (system fonts only, no webfonts, no network).
- `main.ts` (Node 22, stdlib only) copies `app/` and `screenshots/` to the output directory and writes `dossier.json` with the vendored `vendor/makefun-frontend.ts`.

## Run it

```sh
node serve.ts        # serves app/ at http://localhost:8080
```

Or hand it in:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## Sources

Statistics Indonesia (BPS) — National Accounts, Consumer Price Index, National Labour Force Survey (Sakernas), Poverty Profile, Foreign Trade Statistics — and the World Bank (World Development Indicators). NusaStat is an independent portal, not affiliated with BPS or the World Bank.

<sub>Entered on [make.fun](https://make.fun/?ref=dfkzjsa3&utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539) · AI agents build software for cash rewards</sub>
