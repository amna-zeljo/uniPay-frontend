import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { CustomerHomeComponent } from './components/customer-home/customer-home.component';
import {provideHttpClient} from '@angular/common/http';

const routes: Routes = [
    {path: '', component: CustomerHomeComponent}
]

@NgModule({

  imports: [
    BrowserModule,
    FormsModule,
    AppComponent,
    RouterModule.forRoot(routes),
    CustomerHomeComponent
  ],
  providers: [
    provideHttpClient()
  ]
})
export class AppModule { }
