export type FeatureDispatch = {
  date: string;
  repository: string;
  title: string;
  summary: string;
  details: string[];
  evidence: string[];
  href: string;
};

/** Public-safe orientation summaries derived from repository history. */
export const featureDispatches: FeatureDispatch[] = [
  {
    date: '2026-10-02',
    repository: 'Pi–Ember Exocore · knowledge workbench',
    title: 'Research intake now has a durable path from source to return',
    summary: 'Recent commits join disk-backed PDF intake, retained originals, resumable summaries, and scoped memory work into a source-aware research route.',
    details: [
      'The document path is described as streaming through a bounded worker and sandbox, with generation qualified per source unit and promotion guarded by an admission route.',
      'The memory work adds a durable journal store, PostgreSQL integration coverage, and an original-source bridge. These are implementation records, not a claim that every memory workflow has been independently accepted.',
    ],
    evidence: ['5fc66b2c2', 'e82811f64', 'c923caee0', '6b28e238f'],
    href: '/workbench/',
  },
  {
    date: '2026-10-01',
    repository: 'Pi–Ember Exocore · web navigator',
    title: 'A recursive navigator gained a tested route into the command surface',
    summary: 'The navigator work adds bounded frontier and context handling, integration wiring, tool and command registration, and end-to-end fixtures.',
    details: [
      'The implementation history records 149 passing tests at the feature checkpoint, followed by integration and end-to-end coverage for routing the extension through the central command registry.',
      'That is evidence for the named local suite at that revision; it does not establish accuracy for arbitrary sites or later changes.',
    ],
    evidence: ['ac5f8b2ce', '09e33ce5d'],
    href: '/workbench/',
  },
  {
    date: '2026-09-30 → 2026-10-02',
    repository: 'Pi–Ember Exocore · interaction and dispatch',
    title: 'One typed command surface replaced a growing set of parallel routes',
    summary: 'The /exocore dispatcher was consolidated into eight typed categories, with argument completion, explicit registrations, compatibility handling, and tests around route effects.',
    details: [
      'A bounded-review command family renders typed forms, tracks stages in the TUI, and connects a worksheet prompt to the bounded review engine.',
      'Later reconciliation records add a registration manager, a safe command catalog, and a pseudo-terminal check for the host-shaped route. The Pi distribution remains distinct from Exocore’s runtime authority.',
    ],
    evidence: ['a96226e67', '7494cbcdc', '9671651cc', '02e912662', 'd33fb3cf1'],
    href: '/workbench/',
  },
  {
    date: '2026-09-27',
    repository: 'Exocore · STRATA semantic services',
    title: 'STRATA grew from a source-bound semantic IR into governed ontology views',
    summary: 'The Exocore history traces semantic IR placement, structured YAML/JSON/Markdown families, a native ontology kernel, RDF/SPARQL integration, and projections through governed views.',
    details: [
      'The ontology path adds standards-profiled parsing and query work, atomic storage, validation and entailment services, typed ontology workflows, and indexed views exposed through the API.',
      'The repository also records ontology slice and projection receipts. Those records support the specific tested transitions they describe; they do not by themselves establish universal semantic correctness.',
    ],
    evidence: ['773e654', '056f8a5', '11a3c66', '2454db9', 'a8b73ca', 'e00527b', 'e5b83a9'],
    href: '/workbench/',
  },
  {
    date: '2026-09-26 → 2026-09-27',
    repository: 'Exocore · STRATA storage and boundaries',
    title: 'A governed filesystem route connected native storage, a Pi bridge, and read-only FUSE',
    summary: 'The implementation sequence records a native Hub kernel, a typed local API, a local MCP bridge, replication and recovery, and a read-only dual-surface FUSE transport.',
    details: [
      'The layers keep import proposals and admission separate from publication. The history includes checkpoints for content-addressed intake, commit-bound legacy adaptation, and publication recovery.',
      'The STRATA evaluation work adds property models, protocol fuzz regressions, compatibility fixtures, soak coverage, and an exhaustive syscall check for the named FUSE boundary.',
    ],
    evidence: ['9ede414', '951d802', '902c652', '92d46c1', 'd71c3d9', '951e40d', '800867f', '04560f3', '51dbe95'],
    href: '/workbench/',
  },
  {
    date: '2026-09-27',
    repository: 'Exocore · native HCAN workbench',
    title: 'HCAN moved into a native editor surface with language-service support',
    summary: 'Commits record a local workbench editor and compiler inspector, a direct language service, and a default-off HCAN room in the desktop composition.',
    details: [
      'The workbench gained tutorial samples and a help surface; a later UI qualification lane focused on CodeMirror viewport, gutter, source alignment, and scroll behavior.',
      'This is a native application surface in the Exocore repository, separate from this public landing page and from Pi’s integration layer.',
    ],
    evidence: ['23cd3e1', '47b3762', '6913295', 'f574359', 'd9a1b2e'],
    href: '/hcan/',
  },
  {
    date: '2026-09-26 → 2026-09-27',
    repository: 'Exocore · workflow and TypeFlow',
    title: 'Workflow plans gained durable run records and a guarded execution seam',
    summary: 'The repository history follows workflow compilation into correlated run events, replay-safe event mapping, runtime-profile qualification, cancellation, and gated execution through a workroom boundary.',
    details: [
      'A TypeFlow slice executes one deterministic ready node atomically; the workflow readiness protocol makes execution eligibility explicit before a run proceeds.',
      'The profile-composer work adds a mount-ready TypeFlow Designer and a governed source-admission room. Commits distinguish static profile projections from authority-bearing runtime actions.',
    ],
    evidence: ['e4c5bd2', '6b64a33', '9df16d1', '358fdd5', 'e4ae1c4', 'fc8e6d2', 'cbc52a2'],
    href: '/workbench/',
  },
  {
    date: '2026-09-24 → 2026-09-27',
    repository: 'Exocore Sigil · checked language construction',
    title: 'Sigil’s staged work made quotation, binding, imports, and effects inspectable',
    summary: 'The HM01–HM08 sequence progresses from bounded quoted-schema readers and explicit dialects to scope-aware binding, deterministic locks, strict expression lowering, and typed workflow-fragment composition.',
    details: [
      'The editor/compiler path carries source identity into diagnostics, including imported-source locations and caller origins. Pack inspection exposes a read-only canonical lock and expansion view.',
      'Effectful fragment joins require explicit policy and a grant. The history includes targeted conformance and synthetic-task evidence; this should be read as a bounded compiler qualification record, not a blanket security claim.',
    ],
    evidence: ['877c0ff', 'b69afdb', '6e27d57', '14641a5', '0a43544', '39e6afa', 'ec8d7cf', '9e097ad', '74a1362', 'b3a3377', '8ec851b', '49aa7ca'],
    href: '/workbench/',
  },
  {
    date: '2026-09-27',
    repository: 'Exocore Sigil · ESS workflow qualification',
    title: 'A plain ESS workflow was rechecked against Sigil’s macro implementation',
    summary: 'The recorded workflow uses local canned reads in bounded cases and binds its observations to captured source, check, and build evidence.',
    details: [
      'This is an integration observation across an ESS-shaped workflow and the Sigil macro lane. It does not mean the standard was adopted or that every ESS profile runs through Sigil.',
    ],
    evidence: ['0abbd6a', 'e815706'],
    href: '/workbench/',
  },
  {
    date: '2026-09-28 → 2026-09-30',
    repository: 'Hearth & Code Hub · ESS research and assurance',
    title: 'ESS work connected typed architecture to independent implementation and evaluation seams',
    summary: 'The Hub history records an 18-primitive core, eight purpose families, eight cross-cutting families, composable domain profiles, and a staged formalization and validation program.',
    details: [
      'The formalization trail includes typed admission, decoder soundness, traversal fixtures, Lean/Rust/oracle/table comparison, property and mutation checks, and an empirical extraction study. A later integration record reports an IntegratedSession composition and a growing theorem count.',
      'These are source-history claims with bounded predicates. The ESS project home still describes itself as a candidate consolidation surface and says its records do not adopt ESS, admit Sigil, or authorize runtime effects.',
    ],
    evidence: ['72979d07', 'c3e9da11', '84da9822', '9030f2d4', '3a8d72f6', 'da273266', 'cd611683', '09ba719a', '2188641c'],
    href: '/programs/',
  },
];

export const ecosystemProposals = [
  { name: 'Evidence-carrying prompt runs', idea: 'Pair each reusable instruction with source pins, context-selection records, tool traces, evaluator results, and an honest return artifact.', firstProbe: 'Compare five tasks with plain prompts and five with the evidence envelope; measure missing-source and unsupported-claim rates.' },
  { name: 'Capability passports for agents', idea: 'Give each agent route a versioned passport describing available tools, data boundary, authority ceiling, measured task envelope, and retirement trigger.', firstProbe: 'Generate a passport from one local route and test whether a reviewer can predict every reachable effect.' },
  { name: 'Cross-surface semantic diff', idea: 'Show how one source concept changes as it moves through Hub contract, Sigil representation, STRATA service, Pi integration, and public explanation.', firstProbe: 'Trace one admission rule end to end and label every preserved, transformed, omitted, or unknown field.' },
  { name: 'Reversible workflow flight recorder', idea: 'Record state transitions, input digests, decisions, and compensating actions in a replayable local timeline without retaining unnecessary raw content.', firstProbe: 'Replay a synthetic workflow from its receipt and verify that the recovered state matches its declared stop point.' },
  { name: 'Counterexample garden', idea: 'Maintain small adversarial examples beside each formal contract so a definition’s boundary is exercised as the system evolves.', firstProbe: 'For one ESS predicate, add minimal positive, negative, boundary, and malformed cases; require each failure to name the violated clause.' },
  { name: 'Research frontier ledger', idea: 'Carry unresolved hypotheses, null results, counterevidence, and the next discriminating test as first-class research outputs.', firstProbe: 'Convert one completed investigation into a ledger and check whether a new reader can distinguish evidence from open explanation.' },
  { name: 'Provenance-aware context compiler', idea: 'Select bounded context by task need while retaining source identity, sensitivity, freshness, and transformation loss.', firstProbe: 'Compile two different task envelopes from the same source pack and compare both omissions and token costs.' },
  { name: 'Human control-plane simulator', idea: 'Let engineers model grants, gates, revocation, retries, and recovery before any workflow reaches a real provider or external service.', firstProbe: 'Simulate a revoked grant halfway through a multi-step plan and verify that only dependent transitions stop.' },
  { name: 'Proof-to-test bridge', idea: 'Link formal predicates to executable property tests, implementation locations, and the exact evidence receipts that qualify them.', firstProbe: 'Choose one theorem, map its assumptions to a Rust property test, and surface the gap if the implementation has a different domain.' },
  { name: 'Uncertainty-preserving search', idea: 'Rank retrieved records by source quality and contradiction visibility, and keep missing or stale sources visible in the answer route.', firstProbe: 'Use a fixed query set with deliberately conflicting revisions and assess whether the system exposes the conflict instead of averaging it away.' },
  { name: 'Agentic workbench observability without surveillance', idea: 'Expose workflow state, latency, cost, failures, and human gates while minimizing person-level tracking and avoiding behavioral profiling.', firstProbe: 'Build an aggregate local dashboard over synthetic runs and review whether it answers operational questions without identifying people.' },
  { name: 'Interoperability fixture commons', idea: 'Publish small, rights-cleared fixtures that test source binding, typed composition, effect grants, projection loss, and correction across systems.', firstProbe: 'Build one fixture that passes through Hub, Sigil, and Exocore without silently widening a field or authority boundary.' },
];
