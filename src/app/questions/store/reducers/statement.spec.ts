import { initialState, statementsReducer } from "./statement"
import {
  AddStatement, DeleteStatement, RenameStatement, AddCondition,
  UpdateStatementTrueText, UpdateStatementFalseText, ChangeSelected, ChangeConditionAttribute, ChangeAnswer
} from "../actions/statement"

describe("initialState", () => {
  it("has expexted keys & values", () => {
    expect(initialState.hasOwnProperty("statements")).toBeTruthy()
    expect(initialState.hasOwnProperty("answers")).toBeTruthy()
    expect(initialState).toEqual({ statements: [], answers: [] })
  })
})

describe("statementsReducer", () => {
  let populatedState
  beforeEach(() => {
    populatedState = {
      answers: [],
      statements: [
        {
          uuid: "foo",
          conditions: [
            { uuid: "bar" },
            { uuid: "baz" }
          ]
        },
        {
          uuid: "woot",
          conditions: []
        }
      ]
    }
  })
  it("ignores random action", () => {
    let action = { type: undefined, payload: undefined }
    expect(statementsReducer(undefined, action)).toEqual(initialState)
  })
  it("should handle AddStatement", () => {
    let action = new AddStatement({ statement: "foo" })
    expect(statementsReducer(undefined, action)).toEqual({ statements: ["foo"], answers: [] })
  })
  it("should handle DeleteStatement", () => {
    let action = new DeleteStatement({ statementUUID: "foo" })
    let state = { answers: [], statements: [{ uuid: "foo" }] }
    expect(statementsReducer(state, action)).toEqual({ answers: [], statements: [] })
  })
  it("should handle RenameStatement", () => {
    let action = new RenameStatement({ statementUUID: "foo", name: "bar" })
    expect(statementsReducer(populatedState, action)).toEqual({
      answers: [],
      statements: [{ uuid: "foo", name: "bar", conditions: [{ uuid: "bar" }, { uuid: "baz" }] }, { uuid: "woot", conditions: [] }]
    })
  })
  it("should handle AddCondition", () => {
    let action = new AddCondition({ condition: { uuid: "blin" }, statementUUID: "foo" })
    expect(statementsReducer(populatedState, action)).toEqual({
      answers: [],
      statements: [{ uuid: "foo", conditions: [{ uuid: "bar" }, { uuid: "baz" }, { uuid: "blin" }] }, { uuid: "woot", conditions: [] }]
    })
  })
  it("should handle UpdateStatementTrueText", () => {
    let action = new UpdateStatementTrueText({ value: "blin", statementUUID: "foo" })
    expect(statementsReducer(populatedState, action)).toEqual({
      answers: [],
      statements: [
        { uuid: "foo", conditions: [{uuid: "bar"}, {uuid: "baz"}], trueText: "blin" },
        { uuid: "woot", conditions: [] }
      ]
    })
  })
  it("should handle UpdateStatementFalseText", () => {
    let action = new UpdateStatementFalseText({ value: "blin", statementUUID: "foo" })
    expect(statementsReducer(populatedState, action)).toEqual({
      answers: [],
      statements: [
        { uuid: "foo", conditions: [{ uuid: "bar" }, { uuid: "baz" }], falseText: "blin" },
        { uuid: "woot", conditions: [] }
      ]
    })
  })
  it("should handle ChangeSelected", () => {
    let action = new ChangeSelected({ selected: ["mi", "au"], conditionUUID: "bar", statementUUID: "foo" })
    expect(statementsReducer(populatedState, action)).toEqual({
      answers: [],
      statements: [
        {
          uuid: "foo",
          conditions: [
            { uuid: "bar", selected: [["mi", "au"]] },
            { uuid: "baz" }
          ]
        },
        {
          uuid: "woot",
          conditions: []
        }
      ]
    })
  })
  it("should handle ChangeConditionAttribute", () => {
    let action = new ChangeConditionAttribute(
      { attr: "name", value: "blin", conditionUUID: "bar", statementUUID: "foo" }
    )
    expect(statementsReducer(populatedState, action)).toEqual({
      answers: [],
      statements: [
        {
          uuid: "foo",
          conditions: [
            { uuid: "bar", name: "blin" },
            { uuid: "baz" }
          ]
        },
        {
          uuid: "woot",
          conditions: []
        }
      ]
    })
  })
  it("should handle ChangeAnswer", () => {
    let action = new ChangeAnswer({ index: 0, answer: "miau" })
    let state = { statements: [], answers: ["wuff", "blubb"] }
    expect(statementsReducer(state, action)).toEqual({
      statements: [],
      answers: ["miau", "blubb"]
    })
  })
})