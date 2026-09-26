/**
 * CodeBlock (React port)
 *
 * Generated skeleton from Astro composite. Hand-port the render logic
 * for full visual parity.
 */
import * as React from 'react';

export interface CodeBlockProps {
code: string;
language: 'python' | 'typescript' | 'javascript' | 'rust' | 'yaml' | 'json' | 'bash' | 'sql' | 'markdown' | 'tsx' | 'jsx' | 'css' | 'html';
filename?: string;
highlightLines?: number[];
showLineNumbers?: boolean;
theme?: 'github-dark' | 'github-light';
class?: string;
  className?: string;
}

export function CodeBlock(props: CodeBlockProps) {
  const { className = '', ...rest } = props as any;
  return (
    <div className={['kc-codeblock', className].filter(Boolean).join(' ')}>
      <span className="kc-codeblock__placeholder">CodeBlock (React port)</span>
    </div>
  );
}
