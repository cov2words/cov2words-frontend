import { NewQuestionActions, NewQuestionActionType } from "../actions/newquestion"

export const initialStateNewQuestion: any = {
  id: '',
  text: '',
  inputType: '',
}

export function newQuestionReducer(state = initialStateNewQuestion, action: NewQuestionActions) {
  switch (action.type) {
    case NewQuestionActionType.CHANGE_NEWQUESTION_ATTRIBUTE:
      return {
        ...state,
        [action.payload.attribute]: action.payload.value
      }
    default:
      return state
  }
}