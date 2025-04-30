import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { NgxSpinnerModule } from "ngx-spinner";
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors ,HttpClient} from '@angular/common/http';
import {BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations'
import { provideToastr } from 'ngx-toastr';
import { authInterceptor } from './core/interceptor/auth.interceptor';
import { loadingInterceptor } from './core/interceptor/loading.interceptor';
import { catchErrorInterceptor } from './core/interceptor/catch-error.interceptor';
 import { TranslateHttpLoader } from '@ngx-translate/http-loader';
 import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

 export function HttpLoaderFactory(http: HttpClient) {
   return new TranslateHttpLoader(http, '/i18n/', '.json');
 }
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes),
     provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch(),withInterceptors([authInterceptor,loadingInterceptor,catchErrorInterceptor])),
    importProvidersFrom(BrowserAnimationsModule,NgxSpinnerModule,TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }) ),
    provideToastr(),
    
    
    ]
};
