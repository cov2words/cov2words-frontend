import { StatementsActions, StatementsActionType } from "../actions/statement"

export interface initialStateStatements {
  statements: any[],
  answers: any[]
}

export const initialStateStatements = {
  statements: [],
  answers: []
}

export const statementsReducer = (state: initialStateStatements = initialStateStatements, action: StatementsActions) => {

  switch (action.type) {
    case StatementsActionType.ADD_STATEMENT: {
      let { statement } = action.payload
      return {
        ...state,
        statements: [...state.statements, statement]
      }
    }

    case StatementsActionType.DELETE_STATEMENT: {
      let { statementUUID } = action.payload
      return {
        ...state,
        statements: state.statements.filter(s => s.uuid !== statementUUID)
      }
    }

    case StatementsActionType.RENAME_STATEMENT: {
      let { statementUUID, name } = action.payload
      return {
        ...state,
        statements: state.statements.map(s => s.uuid === statementUUID ? Object.assign({}, s, { name }) : s)
      }
    }

    case StatementsActionType.ADD_CONDITION: {

      let { statementUUID, condition } = action.payload

      let statements = [...state.statements]
      let sIndex = statements.findIndex(s => s.uuid === statementUUID)

      let conditions = [...statements[sIndex].conditions].concat(condition)

      let updatedStatement = Object.assign({}, statements[sIndex], { conditions })

      statements[sIndex] = updatedStatement

      return {
        ...state,
        statements: [...statements]
      }
    }

    case StatementsActionType.RENAME_CONDITION: {
      let { statementUUID, conditionUUID, name } = action.payload
      return {
        ...state,
        statements: state.statements.map(s => s.uuid !== statementUUID
          ? s
          : Object.assign({}, s, {
            conditions: s.conditions.map(c => c.uuid !== conditionUUID
              ? c
              : Object.assign({}, c, { name })
            )
          })
        )
      }
    }

    case StatementsActionType.UPDATE_STATEMENT_TRUETEXT: {
      let { value, statementUUID } = action.payload
      let statements = state.statements.map(s => s.uuid !== statementUUID ? s : Object.assign({}, s, { trueText: value }))
      return {
        ...state,
        statements: [...statements]
      }
    }

    case StatementsActionType.UPDATE_STATEMENT_FALSETEXT: {
      let { value, statementUUID } = action.payload
      let statements = state.statements.map(s => s.uuid !== statementUUID ? s : Object.assign({}, s, { falseText: value }))
      return {
        ...state,
        statements: [...statements]
      }
    }

    case StatementsActionType.CHANGE_OPERAND: {
      let { operand, statementUUID, conditionUUID } = action.payload

      let statements = state.statements.map(s => {
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

      let statements = state.statements.map(s => {
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

      let statements = state.statements.map(s => {
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

      return {
        ...state,
        statements: state.statements.map(s => s.uuid !== statementUUID
          ? s
          : Object.assign({}, s, {
            conditions: s.conditions.map(c => c.uuid !== conditionUUID
              ? c
              : Object.assign({}, c, { value })
            )
          })
        )
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