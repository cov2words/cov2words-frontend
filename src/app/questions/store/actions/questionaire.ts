import { Action } from '@ngrx/store';
import { Questionaire, Question } from "../../questions.model"
import { CategoryActions } from "./category"
import { QuestionsActions } from "./question"
import { StatementsActions } from "./statement"

export enum QuestionaireActionType {
  GET_QUESTIONAIRE = "GET_QUESTIONAIRE",
  GET_QUESTIONAIRE_SUCCESS = "GET_QUESTIONAIRE_SUCCESS",
  GET_QUESTIONAIRE_FAILURE = "GET_QUESTIONAIRE_FAILURE",
  SET_QUESTIONAIRE = "SET_QUESTIONAIRE",
  SET_QUESTIONAIRE_SUCCESS = "SET_QUESTIONAIRE_SUCCESS",
  SET_QUESTIONAIRE_FAILURE = "SET_QUESTIONAIRE_FAILURE",
  CHANGE_QUESTIONAIRE_NAME = "CHANGE_QUESTIONAIRE_NAME",
  CREATE_QUESTIONAIRE = "CREATE_QUESTIONAIRE"
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

export class SetQuestionaire implements Action {
  readonly type = QuestionaireActionType.SET_QUESTIONAIRE
  constructor(public payload: {questionaire: string, questions: Array<Question>, statements: any}) {}
}

export class SetQuestionaireSuccess implements Action {
  readonly type = QuestionaireActionType.SET_QUESTIONAIRE_SUCCESS
  constructor(public payload: string) {}
}

export class SetQuestionaireFailure implements Action {
  readonly type = QuestionaireActionType.SET_QUESTIONAIRE_FAILURE
  constructor(public payload: string) {}
}

export class ChangeQuestionaireName implements Action {
  readonly type = QuestionaireActionType.CHANGE_QUESTIONAIRE_NAME
  constructor(public payload: {name: string}) {}
}

export class CreateQuestionaire implements Action {
  readonly type = QuestionaireActionType.CREATE_QUESTIONAIRE
  constructor(public payload: {name: string, owner: string, uuid: string}) {}
}

export type QuestionaireActions = 
  GetQuestionaire |
  GetQuestionaireSuccess |
  GetQuestionaireFailure |
  SetQuestionaire |
  SetQuestionaireSuccess |
  SetQuestionaireFailure |
  ChangeQuestionaireName |
  CreateQuestionaire |
  CategoryActions |
  QuestionsActions |
  StatementsActions