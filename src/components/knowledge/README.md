# Knowledge Primitives — Ember Circuit Design System Extension

64 components (16 atoms + 32 composites + 16 templates) for knowledge work:
synthesis, engineering, operations, management, governance, provenance,
software design, documentation, creative work, and AI research.

## Machine-readable contract

The canonical contract lives in the Hub at:

```
internal/hearthandcode-knowledge-hub/02-design-system/06-knowledge-components/00-knowledge-primitives-system.yaml
```

When the contract and code diverge, update the YAML first.

## Showcase

All 64 components are rendered in isolation at:

```
http://127.0.0.1:4321/design-system/#knowledge
```

## Library recommendations (for replacing hand-coded SVG)

| Component | Recommended library |
|-----------|---------------------|
| ArchitectureDiagram | D3.js, mxGraph, React Flow |
| StateMachine | XState, Mermaid |
| SequenceDiagram | Mermaid, D3.js |
| KnowledgeGraphView | Cytoscape.js, vis.js, D3.js |
| CodeBlock (highlighting) | Shiki, Prism |

See the YAML contract's `library_recommendations` section for details.
