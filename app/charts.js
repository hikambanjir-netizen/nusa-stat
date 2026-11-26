// NusaStat charts: small hand-rolled SVG charts, no library.
// Every chart is drawn from the numbers in data.js; nothing is fetched.

function esc(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function niceMax(values) {
  const max = Math.max(...values.map(Math.abs));
  if (max <= 0) return 1;
  const step = 10 ** Math.floor(Math.log10(max));
  return Math.ceil(max / step) * step;
}

function formatValue(value, unit) {
  if (unit === '%') return `${value.toFixed(2).replace(/\.?0+$/, '')}%`;
  if (Math.abs(value) >= 1000) return value.toLocaleString('en-US');
  return String(value);
}

// A line chart with one point per year. Years label the x axis.
export function lineChart({ years, values, unit, height = 240, highlightLast = true }) {
  const width = 640;
  const padL = 46, padR = 14, padT = 22, padB = 30;
  const min = Math.min(0, ...values);
  const max = niceMax(values);
  const span = max - min || 1;
  const x = (i) => padL + (i * (width - padL - padR)) / (values.length - 1);
  const y = (v) => padT + (1 - (v - min) / span) * (height - padT - padB);

  const gridLines = [0, 0.5, 1].map((f) => {
    const v = min + span * f;
    return `<line class="grid" x1="${padL}" y1="${y(v)}" x2="${width - padR}" y2="${y(v)}"/>` +
      `<text class="tick" x="${padL - 6}" y="${y(v) + 4}" text-anchor="end">${formatValue(v, unit)}</text>`;
  }).join('');

  const points = values.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  const dots = values.map((v, i) =>
    `<circle class="dot" cx="${x(i)}" cy="${y(v)}" r="${i === values.length - 1 && highlightLast ? 5 : 3.5}"/>` +
    `<text class="vlabel" x="${x(i)}" y="${y(v) - 9}" text-anchor="middle">${formatValue(v, unit)}</text>`
  ).join('');
  const yearLabels = years.map((yr, i) =>
    `<text class="tick" x="${x(i)}" y="${height - 8}" text-anchor="middle">${yr}</text>`
  ).join('');

  return `<svg class="chart" viewBox="0 0 ${width} ${height}" role="img" ` +
    `aria-label="Line chart, ${years[0]} to ${years[years.length - 1]}">` +
    gridLines +
    `<polyline class="line" points="${points}"/>` +
    dots + yearLabels +
    `</svg>`;
}

// A horizontal bar chart: label on the left, value at the bar end.
export function barChart({ rows, unit, height = 260, highlight = null }) {
  const width = 640;
  const padL = 190, padR = 64, padT = 8, rowH = 34;
  const h = Math.max(height, padT + rows.length * rowH + 8);
  const max = niceMax(rows.map((r) => r.value));
  const bars = rows.map((r, i) => {
    const top = padT + i * rowH;
    const w = Math.max(2, ((r.value / max) * (width - padL - padR)));
    const cls = highlight !== null && r.name === highlight ? 'bar hl' : 'bar';
    return `<text class="tick" x="${padL - 8}" y="${top + 20}" text-anchor="end">${esc(r.name)}</text>` +
      `<rect class="${cls}" x="${padL}" y="${top + 6}" width="${w.toFixed(1)}" height="18" rx="3"/>` +
      `<text class="vlabel" x="${padL + w + 7}" y="${top + 20}">${formatValue(r.value, unit)}</text>`;
  }).join('');
  return `<svg class="chart" viewBox="0 0 ${width} ${h}" role="img" aria-label="Bar chart">` +
    bars + `</svg>`;
}

// A compact vertical bar chart for a yearly series.
export function columnChart({ years, values, unit, height = 220 }) {
  const width = 640;
  const padL = 46, padR = 10, padT = 24, padB = 30;
  const min = Math.min(0, ...values);
  const max = niceMax(values);
  const span = max - min || 1;
  const slot = (width - padL - padR) / values.length;
  const barW = Math.min(56, slot * 0.55);
  const cols = values.map((v, i) => {
    const cx = padL + slot * i + slot / 2;
    const yZero = padT + (1 - (0 - min) / span) * (height - padT - padB);
    const yVal = padT + (1 - (v - min) / span) * (height - padT - padB);
    const top = Math.min(yVal, yZero);
    const hgt = Math.max(1, Math.abs(yVal - yZero));
    const cls = i === values.length - 1 ? 'bar hl' : 'bar';
    return `<rect class="${cls}" x="${(cx - barW / 2).toFixed(1)}" y="${top.toFixed(1)}" ` +
      `width="${barW}" height="${hgt.toFixed(1)}" rx="3"/>` +
      `<text class="vlabel" x="${cx}" y="${(v >= 0 ? top - 6 : top + hgt + 14)}" text-anchor="middle">${formatValue(v, unit)}</text>` +
      `<text class="tick" x="${cx}" y="${height - 8}" text-anchor="middle">${years[i]}</text>`;
  }).join('');
  return `<svg class="chart" viewBox="0 0 ${width} ${height}" role="img" ` +
    `aria-label="Column chart, ${years[0]} to ${years[years.length - 1]}">` +
    `<line class="axis" x1="${padL}" y1="${height - padB}" x2="${width - padR}" y2="${height - padB}"/>` +
    cols + `</svg>`;
}
