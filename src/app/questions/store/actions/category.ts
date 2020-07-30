import { Action } from '@ngrx/store';

export enum CategoryActionType {
  ADD_CATEGORY = "ADD_CATEGORY",
  DELETE_CATEGORY = "DELETE_CATEGORY",
  EDIT_CATEGORY = "EDIT_CATEGORY"
}

export class AddCategory implements Action {
  readonly type = CategoryActionType.ADD_CATEGORY
  constructor(public payload: {value: string}) {}
}

export class DeleteCategory implements Action {
  readonly type = CategoryActionType.DELETE_CATEGORY
  constructor(public payload: {index: number}) {}
}

export class EditCategory implements Action {
  readonly type = CategoryActionType.EDIT_CATEGORY
  constructor(public payload: {index: number, value: string}) {}
}

export type CategoryActions = 
  AddCategory |
  DeleteCategory |
  EditCategory