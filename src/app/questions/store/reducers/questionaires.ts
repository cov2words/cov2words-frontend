import { QuestionairesActions, QuestionairesActionType } from "../actions/questionaires"

export interface Questionaire {
  uuid: string
  name: string
}

export function questionairesReducer(state: Questionaire[] = [], action: QuestionairesActions) {
  switch (action.type) {
    case QuestionairesActionType.GET_QUESTIONAIRES: {
      return state
    }
    case QuestionairesActionType.GET_QUESTIONAIRES_SUCCESS: {
      return state
    }
    case QuestionairesActionType.GET_QUESTIONAIRES_FAILURE: {
      return state
    }
    default:
      return state
  }
}