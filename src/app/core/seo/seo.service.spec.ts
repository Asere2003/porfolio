import { TestBed } from '@angular/core/testing';
import { SeoService } from './seo.service';
describe('SeoService', () => {
  it('updates social metadata, canonical and structured data without duplicates', () => {
    const service = TestBed.inject(SeoService);
    service.set({
      title: 'Portfolio test',
      description: 'Description test',
      canonicalPath: '/test',
      image: '/test.png',
      imageAlt: 'Test image',
      structuredData: [{ '@context': 'https://schema.org', '@type': 'WebPage', name: 'Test' }],
    });
    expect(document.title).toBe('Portfolio test');
    expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toBe(
      'Description test',
    );
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
      'https://albertoperez.dev/test',
    );
    expect(document.querySelector('meta[property="og:image"]')?.getAttribute('content')).toBe(
      'https://albertoperez.dev/test.png',
    );
    expect(document.querySelector('meta[name="twitter:title"]')?.getAttribute('content')).toBe(
      'Portfolio test',
    );
    expect(document.querySelectorAll('script[data-seo-json-ld]')).toHaveLength(1);

    service.set({
      title: 'Second page',
      description: 'Second description',
      canonicalPath: '/second',
    });

    expect(document.querySelectorAll('link[rel="canonical"]')).toHaveLength(1);
    expect(document.querySelectorAll('script[data-seo-json-ld]')).toHaveLength(0);
  });
});
