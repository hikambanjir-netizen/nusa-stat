// NusaStat dev server: serves app/ at http://localhost:8080
// (node serve.ts --port <n> for another port). Static files only.
import { createServer } from 'node:http';
import { existsSync, readFileSync } from 'node:fs';
import { extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(fileURLToPath(new URL('.', import.meta.url)), 'app');
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
};
const port = Number(process.argv.find((a) => a.startsWith('--port='))?.split('=')[1] ?? 8080);

createServer((req, res) => {
  const path = decodeURIComponent(req.url.split('?')[0]);
  const file = join(root, path === '/' ? 'index.html' : path);
  if (!file.startsWith(root) || !existsSync(file)) { res.writeHead(404); res.end('not found'); return; }
  res.writeHead(200, { 'content-type': mime[extname(file)] ?? 'application/octet-stream' });
  res.end(readFileSync(file));
}).listen(port, () => console.log(`NusaStat at http://localhost:${port}`));
