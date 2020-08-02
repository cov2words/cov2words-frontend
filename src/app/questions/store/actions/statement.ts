import { Action } from '@ngrx/store';


export enum StatementsActionType {
  ADD_STATEMENT = "ADD_STATEMENT",
  DELETE_STATEMENT = "DELETE_STATEMENT",
  RENAME_STATEMENT = "RENAME_STATEMENT",
  ADD_CONDITION = "ADD_CONDITION",
  DELETE_CONDITION = "DELETE_CONDITION",
  UPDATE_STATEMENT_TRUETEXT = "UPDATE_STATEMENT_TRUETEXT",
  UPDATE_STATEMENT_FALSETEXT = "UPDATE_STATEMENT_FALSETEXT",
  CHANGE_CONDITION_ATTRIBUTE = "CHANGE_CONDITION_ATTRIBUTE",
  CHANGE_SELECTED = "CHANGE_SELECTED",
  CHANGE_ANSWER = "CHANGE_ANSWER"
}

export class AddStatement implements Action {
  readonly type = StatementsActionType.ADD_STATEMENT
  constructor(public payload: { statement: any}) {}
}

export class DeleteStatement implements Action {
  readonly type = StatementsActionType.DELETE_STATEMENT
  constructor(public payload: { statementUUID: string}) {}
}

export class RenameStatement implements Action {
  readonly type = StatementsActionType.RENAME_STATEMENT
  constructor(public payload: {statementUUID: string, name: string}) {}
}

export class AddCondition implements Action {
  readonly type = StatementsActionType.ADD_CONDITION
  constructor(public payload: {condition: any, statementUUID: string}) {}
}

export class UpdateStatementTrueText implements Action {
  readonly type = StatementsActionType.UPDATE_STATEMENT_TRUETEXT
  constructor(public payload: { value: string, statementUUID: string }) {}
}

export class UpdateStatementFalseText implements Action {
  readonly type = StatementsActionType.UPDATE_STATEMENT_FALSETEXT
  constructor(public payload: { value: string, statementUUID: string}) {}
}

export class ChangeConditionAttribute implements Action {
  readonly type = StatementsActionType.CHANGE_CONDITION_ATTRIBUTE
  constructor(public payload: {attr: string, value: string, conditionUUID: string, statementUUID: string}) {}
}


export class ChangeSelected implements Action {
  readonly type = StatementsActionType.CHANGE_SELECTED
  constructor(public payload: {selected: string[], conditionUUID: string, statementUUID: string}) {}
}

export class ChangeAnswer implements Action {
  readonly type = StatementsActionType.CHANGE_ANSWER
  constructor(public payload: {index: number, answer: any}) {}
}

export type StatementsActions =
  AddStatement |
  DeleteStatement |
  RenameStatement |
  AddCondition |
  UpdateStatementTrueText |
  UpdateStatementFalseText |
  ChangeConditionAttribute |
  ChangeSelected |
  ChangeAnswer