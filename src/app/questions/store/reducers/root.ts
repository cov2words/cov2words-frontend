import { categoriesReducer } from "./category"
import { firebaseReducer } from "./firebase"
import { newQuestionReducer, initialStateNewQuestion } from "./newquestion"
import { nextQuestionReducer } from "./nextquestion"
import { optionsReducer } from "./option"
import { questionsReducer } from "./question"
import { statementsReducer, initialStateStatements } from "./statement"

import {
  RootActions,
  QuestionsActionType,
  FirebaseActionType,
  NewQuestionActionType,
  OptionsActionType,
  CategoriesActionType,
  StatementsActionType
} from '../actions/root'


export const initialState = {
  questionaires: [],
  questionaire: '',
  questions: [],
  message: '',
  newQuestionaireName: '',
  newQuestion: initialStateNewQuestion,
  statements: initialStateStatements
};


export function rootReducer(state = initialState, action: RootActions) {
  switch (action.type) {
    case FirebaseActionType.GET_QUESTIONAIRES:
    case FirebaseActionType.GET_QUESTIONAIRES_SUCCESS:
    case FirebaseActionType.GET_QUESTIONAIRES_FAILURE:
    case FirebaseActionType.GET_QUESTIONAIRE:
    case FirebaseActionType.GET_QUESTIONAIRE_SUCCESS:
    case FirebaseActionType.GET_QUESTIONAIRE_FAILURE:
    case FirebaseActionType.SET_QUESTIONAIRE:
    case FirebaseActionType.SET_QUESTIONAIRE_SUCCESS:
    case FirebaseActionType.SET_QUESTIONAIRE_FAILURE:
      return {
        ...state,
        ...firebaseReducer(state, action)
      }

    case CategoriesActionType.ADD_CATEGORY:
    case CategoriesActionType.DELETE_CATEGORY:
    case CategoriesActionType.EDIT_CATEGORY:
      return {
        ...state,
        questionaire: categoriesReducer(state.questionaire, action)
      }

    case QuestionsActionType.CHANGE_QUESTIONAIRE_NAME:
    case QuestionsActionType.CREATE_QUESTIONAIRE:
    case QuestionsActionType.ADD_QUESTION:
    case QuestionsActionType.DELETE_QUESTION:
    case QuestionsActionType.MOVE_QUESTION:
    case QuestionsActionType.MOVE_QUESTION_DND:
    case QuestionsActionType.CHANGE_QUESTION_ID:
    case QuestionsActionType.CHANGE_QUESTION_TEXT:
    case QuestionsActionType.CHANGE_QUESTION_CATEGORY:
    case QuestionsActionType.CHANGE_NEXT_QUESTION:
    case QuestionsActionType.DELETE_NEXT_QUESTIONMAP:
    case QuestionsActionType.ADD_NEXT_QUESTIONMAP:
      return {
        ...state,
        ...questionsReducer(state, action)
      }
    case NewQuestionActionType.CHANGE_NEWQUESTION_ATTRIBUTE:
      return {
        ...state,
        newQuestion: newQuestionReducer(state.newQuestion, action)
      }
    case OptionsActionType.DELETE_OPTION:
    case OptionsActionType.ADD_OPTION:
    case OptionsActionType.CHANGE_OPTION_TEXT:
      let { uuid } = action.payload
      let questions = [...state.questions]

      let questionIndex = questions.findIndex(question => question.uuid == uuid)
      let question = questions.find(question => question.uuid == uuid)
      let options = optionsReducer(question.options || [], action)
      // delete the nextquestion on the fly

      let updatedQuestion = question.nextQuestionMap !== undefined
        ? Object.assign({}, question, { options, nextQuestionMap: nextQuestionReducer(question.nextQuestionMap, action) })
        : Object.assign({}, question, { options })

      questions[questionIndex] = Object.assign({}, updatedQuestion)

      return {
        ...state,
        questions: [...questions],
        message: `options changed`
      }

    case StatementsActionType.ADD_STATEMENT:
    case StatementsActionType.UPDATE_NEWCONDITION_NAME:
    case StatementsActionType.UPDATE_STATEMENT_FALSETEXT:
    case StatementsActionType.UPDATE_STATEMENT_TRUETEXT:
    case StatementsActionType.ADD_CONDITION:
    case StatementsActionType.CHANGE_COMBINATION:
    case StatementsActionType.CHANGE_OPERAND:
    case StatementsActionType.CHANGE_SELECTED:
    case StatementsActionType.CHANGE_VALUE:
    case StatementsActionType.CHANGE_ANSWER:
      return {
        ...state,
        statements: statementsReducer(state.statements, action)
      }

    default:
      return state
  }
}

export function undoable(reducer) {
  // Call the reducer with empty action to populate the initial state
  const initialState = {
    past: [],
    present: reducer(undefined, {}),
    future: []
  }

  // Return a reducer that handles undo and redo
  return function (state = initialState, action) {
    const { past, present, future } = state

    switch (action.type) {
      case 'UNDO':
        const previous = past[past.length - 1]
        const newPast = past.slice(0, past.length - 1)
        return {
          past: newPast,
          present: previous,
          future: [present, ...future]
        }
      case 'REDO':
        const next = future[0]
        const newFuture = future.slice(1)
        return {
          past: [...past, present],
          present: next,
          future: newFuture
        }
      default:
        // Delegate handling the action to the passed reducer
        const newPresent = reducer(present, action)
        if (present === newPresent) {
          return state
        }
        return {
          past: [...past, present],
          present: newPresent,
          future: []
        }
    }
  }
}