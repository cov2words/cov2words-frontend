import { Action } from '@ngrx/store';


export enum StatementsActionType {
  ADD_STATEMENT = "ADD_STATEMENT",
  DELETE_STATEMENT = "DELETE_STATEMENT",
  RENAME_STATEMENT = "RENAME_STATEMENT",
  ADD_CONDITION = "ADD_CONDITION",
  DELETE_CONDITION = "DELETE_CONDITION",
  RENAME_CONDITION = "RENAME_CONDITION",
  UPDATE_NEWCONDITION_NAME = "UPDATE_NEWCONDITION_NAME", // ?!
  UPDATE_STATEMENT_TRUETEXT = "UPDATE_STATEMENT_TRUETEXT",
  UPDATE_STATEMENT_FALSETEXT = "UPDATE_STATEMENT_FALSETEXT",
  CHANGE_OPERAND = "CHANGE_OPERAND",
  CHANGE_SELECTED = "CHANGED_SELECTED",
  CHANGE_VALUE = "CHANGE_VALUE",
  CHANGE_COMBINATION = "CHANGE_COMBINATION",
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

export class RenameCondition implements Action {
  readonly type = StatementsActionType.RENAME_CONDITION
  constructor(public payload: {statementUUID: string, conditionUUID: string, name: string}) {}
}

export class UpdateNewConditionName implements Action {
  readonly type = StatementsActionType.UPDATE_NEWCONDITION_NAME
  constructor(public payload: { name: string, statementUUID: string}) {}
}

export class UpdateStatementTrueText implements Action {
  readonly type = StatementsActionType.UPDATE_STATEMENT_TRUETEXT
  constructor(public payload: { value: string, statementUUID: string }) {}
}

export class UpdateStatementFalseText implements Action {
  readonly type = StatementsActionType.UPDATE_STATEMENT_FALSETEXT
  constructor(public payload: { value: string, statementUUID: string}) {}
}

export class ChangeOperand implements Action {
  readonly type = StatementsActionType.CHANGE_OPERAND
  constructor(public payload: {operand: string, conditionUUID: string, statementUUID: string}) {}
}

export class ChangeSelected implements Action {
  readonly type = StatementsActionType.CHANGE_SELECTED
  constructor(public payload: {selected: string[], conditionUUID: string, statementUUID: string}) {}
}

export class ChangeValue implements Action {
  readonly type = StatementsActionType.CHANGE_VALUE
  constructor(public payload: {value: string, conditionUUID: string, statementUUID: string}) {}
}

export class ChangeCombination implements Action {
  readonly type = StatementsActionType.CHANGE_COMBINATION
  constructor(public payload: {combination: string, conditionUUID: string, statementUUID: string}) {}
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
  RenameCondition |
  UpdateNewConditionName |
  UpdateStatementTrueText |
  UpdateStatementFalseText |
  ChangeOperand |
  ChangeSelected |
  ChangeValue |
  ChangeCombination |
  ChangeAnswer