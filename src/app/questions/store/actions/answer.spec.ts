import { AnswerActionType, ChangeAnswer } from "./answer"

describe("AnswerActionType", () => {
  let expectedActionTypes = ["CHANGE_ANSWER"]
  it.each(Object.values(AnswerActionType))("%s", (actionType => {
    expect(expectedActionTypes).toContain(actionType)
  }))
  it.each(expectedActionTypes)("%s", (actionType => {
    expect(AnswerActionType.hasOwnProperty(actionType)).toBeTruthy()
  }))
})

describe("ChangeAnswer", () => {
  it("has expected properties", () => {
    let action = new ChangeAnswer({index: 1337, answer: "foo"})
    expect(action.hasOwnProperty("type")).toBeTruthy()
    expect(action.type).toEqual(AnswerActionType.CHANGE_ANSWER)
    expect(action.hasOwnProperty("payload")).toBeTruthy()
    expect(action.payload.hasOwnProperty("index")).toBeTruthy()
    expect(action.payload.index).toEqual(1337)
    expect(action.payload.hasOwnProperty("answer")).toBeTruthy()
    expect(action.payload.answer).toEqual("foo")
  })
})