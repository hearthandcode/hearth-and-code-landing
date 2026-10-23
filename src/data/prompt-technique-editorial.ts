import type { CatalogEntry, TemplateTech } from './vendored-data';
import runPacket from './prompt-technique-generated-prompts.json';
import subagentRuns from './prompt-technique-subagent-runs.json';
import { promptTechniqueRunBySlug } from './prompt-technique-run-batches';

function section(entry: CatalogEntry, title: string): string {
  return entry.sections.find((item) => item.title.toLowerCase() === title.toLowerCase())?.body ?? '';
}

function mechanism(entry: CatalogEntry): string {
  const body = section(entry, 'How it works');
  const match = body.match(/\*\*Core mechanism:\*\*\s*([\s\S]*?)(?=\n\n\*\*|$)/);
  return match?.[1]?.trim() || body.replace(/\*\*/g, '').trim();
}

function sourceNote(entry: CatalogEntry): string {
  const body = section(entry, 'How it works');
  const match = body.match(/\*\*Source origin:\*\*\s*([^\n]+)/);
  return match?.[1]?.replace(/\s*·\s*/g, ' · ').trim() ?? 'Source-origin detail not recorded in this projection.';
}

function bullets(body: string): string[] {
  const found = [...body.matchAll(/(?:^|\n)-\s*\*\*([^*]+):\*\*\s*([^\n]+)/g)];
  return found.map((match) => `${match[1].trim()}: ${match[2].trim()}`);
}

export interface TechniqueEditorial {
  introduction: string;
  mechanism: string;
  sourceNote: string;
  benefit: string;
  tradeoffs: string[];
  modelRisk: string;
  practicalPrompt: string;
  semantic_status: 'validated' | 'invalid_hold' | 'not_run';
  promptHashMatches: boolean;
  currentPromptSha256: string;
}

/** A readable four-part projection over the pinned public Atlas entries.
 * It deliberately does not upgrade candidate source records into efficacy claims.
 */
export function editorialForTechnique(entry: CatalogEntry, tech?: TemplateTech): TechniqueEditorial {
  const how = section(entry, 'Practical use');
  const limitations = section(entry, 'Limitations');
  const core = mechanism(entry);
  const runRecord = runPacket.records.find((item) => item.technique_slug === entry.slug);
  const batchRun = promptTechniqueRunBySlug.get(entry.slug);
  const ledgerRun = subagentRuns.runs.find((item) => item.technique_slug === entry.slug && item.status === 'current-sample');
  const prompt = runRecord?.prompt ?? `Task: Use the supplied task facts to prepare a bounded, source-traceable work artifact.\n\nUse this operating principle: ${core}\n\nReturn the artifact, checks and observed results, material uncertainty, and a human review gate. Do not invent facts or claim unperformed checks.`;
  const batchPromptMatches = Boolean(batchRun && batchRun.prompt_sha256 === runRecord?.prompt_sha256);
  const samplePromptMatches = Boolean(ledgerRun && ledgerRun.prompt_sha256 === runRecord?.prompt_sha256);
  const promptHashMatches = batchPromptMatches || samplePromptMatches;
  const sampleResponseMatches = Boolean(ledgerRun && runRecord?.response && ledgerRun.response === runRecord.response && ledgerRun.response_sha256 === runRecord.response_sha256);
  const semantic_status = sampleResponseMatches && samplePromptMatches
    ? 'validated'
    : batchRun
      ? batchRun.status === 'validated' && batchPromptMatches ? 'validated' : 'invalid_hold'
      : runRecord?.response ? 'invalid_hold' : 'not_run';

  const benefits = how.replace(/\*\*/g, '').replace(/\n+/g, ' ').trim();
  const riskLines = bullets(limitations);
  const broadModelRisk = /model sensitivity/i.test(limitations)
    ? 'The source flags model sensitivity: behavior can vary by model and task. This is a risk statement, not a measured failure rate.'
    : 'The source projection does not establish cross-model reliability or a measured failure rate. A fluent output can still omit constraints or invent details, so inspect consequential claims against the supplied evidence.';

  return {
    introduction: `For Agentic Engineers and Researchers, this entry describes a candidate way to structure a bounded task in ${entry.category}. ${entry.document} supplies its Atlas context.`,
    mechanism: core,
    sourceNote: sourceNote(entry),
    benefit: benefits || 'Potential benefit is not quantified in this candidate record; treat the mechanism as a design hypothesis to evaluate against a task-specific baseline.',
    tradeoffs: riskLines.length ? riskLines : [
      'Additional structure costs time and can distract from a direct source or a low-consequence task.',
      'Cross-domain transfer needs a task-specific source, risk review, and evaluation fixture.',
    ],
    modelRisk: broadModelRisk,
    practicalPrompt: prompt,
    semantic_status,
    promptHashMatches,
    currentPromptSha256: runRecord?.prompt_sha256 ?? '',
  };
}
