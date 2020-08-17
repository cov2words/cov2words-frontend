import { Action } from '@ngrx/store';
import { AddCondition, DeleteCondition } from "./condition"
import { GetQuestionaireSuccess, CreateQuestionaire } from "./questionaire"

export enum StatementsActionType {
  ADD_STATEMENT = "ADD_STATEMENT",
  DELETE_STATEMENT = "DELETE_STATEMENT",
  CHANGE_STATEMENT_ATTRIBUTE = "CHANGE_STATEMENT_ATTRIBUTE"
}

export class AddStatement implements Action {
  readonly type = StatementsActionType.ADD_STATEMENT
  constructor(public payload: { statement: any}) {}
}

export class DeleteStatement implements Action {
  readonly type = StatementsActionType.DELETE_STATEMENT
  constructor(public payload: { statement: any}) {}
}

export class ChangeStatementAttribute implements Action {
  readonly type = StatementsActionType.CHANGE_STATEMENT_ATTRIBUTE
  constructor(public payload: { uuid: string, attr: string, value: string | number }) {}
}


export type StatementsActions =
  AddStatement |
  DeleteStatement |
  ChangeStatementAttribute |
  AddCondition |
  DeleteCondition |
  GetQuestionaireSuccess |
  CreateQuestionaire