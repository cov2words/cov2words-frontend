import { AuthActions, AuthActionType } from "../actions/auth"

export const initialStateAuth = {}

export function authReducer(state=initialStateAuth, action: AuthActions) {
  switch (action.type) {
    case AuthActionType.SET_USER: {
      let { user } = action.payload
      return {
        ...user
      }
    }
    default:
      return state
  }
}