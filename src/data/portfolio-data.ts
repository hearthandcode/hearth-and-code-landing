/**
 * Portfolio data — public-safe projections from the Hub.
 * Source: Hearth & Code Hub project homes (0021, 0038, 0044, 0047, 0031, 0002, 0003, 0005, 0030, 0039/0041).
 * This file is a projection; the Hub remains the canonical source.
 */

export interface SurfaceCardData {
  id: string;
  num: string;
  tag: string;
  title: string;
  summary: string;
  stats: { label: string; value: string }[];
  link: string;
  /** 4-section orientation card content */
  orientation: {
    what: string;
    why: string;
    how: string;
    status: string;
  };
}

export interface ProcessCardData {
  id: string;
  title: string;
  description: string;
  steps: { name: string; detail: string }[];
  /** 4-section implementation card content */
  sections: {
    overview: string;
    inputs: string;
    outputs: string;
    receipt: string;
  };
}

export interface ReviewBriefData {
  id: string;
  num: string;
  title: string;
  kicker: string;
  /** 8-section brief content */
  sections: {
    overview: string;
    purpose: string;
    scope: string;
    evidence: string;
    boundaries: string;
    status: string;
    source: string;
    next: string;
  };
}

export const surfaces: SurfaceCardData[] = [
  {
    id: 'sigil',
    num: '01',
    tag: 'Build surface',
    title: 'Exocore Sigil',
    summary:
      'The inscription grammar: how bounded artifacts are written, checked, and rendered. Sigil is the surface substrate of the ESS.',
    stats: [
      { label: 'Substrate', value: 'Grammar-theoretic' },
      { label: 'Lenses', value: '32' },
      { label: 'Posture', value: 'Deployed (standard)' },
    ],
    link: '/hcan/',
    orientation: {
      what: 'Sigil defines the grammar, the fallback rules, and the conformance checks for artifact inscription. An artifact written in Sigil carries a grammar that parses it, a fallback that renders gracefully, and a conformance check that verifies it.',
      why: 'Every artifact needs a surface — a way to be written, read, and verified. Sigil provides that surface as the fourth ESS substrate, integrating with MINC at the composition seam and EKRP at the artifact seam.',
      how: 'The primary artifact type is the OUT.sigil — a surface inscription that binds a source to its rendered form. Sigil artifacts are what a reader encounters when they meet an ESS artifact.',
      status: 'Deployed as a standard. The Sigil grammar is in active use for artifact inscription in the Hub.',
    },
  },
  {
    id: 'ess',
    num: '02',
    tag: 'Four-spec foundation',
    title: 'ESS',
    summary:
      'The Engineered Semantic Substrate: four substrates (TCCP, EKRP, MINC, Sigil) composing 663 bounded features.',
    stats: [
      { label: 'Substrates', value: '4' },
      { label: 'Features', value: '663' },
      { label: 'Lenses', value: '64' },
      { label: 'Primitives', value: '40' },
    ],
    link: '/hcan/',
    orientation: {
      what: 'The ESS is four spec-like layers: TCCP (type-theoretic), EKRP (module-theoretic), MINC (algebra-theoretic), Sigil (grammar-theoretic). Each owns a distinct axis of meaning.',
      why: 'Every artifact, page, and claim in the portfolio traces back through the ESS to its source. The substrates are not a framework you install; they are a vocabulary you use to make work inspectable.',
      how: 'On top of the substrates sit 64 lenses, 64 input types, and 40 composition primitives. A question instance is the triple: lens + input type + primitive composition.',
      status: 'Deployed. The ESS is the foundation under every working surface in this portfolio.',
    },
  },
  {
    id: 'hcan',
    num: '03',
    tag: 'Communication medium',
    title: 'HCAN',
    summary:
      'A condensed symbolic language for agent–human communication. Eight program examples, eight primitives, two protocols, and a portable envelope layer.',
    stats: [
      { label: 'Primitives', value: '8' },
      { label: 'Protocols', value: '2' },
      { label: 'Examples', value: '8' },
      { label: 'Posture', value: 'Deployed (/hcan)' },
    ],
    link: '/hcan/',
    orientation: {
      what: 'HCAN — the Hearthside Compact Agent Notation — compresses intent, structure, and response into a portable notation. Eight primitives (verb, binding, shape, flow, probe, guard, label, define), two protocols, and a portable envelope layer.',
      why: 'Agent-to-human communication needs a notation that is dense enough to carry structure and light enough for a human to read at a glance. HCAN is that notation.',
      how: 'The HCAN page at /hcan/ is the interactive surface. The grammar library ships as Ember Circuit product K17 with four views: Examples, Grammar, Protocols, and Envelope.',
      status: 'Deployed. The HCAN grammar library is live as an Ember Circuit product.',
    },
  },
  {
    id: 'platform',
    num: '04',
    tag: 'Platform',
    title: 'Exocore',
    summary:
      'A local-first cognitive workbench: Tauri desktop, agent host, memory layer, VS Code workspace, and the Pi extension for bounded review.',
    stats: [
      { label: 'Runtime', value: 'Tauri v2 (Rust)' },
      { label: 'Workspace', value: 'VS Code integration' },
      { label: 'Extension', value: 'Pi (bounded review)' },
      { label: 'Posture', value: 'In development' },
    ],
    link: '/hcan/',
    orientation: {
      what: 'Exocore is the platform: a Tauri v2 desktop app (Rust), an agent host for bounded workflows, a local-first memory layer, VS Code workspace integration, and the Pi extension for bounded review and corpus review.',
      why: 'The platform is where the ESS, HCAN, and Sigil surfaces meet actual work. It is local-first — no server, no telemetry, no cloud dependency.',
      how: 'Components are deployed individually (HCAN, the Pi extension) as they reach public-safe maturity. The full platform composition is in active development.',
      status: 'In development. Components deployed individually as they mature.',
    },
  },
  {
    id: 'game',
    num: '05',
    tag: 'Concept (not deployed)',
    title: 'Exocore: The Game',
    summary:
      'A cognitive workbench game surface — the same bounded vocabulary, release pattern, and corpus-review process, applied to play.',
    stats: [
      { label: 'Posture', value: 'Proposal' },
      { label: 'Source', value: 'Hub project 0005' },
    ],
    link: '/hcan/',
    orientation: {
      what: 'A concept exploring the ESS as a game world, the Core32 fleet as playable characters, the release pattern as the action economy, and the bounded vocabulary as the claim system.',
      why: 'The game tests whether the working surfaces can be inhabited as play — whether the governance discipline is legible enough to be a game mechanic.',
      how: 'The concept exists in the Hub as a research direction. No build, no release date, no public artifact.',
      status: 'Proposal. Not deployed. Not scheduled.',
    },
  },
  {
    id: 'palimpsest',
    num: '06',
    tag: 'Concept (not deployed)',
    title: 'Palimpsest',
    summary:
      'The Last Archivist: a concept exploring layered knowledge representation and the return route.',
    stats: [
      { label: 'Posture', value: 'Proposal' },
      { label: 'Source', value: 'Hub project 0030' },
    ],
    link: '/hcan/',
    orientation: {
      what: 'A narrative concept: the last archivist in a world where knowledge is layered, where each layer is a projection, and where the return route (the receipt) is the only way back to the source.',
      why: 'Palimpsest tests the bounded vocabulary\'s projection and receipt terms as narrative structure — can the working surface be a story?',
      how: 'The concept exists in the Hub as a research direction. No build, no release date, no public artifact.',
      status: 'Proposal. Not deployed. Not scheduled.',
    },
  },
  {
    id: 'core32',
    num: '07',
    tag: 'Agent fleet',
    title: 'Core32',
    summary:
      'Thirty-two named specialist profiles, each with a bounded role, an input type, an output type, and a falsifier.',
    stats: [
      { label: 'Profiles', value: '32' },
      { label: 'Posture', value: 'Deployed (standard)' },
    ],
    link: '/hcan/',
    orientation: {
      what: 'Core32 is the fleet of thirty-two named specialist profiles. Each profile has a bounded input contract, a bounded output contract, and a falsifier — the condition under which the profile is mis-scoped.',
      why: 'The fleet is the agent side of the working surface. The ESS is the substrate; HCAN is the notation; Sigil is the inscription; Core32 is the workforce.',
      how: 'The agent host selects a profile for a task. The selection is a comparison, not a generation. The fleet does not grow by discovery; new profiles require a formal amendment.',
      status: 'Deployed as a standard. 32 profiles, closed set.',
    },
  },
  {
    id: 'ember',
    num: '08',
    tag: 'Design system',
    title: 'Ember Circuit',
    summary:
      'The visual language: field-950, ember-500, cream-bright. Georgia for display, system-ui for body, SF-Mono for code. The layout grammar that gives every surface its inspectable structure.',
    stats: [
      { label: 'Tokens', value: '3 primary + 5 accent' },
      { label: 'Layouts', value: '9 patterns' },
      { label: 'Posture', value: 'Deployed (this page)' },
    ],
    link: '/hcan/',
    orientation: {
      what: 'Ember Circuit is a token system (field-950 #0E1114, ember-500 #F07A37, cream-bright #F1E7D2), a typography stack (Georgia/display, system-ui/body, SF-Mono/code), and a layout grammar (cover, bento-grid, step-list, comparison-rows, timeline).',
      why: 'Every surface in this portfolio uses the same visual language. The tokens give it warmth; the layout grammar gives it structure; the typography gives it voice.',
      how: 'The tokens live in src/styles/tokens.css (consumer copy of the Hub-owned source). The layout grammar is in the r007 orientation deck. This portfolio page uses bento-grid for cards and step-list for processes.',
      status: 'Deployed. You are looking at it.',
    },
  },
];

export const processes: ProcessCardData[] = [
  {
    id: 'corpus-review',
    title: 'Corpus review',
    description: 'A four-step reading test applied to every source before it enters a claim.',
    steps: [
      { name: 'Select', detail: 'Choose the source by authority and relevance.' },
      { name: 'Frame', detail: 'Extract the claim, the boundary, and the question.' },
      { name: 'Read', detail: 'Read the full source, not a summary.' },
      { name: 'Receipt', detail: 'Record the source, the digest, and the review state.' },
    ],
    sections: {
      overview:
        'The corpus review is the reading test. Every source passes through it before entering a claim. It is a reading discipline, not a rubric or a gate.',
      inputs:
        'A candidate source — a citable, original statement. The source is not a summary or a paraphrase; it is the source itself.',
      outputs:
        'A bounded review record: the source locator, the digest, the review state (reviewed, review-required, or unreviewed), and the claim boundary.',
      receipt:
        'The receipt records the source, the digest, and the review state. It does not authorize the next action; it is a bounded process report.',
    },
  },
  {
    id: 'implementation-campaign',
    title: 'Implementation campaign',
    description: 'A five-step action test applied to every effect before it runs.',
    steps: [
      { name: 'Plan', detail: 'Name the effect, the target, and the scope.' },
      { name: 'Source', detail: 'Bind the source and the review state.' },
      { name: 'Release', detail: 'Obtain the explicit human release.' },
      { name: 'Preflight', detail: 'Check the scope and the no-touch boundaries.' },
      { name: 'Receipt', detail: 'Record what changed, how, and why.' },
    ],
    sections: {
      overview:
        'The implementation campaign is the action test. Every effect passes through it before it runs. It is a discipline, not a pipeline or a workflow engine.',
      inputs:
        'A named effect with a target and a scope, bound to a source that has passed corpus review.',
      outputs:
        'A bounded effect record: what changed, how, and why. The record is a receipt, not an authorization for the next action.',
      receipt:
        'The receipt records the effect, the target, the scope, the release, the preflight check, and the result. It does not authorize its own next action.',
    },
  },
];

export const reviewBriefs: ReviewBriefData[] = [
  {
    id: '01-ess-overview',
    num: '01',
    title: 'ESS Overview',
    kicker: '02 / Portfolio reference',
    sections: {
      overview: 'The Engineered Semantic Substrate (ESS) is the foundation under every working surface. Four spec-like layers, each owning a distinct axis of meaning.',
      purpose: 'To make every artifact, page, and claim traceable back to its source through a bounded vocabulary.',
      scope: 'TCCP (type), EKRP (module), MINC (algebra), Sigil (grammar). 663 bounded features. 64 lenses, 64 input types, 40 primitives.',
      evidence: 'The ESS four-spec posture records the substrate decisions and feature counts.',
      boundaries: 'The feature set is append-only. Cross-substrate features are composed at named seams. New entries require a formal amendment.',
      status: 'Deployed. The ESS is the foundation under every surface in this portfolio.',
      source: 'Hearth & Code Hub, ESS four-spec posture (projects 0001, 0002, 0003, 0031).',
      next: 'Read the Exocore Sigil brief for the surface substrate, or the Hub Orientation brief for the full structure.',
    },
  },
  {
    id: '02-exocore-sigil',
    num: '02',
    title: 'Exocore Sigil',
    kicker: '01 / Portfolio reference',
    sections: {
      overview: 'Sigil is the surface substrate of the ESS. It owns the inscription grammar: how bounded artifacts are written, checked, and rendered.',
      purpose: 'To give every artifact a surface — a way to be written, read, and verified.',
      scope: 'Grammar, fallback rules, and conformance checks. The primary artifact type is the OUT.sigil.',
      evidence: 'The Sigil grammar is in active use for artifact inscription in the Hub.',
      boundaries: 'Sigil does not own types (TCCP) or artifacts (EKRP); it owns the surface. It integrates at the MINC-Sigil and EKRP-Sigil seams.',
      status: 'Deployed as a standard.',
      source: 'Hearth & Code Hub, project 0031 (Exocore Sigil Standard).',
      next: 'Read the ESS Overview for the full four-substrate context, or the HCAN Grammar for a deployed notation.',
    },
  },
  {
    id: '03-hcan-grammar',
    num: '03',
    title: 'HCAN Grammar',
    kicker: '03 / Portfolio reference',
    sections: {
      overview: 'HCAN — the Hearthside Compact Agent Notation — is a condensed symbolic language for agent-to-human communication.',
      purpose: 'To compress intent, structure, and response into a portable notation that a human can read at a glance.',
      scope: 'Eight primitives (verb, binding, shape, flow, probe, guard, label, define), two protocols, and a portable envelope layer. Eight worked examples.',
      evidence: 'The HCAN page at /hcan/ is the interactive surface. The grammar library is Ember Circuit product K17.',
      boundaries: 'HCAN is a notation, not a programming language. It does not execute; it communicates.',
      status: 'Deployed. Live at /hcan/ on this site.',
      source: 'Hearth & Code Hub, project 0047 (HCAN Communication Medium).',
      next: 'Visit /hcan/ to explore the interactive grammar library.',
    },
  },
  {
    id: '04-corpus-review-process',
    num: '04',
    title: 'Corpus Review Process',
    kicker: '04 / Portfolio reference',
    sections: {
      overview: 'The corpus review is the reading test — the four-step process every source passes through before entering a claim.',
      purpose: 'To ensure every claim is source-bound and every source is read in full.',
      scope: 'Select, Frame, Read, Receipt. Four steps, applied to every source.',
      evidence: 'The r007 orientation deck slide 21 documents the process. The Hub project 0044 records the implementation.',
      boundaries: 'The corpus review is not a rubric, a checklist, or a gate. It is a reading discipline. A source that has not been reviewed is marked as such.',
      status: 'Deployed. The first of two bounded processes in the ESS.',
      source: 'Hearth & Code Hub, project 0044; r007 orientation deck slide 21.',
      next: 'Read the Implementation Campaign brief for the action test that follows the reading test.',
    },
  },
  {
    id: '05-implementation-campaign',
    num: '05',
    title: 'Implementation Campaign',
    kicker: '05 / Portfolio reference',
    sections: {
      overview: 'The implementation campaign is the action test — the five-step process every effect passes through before it runs.',
      purpose: 'To ensure every effect is named, sourced, released, checked, and recorded.',
      scope: 'Plan, Source, Release, Preflight, Receipt. Five steps, applied to every effect.',
      evidence: 'The r007 orientation deck slide 22 documents the process. The Hub project 0044 records the implementation.',
      boundaries: 'The implementation campaign is not a pipeline, a workflow engine, or a gate. An effect that has not passed the campaign is a proposal, not a deployment.',
      status: 'Deployed. The second of two bounded processes in the ESS.',
      source: 'r007 orientation deck slide 22; Hearth & Code Hub, project 0044.',
      next: 'Read the Release Pattern brief for the governance layer that binds the two processes.',
    },
  },
  {
    id: '06-exocore-platform',
    num: '06',
    title: 'Exocore Platform',
    kicker: '06 / Portfolio reference',
    sections: {
      overview: 'Exocore is the platform — a local-first cognitive workbench where the ESS, HCAN, Sigil, and Core32 surfaces meet actual work.',
      purpose: 'To provide a local-first workbench for agent work, knowledge engineering, and governance.',
      scope: 'Tauri v2 desktop (Rust), agent host, memory layer, VS Code workspace integration, Pi extension for bounded review.',
      evidence: 'Components are deployed individually (HCAN, the Pi extension) as they reach public-safe maturity.',
      boundaries: 'Exocore is not a SaaS product, a hosted service, or a cloud platform. It is local-first: data, agents, and review run on the user\'s machine.',
      status: 'In development. Components deployed individually.',
      source: 'Hearth & Code Hub, project 0002 (Exocore Platform).',
      next: 'Read the Agentic OS brief for the OS-shaped composition, or the Core32 Fleet brief for the agent side.',
    },
  },
  {
    id: '07-agentic-os',
    num: '07',
    title: 'Agentic OS',
    kicker: '07 / Portfolio reference',
    sections: {
      overview: 'The Agentic OS is the OS-shaped surface for governed agent workflows — the thesis that the ESS, Core32, and release pattern compose into a governance layer.',
      purpose: 'To test whether governed workflows can be composed into an operating system for agent work.',
      scope: 'Governed workflows, bounded vocabulary, release pattern, receipt trail. Not a kernel, not a scheduler — a governance layer.',
      evidence: 'The components (ESS, Core32, release pattern) are deployed individually. The OS-shaped composition is the research direction.',
      boundaries: 'The Agentic OS is not a deployed operating system. It is a thesis under active research.',
      status: 'Thesis, not deployment.',
      source: 'Hearth & Code Hub, projects 0039/0041 (agent-OS artifacts).',
      next: 'Read the Release Pattern brief for the governance discipline, or the Core32 Fleet brief for the workforce.',
    },
  },
  {
    id: '08-core32-fleet',
    num: '08',
    title: 'Core32 Fleet',
    kicker: '08 / Portfolio reference',
    sections: {
      overview: 'Core32 is the fleet of thirty-two named specialist profiles. Each has a bounded role, an input type, an output type, and a falsifier.',
      purpose: 'To provide a bounded set of agent roles that the agent host can dispatch for specific task types.',
      scope: '32 profiles (architectus through periagogus). Each with input contract, output contract, and falsifier. Closed set; new profiles require a formal amendment.',
      evidence: 'The fleet is deployed as a standard. The agent host selects profiles by comparison, not generation.',
      boundaries: 'The fleet is not a roster of available agents. It is not dynamic. It does not grow by discovery.',
      status: 'Deployed as a standard. 32 profiles, closed set.',
      source: 'Hearth & Code Hub, project 0003 (Core32 Profile Fleet).',
      next: 'Read the Exocore Platform brief for where the fleet runs, or the HCAN Grammar brief for how agents communicate.',
    },
  },
  {
    id: '09-bounded-vocabulary',
    num: '09',
    title: 'Bounded Vocabulary',
    kicker: '09 / Portfolio reference',
    sections: {
      overview: 'The bounded vocabulary is eight terms. No ninth term is permitted without a formal amendment.',
      purpose: 'To prevent the collapse of source into evidence, evidence into inference, or hypothesis into proposal.',
      scope: 'source, evidence, inference, hypothesis, proposal, projection, receipt, unknown. Eight terms, closed set.',
      evidence: 'Every claim in the working surface uses one of these eight labels. The absence of a label is itself a defect.',
      boundaries: 'No ninth term. Sub-terms (e.g., "strong evidence") are qualifiers, not vocabulary entries.',
      status: 'Deployed. The gating vocabulary for every receipt, review record, and question instance.',
      source: 'Hearth & Code Hub, root AGENTS.md section 03 (bounded vocabulary).',
      next: 'Read the Release Pattern brief to see how the vocabulary labels claims in receipts.',
    },
  },
  {
    id: '10-ember-circuit-design-system',
    num: '10',
    title: 'Ember Circuit Design System',
    kicker: '10 / Portfolio reference',
    sections: {
      overview: 'Ember Circuit is the visual language of this portfolio — a token system, a layout grammar, and a component convention.',
      purpose: 'To give every surface the same visual language: warm, structured, and inspectable.',
      scope: '3 primary tokens (field-950, ember-500, cream-bright) + 5 accent tokens. 9 layout patterns. 3 typography stacks (Georgia, system-ui, SF-Mono).',
      evidence: 'The tokens are in src/styles/tokens.css. The layout grammar is in the r007 deck. This portfolio page uses bento-grid and step-list.',
      boundaries: 'Ember Circuit is not a CSS framework. It is a token system and a layout grammar. It does not prescribe implementation.',
      status: 'Deployed. You are looking at it.',
      source: 'r007 orientation deck; landing repo src/styles/tokens.css.',
      next: 'Read the Hub Orientation Deck brief for the 32-slide presentation that established the visual language.',
    },
  },
  {
    id: '11-hub-orientation',
    num: '11',
    title: 'Hub Orientation',
    kicker: '11 / Portfolio reference',
    sections: {
      overview: 'The Hub is the knowledge substrate under every surface in this portfolio — a 16-wing structure with 256 workrooms.',
      purpose: 'To provide a bounded knowledge system where every artifact has a home, a source, and a review state.',
      scope: '16 wings, 16 workrooms each (256 total). 32 Core32 profiles. 64 lenses. 64 input types. 40 composition primitives.',
      evidence: 'The Hub root AGENTS.md and the r007 deck slides 5-14 document the structure.',
      boundaries: 'The Hub is a private knowledge system. This portfolio is its public-safe projection. No internal paths, credentials, or unreleased work appear here.',
      status: 'Deployed. The Hub is the canonical source; this portfolio is the projection.',
      source: 'Hearth & Code Hub, root AGENTS.md; r007 deck slides 5-14.',
      next: 'Read the Public-Safe Boundary brief for what is and is not projected.',
    },
  },
  {
    id: '12-exocore-the-game',
    num: '12',
    title: 'Exocore: The Game',
    kicker: '12 / Portfolio reference (concept, not deployed)',
    sections: {
      overview: 'A concept exploring the ESS as a game world, the Core32 fleet as playable characters, and the release pattern as the action economy.',
      purpose: 'To test whether the working surfaces can be inhabited as play.',
      scope: 'Concept only. No build, no release date, no public artifact.',
      evidence: 'The concept exists in the Hub as a research direction.',
      boundaries: 'Not deployed. Not scheduled. Not a product. A proposal that tests the working surface from a different angle.',
      status: 'Proposal. Not deployed.',
      source: 'Hearth & Code Hub, project 0005 (Exocore the Game).',
      next: 'Read the Palimpsest brief for the other concept surface.',
    },
  },
  {
    id: '13-palimpsest',
    num: '13',
    title: 'Palimpsest',
    kicker: '13 / Portfolio reference (concept, not deployed)',
    sections: {
      overview: 'The Last Archivist: a concept exploring layered knowledge representation and the return route.',
      purpose: 'To test the bounded vocabulary\'s projection and receipt terms as narrative structure.',
      scope: 'Concept only. No build, no release date, no public artifact.',
      evidence: 'The concept exists in the Hub as a research direction.',
      boundaries: 'Not deployed. Not scheduled. Not a product. A proposal that tests the working surface from a narrative angle.',
      status: 'Proposal. Not deployed.',
      source: 'Hearth & Code Hub, project 0030 (Palimpsest).',
      next: 'Read the Exocore: The Game brief for the other concept surface.',
    },
  },
  {
    id: '14-release-pattern',
    num: '14',
    title: 'Release Pattern',
    kicker: '14 / Portfolio reference',
    sections: {
      overview: 'The release pattern is the governance discipline: intent, release, receipt. Every effect follows it.',
      purpose: 'To make every effect inspectable — named, sourced, human-released, and recorded.',
      scope: 'Three steps: intent (name the effect), release (human authorizes), receipt (record what happened).',
      evidence: 'The Hub root AGENTS.md sections 13 and 25 document the pattern. Every commit in the landing repo follows it.',
      boundaries: 'The release is the human\'s voice, not the agent\'s. The agent does not self-authorize. The receipt does not authorize the next action.',
      status: 'Deployed. The governance layer of the Agentic OS.',
      source: 'Hearth & Code Hub, root AGENTS.md sections 13 and 25.',
      next: 'Read the Bounded Vocabulary brief for the claim labels used in receipts.',
    },
  },
  {
    id: '15-hub-orientation-deck',
    num: '15',
    title: 'Hub Orientation Deck (r007)',
    kicker: '15 / Portfolio reference',
    sections: {
      overview: 'The r007 Ember Circuit orientation deck is a 32-slide presentation introducing the full working surface.',
      purpose: 'To provide a visual orientation to the Hub, the ESS, the fleet, and the processes.',
      scope: '32 slides covering: the ordinary world (1-4), the ESS substrates (5-14), the platform (15-19), the tests (20-22), Sigil (23), governance (24-28), and the routes (29-32).',
      evidence: 'The deck uses the Ember Circuit design system. The layout grammar includes cover, bento-grid, step-list, comparison-rows, and timeline.',
      boundaries: 'The deck is a public-safe projection from the Hub outreach project. It is not a deployed product; it is a presentation surface.',
      status: 'Deployed as a presentation. The source for this portfolio\'s visual language.',
      source: 'Hearth & Code Hub, project 0038 (outreach), 04-packets/0002-hub-orientation-deck.',
      next: 'Read the Ember Circuit Design System brief for the token system the deck established.',
    },
  },
  {
    id: '16-public-safe-boundary',
    num: '16',
    title: 'Public-Safe Boundary',
    kicker: '16 / Portfolio reference',
    sections: {
      overview: 'This document defines what is and is not public-safe in this portfolio.',
      purpose: 'To prevent leaking internal Hub paths, credentials, or unreleased work.',
      scope: 'Public-safe: projections, source pointers by number, process descriptions, the bounded vocabulary, design tokens, the HCAN grammar. Not public-safe: internal paths, credentials, unreleased work, private session material, analytics.',
      evidence: 'The landing repo README.md content boundary section documents the boundary.',
      boundaries: 'The Tally Correspondence intake is the sole exception — a third-party form that receives submissions; the landing site does not store them.',
      status: 'Deployed. This portfolio is a public-safe projection.',
      source: 'Hearth & Code landing repo README.md, content boundary section.',
      next: 'Read the Hub Orientation brief for the structure behind the projection.',
    },
  },
];

export const vocabTerms = [
  { term: 'source', def: 'a quoted, citable, original statement' },
  { term: 'evidence', def: 'an observation or measurement that supports a claim' },
  { term: 'inference', def: 'a reasoned conclusion with visible assumptions' },
  { term: 'hypothesis', def: 'an explanation awaiting a discriminating test' },
  { term: 'proposal', def: 'a candidate artifact awaiting disposition' },
  { term: 'projection', def: 'a source-derived view that cannot replace its source' },
  { term: 'receipt', def: 'a bounded process report, not authority for the next action' },
  { term: 'unknown', def: 'an explicit gap, not a silent fill' },
];
