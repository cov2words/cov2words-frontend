import { ConditionActions, ConditionActionType } from "../actions/condition"
import { QuestionaireActionType } from "../actions/questionaire"
import { StatementsActionType } from "../actions/statement"

export interface ConditionValue {
  val: string | number,
  display: string | number
}

export interface Condition {
  uuid: string,
  name: string,
  operand: string,
  selected: string[],
  value: ConditionValue,//string | number,
  combination?: string
}

export type InitialStateConditions = Condition[]

export const initialState = []

export function conditionReducer(state: InitialStateConditions = initialState, action: ConditionActions) {
  switch(action.type) {
    case ConditionActionType.ADD_CONDITION: {
      let { condition } = action.payload
      return [...state, condition]
    }

    case ConditionActionType.DELETE_CONDITION: {
      let { uuid } = action.payload
      let conditions = state.filter(condition => condition.uuid !== uuid)
      return conditions.map((c,i) => {
        if (i === conditions.length - 1) {
          let { combination, ...condition } = c
          return condition
        } else {
          return c
        }
      })
    }

    case ConditionActionType.CHANGE_CONDITION_ATTRIBUTE: {
      let { uuid, attr, value } = action.payload
      return state.map(condition => condition.uuid !== uuid
        ? condition
        : Object.assign({}, condition, {[attr]: value})
      )
    }
    
    case ConditionActionType.CHANGE_CONDITION_SELECTED: {
      let { uuid, value } = action.payload
      return state.map(condition => condition.uuid !== uuid
        ? condition
        : Object.assign({}, condition, {selected: value, value: {val: '', display: ''}})
      )
    }

    case QuestionaireActionType.GET_QUESTIONAIRE_SUCCESS: {
      let conditions = action.payload.questionaire.conditions || []
      conditions = conditions.map(c => c.hasOwnProperty("selected") ? c : Object.assign({}, c, {selected: []}))

      return conditions
    }

    case QuestionaireActionType.CREATE_QUESTIONAIRE: {
      return initialState
    }

    case StatementsActionType.DELETE_STATEMENT: {
      let { conditions } = action.payload.statement
      return state.filter(condition => !conditions.includes(condition.uuid))

    }

    default:
      return state
  }
}