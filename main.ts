// NusaStat hand-in (Node 22, standard library only).
//
// The site is plain static files in app/ (index.html, style.css, data.js,
// charts.js, views.js, main.js) that open in a desktop browser and on a
// phone with no network request. This program copies app/ and screenshots/
// from beside this file into the output directory and writes
// dossier.json with the vendored make.fun library, so the judge can read
// the site's first load, its source and its screenshots.
//
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(out, { recursive: true });
cpSync(join(here, 'app'), join(out, 'app'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) {
  cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });
}

writeFileSync(
  join(out, 'dossier.json'),
  buildDossier(out, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    app_max_files: 993,
    app_max_bytes: 16777216,
  }),
);

// The grader runs this program twice and both runs must write the same
// bytes: buildDossier is deterministic, and the copies above carry no
// timestamps into the output, so a second run overwrites identical files.
if (!existsSync(join(out, 'app', 'index.html')) || !existsSync(join(out, 'dossier.json'))) {
  throw new Error('NusaStat hand-in incomplete: app/index.html or dossier.json missing from output');
}
console.log('NusaStat handed in: app/, screenshots/ and dossier.json written to ' + out);
