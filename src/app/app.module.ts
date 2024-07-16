import { CUSTOM_ELEMENTS_SCHEMA, importProvidersFrom, LOCALE_ID, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

import {
  HttpClientModule,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { AngularMaterialModule } from './common/angular-material.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { registerLocaleData } from '@angular/common';
import localeVi from '@angular/common/locales/vi';
registerLocaleData(localeVi, 'vi-VN');
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CartComponent } from './components/layout/cart/cart.component';
@NgModule({
  declarations: [
    LoginComponent,
    AppComponent,
    CartComponent,
  ],
  exports: [
    AngularMaterialModule,
    CommonModule
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    AngularMaterialModule,
    SlickCarouselModule,
    FormsModule,
  ],
  
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
      
    },
    importProvidersFrom(
      BrowserAnimationsModule
    ),
    { provide: LOCALE_ID, useValue: 'vi-VN' }
  ],
  bootstrap: [
    AppComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class AppModule { }
