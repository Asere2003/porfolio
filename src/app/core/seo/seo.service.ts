import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SeoMetadata } from '../models/portfolio.models';
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);
  set(metadata: SeoMetadata): void {
    this.title.setTitle(metadata.title);
    this.meta.updateTag({ name: 'description', content: metadata.description });
    for (const [property, content] of Object.entries({
      'og:title': metadata.title,
      'og:description': metadata.description,
      'og:url': metadata.canonical,
      'og:type': 'website',
    }))
      this.meta.updateTag({ property, content });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    let canonical = this.document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = this.document.createElement('link');
      canonical.rel = 'canonical';
      this.document.head.appendChild(canonical);
    }
    canonical.href = metadata.canonical;
  }
}
