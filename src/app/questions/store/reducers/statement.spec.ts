import { initialState, statementsReducer } from "./statement"
import {
  AddStatement, DeleteStatement, ChangeStatementAttribute
} from "../actions/statement"
import { AddCondition, DeleteCondition } from "../actions/condition"
import { GetQuestionaireSuccess } from "../actions/questionaire"

describe("initialState", () => {
  it("has expexted keys & values", () => {
    expect(initialState).toEqual([])
  })
})

describe("statementsReducer", () => {
  it("ignores random action", () => {
    let action = { type: undefined, payload: undefined }
    expect(statementsReducer(undefined, action)).toEqual(initialState)
  })
  it("should handle AddStatement", () => {
    let action = new AddStatement({statement: {uuid:"foo"}})
    expect(statementsReducer(undefined, action)).toEqual([{uuid: "foo"}])
  })
  it("should handle DeleteStatement", () => {
    let action = new DeleteStatement({statement: {uuid:"foo"}})
    let state = [{uuid: "foo"}, {uuid: "bar"}]
    expect(statementsReducer(state, action)).toEqual([{uuid: "bar"}])
  })
  it("should handle ChangeStatementAttribute", () => {
    let action = new ChangeStatementAttribute({
      uuid: "foo", attr: "bar", value: "baz"
    })
    let state = [{uuid: "foo"}, {uuid: "bar"}]
    expect(statementsReducer(state, action)).toEqual([
      {uuid: "foo", bar: "baz"},
      {uuid: "bar"}
    ])
  })
  it("should handle AddCondition", () => {
    let action = new AddCondition({condition: {uuid: "blin"}, statementUUID: "foo"})
    let state = [{uuid: "foo", conditions: []}, {uuid: "bar", conditions: ["miau"]}]
    expect(statementsReducer(state, action)).toEqual([
      {uuid: "foo", conditions: ["blin"]},
      {uuid: "bar", conditions: ["miau"]}
    ])
  })
  it("should handle DeleteCondition", () => {
    let action = new DeleteCondition({uuid: "miau", statementUUID: "bar"})
    let state = [{uuid: "foo", conditions: []}, {uuid: "bar", conditions: ["miau"]}]
    expect(statementsReducer(state, action)).toEqual([
      {uuid: "foo", conditions: []},
      {uuid: "bar", conditions: []}
    ])
  })
  it("should handle GetQuestionaireSuccess, no statements", () => {
    let action = new GetQuestionaireSuccess({
      questionaire: {
        metadata: {
          uuid: "",
          name: "",
          owner: "",
          categories: []
        },
        questions: [],
        statements: [{uuid: "foo", conditions: []}, {uuid: "bar"}],
        conditions: []
      }
    })
    expect(statementsReducer(undefined, action)).toEqual([
      {uuid: "foo", conditions: []},
      {uuid: "bar", conditions: []}
    ])
  })
  it("should handle GetQuestionaireSuccess, no statements", () => {
    let action = new GetQuestionaireSuccess({
      questionaire: {
        metadata: {
          uuid: "",
          name: "",
          owner: "",
          categories: []
        },
        questions: [],
        statements: undefined,
        conditions: []
      }
    })
    expect(statementsReducer(undefined, action)).toEqual([
      
    ])
  })
})