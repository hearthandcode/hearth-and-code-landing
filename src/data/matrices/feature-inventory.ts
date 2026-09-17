// Matrix 1: feature-inventory
import type { HcanMatrix } from './matrix-types';

export const canonicalFeatureInventory: HcanMatrix = {
  id: 'feature-inventory',
  title: 'HCAN Feature Inventory',
  columns: ['feature', 'category', 'status', 'description'],
  rows: [
    ['10 primitives', 'language', 'deployed', '@ bind, : shape, = define, -> flow, & join, | fork, ? probe, ! guard, %label, hold until'],
    ['24 base shapes', 'language', 'deployed', 'Brief, Map, Table, Schema, Spec, Plan, Patch, Receipt, Question, Lesson, Card, Gate, Projection, Proposal, EvidenceMap, SafeReturn, Return, Counterexample, Unknowns, Source, Evidence, Claim, Type, Kind'],
    ['8 type constructors', 'language', 'deployed', 'Option<T>, Result<T,E>, List<T>, Set<T>, Pair<A,B>, Vec<T,n>, Array<T>, MapOf<K,V>'],
    ['typed arrays', 'language', 'deployed', 'declare Name = [TypeA, TypeB, TypeC] \u2014 heterogeneous and nested'],
    ['where-refinements', 'language', 'deployed', ':Vec<Proposal> where form accepts symbol or keyword \u2014 constrains without claiming truth'],
    ['definitions', 'language', 'deployed', 'name = line \u2014 reusable, hygienic, validator-checked'],
    ['analytical protocol', 'protocol', 'deployed', 'strict format contract: program-line-1, labeled body, unknown table, two-line close'],
    ['generative protocol', 'protocol', 'deployed', 'card contract: map()-fields authoritative, discipline wrapping, fusion requirement'],
    ['verb routing', 'protocol', 'deployed', 'extension auto-selects analytical or generative based on leading verb'],
    ['portable envelope', 'protocol', 'deployed', 'TITLE\u2192LEGEND\u2192SHAPES\u2192RULES\u2192lines \u2014 runs in any skill-less agent'],
    ['validator (python)', 'tooling', 'deployed', 'standard-library-only, read-only, 14 fixtures'],
    ['validator (node twin)', 'tooling', 'deployed', 'identical predicates to python, runs in containers without python'],
    ['LSP server', 'tooling', 'deployed', 'completion, hover, diagnostics \u2014 stdio + TCP, per-connection sessions'],
    ['syntax highlighting', 'tooling', 'deployed', 'TextMate + highlight.js + vim + tokenizer library \u2014 one grammar, four renderers'],
    ['Pi extension', 'tooling', 'deployed', '/hcan-live (highlighted editor + AI ghost), /hcan-eval, /hcan-compose, /hcan-compare, /hcan-ai, /hcan-dir, /hcan-lex, /hcan navigator + 5 domain runners'],
    ['prompt templates', 'tooling', 'deployed', '9 slash commands with autocomplete hints and argument hints'],
    ['AI completion', 'tooling', 'deployed', 'intent comments seed LLM rounds; validator gate; one repair round; invalid lines never offered'],
    ['inline ghost completion', 'tooling', 'deployed', 'idle-push architecture (700ms); buffer pushed whole; validator-gated; dim inline rendering; Tab accepts'],
    ['directory autocomplete', 'tooling', 'deployed', '@ triggers fuzzy BFS directory scan with basename-aware ranking'],
    ['Docker deployment', 'tooling', 'deployed', 'LSP as a live, healthchecked TCP process with read-only hub mount'],
    ['32-section tutorial', 'docs', 'deployed', 'six parts: foundations, protocols, ideation, research, development, ESS domain mappings'],
    ['field journal article', 'docs', 'deployed', 'public-safe projection with 8 examples and Hermes rendering specs'],
  ],
};
