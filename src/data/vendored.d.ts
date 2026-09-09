declare module '*/data/vendored/prompt-catalog.json' {
  export interface CatalogSection { title: string; body_html?: string; body?: string; }
  export interface CatalogEntry {
    slug: string; title: string; type: string; number: number;
    sections: CatalogSection[];
  }
  const entries: CatalogEntry[];
  export default entries;
}

declare module '*/data/vendored/prompt-templates.json' {
  export interface TemplateField { key: string; label: string; sample?: string; kind?: string; }
  export interface TemplateTech { slug: string; title: string; type: string; template?: string; fields?: TemplateField[]; }
  export interface TemplateDomain { id: string; label: string; note?: string; samples?: Record<string, string>; }
  export interface TemplateFile {
    techniques: TemplateTech[];
    domains: TemplateDomain[];
  }
  const file: TemplateFile;
  export default file;
}

declare module '*/data/vendored/fieldcraft-publication.json' {
  export interface FieldcraftArticle {
    id: string; slug: string; title: string; subject: string; category: string;
    description: string; reading_minutes: number; status: string; verified: boolean;
    deck: string; source_refs: (string | { title: string; url: string })[];
  }
  export interface FieldcraftPublication { articles: FieldcraftArticle[]; }
  const file: FieldcraftPublication;
  export default file;
}