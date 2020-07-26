import { Action, State } from '@ngrx/store';

export interface CustomAction extends Action {
  type: string;
  payload?: any;
}

export enum CategoriesActionType {
  ADD_CATEGORY = "ADD_CATEGORY",
  DELETE_CATEGORY = "DELETE_CATEGORY",
  EDIT_CATEGORY = "EDIT_CATEGORY"
}

export class AddCategory implements CustomAction {
  readonly type = CategoriesActionType.ADD_CATEGORY
  constructor(public payload: {value: string}) {}
}

export class DeleteCategory implements CustomAction {
  readonly type = CategoriesActionType.DELETE_CATEGORY
  constructor(public payload: {index: number}) {}
}

export class EditCategory implements CustomAction {
  readonly type = CategoriesActionType.EDIT_CATEGORY
  constructor(public payload: {index: number, value: string}) {}
}

export type CategoriesActions = 
  AddCategory |
  DeleteCategory |
  EditCategory