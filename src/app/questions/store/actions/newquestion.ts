import { Action, State } from '@ngrx/store';
import { Questionaire, Question } from "../../questions.model"

export interface CustomAction extends Action {
  type: string;
  payload?: any;
}

export enum NewQuestionActionType {
  CHANGE_NEWQUESTION_ATTRIBUTE = "CHANGE_NEWQUESTION_ATTRIBUTE"
}

export class ChangeNewQuestionAttribute implements CustomAction {
  readonly type = NewQuestionActionType.CHANGE_NEWQUESTION_ATTRIBUTE
  constructor(public payload: {attribute: string, value: any}) {}
}

export type NewQuestionActions = ChangeNewQuestionAttribute