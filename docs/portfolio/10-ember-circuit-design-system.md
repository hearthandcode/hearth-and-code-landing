# Ember Circuit Design System

> 10 / Portfolio reference

Ember Circuit is the visual language of this portfolio and every surface in it. It is a token system, a layout grammar, and a component convention — not a CSS framework.

## Tokens

- **field-950** (#0E1114): the dark background; the surface everything sits on.
- **ember-500** (#F07A37): the primary accent; the signal that marks interaction.
- **cream-bright** (#F1E7D2): the text primary; the warm foreground on the dark surface.
- **Secondary accents**: forge (#C25A3A), gold (#F4B860), violet (#9B5DE5), plasma (#3FE0D0), signal (#1FB6A8).

## Typography

- **Display**: Georgia (or Fraunces for variable optical sizing), serif.
- **Body**: system-ui, sans-serif.
- **Code**: JetBrains Mono (or SF Mono / ui-monospace), monospace.

## Layout grammar

Nine patterns: cover, two-column, three-column, bento-grid, split-hero, endcap, step-list, comparison-rows, timeline. Each pattern has a named purpose and a constrained structure.

## Where it lives

The tokens are in `src/styles/tokens.css` in the landing repo (consumer copy of the Hub-owned source). The layout grammar is in the r007 orientation deck (32 slides, each using one or more patterns). The portfolio page you are reading uses the bento-grid for surface cards and the step-list for process diagrams.

Source: r007 orientation deck; landing repo `src/styles/tokens.css`.
