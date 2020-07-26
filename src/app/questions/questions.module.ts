import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {IonicModule} from '@ionic/angular';

import { StoreModule, ActionReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { storeLogger } from 'ngrx-store-logger';
import { rootReducer, undoable } from "./store/reducers/root" //"./store/questions.reducer"
import { QuestionsEffects } from "./store/questions.effects"
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import {QuestionsPage} from './questions.page';
import {QuestionComponent} from "./components/question/question.component"
import {ControlComponent} from "./components/control/control.component"
import { CreateQuestionaireModal } from "./components/control/createquestionaire.modal"
import {AddQuestionModal} from "./components/control/addquestion.modal"
import { EditCategoriesModal } from "./components/control/editcategories.modal"
import { EditModal } from "./components/question/edit.modal"
import {TranslateModule} from "@ngx-translate/core";
import { StatementCatalog } from "./components/statement/statement.catalog"
import { StatementComponent } from './components/statement/statement.component';
import { ConditionComponent } from './components/statement/condition.component';


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
        StoreModule.forFeature('questions', undoable(rootReducer), { metaReducers }),
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
      ControlComponent,
      StatementComponent,
      StatementCatalog,
      ConditionComponent,
      CreateQuestionaireModal,
      AddQuestionModal,
      EditModal,
      EditCategoriesModal
    ],
    exports: [
      QuestionComponent,
      ControlComponent,
      StatementComponent,
      StatementCatalog,
      ConditionComponent
    ],
    entryComponents: [
      CreateQuestionaireModal,
      AddQuestionModal,
      EditModal,
      EditCategoriesModal
    ]
})
export class QuestionsPageModule {
}
