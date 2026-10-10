import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Header } from './components/header/header';
import { LogIn } from './components/log-in/log-in';
import { SignUp } from './components/sign-up/sign-up';
import { PageNotFound } from './components/page-not-found/page-not-found';
import { Menu } from './components/menu/menu';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: LogIn },
  { path: 'signup', component: SignUp },
  { path: 'header', component: Header },
  { path: 'menu', component: Menu },
  { path: '**', component: PageNotFound },
];
