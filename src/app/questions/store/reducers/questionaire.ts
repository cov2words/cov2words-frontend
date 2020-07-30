import { QuestionaireActions, QuestionaireActionType } from "../actions/questionaire"
import { CategoryActionType } from "../actions/category"
import { categoriesReducer, initialStateCategories } from "./category"


export interface InitialStateQuestionaire {
  name: string,
  owner: string
  uuid: string
  modified: string
  created: string
  categories: string[]
}

export const initialStateQuestionaire = {
  name: '',
  owner: '',
  uuid: '',
  modified: '',
  created: '',
  categories: initialStateCategories
}

export function questionaireReducer(state: InitialStateQuestionaire = initialStateQuestionaire, action: QuestionaireActions) {
  switch (action.type) {
    case CategoryActionType.ADD_CATEGORY:
    case CategoryActionType.DELETE_CATEGORY:
    case CategoryActionType.EDIT_CATEGORY:
      return {
        ...state,
        categories: categoriesReducer(state.categories, action)
      }
    case QuestionaireActionType.GET_QUESTIONAIRE:
    default:
      return state
  }
}