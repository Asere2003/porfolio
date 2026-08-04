import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a class="skip-link" href="#main-content">Saltar al contenido</a>
    <header class="site-header">
      <a class="brand" routerLink="/" aria-label="Inicio">AP<span>.</span></a>
      <button
        class="menu-button"
        type="button"
        (click)="toggleMenu()"
        [attr.aria-expanded]="menuOpen()"
        aria-controls="main-nav"
      >
        Menú
      </button>
      <nav id="main-nav" aria-label="Navegación principal" [class.open]="menuOpen()">
        <a routerLink="/" fragment="servicios" (click)="closeMenu()">Servicios</a
        ><a routerLink="/" fragment="experiencia" (click)="closeMenu()">Experiencia</a
        ><a routerLink="/" fragment="proyectos" (click)="closeMenu()">Proyectos</a
        ><a routerLink="/" fragment="contacto" class="nav-cta" (click)="closeMenu()">Contactar</a>
      </nav>
    </header>
    <router-outlet />
    <footer>
      <div>
        <strong>Alberto Pérez García</strong>
        <p>Senior Angular & Frontend Engineer</p>
      </div>
      <div class="footer-links">
        <a href="/Alberto-Perez-Garcia-CV.pdf" download>Descargar CV</a
        ><a routerLink="/privacidad">Privacidad</a
        ><a href="mailto:contact@albertoperez.dev">contact@albertoperez.dev</a>
      </div>
      <small>© 2026 Alberto Pérez García</small>
    </footer>
  `,
})
export class App {
  protected readonly menuOpen = signal(false);
  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }
  protected closeMenu(): void {
    this.menuOpen.set(false);
  }
}
