import { Action } from '@ngrx/store';

export enum AuthActionType {
  SET_USER = "SET_USER"
}

export class SetUser implements Action {
  readonly type = AuthActionType.SET_USER
  constructor(public payload: {user: any}) {}
}

export type AuthActions = 
  SetUser