#!/usr/bin/env node
/**
 * generate-knowledge-tiles.mjs - Generates showcase tiles for all 64 knowledge components
 * Uses Astro attribute syntax (attr="value") not JSX object syntax.
 */

const ATOMS = [
  { name: 'Citation Ref', id: 'k-citation-ref', import: 'CitationRef', props: () => ({
    author: 'Rallya', year: 2026, locator: 'p.42',
  }) },
  { name: 'Concept Term', id: 'k-concept-term', import: 'ConceptTerm', props: () => ({
    term: 'Provenance', type: 'noun', definition: 'The documented chain of evidence for a claim.',
  }) },
  { name: 'Severity Dot', id: 'k-severity-dot', import: 'SeverityDot', props: () => ({
    severity: 'critical', label: 'Critical', pulsing: true,
  }) },
  { name: 'Provenance Marker', id: 'k-provenance-marker', import: 'ProvenanceMarker', props: () => ({
    kind: 'verified', source: 'Independent reviewer',
  }) },
  { name: 'Timestamp', id: 'k-timestamp', import: 'TimestampAtom', props: () => ({
    iso: '2026-09-26T10:30:00Z', relative: '2 hours ago',
  }) },
  { name: 'Status Pill', id: 'k-status-pill', import: 'StatusPill', props: () => ({
    status: 'sealed', label: 'Sealed',
  }) },
  { name: 'License Icon', id: 'k-license', import: 'LicenseIcon', props: () => ({
    license: 'CC-BY',
  }) },
  { name: 'DOI Link', id: 'k-doi-link', import: 'DOILink', props: () => ({
    doi: '10.1234/example.2026.001',
  }) },
  { name: 'Hash Digest', id: 'k-hash-digest', import: 'HashDigest', props: () => ({
    hash: '7d4f8e2a1b9c5d6e3f8a2b1c9d4e5f8a2b1c9d4e5f8a2b1c9d4e5f8a2b1c9d4e', algorithm: 'sha256',
  }) },
  { name: 'Path Segment', id: 'k-path-segment', import: 'PathBreadcrumb', props: () => ({
    segment: 'knowledge/atoms', icon: 'folder',
  }) },
  { name: 'Confidence Bar', id: 'k-confidence-bar', import: 'ConfidenceBar', props: () => ({
    value: 75, variant: 'high', showValue: true,
  }) },
  { name: 'Language Tag', id: 'k-language-tag', import: 'LanguageTag', props: () => ({
    language: 'typescript',
  }) },
  { name: 'Reviewer Chip', id: 'k-reviewer-chip', import: 'ReviewerChip', props: () => ({
    name: 'Scott Rallya', role: 'Architect', decision: 'approved',
  }) },
  { name: 'Evidence Strength', id: 'k-evidence-strength', import: 'EvidenceStrength', props: () => ({
    tier: 'conclusive',
  }) },
  { name: 'Claim Marker', id: 'k-claim-marker', import: 'ClaimMarker', props: () => ({
    index: 1, confidence: 92,
  }) },
  { name: 'Relation Verb', id: 'k-relation-verb', import: 'RelationVerb', props: () => ({
    verb: 'is-a', direction: 'forward',
  }) },
];

const COMPOSITES = [
  { name: 'Citation Chain', id: 'k-citation-chain', import: 'CitationChain', props: () => ({
    citations: [
      { author: 'Rallya', year: 2026, locator: 'p.42' },
      { author: 'Dennett', year: 1991, locator: 'ch.3' },
      { author: 'Popper', year: 1959, locator: 'ch.1' },
    ],
    label: 'Source chain',
  }) },
  { name: 'Concept Card', id: 'k-concept-card', import: 'ConceptCard', props: () => ({
    term: 'Provenance',
    definition: 'The documented origin and chain of custody for a claim or artifact.',
    type: 'Noun',
    relations: [
      { verb: 'is-a', target: 'evidence' },
      { verb: 'part-of', target: 'auditability' },
    ],
    source: 'Hearth & Code vocabulary',
  }) },
  { name: 'Synthesis Summary', id: 'k-synthesis-summary', import: 'SynthesisSummary', props: () => ({
    title: 'Cross-source synthesis',
    claims: [
      { text: 'Token-driven design systems reduce maintenance cost.', sources: [{ author: 'Rallya', year: 2026 }, { author: 'Frost', year: 2016 }], confidence: 88 },
      { text: 'Component isolation enables independent reuse.', sources: [{ author: 'Atomic Design', year: 2016 }], confidence: 75 },
    ],
    consensus: 82,
  }) },
  { name: 'Taxonomy Tree', id: 'k-taxonomy-tree', import: 'TaxonomyTree', props: () => ({
    root: {
      id: 'r', label: 'Knowledge', description: 'Top-level domain',
      children: [
        { id: 'a', label: 'Atoms', description: 'Single-purpose primitives' },
        { id: 'b', label: 'Composites', description: 'Composed elements', children: [
          { id: 'b1', label: 'Cards' },
          { id: 'b2', label: 'Navigation' },
        ] },
        { id: 'c', label: 'Templates', description: 'Page compositions' },
      ],
    },
    initiallyExpanded: 1,
  }) },
  { name: 'Ontology Relation', id: 'k-ontology-relation', import: 'OntologyRelation', props: () => ({
    subject: 'EvidenceReceipt', subjectType: 'Class',
    verb: 'part-of',
    object: 'AuditPackage', objectType: 'Aggregate',
  }) },
  { name: 'Glossary Index', id: 'k-glossary-index', import: 'GlossaryIndex', props: () => ({
    entries: [
      { term: 'Atom', definition: 'A single-purpose primitive component.' },
      { term: 'Composite', definition: 'A component composed of atoms.', seeAlso: ['Molecule'] },
      { term: 'Template', definition: 'A page-level composition of components.' },
    ],
  }) },
  { name: 'Workflow State', id: 'k-workflow-state', import: 'WorkflowState', props: () => ({
    states: ['Draft', 'Review', 'Approved', 'Sealed', 'Retired'],
    current: 'Review',
    transitions: [
      { to: 'Draft', label: 'Send back' },
      { to: 'Approved', label: 'Approve' },
      { to: 'Sealed', label: 'Seal', requires: 'all-gates' },
    ],
  }) },
  { name: 'Run Log', id: 'k-run-log', import: 'RunLog', props: () => ({
    entries: [
      { timestamp: '10:30:01', severity: 'info', source: 'system', message: 'Service started' },
      { timestamp: '10:30:05', severity: 'success', source: 'deploy', message: 'Build complete' },
      { timestamp: '10:31:22', severity: 'caution', source: 'db', message: 'Connection pool at 80%' },
      { timestamp: '10:35:00', severity: 'error', source: 'auth', message: 'Token validation failed' },
    ],
  }) },
  { name: 'Deployment Status', id: 'k-deployment-status', import: 'DeploymentStatus', props: () => ({
    environments: [
      { name: 'production', status: 'live', version: '2026.09.26', lastDeploy: '2h ago', health: 'healthy' },
      { name: 'staging', status: 'live', version: '2026.09.26', lastDeploy: '3h ago', health: 'healthy' },
      { name: 'dev', status: 'building', version: '2026.09.26', lastDeploy: 'building', health: 'healthy' },
    ],
  }) },
  { name: 'ADR Card', id: 'k-adr-card', import: 'ADRCard', props: () => ({
    number: '0042', title: 'Adopt token-driven design system',
    status: 'accepted', date: '2026-09-15',
    context: 'We need a consistent visual language across all surfaces.',
    decision: 'Build a token-driven system with 64 components in 4 layers.',
    consequences: ['Higher upfront cost', 'Faster iteration later', 'Easier brand evolution'],
  }) },
  { name: 'Project Status', id: 'k-project-status', import: 'ProjectStatus', props: () => ({
    name: 'Ember Circuit', owner: 'SR', status: 'on-track', progress: 84, lastActivity: '1h ago',
    nextMilestone: 'v1.0 launch · Oct 15',
  }) },
  { name: 'Task Hierarchy', id: 'k-task-hierarchy', import: 'TaskHierarchy', props: () => ({
    tasks: [
      { id: 't1', title: 'Wave 3: Templates', owner: 'SR', status: 'in-progress', children: [
        { id: 't1a', title: 'Hero variants', status: 'done' },
        { id: 't1b', title: 'Section variants', status: 'in-progress' },
        { id: 't1c', title: 'Layout variants', status: 'todo' },
      ] },
      { id: 't2', title: 'Gallery page', status: 'review' },
    ],
    initiallyExpanded: true,
  }) },
  { name: 'Policy Card', id: 'k-policy-card', import: 'PolicyCard', props: () => ({
    id: 'POL-003', title: 'Provenance Required',
    statement: 'Every consequential claim must cite its source.',
    effectiveDate: '2026-01-01', scope: 'All published material',
    owner: 'Studio', status: 'active',
  }) },
  { name: 'Compliance Status', id: 'k-compliance-status', import: 'ComplianceStatus', props: () => ({
    framework: 'Hearth-Code Charter',
    controls: [
      { id: 'C-01', name: 'Source citation', status: 'pass', evidence: 'auto-check', lastChecked: 'today' },
      { id: 'C-02', name: 'Token-driven styles', status: 'pass', evidence: 'auto-check', lastChecked: 'today' },
      { id: 'C-03', name: 'WCAG AA contrast', status: 'pending', evidence: 'manual', lastChecked: '2d ago' },
    ],
  }) },
  { name: 'Human Gate', id: 'k-human-gate', import: 'HumanGate', props: () => ({
    id: 'G-0042', name: 'Production deploy approval',
    description: 'Reviewer approves production deployment.',
    reviewer: 'Scott Rallya', reviewerRole: 'Architect',
    decision: 'approved', sealedAt: '2026-09-26',
    criteria: ['All tests pass', 'Tokens validated', 'Documentation complete'],
  }) },
  { name: 'Source Chain', id: 'k-source-chain', import: 'SourceChain', props: () => ({
    root: {
      id: 'root', label: 'Primary source', author: 'Original', year: 1991, provenance: 'primary',
      children: [
        { id: 'cited1', label: 'Cited in review', author: 'Reviewer A', year: 2020, provenance: 'cited' },
        { id: 'derived', label: 'Derived finding', author: 'Rallya', year: 2026, provenance: 'derived' },
      ],
    },
  }) },
  { name: 'Evidence Receipt', id: 'k-evidence-receipt', import: 'EvidenceReceipt', props: () => ({
    id: 'EV-001', type: 'document',
    description: 'Original signed charter establishing the studio.',
    hash: '7d4f8e2a1b9c5d6e3f8a2b1c9d4e5f8a2b1c9d4e5f8a2b1c9d4e5f8a2b1c9d4e',
    timestamp: '2026-01-15T12:00:00Z', witness: 'SR', locator: 'vault://charter.pdf',
  }) },
  { name: 'Version Diff', id: 'k-version-diff', import: 'VersionDiff', props: () => ({
    before: {
      version: '2026.09.20', lines: [
        { kind: 'context', text: 'function validate() {' },
        { kind: 'removed', text: '  return false;' },
        { kind: 'context', text: '}' },
      ],
    },
    after: {
      version: '2026.09.26', lines: [
        { kind: 'context', text: 'function validate() {' },
        { kind: 'added', text: '  return check() && audit();' },
        { kind: 'context', text: '}' },
      ],
    },
  }) },
  { name: 'Audit Trail', id: 'k-audit-trail', import: 'AuditTrail', props: () => ({
    events: [
      { id: 'e1', timestamp: '10:00', actor: 'SR', action: 'created', target: 'ADR-0042', outcome: 'success' },
      { id: 'e2', timestamp: '10:15', actor: 'SR', action: 'submitted', target: 'ADR-0042', outcome: 'success' },
      { id: 'e3', timestamp: '11:30', actor: 'reviewer', action: 'approved', target: 'ADR-0042', outcome: 'success' },
    ],
  }) },
  { name: 'Architecture Diagram', id: 'k-architecture-diagram', import: 'ArchitectureDiagram', props: () => ({
    nodes: [
      { id: 'web', label: 'Web client', type: 'user' },
      { id: 'api', label: 'API gateway', type: 'service' },
      { id: 'auth', label: 'Auth service', type: 'service' },
      { id: 'db', label: 'Primary DB', type: 'data' },
    ],
    edges: [
      { from: 'web', to: 'api', label: 'HTTPS' },
      { from: 'api', to: 'auth', label: 'verify' },
      { from: 'api', to: 'db', label: 'query' },
    ],
  }) },
  { name: 'State Machine', id: 'k-state-machine', import: 'StateMachine', props: () => ({
    states: [
      { id: 'idle', label: 'Idle', type: 'initial' },
      { id: 'loading', label: 'Loading' },
      { id: 'ready', label: 'Ready' },
      { id: 'error', label: 'Error' },
      { id: 'done', label: 'Done', type: 'final' },
    ],
    transitions: [
      { from: 'idle', to: 'loading', event: 'fetch' },
      { from: 'loading', to: 'ready', event: 'success' },
      { from: 'loading', to: 'error', event: 'failure' },
      { from: 'ready', to: 'done', event: 'complete' },
    ],
  }) },
  { name: 'Sequence Diagram', id: 'k-sequence-diagram', import: 'SequenceDiagram', props: () => ({
    actors: ['Client', 'API', 'DB'],
    messages: [
      { from: 'Client', to: 'API', label: 'GET /data' },
      { from: 'API', to: 'DB', label: 'SELECT', kind: 'async' },
      { from: 'DB', to: 'API', label: 'rows', kind: 'return' },
      { from: 'API', to: 'Client', label: '200 OK', kind: 'return' },
    ],
  }) },
  { name: 'Code Block', id: 'k-code-block', import: 'CodeBlock', props: () => ({
    code: `function validate(claim) {\n  return claim.source !== null\n    && claim.evidence.length > 0\n}`,
    language: 'typescript', filename: 'validate.ts', highlightLines: [2],
  }) },
  { name: 'API Reference', id: 'k-api-reference', import: 'APIReference', props: () => ({
    endpoint: {
      method: 'POST', path: '/v1/claims',
      description: 'Create a new claim with attached evidence.',
      params: [
        { name: 'claim', in: 'body', type: 'Claim', required: true, description: 'The claim to create' },
        { name: 'evidence', in: 'body', type: 'Evidence[]', required: true, description: 'Array of evidence references' },
      ],
      response: { status: 201, description: 'Claim created with assigned ID' },
    },
  }) },
  { name: 'Schema Viewer', id: 'k-schema-viewer', import: 'SchemaViewer', props: () => ({
    name: 'Claim', description: 'A claim with attached evidence and provenance.',
    fields: [
      { name: 'id', type: 'UUID', required: true },
      { name: 'text', type: 'string', required: true, description: 'The claim statement' },
      { name: 'provenance', type: 'Provenance', required: true, description: 'Source chain reference', children: [
        { name: 'kind', type: 'enum', required: true },
        { name: 'witness', type: 'string', required: false },
      ] },
      { name: 'evidence', type: 'Evidence[]', required: true },
      { name: 'confidence', type: 'number', required: false, description: '0-100 confidence score' },
    ],
  }) },
  { name: 'Narrative Arc', id: 'k-narrative-arc', import: 'NarrativeArc', props: () => ({
    beats: [
      { label: 'Setup', description: 'Establish the world', intensity: 30 },
      { label: 'Inciting', description: 'Disruption arrives', intensity: 50 },
      { label: 'Rising', description: 'Stakes escalate', intensity: 70 },
      { label: 'Crisis', description: 'Worst point', intensity: 95 },
      { label: 'Resolution', description: 'New equilibrium', intensity: 60 },
    ],
  }) },
  { name: 'Dialogue Tree', id: 'k-dialogue-tree', import: 'DialogueTree', props: () => ({
    rootId: 'n1',
    nodes: [
      { id: 'n1', speaker: 'A:', text: 'Should we adopt this approach?', choices: [
        { id: 'c1', text: 'Yes — ship it', next: 'n2' },
        { id: 'c2', text: 'No — too risky', next: 'n3' },
      ] },
      { id: 'n2', speaker: 'A:', text: 'Great, deploying tomorrow.', choices: [
        { id: 'c3', text: 'Confirm', next: null },
      ] },
      { id: 'n3', speaker: 'A:', text: 'What concerns you most?', choices: [
        { id: 'c4', text: 'Risk', next: 'n4' },
        { id: 'c5', text: 'Cost', next: 'n5' },
      ] },
      { id: 'n4', speaker: 'A:', text: 'Let me address the risk...', choices: [{ id: 'c6', text: 'Got it', next: null }] },
      { id: 'n5', speaker: 'A:', text: 'Let me show the cost analysis...', choices: [{ id: 'c7', text: 'Got it', next: null }] },
    ],
  }) },
  { name: 'Experiment Card', id: 'k-experiment-card', import: 'ExperimentCard', props: () => ({
    id: 'EXP-001', title: 'Token-driven vs hardcoded CSS',
    hypothesis: 'Token systems reduce bugs faster than hardcoded values.',
    method: 'Split test, n=24 components, 6 months.',
    results: 'Token group had 73% fewer style regressions.',
    conclusion: 'Hypothesis confirmed with high confidence.',
    outcome: 'confirmed',
  }) },
  { name: 'Paper Summary', id: 'k-paper-summary', import: 'PaperSummary', props: () => ({
    title: 'Atomic Design as a Methodology',
    authors: ['Brad Frost'], year: 2016, venue: 'A List Apart',
    abstract: 'We introduce atomic design as a methodology for creating design systems.',
    claims: [
      'Atoms compose into molecules',
      'Molecules compose into organisms',
      'Templates provide context',
      'Pages are specific instances',
    ],
    limitations: ['Limited empirical study', 'Original web-only context'],
    citationCount: 2847, doi: '10.1234/alistapart.2016.001',
  }) },
  { name: 'Dataset Spec', id: 'k-dataset-spec', import: 'DatasetSpec', props: () => ({
    name: 'Hearth-Code Components', version: '2026.09.26', size: '64 components',
    format: 'Astro', license: 'MIT',
    schema: [
      { name: 'id', type: 'string', description: 'Unique component ID' },
      { name: 'layer', type: 'enum', description: 'atom | composite | template | knowledge' },
      { name: 'props', type: 'Props', description: 'Component props schema' },
    ],
    ethicalNotes: ['No PII included', 'Synthetic data only', 'MIT license'],
  }) },
  { name: 'Model Card', id: 'k-model-card', import: 'ModelCard', props: () => ({
    name: 'Ember-Circuit-Doc', version: '2026.09.26',
    purpose: 'Documentation generation for the Ember Circuit design system.',
    trainingData: 'Curated corpus of design system docs and patterns.',
    evalResults: [
      { benchmark: 'Token accuracy', score: '94%' },
      { benchmark: 'Style consistency', score: '88%' },
    ],
    knownLimits: ['Limited to English', 'Best with short prompts'],
    intendedUse: 'Internal documentation generation.',
    outOfScope: ['Production code generation', 'User-facing content'],
  }) },
  { name: 'Prompt Pattern', id: 'k-prompt-pattern', import: 'PromptPattern', props: () => ({
    name: 'Evidence-Weighted Summary', category: 'synthesis',
    template: 'Summarize the following sources. For each claim, list the source and confidence.\n\n{{sources}}',
    variables: [
      { name: 'sources', description: 'Source documents to summarize' },
    ],
    example: {
      input: '[Source A]: ... [Source B]: ...',
      output: '• Claim X [A: 0.85, B: 0.72]\n• Claim Y [A: 0.65]',
    },
    author: 'Rallya',
  }) },
];

const TEMPLATES = [
  { name: 'Knowledge Base Browser', id: 'k-knowledge-base-browser', import: 'KnowledgeBaseBrowser', props: () => ({
    taxonomy: [
      { label: 'atoms', active: true },
      { label: 'composites' },
      { label: 'templates' },
    ],
    sections: [
      { id: 'atoms', title: 'Atoms', body: 'Single-purpose elements. Buttons, inputs, icons, badges.', tags: ['foundation'] },
      { id: 'composites', title: 'Composites', body: 'Composed elements combining atoms into functional units.', tags: ['composed'] },
      { id: 'templates', title: 'Templates', body: 'Page-level compositions using atoms, composites, and sections.', tags: ['page'] },
    ],
  }) },
  { name: 'ADR Index', id: 'k-adr-index', import: 'ADRIndex', props: () => ({
    adrs: [
      { number: '0042', title: 'Adopt token-driven design system', status: 'accepted', date: '2026-09-15', context: 'Consistent visual language needed.', decision: 'Token system with 64 components.', consequences: ['Higher upfront cost'] },
      { number: '0043', title: 'Use Astro for landing page', status: 'proposed', date: '2026-09-25', context: 'Need a static-first framework.', decision: 'Astro.', consequences: ['No SPA features'] },
    ],
  }) },
  { name: 'Evidence Package', id: 'k-evidence-package', import: 'EvidencePackage', props: () => ({
    title: 'Source provenance for charter claim',
    claim: 'The studio has been operating since 2026.',
    sealedBy: 'SR', sealedAt: '2026-09-26',
    receipts: [
      { id: 'EV-001', type: 'document', description: 'Original signed charter', hash: '7d4f8e2a1b9c5d6e3f8a2b1c9d4e5f8a2b1c9d4e5f8a2b1c9d4e5f8a2b1c9d4e', timestamp: '2026-01-15T12:00:00Z', witness: 'SR', locator: 'vault://charter.pdf' },
      { id: 'EV-002', type: 'observation', description: 'Witness signed the charter at founding event', hash: '8e5a9f3b2c0d7e4a9b3c2d0e5f9a3b2c0d4e5f8a2b1c9d4e5f8a2b1c9d4e5f8a', timestamp: '2026-01-15T11:30:00Z', witness: 'witness-001' },
    ],
  }) },
  { name: 'Audit Report', id: 'k-audit-report', import: 'AuditReport', props: () => ({
    title: 'Q3 2026 Studio Audit', scope: 'All published content',
    auditor: 'SR', auditedEntity: 'Hearth & Code Studio',
    period: '2026-07-01 to 2026-09-30', status: 'conditional',
    findings: [
      { id: 'F-01', severity: 'success', title: 'All citations present', description: '100% of claims have sources.' },
      { id: 'F-02', severity: 'caution', title: 'Some tokens missing', description: '3 components lack semantic tokens.' },
    ],
    auditTrail: [
      { id: 'e1', timestamp: '2026-09-26 10:00', actor: 'SR', action: 'started audit', target: 'studio', outcome: 'success' },
      { id: 'e2', timestamp: '2026-09-26 11:30', actor: 'SR', action: 'reviewed citations', target: '32 claims', outcome: 'success' },
    ],
    compliance: [
      { id: 'C-01', name: 'Source citation', status: 'pass', evidence: 'auto-check' },
      { id: 'C-02', name: 'Token usage', status: 'pending', evidence: 'manual' },
    ],
  }) },
  { name: 'Policy Document', id: 'k-policy-document', import: 'PolicyDocument', props: () => ({
    id: 'POL-001', title: 'Studio Charter',
    effectiveDate: '2026-01-01', reviewDate: '2027-01-01',
    owner: 'Studio',
    sections: [
      { id: 'purpose', title: 'Purpose', body: 'Establish the principles, governance, and operating norms of the studio.' },
      { id: 'principles', title: 'Principles', body: 'Every claim has a source. Every artifact has provenance. Every action has a gate.' },
    ],
    gates: [
      { id: 'G-001', name: 'Charter approval', description: 'Initial approval of charter.', reviewer: 'SR', decision: 'approved', sealedAt: '2026-01-01' },
    ],
  }) },
  { name: 'Compliance Dashboard', id: 'k-compliance-dashboard', import: 'ComplianceDashboard', props: () => ({
    frameworks: [
      { name: 'Studio Charter', controls: [
        { id: 'C-01', name: 'Source citation', status: 'pass' },
        { id: 'C-02', name: 'Token usage', status: 'pending' },
      ] },
      { name: 'WCAG 2.1 AA', controls: [
        { id: 'A-01', name: 'Color contrast', status: 'pass' },
        { id: 'A-02', name: 'Keyboard nav', status: 'pass' },
      ] },
    ],
  }) },
  { name: 'Research Brief', id: 'k-research-brief', import: 'ResearchBrief', props: () => ({
    paper: {
      title: 'Design Systems as Knowledge Infrastructure',
      authors: ['Rallya, S.'], year: 2026, venue: 'Studio Working Papers',
      abstract: 'We argue that design systems function as a form of knowledge infrastructure that encodes conventions, decisions, and rationales.',
      claims: ['Design systems are knowledge bases', 'Token names are a vocabulary'],
      limitations: ['Limited to web contexts', 'No empirical study'],
      citationCount: 4, doi: '10.1234/working.2026.001',
    },
    related: [
      { title: 'Atomic Design as Methodology', authors: ['Frost, B.'], year: 2016 },
    ],
  }) },
  { name: 'Experiment Notebook', id: 'k-experiment-notebook', import: 'ExperimentNotebook', props: () => ({
    title: 'Design System Wave Studies',
    experiments: [
      { id: 'EXP-01', title: 'Token reduction', hypothesis: 'Tokens reduce LOC', method: 'Compare token vs hardcoded', results: '38% reduction', conclusion: 'Confirmed', outcome: 'confirmed' },
      { id: 'EXP-02', title: 'Component reuse', hypothesis: 'Reuse increases over time', method: 'Track usage', results: '12% reuse', conclusion: 'Below target', outcome: 'refuted' },
    ],
  }) },
  { name: 'Decision Workspace', id: 'k-decision-workspace', import: 'DecisionWorkspace', props: () => ({
    initialADR: {
      number: '0042', title: 'Adopt token-driven design system',
      status: 'proposed', date: '2026-09-26',
      context: 'We need consistent visual language across surfaces.',
      decision: 'Build a token-driven system with 64 components.',
      consequences: ['Higher upfront cost', 'Faster iteration'],
    },
  }) },
  { name: 'Code Playground', id: 'k-code-playground', import: 'CodePlayground', props: () => ({
    title: 'Token-driven component example',
    code: `const Button = ({ variant = 'primary', children }) =>\n  <button class={\`btn btn--\${variant}\`}>{children}</button>`,
    language: 'typescript', output: '✓ Compiled · 142 bytes',
    explanation: 'A simple token-driven button. The variant prop maps to a class name that pulls styles from CSS custom properties.',
  }) },
  { name: 'API Documentation Page', id: 'k-api-documentation-page', import: 'APIDocumentationPage', props: () => ({
    apiName: 'Hearth & Code API', version: '2026.09.26', baseUrl: 'https://api.hearthandcode.dev',
    sections: [
      { id: 'claims', title: 'Claims', description: 'Manage claims and their evidence.', endpoints: [
        { method: 'GET', path: '/v1/claims', description: 'List claims', response: { status: 200, description: 'Array of claims' } },
        { method: 'POST', path: '/v1/claims', description: 'Create a claim', params: [{ name: 'text', in: 'body', type: 'string', required: true, description: 'Claim text' }], response: { status: 201, description: 'Created claim' } },
      ] },
    ],
  }) },
  { name: 'System Architecture Doc', id: 'k-system-architecture-doc', import: 'SystemArchitectureDoc', props: () => ({
    title: 'Ember Circuit System Architecture', version: '2026.09.26',
    sections: [
      { id: 'web', title: 'Web layer', description: 'Browser-based rendering of components.', diagram: {
        nodes: [
          { id: 'web', label: 'Web client', type: 'user' },
          { id: 'astro', label: 'Astro build', type: 'service' },
          { id: 'tokens', label: 'Tokens CSS', type: 'data' },
        ],
        edges: [{ from: 'web', to: 'astro', label: 'request' }, { from: 'astro', to: 'tokens', label: 'inject' }],
      } },
    ],
  }) },
  { name: 'Knowledge Graph View', id: 'k-knowledge-graph-view', import: 'KnowledgeGraphView', props: () => ({
    nodes: [
      { id: 'a', label: 'Tokens', type: 'concept', x: 100, y: 100 },
      { id: 'b', label: 'Claim', type: 'claim', x: 300, y: 100 },
      { id: 'c', label: 'Source', type: 'source', x: 500, y: 100 },
      { id: 'd', label: 'Audit', type: 'task', x: 300, y: 250 },
    ],
    edges: [
      { from: 'a', to: 'b', label: 'enables' },
      { from: 'b', to: 'c', label: 'cites' },
      { from: 'd', to: 'b', label: 'verifies' },
    ],
  }) },
  { name: 'Release Notes', id: 'k-release-notes', import: 'ReleaseNotes', props: () => ({
    product: 'Ember Circuit Design System',
    releases: [
      { version: '2026.09.26', date: '2026-09-26', type: 'major', changes: [
        { kind: 'added', text: '64 new knowledge-work components' },
        { kind: 'added', text: 'New /design-system showcase page' },
        { kind: 'fixed', text: 'UTF-8 encoding in gallery' },
      ] },
      { version: '2026.09.20', date: '2026-09-20', type: 'minor', changes: [
        { kind: 'added', text: '32 composite components' },
      ] },
    ],
  }) },
  { name: 'Creative Project Brief', id: 'k-creative-project-brief', import: 'CreativeProjectBrief', props: () => ({
    title: 'The Studio Story', premise: 'A small studio building design systems for knowledge work.',
    characters: [
      { name: 'Architect', role: 'Protagonist', description: 'Builds the system.' },
      { name: 'Reviewer', role: 'Gatekeeper', description: 'Seals decisions.' },
    ],
    arc: [
      { label: 'Setup', description: 'A studio forms', intensity: 30 },
      { label: 'Build', description: 'Tokens and components', intensity: 70 },
      { label: 'Seal', description: 'First system ships', intensity: 95 },
      { label: 'After', description: 'What next?', intensity: 50 },
    ],
    sampleDialogue: [
      { id: 'n1', speaker: 'Architect:', text: 'Should we ship v1 today?', choices: [
        { id: 'c1', text: 'Yes', next: 'n2' },
        { id: 'c2', text: 'Wait', next: null },
      ] },
      { id: 'n2', speaker: 'Reviewer:', text: 'All gates sealed. Ship it.', choices: [{ id: 'c3', text: 'Done', next: null }] },
    ],
  }) },
  { name: 'Operations Runbook', id: 'k-operations-runbook', import: 'OperationsRunbook', props: () => ({
    title: 'Deploy to Production',
    oncall: 'SR',
    procedure: [
      { order: 1, action: 'Verify all tests pass', expected: 'exit 0' },
      { order: 2, action: 'Run token validation', expected: 'no errors' },
      { order: 3, action: 'Deploy to staging', expected: '2 min' },
      { order: 4, action: 'Approve production gate', expected: 'human approval' },
      { order: 5, action: 'Deploy to production', expected: '5 min' },
    ],
    recentLogs: [
      { timestamp: '10:30:01', severity: 'success', source: 'deploy', message: 'Staging deploy complete' },
      { timestamp: '10:32:15', severity: 'info', source: 'monitor', message: 'Health checks passing' },
      { timestamp: '10:45:00', severity: 'success', source: 'gate', message: 'Production gate approved by SR' },
    ],
  }) },
];

const tile = (comp, isWide = false) => {
  const propsString = JSON.stringify(comp.props(), null, 2)
    .replace(/"([^"]+)":/g, '$1:')
    .replace(/"/g, "'");
  // Escape for JSX
  const escapedProps = propsString.replace(/'/g, "\\'");
  const wideClass = isWide ? ' ds-tile--wide' : '';
  return `    <figure class="ds-tile${wideClass}" id="${comp.id}">
      <div class="ds-tile__preview">
        <${comp.import} ${propsString} />
      </div>
      <figcaption class="ds-tile__meta">
        <span class="ds-tile__id">${comp.id}</span>
        <span class="ds-tile__name">${comp.name}</span>
      </figcaption>
    </figure>`;
};

const atomsTiles = ATOMS.map((c) => tile(c)).join('\n');
const compositesTiles = COMPOSITES.map((c) => tile(c)).join('\n');
const templatesTiles = TEMPLATES.map((c) => tile(c, true)).join('\n');

console.log('=== ATOMS ===');
console.log(atomsTiles);
console.log('\n=== COMPOSITES ===');
console.log(compositesTiles);
console.log('\n=== TEMPLATES ===');
console.log(templatesTiles);
