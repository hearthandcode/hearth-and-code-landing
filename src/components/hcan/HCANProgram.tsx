import { useMemo, useState } from 'react';
import { tokenize } from '../../lib/hcan/tokenize';

export interface HCANProgramProps {
  /** One or more HCAN lines. */
  code: string;
  /** Nested usage: tighter padding, smaller font, no copy button. */
  compact?: boolean;
  className?: string;
}

/** Component 1 per the Hermes projection brief: syntax-highlighted HCAN block. */
export default function HCANProgram({ code, compact = false, className }: HCANProgramProps) {
  const lines = useMemo(() => tokenize(code), [code]);
  const [copied, setCopied] = useState(false);
  const showLineNumbers = lines.length > 3;

  const copy = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(code).then(() => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1500);
      }).catch(() => undefined);
    }
  };

  return (
    <div className={`hcan-program${compact ? ' hcan-program--compact' : ''}${className ? ` ${className}` : ''}`}>
      {!compact && (
        <button
          type="button"
          className="hcan-program__copy"
          onClick={copy}
          aria-label="Copy program to clipboard"
        >
          {copied ? 'copied' : 'copy'}
        </button>
      )}
      <pre className="hcan-program__frame">
        {showLineNumbers && (
          <span className="hcan-program__gutter" aria-hidden="true">
            {lines.map((_, i) => <span key={i}>{i + 1}</span>)}
          </span>
        )}
        <code className="hcan-program__code">
          {lines.map((segs, li) => (
            <span className="hcan-program__line" key={li}>
              {segs.length === 0
                ? '\u00A0'
                : segs.map((s, si) => (
                    <span className={`hcan-${s.cls}`} key={si}>{s.text}</span>
                  ))}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
