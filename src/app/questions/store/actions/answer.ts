import { Action } from '@ngrx/store'
import { GetQuestionaireSuccess } from "./questionaire"


export enum AnswerActionType {
  CHANGE_ANSWER = "CHANGE_ANSWER"
}

export class ChangeAnswer implements Action {
  readonly type = AnswerActionType.CHANGE_ANSWER
  constructor(public payload: {index: number , answer: any}) {}
}

export type AnswerActions = ChangeAnswer | GetQuestionaireSuccess