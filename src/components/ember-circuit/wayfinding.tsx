import { hierarchy, linkHorizontal, tree } from 'd3';
import type { BaseProps, LinkItem, TreeNode } from './types';

const cx = (...values: Array<string | undefined | false>) => values.filter(Boolean).join(' ');

export function RouteCard({ number, eyebrow, title, description, href, action, signal = 'ember', className }: BaseProps & {
  number: string; eyebrow: string; title: string; description: string; href: string; action: string; signal?: 'ember' | 'plasma' | 'violet' | 'gold';
}) {
  return <a className={cx('ec-route-card', `ec-signal--${signal}`, className)} data-ec-component="RouteCard" href={href}>
    <header><span>{number}</span><i aria-hidden="true" /><small>{eyebrow}</small></header><h3>{title}</h3><p>{description}</p><strong>{action}<b aria-hidden="true">↗</b></strong>
  </a>;
}

export function LinkList({ title, items, className }: BaseProps & { title: string; items: LinkItem[] }) {
  return <nav className={cx('ec-link-list', className)} data-ec-component="LinkList" aria-label={title}><h3>{title}</h3><ol>{items.map((item, index) => <li key={item.href}><span>{String(index + 1).padStart(2, '0')}</span><a href={item.href}>{item.label}</a>{item.relation && <small>{item.relation}</small>}</li>)}</ol></nav>;
}

export function AnchorBar({ label, items, active, onSelect, className }: BaseProps & {
  label: string; items: Array<{ id: string; label: string; count?: number }>; active?: string; onSelect?: (id: string) => void;
}) {
  return <nav className={cx('ec-anchor-bar', className)} data-ec-component="AnchorBar" aria-label={label}><span>{label}</span><div role={onSelect ? 'tablist' : undefined}>{items.map((item) => onSelect
    ? <button key={item.id} type="button" role="tab" aria-selected={active === item.id} onClick={() => onSelect(item.id)}>{item.label}{item.count !== undefined && <small>{item.count}</small>}</button>
    : <a key={item.id} href={`#${item.id}`}>{item.label}{item.count !== undefined && <small>{item.count}</small>}</a>)}</div></nav>;
}

export function Trail({ steps, className }: BaseProps & { steps: Array<{ label: string; kind: string; state?: string }> }) {
  return <ol className={cx('ec-trail', className)} data-ec-component="Trail" aria-label="Object trail">{steps.map((step, index) => <li key={`${step.kind}-${step.label}`}><span>{String(index + 1).padStart(2, '0')}</span><div><small>{step.kind}</small><strong>{step.label}</strong>{step.state && <em>{step.state}</em>}</div>{index < steps.length - 1 && <i aria-hidden="true">→</i>}</li>)}</ol>;
}

export function PathMap({ root, className }: BaseProps & { root: TreeNode }) {
  const layout = tree<TreeNode>().nodeSize([72, 190]);
  const treeRoot = layout(hierarchy(root));
  const nodes = treeRoot.descendants();
  const links = treeRoot.links();
  const xMin = Math.min(...nodes.map((node) => node.x)) - 70;
  const xMax = Math.max(...nodes.map((node) => node.x)) + 70;
  const yMax = Math.max(...nodes.map((node) => node.y)) + 170;
  const connector = linkHorizontal<any, any>().x((node) => node.y).y((node) => node.x);
  return <figure className={cx('ec-path-map', className)} data-ec-component="PathMap">
    <div className="ec-path-map__head"><span>D3 path map</span><small>Source → projection → return</small></div>
    <div className="ec-path-map__scroll"><svg viewBox={`${-30} ${xMin} ${yMax} ${xMax - xMin}`} role="img" aria-labelledby="ec-path-map-title"><title id="ec-path-map-title">Research library relationship tree</title>
      <g className="ec-path-map__links">{links.map((link) => <path key={`${link.source.data.id}-${link.target.data.id}`} d={connector(link) ?? undefined} />)}</g>
      <g>{nodes.map((node) => <g key={node.data.id} className={`ec-path-map__node ec-path-map__node--${node.data.kind}`} transform={`translate(${node.y},${node.x})`}><circle r="7" /><text x="15" y="-3">{node.data.label}</text><text className="ec-path-map__kind" x="15" y="16">{node.data.kind}</text></g>)}</g>
    </svg></div>
    <details><summary>Read as text</summary><ul>{nodes.map((node) => <li key={node.data.id}>{node.ancestors().reverse().map((part) => part.data.label).join(' → ')}</li>)}</ul></details>
  </figure>;
}

export function SectionDirectory({ title, sections, className }: BaseProps & { title: string; sections: Array<{ id: string; label: string; count: number; note: string }> }) {
  return <nav className={cx('ec-section-directory', className)} data-ec-component="SectionDirectory" aria-label={title}><header><span>Directory</span><h3>{title}</h3></header><ol>{sections.map((section) => <li key={section.id}><a href={`#${section.id}`}><b>{String(section.count).padStart(2, '0')}</b><span><strong>{section.label}</strong><small>{section.note}</small></span></a></li>)}</ol></nav>;
}

export function RelatedWorkPanel({ title, items, className }: BaseProps & { title: string; items: LinkItem[] }) {
  return <aside className={cx('ec-related-work', className)} data-ec-component="RelatedWorkPanel"><header><span>Related work</span><h3>{title}</h3></header><ul>{items.map((item) => <li key={item.href}><small>{item.relation ?? 'related'}</small><a href={item.href}>{item.label}</a>{item.meta && <span>{item.meta}</span>}</li>)}</ul></aside>;
}

export function ReturnMarker({ eyebrow = 'Return', title, description, href, action, className }: BaseProps & { eyebrow?: string; title: string; description: string; href: string; action: string }) {
  return <aside className={cx('ec-return-marker', className)} data-ec-component="ReturnMarker"><div><span>{eyebrow}</span><h3>{title}</h3><p>{description}</p></div><a href={href}>{action}<b aria-hidden="true">→</b></a></aside>;
}
