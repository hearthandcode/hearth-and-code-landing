import { useState } from 'react';
import HCANProgram from './HCANProgram';
import HCANExample, { type HCANExampleData } from './HCANExample';
import HCANBenchmark from './HCANBenchmark';
import HCANGrammar from './HCANGrammar';
import HCANMatrix from './HCANMatrix';
import { hcanExamples } from '../../data/hcan-program-cards';
import {
  analyticalPanel,
  generativePanel,
  methodologyMatrix,
  toolingMatrix,
  featureMatrix,
  grammarPrimitives,
  protocolSummaries,
} from '../../data/hcan-article';

function Section({ id, n, title, children }: { id: string; n: string; title: string; children: React.ReactNode }) {
  return (
    <section className="hcanp-section" id={id} data-section={id}>
      <header className="hcanp-section__head">
        <span className="hcanp-section__num">{n}</span>
        <h2 className="hcanp-section__title">{title}</h2>
      </header>
      <div className="hcanp-section__body">{children}</div>
    </section>
  );
}

const WHAT_HCAN_IS = [
  ['Typed', 'every line requests a specific return shape (:Brief, :Map, :Vec<Card>, :Table)'],
  ['Source-bound', 'every claim must carry an epistemic class (%source, %evidence, %inference, %unknown)'],
  ['Bounded', 'guards (!no-write, !no-send, !review) bind the entire run'],
  ['Falsifiable', 'probes (?counterexample, ?novelty, ?feasibility) must answer PASS / FAIL / UNKNOWN'],
  ['Portable', 'a wrapped program runs in any agent, with or without tooling, via a self-describing envelope'],
];

const NOT_LIST = [
  ['Not a programming language', 'it never executes'],
  ['Not a prompt engineering framework', 'it is a communication type'],
  ['Not a replacement for natural language', 'it compresses recurring requests'],
  ['Not an authority grant', 'guards state boundaries; they do not grant permission'],
  ['Not a verified system', 'all artifacts remain candidate until independently reviewed'],
];

const ENVELOPE_LAYERS = ['TITLE', 'LEGEND', 'SHAPES', 'RULES', 'lines'];

export default function HCANPage({ embedded = false }: { embedded?: boolean }) {
  const [activeExample, setActiveExample] = useState(hcanExamples[0]?.id ?? '');
  const example = hcanExamples.find((e) => e.id === activeExample) ?? hcanExamples[0];

  return (
    <div className={`hcanp${embedded ? ' hcanp--embedded' : ''}`}>
      <header className="hcanp-hero">
        <p className="hcanp-hero__eyebrow">Field journal · communication type</p>
        {!embedded && <h1 className="hcanp-hero__title">HCAN</h1>}
        {!embedded && <p className="hcanp-hero__sub">A Condensed Symbolic Language for Human-Agent Communication</p>}
        <HCANProgram code={'orient @~/any-folder :Brief ?gaps !no-write'} />
        <p className="hcanp-hero__dek">Not natural language (verbose, ambiguous). Not a programming language (toolchains, execution). A middle layer: a condensed symbolic notation that compresses intent, scope, uncertainty, and boundaries into a single reviewable line that any LLM agent can read, any human can audit, and any system can validate before running.</p>
      </header>

      <Section id="what" n="01" title="What HCAN is">
        <ul className="hcanp-props">
          {WHAT_HCAN_IS.map(([k, v]) => (
            <li key={k}><strong>{k}</strong><span>{v}</span></li>
          ))}
        </ul>
      </Section>

      <Section id="grammar" n="02" title="The grammar">
        <p className="hcanp-lede">Ten primitives. One canonical order. A closed set of shapes, verbs, probes, guards, and labels; extendable through a proposal process that requires motivation, example, non-example, and rollback.</p>
        <HCANGrammar primitives={grammarPrimitives} />
      </Section>

      <Section id="examples" n="03" title="Eight examples across diverse domains">
        <div className="hcanp-examples">
          <nav className="hcanp-examples__rail" aria-label="Examples">
            {hcanExamples.map((e) => (
              <button
                type="button"
                key={e.id}
                className={`hcanp-examples__rail-btn${e.id === activeExample ? ' is-active' : ''}`}
                data-domain={e.domain}
                onClick={() => setActiveExample(e.id)}
                aria-pressed={e.id === activeExample}
              >
                <span>{e.id}</span>
                <em>{e.title}</em>
              </button>
            ))}
          </nav>
          {example && <HCANExample example={example.yaml as unknown as HCANExampleData} />}
        </div>
      </Section>

      <Section id="protocols" n="04" title="Two protocols, verb-routed">
        <div className="hcanp-protocols">
          {(Object.keys(protocolSummaries) as Array<'analytical' | 'generative'>).map((key) => {
            const p = protocolSummaries[key];
            return (
              <article key={key} className={`hcanp-protocol hcanp-protocol--${key}`}>
                <header>
                  <h3>The {key} protocol {key === 'analytical' ? '(deploy-ready)' : '(structurally validated)'}</h3>
                  <p className="hcanp-protocol__use">
                    {key === 'analytical'
                      ? 'For inspection, comparison, planning, and returns. Strict format: normalized program on line 1, findings with epistemic labels, an unknown table, a not-checked line, and a two-line close.'
                      : 'For synthesis, design, transfer, and ideation. Card contract: each idea is a structured block with the map() fields as content, wrapped by mandatory discipline fields. At least one card must fuse relations from two sources. Zero preamble.'}
                  </p>
                </header>
                <dl className="hcanp-protocol__stats">
                  <div><dt>wins</dt><dd>{p.wins}</dd></div>
                  <div><dt>tiers</dt><dd>{p.tiers}</dd></div>
                  <div><dt>preference</dt><dd>{p.preference}</dd></div>
                  <div><dt>avg</dt><dd>{p.avg}</dd></div>
                </dl>
                <p className="hcanp-protocol__loss">{p.loss}</p>
                <p className="hcanp-protocol__note">{p.note}</p>
              </article>
            );
          })}
        </div>
      </Section>

      <Section id="benchmarks" n="05" title="Benchmark results">
        <HCANBenchmark {...analyticalPanel} />
        <HCANBenchmark {...generativePanel} />
        <p className="hcanp-footnote">Per-dimension scores render from the article YAML matrix (v3 rows). Headline protocol numbers are the v4.2 final benchmark.</p>
      </Section>

      <Section id="methodology" n="06" title="Evaluation methodology">
        <HCANMatrix matrix={methodologyMatrix} />
      </Section>

      <Section id="features" n="07" title="Feature inventory">
        <HCANMatrix matrix={featureMatrix} />
      </Section>

      <Section id="tooling" n="08" title="Language tooling">
        <HCANMatrix matrix={toolingMatrix} />
        <div className="hcanp-tooling-notes">
          <article><h4>LSP server</h4><p>A zero-dependency Language Server Protocol implementation provides context-aware completion, hover help for every token, and live diagnostics that run the validator as you type. stdio or TCP, per-connection isolated state. Editors: VS Code, Neovim, any LSP-compatible editor.</p></article>
          <article><h4>Syntax highlighting</h4><p>One canonical grammar (TextMate, highlight.js, vim) shared across four renderers: VS Code/Sublime/shiki, web docs, terminal editing, and the live editor + AI ghost-completion layer.</p></article>
          <article><h4>Commands and autocomplete</h4><p>Nine slash commands with progressive disclosure: /hcan, /hcan-compose, /hcan-lex, five domain runners, /hcan-live. Autocomplete triggers on @ (fuzzy directories), % (eight epistemic labels), : (shapes and constructors). AI ghost completion is validator-gated: no unvalidated output ever reaches the program.</p></article>
        </div>
      </Section>

      <Section id="envelope" n="09" title="The portable envelope">
        <p className="hcanp-lede">Any HCAN program can be wrapped in a self-describing envelope that runs in <strong>any agent with no tooling installed</strong>. The envelope carries its own grammar gloss, shape definitions, run rules (numbered flow, probe verdicts, guard scope, fail-closed bindings), and the byte-identical validated lines.</p>
        <ol className="hcanp-envelope">
          {ENVELOPE_LAYERS.map((layer, i) => (
            <li key={layer} data-layer={layer.toLowerCase()}>
              <span className="hcanp-envelope__num">{String(i + 1).padStart(2, '0')}</span>
              <span className="hcanp-envelope__name">{layer}</span>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="not" n="10" title="What HCAN is not">
        <ul className="hcanp-notlist">
          {NOT_LIST.map(([k, v]) => (
            <li key={k}><strong>{k}</strong><span>{v}</span></li>
          ))}
        </ul>
      </Section>

      <Section id="getting-started" n="11" title="Getting started">
        <p className="hcanp-lede">The simplest possible HCAN line:</p>
        <HCANProgram code={'orient @~/any-folder :Brief ?gaps !no-write'} />
        <p className="hcanp-lede">Run it in any agent. If the return names the authoritative route, labels every claim, lists unknowns honestly, states non-effects, and closes with one runnable next action, the surface is working.</p>
        <p className="hcanp-footnote">For the full 32-section tutorial covering foundations through ESS domain mappings, see the HCAN project documentation.</p>
      </Section>
    </div>
  );
}
