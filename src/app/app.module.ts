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
import {OriginStampClientJSModule} from "./extlib/originstamp-client-js/originstamp_client_js/originstamp_client_js.module";
import {ApplicationEnvironment} from "./extlib/originstamp-client-js/originstamp_client_js/config/application-environment.service";
import {WebEnvironment} from "./helper/web-environment.type";
import {Cov2WordsService} from "./app.service";

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        HttpClientModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        OriginStampClientJSModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        })
    ],
    providers: [
        StatusBar,
        SplashScreen,
        Cov2WordsService,
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
