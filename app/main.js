// NusaStat boot: hash router plus the two interactive widgets —
// the series switcher on the overview and the province table.

import { VIEWS } from './views.js';
import { SERIES, YEARS, PROVINCES } from './data.js';
import { lineChart } from './charts.js';

const app = document.getElementById('app');

// Overview: swap the chart when a series chip is picked.
function wireSeriesSwitcher() {
  const box = document.getElementById('series-switch');
  const chart = document.getElementById('series-chart');
  const note = document.getElementById('series-note');
  if (!box || !chart) return;
  const show = (key) => {
    const s = SERIES[key];
    chart.innerHTML = lineChart({ years: YEARS, values: s.values, unit: s.unit });
    note.textContent = `Source: ${s.note}`;
    box.querySelectorAll('.chip').forEach((c) => c.classList.toggle('on', c.dataset.series === key));
  };
  box.addEventListener('click', (event) => {
    const chip = event.target.closest('[data-series]');
    if (chip) show(chip.dataset.series);
  });
  show('growth');
}

// Provinces: live search, sortable columns, click a row for detail.
function wireProvinceTable() {
  const search = document.getElementById('prov-search');
  const body = document.getElementById('prov-body');
  const count = document.getElementById('prov-count');
  const detail = document.getElementById('prov-detail');
  const table = document.getElementById('prov-table');
  if (!search || !body) return;

  let sortKey = 'population';
  let sortDir = -1;
  let query = '';

  const render = () => {
    const q = query.trim().toLowerCase();
    let rows = PROVINCES.filter((p) => !q || p.name.toLowerCase().includes(q));
    rows = [...rows].sort((a, b) => {
      const av = a[sortKey], bv = b[sortKey];
      return (typeof av === 'string' ? av.localeCompare(bv) : av - bv) * sortDir;
    });
    body.innerHTML = rows.map((p) => `
      <tr data-name="${p.name}">
        <td>${p.name}</td>
        <td class="num">${p.population.toFixed(2)}</td>
        <td class="num">${p.density.toLocaleString('en-US')}</td>
        <td>${p.capital}</td>
      </tr>`).join('') || `<tr><td colspan="4">No province matches “${query}”.</td></tr>`;
    count.textContent = `${rows.length} of ${PROVINCES.length} provinces shown`;
  };

  search.addEventListener('input', () => { query = search.value; render(); });
  table.querySelectorAll('button.sort').forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.key;
      if (sortKey === key) { sortDir *= -1; } else { sortKey = key; sortDir = key === 'name' ? 1 : -1; }
      render();
    });
  });
  body.addEventListener('click', (event) => {
    const row = event.target.closest('tr[data-name]');
    if (!row) return;
    const p = PROVINCES.find((x) => x.name === row.dataset.name);
    if (!p) return;
    const share = ((p.population / 281.6) * 100).toFixed(1);
    detail.innerHTML = `<div class="callout"><p><strong>${p.name}</strong> — capital ${p.capital}. ` +
      `Population ${p.population.toFixed(2)} million (${share}% of Indonesia), ` +
      `density ${p.density.toLocaleString('en-US')} people per km² (BPS, 2024).</p></div>`;
  });
  render();
}

function route() {
  const name = (location.hash.replace(/^#\/?/, '') || 'overview').split('/')[0];
  const view = VIEWS[name] || VIEWS.overview;
  app.innerHTML = view();
  document.querySelectorAll('[data-nav]').forEach((a) =>
    a.classList.toggle('active', a.dataset.nav === name));
  document.title = `NusaStat — ${name === 'overview' ? 'Indonesia in Numbers' : name[0].toUpperCase() + name.slice(1)}`;
  wireSeriesSwitcher();
  wireProvinceTable();
  window.scrollTo(0, 0);
}

window.addEventListener('hashchange', route);
route();
