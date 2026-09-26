/**
 * DatasetSpec (React port)
 *
 * Generated skeleton from Astro composite. Hand-port the render logic
 * for full visual parity.
 */
import * as React from 'react';

export interface DatasetSpecProps {
name: string;
version: string;
size: string;
format: string;
license: string;
schema: { name: string; type: string; description?: string }[];
ethicalNotes?: string[];
class?: string;
  className?: string;
}

export function DatasetSpec(props: DatasetSpecProps) {
  const { className = '', ...rest } = props as any;
  return (
    <div className={['kc-datasetspec', className].filter(Boolean).join(' ')}>
      <span className="kc-datasetspec__placeholder">DatasetSpec (React port)</span>
    </div>
  );
}
