import { OptionsActions, OptionsActionType } from "../actions/option"

export function optionsReducer(state, action: OptionsActions) {
  switch (action.type) {
    case OptionsActionType.DELETE_OPTION:
      return state.filter((opt, i) => i !== action.payload.index)
    case OptionsActionType.ADD_OPTION:
      return [...state, action.payload.option]
    case OptionsActionType.CHANGE_OPTION_TEXT: {
      let { index, text } = action.payload

      return state.map((opt, i) => i == index ? text : opt)

    }
    default:
      return state
  }
}