# Portfolio Angular SSR de Alberto Pérez García

Portfolio profesional migrado desde HTML estático a Angular 22 con componentes standalone, TypeScript strict, Signals, SSR híbrido, hidratación, SCSS y datos tipados. El original se conserva en `legacy/`.

## Requisitos y desarrollo

- Node.js 22.22.3 o superior (`.nvmrc`)
- npm 11

```bash
npm install
npm start
npm run build
npm run serve:ssr
```

El build prerenderiza home, privacidad y el caso público. Las rutas restantes se resuelven mediante SSR. El endpoint `/api/contact` se ejecuta únicamente en servidor.

## Variables de entorno

Copiar `.env.example` a la configuración local o de Vercel. Nunca usar prefijos públicos para estas variables:

- `RESEND_API_KEY`: clave privada de Resend.
- `CONTACT_FROM_EMAIL`: `Portfolio Alberto <contact@albertoperez.dev>` una vez verificado el dominio.
- `CONTACT_TO_EMAIL`: buzón de destino; Cloudflare Email Routing puede reenviarlo.
- `ALLOWED_ORIGIN`: `https://albertoperez.dev` en producción.

Resend debe tener `albertoperez.dev` verificado. La API valida tamaño, origen, honeypot, campos y rate limit, escapa HTML y configura Reply-To. En tests no se envían correos reales.

## Calidad

```bash
npm run lint
npm test
npm run test:e2e
npm run format:check
```

Playwright incluye una auditoría axe. Para E2E hay que instalar Chromium una vez con `npx playwright install chromium`.

## Estructura y edición

- `src/app/core`: modelos, servicios y SEO.
- `src/app/data/portfolio.data.ts`: servicios, experiencia, tecnologías y proyectos. Añade proyectos con un slug único; sólo incluye `publicUrl` si existe un enlace público verificable.
- `src/app/features`: home, contacto, proyecto, privacidad y 404.
- `src/server.ts`: API privada de contacto y SSR.
- `public`: favicon, manifest, robots, sitemap, Open Graph y CV.

Los textos se cambian en los datos o componentes de la feature correspondiente. Para reemplazar el CV, sobrescribe `public/Alberto-Perez-Garcia-CV.pdf` conservando el nombre. La versión incluida es un marcador pendiente porque el repositorio original no contiene el CV. Sustituye `public/og-image.svg` por un PNG 1200×630 si se requiere compatibilidad social máxima.

## Vercel

Conecta esta rama al proyecto existente y configura las cuatro variables. `vercel.json` añade cabeceras de seguridad sin redirigir ni modificar el dominio. Un deploy sin `--prod` genera preview; producción debe promoverse sólo tras validar SSR, formulario, responsive, SEO y Lighthouse. Web Analytics y Speed Insights no se activan hasta decidir la base legal/consentimiento.

## Decisiones y limitaciones

Home se prerenderiza porque el contenido cambia poco y beneficia al SEO y al tiempo de respuesta. El código mantiene una frontera de datos para sustituirlos por CMS más adelante. No se añadió una librería de animación: CSS respeta `prefers-reduced-motion` y evita JavaScript inicial. El rate limit es en memoria y debe sustituirse por almacenamiento distribuido si el volumen crece. El CV definitivo y las credenciales de Resend siguen pendientes de aportación/configuración; no se inventaron datos.
