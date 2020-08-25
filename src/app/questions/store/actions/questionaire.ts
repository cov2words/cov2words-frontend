import { Action } from '@ngrx/store';
import { Questionaire, Question } from "../../questions.model"
import { QuestionsActions } from "./question"
import { StatementsActions } from "./statement"

export enum QuestionaireActionType {
  GET_QUESTIONAIRE = "GET_QUESTIONAIRE",
  GET_QUESTIONAIRE_SUCCESS = "GET_QUESTIONAIRE_SUCCESS",
  GET_QUESTIONAIRE_FAILURE = "GET_QUESTIONAIRE_FAILURE",
  SET_QUESTIONAIRE = "SET_QUESTIONAIRE",
  SET_QUESTIONAIRE_SUCCESS = "SET_QUESTIONAIRE_SUCCESS",
  SET_QUESTIONAIRE_FAILURE = "SET_QUESTIONAIRE_FAILURE",
  IMPORT_QUESTIONAIRE = "IMPORT_QUESTIONAIRE",
  EXPORT_QUESTIONAIRE = "EXPORT_QUESTIONAIRE",
  CHANGE_QUESTIONAIRE_ATTRIBUTE = "CHANGE_QUESTIONAIRE_ATTRIBUTE",
  CHANGE_QUESTIONAIRE_NAME = "CHANGE_QUESTIONAIRE_NAME",
  CREATE_QUESTIONAIRE = "CREATE_QUESTIONAIRE",
  ADD_CATEGORY = "ADD_CATEGORY",
  DELETE_CATEGORY = "DELETE_CATEGORY",
  EDIT_CATEGORY = "EDIT_CATEGORY",
  /* ADD_QUESTION = "ADD_QUESTION",
  DELETE_QUESTION = "DELETE_QUESTION", */
  MOVE_QUESTION = "MOVE_QUESTION",
  MOVE_QUESTION_DND = "MOVE_QUESTION_DND",
  MOVE_STATEMENT = "MOVE_STATEMENT",
  MOVE_STATEMENT_DND = "MOVE_STATEMENT_DND"
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
  constructor(public payload: {questionaire: string, questions: Array<Question>, statements: any, conditions: any}) {}
}

export class SetQuestionaireSuccess implements Action {
  readonly type = QuestionaireActionType.SET_QUESTIONAIRE_SUCCESS
  constructor(public payload: string) {}
}

export class SetQuestionaireFailure implements Action {
  readonly type = QuestionaireActionType.SET_QUESTIONAIRE_FAILURE
  constructor(public payload: string) {}
}

export class ImportQuestionaire implements Action {
  readonly type = QuestionaireActionType.IMPORT_QUESTIONAIRE
  constructor(public payload: {questionaire: Questionaire}) {}
}

export class ChangeQuestionaireAttribute implements Action {
  readonly type = QuestionaireActionType.CHANGE_QUESTIONAIRE_ATTRIBUTE
  constructor(public payload: {attr: string, value: any}) {}
}

export class ChangeQuestionaireName implements Action {
  readonly type = QuestionaireActionType.CHANGE_QUESTIONAIRE_NAME
  constructor(public payload: {name: string}) {}
}

export class CreateQuestionaire implements Action {
  readonly type = QuestionaireActionType.CREATE_QUESTIONAIRE
  constructor(public payload: {name: string, owner: string, uuid: string}) {}
}

export class AddCategory implements Action {
  readonly type = QuestionaireActionType.ADD_CATEGORY
  constructor(public payload: {value: string}) {}
}

export class DeleteCategory implements Action {
  readonly type = QuestionaireActionType.DELETE_CATEGORY
  constructor(public payload: {index: number}) {}
}

export class EditCategory implements Action {
  readonly type = QuestionaireActionType.EDIT_CATEGORY
  constructor(public payload: {index: number, value: string}) {}
}

/* export class AddQuestion implements Action {
  readonly type = QuestionaireActionType.ADD_QUESTION
  constructor(public payload: {question: any}) {}
}

export class DeleteQuestion implements Action {
  readonly type = QuestionaireActionType.DELETE_QUESTION
  constructor(public payload: {uuid: string}) {}
} */

export class MoveQuestion implements Action {
  readonly type = QuestionaireActionType.MOVE_QUESTION
  constructor(public payload: {uuid: string, direction: number}) {}
}

export class MoveQuestionDnD implements Action {
  readonly type = QuestionaireActionType.MOVE_QUESTION_DND
  constructor(public payload: {dragIndex: number, dropIndex: number}) {}
}

export class MoveStatement implements Action {
  readonly type = QuestionaireActionType.MOVE_STATEMENT
  constructor(public payload: {uuid: string, direction: number}) {}
}

export class MoveStatementDnD implements Action {
  readonly type = QuestionaireActionType.MOVE_STATEMENT_DND
  constructor(public payload: {dragIndex: number, dropIndex: number}) {}
}

export type QuestionaireActions = 
  GetQuestionaire |
  GetQuestionaireSuccess |
  GetQuestionaireFailure |
  SetQuestionaire |
  SetQuestionaireSuccess |
  SetQuestionaireFailure |
  ImportQuestionaire |
  ChangeQuestionaireAttribute |
  ChangeQuestionaireName |
  CreateQuestionaire |
  AddCategory |
  DeleteCategory |
  EditCategory |
  /* AddQuestion |
  DeleteQuestion | */
  MoveQuestion |
  MoveQuestionDnD |
  MoveStatement |
  MoveStatementDnD |
  QuestionsActions |
  StatementsActions