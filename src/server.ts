import 'dotenv/config';

import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';

import { Resend } from 'resend';
import express from 'express';
import { join } from 'node:path';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();
const attempts = new Map<string, { count: number; resetAt: number }>();
const text = (value: unknown, max: number): string =>
  typeof value === 'string' ? value.trim().slice(0, max) : '';
const escapeHtml = (value: string): string =>
  value.replace(
    /[&<>'"]/g,
    (character) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character] ??
      character,
  );

app.post(
  '/api/contact',
  express.json({ limit: '12kb', type: 'application/json' }),
  async (req, res) => {
    const allowedOrigin = process.env['ALLOWED_ORIGIN'] ?? 'http://localhost:4200';
    if (
      req.get('origin') &&
      req.get('origin') !== allowedOrigin &&
      !req.get('origin')?.endsWith('.vercel.app')
    ) {
      res.status(403).json({ message: 'Origen no permitido.' });
      return;
    }
    const key = req.ip ?? 'unknown';
    const now = Date.now();
    const current = attempts.get(key);
    if (current && current.resetAt > now && current.count >= 5) {
      res.status(429).json({ message: 'Demasiados intentos.' });
      return;
    }
    attempts.set(
      key,
      current && current.resetAt > now
        ? { ...current, count: current.count + 1 }
        : { count: 1, resetAt: now + 15 * 60_000 },
    );
    const body = req.body as Record<string, unknown>;
    const name = text(body['name'], 80);
    const email = text(body['email'], 120);
    const company = text(body['company'], 100);
    const projectType = text(body['projectType'], 80);
    const budget = text(body['budget'], 80);
    const message = text(body['message'], 3000);
    if (text(body['website'], 200)) {
      res.status(204).end();
      return;
    }
    if (!name || !message || !body['privacy'] || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      res.status(422).json({ message: 'Datos no válidos.' });
      return;
    }
    const apiKey = process.env['RESEND_API_KEY'];
    console.log('RESEND_API_KEY cargada:', Boolean(apiKey));
    if (!apiKey) {
      res.status(503).json({ message: 'Servicio temporalmente no disponible.' });
      return;
    }
    try {
      const resend = new Resend(apiKey);
      const result = await Promise.race([
        resend.emails.send({
          from: process.env['CONTACT_FROM_EMAIL'] ?? 'Portfolio Alberto <contact@albertoperez.dev>',
          to: process.env['CONTACT_TO_EMAIL'] ?? 'contact@albertoperez.dev',
          replyTo: email,
          subject: `Nueva consulta profesional de ${name}`,
          html: `<div style="font:16px/1.6 system-ui;color:#172033;max-width:640px"><h1>Nueva consulta desde albertoperez.dev</h1><p><strong>Nombre:</strong> ${escapeHtml(name)}</p><p><strong>Correo:</strong> ${escapeHtml(email)}</p><p><strong>Empresa:</strong> ${escapeHtml(company || 'No indicada')}</p><p><strong>Proyecto:</strong> ${escapeHtml(projectType || 'No indicado')}</p><p><strong>Presupuesto:</strong> ${escapeHtml(budget || 'No indicado')}</p><hr><p style="white-space:pre-wrap">${escapeHtml(message)}</p></div>`,
        }),
        new Promise<never>((_, reject) => setTimeout(() => reject(new Error('timeout')), 8_000)),
      ]);
      if ('error' in result && result.error) throw new Error('provider-error');
      res.status(200).json({ ok: true });
    } catch {
      res.status(502).json({ message: 'No se pudo enviar el mensaje.' });
    }
  },
);

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) => (response ? writeResponseToNodeResponse(response, res) : next()))
    .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
