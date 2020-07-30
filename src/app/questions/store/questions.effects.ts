import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { QuestionsService } from '../questions.service'
import {
  FirebaseActionType,
  /* GetQuestionairesSuccess,
  GetQuestionairesFailure, */
  GetQuestionaireSuccess,
  GetQuestionaireFailure,
  SetQuestionaireSuccess,
  SetQuestionaireFailure,
} from './actions/firebase'
import { GetQuestionairesSuccess, GetQuestionairesFailure } from './actions/questionaires'
//import {} from "./actions/questionaire"

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
    ofType(FirebaseActionType.GET_QUESTIONAIRES),
    switchMap((action) => {
      let { payload: {email} } = action
      return this.questionsService.getQuestionaires(email).pipe(
        map((questionaires: Array<Questionaire>) => new GetQuestionairesSuccess(questionaires)),
        catchError(error => of(new GetQuestionairesFailure(error)))
      )
    })
  )

  @Effect()
  getQuestionaire$ = this.actions$.pipe(
    ofType(FirebaseActionType.GET_QUESTIONAIRE),
    switchMap((action) => {
      let { payload: {questionaireUUID} } = action
      return this.questionsService.getQuestionaire(questionaireUUID).pipe(
        map((questionaire: Questionaire) => new GetQuestionaireSuccess({questionaire})),
        catchError(error => of(new GetQuestionaireFailure(error)))
      )
    })
  )

  @Effect()
  setQuestionaire$ = this.actions$.pipe(
    ofType(FirebaseActionType.SET_QUESTIONAIRE),
    switchMap((action) => {
      let { payload: { questionaire, questions, statements } } = action
      return from(this.questionsService.setQuestionaire(questionaire, questions, statements)).pipe(
        map(() => new SetQuestionaireSuccess('save success')),
        catchError(error => of(new SetQuestionaireFailure(error)))
      )
    })
  )

}
