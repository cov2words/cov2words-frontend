import {
  QuestionairesActionType, GetQuestionaires,
  GetQuestionairesSuccess, GetQuestionairesFailure
} from "./questionaires"

describe("QuestionairesActionType", () => {
  let expectedActionTypes = [
    "GET_QUESTIONAIRES", "GET_QUESTIONAIRES_SUCCESS", "GET_QUESTIONAIRES_FAILURE"
  ]
  it.each(Object.values(QuestionairesActionType))("%s", (actionType => {
    expect(expectedActionTypes).toContain(actionType)
  }))
  it.each(expectedActionTypes)("%s", (actionType => {
    expect(QuestionairesActionType.hasOwnProperty(actionType)).toBeTruthy()
  }))
})

describe("GetQuestionaires", () => {
  it("has expected properties", () => {
    let action = new GetQuestionaires({email: "foo"})
    expect(action.hasOwnProperty("type")).toBeTruthy()
    expect(action.type).toEqual(QuestionairesActionType.GET_QUESTIONAIRES)
    expect(action.hasOwnProperty("payload")).toBeTruthy()
    expect(action.payload.hasOwnProperty("email")).toBeTruthy()
    expect(action.payload.email).toEqual("foo")
  })
})

describe("GetQuestionairesSuccess", () => {
  it("has expected properties", () => {
    let action = new GetQuestionairesSuccess([])
    expect(action.hasOwnProperty("type")).toBeTruthy()
    expect(action.type).toEqual(QuestionairesActionType.GET_QUESTIONAIRES_SUCCESS)
    expect(action.hasOwnProperty("payload")).toBeTruthy()
  })
})

describe("GetQuestionairesFailure", () => {
  it("has expected properties", () => {
    let action = new GetQuestionairesFailure("blin")
    expect(action.hasOwnProperty("type")).toBeTruthy()
    expect(action.type).toEqual(QuestionairesActionType.GET_QUESTIONAIRES_FAILURE)
    expect(action.hasOwnProperty("payload")).toBeTruthy()
    expect(action.payload).toEqual("blin")
  })
})