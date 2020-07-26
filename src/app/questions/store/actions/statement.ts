import { Action, State } from '@ngrx/store';

export interface CustomAction extends Action {
  type: string;
  payload?: any;
}

export enum StatementsActionType {
  ADD_STATEMENT = "ADD_STATEMENT",
  ADD_CONDITION = "ADD_CONDITION",
  UPDATE_NEWCONDITION_NAME = "UPDATE_NEWCONDITION_NAME",
  UPDATE_STATEMENT_TRUETEXT = "UPDATE_STATEMENT_TRUETEXT",
  UPDATE_STATEMENT_FALSETEXT = "UPDATE_STATEMENT_FALSETEXT",
  CHANGE_OPERAND = "CHANGE_OPERAND",
  CHANGE_SELECTED = "CHANGED_SELECTED",
  CHANGE_VALUE = "CHANGE_VALUE",
  CHANGE_COMBINATION = "CHANGE_COMBINATION",
  CHANGE_ANSWER = "CHANGE_ANSWER"
}

export class AddStatement implements CustomAction {
  readonly type = StatementsActionType.ADD_STATEMENT
  constructor(public payload: { statement: any}) {}
}

export class AddCondition implements CustomAction {
  readonly type = StatementsActionType.ADD_CONDITION
  constructor(public payload: {condition: any, statementUUID: string}) {}
}

export class UpdateNewConditionName implements CustomAction {
  readonly type = StatementsActionType.UPDATE_NEWCONDITION_NAME
  constructor(public payload: { name: string, statementUUID: string}) {}
}

export class UpdateStatementTrueText implements CustomAction {
  readonly type = StatementsActionType.UPDATE_STATEMENT_TRUETEXT
  constructor(public payload: { value: string, statementUUID: string }) {}
}

export class UpdateStatementFalseText implements CustomAction {
  readonly type = StatementsActionType.UPDATE_STATEMENT_FALSETEXT
  constructor(public payload: { value: string, statementUUID: string}) {}
}

export class ChangeOperand implements CustomAction {
  readonly type = StatementsActionType.CHANGE_OPERAND
  constructor(public payload: {operand: string, conditionUUID: string, statementUUID: string}) {}
}

export class ChangeSelected implements CustomAction {
  readonly type = StatementsActionType.CHANGE_SELECTED
  constructor(public payload: {selected: string[], conditionUUID: string, statementUUID: string}) {}
}

export class ChangeValue implements CustomAction {
  readonly type = StatementsActionType.CHANGE_VALUE
  constructor(public payload: {value: string, conditionUUID: string, statementUUID: string}) {}
}

export class ChangeCombination implements CustomAction {
  readonly type = StatementsActionType.CHANGE_COMBINATION
  constructor(public payload: {combination: string, conditionUUID: string, statementUUID: string}) {}
}

export class ChangeAnswer implements CustomAction {
  readonly type = StatementsActionType.CHANGE_ANSWER
  constructor(public payload: {index: number, answer: any}) {}
}

export type StatementsActions =
  AddStatement |
  AddCondition |
  UpdateNewConditionName |
  UpdateStatementTrueText |
  UpdateStatementFalseText |
  ChangeOperand |
  ChangeSelected |
  ChangeValue |
  ChangeCombination |
  ChangeAnswer