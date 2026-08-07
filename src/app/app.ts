import { afterNextRender, ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';

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
        <a
          routerLink="/"
          fragment="servicios"
          [class.is-active]="activeSection() === 'servicios'"
          [attr.aria-current]="activeSection() === 'servicios' ? 'location' : null"
          (click)="closeMenu()"
          >Servicios</a>
        <a
          routerLink="/"
          fragment="experiencia"
          [class.is-active]="activeSection() === 'experiencia'"
          [attr.aria-current]="activeSection() === 'experiencia' ? 'location' : null"
          (click)="closeMenu()"
          >Experiencia</a>
        <a
          routerLink="/"
          fragment="proyectos"
          [class.is-active]="activeSection() === 'proyectos'"
          [attr.aria-current]="activeSection() === 'proyectos' ? 'location' : null"
          (click)="closeMenu()"
          >Proyectos</a>
        <a
          routerLink="/"
          fragment="contacto"
          class="nav-cta"
          [class.is-active]="activeSection() === 'contacto'"
          [attr.aria-current]="activeSection() === 'contacto' ? 'location' : null"
          (click)="closeMenu()"
          >Contactar</a>
      </nav>
    </header>
    <router-outlet />
    @if (showScrollTop()) {
      <button class="scroll-top" type="button" aria-label="Volver arriba" (click)="scrollToTop()">
        <span aria-hidden="true">↑</span>
      </button>
    }
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
  protected readonly activeSection = signal<string | null>(null);
  protected readonly showScrollTop = signal(false);

  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);
  private sectionObserver: IntersectionObserver | undefined;

  constructor() {
    afterNextRender(() => this.enableSectionNavigation());
  }

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }
  protected closeMenu(): void {
    this.menuOpen.set(false);
  }
  protected scrollToTop(): void {
    this.activeSection.set(null);
    this.showScrollTop.set(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  private enableSectionNavigation(): void {
    const refreshSections = (): void => {
      this.sectionObserver?.disconnect();

      const sections = ['servicios', 'experiencia', 'proyectos', 'contacto']
        .map((id) => document.getElementById(id))
        .filter((section): section is HTMLElement => section !== null);

      if (!sections.length) {
        this.activeSection.set(null);
        return;
      }

      const visibility = new Map<string, number>();
      this.sectionObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              visibility.set(entry.target.id, entry.intersectionRatio);
            } else {
              visibility.delete(entry.target.id);
            }
          }

          if (window.scrollY < 48) {
            this.activeSection.set(null);
            return;
          }

          const active = [...visibility.entries()].sort(([, left], [, right]) => right - left)[0]?.[0];
          this.activeSection.set(active ?? null);
        },
        { rootMargin: '-22% 0px -62%', threshold: [0, 0.1, 0.35, 0.6] },
      );

      sections.forEach((section) => this.sectionObserver?.observe(section));
    };

    const updateScrollState = (): void => {
      const nearTop = window.scrollY < 48;
      this.showScrollTop.set(!nearTop);
      if (nearTop) {
        this.activeSection.set(null);
      }
    };

    const navigation = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        queueMicrotask(refreshSections);
      }
    });

    window.addEventListener('scroll', updateScrollState, { passive: true });
    refreshSections();
    updateScrollState();

    this.destroyRef.onDestroy(() => {
      navigation.unsubscribe();
      this.sectionObserver?.disconnect();
      window.removeEventListener('scroll', updateScrollState);
    });
  }
}
