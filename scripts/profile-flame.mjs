#!/usr/bin/env node
/**
 * Headless flame profiler — captures ?profile=1 console output.
 * Ubuntu 26.04: export PLAYWRIGHT_HOST_PLATFORM_OVERRIDE=ubuntu24.04-x64
 */
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const port = 8765;

function startServer() {
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      const path = req.url?.split('?')[0] ?? '/';
      if (path === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(readFileSync(join(root, 'index.html')));
        return;
      }
      res.writeHead(404).end();
    });
    server.listen(port, '127.0.0.1', () => resolve(server));
  });
}

const logs = [];
const server = await startServer();

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  reducedMotion: 'no-preference',
  viewport: { width: 1280, height: 800 },
});
const page = await context.newPage();

page.on('console', (msg) => {
  const text = msg.text();
  if (text.includes('[hearth flame]')) logs.push(text);
});

await page.goto(`http://127.0.0.1:${port}/?profile=1`, { waitUntil: 'domcontentloaded', timeout: 15000 });
await page.waitForTimeout(5500);

let profile = await page.evaluate(() => window.__hearthProfile ?? null);

await browser.close();
server.close();

if (!profile && logs.length > 0) {
  const last = logs[logs.length - 1];
  const fps = last.match(/~(\d+(?:\.\d+)?) fps/);
  const ms = last.match(/~(\d+(?:\.\d+)?) ms work\/frame/);
  if (fps && ms) {
    profile = { fps: parseFloat(fps[1]), ms: parseFloat(ms[1]), fromLog: true };
  }
}

if (!profile) {
  console.error('No profile data captured.');
  if (logs.length) console.error('Console:', logs.join('\n'));
  console.error('Tips: ensure ?profile=1, animation not blocked, wait ≥5s.');
  process.exit(1);
}

const line = logs.at(-1) ?? `[hearth flame] ~${profile.fps.toFixed(0)} fps ~${profile.ms.toFixed(2)} ms work/frame`;
console.log('Flame profile (headless):');
console.log(line);

if (profile.fps >= 55 && profile.ms <= 2.5) {
  console.log('OK — within target (≥55 fps, ≤2.5 ms/frame).');
} else {
  console.log('WARN — below target (want ≥55 fps, ≤2.5 ms/frame).');
}
