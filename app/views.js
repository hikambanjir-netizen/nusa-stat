// NusaStat views: one renderer per hash route. Each page is built from
// the figures in data.js and drawn with the charts in charts.js.

import {
  HEADLINE, SERIES, YEARS, ISLANDS, AGE_GROUPS, SECTORS,
  EMPLOYMENT_SECTORS, PROVINCES, TRADE, RELEASES, SOURCES,
} from './data.js';
import { lineChart, barChart, columnChart } from './charts.js';

function sourceLine(text) {
  return `<p class="source-note">Source: ${text}</p>`;
}

function kpiCards() {
  return `<ul class="kpis">` + HEADLINE.map((k) => `
    <li class="kpi">
      <div class="k-label">${k.label}</div>
      <div class="k-value">${k.value}</div>
      <div class="k-change">${k.change}</div>
      <p class="k-detail">${k.detail}</p>
      <p class="k-source">${k.source}</p>
    </li>`).join('') + `</ul>`;
}

function overview() {
  const releases = RELEASES.map((r) => `
    <li><time datetime="${r.date}">${r.date}</time><span>${r.title}</span><span class="tag">${r.topic}</span></li>`).join('');
  return `
  <div class="hero">
    <h1>Indonesia in numbers: <em>281.6 million people, one economy, 38 provinces.</em></h1>
    <p class="lede">NusaStat gathers the figures people actually look up — how many of us there are,
    how fast the economy grows, what work pays, what prices do — with the source and year
    printed next to every number.</p>
    <span class="updated">Updated November 2026 · Latest reference year 2024</span>
  </div>
  ${kpiCards()}
  <section>
    <h2>Five years at a glance</h2>
    <p class="section-sub">Pick a series — the chart and its note change with it.</p>
    <div class="panel">
      <div class="chart-controls" id="series-switch" role="group" aria-label="Choose a series">
        ${Object.keys(SERIES).slice(0, 5).map((key, i) =>
          `<button class="chip${i === 1 ? ' on' : ''}" data-series="${key}">${SERIES[key].label}</button>`).join('')}
      </div>
      <div id="series-chart"></div>
      <p class="panel-note" id="series-note"></p>
    </div>
  </section>
  <section>
    <div class="cols">
      <div class="panel">
        <h3>Where people live</h3>
        <p class="panel-note">Population by island group, 2024 (millions). Java holds more than half the country.</p>
        ${barChart({ rows: ISLANDS.map((i) => ({ name: i.name, value: i.population })), unit: 'm', highlight: 'Java' })}
        ${sourceLine(SOURCES.population + ', 2024.')}
      </div>
      <div class="panel">
        <h3>Latest releases</h3>
        <p class="panel-note">The newest publications behind these pages.</p>
        <ul class="release-list">${releases}</ul>
      </div>
    </div>
  </section>
  <section>
    <h2>Start exploring</h2>
    <p class="section-sub">Every section answers one question a visitor comes with.</p>
    <div class="cols">
      <div class="panel">
        <h3><a href="#/population">Population</a></h3>
        <p>How many people, how old they are, and which provinces they live in — 281.6 million in 2024, median age about 30.</p>
      </div>
      <div class="panel">
        <h3><a href="#/economy">Economy</a></h3>
        <p>GDP of Rp 22,139 trillion growing 5.03%, the sectors behind it, and a US$ 31 billion trade surplus.</p>
      </div>
      <div class="panel">
        <h3><a href="#/employment">Jobs</a></h3>
        <p>152 million people in the labour force, 4.91% unemployed, and where the jobs actually are.</p>
      </div>
      <div class="panel">
        <h3><a href="#/prices">Prices</a></h3>
        <p>Inflation of 1.57% in December 2024 — the lowest in years — and what five years of prices look like.</p>
      </div>
    </div>
  </section>`;
}

function population() {
  const rows = PROVINCES.map((p) => `
    <tr><td>${p.name}</td><td class="num">${p.population.toFixed(2)}</td><td class="num">${p.density.toLocaleString('en-US')}</td><td>${p.capital}</td></tr>`).join('');
  return `
  <div class="hero">
    <h1>Population: <em>281.6 million people</em></h1>
    <p class="lede">Indonesia is the world's fourth most populous country. Growth has slowed to about
    1% a year, the median age is near 30, and more than half the population lives on Java.</p>
  </div>
  <section>
    <div class="cols">
      <div class="panel">
        <h3>Population, 2020–2024</h3>
        <p class="panel-note">Millions of people, mid-year estimate.</p>
        ${lineChart({ years: YEARS, values: SERIES.population.values, unit: 'm' })}
        ${sourceLine(SERIES.population.note)}
      </div>
      <div class="panel">
        <h3>Age structure, 2024</h3>
        <p class="panel-note">Millions of people in each age band. The working-age bulge is the demographic dividend.</p>
        ${barChart({ rows: AGE_GROUPS.map((a) => ({ name: a.group, value: a.value })), unit: 'm', highlight: '25–54' })}
        ${sourceLine(SOURCES.population + ', 2024.')}
      </div>
    </div>
  </section>
  <section>
    <h2>Most populous provinces</h2>
    <p class="section-sub">Twelve provinces hold about four in five Indonesians. Density is people per km².</p>
    <div class="panel">
      <table class="data">
        <thead><tr><th>Province</th><th class="num">Population (m)</th><th class="num">Density</th><th>Capital</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
      ${sourceLine(SOURCES.population + ', 2024 mid-year estimates.')}
    </div>
  </section>
  <div class="callout"><p><strong>What this means:</strong> with 67% of the population of working age,
  Indonesia's challenge is jobs, not numbers — see <a href="#/employment">Jobs</a>.</p></div>`;
}

function economy() {
  const tradeRows = TRADE.map((t) => `
    <tr><td>${t.flow}</td><td class="num">US$ ${t.value.toFixed(1)} bn</td><td>${t.note}</td></tr>`).join('');
  return `
  <div class="hero">
    <h1>Economy: <em>Rp 22,139 trillion, growing 5.03%</em></h1>
    <p class="lede">The world's 16th largest economy kept growing above 5% in 2024, driven by household
    spending and manufacturing. GDP per head reached US$ 4,960.</p>
  </div>
  <section>
    <div class="cols">
      <div class="panel">
        <h3>Real GDP growth, 2020–2024</h3>
        <p class="panel-note">Percent per year. The 2020 contraction was the pandemic; growth has held above 5% since 2022.</p>
        ${columnChart({ years: YEARS, values: SERIES.growth.values, unit: '%' })}
        ${sourceLine(SERIES.growth.note)}
      </div>
      <div class="panel">
        <h3>What the economy makes</h3>
        <p class="panel-note">Share of GDP by sector, 2024 (%). Manufacturing is the largest single sector.</p>
        ${barChart({ rows: SECTORS.map((s) => ({ name: s.name, value: s.share })), unit: '%', highlight: 'Manufacturing' })}
        ${sourceLine(SOURCES.gdp + '.')}
      </div>
    </div>
  </section>
  <section>
    <h2>Trade in 2024</h2>
    <p class="section-sub">Exports outpaced imports for the fifth year running.</p>
    <div class="panel">
      <table class="data">
        <thead><tr><th>Flow</th><th class="num">Value</th><th>Note</th></tr></thead>
        <tbody>${tradeRows}</tbody>
      </table>
      ${sourceLine(SOURCES.trade + '.')}
    </div>
  </section>
  <div class="callout"><p><strong>GDP in context:</strong> at Rp 22,139 trillion the economy is roughly
  16th in the world by size — and about 8th by purchasing power. See <a href="#/prices">Prices</a> for what that growth meant at the shops.</p></div>`;
}

function employment() {
  return `
  <div class="hero">
    <h1>Jobs: <em>4.91% unemployed — the lowest in a decade</em></h1>
    <p class="lede">Of 152.11 million people in the labour force in August 2024, 144.64 million were
    working. But about 58 in 100 workers are informal — no contract, no protection.</p>
  </div>
  <section>
    <div class="cols">
      <div class="panel">
        <h3>Unemployment, 2020–2024</h3>
        <p class="panel-note">Open unemployment rate (%), August of each year.</p>
        ${lineChart({ years: YEARS, values: SERIES.unemployment.values, unit: '%' })}
        ${sourceLine(SERIES.unemployment.note)}
      </div>
      <div class="panel">
        <h3>Where people work</h3>
        <p class="panel-note">Share of all workers by sector, August 2024 (%). Agriculture still employs the most.</p>
        ${barChart({ rows: EMPLOYMENT_SECTORS.map((s) => ({ name: s.name, value: s.share })), unit: '%', highlight: 'Agriculture, forestry & fishing' })}
        ${sourceLine(SOURCES.labour + '.')}
      </div>
    </div>
  </section>
  <section>
    <h2>The labour force in August 2024</h2>
    <p class="section-sub">All figures from the National Labour Force Survey (Sakernas).</p>
    <div class="panel">
      <table class="data">
        <thead><tr><th>Measure</th><th class="num">People (m)</th><th>Note</th></tr></thead>
        <tbody>
          <tr><td>Labour force</td><td class="num">152.11</td><td>Working-age people working or looking for work</td></tr>
          <tr><td>Employed</td><td class="num">144.64</td><td>95.09% of the labour force</td></tr>
          <tr><td>Unemployed</td><td class="num">7.47</td><td>Open unemployment rate 4.91%</td></tr>
          <tr><td>Informal workers</td><td class="num">≈ 83.8</td><td>About 58% of all workers</td></tr>
        </tbody>
      </table>
      ${sourceLine(SOURCES.labour + '.')}
    </div>
  </section>`;
}

function prices() {
  return `
  <div class="hero">
    <h1>Prices: <em>inflation 1.57% — the calmest year since 2020</em></h1>
    <p class="lede">Consumer prices rose 1.57% in the year to December 2024, inside Bank Indonesia's
    1.5–3.5% target band and well below the 5.51% spike of 2022.</p>
  </div>
  <section>
    <div class="cols">
      <div class="panel">
        <h3>Inflation, 2020–2024</h3>
        <p class="panel-note">Consumer Price Index, December year-on-year (%).</p>
        ${columnChart({ years: YEARS, values: SERIES.inflation.values, unit: '%' })}
        ${sourceLine(SERIES.inflation.note)}
      </div>
      <div class="panel">
        <h3>Why 2022 spiked — and why it fell</h3>
        <p class="panel-note">The story in three sentences.</p>
        <ul class="tight">
          <li><strong>2022 — 5.51%:</strong> subsidised fuel prices were raised in September, pushing transport and food costs up at once.</li>
          <li><strong>2023 — 2.61%:</strong> the fuel shock faded from the year-on-year count and food supply steadied.</li>
          <li><strong>2024 — 1.57%:</strong> stable food prices and a firm rupiah kept the index inside target all year.</li>
        </ul>
        ${sourceLine(SOURCES.prices + '.')}
      </div>
    </div>
  </section>
  <section>
    <h2>Poverty fell with prices</h2>
    <p class="section-sub">When inflation eases, the poverty line — set by the cost of a basic basket — rises more slowly.</p>
    <div class="panel">
      ${lineChart({ years: YEARS, values: SERIES.poverty.values, unit: '%' })}
      <p class="panel-note">Poverty rate (%), September of each year: 10.19 → 8.57 over five years.</p>
      ${sourceLine(SERIES.poverty.note)}
    </div>
  </section>`;
}

function provinces() {
  return `
  <div class="hero">
    <h1>Provinces: <em>38 provinces, one table</em></h1>
    <p class="lede">Search for a province, sort by population or density, and click a row to see it
    in detail. Jakarta is the densest place in the country by far — nearly 16,000 people per km².</p>
  </div>
  <section>
    <div class="panel">
      <div class="table-tools">
        <input type="search" id="prov-search" placeholder="Search provinces — try “Java” or “Sulawesi”" aria-label="Search provinces">
        <span class="count" id="prov-count"></span>
      </div>
      <table class="data" id="prov-table">
        <thead><tr>
          <th><button class="sort" data-key="name">Province ↕</button></th>
          <th class="num"><button class="sort" data-key="population">Population (m) ↕</button></th>
          <th class="num"><button class="sort" data-key="density">Density ↕</button></th>
          <th>Capital</th>
        </tr></thead>
        <tbody id="prov-body"></tbody>
      </table>
      ${sourceLine(SOURCES.population + ', 2024 mid-year estimates. Click a row for detail.')}
      <div id="prov-detail" aria-live="polite"></div>
    </div>
  </section>`;
}

function about() {
  return `
  <div class="hero">
    <h1>Sources &amp; methods</h1>
    <p class="lede">Every figure on NusaStat names its source and year on the page where it appears.
    This page collects them in one place, and says what we did with them.</p>
  </div>
  <section>
    <h2>Where the numbers come from</h2>
    <div class="panel">
      <table class="data">
        <thead><tr><th>Topic</th><th>Publication</th><th>Publisher</th></tr></thead>
        <tbody>
          <tr><td>Population</td><td>Population estimates, 2020–2024</td><td>${SOURCES.population}</td></tr>
          <tr><td>Economy</td><td>National Accounts 2024</td><td>${SOURCES.gdp}</td></tr>
          <tr><td>Prices</td><td>Consumer Price Index, December 2024</td><td>${SOURCES.prices}</td></tr>
          <tr><td>Jobs</td><td>National Labour Force Survey, August 2024</td><td>${SOURCES.labour}</td></tr>
          <tr><td>Poverty</td><td>Poverty Profile, September 2024</td><td>${SOURCES.poverty}</td></tr>
          <tr><td>Trade</td><td>Foreign Trade Statistics 2024</td><td>${SOURCES.trade}</td></tr>
          <tr><td>GDP per capita</td><td>World Development Indicators 2024</td><td>${SOURCES.worldbank}</td></tr>
        </tbody>
      </table>
    </div>
  </section>
  <section>
    <h2>Methods &amp; limits</h2>
    <div class="panel">
      <ul class="tight">
        <li>Figures are rounded for display (for example 281.6 million people); the underlying values are the published ones.</li>
        <li>Growth rates are real (inflation-adjusted) unless labelled nominal.</li>
        <li>Provincial populations are mid-year estimates; density divides population by land area.</li>
        <li>Unemployment follows the ILO definition used by Sakernas: without work, available, and looking.</li>
        <li>Nothing on this site is fetched from the network — every figure is in the site's own files, so it works offline.</li>
      </ul>
    </div>
  </section>
  <div class="callout"><p><strong>Independence:</strong> NusaStat is an independent portal built for readers.
  It is not affiliated with Statistics Indonesia (BPS) or the World Bank, and it copies no other site's brand, text or images.</p></div>`;
}

export const VIEWS = { overview, population, economy, employment, prices, provinces, about };
