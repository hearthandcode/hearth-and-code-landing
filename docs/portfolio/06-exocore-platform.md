# Exocore Platform

> 06 / Portfolio reference

Exocore is the platform — a local-first cognitive workbench where the ESS, HCAN, Sigil, and Core32 surfaces meet actual work.

## What it is

- **Tauri v2 desktop** (Rust): the application shell. Local-first, no server, no telemetry.
- **Agent host**: the runtime that executes bounded agent workflows with the ESS vocabulary.
- **Memory layer**: a local-first knowledge substrate that preserves source, evidence, and provenance.
- **Workspace integration**: VS Code as the editing surface; the Pi extension bridges the workbench to the editor.
- **Pi extension**: bounded review and corpus review inside the editor; the agent surfaces questions, the human reviews answers.

## What it is not

Exocore is not a SaaS product, a hosted service, or a cloud platform. It is a local-first workbench: the data, the agents, and the review process run on the user's machine.

## Status

In development. The platform is the subject of active research and software development. Components are deployed individually (HCAN, the Pi extension) as they reach public-safe maturity.

Source: Hearth & Code Hub, project 0002 (Exocore Platform).
