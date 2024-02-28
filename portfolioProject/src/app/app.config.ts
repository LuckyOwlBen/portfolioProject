import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch, withInterceptors, withNoXsrfProtection } from '@angular/common/http';
import { AuthInterceptor } from './api-services/auth-interceptor/auth-interceptor.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch(), withNoXsrfProtection(), withInterceptors([AuthInterceptor])),
  ]
};
