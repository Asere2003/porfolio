import type { VercelRequest, VercelResponse } from '@vercel/node';

import { Resend } from 'resend';

const LIMITS = {
  name: 80,
  email: 120,
  company: 100,
  projectType: 80,
  budget: 80,
  message: 3000,
  website: 200,
} as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const text = (value: unknown, maxLength: number): string | null => {
  if (typeof value !== 'string' || value.length > maxLength) {
    return null;
  }

  return value.trim();
};

const escapeHtml = (value: string): string =>
  value.replace(
    /[&<>'"]/g,
    (character) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character] ??
      character,
  );

const isAllowedOrigin = (origin: string | undefined): boolean => {
  if (!origin) {
    return true;
  }

  try {
    const url = new URL(origin);
    const configuredOrigins = (process.env['ALLOWED_ORIGIN'] ?? '')
      .split(',')
      .map((value) => value.trim())
      .filter(Boolean);

    return (
      origin === 'https://albertoperez.dev' ||
      origin === 'https://www.albertoperez.dev' ||
      configuredOrigins.includes(origin) ||
      (url.protocol === 'https:' && url.hostname.endsWith('.vercel.app')) ||
      ((url.protocol === 'http:' || url.protocol === 'https:') &&
        (url.hostname === 'localhost' || url.hostname === '127.0.0.1'))
    );
  } catch {
    return false;
  }
};

const isJsonContentType = (contentType: string | undefined): boolean =>
  /^application\/json(?:\s*;|$)/i.test(contentType ?? '');

const getBody = (body: unknown): Record<string, unknown> | null => {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return null;
  }

  return body as Record<string, unknown>;
};

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ message: 'Método no permitido.' });
    return;
  }

  const origin = Array.isArray(req.headers.origin) ? req.headers.origin[0] : req.headers.origin;
  if (!isAllowedOrigin(origin)) {
    res.status(403).json({ message: 'Origen no permitido.' });
    return;
  }

  const contentType = Array.isArray(req.headers['content-type'])
    ? req.headers['content-type'][0]
    : req.headers['content-type'];
  if (!isJsonContentType(contentType)) {
    res.status(415).json({ message: 'Content-Type no compatible.' });
    return;
  }

  const body = getBody(req.body);
  if (!body) {
    res.status(422).json({ message: 'Datos no válidos.' });
    return;
  }

  const name = text(body['name'], LIMITS.name);
  const email = text(body['email'], LIMITS.email);
  const company = text(body['company'], LIMITS.company);
  const projectType = text(body['projectType'], LIMITS.projectType);
  const budget = text(body['budget'], LIMITS.budget);
  const message = text(body['message'], LIMITS.message);
  const website = text(body['website'], LIMITS.website);

  if (website) {
    res.status(204).end();
    return;
  }

  if (
    !name ||
    !email ||
    company === null ||
    projectType === null ||
    budget === null ||
    !message ||
    website === null ||
    body['privacy'] !== true ||
    !EMAIL_PATTERN.test(email)
  ) {
    res.status(422).json({ message: 'Datos no válidos.' });
    return;
  }

  const apiKey = process.env['RESEND_API_KEY'];
  if (!apiKey) {
    res.status(503).json({ message: 'Servicio temporalmente no disponible.' });
    return;
  }

  const from = process.env['CONTACT_FROM_EMAIL'];
  const to = process.env['CONTACT_TO_EMAIL'];
  if (!from || !to) {
    console.error('Contact email configuration is incomplete.');
    res.status(503).json({ message: 'Servicio temporalmente no disponible.' });
    return;
  }

  try {
    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Nueva consulta profesional de ${name}`,
      html: `<div style="font:16px/1.6 system-ui;color:#172033;max-width:640px"><h1>Nueva consulta desde albertoperez.dev</h1><p><strong>Nombre:</strong> ${escapeHtml(name)}</p><p><strong>Correo:</strong> ${escapeHtml(email)}</p><p><strong>Empresa:</strong> ${escapeHtml(company || 'No indicada')}</p><p><strong>Proyecto:</strong> ${escapeHtml(projectType || 'No indicado')}</p><p><strong>Presupuesto:</strong> ${escapeHtml(budget || 'No indicado')}</p><hr><p style="white-space:pre-wrap">${escapeHtml(message)}</p></div>`,
    });

    if (result.error) {
      console.error('Resend rejected the contact email request.');
      res.status(502).json({ message: 'No se pudo enviar el mensaje.' });
      return;
    }

    res.status(200).json({ ok: true });
  } catch {
    console.error('Contact email delivery failed unexpectedly.');
    res.status(502).json({ message: 'No se pudo enviar el mensaje.' });
  }
}
