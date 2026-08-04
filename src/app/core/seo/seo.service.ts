import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SeoMetadata } from '../models/portfolio.models';

export const SITE_URL = 'https://albertoperez.dev';
const DEFAULT_IMAGE = '/og-image.png';
const DEFAULT_IMAGE_ALT = 'Alberto Pérez, Senior Angular y Frontend Engineer';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  set(metadata: SeoMetadata): void {
    const canonicalUrl = new URL(metadata.canonicalPath, SITE_URL).toString();
    const imageUrl = new URL(metadata.image ?? DEFAULT_IMAGE, SITE_URL).toString();
    const imageAlt = metadata.imageAlt ?? DEFAULT_IMAGE_ALT;

    this.title.setTitle(metadata.title);
    this.meta.updateTag({ name: 'description', content: metadata.description });
    this.meta.updateTag({ name: 'robots', content: metadata.robots ?? 'index, follow' });

    for (const [property, content] of Object.entries({
      'og:locale': 'es_ES',
      'og:site_name': 'Alberto Pérez García',
      'og:title': metadata.title,
      'og:description': metadata.description,
      'og:url': canonicalUrl,
      'og:type': metadata.ogType ?? 'website',
      'og:image': imageUrl,
      'og:image:width': '1200',
      'og:image:height': '630',
      'og:image:alt': imageAlt,
    })) {
      this.meta.updateTag({ property, content }, `property="${property}"`);
    }

    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: metadata.title });
    this.meta.updateTag({ name: 'twitter:description', content: metadata.description });
    this.meta.updateTag({ name: 'twitter:image', content: imageUrl });
    this.meta.updateTag({ name: 'twitter:image:alt', content: imageAlt });

    let canonical = this.document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = this.document.createElement('link');
      canonical.rel = 'canonical';
      this.document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    this.document.querySelectorAll('script[data-seo-json-ld]').forEach((node) => node.remove());
    for (const structuredData of metadata.structuredData ?? []) {
      const script = this.document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo-json-ld', '');
      script.textContent = JSON.stringify(structuredData).replace(/</g, '\\u003c');
      this.document.head.appendChild(script);
    }
  }
}
