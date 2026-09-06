import type { ReactNode } from 'react';
import type { BaseProps, CollectionViewProps } from './types';

const cx = (...values: Array<string | undefined | false>) => values.filter(Boolean).join(' ');

export function ArticleCard({ code, format, title, dek, readTime, themes, href, className }: BaseProps & {
  code: string; format: string; title: string; dek: string; readTime: string; themes: string[]; href: string;
}) {
  return <article className={cx('ec-article-card', className)} data-ec-component="ArticleCard">
    <header><span>{code}</span><span>{format}</span></header>
    <div><h3><a href={href}>{title}</a></h3><p>{dek}</p></div>
    <footer><ul aria-label="Themes">{themes.slice(0, 3).map((theme) => <li key={theme}>{theme}</li>)}</ul><span>{readTime} <b aria-hidden="true">→</b></span></footer>
  </article>;
}

export function CaseStudyCard({ question, intervention, observation, limit, className }: BaseProps & {
  question: string; intervention: string; observation: string; limit: string;
}) {
  return <article className={cx('ec-case-study', className)} data-ec-component="CaseStudyCard">
    <p className="ec-label">Fictional teaching case</p><h3>{question}</h3>
    <dl><div><dt>Intervention</dt><dd>{intervention}</dd></div><div><dt>Observation</dt><dd>{observation}</dd></div></dl>
    <p className="ec-limit"><strong>Limit</strong>{limit}</p>
  </article>;
}

export function FieldCard({ id, title, form, note, boundary, prompt, influence, className }: BaseProps & {
  id: string; title: string; form: string; note: string; boundary: string; prompt?: string; influence?: string;
}) {
  return <article className={cx('ec-field-card', className)} data-ec-component="FieldCard">
    <header><span>{id}</span><span>{form}</span></header><h3>{title}</h3><p>{note}</p>
    {influence && <small>{influence}</small>}
    <footer><span><i aria-hidden="true" />{boundary}</span>{prompt && <details><summary>Open field prompt</summary><pre>{prompt}</pre></details>}</footer>
  </article>;
}

export function MetricCard({ label, value, unit, source, posture, className }: BaseProps & {
  label: string; value: string; unit?: string; source: string; posture: string;
}) {
  return <article className={cx('ec-metric-card', className)} data-ec-component="MetricCard">
    <p>{label}</p><strong>{value}<small>{unit}</small></strong><dl><div><dt>Source</dt><dd>{source}</dd></div><div><dt>Posture</dt><dd>{posture}</dd></div></dl>
  </article>;
}

export function MediaFrame({ label, title, caption, source, children, className }: BaseProps & {
  label: string; title: string; caption: string; source: string; children: ReactNode;
}) {
  return <figure className={cx('ec-media-frame', className)} data-ec-component="MediaFrame">
    <div className="ec-media-frame__head"><span>{label}</span><h3>{title}</h3></div><div className="ec-media-frame__stage">{children}</div>
    <figcaption><span>{caption}</span><small>Source · {source}</small></figcaption>
  </figure>;
}

export function CalloutPanel({ kind = 'note', title, children, className }: BaseProps & {
  kind?: 'note' | 'caution' | 'invitation'; title: string; children: ReactNode;
}) {
  return <aside className={cx('ec-callout', `ec-callout--${kind}`, className)} data-ec-component="CalloutPanel">
    <span>{kind}</span><div><h3>{title}</h3><div>{children}</div></div>
  </aside>;
}

export function AnnotationRail({ annotations, className }: BaseProps & {
  annotations: Array<{ label: string; text: string; locator: string }>;
}) {
  return <aside className={cx('ec-annotation-rail', className)} data-ec-component="AnnotationRail" aria-label="Reading annotations">
    {annotations.map((item) => <section key={`${item.label}-${item.locator}`}><span>{item.label}</span><p>{item.text}</p><small>{item.locator}</small></section>)}
  </aside>;
}

export function CollectionView({ id, eyebrow, title, description, count, controls, children, className }: CollectionViewProps) {
  return <section id={id} className={cx('ec-collection-view', className)} data-ec-component="CollectionView">
    <header><div><p className="ec-label">{eyebrow}</p><h2>{title}</h2>{description && <p>{description}</p>}</div>{typeof count === 'number' && <strong><b>{String(count).padStart(2, '0')}</b> objects</strong>}</header>
    {controls && <div className="ec-collection-view__controls">{controls}</div>}<div className="ec-collection-view__body">{children}</div>
  </section>;
}
