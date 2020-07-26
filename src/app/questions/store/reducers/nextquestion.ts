import { OptionsActions, OptionsActionType } from "../actions/option"

export function nextQuestionReducer(state, action: OptionsActions) {
  switch(action.type) {
    case OptionsActionType.DELETE_OPTION:
      return state.filter((opt, i) => i !== action.payload.index)
    case OptionsActionType.ADD_OPTION:
      return [...state, ""]
    default:
      return state
  }
}