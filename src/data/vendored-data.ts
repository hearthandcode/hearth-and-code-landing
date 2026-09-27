// Typed wrappers around vendored JSON data.
// These re-export parsed data as TS modules so Vite does not need to inline
// multi-hundred-KB JSON imports (which can hit JSON import size limits).
import catalogEntries from './vendored/prompt-catalog.json';
import templateFile from './vendored/prompt-templates.json';
import executionFile from './prompt-atlas-executions.json' with { type: 'json' };

export interface CatalogSection { title: string; body_html?: string; body?: string; }
export interface CatalogEntry {
  slug: string; title: string; type: string; number: number;
  status: string;
  /** Atlas hierarchy: document → category → technique. */
  document: string;
  category: string;
  sections: CatalogSection[];
}
export interface TemplateField { key: string; label: string; sample?: string; kind?: string; }
export interface TemplateTech { slug: string; title: string; type: string; template?: string; fields?: TemplateField[]; }
export interface TemplateDomain { id: string; label: string; note?: string; samples?: Record<string, string>; }
export interface TemplateFile { techniques: TemplateTech[]; domains: TemplateDomain[]; }
export interface PromptAtlasExecution {
  slug: string;
  provider: string;
  model: string;
  executed_at: string;
  execution_mode: string;
  tool_events: number;
  prompt_sha256: string;
  response_sha256: string;
  task_class: string;
  submitted_prompt: string;
  response: string;
  receipt_boundary: string;
}

export const promptCatalogEntries = catalogEntries as CatalogEntry[];
export const promptTemplateFile = templateFile as TemplateFile;
export const promptAtlasExecutions = (executionFile as { executions: PromptAtlasExecution[] }).executions;
export const promptAtlasExecutionBySlug = new Map(promptAtlasExecutions.map((execution) => [execution.slug, execution]));