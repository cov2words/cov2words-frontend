import { Action } from '@ngrx/store';
import { Questionaire } from "../../questions.model"

export enum QuestionairesActionType {
  GET_QUESTIONAIRES = "GET_QUESTIONAIRES",
  GET_QUESTIONAIRES_SUCCESS = "GET_QUESTIONAIRES_SUCCESS",
  GET_QUESTIONAIRES_FAILURE = "GET_QUESTIONAIRES_FAILURE"
}

export class GetQuestionaires implements Action {
  readonly type = QuestionairesActionType.GET_QUESTIONAIRES
  constructor(public payload: {email: string}) {}
}

export class GetQuestionairesSuccess implements Action {
  readonly type = QuestionairesActionType.GET_QUESTIONAIRES_SUCCESS
  constructor(public payload:  Questionaire[]) {}
}

export class GetQuestionairesFailure implements Action {
  readonly type = QuestionairesActionType.GET_QUESTIONAIRES_FAILURE
  constructor(public payload: string) {}
}

export type QuestionairesActions = GetQuestionaires | GetQuestionairesSuccess | GetQuestionairesFailure