import { Action, State } from '@ngrx/store';
import { Questionaire, Question } from "../../questions.model"

export interface CustomAction extends Action {
  type: string;
  payload?: any;
}

export enum QuestionsActionType {
  CHANGE_QUESTIONAIRE_NAME = "CHANGE_QUESTIONAIRE_NAME",
  CREATE_QUESTIONAIRE = "CREATE_QUESTIONAIRE",
  ADD_QUESTION = "ADD_QUESTION",
  DELETE_QUESTION = "DELETE_QUESTION",
  MOVE_QUESTION = "MOVE_QUESTION",
  MOVE_QUESTION_DND = "MOVE_QUESTION_DND",
  CHANGE_QUESTION_ID = "CHANGE_QUESTION_ID",
  CHANGE_QUESTION_TEXT = "CHANGE_QUESTION_TEXT",
  CHANGE_QUESTION_CATEGORY = "CHANGE_QUESTION_CATEGORY",
  CHANGE_NEXT_QUESTION = "CHANGE_NEXT_QUESTION",
  DELETE_NEXT_QUESTIONMAP = "DELETE_NEXT_QUESTIONMAP",
  ADD_NEXT_QUESTIONMAP = "ADD_NEXT_QUESTIONMAP"
}

export class ChangeQuestionaireName implements CustomAction {
  readonly type = QuestionsActionType.CHANGE_QUESTIONAIRE_NAME
  constructor(public payload: {name: string}) {}
}

export class CreateQuestionaire implements CustomAction {
  readonly type = QuestionsActionType.CREATE_QUESTIONAIRE
  constructor(public payload: {name: string, owner: string, uuid: string}) {}
}

export class AddQuestion implements CustomAction {
  readonly type = QuestionsActionType.ADD_QUESTION
  constructor(public payload: {question: any}) {}
}

export class DeleteQuestion implements CustomAction {
  readonly type = QuestionsActionType.DELETE_QUESTION
  constructor(public payload: {uuid: string}) {}
}

export class MoveQuestion implements CustomAction {
  readonly type = QuestionsActionType.MOVE_QUESTION
  constructor(public payload: {uuid: string, direction: number}) {}
}

export class MoveQuestionDnD implements CustomAction {
  readonly type = QuestionsActionType.MOVE_QUESTION_DND
  constructor(public payload: {dragIndex: number, dropIndex: number}) {}
}

export class ChangeQuestionId implements CustomAction {
  readonly type = QuestionsActionType.CHANGE_QUESTION_ID
  constructor(public payload: {uuid: string, id: string}) {}
}

export class ChangeQuestionText implements CustomAction {
  readonly type = QuestionsActionType.CHANGE_QUESTION_TEXT
  constructor(public payload: {uuid: string, text: string}) {}
}

export class ChangeQuestionCategory implements CustomAction {
  readonly type = QuestionsActionType.CHANGE_QUESTION_CATEGORY
  constructor(public payload: {uuid: string, category: string}) {}
}

export class ChangeNextQuestion implements CustomAction {
  readonly type = QuestionsActionType.CHANGE_NEXT_QUESTION
  constructor(public payload: {uuid: string, index: number, nextQuestion: string}) {}
}

export class DeleteNextQuestionMap implements CustomAction {
  readonly type = QuestionsActionType.DELETE_NEXT_QUESTIONMAP
  constructor(public payload: {uuid: string}) {}
}

export class AddNextQuestionMap implements CustomAction {
  readonly type = QuestionsActionType.ADD_NEXT_QUESTIONMAP
  constructor(public payload: {uuid: string}) {}
}

export type QuestionsActions =
  ChangeQuestionaireName |
  CreateQuestionaire |
  AddQuestion |
  DeleteQuestion |
  MoveQuestion |
  MoveQuestionDnD |
  ChangeQuestionId |
  ChangeQuestionText |
  ChangeQuestionCategory |
  ChangeNextQuestion |
  DeleteNextQuestionMap |
  AddNextQuestionMap