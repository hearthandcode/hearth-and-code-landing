// HCAN syntax highlighter — projection surface for the Hearth & Code landing.
//
// Canonical source: Hearth & Code Hub, project 0047,
// internal/hearthandcode-knowledge-hub/14-projects-and-program-ledger/01-program-portfolio/0047-hcan-communication-medium-project-home/08-skill-projection/0007-hcan-syntax-highlighting/hcan-highlight.js
//
// The canonical tokenizer exports tokenize(text), PI_COLORS (token class →
// theme color mapping), and toHTML(segments). This module is a tight
// projection that keeps the eight token classes (verb, binding, shape, probe,
// guard, label, operator, base/ctor, number, comment) and the eight CSS class
// hooks (`.hcan-verb`, `.hcan-binding`, etc.) so a future swap of the
// canonical tokenizer is a re-export, not a rewrite.
//
// The canonical Hub article remains status: candidate / review-required /
// verified: false. The landing surface is a public-safe projection only.

export type HcanTokenKind =
  | 'verb'
  | 'binding'
  | 'shape'
  | 'probe'
  | 'guard'
  | 'label'
  | 'operator'
  | 'base'
  | 'ctor'
  | 'number'
  | 'comment'
  | 'plain';

export interface HcanToken {
  kind: HcanTokenKind;
  text: string;
}

const VERBS = new Set([
  'inspect',
  'synth',
  'plan',
  'compare',
  'review',
  'return',
  'ask',
  'orient',
  'sync',
]);

const SHAPES = new Set([
  'Brief',
  'Map',
  'Table',
  'Spec',
  'Patch',
  'Schema',
  'Question',
  'SafeReturn',
  'Vec',
  'Card',
]);

const LABELS = new Set([
  '%source',
  '%evidence',
  '%inference',
  '%proposal',
  '%hypothesis',
  '%receipt',
  '%projection',
  '%unknown',
]);

export function tokenize(text: string): HcanToken[] {
  const tokens: HcanToken[] = [];
  let i = 0;
  let buf = '';
  const flush = (kind: HcanTokenKind) => {
    if (buf) {
      tokens.push({ kind, text: buf });
      buf = '';
    }
  };

  while (i < text.length) {
    const ch = text[i];
    const rest = text.slice(i);

    // line comment `//`
    if (ch === '/' && text[i + 1] === '/') {
      flush('plain');
      const eol = text.indexOf('\n', i);
      const end = eol === -1 ? text.length : eol;
      tokens.push({ kind: 'comment', text: text.slice(i, end) });
      i = end;
      continue;
    }

    // verb — first token of the line
    if (buf === '' && /[a-z]/.test(ch)) {
      const wordMatch = rest.match(/^[a-z]+/);
      if (wordMatch) {
        const word = wordMatch[0];
        if (VERBS.has(word)) {
          tokens.push({ kind: 'verb', text: word });
          i += word.length;
          continue;
        }
      }
    }

    // binding marker `@`
    if (ch === '@') {
      flush('plain');
      const m = rest.match(/^@[^\s|,;)]+/);
      if (m) {
        tokens.push({ kind: 'binding', text: m[0] });
        i += m[0].length;
        continue;
      }
      tokens.push({ kind: 'plain', text: ch });
      i += 1;
      continue;
    }

    // shape marker `:`
    if (ch === ':') {
      flush('plain');
      const m = rest.match(/^:[A-Za-z][A-Za-z0-9_]*(<[A-Za-z0-9_, ]+>)?/);
      if (m) {
        tokens.push({ kind: 'shape', text: m[0] });
        i += m[0].length;
        continue;
      }
      tokens.push({ kind: 'plain', text: ch });
      i += 1;
      continue;
    }

    // probe `?`
    if (ch === '?' && /[a-z]/.test(text[i + 1] ?? '')) {
      flush('plain');
      const m = rest.match(/^\?[a-z-]+/);
      if (m) {
        tokens.push({ kind: 'probe', text: m[0] });
        i += m[0].length;
        continue;
      }
    }

    // guard `!`
    if (ch === '!' && /[a-z]/.test(text[i + 1] ?? '')) {
      flush('plain');
      const m = rest.match(/^![a-z-]+/);
      if (m) {
        tokens.push({ kind: 'guard', text: m[0] });
        i += m[0].length;
        continue;
      }
    }

    // label `%`
    if (ch === '%') {
      flush('plain');
      const m = rest.match(/^%[a-z]+/);
      if (m) {
        tokens.push({ kind: 'label', text: m[0] });
        i += m[0].length;
        continue;
      }
    }

    // shape base type after Vec<
    if (/^[A-Z][A-Za-z0-9_]*$/.test(buf + ch) && (buf === '<' || buf.endsWith('<') || /Vec<[A-Za-z0-9_, ]*$/.test(buf))) {
      buf += ch;
      i += 1;
      if (i >= text.length || !/[A-Za-z0-9_,]/.test(text[i])) {
        // close the type token
        if (buf.endsWith(',')) {
          tokens.push({ kind: 'ctor', text: buf.slice(0, -1) });
          tokens.push({ kind: 'plain', text: ',' });
          buf = '';
        } else {
          tokens.push({ kind: 'ctor', text: buf });
          buf = '';
        }
      }
      continue;
    }

    // standalone `Vec` and `Card` inside Vec<...>
    if ((buf === '<' || buf.endsWith('<')) && /Vec|Card/.test(ch)) {
      // handled by the combined match below
    }

    if (buf === '' || buf === '<' || buf.endsWith('<')) {
      const m = rest.match(/^Vec<[A-Za-z0-9_, ]+>/);
      if (m) {
        const inner = m[0].slice(4, -1);
        tokens.push({ kind: 'base', text: 'Vec' });
        tokens.push({ kind: 'plain', text: '<' });
        if (inner) tokens.push({ kind: 'ctor', text: inner });
        tokens.push({ kind: 'plain', text: '>' });
        i += m[0].length;
        continue;
      }
    }

    // operator
    if (ch === '-' && text[i + 1] === '>') {
      flush('plain');
      tokens.push({ kind: 'operator', text: '->' });
      i += 2;
      continue;
    }

    // number (rare in HCAN but the canonical allows it)
    if (/[0-9]/.test(ch) && (buf === '' || !/[a-zA-Z]/.test(buf.slice(-1)))) {
      flush('plain');
      const m = rest.match(/^[0-9]+/);
      if (m) {
        tokens.push({ kind: 'number', text: m[0] });
        i += m[0].length;
        continue;
      }
    }

    // whitespace: flush any pending word, emit as plain
    if (/\s/.test(ch)) {
      if (buf) {
        // classify the buffer as a Shape or plain
        if (SHAPES.has(buf)) tokens.push({ kind: 'shape', text: buf });
        else if (LABELS.has('%' + buf) || LABELS.has(buf)) tokens.push({ kind: 'label', text: buf });
        else tokens.push({ kind: 'plain', text: buf });
        buf = '';
      }
      tokens.push({ kind: 'plain', text: ch });
      i += 1;
      continue;
    }

    buf += ch;
    i += 1;
  }

  flush('plain');
  if (buf) {
    if (SHAPES.has(buf)) tokens.push({ kind: 'shape', text: buf });
    else if (LABELS.has(buf)) tokens.push({ kind: 'label', text: buf });
    else tokens.push({ kind: 'plain', text: buf });
  }

  return tokens;
}

export function toHtml(tokens: HcanToken[]): string {
  return tokens
    .map((t) => {
      if (t.kind === 'plain') return escapeHtml(t.text);
      return `<span class="hcan-${t.kind}">${escapeHtml(t.text)}</span>`;
    })
    .join('');
}

export function escapeHtml(s: string): string {
  return s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}
