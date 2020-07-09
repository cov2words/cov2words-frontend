import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {IonicModule} from '@ionic/angular';

import { StoreModule, ActionReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { storeLogger } from 'ngrx-store-logger';
import { questionsReducer, undoable } from "./store/questions.reducer"
import { QuestionsEffects } from "./store/questions.effects"
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import {QuestionsPage} from './questions.page';
import {QuestionComponent} from "./components/question/question.component"
import {QuestionOption} from "./components/option/question.option"
import {QuestionNext} from "./components/next/question.next"
import {ControlComponent} from "./components/control/control.component"
import {TranslateModule} from "@ngx-translate/core";

export function logger(reducer: ActionReducer<any>): any {
  return storeLogger()(reducer);
}

export const metaReducers = [logger];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        StoreModule.forRoot({}),
        //StoreModule.forFeature('questions', questionsReducer, {metaReducers}),
        StoreModule.forFeature('questions', undoable(questionsReducer), { metaReducers }),
        StoreDevtoolsModule.instrument({
          maxAge: 25 // Retains last 25 states
        }),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([QuestionsEffects]),
        RouterModule.forChild([
            {
                path: '',
                component: QuestionsPage
            }
        ]),
        TranslateModule.forChild()
    ],
    declarations: [
      QuestionsPage,
      QuestionComponent,
      QuestionOption,
      QuestionNext,
      ControlComponent
    ],
    exports: [
      QuestionComponent,
      QuestionOption,
      QuestionNext,
      ControlComponent
    ]
})
export class QuestionsPageModule {
}
