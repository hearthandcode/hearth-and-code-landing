import runPacket from './prompt-technique-generated-prompts.json';

export interface PromptTechniqueRunRecord {
  technique_number: number;
  technique_slug: string;
  source_id: string;
  runner: string;
  run_date: string;
  run_timestamp?: string;
  prompt_sha256: string;
  prompt: string;
  response: string;
  response_sha256: string;
  source_facts_supplied: boolean;
  external_effects: string[];
  runtime?: {
    kernel_version: string;
    profile: string;
    provider: string;
    model: string;
    reasoning_effort: string;
    execution_mode: string;
  };
  receipt_sha256?: string;
  receipt_summary?: {
    source_packet_sha256: string;
    started_at: string;
    finished_at: string;
    elapsed_seconds: number;
    exit_code: number;
    attempts: number;
    response_bytes: number;
    token_usage: string;
    session: false;
    tools: false;
    context_files: false;
    skills: false;
    prompt_templates: false;
    themes: false;
  };
  semantic_review?: string;
  semantic_reviewed_by?: string;
  semantic_reviewed_at?: string;
  /** A separate review disposition; matching hashes alone do not validate relevance. */
  status?: 'validated' | 'invalid_hold' | 'not_run';
}

interface PromptTechniqueRunBatch {
  schema_version: 'hc.prompt-technique-subagent-run-batch.v1' | 'hc.prompt-technique-subagent-run-batch.v2';
  packet_sha256?: string;
  audit_summary?: { validated: number; invalid_hold: number; missing: number };
  records: PromptTechniqueRunRecord[];
}

const batchFiles = import.meta.glob('./prompt-technique-runs/batch-*.json', {
  eager: true,
  import: 'default',
}) as Record<string, PromptTechniqueRunBatch>;

// Resolve a response against the current prompt before choosing among historical
// batches. Object/import enumeration order is not a valid version-selection rule.
const currentPromptHashBySlug = new Map(
  runPacket.records.map((record) => [record.technique_slug, record.prompt_sha256]),
);

const matchingRuns = Object.entries(batchFiles)
  .sort(([left], [right]) => left.localeCompare(right))
  .flatMap(([, batch]) => batch.records ?? [])
  .filter((record) => record.prompt_sha256 === currentPromptHashBySlug.get(record.technique_slug));

function runRank(record: PromptTechniqueRunRecord): number {
  if (record.status === 'validated') return 2;
  if (record.status === 'invalid_hold') return 1;
  return 0;
}

function runTime(record: PromptTechniqueRunRecord): string {
  return record.run_timestamp ?? `${record.run_date}T00:00:00.000Z`;
}

export const promptTechniqueRunBySlug = new Map<string, PromptTechniqueRunRecord>();
for (const record of matchingRuns) {
  const current = promptTechniqueRunBySlug.get(record.technique_slug);
  if (!current || runTime(record).localeCompare(runTime(current)) > 0 || (
    runTime(record) === runTime(current) && runRank(record) > runRank(current)
  )) {
    promptTechniqueRunBySlug.set(record.technique_slug, record);
  }
}
