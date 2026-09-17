# Exocore Sigil

> 01 / Portfolio reference

Sigil is the surface substrate of the ESS. It owns the inscription grammar: how bounded artifacts are written, checked, and rendered.

## What Sigil does

Sigil defines the grammar, the fallback rules, and the conformance checks for artifact inscription. When an artifact is written in Sigil, it carries:

- A grammar that parses the artifact into its component parts.
- A fallback that renders gracefully when a part is missing.
- A conformance check that verifies the artifact against its declared schema.

## OUT.sigil

The primary artifact type is the OUT.sigil — a surface inscription that binds a source to its rendered form. Sigil artifacts are the public-facing surface of the ESS; they are what a reader sees when they encounter an ESS artifact.

## Position in the ESS

Sigil is the fourth substrate (grammar-theoretic). It integrates with MINC (composition) at the MINC-Sigil seam and with EKRP (artifact) at the EKRP-Sigil seam. It does not own types (TCCP) or artifacts (EKRP); it owns the surface.

## Status

Deployed as a standard. The Sigil grammar is in active use for artifact inscription in the Hub.

Source: Hearth & Code Hub, project 0031 (Exocore Sigil Standard).
