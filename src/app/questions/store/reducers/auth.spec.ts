import { initialStateAuth, authReducer } from "./auth"
import { SetUser } from "../actions/auth"

describe("initialStateAuth", () => {
  it("has expected keys & values", () => {
    expect(initialStateAuth).toEqual({})
  })
})

describe("authReducer", () => {
  it("default returns initialState", () => {
    expect(authReducer(undefined, {type: undefined, payload: undefined})).toEqual({})
  })
  it("should handle SetUser", () => {
    let action = new SetUser({user: {name: "foo"}})
    expect(authReducer({}, action)).toEqual({name:"foo"})
  })
})