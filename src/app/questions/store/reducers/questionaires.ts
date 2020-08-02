import { QuestionairesActions, QuestionairesActionType } from "../actions/questionaires"

export interface Questionaire {
  uuid: string
  name: string
}

export type InitialStateQuestionaires = Questionaire[]

export const initialState = []

export function questionairesReducer(state: InitialStateQuestionaires = initialState, action: QuestionairesActions) {
  switch (action.type) {
    case QuestionairesActionType.GET_QUESTIONAIRES: {
      return state
    }
    case QuestionairesActionType.GET_QUESTIONAIRES_SUCCESS: {
      return action.payload.map(q => ({uuid: q.metadata.uuid, name: q.metadata.name}))
    }
    case QuestionairesActionType.GET_QUESTIONAIRES_FAILURE: {
      return state
    }
    default:
      return state
  }
}