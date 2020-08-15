import { initialState, conditionReducer } from "./condition"
import { AddCondition, DeleteCondition, ChangeConditionAttribute } from "../actions/condition"
import { GetQuestionaireSuccess } from "../actions/questionaire"
import { DeleteStatement } from "../actions/statement"

describe("conditionReducer", () => {
  let populatedState
  beforeEach(() => {
    populatedState = [
      {
        uuid: "foo",
        name: "A",
        operand: "!=",
        selected: [],
        value: 123
      },
      {
        uuid: "miau",
        name: "B",
        operand: "==",
        selected: [],
        value: "blin"
      }
    ]
  })
  it("should return initialState", () => {
    expect(conditionReducer(undefined, {type: undefined, payload: undefined}))
      .toEqual(initialState)
  })
  it("should handle AddCondition", () => {
    let action = new AddCondition({condition: {uuid: "baz"}, statementUUID: "foo"})
    expect(conditionReducer(undefined, action)).toEqual([
      {uuid: "baz"}
    ])
  })
  it("should handle DeleteCondition", () => {
    let action = new DeleteCondition({uuid: "foo", statementUUID: "bar"})
    
    expect(conditionReducer(populatedState, action)).toEqual([
      {
        uuid: "miau",
        name: "B",
        operand: "==",
        selected: [],
        value: "blin"
      }
    ])
  })
  it("should handle ChangeConditionAttribute", () => {
    let action = new ChangeConditionAttribute({uuid: "foo", attr: "name", value: "A1", statementUUID: "blin"})
    expect(conditionReducer(populatedState, action)).toEqual([
      {
        uuid: "foo",
        name: "A1",
        operand: "!=",
        selected: [],
        value: 123
      },
      {
        uuid: "miau",
        name: "B",
        operand: "==",
        selected: [],
        value: "blin"
      }
    ])
  })
  it("should handle GetQuestionaireSuccess", () => {
    let action = new GetQuestionaireSuccess({
      questionaire: {
        metadata: {
          uuid: "",
          name: "",
          owner: "",
          categories: []
        },
        questions: [],
        statements: [],
        conditions: [{uuid: "foo", selected: ["x"]}]
      }
    })
    expect(conditionReducer(undefined, action)).toEqual([
      {uuid: "foo", selected: ["x"]}
    ])
  })
  it("should handle GetQuestionaireSuccess, no selected", () => {
    let action = new GetQuestionaireSuccess({
      questionaire: {
        metadata: {
          uuid: "",
          name: "",
          owner: "",
          categories: []
        },
        questions: [],
        statements: [],
        conditions: [{uuid: "foo"}]
      }
    })
    expect(conditionReducer(undefined, action)).toEqual([
      {uuid: "foo", selected: []}
    ])
  })
  it("should handle GetQuestionaireSuccess, no conditions", () => {
    let action = new GetQuestionaireSuccess({
      questionaire: {
        metadata: {
          uuid: "",
          name: "",
          owner: "",
          categories: []
        },
        questions: [],
        statements: [],
        conditions: undefined
      }
    })
    expect(conditionReducer(undefined, action)).toEqual([])
  })
  it("should handle DeleteStatement", () => {
    let action = new DeleteStatement({statement: {uuid: "blin", conditions: ["foo"]}})
    expect(conditionReducer(populatedState, action)).toEqual([
      {
        uuid: "miau",
        name: "B",
        operand: "==",
        selected: [],
        value: "blin"
      }
    ])
  })
})