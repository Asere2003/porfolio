import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  EXPERIENCES,
  PROJECTS,
  SERVICES,
  SOCIAL_LINKS,
  TECHNOLOGIES,
} from '../../data/portfolio.data';

import { ContactForm } from './contact-form';
import { HOME_SEO } from '../../core/seo/seo.metadata';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/seo/seo.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink, ContactForm],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <main id="main-content">
    <section class="hero section">
      <div class="hero-copy">
        <p class="eyebrow available">Disponible para freelance</p>
        <h1>Alberto Pérez García</h1>
        <p class="hero-title">Senior Angular & Frontend Engineer</p>
        <p class="hero-subtitle">Angular · TypeScript · Microfrontends · Arquitectura Frontend</p>
        <p class="lead">
          Senior Software Engineer con más de 7 años de experiencia desarrollando aplicaciones
          enterprise para banca, energía y movilidad. Especializado en Angular, TypeScript y
          arquitecturas frontend escalables, creando productos desde cero, modernizando aplicaciones
          legacy e integrando APIs REST. También puedo asumir tareas backend con Node.js y Express.
        </p>
        <div class="badges">
          <span>Angular Expert</span><span>Enterprise Applications</span
          ><span>Full Stack Support</span>
        </div>
        <div class="actions">
          <a class="button primary" href="#contacto">Contactar</a
          ><a class="button" href="/Alberto-Perez-Garcia-CV.pdf" download>Descargar CV</a>
          @for (social of socials; track social.url) {
            <a class="button" [href]="social.url" target="_blank" rel="noopener noreferrer"
              >{{ social.label }} ↗</a
            >
          }
          <a class="text-link" href="#proyectos">Ver proyectos ↓</a>
        </div>
      </div>
      <div class="hero-visual" aria-hidden="true">
        <div class="orbit"></div>
        <div class="monogram">AP</div>
        <code>&lt;frontend architecture /&gt;</code>
      </div>
    </section>
    <section class="section" id="servicios">
      <div class="section-heading">
        <p class="eyebrow">Servicios</p>
        <h2>Cómo puedo ayudarte</h2>
        <p>Ingeniería frontend que convierte complejidad técnica en productos fiables.</p>
      </div>
      <div class="card-grid services">
        @for (service of services; track service.title) {
          <article class="card">
            <span class="icon" aria-hidden="true">{{ service.icon }}</span>
            <h3>{{ service.title }}</h3>
            <p>{{ service.description }}</p>
            <div class="chips">
              @for (technology of service.technologies; track technology) {
                <span>{{ technology }}</span>
              }
            </div>
          </article>
        }
      </div>
    </section>
    <section class="section" id="experiencia">
      <div class="section-heading">
        <p class="eyebrow">Experiencia</p>
        <h2>Casos profesionales enterprise</h2>
        <p>Trabajo seleccionado sin exponer información confidencial ni enlaces internos.</p>
      </div>
      <div class="timeline">
        @for (experience of experiences; track experience.company) {
          <article>
            <div class="timeline-marker"></div>
            <p class="company">{{ experience.company }}</p>
            <h3>{{ experience.title }}</h3>
            <p>{{ experience.description }}</p>
            <div class="chips">
              @for (technology of experience.technologies; track technology) {
                <span>{{ technology }}</span>
              }
            </div>
          </article>
        }
      </div>
    </section>
    <section class="section" id="proyectos">
      <div class="section-heading">
        <p class="eyebrow">Proyecto propio publicado</p>
        <h2>Producto Full Stack</h2>
      </div>
      @for (project of projects; track project.slug) {
        <article class="featured-project">
          <div>
            <p class="eyebrow">{{ project.sector }}</p>
            <h3>{{ project.title }}</h3>
            <p>{{ project.description }}</p>
            <div class="chips">
              @for (technology of project.technologies; track technology) {
                <span>{{ technology }}</span>
              }
            </div>
            <div class="actions">
              <a
                class="button primary"
                [href]="project.publicUrl"
                target="_blank"
                rel="noopener noreferrer"
                >Visitar proyecto ↗</a
              ><a class="button" [routerLink]="['/proyectos', project.slug]">Ver caso</a>
            </div>
          </div>
          <div class="project-preview" aria-label="Vista conceptual del proyecto">
            <span>La Casa de los Juegos</span><strong>Tu próxima partida empieza aquí</strong>
            <div class="mini-cards"><i></i><i></i><i></i></div>
          </div>
        </article>
      }
    </section>
    <section class="section" id="stack">
      <div class="section-heading">
        <p class="eyebrow">Stack técnico</p>
        <h2>Tecnologías principales</h2>
      </div>
      <div class="card-grid technologies">
        @for (group of technologies; track group.name) {
          <article class="card">
            <h3>{{ group.name }}</h3>
            <div class="chips">
              @for (technology of group.technologies; track technology) {
                <span>{{ technology }}</span>
              }
            </div>
          </article>
        }
      </div>
    </section>
    <section class="section contact" id="contacto">
      <div class="section-heading">
        <p class="eyebrow available">Hablemos</p>
        <h2>¿Tienes un proyecto en mente?</h2>
        <p>Cuéntame qué necesitas y te responderé normalmente en menos de 24 horas laborables.</p>
      </div>
      <app-contact-form />
    </section>
  </main>`,
})
export class Home {
  protected readonly services = SERVICES;
  protected readonly experiences = EXPERIENCES;
  protected readonly projects = PROJECTS;
  protected readonly technologies = TECHNOLOGIES;
  protected readonly socials = SOCIAL_LINKS;
  constructor() {
    inject(SeoService).set(HOME_SEO);
  }
}
