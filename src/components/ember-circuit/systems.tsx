import { useEffect, useId, useMemo, useRef, useState } from 'react';
import type { BaseProps, BoundaryEdge, BoundaryNode, Stage } from './types';

const cx = (...values: Array<string | undefined | false>) => values.filter(Boolean).join(' ');
const safeId = (value: string) => `n_${value.replace(/[^a-zA-Z0-9_]/g, '_')}`;
const safeLabel = (value: string) => value.replace(/[\[\]{}()"#;]/g, ' ').replace(/\s+/g, ' ').trim();

export function SystemContext({ title, purpose, actors, environment, constraints, className }: BaseProps & {
  title: string; purpose: string; actors: string[]; environment: string; constraints: string[];
}) {
  return <article className={cx('ec-system-context', className)} data-ec-component="SystemContext"><header><span>System context</span><h3>{title}</h3><p>{purpose}</p></header><div><section><h4>Actors</h4><ul>{actors.map((item) => <li key={item}>{item}</li>)}</ul></section><section><h4>Environment</h4><p>{environment}</p></section><section><h4>Constraints</h4><ul>{constraints.map((item) => <li key={item}>{item}</li>)}</ul></section></div></article>;
}

export function BoundaryMap({ title, nodes, edges, className }: BaseProps & { title: string; nodes: BoundaryNode[]; edges: BoundaryEdge[] }) {
  const target = useRef<HTMLDivElement>(null);
  const rawId = useId();
  const diagramId = useMemo(() => `ec-boundary-${rawId.replace(/[^a-zA-Z0-9]/g, '')}`, [rawId]);
  const [status, setStatus] = useState<'loading' | 'rendered' | 'fallback'>('loading');
  const definition = useMemo(() => {
    const groups = ['public', 'service', 'private'] as const;
    const lines = ['flowchart LR'];
    for (const group of groups) {
      lines.push(`subgraph ${group}[${group.toUpperCase()}]`);
      nodes.filter((node) => node.group === group).forEach((node) => lines.push(`${safeId(node.id)}["${safeLabel(node.label)}"]`));
      lines.push('end');
    }
    edges.forEach((edge) => lines.push(`${safeId(edge.from)} -->|${safeLabel(edge.label)}| ${safeId(edge.to)}`));
    lines.push('classDef public fill:#302a25,stroke:#82c4c3,color:#f1e7d2');
    lines.push('classDef service fill:#211d18,stroke:#f07a37,color:#f1e7d2');
    lines.push('classDef private fill:#171512,stroke:#a78bfa,color:#f1e7d2');
    groups.forEach((group) => { const ids = nodes.filter((node) => node.group === group).map((node) => safeId(node.id)); if (ids.length) lines.push(`class ${ids.join(',')} ${group}`); });
    return lines.join('\n');
  }, [nodes, edges]);

  useEffect(() => {
    let live = true;
    (async () => {
      try {
        const { default: mermaid } = await import('mermaid');
        mermaid.initialize({ startOnLoad: false, securityLevel: 'strict', theme: 'base', themeVariables: { background: '#0e1114', primaryTextColor: '#f1e7d2', lineColor: '#8d8579', fontFamily: 'Inter, sans-serif' } });
        const { svg } = await mermaid.render(diagramId, definition);
        if (live && target.current) { target.current.innerHTML = svg; setStatus('rendered'); }
      } catch { if (live) setStatus('fallback'); }
    })();
    return () => { live = false; };
  }, [definition, diagramId]);

  return <figure className={cx('ec-boundary-map', className)} data-ec-component="BoundaryMap"><header><span>Mermaid boundary map</span><h3>{title}</h3><small>{status === 'rendered' ? 'interactive diagram rendered' : status === 'loading' ? 'diagram loading · text remains available' : 'diagram unavailable · text view active'}</small></header><div ref={target} className="ec-boundary-map__diagram" aria-hidden={status !== 'rendered'} /><figcaption><ol>{edges.map((edge) => <li key={`${edge.from}-${edge.to}`}><b>{nodes.find((node) => node.id === edge.from)?.label}</b><span>{edge.label}</span><b>{nodes.find((node) => node.id === edge.to)?.label}</b></li>)}</ol></figcaption></figure>;
}

export function ModuleCard({ code, title, responsibility, inputs, outputs, owner, className }: BaseProps & {
  code: string; title: string; responsibility: string; inputs: string[]; outputs: string[]; owner: string;
}) {
  return <article className={cx('ec-module-card', className)} data-ec-component="ModuleCard"><header><span>{code}</span><small>{owner}</small></header><h3>{title}</h3><p>{responsibility}</p><div><section><h4>In</h4><ul>{inputs.map((item) => <li key={item}>{item}</li>)}</ul></section><section><h4>Out</h4><ul>{outputs.map((item) => <li key={item}>{item}</li>)}</ul></section></div></article>;
}

export function InterfaceContract({ name, request, response, prohibits, className }: BaseProps & { name: string; request: string; response: string; prohibits: string[] }) {
  return <article className={cx('ec-interface-contract', className)} data-ec-component="InterfaceContract"><header><span>Interface</span><h3>{name}</h3></header><div><section><span>REQUEST</span><code>{request}</code></section><i aria-hidden="true">⇄</i><section><span>RESPONSE</span><code>{response}</code></section></div><footer><strong>Prohibited effects</strong><ul>{prohibits.map((item) => <li key={item}>{item}</li>)}</ul></footer></article>;
}

export function DecisionRecordCard({ id, decision, rationale, alternatives, state, owner, className }: BaseProps & { id: string; decision: string; rationale: string; alternatives: string[]; state: string; owner: string }) {
  return <article className={cx('ec-decision-record', className)} data-ec-component="DecisionRecordCard"><header><span>{id}</span><strong>{state}</strong></header><h3>{decision}</h3><p>{rationale}</p><details><summary>Alternatives retained</summary><ul>{alternatives.map((item) => <li key={item}>{item}</li>)}</ul></details><footer>Disposition held by <b>{owner}</b></footer></article>;
}

export function ChangeSet({ title, before, after, reason, recovery, className }: BaseProps & { title: string; before: string[]; after: string[]; reason: string; recovery: string }) {
  return <article className={cx('ec-change-set', className)} data-ec-component="ChangeSet"><header><span>Revision delta</span><h3>{title}</h3></header><div><section><h4>− Before</h4><ul>{before.map((item) => <li key={item}>{item}</li>)}</ul></section><section><h4>+ After</h4><ul>{after.map((item) => <li key={item}>{item}</li>)}</ul></section></div><footer><p><b>Reason</b>{reason}</p><p><b>Recovery</b>{recovery}</p></footer></article>;
}

export function TestRun({ predicate, method, result, limitation, status, className }: BaseProps & { predicate: string; method: string; result: string; limitation: string; status: 'pass' | 'fail' | 'skip' }) {
  return <article className={cx('ec-test-run', `ec-test-run--${status}`, className)} data-ec-component="TestRun"><header><span>Check</span><strong>{status}</strong></header><h3>{predicate}</h3><dl><div><dt>Method</dt><dd>{method}</dd></div><div><dt>Observed</dt><dd>{result}</dd></div><div><dt>Does not prove</dt><dd>{limitation}</dd></div></dl></article>;
}

export function BuildPlan({ title, stages, className }: BaseProps & { title: string; stages: Stage[] }) {
  return <section className={cx('ec-build-plan', className)} data-ec-component="BuildPlan"><header><span>Bounded build plan</span><h3>{title}</h3></header><ol>{stages.map((stage, index) => <li key={stage.id} data-state={stage.state}><span>{String(index + 1).padStart(2, '0')}</span><div><strong>{stage.title}</strong><p>{stage.detail}</p></div><small>{stage.state}</small></li>)}</ol></section>;
}
