import { Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: '',
    title: 'Alberto Pérez | Senior Angular & Frontend Engineer',
    loadComponent: () => import('./features/home/home').then((m) => m.Home),
  },
  {
    path: 'proyectos/la-casa-de-los-juegos',
    loadComponent: () => import('./features/projects/project-detail').then((m) => m.ProjectDetail),
  },
  {
    path: 'privacidad',
    title: 'Privacidad | Alberto Pérez',
    loadComponent: () => import('./features/legal/privacy').then((m) => m.Privacy),
  },
  {
    path: '**',
    title: 'Página no encontrada | Alberto Pérez',
    loadComponent: () => import('./features/not-found/not-found').then((m) => m.NotFound),
  },
];
