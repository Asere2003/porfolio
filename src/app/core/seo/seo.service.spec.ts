import { TestBed } from '@angular/core/testing';
import { SeoService } from './seo.service';
describe('SeoService', () => {
  it('updates title, description and canonical', () => {
    const service = TestBed.inject(SeoService);
    service.set({
      title: 'Portfolio test',
      description: 'Description test',
      canonical: 'https://example.com',
    });
    expect(document.title).toBe('Portfolio test');
    expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toBe(
      'Description test',
    );
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
      'https://example.com',
    );
  });
});
