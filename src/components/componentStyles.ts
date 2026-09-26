/**
 * componentStyles.ts
 *
 * Inlines all Ember Circuit component CSS as a single string constant.
 * The LivePreview component injects this into the document via a <style>
 * tag at mount time, ensuring every kc-* component class has CSS rules.
 *
 * This is a duplicate of /storybook/.storybook/ember-circuit.css but
 * scoped to the Astro showcase context (no Storybook chrome overrides).
 */

export const EMBER_CIRCUIT_COMPONENT_CSS = `

/* === ATOMS === */

.kc-citation-ref {
  display: inline-flex;
  align-items: baseline;
  gap: 0.15em;
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
}
.kc-citation-ref__author { color: var(--color-text-display); font-weight: 500; }
.kc-citation-ref__year { color: var(--color-text-secondary); }
.kc-citation-ref__locator { color: var(--color-accent-signal); font-weight: 500; }
.kc-citation-ref--link { text-decoration: none; cursor: pointer; }
.kc-citation-ref--link:hover { color: var(--color-accent-plasma); }
.kc-citation-ref--footnote { font-size: 0.75rem; border-bottom: 1px dotted var(--color-surface-rule-strong); }
.kc-citation-ref--parenthetical { font-style: italic; }

.kc-concept-term {
  display: inline-flex;
  align-items: baseline;
  gap: 0.25em;
  padding: 0.1em 0.4em;
  border-radius: var(--radius-sm);
  background: var(--color-surface-raised);
  border: 1px solid var(--color-surface-rule);
  color: var(--color-text-display);
  font-weight: 500;
  font-size: 0.875rem;
}
.kc-concept-term__type { color: var(--color-accent-signal); font-size: 0.75em; }
.kc-concept-term--abbreviation .kc-concept-term__type { color: var(--color-accent-ember); }
.kc-concept-term--verb .kc-concept-term__type { color: var(--color-accent-plasma); }
.kc-concept-term--phrase .kc-concept-term__type { color: var(--color-accent-violet); }

.kc-severity-dot {
  display: inline-flex;
  align-items: center;
  gap: 0.4em;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: currentColor;
}
.kc-severity-dot__pip {
  width: 0.5em;
  height: 0.5em;
  border-radius: 50%;
  background: currentColor;
  flex-shrink: 0;
}
.kc-severity-dot--info { color: var(--color-accent-plasma); }
.kc-severity-dot--success { color: var(--color-state-success); }
.kc-severity-dot--caution { color: var(--color-state-caution); }
.kc-severity-dot--warning { color: var(--color-accent-gold); }
.kc-severity-dot--error { color: var(--color-state-error); }
.kc-severity-dot--critical { color: var(--color-accent-ember); }
.kc-severity-dot.is-pulsing .kc-severity-dot__pip {
  animation: kc-severity-pulse 1.6s ease-in-out infinite;
}
@keyframes kc-severity-pulse {
  0%, 100% { opacity: 1; box-shadow: 0 0 0 0 currentColor; }
  50% { opacity: 0.5; box-shadow: 0 0 0 4px transparent; }
}

.kc-provenance {
  display: inline-flex;
  align-items: center;
  gap: 0.3em;
  padding: 0.1em 0.5em;
  border-radius: var(--radius-sm);
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  border: 1px solid currentColor;
}
.kc-provenance--primary { color: var(--color-accent-plasma); background: rgba(63, 224, 208, 0.08); }
.kc-provenance--derived { color: var(--color-accent-signal); background: rgba(31, 182, 168, 0.08); }
.kc-provenance--cited { color: var(--color-accent-violet); background: rgba(155, 93, 229, 0.08); }
.kc-provenance--verified { color: var(--color-state-success); background: rgba(143, 163, 149, 0.08); }
.kc-provenance--inferred { color: var(--color-accent-gold); background: rgba(244, 184, 96, 0.08); }
.kc-provenance--speculative { color: var(--color-text-secondary); background: rgba(207, 193, 171, 0.04); }

.kc-timestamp {
  display: inline-flex;
  align-items: baseline;
  gap: 0.4em;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--color-text-secondary);
}
.kc-timestamp__rel { color: var(--color-text-display); }

.kc-status-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.4em;
  padding: 0.15em 0.6em;
  border-radius: 999px;
  border: 1px solid currentColor;
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
.kc-status-pill__dot {
  width: 0.45em;
  height: 0.45em;
  border-radius: 50%;
  background: currentColor;
  flex-shrink: 0;
}
.kc-status-pill--sealed { color: var(--color-accent-violet); }
.kc-status-pill--approved { color: var(--color-state-success); }
.kc-status-pill--rejected { color: var(--color-state-error); }
.kc-status-pill--open { color: var(--color-accent-plasma); }
.kc-status-pill--draft { color: var(--color-accent-gold); }

.kc-license {
  display: inline-flex;
  align-items: center;
  gap: 0.35em;
  padding: 0.1em 0.5em;
  border-radius: var(--radius-sm);
  background: var(--color-surface-raised);
  color: var(--color-text-secondary);
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  border: 1px solid var(--color-surface-rule);
}
.kc-license__icon { color: var(--color-accent-gold); }
.kc-license--CC0 { color: var(--color-state-success); }
.kc-license--proprietary { color: var(--color-state-caution); }

.kc-doi-link {
  display: inline-flex;
  align-items: center;
  gap: 0.3em;
  padding: 0.05em 0.4em;
  border-radius: var(--radius-sm);
  background: var(--color-surface-raised);
  color: var(--color-accent-signal);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  border: 1px solid var(--color-surface-rule);
  text-decoration: none;
}
.kc-doi-link__icon { color: var(--color-accent-gold); }
.kc-doi-link:hover { border-color: var(--color-accent-signal); }

.kc-hash-digest {
  display: inline-flex;
  align-items: center;
  gap: 0.3em;
  padding: 0.1em 0.5em;
  border-radius: var(--radius-sm);
  background: var(--color-surface-recessed);
  color: var(--color-text-secondary);
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  cursor: pointer;
  border: 1px solid var(--color-surface-rule);
}
.kc-hash-digest__algo { color: var(--color-accent-gold); }
.kc-hash-digest__hash { color: var(--color-text-display); }
.kc-hash-digest:hover { border-color: var(--color-accent-signal); color: var(--color-text-display); }

.kc-path-segment {
  display: inline-flex;
  align-items: center;
  gap: 0.3em;
  padding: 0.1em 0.45em;
  border-radius: var(--radius-sm);
  color: var(--color-text-secondary);
  font-family: var(--font-mono);
  font-size: 0.75rem;
}
.kc-path-segment__icon { color: var(--color-accent-gold); }

.kc-confidence-bar {
  display: inline-flex;
  align-items: center;
  gap: 0.5em;
}
.kc-confidence-bar__track {
  position: relative;
  width: 5rem;
  height: 0.4rem;
  background: var(--color-surface-recessed);
  border-radius: 999px;
  overflow: hidden;
  border: 1px solid var(--color-surface-rule);
  display: inline-block;
  vertical-align: middle;
}
.kc-confidence-bar__fill {
  display: block;
  height: 100%;
  border-radius: 999px;
  background: var(--color-state-success);
  transition: width 200ms var(--motion-easing-default);
}
.kc-confidence-bar--low .kc-confidence-bar__fill { background: var(--color-state-error); }
.kc-confidence-bar--medium .kc-confidence-bar__fill { background: var(--color-accent-gold); }
.kc-confidence-bar--high .kc-confidence-bar__fill { background: var(--color-state-success); }
.kc-confidence-bar--stated .kc-confidence-bar__fill { background: var(--color-accent-signal); }
.kc-confidence-bar__value {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--color-text-display);
}

.kc-language-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.4em;
  padding: 0.1em 0.5em;
  border-radius: var(--radius-sm);
  background: var(--color-surface-recessed);
  color: var(--lang-color, var(--color-text-secondary));
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  text-transform: lowercase;
  border: 1px solid var(--color-surface-rule);
}
.kc-language-tag__pip {
  width: 0.45em;
  height: 0.45em;
  border-radius: 50%;
  background: var(--lang-color, var(--color-text-secondary));
}

.kc-reviewer-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.5em;
  padding: 0.25em 0.6em 0.25em 0.3em;
  border-radius: var(--radius-md);
  background: var(--color-surface-raised);
  border: 1px solid var(--color-surface-rule);
  font-family: var(--font-body);
  font-size: 0.75rem;
}
.kc-reviewer-chip__avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background: var(--color-accent-ember);
  color: var(--color-surface-primary);
  font-weight: bold;
  font-size: 0.625rem;
  line-height: 1;
  flex-shrink: 0;
}
.kc-reviewer-chip__body { display: flex; flex-direction: column; gap: 0.05em; }
.kc-reviewer-chip__name { color: var(--color-text-display); font-weight: 500; }
.kc-reviewer-chip__role { font-size: 0.6875rem; color: var(--color-text-secondary); }

.kc-evidence-strength {
  display: inline-flex;
  align-items: center;
  gap: 0.5em;
}
.kc-evidence-strength__bars { display: inline-flex; align-items: flex-end; gap: 0.15em; }
.kc-evidence-strength__bar {
  width: 0.25rem;
  height: 0.7rem;
  background: var(--color-surface-rule);
  border-radius: 1px;
}
.kc-evidence-strength__bar:nth-child(2) { height: 0.95rem; }
.kc-evidence-strength__bar:nth-child(3) { height: 1.2rem; }
.kc-evidence-strength__bar:nth-child(4) { height: 1.45rem; }
.kc-evidence-strength__bar:nth-child(5) { height: 1.7rem; }
.kc-evidence-strength__bar.is-filled { background: currentColor; }
.kc-evidence-strength--anecdotal { color: var(--color-text-secondary); }
.kc-evidence-strength--weak { color: var(--color-state-error); }
.kc-evidence-strength--moderate { color: var(--color-accent-gold); }
.kc-evidence-strength--strong { color: var(--color-accent-signal); }
.kc-evidence-strength--conclusive { color: var(--color-state-success); }
.kc-evidence-strength__label {
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: currentColor;
}

.kc-claim-marker {
  display: inline-flex;
  align-items: baseline;
  margin-left: 0.15em;
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  color: var(--claim-color, var(--color-text-secondary));
  vertical-align: super;
  line-height: 1;
}
.kc-claim-marker__bracket { color: var(--color-text-secondary); }
.kc-claim-marker__index { color: var(--claim-color, var(--color-text-secondary)); font-weight: bold; }

.kc-relation-verb {
  display: inline-flex;
  align-items: center;
  gap: 0.3em;
  padding: 0.1em 0.5em;
  border-radius: var(--radius-sm);
  background: var(--color-surface-raised);
  color: var(--color-accent-violet);
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  border: 1px solid var(--color-surface-rule);
}
.kc-relation-verb__arrow { color: var(--color-accent-plasma); font-weight: bold; }

/* === COMPOSITES === */

.ec-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5em 1em;
  border-radius: var(--radius-sm);
  border: 1px solid transparent;
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: all 150ms var(--motion-easing-default);
}
.ec-button--primary { background: var(--color-accent-ember); color: var(--color-surface-primary); border-color: var(--color-accent-ember); }
.ec-button--primary:hover { background: var(--color-accent-forge); }
.ec-button--secondary { background: var(--color-surface-raised); color: var(--color-text-display); border-color: var(--color-surface-rule); }
.ec-button--secondary:hover { border-color: var(--color-accent-signal); }
.ec-button--ghost { background: transparent; color: var(--color-text-secondary); }
.ec-button--ghost:hover { color: var(--color-text-display); background: var(--color-surface-recessed); }
.ec-button--danger { background: var(--color-state-error); color: var(--color-text-primary); border-color: var(--color-state-error); }
.ec-button--sm { padding: 0.3em 0.7em; font-size: 0.75rem; }
.ec-button--lg { padding: 0.7em 1.4em; font-size: 1rem; }
.ec-button:disabled { opacity: 0.5; cursor: not-allowed; }

.kc-citation-chain {
  padding: 0.75rem;
  background: var(--color-surface-raised);
  border: 1px solid var(--color-surface-rule);
  border-radius: var(--radius-md);
}
.kc-citation-chain__label {
  margin: 0 0 0.5rem 0;
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-text-secondary);
}
.kc-citation-chain__list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-mono);
  font-size: 0.8125rem;
}
.kc-citation-chain__item { display: inline-flex; align-items: center; gap: 0.4em; }
.kc-citation-chain__index {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  background: var(--color-accent-signal);
  color: var(--color-surface-primary);
  font-size: 0.625rem;
  font-weight: bold;
  flex-shrink: 0;
}
.kc-citation-chain__author { color: var(--color-text-display); }
.kc-citation-chain__year { color: var(--color-text-secondary); margin-left: 0.2em; }
.kc-citation-chain__locator { color: var(--color-accent-signal); margin-left: 0.2em; font-weight: 500; }
.kc-citation-chain__sep { color: var(--color-text-secondary); font-size: 0.875rem; margin: 0 0.2em; }

.kc-concept-card {
  padding: 1rem;
  background: var(--color-surface-raised);
  border: 1px solid var(--color-surface-rule);
  border-radius: var(--radius-md);
  border-left: 3px solid var(--color-accent-signal);
}
.kc-concept-card__header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}
.kc-concept-card__term {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.0625rem;
  font-weight: bold;
  color: var(--color-text-display);
}
.kc-concept-card__type {
  font-family: var(--font-mono);
  font-size: 0.625rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-accent-signal);
  padding: 0.1em 0.4em;
  border: 1px solid var(--color-accent-signal);
  border-radius: var(--radius-sm);
}
.kc-concept-card__definition {
  margin: 0 0 0.75rem 0;
  font-size: 0.875rem;
  line-height: 1.5;
  color: var(--color-text-secondary);
}
.kc-concept-card__relations {
  display: flex;
  flex-direction: column;
  gap: 0.3em;
  padding-top: 0.5rem;
  border-top: 1px solid var(--color-surface-rule);
}
.kc-concept-card__relation {
  display: flex;
  align-items: center;
  gap: 0.5em;
  font-family: var(--font-mono);
  font-size: 0.75rem;
}
.kc-concept-card__verb { color: var(--color-accent-violet); text-transform: lowercase; }
.kc-concept-card__target { color: var(--color-text-display); }

.kc-synthesis {
  padding: 1rem;
  background: var(--color-surface-raised);
  border: 1px solid var(--color-surface-rule);
  border-radius: var(--radius-md);
}
.kc-synthesis__header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--color-surface-rule);
}
.kc-synthesis__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.0625rem;
  font-weight: bold;
  color: var(--color-text-display);
}
.kc-synthesis__consensus {
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-state-success);
}
.kc-synthesis__claims {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.kc-synthesis__claim {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.5em;
  padding-left: 0.75rem;
  border-left: 2px solid var(--color-surface-rule);
}
.kc-synthesis__index {
  font-family: var(--font-mono);
  color: var(--color-accent-signal);
  font-size: 0.75rem;
  font-weight: bold;
}
.kc-synthesis__text {
  flex: 1;
  font-size: 0.875rem;
  line-height: 1.5;
  color: var(--color-text-display);
}
.kc-synthesis__sources {
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  color: var(--color-text-secondary);
}
.kc-synthesis__source { color: var(--color-text-secondary); }

.kc-adr {
  background: var(--color-surface-raised);
  border: 1px solid var(--color-surface-rule);
  border-radius: var(--radius-md);
  overflow: hidden;
}
.kc-adr--accepted { border-left: 3px solid var(--color-state-success); }
.kc-adr--proposed { border-left: 3px solid var(--color-accent-gold); }
.kc-adr--rejected { border-left: 3px solid var(--color-state-error); }
.kc-adr--superseded { border-left: 3px solid var(--color-text-secondary); }
.kc-adr--deprecated { border-left: 3px solid var(--color-state-caution); }
.kc-adr__header {
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  gap: 0.75rem;
  align-items: center;
  width: 100%;
  padding: 0.75rem 1rem;
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
  font-family: var(--font-body);
  color: var(--color-text-display);
}
.kc-adr__header:hover { background: var(--color-surface-recessed); }
.kc-adr__id { display: flex; flex-direction: column; gap: 0.2em; min-width: 4rem; }
.kc-adr__number {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: bold;
  color: var(--color-text-display);
}
.kc-adr__status {
  font-family: var(--font-mono);
  font-size: 0.625rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: currentColor;
}
.kc-adr__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 500;
  color: var(--color-text-display);
}
.kc-adr__date {
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  color: var(--color-text-secondary);
}
.kc-adr__chevron { color: var(--color-text-secondary); font-size: 0.875rem; }
.kc-adr__body {
  padding: 0.75rem 1rem;
  border-top: 1px solid var(--color-surface-rule);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.kc-adr__section { font-size: 0.875rem; line-height: 1.5; color: var(--color-text-secondary); }
.kc-adr__section p { margin: 0; }
.kc-adr__section ul { margin: 0.5em 0 0 0; padding-left: 1.2em; }
.kc-adr__section--decision {
  padding: 0.5rem;
  background: var(--color-surface-recessed);
  border-radius: var(--radius-sm);
  color: var(--color-text-display);
  border-left: 2px solid var(--color-accent-signal);
}

.kc-workflow-state {
  padding: 1rem;
  background: var(--color-surface-raised);
  border: 1px solid var(--color-surface-rule);
  border-radius: var(--radius-md);
}
.kc-workflow-state__track {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0;
  margin-bottom: 0.75rem;
  padding: 1rem 0;
}
.kc-workflow-state__node {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3em;
  flex: 1;
  position: relative;
}
.kc-workflow-state__node:not(:last-child)::after {
  content: '';
  position: absolute;
  top: 0.55em;
  left: 50%;
  right: -50%;
  height: 1px;
  background: var(--color-surface-rule);
}
.kc-workflow-state__dot {
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 50%;
  background: var(--color-surface-rule);
  border: 2px solid var(--color-surface-primary);
  z-index: 1;
}
.kc-workflow-state__node.is-current .kc-workflow-state__dot {
  background: var(--color-accent-ember);
  box-shadow: 0 0 8px var(--color-accent-ember);
}
.kc-workflow-state__label {
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-secondary);
}
.kc-workflow-state__node.is-current .kc-workflow-state__label {
  color: var(--color-accent-ember);
  font-weight: bold;
}
.kc-workflow-state__transitions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--color-surface-rule);
}
.kc-workflow-state__from {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--color-text-secondary);
  margin-right: 0.5rem;
}
.kc-workflow-state__from strong { color: var(--color-accent-ember); }
.kc-workflow-state__btn {
  padding: 0.3em 0.7em;
  background: var(--color-surface-recessed);
  border: 1px solid var(--color-surface-rule);
  border-radius: var(--radius-sm);
  color: var(--color-text-display);
  font-family: var(--font-body);
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 150ms var(--motion-easing-default);
}
.kc-workflow-state__btn:hover {
  background: var(--color-accent-signal);
  color: var(--color-surface-primary);
  border-color: var(--color-accent-signal);
}

.kc-human-gate {
  display: flex;
  gap: 0.75rem;
  padding: 1rem;
  background: var(--color-surface-raised);
  border: 1px solid var(--color-surface-rule);
  border-radius: var(--radius-md);
}
.kc-human-gate--approved { border-left: 3px solid var(--color-state-success); }
.kc-human-gate--rejected { border-left: 3px solid var(--color-state-error); }
.kc-human-gate--pending { border-left: 3px solid var(--color-accent-gold); }
.kc-human-gate--escalated { border-left: 3px solid var(--color-accent-violet); }
.kc-human-gate__seal {
  flex-shrink: 0;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: currentColor;
  color: var(--color-surface-primary);
}
.kc-human-gate--approved .kc-human-gate__seal { background: var(--color-state-success); color: var(--color-surface-primary); }
.kc-human-gate--rejected .kc-human-gate__seal { background: var(--color-state-error); color: var(--color-surface-primary); }
.kc-human-gate--pending .kc-human-gate__seal { background: var(--color-accent-gold); color: var(--color-surface-primary); }
.kc-human-gate--escalated .kc-human-gate__seal { background: var(--color-accent-violet); color: var(--color-surface-primary); }
.kc-human-gate__seal-icon { font-size: 1.25rem; font-weight: bold; color: var(--color-surface-primary); }
.kc-human-gate__body { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 0.5rem; }
.kc-human-gate__header { display: flex; align-items: baseline; flex-wrap: wrap; gap: 0.5rem; }
.kc-human-gate__id {
  font-family: var(--font-mono);
  font-size: 0.625rem;
  color: var(--color-accent-signal);
  background: rgba(31, 182, 168, 0.1);
  padding: 0.1em 0.4em;
  border-radius: var(--radius-sm);
}
.kc-human-gate__name { margin: 0; font-family: var(--font-display); font-size: 1rem; font-weight: bold; color: var(--color-text-display); flex: 1; }
.kc-human-gate__decision {
  font-family: var(--font-mono);
  font-size: 0.625rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: currentColor;
}
.kc-human-gate__desc { margin: 0; font-size: 0.875rem; line-height: 1.5; color: var(--color-text-secondary); }
.kc-human-gate__criteria {
  list-style: none;
  margin: 0;
  padding: 0.5em 0;
  border-top: 1px solid var(--color-surface-rule);
  border-bottom: 1px solid var(--color-surface-rule);
  display: flex;
  flex-direction: column;
  gap: 0.3em;
  font-size: 0.8125rem;
  color: var(--color-text-display);
}
.kc-human-gate__criteria li { display: flex; align-items: baseline; gap: 0.5em; }
.kc-human-gate__check { color: var(--color-accent-signal); }
.kc-human-gate__avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 50%;
  background: var(--color-accent-ember);
  color: var(--color-surface-primary);
  font-weight: bold;
  font-size: 0.6875rem;
  line-height: 1;
  flex-shrink: 0;
  align-self: center;
}

.kc-alert {
  display: flex;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: var(--color-surface-raised);
  border: 1px solid var(--color-surface-rule);
  border-radius: var(--radius-md);
}
.kc-alert__icon { flex-shrink: 0; font-size: 1.125rem; }
.kc-alert--info .kc-alert__icon { color: var(--color-accent-plasma); }
.kc-alert--success .kc-alert__icon { color: var(--color-state-success); }
.kc-alert--caution .kc-alert__icon,
.kc-alert--warning .kc-alert__icon { color: var(--color-state-caution); }
.kc-alert--error .kc-alert__icon,
.kc-alert--danger .kc-alert__icon { color: var(--color-state-error); }
.kc-alert__title { margin: 0 0 0.3em 0; font-size: 0.9375rem; font-weight: bold; color: var(--color-text-display); }
.kc-alert__body { font-size: 0.8125rem; line-height: 1.5; color: var(--color-text-secondary); }

.kc-evidence-receipt {
  padding: 1rem;
  background: var(--color-surface-raised);
  border: 1px solid var(--color-surface-rule);
  border-radius: var(--radius-md);
  position: relative;
}
.kc-evidence-receipt::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 0.2rem;
  background: linear-gradient(90deg, var(--color-accent-ember), var(--color-accent-gold), var(--color-accent-signal));
}
.kc-evidence-receipt__corner { display: flex; align-items: center; gap: 0.4em; margin-bottom: 0.5rem; }
.kc-evidence-receipt__icon { color: var(--color-accent-gold); font-size: 1rem; }
.kc-evidence-receipt__type {
  font-family: var(--font-mono);
  font-size: 0.625rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-text-secondary);
}
.kc-evidence-receipt__desc { margin: 0 0 0.75rem 0; font-size: 0.875rem; line-height: 1.5; color: var(--color-text-display); }
.kc-evidence-receipt__details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  gap: 0.5rem;
  margin: 0;
  padding: 0.5rem;
  background: var(--color-surface-recessed);
  border-radius: var(--radius-sm);
  font-family: var(--font-mono);
  font-size: 0.6875rem;
}
.kc-evidence-receipt__details div { display: flex; flex-direction: column; gap: 0.1em; min-width: 0; }
.kc-evidence-receipt__details dt {
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: 0.625rem;
}
.kc-evidence-receipt__details dd { margin: 0; color: var(--color-text-display); word-break: break-all; }
.kc-evidence-receipt__details code { background: transparent; color: var(--color-accent-signal); padding: 0; }

/* Tree */
.kc-taxonomy-tree { padding: 0.75rem; background: var(--color-surface-recessed); border: 1px solid var(--color-surface-rule); border-radius: var(--radius-md); font-family: var(--font-mono); font-size: 0.8125rem; }
.kc-taxonomy-tree__root, .kc-taxonomy-tree ul { list-style: none; margin: 0; padding-left: 0; }
.kc-taxonomy-tree ul { padding-left: 1rem; border-left: 1px dashed var(--color-surface-rule); margin-left: 0.5em; }
.kc-taxonomy-tree__item { margin: 0.2em 0; }
.kc-taxonomy-tree__row {
  display: flex;
  align-items: center;
  gap: 0.3em;
  padding: 0.1em 0.4em;
  border-radius: var(--radius-sm);
  cursor: pointer;
  color: var(--color-text-display);
}
.kc-taxonomy-tree__row:hover { background: var(--color-surface-raised); }
.kc-taxonomy-tree__toggle { display: inline-block; width: 0.9em; text-align: center; color: var(--color-accent-signal); font-weight: bold; user-select: none; }
.kc-taxonomy-tree__label { font-weight: 500; }
.kc-taxonomy-tree__desc { color: var(--color-text-secondary); margin-left: 0.5em; font-family: var(--font-body); font-size: 0.75rem; }

/* Dialogue */
.kc-dialogue { padding: 1rem; background: var(--color-surface-raised); border: 1px solid var(--color-surface-rule); border-radius: var(--radius-md); }
.kc-dialogue__node { display: flex; flex-direction: column; gap: 0.5rem; }
.kc-dialogue__speaker { font-family: var(--font-mono); font-size: 0.6875rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--color-accent-signal); font-weight: bold; }
.kc-dialogue__text { margin: 0; padding: 0.75rem; background: var(--color-surface-recessed); border-left: 3px solid var(--color-accent-ember); border-radius: var(--radius-sm); font-size: 0.9375rem; line-height: 1.5; color: var(--color-text-display); font-family: var(--font-display); font-style: italic; }
.kc-dialogue__choices { display: flex; flex-direction: column; gap: 0.4em; }
.kc-dialogue__choice {
  text-align: left;
  padding: 0.5em 0.75em;
  background: transparent;
  border: 1px solid var(--color-surface-rule);
  border-radius: var(--radius-sm);
  color: var(--color-text-display);
  font-family: var(--font-body);
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 150ms var(--motion-easing-default);
}
.kc-dialogue__choice:hover:not(:disabled) { background: var(--color-surface-recessed); border-color: var(--color-accent-signal); color: var(--color-accent-signal); }
.kc-dialogue__choice:disabled { opacity: 0.5; cursor: not-allowed; }
.kc-dialogue__end { margin-left: 0.5em; color: var(--color-text-secondary); font-family: var(--font-mono); font-size: 0.6875rem; }

/* StatCard, FeatureCard, ProfileCard, etc. — basic structure */
.kc-stat-card {
  padding: 1rem;
  background: var(--color-surface-raised);
  border: 1px solid var(--color-surface-rule);
  border-radius: var(--radius-md);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.kc-stat-card__value {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: bold;
  line-height: 1;
  color: var(--color-text-display);
}
.kc-stat-card__label {
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-secondary);
}
.kc-stat-card__trend {
  display: flex;
  align-items: baseline;
  gap: 0.3em;
  font-family: var(--font-mono);
  font-size: 0.75rem;
}
.kc-stat-card__trend--up { color: var(--color-state-success); }
.kc-stat-card__trend--down { color: var(--color-state-error); }
.kc-stat-card__trend--flat { color: var(--color-text-secondary); }
.kc-stat-card__context { color: var(--color-text-secondary); font-family: var(--font-body); font-size: 0.75rem; }
.kc-stat-card--success { border-left: 3px solid var(--color-state-success); }
.kc-stat-card--caution { border-left: 3px solid var(--color-state-caution); }
.kc-stat-card--error { border-left: 3px solid var(--color-state-error); }
.kc-stat-card--balanced { border-left: 3px solid var(--color-accent-violet); }
.kc-stat-card--ember { border-left: 3px solid var(--color-accent-ember); }
.kc-stat-card--signal { border-left: 3px solid var(--color-accent-signal); }
.kc-stat-card--violet { border-left: 3px solid var(--color-accent-violet); }

.kc-feature-card {
  padding: 1rem;
  background: var(--color-surface-raised);
  border: 1px solid var(--color-surface-rule);
  border-radius: var(--radius-md);
  display: grid;
  gap: 0.75rem;
  grid-template-columns: auto 1fr;
  align-items: start;
}
.kc-feature-card__icon { color: var(--color-accent-signal); }
.kc-feature-card__content { display: flex; flex-direction: column; gap: 0.3em; }
.kc-feature-card__title { margin: 0; font-family: var(--font-display); font-size: 1rem; font-weight: 500; color: var(--color-text-display); }
.kc-feature-card__description { margin: 0; font-size: 0.8125rem; line-height: 1.5; color: var(--color-text-secondary); }
.kc-feature-card--hearth { border-left: 3px solid var(--color-accent-ember); }
.kc-feature-card--code { border-left: 3px solid var(--color-accent-signal); }
.kc-feature-card--balanced { border-left: 3px solid var(--color-accent-violet); }

.kc-card { background: var(--color-surface-raised); border: 1px solid var(--color-surface-rule); border-radius: var(--radius-md); padding: 1rem; }
.kc-card__body {}

.kc-profile-card { display: flex; gap: 0.75rem; align-items: center; padding: 1rem; background: var(--color-surface-raised); border: 1px solid var(--color-surface-rule); border-radius: var(--radius-md); }
.kc-profile-card__content { display: flex; flex-direction: column; gap: 0.2em; }
.kc-profile-card__name { margin: 0; font-family: var(--font-display); font-size: 1rem; font-weight: bold; color: var(--color-text-display); }
.kc-profile-card__title { margin: 0; font-size: 0.8125rem; color: var(--color-text-secondary); }
.kc-profile-card__bio { margin: 0.5em 0 0 0; font-size: 0.8125rem; color: var(--color-text-secondary); line-height: 1.5; }

.kc-quote-card { padding: 1rem; background: var(--color-surface-raised); border: 1px solid var(--color-surface-rule); border-radius: var(--radius-md); border-left: 3px solid var(--color-accent-violet); }
.kc-quote-card__mark { color: var(--color-accent-ember); font-family: var(--font-display); font-size: 3rem; line-height: 0.5; margin-bottom: 0.5rem; }
.kc-quote-card__quote { margin: 0 0 0.75rem 0; font-family: var(--font-display); font-style: italic; font-size: 1.0625rem; line-height: 1.5; color: var(--color-text-display); }
.kc-quote-card__attribution { display: flex; flex-direction: column; gap: 0.2em; padding-top: 0.5rem; border-top: 1px solid var(--color-surface-rule); font-family: var(--font-mono); font-size: 0.75rem; }
.kc-quote-card__author { color: var(--color-text-display); }
.kc-quote-card__source { color: var(--color-text-secondary); font-style: italic; }

.kc-pricing-card { padding: 1.5rem; background: var(--color-surface-raised); border: 1px solid var(--color-surface-rule); border-radius: var(--radius-md); display: flex; flex-direction: column; gap: 1rem; }
.kc-pricing-card--highlighted { border-color: var(--color-accent-ember); box-shadow: 0 0 16px rgba(232, 91, 78, 0.2); }
.kc-pricing-card__tier { margin: 0; font-family: var(--font-display); font-size: 1.25rem; font-weight: bold; color: var(--color-text-display); }
.kc-pricing-card__price-row { display: flex; align-items: baseline; gap: 0.3em; }
.kc-pricing-card__price { font-family: var(--font-display); font-size: 2rem; font-weight: bold; color: var(--color-accent-ember); }
.kc-pricing-card__period { color: var(--color-text-secondary); }
.kc-pricing-card__features { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.3em; font-size: 0.875rem; color: var(--color-text-secondary); }
.kc-pricing-card__features li::before { content: '✓ '; color: var(--color-accent-signal); }
.kc-pricing-card__cta {
  display: inline-block;
  padding: 0.5em 1em;
  background: var(--color-accent-ember);
  color: var(--color-surface-primary);
  border-radius: var(--radius-sm);
  text-decoration: none;
  font-weight: 500;
  text-align: center;
}

.kc-product-card {
  display: block;
  padding: 1rem;
  background: var(--color-surface-raised);
  border: 1px solid var(--color-surface-rule);
  border-radius: var(--radius-md);
  text-decoration: none;
  color: inherit;
  transition: border-color 150ms var(--motion-easing-default);
}
.kc-product-card:hover { border-color: var(--color-accent-signal); }
.kc-product-card__title { margin: 0 0 0.5rem 0; font-family: var(--font-display); font-size: 1rem; font-weight: bold; color: var(--color-text-display); }
.kc-product-card__description { margin: 0 0 0.5rem 0; font-size: 0.8125rem; color: var(--color-text-secondary); line-height: 1.5; }
.kc-product-card__price { font-family: var(--font-mono); font-size: 0.875rem; color: var(--color-accent-gold); }

.kc-testimonial-card { padding: 1rem; background: var(--color-surface-raised); border: 1px solid var(--color-surface-rule); border-radius: var(--radius-md); border-left: 3px solid var(--color-accent-violet); }
.kc-testimonial-card__quote { margin: 0 0 0.75rem 0; font-family: var(--font-display); font-style: italic; line-height: 1.5; color: var(--color-text-display); }
.kc-testimonial-card__footer { display: flex; flex-direction: column; gap: 0.5em; padding-top: 0.5em; border-top: 1px solid var(--color-surface-rule); }
.kc-testimonial-card__rating { color: var(--color-accent-gold); letter-spacing: 0.1em; }

.kc-search-bar { display: flex; align-items: stretch; gap: 0.5rem; max-width: 32rem; }
.kc-search-bar__input-wrap { display: flex; align-items: center; flex: 1; padding: 0 0.75em; background: var(--color-surface-recessed); border: 1px solid var(--color-surface-rule); border-radius: var(--radius-sm); color: var(--color-text-secondary); }
.kc-search-bar__input { background: transparent; border: none; color: var(--color-text-display); flex: 1; padding: 0.5em 0; font-family: var(--font-body); font-size: 0.875rem; }
.kc-search-bar__input:focus { outline: none; }
.kc-search-bar__submit { padding: 0 1em; background: var(--color-accent-signal); color: var(--color-surface-primary); border: none; border-radius: var(--radius-sm); cursor: pointer; font-weight: 500; }

.kc-pagination { display: flex; align-items: center; gap: 0.5rem; padding: 1rem 0; }
.kc-pagination__prev, .kc-pagination__next { padding: 0.4em 0.8em; background: transparent; border: 1px solid var(--color-surface-rule); border-radius: var(--radius-sm); color: var(--color-text-secondary); cursor: pointer; font-size: 0.875rem; }
.kc-pagination__list { display: flex; gap: 0.25em; list-style: none; margin: 0; padding: 0; }
.kc-pagination__page { padding: 0.4em 0.7em; background: transparent; border: 1px solid var(--color-surface-rule); border-radius: var(--radius-sm); color: var(--color-text-secondary); cursor: pointer; font-family: var(--font-mono); font-size: 0.8125rem; }
.kc-pagination__page.is-current { background: var(--color-accent-signal); color: var(--color-surface-primary); border-color: var(--color-accent-signal); }

.kc-run-log { padding: 0.75rem; background: var(--color-surface-recessed); border: 1px solid var(--color-surface-rule); border-radius: var(--radius-md); font-family: var(--font-mono); font-size: 0.8125rem; }
.kc-run-log__filters { display: flex; gap: 0.3em; flex-wrap: wrap; margin-bottom: 0.5rem; }
.kc-run-log__filter { padding: 0.2em 0.6em; background: transparent; border: 1px solid var(--color-surface-rule); border-radius: var(--radius-sm); color: var(--color-text-secondary); font-family: var(--font-mono); font-size: 0.6875rem; text-transform: uppercase; cursor: pointer; }
.kc-run-log__filter.is-active { background: var(--color-accent-signal); color: var(--color-surface-primary); border-color: var(--color-accent-signal); }
.kc-run-log__entries { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.15em; }
.kc-run-log__entry { border-left: 2px solid currentColor; padding-left: 0.5rem; }
.kc-run-log__entry--info { color: var(--color-accent-plasma); }
.kc-run-log__entry--success { color: var(--color-state-success); }
.kc-run-log__header { display: flex; align-items: baseline; gap: 0.5em; width: 100%; background: transparent; border: none; padding: 0.1em 0; cursor: pointer; text-align: left; }

.kc-breadcrumb nav { font-family: var(--font-mono); font-size: 0.8125rem; color: var(--color-text-secondary); }
.kc-breadcrumb__list { display: flex; gap: 0.3em; list-style: none; margin: 0; padding: 0; flex-wrap: wrap; align-items: center; }
.kc-breadcrumb__item { display: inline-flex; align-items: center; gap: 0.3em; }
.kc-breadcrumb__link { color: var(--color-text-secondary); text-decoration: none; }
.kc-breadcrumb__link:hover { color: var(--color-accent-signal); }
.kc-breadcrumb__current { color: var(--color-text-display); }
.kc-breadcrumb__sep { color: var(--color-text-secondary); opacity: 0.5; }

.kc-tabs { padding: 0; }
.kc-tabs__list { display: flex; gap: 0; border-bottom: 1px solid var(--color-surface-rule); margin-bottom: 1rem; }
.kc-tabs__trigger { padding: 0.5em 1em; background: transparent; border: none; color: var(--color-text-secondary); cursor: pointer; font-family: var(--font-body); font-size: 0.875rem; border-bottom: 2px solid transparent; }
.kc-tabs__trigger.is-active { color: var(--color-text-display); border-bottom-color: var(--color-accent-ember); }
.kc-tabs__panel { padding: 1rem; color: var(--color-text-display); }

.kc-stepper { list-style: none; margin: 0; padding: 0; display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; }
.kc-stepper__step { display: flex; align-items: center; gap: 0.5em; }
.kc-stepper__dot { display: inline-flex; align-items: center; justify-content: center; width: 1.75rem; height: 1.75rem; border-radius: 50%; background: var(--color-surface-rule); color: var(--color-surface-primary); font-weight: bold; font-size: 0.875rem; }
.kc-stepper__step.is-current .kc-stepper__dot { background: var(--color-accent-ember); }
.kc-stepper__step.is-complete .kc-stepper__dot { background: var(--color-state-success); }
.kc-stepper__label { font-family: var(--font-mono); font-size: 0.8125rem; color: var(--color-text-secondary); }
.kc-stepper__step.is-current .kc-stepper__label { color: var(--color-accent-ember); font-weight: bold; }

.kc-link-group { padding: 1rem; background: var(--color-surface-raised); border: 1px solid var(--color-surface-rule); border-radius: var(--radius-md); }
.kc-link-group__title { margin: 0 0 0.5rem 0; font-family: var(--font-mono); font-size: 0.6875rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--color-text-secondary); }
.kc-link-group__list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.3em; }
.kc-link-group__item { padding: 0.3em 0; border-bottom: 1px solid var(--color-surface-rule); }
.kc-link-group__item:last-child { border-bottom: none; }
.kc-link-group__link { display: flex; flex-direction: column; gap: 0.1em; color: var(--color-text-display); text-decoration: none; }
.kc-link-group__link small { color: var(--color-text-secondary); font-size: 0.75rem; }
.kc-link-group__label { font-size: 0.875rem; font-weight: 500; }

.kc-list { list-style: none; margin: 0; padding: 0; font-family: var(--font-body); }
.kc-list__item { padding: 0.3em 0; }
.kc-list__link { color: var(--color-text-display); text-decoration: none; }
.kc-list__link:hover { color: var(--color-accent-signal); }

.kc-list-grid { list-style: none; margin: 0; padding: 0; display: grid; gap: 0.625rem; grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr)); }
.kc-list-grid__item { display: inline-flex; }
.kc-list-grid__link { color: var(--color-text-display); text-decoration: none; padding: 0.4em 0.6em; background: var(--color-surface-recessed); border-radius: var(--radius-sm); border: 1px solid var(--color-surface-rule); font-size: 0.8125rem; }
.kc-list-grid__link:hover { border-color: var(--color-accent-signal); color: var(--color-accent-signal); }

.kc-task-hierarchy { padding: 0.75rem; background: var(--color-surface-raised); border: 1px solid var(--color-surface-rule); border-radius: var(--radius-md); font-size: 0.8125rem; }
.kc-task-hierarchy__root, .kc-task-hierarchy ul { list-style: none; margin: 0; padding-left: 0; }
.kc-task-hierarchy ul { padding-left: 1.5rem; border-left: 1px dashed var(--color-surface-rule); margin-left: 0.5em; }
.kc-task-hierarchy__item { margin: 0.3em 0; }
.kc-task-hierarchy__row { display: flex; align-items: center; gap: 0.5em; padding: 0.2em 0.4em; border-radius: var(--radius-sm); cursor: pointer; }
.kc-task-hierarchy__row:hover { background: var(--color-surface-recessed); }
.kc-task-hierarchy__status { width: 0.55rem; height: 0.55rem; border-radius: var(--radius-sm); flex-shrink: 0; }
.kc-task-hierarchy__status--todo { background: var(--color-text-secondary); }
.kc-task-hierarchy__status--in-progress { background: var(--color-accent-plasma); }
.kc-task-hierarchy__status--review { background: var(--color-accent-gold); }
.kc-task-hierarchy__status--done { background: var(--color-state-success); }
.kc-task-hierarchy__status--blocked { background: var(--color-state-error); }
.kc-task-hierarchy__title { flex: 1; color: var(--color-text-display); }
.kc-task-hierarchy__owner { font-family: var(--font-mono); font-size: 0.6875rem; color: var(--color-text-secondary); background: var(--color-surface-recessed); padding: 0.05em 0.4em; border-radius: var(--radius-sm); }

.kc-empty-state { padding: 2rem 1rem; text-align: center; color: var(--color-text-secondary); background: var(--color-surface-raised); border: 1px solid var(--color-surface-rule); border-radius: var(--radius-md); }
.kc-empty-state__icon { font-size: 2.5rem; margin-bottom: 0.5rem; opacity: 0.6; }
.kc-empty-state__title { margin: 0 0 0.5rem 0; font-family: var(--font-display); font-size: 1.25rem; color: var(--color-text-display); }
.kc-empty-state__description { margin: 0 0 1rem 0; font-size: 0.875rem; max-width: 28rem; margin-left: auto; margin-right: auto; }
.kc-empty-state__action { display: inline-block; padding: 0.5em 1em; background: var(--color-accent-ember); color: var(--color-surface-primary); border-radius: var(--radius-sm); text-decoration: none; font-weight: 500; }

.kc-toast { padding: 0.75rem 1rem; background: var(--color-surface-raised); border: 1px solid var(--color-surface-rule); border-radius: var(--radius-md); box-shadow: 0 4px 16px rgba(0,0,0,0.3); max-width: 22rem; position: relative; }
.kc-toast--success { border-left: 3px solid var(--color-state-success); }
.kc-toast--error { border-left: 3px solid var(--color-state-error); }
.kc-toast--info { border-left: 3px solid var(--color-accent-plasma); }
.kc-toast--warning { border-left: 3px solid var(--color-state-caution); }
.kc-toast__title { margin: 0 0 0.3em 0; font-family: var(--font-mono); font-size: 0.6875rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--color-text-secondary); }
.kc-toast__body { font-size: 0.875rem; color: var(--color-text-display); }

.kc-form-field { margin-bottom: 0.75rem; display: flex; flex-direction: column; gap: 0.3em; }
.kc-form-field__label { display: flex; align-items: baseline; gap: 0.3em; font-family: var(--font-mono); font-size: 0.75rem; color: var(--color-text-display); }
.kc-form-field__required { color: var(--color-state-error); }
.kc-form-field__helper { margin: 0; font-family: var(--font-mono); font-size: 0.6875rem; color: var(--color-text-secondary); }

.kc-select { position: relative; display: inline-block; min-width: 10rem; }
.kc-select__field { padding: 0.4em 2em 0.4em 0.7em; background: var(--color-surface-recessed); border: 1px solid var(--color-surface-rule); border-radius: var(--radius-sm); color: var(--color-text-display); font-family: var(--font-body); font-size: 0.875rem; appearance: none; width: 100%; }
.kc-select__icon { position: absolute; right: 0.5em; top: 50%; transform: translateY(-50%); pointer-events: none; color: var(--color-text-secondary); font-size: 0.7em; }

.kc-textarea { padding: 0.5em 0.7em; background: var(--color-surface-recessed); border: 1px solid var(--color-surface-rule); border-radius: var(--radius-sm); color: var(--color-text-display); font-family: var(--font-body); font-size: 0.875rem; line-height: 1.5; min-height: 5rem; }

.kc-deployment { padding: 0.75rem; background: var(--color-surface-raised); border-radius: var(--radius-md); border: 1px solid var(--color-surface-rule); }
.kc-deployment__header { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 0.5rem; padding-bottom: 0.25rem; border-bottom: 1px solid var(--color-surface-rule); }
.kc-deployment__title { font-family: var(--font-mono); font-size: 0.6875rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--color-text-secondary); }
.kc-deployment__count { font-family: var(--font-mono); font-size: 0.6875rem; color: var(--color-accent-signal); background: rgba(31, 182, 168, 0.12); padding: 0.05em 0.5em; border-radius: 999px; }
.kc-deployment__list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.3em; }
.kc-deployment__env { display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; padding: 0.5rem 0.75rem; border-radius: var(--radius-sm); border-left: 3px solid currentColor; }
.kc-deployment__env--live { color: var(--color-state-success); background: rgba(143, 163, 149, 0.04); }
.kc-deployment__main { display: flex; align-items: baseline; gap: 0.5em; }
.kc-deployment__name { font-family: var(--font-mono); font-weight: bold; color: var(--color-text-display); font-size: 0.875rem; }
.kc-deployment__version { font-family: var(--font-mono); font-size: 0.6875rem; color: var(--color-text-secondary); }

.kc-progress { padding: 0.5rem; }
.kc-progress__track { position: relative; width: 100%; height: 0.5rem; background: var(--color-surface-recessed); border-radius: 999px; overflow: hidden; border: 1px solid var(--color-surface-rule); }
.kc-progress__bar { display: block; height: 100%; border-radius: 999px; background: var(--color-accent-ember); }

.kc-policy-card { padding: 1rem; background: var(--color-surface-raised); border: 1px solid var(--color-surface-rule); border-radius: var(--radius-md); }
.kc-policy-card--active { border-left: 3px solid var(--color-state-success); }
.kc-policy-card--draft { border-left: 3px solid var(--color-accent-gold); }
.kc-policy-card--suspended { border-left: 3px solid var(--color-state-caution); }
.kc-policy-card--retired { border-left: 3px solid var(--color-text-secondary); }
.kc-policy-card__header { margin-bottom: 0.75rem; padding-bottom: 0.5rem; border-bottom: 1px solid var(--color-surface-rule); }
.kc-policy-card__id-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem; }
.kc-policy-card__id { font-family: var(--font-mono); font-size: 0.6875rem; color: var(--color-accent-signal); background: rgba(31, 182, 168, 0.1); padding: 0.1em 0.5em; border-radius: var(--radius-sm); }
.kc-policy-card__status { font-family: var(--font-mono); font-size: 0.625rem; text-transform: uppercase; letter-spacing: 0.08em; color: currentColor; }
.kc-policy-card__title { margin: 0; font-family: var(--font-display); font-size: 1.0625rem; font-weight: bold; color: var(--color-text-display); }
.kc-policy-card__statement { margin: 0 0 0.75rem 0; padding: 0.75rem; background: var(--color-surface-recessed); border-left: 2px solid var(--color-accent-ember); border-radius: var(--radius-sm); font-size: 0.875rem; line-height: 1.6; color: var(--color-text-display); }
.kc-policy-card__footer { display: flex; flex-wrap: wrap; gap: 0.75rem; padding-top: 0.5rem; border-top: 1px solid var(--color-surface-rule); }
.kc-policy-card__meta { display: flex; flex-direction: column; gap: 0.1em; font-size: 0.8125rem; color: var(--color-text-display); }
.kc-policy-card__label { font-family: var(--font-mono); font-size: 0.625rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--color-text-secondary); }

.kc-project-status { padding: 1rem; background: var(--color-surface-raised); border: 1px solid var(--color-surface-rule); border-radius: var(--radius-md); display: flex; flex-direction: column; gap: 0.5rem; }
.kc-project-status--on-track { border-left: 3px solid var(--color-state-success); }
.kc-project-status--at-risk { border-left: 3px solid var(--color-accent-gold); }
.kc-project-status--blocked { border-left: 3px solid var(--color-state-error); }
.kc-project-status--complete { border-left: 3px solid var(--color-accent-signal); }
.kc-project-status__header { display: flex; align-items: baseline; justify-content: space-between; gap: 0.5rem; }
.kc-project-status__name { margin: 0; font-family: var(--font-display); font-size: 1.0625rem; font-weight: bold; color: var(--color-text-display); }
.kc-project-status__progress { display: flex; align-items: center; gap: 0.5rem; }
.kc-project-status__track { flex: 1; height: 0.4rem; background: var(--color-surface-recessed); border-radius: 999px; overflow: hidden; border: 1px solid var(--color-surface-rule); }
.kc-project-status__fill { height: 100%; border-radius: 999px; background: var(--color-accent-signal); }

/* Avatar */
.kc-avatar { display: inline-flex; align-items: center; justify-content: center; border-radius: 50%; }
.kc-avatar--sm { width: 2rem; height: 2rem; font-size: 0.625rem; }
.kc-avatar--md { width: 3rem; height: 3rem; font-size: 0.875rem; }
.kc-avatar--lg { width: 4rem; height: 4rem; font-size: 1.125rem; }
.kc-avatar--xl { width: 6rem; height: 6rem; font-size: 1.5rem; }

/* Icon */
.ec-icon { display: inline-block; vertical-align: middle; }
`;
