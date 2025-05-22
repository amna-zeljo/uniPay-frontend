import { Routes } from '@angular/router';
import { CustomerHomeComponent } from './components/customer-home/customer-home.component';
import { CustomerTopupComponent } from './components/customer-topup/customer-topup.component';
import { StaffHomeComponent } from './components/staff-home/staff-home.component';

export const routes: Routes = [
  { path: '', redirectTo: 'customer', pathMatch: 'full' },
  { path: 'customer', component: CustomerHomeComponent },
  { path: 'customer/topup', component: CustomerTopupComponent },
  { path: 'staff', component: StaffHomeComponent }
];