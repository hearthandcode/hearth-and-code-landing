// HCAN tokenizer - ES-module port of the canonical hcan-highlight.js
// (Hub project 0047, 08-skill-projection/0007-hcan-syntax-highlighting).
// Zero-dependency. Token classes are stable:
// verb, hold, label, binding, shape, operator, probe, guard, op,
// base, ctor, number, comment, plain.

export interface HcanSegment {
  cls: string;
  text: string;
}

const RULES: Array<{ cls: string; re: RegExp }> = [
  { cls: 'comment', re: /^\s*#.*/ },
  { cls: 'verb', re: /\b(orient|inspect|locate|compare|trace|synth|transfer|design|draft|review|test|plan|repair|return|learn|ask|recover|declare)\b/g },
  { cls: 'hold', re: /\bhold\s+until\b/g },
  { cls: 'label', re: /%(source|evidence|inference|hypothesis|proposal|projection|receipt|unknown)\b/g },
  { cls: 'binding', re: /@[A-Za-z0-9_./#+\-\[\]~&|]+/g },
  { cls: 'shape', re: /:(?:[A-Za-z][A-Za-z0-9_|&<>,.\[\]-]*)(?:\s+where\s(?:(?!\s->\s).)*)?/g },
  { cls: 'operator', re: /\s->\s|&|\||=|,/g },
  { cls: 'probe', re: /\?[A-Za-z][A-Za-z0-9_-]*/g },
  { cls: 'guard', re: /![A-Za-z][A-Za-z0-9_-]*/g },
  { cls: 'op', re: /\b[A-Za-z][A-Za-z0-9_-]*(?=\()/g },
  { cls: 'base', re: /\b(Brief|Map|Table|Schema|Spec|Plan|Patch|Receipt|Question|Lesson|Card|Gate|Projection|Proposal|EvidenceMap|SafeReturn|Return|Counterexample|Unknowns|Source|Evidence|Claim|Type|Kind)\b/g },
  { cls: 'ctor', re: /\b(Option|Result|List|Set|Pair|Vec|Array|MapOf|declare)\b/g },
  { cls: 'number', re: /\b\d+\b/g },
];

export function tokenizeLine(line: string): HcanSegment[] {
  const taken = new Array(line.length).fill(null);
  const hits: Array<{ start: number; end: number; cls: string; text: string }> = [];
  for (const rule of RULES) {
    rule.re.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = rule.re.exec(line)) !== null) {
      const s = m.index;
      const e = m.index + m[0].length;
      let free = true;
      for (let i = s; i < e; i++) {
        if (taken[i]) { free = false; break; }
      }
      if (free) {
        for (let i = s; i < e; i++) taken[i] = rule.cls;
        hits.push({ start: s, end: e, cls: rule.cls, text: m[0] });
      }
      if (m.index === rule.re.lastIndex) rule.re.lastIndex++;
    }
  }
  hits.sort((a, b) => a.start - b.start);
  const segments: HcanSegment[] = [];
  let pos = 0;
  for (const h of hits) {
    if (h.start > pos) segments.push({ cls: 'plain', text: line.slice(pos, h.start) });
    segments.push({ cls: h.cls, text: h.text });
    pos = h.end;
  }
  if (pos < line.length) segments.push({ cls: 'plain', text: line.slice(pos) });
  return segments;
}

export function tokenize(text: string): HcanSegment[][] {
  return String(text).split('\n').map(tokenizeLine);
}
