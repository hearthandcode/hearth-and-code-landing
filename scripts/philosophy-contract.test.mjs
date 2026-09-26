import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { parse } from 'yaml';

const contract = parse(await readFile(new URL('../src/data/philosophy-page.yaml', import.meta.url), 'utf8'));
const publicRoutes = new Set([
  '/', '/philosophy/', '/philosophy/ai-literacy/', '/methods/', '/research/', '/portfolio/',
  '/dossier/', '/questions/', '/journal/', '/correspondence/',
]);

test('the Philosophy page contract has the expected bounded public shape', () => {
  assert.equal(contract.schema_version, 'hnc.public-page-contract.v1');
  assert.equal(contract.page.route, '/philosophy/');
  assert.equal(contract.principles.length, 3);
  assert.equal(contract.featured_position.preview.sections.length, 3);
  assert.ok(contract.featured_position.preview.boundary.length > 40);
  assert.equal(contract.throughlines.items.length, 3);
  assert.equal(contract.connections.items.length, 3);
});

test('only published Philosophy positions are public reading links', () => {
  const published = contract.position_ledger.entries.filter((entry) => entry.state === 'published');
  const held = contract.position_ledger.entries.filter((entry) => entry.state !== 'published');
  assert.equal(published.length, 1);
  assert.equal(published[0].href, '/philosophy/ai-literacy/');
  assert.ok(held.every((entry) => !('href' in entry)), 'developing and concept entries remain non-link records');
});

test('every contract action targets an existing local public route', () => {
  const routes = [
    contract.featured_position.href,
    ...contract.connections.items.map((item) => item.href),
    contract.return.primary_action.href,
    contract.return.secondary_action.href,
  ];
  for (const route of routes) assert.ok(publicRoutes.has(route), `${route} is an approved local route`);
});
