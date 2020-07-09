import { Action } from '@ngrx/store';
import { Question } from "../questions.model"

export interface CustomAction extends Action {
  type: string;
  payload?: any;
}


export enum QuestionsActionType {
  GET_QUESTIONS = "GET_QUESTIONS",
  GET_QUESTIONS_SUCCESS = "GET_QUESTIONS_SUCCESS",
  GET_QUESTIONS_FAILURE = "GET_QUESTIONS_FAILURE",
  SET_QUESTIONS = "SET_QUESTIONS",
  SET_QUESTIONS_SUCCESS = "SET_QUESTIONS_SUCCESS",
  SET_QUESTIONS_FAILURE = "SET_QUESTIONS_FAILURE",
  DELETE_QUESTION = "DELETE_QUESTION",
  MOVE_QUESTION = "MOVE_QUESTION",
  DELETE_OPTION = "DELETE_OPTION",
  CHANGE_QUESTION_ID = "CHANGE_QUESTION_ID",
  CHANGE_QUESTION_TEXT = "CHANGE_QUESTION_TEXT",
  CHANGE_OPTION_TEXT = "CHANGE_OPTION_TEXT",
  CHANGE_NEXT_QUESTION = "CHANGE_NEXT_QUESTION",
  DELETE_NEXT_QUESTIONMAP = "DELETE_NEXT_QUESTIONMAP",
  ADD_NEXT_QUESTIONMAP = "ADD_NEXT_QUESTIONMAP"
}

export class GetQuestions implements CustomAction {
  readonly type = QuestionsActionType.GET_QUESTIONS
  constructor(public payload: string) {}
}

export class GetQuestionsSuccess implements CustomAction {
  readonly type = QuestionsActionType.GET_QUESTIONS_SUCCESS
  constructor(public payload: Array<Question>) {}
}

export class GetQuestionsFailure implements CustomAction {
  readonly type = QuestionsActionType.GET_QUESTIONS_FAILURE
  constructor(public payload: string) {}
}

export class SetQuestions implements CustomAction {
  readonly type =  QuestionsActionType.SET_QUESTIONS
  constructor(public payload: {questionaire: string, questions: Array<Question>}) {}
}

export class SetQuestionsSuccess implements CustomAction {
  readonly type = QuestionsActionType.SET_QUESTIONS_SUCCESS
  constructor(public payload: string) {}
}

export class SetQuestionsFailure implements CustomAction {
  readonly type = QuestionsActionType.SET_QUESTIONS_FAILURE
  constructor(public payload: string) {}
}

export class DeleteQuestion implements CustomAction {
  readonly type = QuestionsActionType.DELETE_QUESTION
  constructor(public payload: string) {}
}

export class MoveQuestion implements CustomAction {
  readonly type = QuestionsActionType.MOVE_QUESTION
  constructor(public payload: {uuid: string, direction: number}) {}
}

export class DeleteOption implements CustomAction {
  readonly type = QuestionsActionType.DELETE_OPTION
  constructor(public payload: {uuid: string, index: number}) {}
}

export class ChangeQuestionId implements CustomAction {
  readonly type = QuestionsActionType.CHANGE_QUESTION_ID
  constructor(public payload: {uuid: string, id: string}) {}
}

export class ChangeQuestionText implements CustomAction {
  readonly type = QuestionsActionType.CHANGE_QUESTION_TEXT
  constructor(public payload: {uuid: string, text: string}) {}
}

export class ChangeOptionText implements CustomAction {
  readonly type = QuestionsActionType.CHANGE_OPTION_TEXT
  constructor(public payload: {uuid: string, index: number, text: string}) {}
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

export type QuestionsActions = GetQuestions |
  GetQuestionsSuccess |
  GetQuestionsFailure |
  SetQuestions |
  SetQuestionsSuccess |
  SetQuestionsFailure |
  DeleteQuestion |
  MoveQuestion |
  DeleteOption |
  ChangeQuestionId |
  ChangeQuestionText |
  ChangeOptionText |
  ChangeNextQuestion |
  DeleteNextQuestionMap |
  AddNextQuestionMap
