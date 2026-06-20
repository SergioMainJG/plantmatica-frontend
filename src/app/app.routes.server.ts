import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'fichas',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'session',
    renderMode: RenderMode.Server,
  },
  {
    path: 'session/login',
    renderMode: RenderMode.Server
  },
  {
    path: 'session/signup',
    renderMode: RenderMode.Server
  },
  {
    path: 'admin',
    renderMode: RenderMode.Server
  },
  {
    path: 'user',
    renderMode: RenderMode.Server
  }
];