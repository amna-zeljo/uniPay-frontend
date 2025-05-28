import { Routes } from '@angular/router';
import {LandingPageComponent} from "./components/landing-page/landing-page.component";
import {SignUpPageComponent} from "./components/signup-page/signup-page.component";
import {MenuComponent} from "./components/menu-page/menu-page.component";



export const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  {
    path: 'staff',
    loadComponent: () => import('./components/staff-home/staff-home.component').then(m => m.StaffHomeComponent)
  },
  {
    path: 'customer',
    loadComponent: () => import('./components/customer-home/customer-home.component').then(m => m.CustomerHomeComponent)
  },
  {
    path: 'landing',
    component: LandingPageComponent
  },
  {
    path: 'register',
    component: SignUpPageComponent
  },
  {
    path: 'menuItems',
    component: MenuComponent
  },
  {
    path: 'login',
    loadComponent: () => import('./components/login-page/login-page.component').then(m => m.LoginPageComponent)
  },
  { path: '**', redirectTo: '/landing' }

];
