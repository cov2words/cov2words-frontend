import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {NgSelectModule} from '@ng-select/ng-select';
import {QRCodeModule} from 'angularx-qrcode';

import {HomePage} from './home.page';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        NgSelectModule,
        QRCodeModule,
        RouterModule.forChild([
            {
                path: '',
                component: HomePage
            }
        ]),
        TranslateModule.forChild(),
    ],
    declarations: [HomePage]
})
export class HomePageModule {
}
