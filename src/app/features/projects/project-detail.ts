import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { PROJECTS } from '../../data/portfolio.data';
import { PROJECT_SEO } from '../../core/seo/seo.metadata';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/seo/seo.service';

@Component({
  selector: 'app-project-detail',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<main id="main-content" class="section prose">
    <a routerLink="/" fragment="proyectos">← Volver a proyectos</a>
    <p class="eyebrow m-t-4">Proyecto propio · Full Stack</p>
    <h1>{{ project.title }}</h1>
    <p class="lead">{{ project.description }}</p>
    <h2>Funcionalidades</h2>
    <ul>
      @for (feature of project.features; track feature) {
        <li>{{ feature }}</li>
      }
    </ul>
    <h2>Tecnologías confirmadas</h2>
    <div class="chips">
      @for (technology of project.technologies; track technology) {
        <span>{{ technology }}</span>
      }
    </div>
    <div class="m-t-4">
      <a class="button primary" [href]="project.publicUrl" target="_blank" rel="noopener noreferrer"
      >Visitar La Casa de los Juegos ↗</a>
    </div>

  </main>`,
  styles: `.m-t-4 { margin-top: 1rem; }`,
})
export class ProjectDetail {
  protected readonly project = PROJECTS[0];
  constructor() {
    inject(SeoService).set(PROJECT_SEO);
  }
}
