import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NOT_FOUND_SEO } from '../../core/seo/seo.metadata';
import { SeoService } from '../../core/seo/seo.service';
@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<main id="main-content" class="section not-found">
    <p class="eyebrow">Error 404</p>
    <h1>Esta página no existe</h1>
    <p>El enlace puede haber cambiado o ya no estar disponible.</p>
    <a class="button primary" routerLink="/">Volver al inicio</a>
  </main>`,
})
export class NotFound {
  constructor() {
    inject(SeoService).set(NOT_FOUND_SEO);
  }
}
