import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideFileRouter } from '@analogjs/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { UserEffects } from './shared/store/user/user.effects';
import { userReducer } from './shared/store/user/user.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    provideFileRouter(),
    provideHttpClient(),
    provideClientHydration(),
    provideStore({ users: userReducer }),
    provideStoreDevtools(),
    provideEffects([UserEffects]),
  ],
};
