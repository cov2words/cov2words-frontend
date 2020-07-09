import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { QuestionsService } from '../questions.service'
import {
  QuestionsActionType,
  GetQuestionsSuccess,
  GetQuestionsFailure,
  /* SetQuestionsSuccess,
  SetQuestionsFailure, */
} from './questions.actions'
import { switchMap, catchError, map } from 'rxjs/operators'
import { of } from 'rxjs'

import { Question } from '../questions.model'

@Injectable()
export class QuestionsEffects {

  constructor(
    private actions$: Actions,
    private questionsService: QuestionsService
  ) { }

  @Effect()
  getQuestions$ = this.actions$.pipe(
    ofType(QuestionsActionType.GET_QUESTIONS),
    switchMap((action) => {
      let { payload } = action
      return this.questionsService.getQuestions(payload).pipe(
        map((questions: Array<Question>) => new GetQuestionsSuccess(questions)),
        catchError(error => of(new GetQuestionsFailure(error)))
      )
    }
      
    )
  )

  @Effect()
  setQuestions$ = this.actions$.pipe(
    ofType(QuestionsActionType.SET_QUESTIONS),
    switchMap((action) => {
      let { payload: { questionaire, questions} } = action
      return this.questionsService.setQuestions(questionaire, questions)
    })
  )

}
