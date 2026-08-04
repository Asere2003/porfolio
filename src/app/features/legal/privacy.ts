import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PRIVACY_SEO } from '../../core/seo/seo.metadata';
import { SeoService } from '../../core/seo/seo.service';
@Component({
  selector: 'app-privacy',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<main id="main-content" class="section prose">
    <p class="eyebrow">Legal</p>
    <h1>Política de privacidad</h1>
    <p>
      El responsable del tratamiento es Alberto Pérez García. Puedes contactar en
      <a href="mailto:contact@albertoperez.dev">contact@albertoperez.dev</a>.
    </p>
    <h2>Finalidad y datos</h2>
    <p>
      Los datos enviados mediante el formulario —nombre, correo, empresa y contenido del mensaje— se
      utilizan exclusivamente para responder a tu consulta profesional.
    </p>
    <h2>Base jurídica y conservación</h2>
    <p>
      El tratamiento se basa en tu consentimiento, que puedes retirar contactando por correo. Los
      datos se conservarán sólo durante el tiempo necesario para gestionar la consulta y las
      obligaciones aplicables.
    </p>
    <h2>Tus derechos</h2>
    <p>
      Puedes solicitar acceso, rectificación o supresión de tus datos a través del correo indicado.
      Este sitio no instala cookies no esenciales inicialmente.
    </p>
  </main>`,
})
export class Privacy {
  constructor() {
    inject(SeoService).set(PRIVACY_SEO);
  }
}
