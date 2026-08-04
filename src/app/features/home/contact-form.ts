import {
  ChangeDetectionStrategy,
  Component,
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
  template: ` <form [formGroup]="form" (ngSubmit)="submit()" novalidate>
    <div class="form-grid">
      <label
        >Nombre *<input
          #field
          formControlName="name"
          autocomplete="name"
          maxlength="80"
          [attr.aria-invalid]="invalid('name')"
        />
        @if (invalid('name')) {
          <span class="error">Indica tu nombre.</span>
        }
      </label>
      <label
        >Correo electrónico *<input
          #field
          formControlName="email"
          type="email"
          autocomplete="email"
          maxlength="120"
          [attr.aria-invalid]="invalid('email')"
        />
        @if (invalid('email')) {
          <span class="error">Introduce un correo válido.</span>
        }
      </label>
      <label
        >Empresa <input formControlName="company" autocomplete="organization" maxlength="100"
      /></label>
      <label
        >Tipo de proyecto
        <select formControlName="projectType">
          <option value="">Selecciona una opción</option>
          <option>Desarrollo Angular</option>
          <option>Arquitectura frontend</option>
          <option>Consultoría</option>
          <option>Otro</option>
        </select></label
      >
      <label
        >Presupuesto aproximado
        <select formControlName="budget">
          <option value="">Prefiero comentarlo</option>
          <option>Menos de 5.000 €</option>
          <option>5.000–15.000 €</option>
          <option>Más de 15.000 €</option>
        </select></label
      >
    </div>
    <label
      >Mensaje *<textarea
        #field
        formControlName="message"
        rows="6"
        maxlength="3000"
        [attr.aria-invalid]="invalid('message')"
      ></textarea>
      @if (invalid('message')) {
        <span class="error">Cuéntame brevemente qué necesitas.</span>
      }
    </label>
    <label class="privacy-check"
      ><input #field formControlName="privacy" type="checkbox" /> He leído y acepto la
      <a routerLink="/privacidad">política de privacidad</a>.</label
    >
    <label class="honeypot" aria-hidden="true"
      >Sitio web<input formControlName="website" tabindex="-1" autocomplete="off"
    /></label>
    <button class="button primary" type="submit" [disabled]="state() === 'submitting'">
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
  protected invalid(name: keyof ContactPayload): boolean {
    const control = this.form.controls[name];
    return control.invalid && (control.touched || this.state() === 'invalid');
  }
  protected submit(): void {
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
        this.state.set('success');
        this.form.reset();
      },
      error: (error: { status?: number }) =>
        this.state.set(error.status === 429 ? 'rate-limit' : 'error'),
    });
  }
}
