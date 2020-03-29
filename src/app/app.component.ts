import {ChangeDetectorRef, Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {TranslateService} from "@ngx-translate/core";
import {WordService} from "./extlib/originstamp-client-js/originstamp_client_js/rest_services/word.service";
import {LanguageResponse} from "./extlib/originstamp-client-js/originstamp_client_js/model/language.response";
import {Cov2WordsService} from "./app.service";
import {WordListRequest} from "./extlib/originstamp-client-js/originstamp_client_js/model/wordlist.request";

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    public appPages = [
        {
            title: 'Home',
            url: '/',
            icon: 'home'
        }
    ];

    private _translations = ["en", "de", "es", "fr", "it", "nl", "pl", "pt", "ru"];
    public languages = [];

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private _translateService: TranslateService,
        private _wordService: WordService,
        private _cov2WordsService: Cov2WordsService,
        private _changeDetectorRef: ChangeDetectorRef
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            this._wordService.getAvailableLanguages()
                .then((res: LanguageResponse) => this._prepareLanguageSelection(res));
        });
    }

    private _prepareLanguageSelection(res: LanguageResponse) {
        const translations: string[] = this._translations;
        const languages: any[] = this.languages;

        res.languages.forEach(function (value) {
            if (translations.some(lang => lang === value)) {
                languages.push({
                    translation: "language_" + value,
                    key: value
                });
            }
        });

        if (this.languages.some(lang => lang.key === "en")) {
            this._handleLanguage("en");
        } else {
            this._handleLanguage(this.languages[0].key);
        }
    }

    public onChangeValue(value) {
        this._handleLanguage(value.detail.value);
    }

    private _handleLanguage(language: string) {
        console.log("language: " + language);
        this._translateService.use(language);
        this._loadWordList(language);
    }

    private _loadWordList(language: string) {
        this._wordService.getAvailableWordsForLanguage(
            new WordListRequest(language)
        ).then(res => {
            this._cov2WordsService.setWordList(res);
            this._changeDetectorRef.detectChanges();
        });
    }
}
