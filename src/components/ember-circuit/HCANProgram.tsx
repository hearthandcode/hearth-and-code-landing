import { useMemo } from 'react';
import { tokenize, toHtml } from '../../data/hcan-highlight';
import type { BaseProps } from './types';

export interface HCANProgramProps extends BaseProps {
  /** The HCAN program line. */
  code: string;
  /** Label shown above the program. Defaults to "HCAN". */
  pill?: string;
  /** Section label above the program frame (e.g. "Program"). When omitted,
   * only the pill renders. */
  caption?: string;
  /** When true, suppress the copy button (for inline use in dense lists). */
  readonly?: boolean;
  /** Optional aria-label override. */
  ariaLabel?: string;
}

/**
 * A single HCAN program line with syntax highlighting and a copy-to-clipboard button.
 *
 * Source: Hearth & Code Hub canonical article, project 0047,
 * "Hermes projection instructions" → React components to build, item 1.
 * Token classes and CSS hook set preserved verbatim from canonical §410-422.
 * Wraps an `<code>` element so the line stays selectable as text.
 */
export function HCANProgram({
  code,
  pill = 'HCAN',
  caption,
  readonly = false,
  ariaLabel,
  className,
}: HCANProgramProps) {
  const html = useMemo(() => toHtml(tokenize(code)), [code]);
  return (
    <div className={className ? `ec-hcan-program ${className}` : 'ec-hcan-program'}>
      {(caption || pill) && (
        <div className="ec-hcan-program__header">
          {caption && <span className="ec-hcan-program__caption">{caption}</span>}
          {pill && <span className="ec-hcan-program__label" aria-hidden="true">{pill}</span>}
        </div>
      )}
      <pre className="ec-hcan-program__frame">
        <code
          className="ec-hcan-program__code"
          dangerouslySetInnerHTML={{ __html: html }}
          aria-label={ariaLabel ?? `HCAN program: ${code}`}
        />
      </pre>
      {!readonly && (
        <button
          type="button"
          className="ec-hcan-program__copy"
          onClick={() => {
            if (typeof navigator !== 'undefined' && navigator.clipboard && typeof window !== 'undefined') {
              navigator.clipboard.writeText(code).catch(() => undefined);
            }
          }}
          aria-label={`Copy program: ${code}`}
        >
          <span aria-hidden="true">⧉</span>
          <span>Copy</span>
        </button>
      )}
    </div>
  );
}

export default HCANProgram;
