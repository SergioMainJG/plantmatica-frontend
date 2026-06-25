import { Routes } from '@angular/router';
import Homepage from './homepage/homepage';
import Cards from './cards/cards';
import Admin from './admin/admin';
import User from './user/user';
import Login from './session/login/login';
import Signup from './session/signup/signup';

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
    path: 'login',
    loadComponent: () => Login,
  },
  {
    path: 'signup',
    loadComponent: () => Signup,
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
