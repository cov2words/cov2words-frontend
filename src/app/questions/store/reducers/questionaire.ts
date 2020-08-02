import { combineReducers } from "@ngrx/store"
import { authReducer } from "./auth"
import { QuestionaireActions, QuestionaireActionType } from "../actions/questionaire"
import { CategoryActionType } from "../actions/category"
import { QuestionsActionType } from "../actions/question"
import { StatementsActionType } from "../actions/statement"
import { categoriesReducer, initialStateCategories } from "./category"
import { statementsReducer, InitialStateStatements, initialState as initialStateStatements } from "./statement"
import { questionsReducer } from "./question"
import { OptionsActionType } from "../actions/root"

// TODO: make use of combineReducers?

export interface InitialStateQuestionaire {
  name: string
  owner: string
  uuid: string
  categories: string[]
  questions: any[]
  statements: InitialStateStatements
}

export const initialState = {
  name: '',
  owner: '',
  uuid: '',
  categories: initialStateCategories,
  questions: [],
  statements: initialStateStatements
}

/* export function _questionaireReducer(state, action) {
  switch (action.type) {
    case QuestionaireActionType.GET_QUESTIONAIRE_SUCCESS: {

      let { questions, metadata, statements } = action.payload.questionaire

      let _questions = questions.map(q =>
        q.inputType == 'radio' && q.options == undefined
          ? Object.assign({}, q, { options: [] })
          : q
      ) || []

      let _metadata = metadata.hasOwnProperty("categories")
        ? metadata
        : Object.assign({}, metadata, { categories: [] })

      return {
        ..._metadata,
        questions: _questions,
        statements: { statements: statements || [], answers: [] }
      }
    }
    case QuestionaireActionType.CHANGE_QUESTIONAIRE_NAME:
    case QuestionaireActionType.CREATE_QUESTIONAIRE:
    case QuestionaireActionType.GET_QUESTIONAIRE:
    default:
      return state
  }
}

export const questionaireReducer = combineReducers({
  categories: categoriesReducer,
  questions: questionsReducer,
  statements: statementsReducer,
  questionaire: _questionaireReducer
}) */

export function questionaireReducer(state: InitialStateQuestionaire = initialState, action: QuestionaireActions) {
  switch (action.type) {
    case CategoryActionType.ADD_CATEGORY:
    case CategoryActionType.DELETE_CATEGORY:
    case CategoryActionType.EDIT_CATEGORY:
      return {
        ...state,
        categories: categoriesReducer(state.categories, action)
      }
    case StatementsActionType.ADD_STATEMENT:
    case StatementsActionType.DELETE_STATEMENT:
    case StatementsActionType.RENAME_STATEMENT:
    case StatementsActionType.ADD_CONDITION:
    //case StatementsActionType.DELETE_CONDITION:
    case StatementsActionType.UPDATE_STATEMENT_TRUETEXT:
    case StatementsActionType.UPDATE_STATEMENT_FALSETEXT:
    case StatementsActionType.CHANGE_SELECTED:
    case StatementsActionType.CHANGE_ANSWER:
    case StatementsActionType.CHANGE_CONDITION_ATTRIBUTE:
      return {
        ...state,
        statements: statementsReducer(state.statements, action)
      }
    case QuestionsActionType.ADD_QUESTION:
    case QuestionsActionType.DELETE_QUESTION:
    case QuestionsActionType.MOVE_QUESTION:
    case QuestionsActionType.MOVE_QUESTION_DND:
    case QuestionsActionType.CHANGE_QUESTION_ATTRIBUTE:
    case QuestionsActionType.CHANGE_NEXT_QUESTION:
    case QuestionsActionType.DELETE_NEXT_QUESTIONMAP:
    case QuestionsActionType.ADD_NEXT_QUESTIONMAP:
    case OptionsActionType.ADD_OPTION:
    case OptionsActionType.DELETE_OPTION:
    case OptionsActionType.CHANGE_OPTION_TEXT:
      return {
        ...state,
        questions: questionsReducer(state.questions, action)
      }
    case QuestionaireActionType.GET_QUESTIONAIRE_SUCCESS: {

      let { questions, metadata, statements } = action.payload.questionaire

      let _questions = questions.map(q =>
        q.inputType == 'radio' && q.options == undefined
          ? Object.assign({}, q, { options: [] })
          : q
      ) || []

      let _metadata = metadata.hasOwnProperty("categories")
        ? metadata
        : Object.assign({}, metadata, { categories: [] })

      return {
        ..._metadata,
        questions: _questions,
        statements: { statements: statements || [], answers: [] }
      }
    }
    case QuestionaireActionType.CHANGE_QUESTIONAIRE_NAME:
    case QuestionaireActionType.CREATE_QUESTIONAIRE:
    case QuestionaireActionType.GET_QUESTIONAIRE:
    default:
      return state
  }
}