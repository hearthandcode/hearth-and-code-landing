import { useEffect, useRef, useState } from 'react';
import type { PublicMethodCard } from '../../data/public-method-library';

interface Props {
  methods: PublicMethodCard[];
  labelledBy?: string;
}

function MethodSummary({ method, onOpen }: { method: PublicMethodCard; onOpen: () => void }) {
  return <article id={method.id.toLowerCase()} className="ec-method-summary" data-ec-component="MethodSummary">
    <button type="button" onClick={onOpen} aria-haspopup="dialog" aria-label={`Open full method: ${method.title}`}>
      <header><span>{method.id}</span><span>{method.form}</span></header>
      <div><h4>{method.title}</h4><p>{method.summary}</p></div>
      <footer><span>Open full method</span><b aria-hidden="true">↗</b></footer>
    </button>
  </article>;
}

export default function MethodFieldLibrary({ methods, labelledBy }: Props) {
  const [selected, setSelected] = useState<PublicMethodCard | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (selected && dialog && !dialog.open) dialog.showModal();
  }, [selected]);

  const close = () => dialogRef.current?.close();

  return <>
    <div className="ec-method-summary-grid" role="list" aria-labelledby={labelledBy}>
      {methods.map((method) => <MethodSummary key={method.id} method={method} onOpen={() => setSelected(method)} />)}
    </div>
    <dialog ref={dialogRef} className="ec-method-sheet" onClose={() => setSelected(null)} onCancel={() => setSelected(null)}>
      {selected && <article aria-labelledby={`method-sheet-${selected.id}`}>
        <header className="ec-method-sheet__masthead">
          <div><p><span>{selected.id}</span>{selected.form}</p><h2 id={`method-sheet-${selected.id}`}>{selected.title}</h2><p>{selected.purpose}</p></div>
          <button type="button" onClick={close} aria-label={`Close ${selected.title}`}>×</button>
        </header>

        <div className="ec-method-sheet__overview">
          <section><h3>When I use it</h3><ul>{selected.whenToUse.map((item) => <li key={item}>{item}</li>)}</ul></section>
          <section><h3>Method walk</h3><ol>{selected.steps.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, '0')}</span>{step}</li>)}</ol></section>
        </div>

        <div className="ec-method-sheet__balance">
          <section><h3>What it makes possible</h3><ul>{selected.pros.map((item) => <li key={item}>{item}</li>)}</ul></section>
          <section><h3>Costs and cautions</h3><ul>{selected.cons.map((item) => <li key={item}>{item}</li>)}</ul></section>
        </div>

        <aside className="ec-method-sheet__boundary"><strong>Boundary</strong><p>{selected.boundary}</p></aside>
        <div className="ec-method-sheet__example-pair">
          <section className="ec-method-sheet__prompt"><header><div><span>Example prompt</span><h3>{selected.title} at the workbench</h3></div><small>{selected.influence}</small></header><pre>{selected.prompt}</pre></section>
          <section className="ec-method-sheet__output"><header><div><span>Harness output</span><h3>A worked model response</h3></div><small>{selected.exampleRun.runner}</small></header><pre>{selected.exampleOutput}</pre><aside className="ec-method-sheet__run-receipt" aria-label="Harness evaluation"><div><span>{selected.exampleRun.verdict}</span><strong>{selected.exampleRun.currentEvaluation ? `${selected.exampleRun.score}/10` : 'pending'}</strong></div><p>{selected.exampleRun.summary}</p><small>{selected.exampleRun.evaluationLimit}</small></aside></section>
        </div>
      </article>}
    </dialog>
  </>;
}
