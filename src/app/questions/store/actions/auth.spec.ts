import { AuthActionType, SetUser } from "./auth"

describe("AuthActionType", () => {
  let expectedActionTypes = ["SET_USER"]
  it.each(Object.values(AuthActionType))("%s", (actionType => {
    expect(expectedActionTypes).toContain(actionType)
  }))
  it.each(expectedActionTypes)("%s", (actionType => {
    expect(AuthActionType.hasOwnProperty(actionType)).toBeTruthy()
  }))
})

describe("SetUser", () => {
  it("has expected properties", () => {
    let action = new SetUser({user: "hero"})
    expect(action.hasOwnProperty("type")).toBeTruthy()
    expect(action.type).toEqual(AuthActionType.SET_USER)
    expect(action.hasOwnProperty("payload")).toBeTruthy()
    expect(action.payload.hasOwnProperty("user")).toBeTruthy()
    expect(action.payload.user).toEqual("hero")
  })
})