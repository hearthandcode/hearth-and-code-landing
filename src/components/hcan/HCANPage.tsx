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
  ['Inspectable', 'a wrapped program can carry a grammar gloss and explicit run notes; readers still need compatible tools or careful manual interpretation'],
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
        <p className="hcanp-hero__dek">HCAN is a proposed human-agent communication notation: a compact way to make intent, scope, uncertainty, and boundaries visible in a reviewable line. Its symbols need explanation, and support depends on the reader and available validator; the notation alone cannot enforce permission or prove that a described workflow worked.</p>
      </header>

      <Section id="what" n="01" title="What HCAN is">
        <ul className="hcanp-props">
          {WHAT_HCAN_IS.map(([k, v]) => (
            <li key={k}><strong>{k}</strong><span>{v}</span></li>
          ))}
        </ul>
      </Section>

      <Section id="grammar" n="02" title="The grammar">
        <p className="hcanp-lede">The reference grammar defines a line order and named shapes, verbs, probes, guards, and labels. This page is an explanatory projection of a candidate, review-required reference; the contract and implementation remain authoritative for current syntax.</p>
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
                  <h3>The {key} protocol {key === 'analytical' ? '(reported in a project evaluation)' : '(reported on selected fixtures)'}</h3>
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
        <p className="hcanp-footnote">The candidate field-journal article contains a detailed v3 analytical matrix (14/16); a separate rendering brief reports a v4.2 summary (15/16). The project’s generative evaluation record reports 13/13 dimensions across three within-capability fixtures and three judge models. The methodology records 52 model calls and one human disposition session. These records are small, project-specific evaluations; their versions and result units differ, and they do not establish representative user outcomes, broad model compatibility, or current performance across settings. The human evaluator also found the generated card output difficult to read.</p>
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
          <article><h4>Commands and autocomplete</h4><p>The project records slash commands and autocomplete for bindings, epistemic labels, shapes, and constructors. Its tooling inventory describes validator integration; this does not make generated text safe to execute or grant authority. Check the current implementation and its validation result before relying on a particular editor feature.</p></article>
        </div>
      </Section>

      <Section id="envelope" n="09" title="The portable envelope">
        <p className="hcanp-lede">A project proposal describes a self-describing envelope with a grammar gloss, shape definitions, run notes, and validated source lines. The envelope can help a reader interpret the notation; it does not install a validator, ensure an agent follows the instructions, or make the program executable in an arbitrary system.</p>
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
        <p className="hcanp-lede">Read it as an example of the intended notation, then check the grammar and validator that apply to your environment. A well-formed line can make a request easier to inspect; usefulness and safe behavior still require a compatible implementation, review, and task-specific evidence.</p>
        <p className="hcanp-footnote">For the full 32-section tutorial covering foundations through ESS domain mappings, see the HCAN project documentation.</p>
        <h3>Try the notation on a real handoff</h3>
        <p>For a research team, take one evidence-synthesis request and ask whether a compact line preserves the source set, requested return, uncertainty probe, and no-write boundary. For an engineering team, use a bounded dependency-review task: identify the advisory source, request a concise impact map, probe for compatibility risks, and keep repository changes outside the task. In both cases, compare the notation with a plain-language brief on the same inputs.</p>
        <p>Before comparing, define what counts: source-span fidelity, missing constraints, reviewer comprehension, repair time, and reading cost. Keep model, context, and task fixed where practical; retain failed and unreadable outputs. The project evaluation displayed above is small and versioned, so this is a proposed follow-up, not a claim that HCAN improves task performance. A line that parses or earns a high score still cannot show that an interpretation is correct, that the agent obeyed a boundary, or that an effect was authorized.</p>
      </Section>
    </div>
  );
}
