import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
} from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import {
  getAnalytics,
  provideAnalytics,
  ScreenTrackingService,
  UserTrackingService,
} from '@angular/fire/analytics';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { SETTINGS as AUTH_SETTINGS } from '@angular/fire/compat/auth';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideQuillConfig } from 'ngx-quill/config';
import { TOOLBAR } from './services/blogs';
import { articleInterceptor } from './utilities/article.interceptor';
import { provideStore } from '@ngrx/store';
import { userReducer } from './store/userData.reducer';
import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding(), withInMemoryScrolling({ scrollPositionRestoration: 'top' })),
    provideFirebaseApp(() => initializeApp({
        projectId: 'sumanth-article-publishing',
        appId: '1:706459179395:web:49b792b0df61bbab90feb6',
        databaseURL: 'https://sumanth-article-publishing-default-rtdb.asia-southeast1.firebasedatabase.app',
        storageBucket: 'sumanth-article-publishing.appspot.com',
        apiKey: 'AIzaSyBOx93nJBARMmyrnSK6LOGIY7lUhIEfvVw',
        authDomain: 'sumanth-article-publishing.firebaseapp.com',
        messagingSenderId: '706459179395',
        measurementId: 'G-W53E4QHKT3',
    })),
    provideAuth(() => getAuth()),
    provideAnalytics(() => getAnalytics()),
    ScreenTrackingService,
    UserTrackingService,
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideAnimations(),
    provideHttpClient(withFetch(), withInterceptors([articleInterceptor])),
    provideQuillConfig({
        modules: {
            syntax: false,
            toolbar: TOOLBAR,
        },
    }),
    provideStore({loggedUser:userReducer}),
],
};
