import { Action, State } from '@ngrx/store';

export interface CustomAction extends Action {
  type: string;
  payload?: any;
}

export enum OptionsActionType {
  DELETE_OPTION = "DELETE_OPTION",
  ADD_OPTION = "ADD_OPTION",
  CHANGE_OPTION_TEXT = "CHANGE_OPTION_TEXT",
}

export class DeleteOption implements CustomAction {
  readonly type = OptionsActionType.DELETE_OPTION
  constructor(public payload: {uuid: string, index: number}) {}
}

export class AddOption implements CustomAction {
  readonly type = OptionsActionType.ADD_OPTION
  constructor(public payload: {uuid: string, option: string}) {}
}

export class ChangeOptionText implements CustomAction {
  readonly type = OptionsActionType.CHANGE_OPTION_TEXT
  constructor(public payload: {uuid: string, index: number, text: string}) {}
}

export type OptionsActions =
  DeleteOption |
  AddOption |
  ChangeOptionText