import { StatementsActions, StatementsActionType } from "../actions/statement"
import { ConditionActionType } from "../actions/condition"
import { QuestionaireActionType } from "../actions/questionaire"

export type InitialStateStatements = any[]

export const initialState = []

export const statementsReducer = (state: InitialStateStatements = initialState, action: StatementsActions) => {

  switch (action.type) {
    case StatementsActionType.ADD_STATEMENT: {
      let { statement } = action.payload
      return [...state, statement]
    }

    case StatementsActionType.DELETE_STATEMENT: {
      let { statement } = action.payload
      return state.filter(s => s.uuid !== statement.uuid)
    }

    case StatementsActionType.CHANGE_STATEMENT_ATTRIBUTE: {
      let { uuid, attr, value } = action.payload
      return state.map(statement => statement.uuid !== uuid
        ? statement
        : Object.assign({}, statement, {[attr]: value}))
    }

    /* case StatementsActionType.MOVE_STATEMENT: {
      let { uuid, direction } = action.payload
      let questions = [...state.questions]
      let index = questions.findIndex(q => q === uuid)
      let newIndex = index + direction

      // question is first or last element. cant be moved outside
      if (newIndex < 0 || newIndex >= questions.length) {
        return state
      }
      questions.splice(newIndex, 0, questions.splice(index, 1)[0])
      return {
        ...state,
        questions
      }
    } */

    

    case ConditionActionType.ADD_CONDITION: {
      let { condition, statementUUID } = action.payload
      return state.map(statement => statement.uuid !== statementUUID
        ? statement
        : Object.assign({}, statement, {conditions: [...statement.conditions, condition.uuid]})
      )
    }

    case ConditionActionType.DELETE_CONDITION: {
      let { uuid, statementUUID } = action.payload
      return state.map(statement => statement.uuid !== statementUUID
        ? statement
        : Object.assign({}, statement, {conditions: statement.conditions.filter(c => c !== uuid)})
      )
    }

    case QuestionaireActionType.GET_QUESTIONAIRE_SUCCESS: {
      let statements = action.payload.questionaire.statements || []
      return statements.map(s => s.hasOwnProperty("conditions") ? s : Object.assign({}, s, {conditions: []}))
    }

    case QuestionaireActionType.CREATE_QUESTIONAIRE: {
      return initialState
    }

    default:
      return state
  }
}