export const emberCircuitTokens = {
  color: {
    field950: '#0e1114', field900: '#171512', field800: '#211d18', field700: '#302a25',
    line500: '#4b4237', ash500: '#8d8579', paper100: '#f1e7d2', paper300: '#cfc1ab',
    ember500: '#f07a37', forge600: '#c25a2a', gold500: '#d4ab63', plasma500: '#82c4c3',
    violet500: '#a78bfa', violet300: '#c4b5fd', success500: '#79c99e', danger500: '#e28c86',
  },
  space: [4, 8, 12, 16, 24, 32, 48, 64, 96],
  radius: [0, 4, 6, 8],
  type: { display: 'Fraunces', body: 'Inter', mono: 'JetBrains Mono', readingMeasure: '65ch' },
  motion: { control: 200, panel: 300, atmosphere: 8000 },
} as const;

export type ComponentBand = 'presentation' | 'wayfinding' | 'knowledge' | 'systems';

export interface ComponentRecord {
  id: string;
  name: string;
  sourceName: string;
  band: ComponentBand;
  role: string;
}

export const emberCircuitComponents: readonly ComponentRecord[] = [
  { id: 'P01', name: 'ArticleCard', sourceName: 'WorkCard', band: 'presentation', role: 'Published work with format, themes, reading time, and route.' },
  { id: 'P02', name: 'CaseStudyCard', sourceName: 'CaseStudyCard', band: 'presentation', role: 'Question, intervention, observation, and limit.' },
  { id: 'P03', name: 'FieldCard', sourceName: 'PracticeCard', band: 'presentation', role: 'Reusable Methods instrument with prompt and boundary.' },
  { id: 'P04', name: 'MetricCard', sourceName: 'MetricCard', band: 'presentation', role: 'A value with unit, source, and literal posture.' },
  { id: 'P05', name: 'MediaFrame', sourceName: 'MediaFrame', band: 'presentation', role: 'Visual or diagram container with caption and provenance.' },
  { id: 'P06', name: 'CalloutPanel', sourceName: 'CalloutPanel', band: 'presentation', role: 'Bounded note, caution, or invitation.' },
  { id: 'P07', name: 'AnnotationRail', sourceName: 'AnnotationRail', band: 'presentation', role: 'Margin-scale claim and source annotations.' },
  { id: 'P08', name: 'CollectionView', sourceName: 'CollectionView', band: 'presentation', role: 'Named collection with count, controls, and content region.' },
  { id: 'W01', name: 'RouteCard', sourceName: 'RouteCard', band: 'wayfinding', role: 'A destination, reason to enter, and current state.' },
  { id: 'W02', name: 'LinkList', sourceName: 'LinkList', band: 'wayfinding', role: 'Compact related routes with typed relationships.' },
  { id: 'W03', name: 'AnchorBar', sourceName: 'AnchorBar', band: 'wayfinding', role: 'Keyboard-readable local section navigation.' },
  { id: 'W04', name: 'Trail', sourceName: 'Trail', band: 'wayfinding', role: 'Visible path from source through projection to return.' },
  { id: 'W05', name: 'PathMap', sourceName: 'PathMap', band: 'wayfinding', role: 'D3-enhanced tree with semantic fallback.' },
  { id: 'W06', name: 'SectionDirectory', sourceName: 'SectionDirectory', band: 'wayfinding', role: 'Dense index of sections and object counts.' },
  { id: 'W07', name: 'RelatedWorkPanel', sourceName: 'RelatedWorkPanel', band: 'wayfinding', role: 'Cross-links that retain relation labels.' },
  { id: 'W08', name: 'ReturnMarker', sourceName: 'ReturnMarker', band: 'wayfinding', role: 'Explicit continuation, correction, or exit route.' },
  { id: 'K09', name: 'ClaimCard', sourceName: 'ClaimCard', band: 'knowledge', role: 'Calibrated claim with evidence and limit.' },
  { id: 'K10', name: 'SourceCard', sourceName: 'SourceCard', band: 'knowledge', role: 'Source identity, revision, access, and use.' },
  { id: 'K11', name: 'ConceptCard', sourceName: 'ConceptCard', band: 'knowledge', role: 'A concept with plain reading and near-miss.' },
  { id: 'K12', name: 'SynthesisBoard', sourceName: 'SynthesisBoard', band: 'knowledge', role: 'Observations, interpretations, proposals, and gaps.' },
  { id: 'K13', name: 'TensionPair', sourceName: 'TensionPair', band: 'knowledge', role: 'Two valid concerns held without forced collapse.' },
  { id: 'K14', name: 'EvidenceMatrix', sourceName: 'EvidenceMatrix', band: 'knowledge', role: 'Scrollable evidence and claim comparison.' },
  { id: 'K15', name: 'QuestionLedger', sourceName: 'QuestionLedger', band: 'knowledge', role: 'Open questions with change conditions and owners.' },
  { id: 'K16', name: 'GlossaryEntry', sourceName: 'GlossaryEntry', band: 'knowledge', role: 'Term, local meaning, relation, and boundary.' },
  { id: 'S01', name: 'SystemContext', sourceName: 'SystemContext', band: 'systems', role: 'Actors, environment, constraint, and purpose.' },
  { id: 'S02', name: 'BoundaryMap', sourceName: 'BoundaryMap', band: 'systems', role: 'Mermaid-enhanced system boundary with text fallback.' },
  { id: 'S03', name: 'ModuleCard', sourceName: 'ModuleCard', band: 'systems', role: 'Module responsibility, inputs, outputs, and owner.' },
  { id: 'S04', name: 'InterfaceContract', sourceName: 'InterfaceContract', band: 'systems', role: 'Typed request, response, and prohibited effects.' },
  { id: 'S05', name: 'DecisionRecordCard', sourceName: 'DecisionRecordCard', band: 'systems', role: 'Decision, rationale, alternatives, and review state.' },
  { id: 'S06', name: 'ChangeSet', sourceName: 'ChangeSet', band: 'systems', role: 'Before/after delta with reason and recovery.' },
  { id: 'S07', name: 'TestRun', sourceName: 'TestRun', band: 'systems', role: 'Predicate, method, outcome, and limitation.' },
  { id: 'S08', name: 'BuildPlan', sourceName: 'BuildPlan', band: 'systems', role: 'Ordered phases, gates, checks, and held effects.' },
] as const;

export const componentBands = ['presentation', 'wayfinding', 'knowledge', 'systems'] as const;
