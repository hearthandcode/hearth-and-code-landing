/**
 * mdx-components.tsx — Astro 7 / MDX components map for HCAN-related blocks.
 *
 * What this gives the journal MDX:
 *   - `<HcanExample id="e01" />` looks the example up by id from canonical data
 *     and renders it through the per-example shell (program block + structured
 *     output card via HCANExampleYamlCard + HCANProgram).
 *   - `<HcanBenchmark panel="analytical|generative" />` renders the 16/13-dim
 *     benchmark tables with bar-chart proportional to scores.
 *   - `<HcanMatrixTable id="..." />` renders any of the 7 canonical matrices
 *     (feature-inventory, analytical-scores, generative-scores, methodology,
 *     tooling-support, future-extensions, stier-targets).
 *   - `<HcanHarderTasksPanel panel="..." />` renders the analytical or
 *     generative harder-tasks panel.
 *   - `<HcanGrammarCard primitive="..." />` and `<HcanCommunicationTypeCard />`
 *     render the canonical grammar and communication-type surfaces.
 *
 * Source of truth: Hearth & Code Hub, project 0047.
 */

import type { MDXComponents } from 'mdx/types';
import { HCANProgram } from './components/ember-circuit/HCANProgram';
import { HcanExample as HcanExampleRenderer } from './components/ember-circuit/HcanExample';
import { HcanBenchmarkTable } from './components/ember-circuit/HcanBenchmarkTable';
import { HcanMatrixTable } from './components/ember-circuit/HcanMatrixTable';
import { HcanHarderTasks } from './components/ember-circuit/HcanHarderTasks';
import { HcanGrammarCard } from './components/ember-circuit/HcanGrammarCard';
import { CommunicationTypeCard } from './components/ember-circuit/CommunicationTypeCard';
import {
  hcanExamples,
  hcanGrammar,
} from './data/hcan-program-cards';
import {
  canonicalAnalyticalScores,
  canonicalGenerativeScores,
  canonicalMethodology,
  canonicalToolingSupport,
  canonicalFeatureInventory,
  canonicalFutureExtensions,
  canonicalStierTargets,
  canonicalMatrices,
} from './data/canonical-matrices';

const matrixById = new Map(canonicalMatrices.map((m) => [m.id, m]));

export const mdxComponents: MDXComponents = {
  HCANProgram,
  HcanExample: ({ id }: { id: string }) => {
    const example = hcanExamples.find((e) => e.id === id);
    if (!example) return <em>Unknown example id: {id}</em>;
    return <HcanExampleRenderer example={example} />;
  },

  HcanBenchmark: ({ panel }: { panel: 'analytical' | 'generative' }) => (
    <HcanBenchmarkTable
      panel={panel}
      analyticalScores={panel === 'analytical' ? canonicalAnalyticalScores : null}
      generativeScores={panel === 'generative' ? canonicalGenerativeScores : null}
    />
  ),
  HcanBenchmarkTable,

  HcanMatrixTable: ({ id }: { id: string }) => {
    const matrix = matrixById.get(id);
    if (!matrix) return <em>Unknown matrix id: {id}</em>;
    return <HcanMatrixTable matrix={matrix} />;
  },
  HcanFeatureInventory: () => <HcanMatrixTable matrix={canonicalFeatureInventory} />,
  HcanToolingSupport: () => <HcanMatrixTable matrix={canonicalToolingSupport} />,
  HcanMethodology: () => <HcanMatrixTable matrix={canonicalMethodology} />,
  HcanFutureExtensions: () => <HcanMatrixTable matrix={canonicalFutureExtensions} />,
  HcanStierTargets: () => <HcanMatrixTable matrix={canonicalStierTargets} />,

  HcanHarderTasks: ({ panel }: { panel: 'analytical' | 'generative' }) => (
    <HcanHarderTasks panel={panel} />
  ),
  HcanHarderTasksPanel: () => <HcanHarderTasks panel="generative" />,

  HcanGrammarCard: ({ primitive }: { primitive?: string }) => (
    <HcanGrammarCard primitive={primitive} grammar={hcanGrammar} />
  ),
  HcanCommunicationTypeCard: () => <CommunicationTypeCard />,
};

export default mdxComponents;
