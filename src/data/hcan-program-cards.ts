// HCAN program cards — the structured payload for the HCAN Grammar Library
// (src/components/ember-circuit/HcanGrammarLibrary.tsx).
//
// Projection source: Hearth & Code Hub canonical article at
// internal/hearthandcode-knowledge-hub/14-projects-and-program-ledger/01-program-portfolio/0047-hcan-communication-medium-project-home/09-field-journal/0001-hcan-field-journal-article.md
//
// The canonical Hub article is the source of truth for the program lines,
// structured outputs, and the 8 example YAML blocks. The Hub article remains
// status: candidate / review-required / verified: false. This projection is
// published on the landing surface but the canonical review gate is unchanged.
// Section-by-section review_state is recorded at the top of each cluster.

export interface HcanPrimitive {
  symbol: string;
  name: string;
  purpose: string;
  example: string;
  nonexample: string;
}

export interface HcanProbeAnswer {
  probe: string;
  verdict: 'PASS' | 'FAIL' | 'UNKNOWN';
  reason: string;
}

export interface HcanFinding {
  claim: string;
  label:
    | '%evidence'
    | '%source'
    | '%inference'
    | '%proposal'
    | '%receipt'
    | '%unknown';
}

/** Card contract: the human's requested map() fields as content, wrapped by
 * discipline fields (source relation, falsifier, survival verdict, uncertainty,
 * epistemic label). Per the canonical generative protocol, the map() keys are
 * user-defined per example. We carry them as a free-form object plus the
 * discipline fields. */
export interface HcanExampleCard {
  /** User-defined map() content rendered in canonical key order. */
  content: Record<string, string>;
  /** Relation this card fuses from (discipline field). */
  relation?: string;
  /** Precedent this card draws on (discipline field, optional). */
  precedent?: string;
  /** Falsifier (discipline field). */
  falsifier?: string;
  /** Survival verdict: "survives" or "dies — <reason>". */
  verdict?: string;
  /** Epistemic label (discipline field). */
  label?: HcanFinding['label'];
}

/** Structured YAML shape rendered by HCANExampleYamlCard.
 * Mirrors the canonical block per example in the Hub article. */
export interface HcanExampleYamlOutput {
  /** Verbatim top-of-output echo (E01 only; canonical). Optional. */
  normalized?: string;
  findings?: HcanFinding[];
  cards?: HcanExampleCard[];
  probe_answers?: HcanProbeAnswer[];
  unknown_table?: Array<{ what: string; why: string; resolver: string }>;
  not_checked?: string;
  next?: string;
  safe_stop?: string;
  effects?: string;
}

export interface HcanExampleYaml {
  id: string;
  domain: string;
  title: string;
  protocol: 'analytical' | 'generative';
  program: string;
  output: HcanExampleYamlOutput;
}

export interface HcanExample {
  id: string;
  domain: string;
  title: string;
  program: string;
  protocol: 'analytical' | 'generative';
  /** Free-form findings / cards / probes for the tile and sheet view. */
  findings?: HcanFinding[];
  cards?: HcanExampleCard[];
  probe_answers: HcanProbeAnswer[];
  unknown_table?: Array<{ what: string; why: string; resolver: string }>;
  not_checked?: string;
  next?: string;
  effects?: string;
  /** Structured YAML record rendered by HCANExampleYamlCard. */
  yaml: HcanExampleYaml;
}

export interface HcanProtocolBenchmark {
  name: string;
  panels: number;
  dimensions: number;
  wins: number;
  losses: number;
  losses_named?: string[];
  strengths?: Array<{ dimension: string; hcan: number; prose: number }>;
}

export const hcanGrammar: HcanPrimitive[] = [
  {
    symbol: 'verb',
    name: 'verb',
    purpose:
      'what kind of work the program requests (inspect, synth, plan, compare, return, …). The verb selects the protocol automatically.',
    example: 'inspect @~/projects/my-app :Map',
    nonexample: 'do-the-thing @~/projects/my-app :Map  // unrecognised verb; the validator rejects',
  },
  {
    symbol: '@',
    name: 'binding',
    purpose:
      'anchor the program to a context or source — a directory, a file, or a comparison pair.',
    example: '@~/projects/my-app',
    nonexample: 'inspect ~/projects/my-app :Map  // missing @; the binding layer cannot resolve',
  },
  {
    symbol: ':',
    name: 'shape',
    purpose:
      'type the return — :Brief, :Map, :Vec<Card>, :Table, :SafeReturn, :Schema, :Spec, :Patch, :Question.',
    example: ':Vec<Card>',
    nonexample: 'inspect @~/projects/my-app Object  // not a closed shape; the runtime rejects',
  },
  {
    symbol: '->',
    name: 'flow',
    purpose: 'the route or transform — typically `map(fields...)` over the chosen shape.',
    example: '-> map(entry-points, exports, deps, framework)',
    nonexample: 'inspect @~/projects/my-app :Map -> everything  // unbounded flow; the protocol flags it',
  },
  {
    symbol: '?',
    name: 'probe',
    purpose: 'a check that must answer PASS, FAIL, or UNKNOWN before the run closes.',
    example: '?counterexample',
    nonexample: '?be-cool  // not a closed probe; the protocol rejects',
  },
  {
    symbol: '!',
    name: 'guard',
    purpose: 'a boundary that binds the whole run — !no-write, !no-send, !review, !no-git.',
    example: '!no-write',
    nonexample: '!override-scotts-seal  // guards state boundaries; they never grant authority',
  },
  {
    symbol: '%',
    name: 'label',
    purpose:
      'epistemic class on a claim — %source, %evidence, %inference, %proposal, %hypothesis, %receipt, %projection, %unknown.',
    example: '%inference',
    nonexample: '%probably  // not in the closed set; the validator rejects',
  },
  {
    symbol: 'hold until',
    name: 'suspend',
    purpose:
      'a fail-closed pause — the program does not proceed until the named predicate passes.',
    example: 'hold until tests-pass',
    nonexample: 'run-anyway  // not a closed suspend form; the protocol rejects',
  },
];

export const hcanProtocolOrder = ['verb', '@', ':', '->', '?', '!', '%', 'hold until'];

export const hcanExamples: HcanExample[] = [
  {
    id: 'E01',
    domain: 'software-development',
    title: 'TypeScript Project Orientation',
    program:
      'inspect @~/projects/my-app :Map -> map(entry-points,exports,deps,framework) ?gaps !no-write',
    protocol: 'analytical',
    findings: [
      { claim: 'Entry points: src/index.ts (library), src/cli.ts (bin)', label: '%evidence' },
      { claim: 'Exports: 14 named, 3 default, from src/index.ts', label: '%evidence' },
      { claim: 'Framework: Node.js with no web framework; likely a CLI/library', label: '%inference' },
    ],
    probe_answers: [
      {
        probe: '?gaps',
        verdict: 'UNKNOWN',
        reason: 'package.json lockfile not read; exact dependency versions unverified.',
      },
    ],
    not_checked: 'test files, CI config, README accuracy',
    next:
      'inspect @~/projects/my-app/package.json :Schema -> map(scripts,engines,type) ?gaps !no-write',
    effects: 'read-only — no files written, no git, no network',
    yaml: {
      id: 'E01',
      domain: 'software-development',
      title: 'TypeScript Project Orientation',
      program:
        'inspect @~/projects/my-app :Map -> map(entry-points,exports,deps,framework) ?gaps !no-write',
      protocol: 'analytical',
      output: {
        normalized:
          'inspect @~/projects/my-app :Map -> map(entry-points,exports,deps,framework) ?gaps !no-write',
        findings: [
          { claim: 'Entry points: src/index.ts (library), src/cli.ts (bin)', label: '%evidence' },
          { claim: 'Exports: 14 named, 3 default, from src/index.ts', label: '%evidence' },
          {
            claim: 'Framework: Node.js with no web framework; likely a CLI/library',
            label: '%inference',
          },
        ],
        probe_answers: [
          {
            probe: '?gaps',
            verdict: 'UNKNOWN',
            reason: 'package.json lockfile not read; exact dependency versions unverified',
          },
        ],
        not_checked: 'test files, CI config, README accuracy',
        next:
          'inspect @~/projects/my-app/package.json :Schema -> map(scripts,engines,type) ?gaps !no-write',
        effects: 'read-only — no files written, no git, no network',
      },
    },
  },
  {
    id: 'E02',
    domain: 'software-development',
    title: 'API Change Plan',
    program:
      'plan @~/projects/api-server :Spec -> map(change,files,tests,risk) ?feasibility !no-write !no-send',
    protocol: 'analytical',
    findings: [
      { claim: 'Breaking change: remove v1 /users endpoint, migrate to v2', label: '%proposal' },
      {
        claim: 'Files: src/routes/users.ts, src/middleware/auth.ts, tests/users.test.ts',
        label: '%evidence',
      },
      {
        claim: 'Risk: medium — v1 consumers must migrate; check access logs for usage',
        label: '%inference',
      },
    ],
    probe_answers: [
      {
        probe: '?feasibility',
        verdict: 'PASS',
        reason: 'change is additive to v2; v1 can be deprecated before removal.',
      },
    ],
    next:
      'plan @~/projects/api-server :Patch -> stage(diff) hold until tests-pass !no-write',
    effects: 'read-only — no files written, no git, no network',
    yaml: {
      id: 'E02',
      domain: 'software-development',
      title: 'API Change Plan',
      program:
        'plan @~/projects/api-server :Spec -> map(change,files,tests,risk) ?feasibility !no-write !no-send',
      protocol: 'analytical',
      output: {
        findings: [
          { claim: 'Breaking change: remove v1 /users endpoint, migrate to v2', label: '%proposal' },
          {
            claim: 'Files: src/routes/users.ts, src/middleware/auth.ts, tests/users.test.ts',
            label: '%evidence',
          },
          {
            claim: 'Risk: medium — v1 consumers must migrate; check access logs for usage',
            label: '%inference',
          },
        ],
        probe_answers: [
          {
            probe: '?feasibility',
            verdict: 'PASS',
            reason: 'change is additive to v2; v1 can be deprecated before removal',
          },
        ],
        next:
          'plan @~/projects/api-server :Patch -> stage(diff) hold until tests-pass !no-write',
        effects: 'read-only — no files written, no git, no network',
      },
    },
  },
  {
    id: 'E03',
    domain: 'business-management',
    title: 'Quarterly Goal Review',
    program:
      'review @~/quarterly-goals :Table -> map(goal,progress,blocker,owner) ?counterexample !review !no-write',
    protocol: 'analytical',
    findings: [
      { claim: 'Goal 1 (revenue): 68% of target; blocker: two enterprise deals delayed', label: '%evidence' },
      { claim: 'Goal 3 (hiring): 0% — no requisitions opened', label: '%evidence' },
    ],
    probe_answers: [
      {
        probe: '?counterexample',
        verdict: 'FAIL',
        reason: 'Goal 3 cannot be achieved this quarter — zero progress with 2 weeks remaining.',
      },
    ],
    unknown_table: [
      {
        what: 'enterprise deal close dates',
        why: 'not verifiable from goal document alone',
        resolver: 'check CRM pipeline',
      },
    ],
    next: 'inspect @~/crm/pipeline :Table -> map(deal,stage,close-date) ?currentness !no-write',
    effects: 'read-only — no files written, no git, no network',
    yaml: {
      id: 'E03',
      domain: 'business-management',
      title: 'Quarterly Goal Review',
      program:
        'review @~/quarterly-goals :Table -> map(goal,progress,blocker,owner) ?counterexample !review !no-write',
      protocol: 'analytical',
      output: {
        findings: [
          { claim: 'Goal 1 (revenue): 68% of target; blocker: two enterprise deals delayed', label: '%evidence' },
          { claim: 'Goal 3 (hiring): 0% — no requisitions opened', label: '%evidence' },
        ],
        probe_answers: [
          {
            probe: '?counterexample',
            verdict: 'FAIL',
            reason: 'Goal 3 cannot be achieved this quarter — zero progress with 2 weeks remaining',
          },
        ],
        unknown_table: [
          {
            what: 'enterprise deal close dates',
            why: 'not verifiable from goal document alone',
            resolver: 'check CRM pipeline',
          },
        ],
        next: 'inspect @~/crm/pipeline :Table -> map(deal,stage,close-date) ?currentness !no-write',
        effects: 'read-only — no files written, no git, no network',
      },
    },
  },
  {
    id: 'E04',
    domain: 'brand-strategy',
    title: 'Naming from Brand Relations',
    program: 'synth @~/brand-guide :Vec<Card> -> map(name,rationale,first-use) ?novelty !no-write',
    protocol: 'generative',
    cards: [
      {
        content: {
          name: 'Northlight',
          rationale:
            "combines the brand's guiding-principle relation with its clarity-of-vision relation",
          first_use: 'product line name for the analytics suite',
        },
        relation: 'guiding-principle + clarity-of-vision (from brand-guide values section)',
        falsifier: "if 'North' is already used by a competitor in the same vertical",
        verdict: 'survives',
        label: '%proposal',
      },
      {
        content: {
          name: 'Kindling',
          rationale: "the brand's warmth relation expressed as something that starts fires",
          first_use: 'community program name',
        },
        relation: 'warmth + growth (from brand-guide personality section)',
        falsifier: "if 'Kindling' is trademarked in the education space",
        verdict: 'survives',
        label: '%proposal',
      },
    ],
    probe_answers: [
      {
        probe: '?novelty',
        verdict: 'PASS',
        reason: "neither name appears in the brand guide's existing vocabulary",
      },
    ],
    yaml: {
      id: 'E04',
      domain: 'brand-strategy',
      title: 'Naming from Brand Relations',
      program: 'synth @~/brand-guide :Vec<Card> -> map(name,rationale,first-use) ?novelty !no-write',
      protocol: 'generative',
      output: {
        cards: [
          {
            content: {
              name: 'Northlight',
              rationale:
                "combines the brand's guiding-principle relation with its clarity-of-vision relation",
              first_use: 'product line name for the analytics suite',
            },
            relation: 'guiding-principle + clarity-of-vision (from brand-guide values section)',
            falsifier: "if 'North' is already used by a competitor in the same vertical",
            verdict: 'survives',
            label: '%proposal',
          },
          {
            content: {
              name: 'Kindling',
              rationale: "the brand's warmth relation expressed as something that starts fires",
              first_use: 'community program name',
            },
            relation: 'warmth + growth (from brand-guide personality section)',
            falsifier: "if 'Kindling' is trademarked in the education space",
            verdict: 'survives',
            label: '%proposal',
          },
        ],
        probe_answers: [
          {
            probe: '?novelty',
            verdict: 'PASS',
            reason: "neither name appears in the brand guide's existing vocabulary",
          },
        ],
      },
    },
  },
  {
    id: 'E05',
    domain: 'career',
    title: 'Tailored Cover Letter Claims',
    program:
      'synth @~/job-postings @~/my-resume :Vec<Card> -> map(tailored-claim,evidence,impact) ?counterexample !no-write',
    protocol: 'generative',
    cards: [
      {
        content: {
          tailored_claim: 'Led migration of 14-service monolith to event-driven architecture',
          evidence:
            "%source — resume: 'Architected transition from synchronous REST to async event bus'",
          impact:
            "reduced p99 latency 43%; matches posting requirement 'distributed systems experience'",
        },
        falsifier: 'if the posting actually wants greenfield distributed systems, not migration',
        verdict: 'survives',
        label: '%source',
      },
      {
        content: {
          tailored_claim: 'Built CI pipeline adopted by 6 teams',
          evidence:
            "%source — resume: 'Created shared CI templates reducing onboarding from 2 weeks to 3 days'",
          impact: "demonstrates the 'developer productivity' requirement",
        },
        falsifier: "if 'adopted by 6 teams' is aspirational not factual",
        verdict: 'dies — resume says "created templates"; "adopted by 6 teams" is inferred, not stated',
        label: '%source',
      },
    ],
    probe_answers: [
      {
        probe: '?counterexample',
        verdict: 'PASS',
        reason: 'one claim pruned for inflating resume evidence; kill reason preserved.',
      },
    ],
    yaml: {
      id: 'E05',
      domain: 'career',
      title: 'Tailored Cover Letter Claims',
      program:
        'synth @~/job-postings @~/my-resume :Vec<Card> -> map(tailored-claim,evidence,impact) ?counterexample !no-write',
      protocol: 'generative',
      output: {
        cards: [
          {
            content: {
              tailored_claim: 'Led migration of 14-service monolith to event-driven architecture',
              evidence:
                "%source — resume: 'Architected transition from synchronous REST to async event bus'",
              impact:
                "reduced p99 latency 43%; matches posting requirement 'distributed systems experience'",
            },
            falsifier: 'if the posting actually wants greenfield distributed systems, not migration',
            verdict: 'survives',
            label: '%source',
          },
          {
            content: {
              tailored_claim: 'Built CI pipeline adopted by 6 teams',
              evidence:
                "%source — resume: 'Created shared CI templates reducing onboarding from 2 weeks to 3 days'",
              impact: "demonstrates the 'developer productivity' requirement",
            },
            falsifier: "if 'adopted by 6 teams' is aspirational not factual",
            verdict:
              'dies because — resume says \'created templates\'; \'adopted by 6 teams\' is inferred, not stated',
            label: '%source',
          },
        ],
        probe_answers: [
          {
            probe: '?counterexample',
            verdict: 'PASS',
            reason: 'one claim pruned for inflating resume evidence; kill reason preserved',
          },
        ],
      },
    },
  },
  {
    id: 'E06',
    domain: 'knowledge-management',
    title: 'Roadmap Version Drift',
    program:
      'compare @~/docs/roadmap-v1 @~/docs/roadmap-v2 :Table -> map(added,removed,changed,drift) ?currentness !no-write',
    protocol: 'analytical',
    findings: [
      { claim: 'Added: Q3 data-pipeline redesign, Q4 mobile SDK', label: '%evidence' },
      { claim: "Removed: Q3 legacy-migration (was v1's top priority)", label: '%evidence' },
      {
        claim: 'Drift: priorities inverted — v1 was infrastructure-first, v2 is product-first',
        label: '%inference',
      },
    ],
    probe_answers: [
      {
        probe: '?currentness',
        verdict: 'UNKNOWN',
        reason: 'no indication which version is authoritative; v2 may be a draft.',
      },
    ],
    next: 'ask @~/docs/roadmap-v2 :Question -> map(which-is-authoritative,who-decided) !no-write',
    effects: 'read-only',
    yaml: {
      id: 'E06',
      domain: 'knowledge-management',
      title: 'Roadmap Version Drift',
      program:
        'compare @~/docs/roadmap-v1 @~/docs/roadmap-v2 :Table -> map(added,removed,changed,drift) ?currentness !no-write',
      protocol: 'analytical',
      output: {
        findings: [
          { claim: 'Added: Q3 data-pipeline redesign, Q4 mobile SDK', label: '%evidence' },
          { claim: "Removed: Q3 legacy-migration (was v1's top priority)", label: '%evidence' },
          {
            claim: 'Drift: priorities inverted — v1 was infrastructure-first, v2 is product-first',
            label: '%inference',
          },
        ],
        probe_answers: [
          {
            probe: '?currentness',
            verdict: 'UNKNOWN',
            reason: 'no indication which version is authoritative; v2 may be a draft',
          },
        ],
        next: 'ask @~/docs/roadmap-v2 :Question -> map(which-is-authoritative,who-decided) !no-write',
        effects: 'read-only',
      },
    },
  },
  {
    id: 'E07',
    domain: 'research',
    title: 'Novel Research Directions',
    program:
      'synth @~/research-notes :Vec<Card> -> map(assumption,limitation,new-direction) ?precedent ?falsifier !no-write !review',
    protocol: 'generative',
    cards: [
      {
        content: {
          assumption: 'agent memory must be persistent across sessions',
          limitation: 'persistent memory creates stale-context poisoning',
          new_direction:
            'session-scoped memory with explicit carry-forward tokens — only what the next session needs, nothing more',
        },
        falsifier:
          'if carry-forward tokens can be proven equivalent to full persistence for task completion, the scoping adds overhead without benefit',
        precedent:
          'check: session-scoped memory exists in some agent frameworks but has not been studied as a design principle',
        verdict: 'survives',
        label: '%proposal',
      },
    ],
    probe_answers: [
      {
        probe: '?precedent',
        verdict: 'UNKNOWN',
        reason: 'related work search not performed; direction may already exist in the literature.',
      },
      {
        probe: '?falsifier',
        verdict: 'PASS',
        reason: 'carry-forward-vs-persistence comparison is a runnable experiment.',
      },
    ],
    yaml: {
      id: 'E07',
      domain: 'research',
      title: 'Novel Research Directions',
      program:
        'synth @~/research-notes :Vec<Card> -> map(assumption,limitation,new-direction) ?precedent ?falsifier !no-write !review',
      protocol: 'generative',
      output: {
        cards: [
          {
            content: {
              assumption: 'agent memory must be persistent across sessions',
              limitation: 'persistent memory creates stale-context poisoning',
              new_direction:
                'session-scoped memory with explicit carry-forward tokens — only what the next session needs, nothing more',
            },
            falsifier:
              'if carry-forward tokens can be proven equivalent to full persistence for task completion, the scoping adds overhead without benefit',
            precedent:
              'check: session-scoped memory exists in some agent frameworks but has not been studied as a design principle',
            verdict: 'survives',
            label: '%proposal',
          },
        ],
        probe_answers: [
          {
            probe: '?precedent',
            verdict: 'UNKNOWN',
            reason: 'related work search not performed; direction may already exist in the literature',
          },
          {
            probe: '?falsifier',
            verdict: 'PASS',
            reason: 'carry-forward-vs-persistence comparison is a runnable experiment',
          },
        ],
      },
    },
  },
  {
    id: 'E08',
    domain: 'personal-productivity',
    title: 'Safe Return at Session End',
    program:
      'return @~/session :SafeReturn -> map(state,evidence,next,safe-stop) ?gaps !no-write',
    protocol: 'analytical',
    findings: [
      { claim: 'State: 3 of 5 planned sections completed; §04 and §05 deferred', label: '%evidence' },
      { claim: 'Evidence: validator 14/14 pass; 2 fixtures run; 1 AI ghost accepted', label: '%receipt' },
    ],
    probe_answers: [
      {
        probe: '?gaps',
        verdict: 'UNKNOWN',
        reason: 'python validator not run in this container; node twin evidence only.',
      },
    ],
    next:
      'inspect @~/next-session :Brief -> map(pending-1,pending-2,first-action) ?gaps !no-write',
    effects: 'read-only — session state summarized, not written',
    yaml: {
      id: 'E08',
      domain: 'personal-productivity',
      title: 'Safe Return at Session End',
      program:
        'return @~/session :SafeReturn -> map(state,evidence,next,safe-stop) ?gaps !no-write',
      protocol: 'analytical',
      output: {
        findings: [
          { claim: 'State: 3 of 5 planned sections completed; §04 and §05 deferred', label: '%evidence' },
          { claim: 'Evidence: validator 14/14 pass; 2 fixtures run; 1 AI ghost accepted', label: '%receipt' },
        ],
        probe_answers: [
          {
            probe: '?gaps',
            verdict: 'UNKNOWN',
            reason: 'python validator not run in this container; node twin evidence only',
          },
        ],
        next:
          'inspect @~/next-session :Brief -> map(pending-1,pending-2,first-action) ?gaps !no-write',
        safe_stop: 'stop here; nothing blocks other lanes; deferred items remain proposals',
        effects: 'read-only — session state summarized, not written',
      },
    },
  },
];

export const hcanProtocols: Array<{
  id: 'analytical' | 'generative';
  name: string;
  description: string;
  benchmark: HcanProtocolBenchmark;
}> = [
  {
    id: 'analytical',
    name: 'Analytical protocol',
    description:
      'Deploy-ready. For inspection, comparison, planning, and returns. Strict format: normalized program on line 1, findings with epistemic labels, an unknown table, a not-checked line, and a two-line close (next runnable HCAN + effects statement).',
    benchmark: {
      name: 'Analytical protocol benchmark',
      panels: 1,
      dimensions: 16,
      wins: 14,
      losses: 1,
      losses_named: ['Brevity — unknown table costs length, buys inspectability.'],
      strengths: [
        { dimension: 'Boundary discipline', hcan: 5.0, prose: 3.2 },
        { dimension: 'Verifiability', hcan: 4.4, prose: 3.8 },
        { dimension: 'Calibrated confidence', hcan: 4.8, prose: 3.4 },
      ],
    },
  },
  {
    id: 'generative',
    name: 'Generative protocol',
    description:
      "Structurally validated. For synthesis, design, transfer, and ideation. Card contract: each idea is a structured block with the human's requested map() fields as content, wrapped by mandatory discipline fields (source relation, falsifier, survival verdict, uncertainty, epistemic label). At least one card must fuse relations from two sources. Zero preamble.",
    benchmark: {
      name: 'Generative protocol benchmark',
      panels: 3,
      dimensions: 13,
      wins: 13,
      losses: 0,
    },
  },
];

export const hcanEnvelopeLayers = [
  { id: 'TITLE', name: 'TITLE', role: 'a one-line program name; the bridge from raw text to HCAN.' },
  { id: 'LEGEND', name: 'LEGEND', role: 'a grammar gloss any agent can read with no tooling installed.' },
  { id: 'SHAPES', name: 'SHAPES', role: 'shape definitions carried inline so a receiver does not need the registry.' },
  { id: 'RULES', name: 'RULES', role: 'number them: line order, probe verdicts, guard scope, fail-closed bindings.' },
  { id: 'LINES', name: 'LINES', role: 'the byte-identical validated HCAN lines.' },
];

export const hcanEvaluationLayers = [
  {
    id: 'llm-judge',
    name: 'LLM judge panel',
    method: 'same task, two arms (HCAN vs prose), blind A/B, cross-family judge, 16 dimensions per panel',
    question: 'is the output structurally better?',
  },
  {
    id: 'multi-judge',
    name: 'Multi-judge consensus',
    method: 'three judge models (different families), majority vote per dimension',
    question: 'is the result robust or single-judge noise?',
  },
  {
    id: 'human-disposition',
    name: 'Human disposition',
    method: 'blind tabbed comparison, pick preferred arm + reason',
    question: 'does the human who will use this actually want it?',
  },
];
