import assert from 'node:assert/strict';
import test from 'node:test';
import { renderResponseMarkdown } from '../src/components/ember-circuit/response-markdown.ts';

test('rendered model Markdown supports headings, lists, tables and emphasis', () => {
  const html = renderResponseMarkdown('## Plan\n\n- **Check stock**\n\n| Item | Qty |\n|---|---|\n| Rice | 18 |');
  assert.match(html, /<h2>Plan<\/h2>/);
  assert.match(html, /<ul><li><strong>Check stock<\/strong><\/li><\/ul>/);
  assert.match(html, /<table>.*<td>Rice<\/td><td>18<\/td>/);
});

test('model HTML and link syntax never become executable HTML or URL attributes', () => {
  const html = renderResponseMarkdown('<img src=x onerror=alert(1)>\n\n[click](javascript:alert(1))');
  assert.doesNotMatch(html, /<img|href=/);
  assert.match(html, /&lt;img/);
  assert.match(html, /\[click\]\(javascript:alert\(1\)\)/);
});
