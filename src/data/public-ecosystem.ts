export const claimStates = ['evidence', 'inference', 'proposal', 'open-question'] as const;

export type ClaimState = (typeof claimStates)[number];

export interface PublicRoute {
  label: string;
  href: string;
  external?: boolean;
}

export interface EcosystemStage {
  id: string;
  index: string;
  label: string;
  eyebrow: string;
  state: ClaimState;
  title: string;
  summary: string;
  nonClaim: string;
  routes: PublicRoute[];
}

export interface BoundaryLayer {
  id: string;
  label: string;
  state: ClaimState;
  title: string;
  summary: string;
  boundary: string;
  items: string[];
}

export const ecosystemStages: EcosystemStage[] = [
  {
    id: 'question',
    index: '01',
    label: 'Question',
    eyebrow: 'A question worth keeping',
    state: 'open-question',
    title: 'Name the question before it disappears into activity.',
    summary:
      'Hearth & Code begins with a question that needs a room, not a productivity metric. The first public move is to name what is being explored and what remains uncertain.',
    nonClaim:
      'This is an orientation pattern. It does not claim that a tool can infer a person’s intent or choose their priorities.',
    routes: [
      {
        label: 'Read the research orientation',
        href: '/research/',
      },
    ],
  },
  {
    id: 'evidence',
    index: '02',
    label: 'Evidence',
    eyebrow: 'A source trail',
    state: 'evidence',
    title: 'Keep the source, the record, and the claim distinguishable.',
    summary:
      'Selected public artifacts should show what they build from, what is being interpreted, and where a reader can inspect the work without needing access to a private workspace.',
    nonClaim:
      'A public link is not a complete research archive, a private corpus, or proof that every claim has been settled.',
    routes: [
      {
        label: 'Read the Field Journal',
        href: 'https://blog.hearthandcode.dev/#recent-entries',
        external: true,
      },
      {
        label: 'Open the Field Map',
        href: 'https://blog.hearthandcode.dev/field/',
        external: true,
      },
    ],
  },
  {
    id: 'review',
    index: '03',
    label: 'Review',
    eyebrow: 'A human gate',
    state: 'inference',
    title: 'Interpretation stays open to correction and refusal.',
    summary:
      'A useful system can help sort, retrieve, compare, and propose. It should leave the person with a visible place to correct the record, decline a direction, or keep a question unresolved.',
    nonClaim:
      'This does not claim that review has been automated or that a fluent answer is an accepted decision.',
    routes: [
      {
        label: 'Read the method and boundaries',
        href: '/method/',
      },
    ],
  },
  {
    id: 'public-proof',
    index: '04',
    label: 'Public proof',
    eyebrow: 'A route outward',
    state: 'proposal',
    title: 'Publish a bounded artifact, not a simulation of a private system.',
    summary:
      'The public ecosystem can point to a field note, a repository, or a small demonstration. Each artifact should be explicit about what it demonstrates, what it withholds, and what remains proposed.',
    nonClaim:
      'A public orientation is not evidence that the larger Exocore workbench, external integrations, or local authority layer already operate.',
    routes: [
      {
        label: 'Inspect Exocore on GitHub',
        href: 'https://github.com/hearthandcode/exocore-platform',
        external: true,
      },
    ],
  },
];

export const systemBoundaryLayers: BoundaryLayer[] = [
  {
    id: 'public-web',
    label: 'Public web',
    state: 'evidence',
    title: 'Reviewed static explanation and selected public artifacts.',
    summary:
      'The landing site and Field Journal help readers orient, inspect public sources, and follow a chosen line of work.',
    boundary:
      'No local filesystem, account state, private corpus, runtime configuration, task logs, or agent controls.',
    items: ['Landing routes', 'Field Journal', 'Public repositories', 'Source-linked explanations'],
  },
  {
    id: 'shared-grammar',
    label: 'Shared visual grammar',
    state: 'inference',
    title: 'Conventions may travel without sharing authority.',
    summary:
      'State labels, source-conscious cards, progressive disclosure, keyboard navigation, and reduced-motion care can appear on both surfaces.',
    boundary:
      'The convention is shared. Component code, privileged data access, and runtime configuration are not.',
    items: ['E/I/P/O labels', 'Visible source routes', 'Progressive disclosure', 'Accessible reader controls'],
  },
  {
    id: 'local-exocore',
    label: 'Local Exocore workbench',
    state: 'proposal',
    title: 'A proposed local-first authority boundary for governed work.',
    summary:
      'Exocore is intended to hold workrooms, sources, review routes, and bounded assistance while keeping human authority and recovery visible.',
    boundary:
      'This website does not expose an Exocore runtime and does not claim that its local governance, storage, adapters, or capabilities are implemented.',
    items: ['Proposed workrooms', 'Proposed policy and receipt model', 'Proposed local authority', 'Future reviewed adapters'],
  },
];
