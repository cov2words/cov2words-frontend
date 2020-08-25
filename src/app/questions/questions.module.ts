import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {AngularFireFunctionsModule} from '@angular/fire/functions';

import {QuestionsPage} from './questions.page';
import {QuestionComponent} from "./components/question/question.component"
import {ControlComponent} from "./components/control/control.component"
import { CreateQuestionaireModal } from "./components/control/createquestionaire.modal"
import {AddQuestionModal} from "./components/control/addquestion.modal"
import { EditCategoriesModal } from "./components/control/editcategories.modal"
import { AWSConnectModal } from "./components/control/awsconnect.modal"
import { HelpModal } from "./components/control/help.modal"
import { EditModal } from "./components/question/edit.modal"
import {TranslateModule} from "@ngx-translate/core";
import { StatementCatalog } from "./components/statement/statement.catalog"
import { StatementComponent } from './components/statement/statement.component';
import { ConditionComponent } from './components/statement/condition.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild([
            {
                path: '',
                component: QuestionsPage
            }
        ]),
        TranslateModule.forChild(),
        AngularFireFunctionsModule
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
      AWSConnectModal,
      HelpModal,
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
      AWSConnectModal,
      HelpModal,
      EditCategoriesModal
    ]
})
export class QuestionsPageModule {
}
