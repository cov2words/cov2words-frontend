import {HttpClient, HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {Cov2WordsClientJSModule} from "./extlib/cov2words-client-js/cov2words_client_js/cov2words_client_js.module";
import {ApplicationEnvironment} from "./extlib/cov2words-client-js/cov2words_client_js/config/application-environment.service";
import {WebEnvironment} from "./helper/web-environment.type";
import {Cov2WordsService} from "./app.service";
import {QuestionsService} from "./questions/questions.service"

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth'
import { AngularFireDatabaseModule } from '@angular/fire/database';
import {ENV} from "../environments/environment"
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { StoreModule, ActionReducer } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { QuestionsEffects } from './questions/store/questions.effects';
//import { rootReducer, undoable } from './questions/store/reducers/root';
import undoableRootReducer from "./questions/store/reducers/root";
import { storeLogger } from 'ngrx-store-logger';
import { AuthService } from './auth/auth.service';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function logger(reducer: ActionReducer<any>): any {
  return storeLogger()(reducer);
}

export const metaReducers = [logger];

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        HttpClientModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        AngularFireModule.initializeApp(ENV.firebaseConfig),
        AngularFireAuthModule,
        AngularFireDatabaseModule,
        AngularFirestoreModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('questions', undoableRootReducer, { metaReducers }),
        StoreDevtoolsModule.instrument({
          maxAge: 25 // Retains last 25 states
        }),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([QuestionsEffects]),
        Cov2WordsClientJSModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
    ],
    providers: [
        StatusBar,
        SplashScreen,
        Cov2WordsService,
        QuestionsService,
        //AuthService,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        {
            provide: ApplicationEnvironment,
            useClass: WebEnvironment
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
