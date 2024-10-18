import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { environment } from './environment/environment';
import { ENVIRONMENT } from './environment/environment.config';

export const appConfig: ApplicationConfig = {
    providers: [
        provideExperimentalZonelessChangeDetection(),
        provideHttpClient(),
        provideRouter(routes),
        {provide: ENVIRONMENT, useValue: environment},
    ],
};
