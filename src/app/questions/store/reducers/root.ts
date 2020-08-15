import { combineReducers } from "@ngrx/store"
import { authReducer } from "./auth"
import { questionairesReducer } from "./questionaires"
import { questionaireReducer } from "./questionaire"
import { questionsReducer } from "./question"
import { statementsReducer } from "./statement"
import { conditionReducer } from "./condition"
import { answerReducer } from "./answer"


export const rootReducer = combineReducers({
  auth: authReducer,
  questionaires: questionairesReducer,
  questionaire: questionaireReducer,
  questions: questionsReducer,
  statements: statementsReducer,
  conditions: conditionReducer,
  answers: answerReducer
})


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
      case 'LOGOUT': {
        return initialState
      }
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