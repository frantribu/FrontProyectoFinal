import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import localeEsAr from '@angular/common/locales/es-AR';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeEsAr);

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
