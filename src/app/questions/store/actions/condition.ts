import { Action } from '@ngrx/store'
import { GetQuestionaireSuccess, GetQuestionaireFailure,CreateQuestionaire } from "./questionaire"
import { DeleteStatement } from "./statement"

export enum ConditionActionType {
  ADD_CONDITION = "ADD_CONDITION",
  DELETE_CONDITION = "DELETE_CONDITION",
  CHANGE_CONDITION_ATTRIBUTE = "CHANGE_CONDITION_ATTRIBUTE"
}

export class AddCondition implements Action {
  readonly type = ConditionActionType.ADD_CONDITION
  constructor(public payload: {condition: any, statementUUID: string}) {}
}

export class DeleteCondition implements Action {
  readonly type = ConditionActionType.DELETE_CONDITION
  constructor(public payload: {uuid: string, statementUUID: string}) {}
}

export class ChangeConditionAttribute implements Action {
  readonly type = ConditionActionType.CHANGE_CONDITION_ATTRIBUTE
  constructor(public payload: {attr: string, value: any, uuid: string, statementUUID: string}) {}
}


export type ConditionActions =
  AddCondition |
  DeleteCondition |
  ChangeConditionAttribute |
  GetQuestionaireSuccess |
  CreateQuestionaire |
  DeleteStatement