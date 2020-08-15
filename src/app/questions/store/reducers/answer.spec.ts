import { initialState, answerReducer } from "./answer"
import { GetQuestionaireSuccess } from "../actions/questionaire"
import { ChangeAnswer } from "../actions/answer"

describe("initialState", () => {
  it("has expexted keys & values", () => {
    expect(initialState).toEqual([])
  })
})

describe("answerReducer", () => {
  it("should return initialState", () => {
    let action = {type: undefined, payload: undefined}
    expect(answerReducer(undefined, action)).toEqual(initialState)
  })
  it("should handle GetQuestioniareSuccess", () => {
    let action = new GetQuestionaireSuccess({
      questionaire: {
        metadata: {
          uuid: "",
          name: "",
          owner: "",
          categories: [],
        },
        questions: [],
        statements: [{uuid: "foo"}, {uuid: "bar"}],
        conditions: []
      }
    })
    expect(answerReducer(undefined, action)).toEqual(["", ""])
  })
  it("should handle GetQuestioniareSuccess, no statements", () => {
    let action = new GetQuestionaireSuccess({
      questionaire: {
        metadata: {
          uuid: "",
          name: "",
          owner: "",
          categories: [],
        },
        questions: [],
        statements: undefined,
        conditions: []
      }
    })
    expect(answerReducer(undefined, action)).toEqual([])
  })
  it("should handle ChangeAnswer", () => {
    let action = new ChangeAnswer({index: 0, answer: "blin"})
    let state = ["foo", "bar"]
    expect(answerReducer(state, action)).toEqual(["blin", "bar"])
  })
})