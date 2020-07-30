import { CategoryActions, CategoryActionType } from "../actions/category"

export const initialStateCategories: string[] = []

export function categoriesReducer(state: string[] = initialStateCategories, action: CategoryActions) {
  switch (action.type) {

    case CategoryActionType.ADD_CATEGORY: {
      let { value } = action.payload
      return [...state, value]
    }

    case CategoryActionType.DELETE_CATEGORY: {
      let { index } = action.payload
      return  state.filter((c,i) => i !== index)
    }

    case CategoryActionType.EDIT_CATEGORY: {
      let { value, index } = action.payload
      return  state.map((c,i) => i == index ? value : c)
    }

    default:
      return state
  }
}