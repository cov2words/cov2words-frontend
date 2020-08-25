import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { QuestionsService } from '../questions.service'

import { GetQuestionairesSuccess, GetQuestionairesFailure, QuestionairesActionType } from './actions/questionaires'
import { GetQuestionaireSuccess, GetQuestionaireFailure, SetQuestionaireSuccess, SetQuestionaireFailure, QuestionaireActionType} from "./actions/questionaire"

import { switchMap, catchError, map, filter } from 'rxjs/operators'
import { of, from } from 'rxjs'

import { Questionaire } from '../questions.model'

@Injectable()
export class QuestionsEffects {

  constructor(
    private actions$: Actions,
    private questionsService: QuestionsService
  ) { }

  @Effect()
  getQuestionaires$ = this.actions$.pipe(
    ofType(QuestionairesActionType.GET_QUESTIONAIRES),
    switchMap((action) => {
      let { payload: { email } } = action
      return this.questionsService.getQuestionaires(email).pipe(
        map((questionaires: Array<Questionaire>) => new GetQuestionairesSuccess(questionaires)),
        catchError(error => of(new GetQuestionairesFailure(error)))
      )
    })
  )

  @Effect()
  getQuestionaire$ = this.actions$.pipe(
    ofType(QuestionaireActionType.GET_QUESTIONAIRE),
    switchMap((action) => {
      let { payload: { questionaireUUID } } = action
      return this.questionsService.getQuestionaire(questionaireUUID).pipe(
        map((questionaire: Questionaire) => new GetQuestionaireSuccess({ questionaire })),
        catchError(error => of(new GetQuestionaireFailure(error)))
      )
    })
  )

  @Effect()
  setQuestionaire$ = this.actions$.pipe(
    ofType(QuestionaireActionType.SET_QUESTIONAIRE),
    switchMap((action) => {
      let { payload: { questionaire, questions, statements, conditions } } = action
      console.log("the q", questionaire)
      return from(this.questionsService.setQuestionaire(questionaire, questions, statements, conditions)).pipe(
        map(() => new SetQuestionaireSuccess('save success')),
        catchError(error => of(new SetQuestionaireFailure(error)))
      )
    })
  )

}
