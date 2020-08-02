import { initialState, questionairesReducer } from "./questionaires"
import {
  GetQuestionaires, GetQuestionairesSuccess, GetQuestionairesFailure
} from "../actions/questionaires"

describe("initialState", () => {
  it("has expected keys & values", () => {
    expect(initialState).toEqual([])
  })
})

describe("questionairesReducer", () => {
  it("ignores random action", () => {
    expect(questionairesReducer(undefined, {type: undefined, payload: undefined})).toEqual(initialState)
  })
  it("should handle GetQuestionaires", () => {
    let action = new GetQuestionaires({email: "blin"})
    expect(questionairesReducer([], action)).toEqual([])
  })
  it("should handle GetQuestionairesSuccess", () => {
    let action = new GetQuestionairesSuccess(
      [{metadata: {uuid: "foo", owner: "bar", name: "baz"}, questions: [], statements: []}]
    )
    expect(questionairesReducer(undefined, action)).toEqual([{uuid: "foo", name: "baz"}])
  })
  it("should handle GetQuestionairesFailure", () => {
    let action = new GetQuestionairesFailure("blin")
    expect(questionairesReducer(undefined, action)).toEqual([])
  })
})