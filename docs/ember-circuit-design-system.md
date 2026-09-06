# Ember Circuit design system

Status: public implementation projection · source review pending · verified false

This document codifies the public-facing design contract observed in the live
Ember Circuit Figma library (`knMBluUaIjQBrFceSZd9w5`) and the successor Hub
Ember Circuit source package on 2026-09-06. It is an implementation aid, not a
replacement for either source.

## Design thesis

Ember Circuit is a quiet, provenance-aware research workbench. Warmth provides
orientation rather than urgency. Circuit lines reveal relations rather than
decorate empty space. State is written literally; color supports it but never
carries it alone. Dense information remains useful because hierarchy comes from
structure, rhythm, and type—not from shrinking text.

## Color primitives

| Token | Value | Public role |
|---|---:|---|
| `field/950` | `#0e1114` | deepest page and diagram field |
| `field/900` | `#171512` | primary Obsidian Field |
| `field/800` | `#211d18` | raised reading surface |
| `field/700` | `#302a25` | ash-charcoal secondary surface |
| `line/500` | `#4b4237` | structural line and boundary |
| `ash/500` | `#8d8579` | quiet metadata on deep fields |
| `paper/100` | `#f1e7d2` | primary text and proof foreground |
| `paper/300` | `#cfc1ab` | secondary prose and labels |
| `ember/500` | `#f07a37` | primary action and warm focus |
| `forge/600` | `#c25a2a` | pressed or restrained ember |
| `gold/500` | `#d4ab63` | evidence and considered emphasis |
| `plasma/500` | `#82c4c3` | relation and information signal |
| `violet/500` | `#a78bfa` | synthesis and conceptual signal |
| `violet/300` | `#c4b5fd` | accessible violet foreground |
| `success/500` | `#79c99e` | literal supported/ready state |
| `danger/500` | `#e28c86` | literal risk/error state |

Public pages use charcoal fields throughout. “Paper” is a warm foreground role,
not a white page background. One information unit should normally carry only one
warm light.

## Typography

- Display: Fraunces, serif fallback; weight 400–600; line height 1.2.
- Body and interface: Inter, sans-serif fallback; base 16 px; line height 1.6.
- Reading prose: maximum 65 characters; line height 1.75.
- Metadata and controls: JetBrains Mono, monospace fallback; never below 14 px in
  compact presentation.
- Headings describe the question or object. Metadata states type, source,
  posture, or locator. Neither should imitate telemetry.

## Space, shape, and interaction

- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96 px.
- Radius scale: 0, 4, 6, 8 px. Structure stays crisp; warmth comes from color and
  language rather than pill-shaped decoration.
- Preferred interactive target: 44 px. Absolute minimum: 24 px.
- Motion: 200 ms controls, 300 ms panels, 8 s atmosphere. Respect reduced motion.
- Focus: visible ember outline with enough offset to remain legible on every
  field.

## Surface and density law

The system supports comfortable and compact density. Compact mode reduces
spacing, not legibility. Each region owns one concern. Atmosphere can inhabit a
threshold or open field, but never sits beneath dense copy, tables, controls, or
diagrams. A raised surface differs from its parent by one charcoal step and a
literal boundary; shadow is secondary.

## Data, evidence, and editorial law

- Put a locator, source label, or named absence beside consequential values.
- Keep unknown, missing, withheld, stale, and conflicting distinct.
- A card exposes object type, working posture, and a useful return or limit.
- Claims sit near evidence; locators behave as readable tokens, not distant
  footnotes.
- Long-form prose stays within a 65-character measure and ends with a return
  route.
- A projection links to its source without becoming that source or writing back.

## Atlas and diagram law

Every node names its object or owner. Every edge has a typed relation. Alternate
routes and omissions remain visible. D3 and Mermaid enhance an already-readable
semantic fallback; a loading or scripting failure must not erase the underlying
relationships.

## Public component grammar

The first implementation band contains 32 components in four groups of eight:

1. Presentation: Article Card, Case Study Card, Field Card, Metric Card, Media
   Frame, Callout Panel, Annotation Rail, Collection View.
2. Wayfinding: Route Card, Link List, Anchor Bar, Trail, Path Map, Section
   Directory, Related Work Panel, Return Marker.
3. Knowledge and evidence: Claim Card, Source Card, Concept Card, Synthesis
   Board, Tension Pair, Evidence Matrix, Question Ledger, Glossary Entry.
4. Systems and workflow: System Context, Boundary Map, Module Card, Interface
   Contract, Decision Record Card, Change Set, Test Run, Build Plan.

`ArticleCard` is the public library specialization of the source `WorkCard`.
`FieldCard` is the Methods specialization of the source `PracticeCard`. The
remaining names retain their source-band identity.

## Claim boundary

This codification records the design values and source relations inspected for
the local candidate. It does not claim pixel parity with every Figma frame,
complete accessibility certification, semantic acceptance, publication,
deployment, or efficacy with readers.
