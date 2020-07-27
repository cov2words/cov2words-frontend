import { Action } from '@ngrx/store';

export interface CustomAction extends Action {
  type: string;
  payload?: any;
}

export enum AuthActionType {
  SET_USER = "SET_USER"
}


export class SetUser implements CustomAction {
  readonly type = AuthActionType.SET_USER
  constructor(public payload: {user: any}) {}
}

export type AuthActions = 
  SetUser