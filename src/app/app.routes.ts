import { Routes } from '@angular/router';
import { CustomerHomeComponent } from './components/customer-home/customer-home.component';
import { CustomerTopupComponent } from './components/customer-topup/customer-topup.component';
import { StaffHomeComponent } from './components/staff-home/staff-home.component';
import {LandingPageComponent} from "./components/landing-page/landing-page.component";
import {SignUpPageComponent} from "./components/signup-page/signup-page.component";
import {MenuComponent} from "./components/menu-page/menu-page.component";



export const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'staff', component: StaffHomeComponent }
  { path: 'customer', component: CustomerHomeComponent },
    { path: 'customer/topup', component: CustomerTopupComponent },
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
