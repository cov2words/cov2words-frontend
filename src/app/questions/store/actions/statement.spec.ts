import {
  StatementsActionType,
  AddStatement,
  DeleteStatement,
  RenameStatement,
  AddCondition,
  UpdateStatementTrueText,
  UpdateStatementFalseText,
  ChangeConditionAttribute,
  ChangeSelected,
  ChangeAnswer
} from "./statement"

describe("QuestionairesActionType", () => {
  let expectedActionTypes = [
    "ADD_STATEMENT", "DELETE_STATEMENT", "RENAME_STATEMENT",
    "ADD_CONDITION", "DELETE_CONDITION", "UPDATE_STATEMENT_TRUETEXT",
    "UPDATE_STATEMENT_FALSETEXT", "CHANGE_CONDITION_ATTRIBUTE",
    "CHANGE_SELECTED", "CHANGE_ANSWER"
  ]
  it.each(Object.values(StatementsActionType))("%s", (actionType => {
    expect(expectedActionTypes).toContain(actionType)
  }))
  it.each(expectedActionTypes)("%s", (actionType => {
    expect(StatementsActionType.hasOwnProperty(actionType)).toBeTruthy()
  }))
})

describe("AddStatement", () => {
  it("has expected properties", () => {
    let action = new AddStatement({statement: "foo"})
    expect(action.hasOwnProperty("type")).toBeTruthy()
    expect(action.type).toEqual(StatementsActionType.ADD_STATEMENT)
    expect(action.hasOwnProperty("payload")).toBeTruthy()
    expect(action.payload.hasOwnProperty("statement")).toBeTruthy()
    expect(action.payload.statement).toEqual("foo")
  })
})

describe("DeleteStatement", () => {
  it("has expected properties", () => {
    let action = new DeleteStatement({statementUUID: "foo"})
    expect(action.hasOwnProperty("type")).toBeTruthy()
    expect(action.type).toEqual(StatementsActionType.DELETE_STATEMENT)
    expect(action.hasOwnProperty("payload")).toBeTruthy()
    expect(action.payload.hasOwnProperty("statementUUID")).toBeTruthy()
    expect(action.payload.statementUUID).toEqual("foo")
  })
})

describe("RenameStatement", () => {
  it("has expected properties", () => {
    let action = new RenameStatement({statementUUID: "foo", name: "bar"})
    expect(action.hasOwnProperty("type")).toBeTruthy()
    expect(action.type).toEqual(StatementsActionType.RENAME_STATEMENT)
    expect(action.hasOwnProperty("payload")).toBeTruthy()
    expect(action.payload.hasOwnProperty("statementUUID")).toBeTruthy()
    expect(action.payload.statementUUID).toEqual("foo")
    expect(action.payload.hasOwnProperty("name")).toBeTruthy()
    expect(action.payload.name).toEqual("bar")
  })
})

describe("AddCondition", () => {
  it("has expected properties", () => {
    let action = new AddCondition({statementUUID: "foo", condition: "bar"})
    expect(action.hasOwnProperty("type")).toBeTruthy()
    expect(action.type).toEqual(StatementsActionType.ADD_CONDITION)
    expect(action.hasOwnProperty("payload")).toBeTruthy()
    expect(action.payload.hasOwnProperty("statementUUID")).toBeTruthy()
    expect(action.payload.statementUUID).toEqual("foo")
    expect(action.payload.hasOwnProperty("condition")).toBeTruthy()
    expect(action.payload.condition).toEqual("bar")
  })
})

describe("UpdateStatementTrueText", () => {
  it("has expected properties", () => {
    let action = new UpdateStatementTrueText({statementUUID: "foo", value: "bar"})
    expect(action.hasOwnProperty("type")).toBeTruthy()
    expect(action.type).toEqual(StatementsActionType.UPDATE_STATEMENT_TRUETEXT)
    expect(action.hasOwnProperty("payload")).toBeTruthy()
    expect(action.payload.hasOwnProperty("statementUUID")).toBeTruthy()
    expect(action.payload.statementUUID).toEqual("foo")
    expect(action.payload.hasOwnProperty("value")).toBeTruthy()
    expect(action.payload.value).toEqual("bar")
  })
})

describe("UpdateStatementFalseText", () => {
  it("has expected properties", () => {
    let action = new UpdateStatementFalseText({statementUUID: "foo", value: "bar"})
    expect(action.hasOwnProperty("type")).toBeTruthy()
    expect(action.type).toEqual(StatementsActionType.UPDATE_STATEMENT_FALSETEXT)
    expect(action.hasOwnProperty("payload")).toBeTruthy()
    expect(action.payload.hasOwnProperty("statementUUID")).toBeTruthy()
    expect(action.payload.statementUUID).toEqual("foo")
    expect(action.payload.hasOwnProperty("value")).toBeTruthy()
    expect(action.payload.value).toEqual("bar")
  })
})

describe("ChangeConditionAttribute", () => {
  it("has expected properties", () => {
    let action = new ChangeConditionAttribute({
      statementUUID: "foo", conditionUUID: "bar", attr: "baz", value: "blin"
    })
    expect(action.hasOwnProperty("type")).toBeTruthy()
    expect(action.type).toEqual(StatementsActionType.CHANGE_CONDITION_ATTRIBUTE)
    expect(action.hasOwnProperty("payload")).toBeTruthy()
    expect(action.payload.hasOwnProperty("statementUUID")).toBeTruthy()
    expect(action.payload.statementUUID).toEqual("foo")
    expect(action.payload.hasOwnProperty("conditionUUID")).toBeTruthy()
    expect(action.payload.conditionUUID).toEqual("bar")
    expect(action.payload.hasOwnProperty("attr")).toBeTruthy()
    expect(action.payload.attr).toEqual("baz")
    expect(action.payload.hasOwnProperty("value")).toBeTruthy()
    expect(action.payload.value).toEqual("blin")
  })
})

describe("ChangeSelected", () => {
  it("has expected properties", () => {
    let action = new ChangeSelected({
      statementUUID: "foo", conditionUUID: "bar", selected: ["baz"]
    })
    expect(action.hasOwnProperty("type")).toBeTruthy()
    expect(action.type).toEqual(StatementsActionType.CHANGE_SELECTED)
    expect(action.hasOwnProperty("payload")).toBeTruthy()
    expect(action.payload.hasOwnProperty("statementUUID")).toBeTruthy()
    expect(action.payload.statementUUID).toEqual("foo")
    expect(action.payload.hasOwnProperty("conditionUUID")).toBeTruthy()
    expect(action.payload.conditionUUID).toEqual("bar")
    expect(action.payload.hasOwnProperty("selected")).toBeTruthy()
    expect(action.payload.selected).toEqual(["baz"])
  })
})

describe("ChangeAnswer", () => {
  it("has expected properties", () => {
    let action = new ChangeAnswer({answer: "foo", index: 1})
    expect(action.hasOwnProperty("type")).toBeTruthy()
    expect(action.type).toEqual(StatementsActionType.CHANGE_ANSWER)
    expect(action.hasOwnProperty("payload")).toBeTruthy()
    expect(action.payload.hasOwnProperty("answer")).toBeTruthy()
    expect(action.payload.answer).toEqual("foo")
    expect(action.payload.hasOwnProperty("index")).toBeTruthy()
    expect(action.payload.index).toEqual(1)
  })
})