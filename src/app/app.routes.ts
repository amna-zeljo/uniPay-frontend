import { Routes } from '@angular/router';



export const routes: Routes = [
  { path: '', redirectTo: '/customer', pathMatch: 'full' },
  {
    path: 'staff',
    loadComponent: () => import('./components/staff-home/staff-home.component').then(m => m.StaffHomeComponent)
  },
  {
    path: 'customer',
    loadComponent: () => import('./components/customer-home/customer-home.component').then(m => m.CustomerHomeComponent)
  },
  { path: '**', redirectTo: '/customer' }

];
