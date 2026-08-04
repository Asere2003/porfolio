import {
  Experience,
  Project,
  Service,
  SocialLink,
  TechnologyGroup,
} from '../core/models/portfolio.models';
export const SERVICES: readonly Service[] = [
  {
    title: 'Desarrollo Angular',
    icon: '◫',
    description:
      'Aplicaciones rápidas, accesibles y mantenibles, diseñadas para crecer con tu negocio.',
    technologies: ['Angular', 'TypeScript', 'RxJS'],
  },
  {
    title: 'Arquitectura frontend',
    icon: '◇',
    description:
      'Decisiones técnicas, patrones y sistemas de diseño que reducen riesgo y deuda técnica.',
    technologies: ['Arquitectura', 'Design Systems'],
  },
  {
    title: 'Microfrontends',
    icon: '⌘',
    description: 'Equipos y dominios desacoplados sin perder consistencia ni rendimiento.',
    technologies: ['Microfrontends', 'Module Federation'],
  },
  {
    title: 'Integración de APIs REST',
    icon: '↔',
    description: 'Integraciones robustas, tipadas y observables con servicios corporativos.',
    technologies: ['REST APIs', 'HttpClient'],
  },
  {
    title: 'Optimización y refactorización',
    icon: '↗',
    description:
      'Modernización gradual de productos legacy para recuperar velocidad y estabilidad.',
    technologies: ['Performance', 'Testing'],
  },
  {
    title: 'Full Stack Support',
    icon: '⌁',
    description:
      'Apoyo backend pragmático para entregar funcionalidades completas de extremo a extremo.',
    technologies: ['Node.js', 'Express'],
  },
  {
    title: 'Consultoría técnica frontend',
    icon: '◎',
    description: 'Auditorías y acompañamiento técnico con recomendaciones accionables.',
    technologies: ['Auditoría', 'Mentoring'],
  },
];
export const EXPERIENCES: readonly Experience[] = [
  {
    company: 'Banco Santander',
    title: 'Modernización de aplicación bancaria mediante microfrontend Angular',
    description:
      'Diseño y desarrollo desde cero de un microfrontend con Angular para modernizar una aplicación legacy basada en COBOL. Arquitectura frontend e interfaz tipo hoja de cálculo para grandes volúmenes de información, importación y validación de Excel, CSV y Word, tablas avanzadas, búsquedas, filtros, ordenación e informes para usuarios internos.',
    technologies: ['Angular', 'TypeScript', 'Microfrontends', 'REST APIs', 'Enterprise Frontend'],
  },
  {
    company: 'Endesa Energía',
    title: 'Aplicaciones corporativas del sector energético',
    description:
      'Desarrollo y evolución de aplicaciones corporativas: nuevas funcionalidades, integración con servicios internos, optimización del rendimiento, resolución de incidencias y mantenimiento de soluciones en producción.',
    technologies: ['Angular', 'REST APIs', 'Enterprise'],
  },
  {
    company: 'ATM',
    title: 'Producto de movilidad Core + Overrides',
    description:
      'Desarrollo y evolución de un producto de movilidad con Vue.js. Un núcleo común aportaba la funcionalidad principal y cada provincia podía incorporar módulos, estilos y configuración sin afectar a otros despliegues.',
    technologies: ['Vue.js', 'Core + Overrides', 'Frontend Architecture'],
  },
  {
    company: 'ATMV',
    title: 'Nueva generación de plataforma de movilidad',
    description:
      'Desarrollo desde cero con Angular: arquitectura frontend, búsqueda geográfica, planificación de rutas, paradas, estaciones, líneas y puntos de interés, con APIs REST, mapas y personalización por operador.',
    technologies: ['Angular', 'TypeScript', 'Maps & Geolocation', 'REST APIs'],
  },
];
export const PROJECTS: readonly Project[] = [
  {
    slug: 'la-casa-de-los-juegos',
    title: 'La Casa de los Juegos',
    sector: 'E-commerce · Proyecto propio',
    ownProject: true,
    publicUrl: 'https://www.lacasadelosjuegos.com/es',
    description:
      'Diseño y desarrollo integral de una plataforma de comercio electrónico especializada en juegos de mesa. Incluye catálogo, búsqueda, fichas, carrito, usuarios, multidioma, pedidos, correos automáticos, administración y despliegue. El pago funciona como demostración y no procesa transacciones reales.',
    technologies: ['Next.js 14', 'TypeScript', 'Supabase', 'Stripe', 'i18n', 'Full Stack'],
    features: [
      'Catálogo y búsqueda',
      'Carrito y pedidos',
      'Gestión de usuarios',
      'Panel de administración',
      'Soporte multidioma',
      'Correos automáticos',
    ],
  },
];
export const TECHNOLOGIES: readonly TechnologyGroup[] = [
  {
    name: 'Frontend',
    technologies: ['Angular', 'TypeScript', 'JavaScript', 'RxJS', 'Vue.js', 'React', 'Next.js'],
  },
  {
    name: 'UI',
    technologies: ['HTML5', 'CSS3', 'SCSS', 'Tailwind', 'Bootstrap', 'Angular Material'],
  },
  { name: 'Backend', technologies: ['Node.js', 'Express', 'REST APIs', 'MySQL', 'Java', 'C#'] },
  {
    name: 'Tooling & Testing',
    technologies: ['Git', 'Vite', 'Webpack', 'Jest', 'Jasmine', 'Cypress'],
  },
];
export const SOCIAL_LINKS: readonly SocialLink[] = [
  {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/alberto-p%C3%A9rez-garc%C3%ADa-902880158',
  },
];
