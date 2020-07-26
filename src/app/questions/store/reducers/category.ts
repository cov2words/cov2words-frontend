import { CategoriesActions, CategoriesActionType } from "../actions/category"

export function categoriesReducer(state, action: CategoriesActions) {
  switch (action.type) {
    case CategoriesActionType.ADD_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, action.payload.value]
      }
    case CategoriesActionType.DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter((c,i) => i !== action.payload.index)
      }
    case CategoriesActionType.EDIT_CATEGORY:
      let { value, index } = action.payload
      return {
        ...state,
        categories: state.categories.map((c,i) => i == index ? value : c)
      }
    default:
      return state
  }
}