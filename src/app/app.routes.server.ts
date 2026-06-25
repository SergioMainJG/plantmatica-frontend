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
    path: 'login',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'signup',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'admin',
    renderMode: RenderMode.Server,
  },
  {
    path: 'user',
    renderMode: RenderMode.Server,
  }
];