import {Component, OnInit, ViewChild} from '@angular/core';
import {NgSelectComponent} from '@ng-select/ng-select';

@Component ({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {

    deferredPrompt: any;
    showInstallBtn: boolean = true;

    public qrCodeContent = '';

    words = [
        'Apfel',
        'Mandarine',
        'Kuchen'
    ];

    wordCombinationXmlMapping = {
        'ApfelApfel': '<some-xml>',
        'ApfelMandarine': '<other-xml>',
        'ApfelKuchen': '<xxx>',
        'MandarineApfel': '<yyy>',
        'MandarineMandarine': '<adssd>',
        'MandarineKuchen': '<sdasdsa>',
        'KuchenApfel': '<addasd>',
        'KuchenMandarine': '<adasdsd>',
        'KuchenKuchen': '<saddfasdsadad>'
    };

    @ViewChild ('select1', {static: false}) select1: NgSelectComponent;
    @ViewChild ('select2', {static: false}) select2: NgSelectComponent;

    public word1 = null;
    public word2 = null;

    constructor () {
        window.addEventListener ('beforeinstallprompt', (e) => {
            console.log ('beforeinstallprompt Event fired');
            // Prevent Chrome 67 and earlier from automatically showing the prompt
            e.preventDefault ();
            // Stash the event so it can be triggered later.
            this.deferredPrompt = e;
            this.showInstallBtn = true;
        });
    }

    ngOnInit () {
        if (this.deferredPrompt === undefined) {
            this.showInstallBtn = false;
        }
    }

    showInstallBanner () {
        if (this.deferredPrompt !== undefined && this.deferredPrompt !== null) {
            // Show the prompt
            this.deferredPrompt.prompt ();
            // Wait for the user to respond to the prompt
            this.deferredPrompt.userChoice
                .then ((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                        console.log ('User accepted the A2HS prompt');
                    } else {
                        console.log ('User dismissed the A2HS prompt');
                    }
                    // We no longer need the prompt.  Clear it up.
                    this.deferredPrompt = null;
                });
        }
    }

    public onWord1Changed (): void {
        this.select2.focus ();
        this.updateQr ();
    }

    public onWord2Changed (): void {
        this.updateQr ();
    }

    private updateQr (): void {
        if (this.word1 === null || this.word2 === null) {
            return;
        }
        this.qrCodeContent = this.wordCombinationXmlMapping[this.word1 + this.word2];
    }

}
