import { AnswerActionType, AnswerActions } from "../actions/answer"
import { QuestionaireActionType } from "../actions/questionaire"

export type InitialStateAnswers = any[]

export const initialState = []

export function answerReducer(state: InitialStateAnswers = initialState, action: AnswerActions) {
  switch(action.type) {
    case QuestionaireActionType.GET_QUESTIONAIRE_SUCCESS: {
      let statements = action.payload.questionaire.statements || []
      return statements.map(s => "")
    }
    case AnswerActionType.CHANGE_ANSWER: {
      let { index, answer } = action.payload

      return state.map((_answer,i) => i !== index
        ? _answer
        : answer
      )
    }
      
    default:
      return state
  }
}