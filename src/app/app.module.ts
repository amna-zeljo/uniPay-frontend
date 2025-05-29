import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { AppComponent } from './app.component';
import { routes } from './app.routes';

@NgModule({
  declarations: [
    //this is empty since AppComponent is standalone
  ],
  imports: [
    BrowserModule,
    AppComponent //i will import the standalone component
  ],
  providers: [
    provideHttpClient(),
    provideRouter(routes)
  ],
  bootstrap: [AppComponent] //attempted to fix: this is still needed
})
export class AppModule {}
