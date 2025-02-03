import {ApplicationConfig, importProvidersFrom, LOCALE_ID} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {BrowserModule, provideClientHydration} from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {DatePipe, registerLocaleData} from "@angular/common";
import localeFr from '@angular/common/locales/fr';


registerLocaleData(localeFr, 'fr-FR');

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    importProvidersFrom([BrowserModule, BrowserAnimationsModule, HttpClientModule]),
    {provide: LOCALE_ID, useValue: 'fr-FR'},
    {provide: DatePipe, useClass: DatePipe}
  ]
};
