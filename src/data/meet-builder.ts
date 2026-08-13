export type Maturity = 'current' | 'experimental' | 'proposed' | 'unavailable' | 'unknown';
export type ActionState = 'candidate-link-held' | 'released-source-link' | 'informational-no-link' | 'unavailable';
export type RelationVerb = 'contains' | 'documents' | 'informs' | 'tests' | 'extends' | 'supports' | 'links-to' | 'returns-to' | 'corrects';
export type EmberCircuitMovement = 'orient' | 'inspect' | 'connect' | 'return';

export interface PublicRecord {
  id: string;
  title: string;
  summary: string;
  artifactType: string;
  maturity: Maturity;
  evidenceRef: string;
  evidenceLabel: string;
  limitation: string;
  nonClaim: string;
  contribution: string;
  observedOrUpdated: string;
  actionState: ActionState;
  actionNote: string | null;
  actionLabel: string | null;
  publicTarget: string | null;
  correctionRoute: string;
  moduleMembership: string[];
  releaseState: 'candidate-only' | 'released';
}

export interface RelationRecord {
  id: string;
  from: PublicRecord['id'];
  to: PublicRecord['id'];
  verb: RelationVerb;
  literalDescription: string;
  evidenceRefs: string[];
  releaseState: 'candidate-only' | 'released';
}

export const moduleFragments = {
  orientation: 'orientation-signal',
  practice: 'practice-responsibility',
  investigations: 'current-investigations',
  tools: 'tools-prototypes',
  library: 'knowledge-library',
  atlas: 'knowledge-atlas',
  method: 'methods-evidence-maturity',
  return: 'field-journal-builder-return',
} as const;

export const emberCircuitModules: ReadonlyArray<{
  number: string;
  fragment: (typeof moduleFragments)[keyof typeof moduleFragments];
  movement: EmberCircuitMovement;
  intensity: 2 | 3;
}> = [
  { number: '01', fragment: moduleFragments.orientation, movement: 'orient', intensity: 3 },
  { number: '02', fragment: moduleFragments.practice, movement: 'orient', intensity: 2 },
  { number: '03', fragment: moduleFragments.investigations, movement: 'inspect', intensity: 3 },
  { number: '04', fragment: moduleFragments.tools, movement: 'inspect', intensity: 2 },
  { number: '05', fragment: moduleFragments.library, movement: 'connect', intensity: 2 },
  { number: '06', fragment: moduleFragments.atlas, movement: 'connect', intensity: 3 },
  { number: '07', fragment: moduleFragments.method, movement: 'return', intensity: 2 },
  { number: '08', fragment: moduleFragments.return, movement: 'return', intensity: 2 },
] as const;

export const maturityLabels: Record<Maturity, string> = {
  current: 'Current at the observed revision',
  experimental: 'Experimental',
  proposed: 'Proposed',
  unavailable: 'Unavailable',
  unknown: 'Current state unknown',
};

export const actionStateLabels: Record<ActionState, string> = {
  'candidate-link-held': 'Source link held for review',
  'released-source-link': 'Released source link',
  'informational-no-link': 'Information only',
  unavailable: 'Unavailable',
};

export const publicRecords: PublicRecord[] = [
  {
    id: 'practice-orientation', title: 'Hearth & Code practice orientation', artifactType: 'Organizational orientation', maturity: 'current', evidenceRef: 'EC-EV-001', evidenceLabel: 'Canonical organizational-source candidate', observedOrUpdated: '2026-08-10', actionState: 'informational-no-link', actionLabel: null, actionNote: 'Candidate posture only.', publicTarget: null, correctionRoute: '/method/#corrections', moduleMembership: ['1', '2', '7', '8'], releaseState: 'candidate-only',
    summary: 'Candidate orientation for a one-person, person-led research and creative-technology practice moving toward a separately gated research-lab and creative-hub posture.',
    limitation: 'The lab and creative-hub wording is not yet a canonical or released public identity.',
    nonClaim: 'Not a team, accredited institution, facility, commissioned program, community, mature product company, or achieved-expertise claim.',
    contribution: 'Scott remains the responsible human author and reviewer; collaborators and material tools remain specific to each artifact.',
  },
  {
    id: 'workbench-pre-alpha', title: 'Hearth & Code Workbench pre-alpha', artifactType: 'Software prototype', maturity: 'experimental', evidenceRef: 'EC-EV-002', evidenceLabel: 'Exact public-repository observation', observedOrUpdated: '2026-08-10', actionState: 'candidate-link-held', actionLabel: 'Inspect Workbench source', actionNote: 'Exact destination release is held.', publicTarget: null, correctionRoute: '/method/#corrections', moduleMembership: ['3', '4', '5', '6', '7'], releaseState: 'candidate-only',
    summary: 'One inspectable local-first pre-alpha profile-evaluation workroom implemented with Tauri, TypeScript, and Rust, including a deterministic mock path and bounded receipt and persistence proof.',
    limitation: 'No live model, agent runtime, production CoreStore, semantic retrieval, cloud sync, or current CI result is established here.',
    nonClaim: 'Not a finished platform, launched product, autonomous-agent system, or demonstrated cognitive benefit.',
    contribution: 'Public repository evidence discloses AI-assisted development under human direction and review.',
  },
  {
    id: 'context-forge-proof', title: 'Context Forge workflow proof', artifactType: 'Software and workflow proof', maturity: 'experimental', evidenceRef: 'EC-EV-003', evidenceLabel: 'Exact public-repository observation', observedOrUpdated: '2026-08-10', actionState: 'candidate-link-held', actionLabel: 'Inspect Context Forge source', actionNote: 'Exact destination release is held.', publicTarget: null, correctionRoute: '/method/#corrections', moduleMembership: ['3', '4', '5', '6', '7'], releaseState: 'candidate-only',
    summary: 'A pre-release proof for source-governed workflow schemas, graph validation, deterministic simulation, review gates, synthetic fixtures, and a local interface.',
    limitation: 'No autonomous execution, provider invocation, credential handling, deployed service, or canonical write is established.',
    nonClaim: 'Not a production agent platform or autonomous orchestration service.',
    contribution: 'The public package identifies Scott as author and Hearth & Code as repository owner; this does not imply a team.',
  },
  {
    id: 'bounded-retrieval-proof', title: 'Bounded retrieval and ContextPack proof', artifactType: 'Knowledge-tool proof', maturity: 'experimental', evidenceRef: 'EC-EV-004', evidenceLabel: 'Exact public-repository observation', observedOrUpdated: '2026-08-10', actionState: 'candidate-link-held', actionLabel: 'Inspect the bounded retrieval proof', actionNote: 'Exact destination release is held.', publicTarget: null, correctionRoute: '/method/#corrections', moduleMembership: ['3', '4', '5', '6', '7'], releaseState: 'candidate-only',
    summary: 'A local deterministic bounded-retrieval and ContextPack proof using source allowlists, citations, hashes, drift detection, and a dated five-test receipt.',
    limitation: 'The proof uses lexical-hash retrieval only; its receipt is dated and remains unverified.',
    nonClaim: 'Not semantic intelligence, general memory, autonomous injection, or production readiness.',
    contribution: 'Public-safe derivative of independently directed engineering work; private source material remains excluded.',
  },
  {
    id: 'knowledge-governance-pilot', title: 'Knowledge-governance pilot artifacts', artifactType: 'Taxonomy and design artifacts', maturity: 'proposed', evidenceRef: 'EC-EV-005', evidenceLabel: 'Exact public-document observation', observedOrUpdated: '2026-08-10', actionState: 'candidate-link-held', actionLabel: 'Inspect the governance pilot', actionNote: 'Exact destination release is held.', publicTarget: null, correctionRoute: '/method/#corrections', moduleMembership: ['3', '5', '6', '7'], releaseState: 'candidate-only',
    summary: 'Public pilot taxonomy and design artifacts for controlled vocabulary, integrity rules, provenance, and source-aware knowledge governance.',
    limitation: 'A proposed approach and pilot artifacts, not an installed service or complete ontology.',
    nonClaim: 'Not proof that all Hearth & Code records are governed or validated.',
    contribution: 'Reduced public derivatives with private identities and runtime details excluded.',
  },
  {
    id: 'field-journal-system', title: 'Field Journal source corpus', artifactType: 'Journal implementation and corpus', maturity: 'current', evidenceRef: 'EC-EV-006', evidenceLabel: 'Exact public-repository observation', observedOrUpdated: '2026-08-10', actionState: 'candidate-link-held', actionLabel: 'Browse the Field Journal source', actionNote: 'Deployed route remains unchecked.', publicTarget: null, correctionRoute: '/method/#corrections', moduleMembership: ['5', '6', '7', '8'], releaseState: 'candidate-only',
    summary: 'An Astro and React source corpus with six source entries, structured frontmatter, RSS, reading controls, and AI-provenance fields at the checked revision.',
    limitation: 'Deployed blog availability was not directly checked for this evidence set.',
    nonClaim: 'Journal publication does not independently validate article claims or establish research expertise.',
    contribution: 'Each article retains its own author, assistance disclosure, and claim map.',
  },
  {
    id: 'procedure-design-field-note', title: 'Agent-assisted procedure-design field note', artifactType: 'Authored N-of-one field note', maturity: 'experimental', evidenceRef: 'EC-EV-007', evidenceLabel: 'Exact public-authored observation', observedOrUpdated: '2026-08-10', actionState: 'candidate-link-held', actionLabel: 'Read the procedure-design field note', actionNote: 'Exact wording and authorship review are required.', publicTarget: null, correctionRoute: '/method/#corrections', moduleMembership: ['3', '5', '6', '7', '8'], releaseState: 'candidate-only',
    summary: 'A dated N-of-one field note documents an evolving practice of goal contracts, bounded delegation, disjoint ownership, review gates, and receipts with AI assistance disclosed.',
    limitation: 'Self-reported; no benchmark, external validation, productivity result, or reproducibility proof.',
    nonClaim: 'Not validated agentic-engineering expertise or achieved mastery.',
    contribution: 'Scott owns the practice description, judgment, and publication decision; exact first-person reuse requires separate review.',
  },
  {
    id: 'landing-source-proof', title: 'Landing source implementation', artifactType: 'Local static-site source', maturity: 'unknown', evidenceRef: 'EC-EV-008', evidenceLabel: 'Bound local-source observation', observedOrUpdated: '2026-08-10', actionState: 'informational-no-link', actionLabel: null, actionNote: 'Remote and deployment currentness are unchecked.', publicTarget: null, correctionRoute: '/method/#corrections', moduleMembership: ['4', '7', '8'], releaseState: 'candidate-only',
    summary: 'A local static Astro implementation exists for the landing and principal orientation routes at the bound commit.',
    limitation: 'Remote currentness, deployment, public reachability, and current behavior remain unchecked.',
    nonClaim: 'Not proof of publication, readership, accessibility conformance, or public availability.',
    contribution: 'Checked-in source is observable; precise human and AI contribution is not established by this evidence item.',
  },
];

export const relationRecords: RelationRecord[] = [
  { id: 'rel-journal-contains-procedure-note', from: 'field-journal-system', verb: 'contains', to: 'procedure-design-field-note', literalDescription: 'The Field Journal source corpus contains the procedure-design field note at the checked revision.', evidenceRefs: ['EC-EV-006', 'EC-EV-007'], releaseState: 'candidate-only' },
  { id: 'rel-workbench-supports-practice', from: 'workbench-pre-alpha', verb: 'supports', to: 'practice-orientation', literalDescription: "The bounded pre-alpha repository is one evidence candidate for the practice's software-building activity.", evidenceRefs: ['EC-EV-001', 'EC-EV-002'], releaseState: 'candidate-only' },
  { id: 'rel-context-forge-supports-practice', from: 'context-forge-proof', verb: 'supports', to: 'practice-orientation', literalDescription: 'The workflow proof is one evidence candidate for source-governed procedure design under human review.', evidenceRefs: ['EC-EV-001', 'EC-EV-003'], releaseState: 'candidate-only' },
  { id: 'rel-retrieval-supports-practice', from: 'bounded-retrieval-proof', verb: 'supports', to: 'practice-orientation', literalDescription: 'The bounded retrieval proof is one evidence candidate for provenance-aware knowledge-tool work.', evidenceRefs: ['EC-EV-001', 'EC-EV-004'], releaseState: 'candidate-only' },
  { id: 'rel-governance-informs-retrieval', from: 'knowledge-governance-pilot', verb: 'informs', to: 'bounded-retrieval-proof', literalDescription: 'The public governance artifacts provide vocabulary and provenance constraints relevant to the bounded retrieval proof.', evidenceRefs: ['EC-EV-004', 'EC-EV-005'], releaseState: 'candidate-only' },
  { id: 'rel-field-note-documents-practice', from: 'procedure-design-field-note', verb: 'documents', to: 'practice-orientation', literalDescription: 'The field note documents one evolving, self-reported procedure-design practice.', evidenceRefs: ['EC-EV-001', 'EC-EV-007'], releaseState: 'candidate-only' },
  { id: 'rel-landing-links-workbench', from: 'landing-source-proof', verb: 'links-to', to: 'workbench-pre-alpha', literalDescription: 'The bound landing source includes an orientation route that points toward the Workbench and Exocore repository context.', evidenceRefs: ['EC-EV-002', 'EC-EV-008'], releaseState: 'candidate-only' },
];

const publicIdPattern = /^[a-z][a-z0-9-]*$/;

export function recordFragment(record: Pick<PublicRecord, 'id'>): string {
  if (!publicIdPattern.test(record.id)) throw new Error(`Invalid public record ID: ${record.id}`);
  return `record-${record.id}`;
}

export function relationFragment(relation: Pick<RelationRecord, 'id'>): string {
  if (!publicIdPattern.test(relation.id) || !relation.id.startsWith('rel-')) throw new Error(`Invalid relation ID: ${relation.id}`);
  return `relation-${relation.id.slice(4)}`;
}

export function recordsForModule(moduleNumber: number): PublicRecord[] {
  return publicRecords.filter((record) => record.moduleMembership.includes(String(moduleNumber)));
}

export function getPublicRecord(id: string): PublicRecord {
  const record = publicRecords.find((candidate) => candidate.id === id);
  if (!record) throw new Error(`Unknown public record endpoint: ${id}`);
  return record;
}

export function prefixedRoute(path: string, publicSite: boolean): string {
  if (!path.startsWith('/')) throw new Error(`Expected an absolute site route: ${path}`);
  return `${publicSite ? '' : '/review'}${path}`;
}

export function validateMeetBuilderData(): void {
  const recordIds = publicRecords.map((record) => record.id);
  const relationIds = relationRecords.map((relation) => relation.id);
  const documentIds = [...Object.values(moduleFragments), ...publicRecords.map(recordFragment), ...relationRecords.map(relationFragment)];
  if (new Set(recordIds).size !== recordIds.length) throw new Error('Duplicate public record ID');
  if (new Set(relationIds).size !== relationIds.length) throw new Error('Duplicate relation ID');
  if (new Set(documentIds).size !== documentIds.length) throw new Error('Duplicate document fragment ID');
  if (emberCircuitModules.length !== 8) throw new Error('Expected eight Ember Circuit modules');
  if (new Set(emberCircuitModules.map((module) => module.number)).size !== 8) throw new Error('Duplicate Ember Circuit module number');
  if (new Set(emberCircuitModules.map((module) => module.fragment)).size !== 8) throw new Error('Duplicate Ember Circuit module fragment');
  for (const movement of ['orient', 'inspect', 'connect', 'return'] satisfies EmberCircuitMovement[]) {
    if (emberCircuitModules.filter((module) => module.movement === movement).length !== 2) throw new Error(`Expected two ${movement} modules`);
  }
  for (const record of publicRecords) {
    if (record.publicTarget !== null) throw new Error(`Unreleased public target: ${record.id}`);
    if (record.releaseState !== 'candidate-only') throw new Error(`Unexpected release state: ${record.id}`);
  }
  for (const relation of relationRecords) {
    getPublicRecord(relation.from);
    getPublicRecord(relation.to);
    if (relation.releaseState !== 'candidate-only') throw new Error(`Unexpected relation release state: ${relation.id}`);
  }
}

validateMeetBuilderData();
