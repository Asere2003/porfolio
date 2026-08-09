import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  signal,
  viewChildren,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ContactPayload, ContactState } from '../../core/models/portfolio.models';
import { ContactService } from '../../core/services/contact.service';
type ContactControls = { [K in keyof ContactPayload]: FormControl<ContactPayload[K]> };
@Component({
  selector: 'app-contact-form',
  imports: [ReactiveFormsModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <form
    [formGroup]="form"
    (ngSubmit)="submit()"
    [attr.data-state]="state()"
    novalidate
  >
    <div class="form-grid">
      <label class="form-field"
        ><span class="field-label">Nombre *</span
        ><span class="field-control"
          ><input
            #field
            formControlName="name"
            autocomplete="name"
            maxlength="80"
            [attr.aria-invalid]="invalid('name')"
            [attr.aria-describedby]="invalid('name') ? 'name-error' : null"
        /></span>
        @if (invalid('name')) {
          <span class="error" id="name-error">Indica tu nombre.</span>
        }
      </label>
      <label class="form-field"
        ><span class="field-label">Correo electrónico *</span
        ><span class="field-control"
          ><input
            #field
            formControlName="email"
            type="email"
            autocomplete="email"
            maxlength="120"
            [attr.aria-invalid]="invalid('email')"
            [attr.aria-describedby]="invalid('email') ? 'email-error' : null"
        /></span>
        @if (invalid('email')) {
          <span class="error" id="email-error">Introduce un correo válido.</span>
        }
      </label>
      <label class="form-field"
        ><span class="field-label">Empresa</span
        ><span class="field-control"
          ><input formControlName="company" autocomplete="organization" maxlength="100" /></span
      >
      </label>
      <label class="form-field"
        ><span class="field-label">Tipo de proyecto</span
        ><span class="field-control"
          ><select formControlName="projectType">
            <option value="">Selecciona una opción</option>
            <option>Desarrollo Angular</option>
            <option>Arquitectura frontend</option>
            <option>Consultoría</option>
            <option>Otro</option>
          </select></span
        ></label
      >
      <label class="form-field"
        ><span class="field-label">Presupuesto aproximado</span
        ><span class="field-control"
          ><select formControlName="budget">
            <option value="">Prefiero comentarlo</option>
            <option>Menos de 5.000 €</option>
            <option>5.000–15.000 €</option>
            <option>Más de 15.000 €</option>
          </select></span
        ></label
      >
    </div>
    <label class="form-field form-field--message"
      ><span class="field-label">Mensaje *</span
      ><span class="field-control"
        ><textarea
          #field
          formControlName="message"
          rows="6"
          maxlength="3000"
          [attr.aria-invalid]="invalid('message')"
          [attr.aria-describedby]="invalid('message') ? 'message-error' : null"
        ></textarea
      ></span>
      @if (invalid('message')) {
        <span class="error" id="message-error">Cuéntame brevemente qué necesitas.</span>
      }
    </label>
    <label class="privacy-check" [class.is-invalid]="invalid('privacy')"
      ><input
        #field
        formControlName="privacy"
        type="checkbox"
      /><span>He leído y acepto la <a routerLink="/privacidad">política de privacidad</a>.</span></label
    >
    <label class="honeypot" aria-hidden="true"
      >Sitio web<input formControlName="website" tabindex="-1" autocomplete="off"
    /></label>
    <button
      class="hero-button hero-button--primary contact-submit"
      type="submit"
      [disabled]="state() === 'submitting'"
    >
      {{ state() === 'submitting' ? 'Enviando…' : 'Enviar mensaje' }}
    </button>
    <div class="form-status" aria-live="polite">
      @switch (state()) {
        @case ('success') {
          Mensaje enviado. Te responderé lo antes posible.
        }
        @case ('rate-limit') {
          Has realizado varios intentos. Prueba de nuevo más tarde.
        }
        @case ('error') {
          No se pudo enviar. Tus datos siguen aquí para que puedas reintentarlo.
        }
        @case ('invalid') {
          Revisa los campos indicados.
        }
      }
    </div>
  </form>`,
})
export class ContactForm {
  private readonly contact = inject(ContactService);
  private readonly destroyRef = inject(DestroyRef);
  private statusTimer: ReturnType<typeof setTimeout> | undefined;
  protected readonly state = signal<ContactState>('idle');
  protected readonly fields =
    viewChildren<ElementRef<HTMLInputElement | HTMLTextAreaElement>>('field');
  protected readonly form = new FormGroup<ContactControls>({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(80)],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email, Validators.maxLength(120)],
    }),
    company: new FormControl('', { nonNullable: true, validators: [Validators.maxLength(100)] }),
    projectType: new FormControl('', { nonNullable: true }),
    budget: new FormControl('', { nonNullable: true }),
    message: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(3000)],
    }),
    privacy: new FormControl(false, { nonNullable: true, validators: [Validators.requiredTrue] }),
    website: new FormControl('', { nonNullable: true }),
  });
  constructor() {
    this.destroyRef.onDestroy(() => this.clearStatusTimer());
  }
  protected invalid(name: keyof ContactPayload): boolean {
    const control = this.form.controls[name];
    return control.invalid && (control.touched || this.state() === 'invalid');
  }
  protected submit(): void {
    this.clearStatusTimer();
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.state.set('invalid');
      queueMicrotask(() =>
        this.fields()
          .find((field) => field.nativeElement.getAttribute('aria-invalid') === 'true')
          ?.nativeElement.focus(),
      );
      return;
    }
    this.state.set('submitting');
    const value = this.form.getRawValue();
    const payload = {
      ...value,
      name: value.name.trim(),
      email: value.email.trim(),
      company: value.company.trim(),
      message: value.message.trim(),
    };
    this.contact.send(payload).subscribe({
      next: () => {
        this.setTemporaryState('success');
        this.form.reset();
      },
      error: (error: { status?: number }) =>
        this.setTemporaryState(error.status === 429 ? 'rate-limit' : 'error'),
    });
  }
  private setTemporaryState(state: 'success' | 'error' | 'rate-limit'): void {
    this.state.set(state);
    this.statusTimer = setTimeout(() => {
      this.state.set('idle');
      this.statusTimer = undefined;
    }, 8_000);
  }
  private clearStatusTimer(): void {
    if (this.statusTimer) {
      clearTimeout(this.statusTimer);
      this.statusTimer = undefined;
    }
  }
}
