import { Routes } from '@angular/router';
import Homepage from './homepage/homepage';
import Cards from './cards/cards';
import Session from './session/session';
import Admin from './admin/admin';
import User from './user/user';

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
    loadComponent: () => Session,
    // canActivate:
    // canMatch
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
