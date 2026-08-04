import { SeoMetadata } from '../models/portfolio.models';
import { SITE_URL } from './seo.service';

const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export const HOME_SEO: SeoMetadata = {
  title: 'Alberto Pérez | Senior Angular & Frontend Engineer',
  description:
    'Senior Software Engineer especializado en Angular, TypeScript, microfrontends y arquitecturas frontend escalables para aplicaciones enterprise.',
  canonicalPath: '/',
  structuredData: [
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': PERSON_ID,
      name: 'Alberto Pérez García',
      jobTitle: 'Senior Angular & Frontend Engineer',
      url: SITE_URL,
      email: 'mailto:contact@albertoperez.dev',
      sameAs: ['https://www.linkedin.com/in/alberto-p%C3%A9rez-garc%C3%ADa-902880158'],
      knowsAbout: [
        'Angular',
        'TypeScript',
        'Microfrontends',
        'Frontend Architecture',
        'Node.js',
        'REST APIs',
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      name: 'Alberto Pérez García',
      url: `${SITE_URL}/`,
      inLanguage: 'es',
      author: { '@id': PERSON_ID },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      name: 'Alberto Pérez | Senior Angular & Frontend Engineer',
      url: `${SITE_URL}/`,
      inLanguage: 'es',
      isPartOf: { '@id': WEBSITE_ID },
      mainEntity: { '@id': PERSON_ID },
    },
  ],
};

export const PROJECT_SEO: SeoMetadata = {
  title: 'La Casa de los Juegos | Proyecto Full Stack de Alberto Pérez',
  description:
    'Plataforma de comercio electrónico desarrollada por Alberto Pérez con catálogo, carrito, usuarios, pedidos, panel de administración y soporte multidioma.',
  canonicalPath: '/proyectos/la-casa-de-los-juegos',
  imageAlt: 'Proyecto La Casa de los Juegos desarrollado por Alberto Pérez',
  structuredData: [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'La Casa de los Juegos',
      description:
        'Plataforma de comercio electrónico con catálogo, carrito, usuarios, pedidos, panel de administración y soporte multidioma.',
      url: 'https://www.lacasadelosjuegos.com/es',
      applicationCategory: 'BusinessApplication',
      author: { '@id': PERSON_ID },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE_URL}/` },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'La Casa de los Juegos',
          item: `${SITE_URL}/proyectos/la-casa-de-los-juegos`,
        },
      ],
    },
  ],
};

export const PRIVACY_SEO: SeoMetadata = {
  title: 'Política de privacidad | Alberto Pérez',
  description:
    'Información sobre el tratamiento y la protección de los datos enviados a través del portfolio profesional de Alberto Pérez García.',
  canonicalPath: '/privacidad',
  structuredData: [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE_URL}/` },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Política de privacidad',
          item: `${SITE_URL}/privacidad`,
        },
      ],
    },
  ],
};

export const NOT_FOUND_SEO: SeoMetadata = {
  title: 'Página no encontrada | Alberto Pérez',
  description: 'La página solicitada no existe o ya no está disponible.',
  canonicalPath: '/404',
  robots: 'noindex, nofollow',
};
