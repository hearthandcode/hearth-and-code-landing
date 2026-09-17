# HCAN Grammar

> 03 / Portfolio reference

HCAN — the Hearthside Compact Agent Notation — is a condensed symbolic language for agent-to-human communication. It compresses intent, structure, and response into a portable notation that a human can read at a glance.

## What HCAN is

Eight primitives, two protocols, and a portable envelope layer:

- **Primitives:** verb, binding, shape, flow, probe, guard, label, define (plus join, fork, suspend as structural operators).
- **Protocols:** the request-response protocol and the observation protocol.
- **Envelope:** a portable wrapper that carries the message type, the source, the target, and the status.

## Eight examples

HCAN ships with eight worked examples — from a TypeScript project orientation to a bounded-review question. Each example shows the notation in context, with the program block, the structured output, and the envelope layer.

## Where to see it

The HCAN page at /hcan/ on this site is the interactive surface. The Field Journal entry "HCAN: A Condensed Symbolic Language" is the public-safe projection of the canonical Hub article.

## Status

Deployed. The HCAN grammar library is live as an Ember Circuit product (K17 in the component registry).

Source: Hearth & Code Hub, project 0047 (HCAN Communication Medium); landing page /hcan/.
