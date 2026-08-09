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

const TECHNOLOGY_ICONS: Readonly<Record<string, string>> = {
  Angular: 'angular',
  TypeScript: 'typescript',
  JavaScript: 'javascript',
  RxJS: 'reactivex',
  'Vue.js': 'vuedotjs',
  React: 'react',
  'Next.js': 'nextdotjs',
  HTML5: 'html5',
  CSS3: 'css',
  SCSS: 'sass',
  Tailwind: 'tailwindcss',
  Bootstrap: 'bootstrap',
  'Angular Material': 'angular',
  'Node.js': 'nodedotjs',
  Express: 'express',
  'REST APIs': 'openapiinitiative',
  MySQL: 'mysql',
  Java: 'openjdk',
  'C#': 'dotnet',
  Git: 'git',
  Vite: 'vite',
  Webpack: 'webpack',
  Jest: 'jest',
  Jasmine: 'jasmine',
  Cypress: 'cypress',
};
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
        <div class="hero-actions">
          <a class="hero-button hero-button--primary" href="#contacto">Contactar</a
          ><a class="hero-button hero-button--secondary" href="#proyectos">Ver proyectos ↓</a>
        </div>
        <div class="hero-links">
          <a href="/Alberto-Perez-Garcia-CV.pdf" download>Descargar CV</a>
          @for (social of socials; track social.url) {
            <a [href]="social.url" target="_blank" rel="noopener noreferrer"
              >{{ social.label }} ↗</a
            >
          }
        </div>
      </div>
      <div class="hero-laptop-scene" aria-hidden="true">
        <div class="hero-laptop-glow"></div>
        <div class="hero-laptop">
          <div class="hero-laptop__lid">
            <div class="hero-laptop__screen">
              <div class="hero-laptop__screen-grid"></div>
              <div class="hero-laptop__screen-orbit"></div>
              <div class="hero-laptop__screen-line hero-laptop__screen-line--one"></div>
              <div class="hero-laptop__screen-line hero-laptop__screen-line--two"></div>
              <div class="hero-laptop__identity">
                <span class="hero-laptop__monogram">AP</span>
                <span class="hero-laptop__role">Senior Angular &amp;<br />Frontend Engineer</span>
              </div>
              <code>&lt;frontend architecture /&gt;</code>
              <div class="hero-laptop__screen-reflection"></div>
            </div>
          </div>
          <div class="hero-laptop__hinge"></div>
          <div class="hero-laptop__base">
            <div class="hero-laptop__keyboard"></div>
            <div class="hero-laptop__trackpad"></div>
          </div>
        </div>
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
            @if ($first) {
              <svg class="service-illustration" viewBox="0 0 520 230" aria-hidden="true" focusable="false">
                <defs>
                  <linearGradient id="developer-screen" x1="0" x2="1" y1="0" y2="1">
                    <stop stop-color="#27346f" />
                    <stop offset="1" stop-color="#11182e" />
                  </linearGradient>
                  <linearGradient id="developer-laptop" x1="0" x2="1" y1="0" y2="1">
                    <stop stop-color="#8b9cff" stop-opacity="0.75" />
                    <stop offset="1" stop-color="#303f85" stop-opacity="0.3" />
                  </linearGradient>
                  <radialGradient id="developer-glow">
                    <stop stop-color="#7188e8" stop-opacity="0.3" />
                    <stop offset="1" stop-color="#7188e8" stop-opacity="0" />
                  </radialGradient>
                </defs>
                <ellipse class="service-illustration__glow" cx="325" cy="112" rx="155" ry="112" fill="url(#developer-glow)" />
                <path class="service-illustration__orbit" d="M146 169c62-101 209-128 310-54 43 31 55 80 23 105" />
                <path class="service-illustration__orbit service-illustration__orbit--secondary" d="M187 45c87-43 219-19 275 55" />
                <g class="service-illustration__developer">
                  <circle cx="274" cy="73" r="23" />
                  <path d="M234 142c2-33 18-53 40-53s42 20 45 53" />
                  <path d="M253 94c6 9 31 12 43-2" />
                </g>
                <g class="service-illustration__laptop">
                  <rect x="285" y="112" width="143" height="83" rx="7" fill="url(#developer-screen)" />
                  <rect x="291" y="118" width="131" height="70" rx="4" />
                  <path d="M262 198h184l16 13H246l16-13Z" fill="url(#developer-laptop)" />
                  <path d="M307 128h73M307 140h54M307 152h64M307 164h35" />
                  <circle cx="402" cy="129" r="3" />
                </g>
                <g class="service-illustration__nodes">
                  <circle cx="164" cy="92" r="4" />
                  <circle cx="190" cy="145" r="3" />
                  <circle cx="454" cy="75" r="4" />
                  <path d="M164 92h59M190 145h55M428 96l26-21" />
                </g>
              </svg>
            }
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
          <article class="timeline-entry">
            <div class="timeline-marker" aria-hidden="true"></div>
            <div class="timeline-panel">
              <p class="company">{{ experience.company }}</p>
              <h3>{{ experience.title }}</h3>
              <p class="timeline-description">{{ experience.description }}</p>
              <div class="chips timeline-technologies">
                @for (technology of experience.technologies; track technology) {
                  <span>{{ technology }}</span>
                }
              </div>
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
          <div class="browser-mockup">
            <div class="browser-toolbar" aria-hidden="true">
              <div class="browser-controls"><i></i><i></i><i></i></div>
              <div class="browser-address">{{ project.publicUrl }}</div>
              <div class="browser-menu"><i></i><i></i><i></i></div>
            </div>
            <div class="browser-viewport">
              <img
                src="/images/projects/la-casa-de-los-juegos-home.png"
                [alt]="'Captura real de ' + project.title"
                width="1600"
                height="1280"
                loading="lazy"
              />
            </div>
          </div>
          <div class="project-copy">
            <p class="eyebrow">{{ project.sector }}</p>
            <h3>{{ project.title }}</h3>
            <p class="project-description">{{ project.description }}</p>
            <div class="chips">
              @for (technology of project.technologies; track technology) {
                <span>{{ technology }}</span>
              }
            </div>
            <ul class="project-features">
              @for (feature of project.features; track feature) {
                <li>{{ feature }}</li>
              }
            </ul>
            <div class="hero-actions project-actions">
              <a
                class="hero-button hero-button--primary"
                [href]="project.publicUrl"
                target="_blank"
                rel="noopener noreferrer"
                >Visitar proyecto ↗</a
              ><a
                class="hero-button hero-button--secondary"
                [routerLink]="['/proyectos', project.slug]"
                >Ver caso</a
              >
            </div>
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
          <article class="card stack-panel">
            <h3>{{ group.name }}</h3>
            <div class="chips stack-technologies">
              @for (technology of group.technologies; track technology) {
                <span
                  ><img
                    [src]="'/images/technologies/' + technologyIcons[technology] + '.svg'"
                    alt=""
                    width="20"
                    height="20"
                    loading="eager"
                  />{{ technology }}</span
                >
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
  protected readonly technologyIcons = TECHNOLOGY_ICONS;
  protected readonly socials = SOCIAL_LINKS;
  constructor() {
    inject(SeoService).set(HOME_SEO);
  }
}
