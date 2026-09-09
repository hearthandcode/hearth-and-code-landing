// Typed wrappers around vendored JSON data.
// These re-export parsed data as TS modules so Vite does not need to inline
// multi-hundred-KB JSON imports (which can hit JSON import size limits).
import catalogEntries from './vendored/prompt-catalog.json';
import templateFile from './vendored/prompt-templates.json';

export interface CatalogSection { title: string; body_html?: string; body?: string; }
export interface CatalogEntry {
  slug: string; title: string; type: string; number: number;
  sections: CatalogSection[];
}
export interface TemplateField { key: string; label: string; sample?: string; kind?: string; }
export interface TemplateTech { slug: string; title: string; type: string; template?: string; fields?: TemplateField[]; }
export interface TemplateDomain { id: string; label: string; note?: string; samples?: Record<string, string>; }
export interface TemplateFile { techniques: TemplateTech[]; domains: TemplateDomain[]; }

export const promptCatalogEntries = catalogEntries as CatalogEntry[];
export const promptTemplateFile = templateFile as TemplateFile;