import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Cov2WordsService} from "../app.service";
import {WordService} from "../extlib/originstamp-client-js/originstamp_client_js/rest_services/word.service";
import {WordListResponse} from "../extlib/originstamp-client-js/originstamp_client_js/model/wordlist.response";
import {AnswerRequest} from "../extlib/originstamp-client-js/originstamp_client_js/model/answer.request";
import {WordRequest} from "../extlib/originstamp-client-js/originstamp_client_js/model/word.request";
import {WordPairResponse} from "../extlib/originstamp-client-js/originstamp_client_js/model/word_pair.response";
import {ToastController} from "@ionic/angular";
import {ServiceError} from "../extlib/originstamp-client-js/originstamp_client_js/error_handling/service_error.type";
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['./home.page.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage implements OnInit {

    deferredPrompt: any;
    showInstallBtn: boolean = true;

    public qrCodeContent = '';

    public wordViews: WordView[];

    constructor(
        private _cov2WordsService: Cov2WordsService,
        private _wordService: WordService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _toastController: ToastController,
        private _translateService: TranslateService
    ) {
        window.addEventListener('beforeinstallprompt', (e) => {
            console.log('beforeinstallprompt Event fired');
            // Prevent Chrome 67 and earlier from automatically showing the prompt
            e.preventDefault();
            // Stash the event so it can be triggered later.
            this.deferredPrompt = e;
            this.showInstallBtn = true;
        });
    }

    ngOnInit() {
        if (this.deferredPrompt === undefined) {
            this.showInstallBtn = false;
        }

        this._cov2WordsService.wordList.subscribe((res: WordListResponse) => {
            this._buildWordListView(res);
        });
    }

    private _buildWordListView(response: WordListResponse) {
        let view: WordView[] = [];

        let words: string[] = response.words.sort((n1, n2) => {
            if (n1 > n2) {
                return 1;
            }

            if (n1 < n2) {
                return -1;
            }

            return 0;
        });

        for (let i = 0; i < response.combinations; i++) {
            view.push(
                new WordView(
                    "home.word" + (i + 1),
                    words,
                    response.combinations,
                    null,
                    response.language
                )
            );
        }
        this.wordViews = view;
        this._changeDetectorRef.detectChanges();
    }

    showInstallBanner() {
        if (this.deferredPrompt !== undefined && this.deferredPrompt !== null) {
            // Show the prompt
            this.deferredPrompt.prompt();
            // Wait for the user to respond to the prompt
            this.deferredPrompt.userChoice
                .then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                        console.log('User accepted the A2HS prompt');
                    } else {
                        console.log('User dismissed the A2HS prompt');
                    }
                    // We no longer need the prompt.  Clear it up.
                    this.deferredPrompt = null;
                });
        }
    }

    public onWordChanged(): void {
        if (this.wordViews.filter(view => view.word === null).length > 0) {
            // Not ready yet.
        } else {
            this.updateQr(this.wordViews);
        }
    }

    private updateQr(wordViews: WordView[]): void {
        this.qrCodeContent = null;

        let words: WordRequest[] = [];
        for (let i = 0; i < wordViews.length; i++) {
            words.push(
                new WordRequest(
                    wordViews[i].word,
                    i
                )
            )
        }

        this._wordService.getAnswerForWordPair(
            new AnswerRequest(
                wordViews[0].language,
                words
            )
        )
            .then((res: WordPairResponse) => this._handleResponse(res))
            .catch(err => this._showError(err));
    }

    private _handleResponse(res: WordPairResponse) {
        this.qrCodeContent = res.answer;
    }

    private _showError(err: ServiceError) {
        this._translateService.get(err.errorMessage)
            .subscribe((res: string) => {
                this.presentToast(res);
            });
    }

    async presentToast(message: string) {
        const toast = await this._toastController.create({
            message: message,
            duration: 10000
        });
        toast.present();
    }
}

export class WordView {
    constructor(
        public label: string,
        public items: string[],
        public combinations: number,
        public word: string,
        public language: string
    ) {
    }
}
