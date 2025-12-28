import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './core/interceptor/token.interceptor';
import { provideTanStackQuery, QueryClient } from '@tanstack/angular-query-experimental';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    provideHttpClient(
      withInterceptors([tokenInterceptor])
    ),

    { provide: LOCALE_ID, useValue: 'pt-PT' },

    provideTanStackQuery(new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 5 * 60 * 1000,   // Áreas
          //cacheTime: 10 * 60 * 1000,  // Áreas ficam na RAM 10 min após stale
          refetchOnWindowFocus: true,
          refetchOnReconnect: true,
          retry: 1,
          refetchInterval: false,      // só ativa polling específico quando necessário
        },
      },
    }))
  ]


};
