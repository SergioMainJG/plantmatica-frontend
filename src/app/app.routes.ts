import { Routes } from '@angular/router';
import Homepage from './homepage/homepage';
import Cards from './cards/cards';
import Admin from './admin/admin';
import User from './user/user';
import SessionRoutes from './session/session.routes';

export const routes: Routes = [
  {
    path: '',
    component: Homepage,
  },
  {
    path: 'fichas',
    loadComponent: () => Cards,
  },
  {
    path: 'session',
    loadChildren: () => SessionRoutes,
  },
  {
    path: 'admin',
    loadComponent: () => Admin
  },
  {
    path: 'user',
    loadComponent: () => User
  }
];
