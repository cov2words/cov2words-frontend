import { StatementsActions, StatementsActionType } from "../actions/statement"

export const initialStateStatements = {
  statements: [],
  answers: []
}

export const statementsReducer = (state = initialStateStatements, action: StatementsActions) => {
  let statements, sIndex, conditionUUIDs
  switch (action.type) {
    case StatementsActionType.ADD_STATEMENT:
      return {
        ...state,
        statements: [...state.statements, action.payload.statement]
      }

    case StatementsActionType.ADD_CONDITION:
      statements = [...state.statements]
      sIndex = statements.findIndex(s => s.uuid === action.payload.statementUUID)

      let conditions = [...statements[sIndex].conditions].concat(action.payload.condition)

      let updatedStatement = Object.assign({}, statements[sIndex], { conditions })

      statements[sIndex] = updatedStatement

      return {
        ...state,
        statements: [...statements]
      }

    case StatementsActionType.UPDATE_STATEMENT_TRUETEXT: {
      let { value, statementUUID } = action.payload
      statements = state.statements.map(s => s.uuid !== statementUUID ? s : Object.assign({}, s, {trueText: value}))
      return {
        ...state,
        statements: [...statements]
      }
    }

    case StatementsActionType.UPDATE_STATEMENT_FALSETEXT: {
      let { value, statementUUID } = action.payload
      statements = state.statements.map(s => s.uuid !== statementUUID ? s : Object.assign({}, s, {falseText: value}))
      return {
        ...state,
        statements: [...statements]
      }
    }

    case StatementsActionType.CHANGE_OPERAND: {
      let { operand, statementUUID, conditionUUID } = action.payload

      let statements =  state.statements.map(s => {
        if (s.uuid !== statementUUID) {
          return s
        } else {
          let conditions = s.conditions.map(c => {
            if (c.uuid !== conditionUUID) {
              return c
            } else {
              return Object.assign({}, c, { operand })
            }
          })
          return Object.assign({}, s, { conditions })
        }
      })
      return {
        ...state,
        statements
      }
    }

    case StatementsActionType.CHANGE_COMBINATION: {

      let { combination, statementUUID, conditionUUID } = action.payload

      let statements =  state.statements.map(s => {
        if (s.uuid !== statementUUID) {
          return s
        } else {
          let conditions = s.conditions.map(c => {
            if (c.uuid !== conditionUUID) {
              return c
            } else {
              return Object.assign({}, c, { combination })
            }
          })
          return Object.assign({}, s, { conditions })
        }
      })
      return {
        ...state,
        statements
      }
    }
    case StatementsActionType.CHANGE_SELECTED: {
      let { selected, statementUUID, conditionUUID } = action.payload

      let statements =  state.statements.map(s => {
        if (s.uuid !== statementUUID) {
          return s
        } else {
          let conditions = s.conditions.map(c => {
            if (c.uuid !== conditionUUID) {
              return c
            } else {
              return Object.assign({}, c, { selected })
            }
          })
          return Object.assign({}, s, { conditions })
        }
      })
      return {
        ...state,
        statements
      }
    }

    case StatementsActionType.CHANGE_VALUE: {

      let { value, statementUUID, conditionUUID } = action.payload

      let statements =  state.statements.map(s => {
        if (s.uuid !== statementUUID) {
          return s
        } else {
          let conditions = s.conditions.map(c => {
            if (c.uuid !== conditionUUID) {
              return c
            } else {
              return Object.assign({}, c, { value })
            }
          })
          return Object.assign({}, s, { conditions })
        }
      })
      return {
        ...state,
        statements
      }
    }

    case StatementsActionType.CHANGE_ANSWER: {
      let answers = [...state.answers]
      answers[action.payload.index] = action.payload.answer
      return {
        ...state,
        answers
      }
    }

    default:
      return state
  }
}