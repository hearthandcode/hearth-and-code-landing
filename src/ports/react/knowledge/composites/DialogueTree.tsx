/**
 * DialogueTree (React port)
 * Source: src/components/knowledge/composites/DialogueTree.astro
 * Knowledge composite (k-composite): k-dialogue-tree
 *
 * Interactive: click choice to traverse dialogue
 */
import * as React from 'react';

interface Choice {
  id: string;
  text: string;
  next: string | null;
}
interface Node {
  id: string;
  speaker: string;
  text: string;
  choices: Choice[];
}

export interface DialogueTreeProps {
  nodes: Node[];
  rootId: string;
  className?: string;
}

export function DialogueTree({ nodes, rootId, className = '' }: DialogueTreeProps) {
  const [currentId, setCurrentId] = React.useState(rootId);
  const current = nodes.find((n) => n.id === currentId);
  const classes = ['kc-dialogue', className].filter(Boolean).join(' ');

  if (!current) return null;

  return (
    <div className={classes}>
      <div className="kc-dialogue__node">
        <div className="kc-dialogue__speaker">{current.speaker}</div>
        <p className="kc-dialogue__text">{current.text}</p>
        <div className="kc-dialogue__choices">
          {current.choices.map((c) => (
            <button
              key={c.id}
              className="kc-dialogue__choice"
              onClick={() => c.next && setCurrentId(c.next)}
              disabled={c.next === null}
            >
              {c.text}
              {c.next === null && <span className="kc-dialogue__end">(end)</span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
