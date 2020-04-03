import {ChangeDetectorRef, Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {TranslateService} from "@ngx-translate/core";
import {WordService} from "./extlib/cov2words-client-js/cov2words_client_js/rest_services/word.service";
import {LanguageResponse} from "./extlib/cov2words-client-js/cov2words_client_js/model/language.response";
import {Cov2WordsService} from "./app.service";
import {WordListRequest} from "./extlib/cov2words-client-js/cov2words_client_js/model/wordlist.request";

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

    public selectedLanguage;
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
        });
    }

    ngOnInit() {
        let userLanguage: string = navigator.language;
        userLanguage = userLanguage.substr(0, 2);

        this._wordService.getAvailableLanguages()
            .then((res: LanguageResponse) => {
                if (res.languages.some(x => x === userLanguage)) {
                    this._translateService.setDefaultLang(userLanguage);
                } else {
                    this._translateService.setDefaultLang(res.languages[0]);
                }
                this._prepareLanguageSelection(res);
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

        if (this.languages.some(lang => lang.key === this._translateService.getDefaultLang())) {
            this._handleLanguage(this._translateService.getDefaultLang());
        } else {
            this._handleLanguage(this.languages[0].key);
        }
    }

    public onChangeValue(value) {
        this._handleLanguage(value.detail.value);
    }

    private _handleLanguage(language: string) {
        this.selectedLanguage = language;
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
