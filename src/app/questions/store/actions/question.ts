import { Action } from '@ngrx/store';
import { GetQuestionaireSuccess, CreateQuestionaire } from "./questionaire"
import { OptionsActions } from './option';


export enum QuestionsActionType {
  ADD_QUESTION = "ADD_QUESTION",
  DELETE_QUESTION = "DELETE_QUESTION",
  MOVE_QUESTION = "MOVE_QUESTION",
  MOVE_QUESTION_DND = "MOVE_QUESTION_DND",
  CHANGE_QUESTION_ATTRIBUTE = "CHANGE_QUESTION_ATTRIBUTE",
  CHANGE_NEXT_QUESTION = "CHANGE_NEXT_QUESTION",
  DELETE_NEXT_QUESTIONMAP = "DELETE_NEXT_QUESTIONMAP",
  ADD_NEXT_QUESTIONMAP = "ADD_NEXT_QUESTIONMAP"
}

export class AddQuestion implements Action {
  readonly type = QuestionsActionType.ADD_QUESTION
  constructor(public payload: {question: any}) {}
}

export class DeleteQuestion implements Action {
  readonly type = QuestionsActionType.DELETE_QUESTION
  constructor(public payload: {uuid: string}) {}
}

export class ChangeQuestionAttribute implements Action {
  readonly type = QuestionsActionType.CHANGE_QUESTION_ATTRIBUTE
  constructor(public payload: {uuid: string, attr: string, value: string}) {}
}

export class ChangeNextQuestion implements Action {
  readonly type = QuestionsActionType.CHANGE_NEXT_QUESTION
  constructor(public payload: {uuid: string, index: number, nextQuestion: string}) {}
}

export class DeleteNextQuestionMap implements Action {
  readonly type = QuestionsActionType.DELETE_NEXT_QUESTIONMAP
  constructor(public payload: {uuid: string}) {}
}

export class AddNextQuestionMap implements Action {
  readonly type = QuestionsActionType.ADD_NEXT_QUESTIONMAP
  constructor(public payload: {uuid: string}) {}
}

export type QuestionsActions =
  AddQuestion |
  DeleteQuestion |
  ChangeQuestionAttribute |
  ChangeNextQuestion |
  DeleteNextQuestionMap |
  AddNextQuestionMap |
  GetQuestionaireSuccess |
  CreateQuestionaire |
  OptionsActions