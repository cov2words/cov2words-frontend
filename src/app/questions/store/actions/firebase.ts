import { Action, State } from '@ngrx/store';
import { Questionaire, Question } from "../../questions.model"

export interface CustomAction extends Action {
  type: string;
  payload?: any;
}

export enum FirebaseActionType {
  GET_QUESTIONAIRES = "GET_QUESTIONAIRES",
  GET_QUESTIONAIRES_SUCCESS = "GET_QUESTIONAIRES_SUCCESS",
  GET_QUESTIONAIRES_FAILURE = "GET_QUESTIONAIRES_FAILURE",
  GET_QUESTIONAIRE = "GET_QUESTIONAIRE",
  GET_QUESTIONAIRE_SUCCESS = "GET_QUESTIONAIRE_SUCCESS",
  GET_QUESTIONAIRE_FAILURE = "GET_QUESTIONAIRE_FAILURE",
  SET_QUESTIONAIRE = "SET_QUESTIONAIRE",
  SET_QUESTIONAIRE_SUCCESS = "SET_QUESTIONAIRE_SUCCESS",
  SET_QUESTIONAIRE_FAILURE = "SET_QUESTIONAIRE_FAILURE",
}

export class GetQuestionaires implements CustomAction {
  readonly type = FirebaseActionType.GET_QUESTIONAIRES
  constructor(public payload: {email: string}) {}
}

export class GetQuestionairesSuccess implements CustomAction {
  readonly type = FirebaseActionType.GET_QUESTIONAIRES_SUCCESS
  constructor(public payload:  Questionaire[]) {}
}

export class GetQuestionairesFailure implements CustomAction {
  readonly type = FirebaseActionType.GET_QUESTIONAIRES_FAILURE
  constructor(public payload: string) {}
}

export class GetQuestionaire implements CustomAction {
  readonly type = FirebaseActionType.GET_QUESTIONAIRE
  constructor(public payload: {questionaireUUID: string}) {}
}

export class GetQuestionaireSuccess implements CustomAction {
  readonly type = FirebaseActionType.GET_QUESTIONAIRE_SUCCESS
  constructor(public payload: {questionaire: Questionaire}) {}
}

export class GetQuestionaireFailure implements CustomAction {
  readonly type = FirebaseActionType.GET_QUESTIONAIRE_FAILURE
  constructor(public payload: string) {}
}

export class SetQuestionaire implements CustomAction {
  readonly type = FirebaseActionType.SET_QUESTIONAIRE
  constructor(public payload: {questionaire: string, questions: Array<Question>}) {}
}

export class SetQuestionaireSuccess implements CustomAction {
  readonly type = FirebaseActionType.SET_QUESTIONAIRE_SUCCESS
  constructor(public payload: string) {}
}

export class SetQuestionaireFailure implements CustomAction {
  readonly type = FirebaseActionType.SET_QUESTIONAIRE_FAILURE
  constructor(public payload: string) {}
}

export type FirebaseActions =
  GetQuestionaires |
  GetQuestionairesSuccess |
  GetQuestionairesFailure |
  GetQuestionaire |
  GetQuestionaireSuccess |
  GetQuestionaireFailure |
  SetQuestionaire |
  SetQuestionaireSuccess |
  SetQuestionaireFailure