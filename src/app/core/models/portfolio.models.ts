export interface Service {
  readonly title: string;
  readonly description: string;
  readonly icon: string;
  readonly technologies: readonly string[];
}
export interface Experience {
  readonly company: string;
  readonly period?: string;
  readonly title: string;
  readonly description: string;
  readonly technologies: readonly string[];
}
export interface Project {
  readonly slug: string;
  readonly title: string;
  readonly sector: string;
  readonly description: string;
  readonly technologies: readonly string[];
  readonly publicUrl?: string;
  readonly ownProject?: boolean;
  readonly features?: readonly string[];
}
export interface TechnologyGroup {
  readonly name: string;
  readonly technologies: readonly string[];
}
export interface SocialLink {
  readonly label: string;
  readonly url: string;
}
export interface SeoMetadata {
  readonly title: string;
  readonly description: string;
  readonly canonicalPath: string;
  readonly robots?: string;
  readonly ogType?: 'website' | 'article';
  readonly image?: string;
  readonly imageAlt?: string;
  readonly structuredData?: readonly Record<string, unknown>[];
}
export type ContactState = 'idle' | 'submitting' | 'success' | 'error' | 'rate-limit' | 'invalid';
export interface ContactPayload {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  message: string;
  privacy: boolean;
  website: string;
}
