import { AnswerActionType, AnswerActions } from "../actions/answer"
import { QuestionaireActionType } from "../actions/questionaire"

export type InitialStateAnswers = any[]

export const initialState = []

export function answerReducer(state: InitialStateAnswers = initialState, action: AnswerActions) {
  switch(action.type) {
    case QuestionaireActionType.GET_QUESTIONAIRE_SUCCESS: {
      //let conditions = action.payload.questionaire.conditions || []
      let uniqueConditions = new Set(action.payload.questionaire.conditions.map(c => c.selected[0]))
      console.log("uC", uniqueConditions)
      //return conditions.map(s => "")
      return Array.from(uniqueConditions).map(x => "")
    }
    case AnswerActionType.CHANGE_ANSWER: {
      let { index, answer } = action.payload

      console.log("OMFG", state, index ,answer)
      let answers = [...state]
      answers[index] = answer
      return answers
      /* return state.map((_answer,i) => i !== index
        ? _answer
        : answer
      ) */
    }
      
    default:
      return state
  }
}