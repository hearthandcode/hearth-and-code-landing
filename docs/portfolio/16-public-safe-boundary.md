# Public-Safe Boundary

> 16 / Portfolio reference

This document defines what is and is not public-safe in this portfolio. It is the boundary that prevents leaking internal Hub paths, credentials, or unreleased work.

## What is public-safe

- **Projections**: public-safe renderings of Hub content that strip internal paths, credentials, and unreleased material.
- **Source pointers**: references to Hub project homes by number (e.g., project 0047) without internal file paths.
- **Process descriptions**: the corpus review and implementation campaign steps are public-safe; they describe the method, not the operational data.
- **The bounded vocabulary**: the eight terms are public-safe; they are the labeling system, not the operational data.
- **The Ember Circuit design tokens**: the visual language is public-safe; it is a consumer copy of the Hub-owned token source.
- **The HCAN grammar**: the notation, primitives, protocols, and examples are public-safe.

## What is not public-safe

- **Internal Hub paths**: no file paths, directory structures, or internal URLs from the Hub.
- **Credentials**: no API keys, tokens, passwords, or private configuration.
- **Unreleased work**: no draft artifacts, no unreviewed proposals, no work-in-progress that has not passed the release pattern.
- **Private session material**: no agent transcripts, no internal review notes, no private correspondence.
- **Analytics**: no tracking, no analytics, no first-party data collection. The landing site collects no visitor profile.

## The one exception

The Tally Correspondence intake (a third-party form embedded in the existing modal) is the sole exception. It receives submissions via Tally; the landing site does not store them. It has no attachments, payment, newsletter opt-in, hidden tracking fields, or private Hub access.

Source: Hearth & Code landing repo README.md, content boundary section.
