import { Action } from '@ngrx/store';
import { Questionaire } from "../../questions.model"
import { CategoryActions } from "./category"

export enum QuestionaireActionType {
  GET_QUESTIONAIRE = "GET_QUESTIONAIRE",
  GET_QUESTIONAIRE_SUCCESS = "GET_QUESTIONAIRE_SUCCESS",
  GET_QUESTIONAIRE_FAILURE = "GET_QUESTIONAIRE_FAILURE"
}

export class GetQuestionaire implements Action {
  readonly type = QuestionaireActionType.GET_QUESTIONAIRE
  constructor(public payload: {questionaireUUID: string}) {}
}

export class GetQuestionaireSuccess implements Action {
  readonly type = QuestionaireActionType.GET_QUESTIONAIRE_SUCCESS
  constructor(public payload: {questionaire: Questionaire}) {}
}

export class GetQuestionaireFailure implements Action {
  readonly type = QuestionaireActionType.GET_QUESTIONAIRE_FAILURE
  constructor(public payload: string) {}
}

export type QuestionaireActions = 
  GetQuestionaire |
  GetQuestionaireSuccess |
  GetQuestionaireFailure |
  CategoryActions