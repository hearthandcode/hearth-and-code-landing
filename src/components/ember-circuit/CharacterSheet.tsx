import React, { useEffect, useState } from 'react';
import '../../styles/character-sheet.css';

type Chapter = { id: string; code: string; title: string; note: string; entries: readonly (readonly string[])[] };
type Feature = { kind: string; title: string; text: string };
const stats = [
  ['Source acuity', 86, 'Trace a claim to its originating record.'],
  ['Context weaving', 91, 'Compose conditions without losing their owners.'],
  ['Boundary craft', 93, 'Keep permission, capability, and evidence distinct.'],
  ['Systems imagination', 89, 'Generate structures that invite inspection.'],
  ['Counterexample sense', 82, 'Find the observation that could change the model.'],
  ['Returnability', 95, 'Make interrupted work intelligible again.'],
  ['Expression craft', 87, 'Turn architecture into an inhabitable surface.'],
  ['Convergence', 78, 'Discharge exploration into a useful artifact.'],
] as const;
const loadout = [
  ['Source ledger', 'Provenance', 'Origin, revision, claim, and correction route.'],
  ['Context loom', 'Composition', 'Task, audience, constraints, and typed interfaces.'],
  ['Counterexample lantern', 'Research', 'A falsifier before a confident conclusion.'],
  ['Return thread', 'Continuity', 'Current state, open gate, and the next physical move.'],
];
export default function CharacterSheet({ chapters, features }: { chapters: readonly Chapter[]; features: readonly Feature[] }) {
  const [tab, setTab] = useState('attributes');
  const [chapter, setChapter] = useState(0);
  useEffect(() => {
    const read = () => { const hash=window.location.hash.slice(1);const index=chapters.findIndex(c=>c.id===hash||c.entries.some(e=>e[0].toLowerCase()===hash));if(index>=0){setTab('dispositions');setChapter(index);} };
    read();window.addEventListener('hashchange',read);return()=>window.removeEventListener('hashchange',read);
  },[chapters]);
  const tabs = [['attributes', 'Attributes'], ['abilities', 'Feats & talents'], ['dispositions', 'Dispositions'], ['loadout', 'Loadout']];
  function keyTab(e: React.KeyboardEvent<HTMLButtonElement>, i: number) {
    const next = e.key === 'ArrowRight' ? (i + 1) % tabs.length : e.key === 'ArrowLeft' ? (i + tabs.length - 1) % tabs.length : e.key === 'Home' ? 0 : e.key === 'End' ? tabs.length - 1 : null;
    if (next === null) return;
    e.preventDefault(); setTab(tabs[next][0]); document.getElementById(`sheet-tab-${tabs[next][0]}`)?.focus();
  }
  return <div className="character-sheet">
    <header className="character-sheet__identity">
      <div className="character-sheet__sigil" aria-hidden="true">✦<span>HMA</span></div>
      <div><p className="character-sheet__eyebrow">Ember Circuit / character record HMA-16</p><h1>Hearthside<br/>Meta-Architect</h1><p>A builder of structures behind structures. A steward of the path back.</p></div>
      <dl><div><dt>Class</dt><dd>Knowledge artificer</dd></div><div><dt>Specialization</dt><dd>Agentic systems · research craft</dd></div><div><dt>Alignment</dt><dd>Human agency / revisable rigor</dd></div><div><dt>Signature</dt><dd>Forge + Hearth</dd></div></dl>
    </header>
    <div className="character-sheet__ribbon"><span>Party role <strong>Make complexity usable</strong></span><span>Core loop <strong>Orient → compose → check → return</strong></span></div>
    <p className="character-sheet__projection">Self-authored working archetype. Scores are hypothetical design values on a 100-point scale, not measured abilities or professional credentials.</p>
    <div className="character-sheet__tabs" role="tablist" aria-label="Character sheet layers">{tabs.map(([id, label], i) => <button key={id} id={`sheet-tab-${id}`} role="tab" aria-selected={tab === id} aria-controls={`sheet-panel-${id}`} tabIndex={tab === id ? 0 : -1} onClick={() => setTab(id)} onKeyDown={e => keyTab(e, i)}>{label}</button>)}</div>
    <section id="sheet-panel-attributes" role="tabpanel" aria-labelledby="sheet-tab-attributes" hidden={tab !== 'attributes'} tabIndex={0}>
      <header className="character-sheet__heading"><p>Ability scores / hypothetical build</p><h2>Eight instruments of knowledge work.</h2></header>
      <div className="character-sheet__stats">{stats.map(([name, score, meaning]) => <article key={name}><div><h3>{name}</h3><strong>{score}<small>/100</small></strong></div><meter min="0" max="100" value={score} aria-label={`${name}: hypothetical ${score} of 100`}/><p>{meaning}</p></article>)}</div>
      <aside className="character-sheet__watch"><span>Watch condition</span><h3>Infinite Architecture</h3><p>When the map outgrows the work, choose one inspectable artifact and one credible next action.</p></aside>
    </section>
    <section id="sheet-panel-abilities" role="tabpanel" aria-labelledby="sheet-tab-abilities" hidden={tab !== 'abilities'} tabIndex={0}><header className="character-sheet__heading"><p>Feats / talents / signature moves</p><h2>The archetype at the workbench.</h2></header><div className="character-sheet__abilities">{features.map((f, i) => <article key={f.title}><span>{String(i + 1).padStart(2, '0')} / {f.kind}</span><h3>{f.title}</h3><p>{f.text}</p></article>)}</div></section>
    <section id="sheet-panel-dispositions" role="tabpanel" aria-labelledby="sheet-tab-dispositions" hidden={tab !== 'dispositions'} tabIndex={0}><header className="character-sheet__heading"><p>Sixteen authored facets / four schools</p><h2>Choose a school of practice.</h2></header><nav className="character-sheet__schools" aria-label="Disposition schools">{chapters.map((c, i) => <button key={c.id} aria-pressed={chapter === i} onClick={() => setChapter(i)}>{c.code} · {c.title}</button>)}</nav><p>{chapters[chapter].note}</p><div className="character-sheet__abilities">{chapters[chapter].entries.map(([id, title, reading, move]) => <article key={id} id={id.toLowerCase()}><span>{id} / disposition</span><h3>{title}</h3><p>{reading}</p><strong className="character-sheet__move">At the table: {move}</strong></article>)}</div></section>
    <section id="sheet-panel-loadout" role="tabpanel" aria-labelledby="sheet-tab-loadout" hidden={tab !== 'loadout'} tabIndex={0}><header className="character-sheet__heading"><p>Tools / artifacts / ongoing work</p><h2>The workbench loadout.</h2></header><div className="character-sheet__abilities">{loadout.map(([title, kind, note]) => <article key={title}><span>{kind} / instrument</span><h3>{title}</h3><p>{note}</p></article>)}</div><nav className="character-sheet__quests" aria-label="Research paths"><a href="/programs/">Program ledger →</a><a href="/workbench/">Technique workbench →</a><a href="/fieldcraft/">Fieldcraft formalisms →</a><a href="/notes/">Essays & journal →</a></nav></section>
    <footer className="character-sheet__footer">This sheet projects intended practices. It does not establish biography, psychological traits, or independent assessment. <a href="/correspondence/">Open a conversation →</a></footer>
  </div>;
}
