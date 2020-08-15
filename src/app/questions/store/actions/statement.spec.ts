import {
  StatementsActionType,
  AddStatement,
  DeleteStatement,
  ChangeStatementAttribute
} from "./statement"

describe("QuestionairesActionType", () => {
  let expectedActionTypes = [
    "ADD_STATEMENT", "DELETE_STATEMENT", "CHANGE_STATEMENT_ATTRIBUTE"
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
    let action = new AddStatement({statement: "bar"})
    expect(action.hasOwnProperty("type")).toBeTruthy()
    expect(action.type).toEqual(StatementsActionType.ADD_STATEMENT)
    expect(action.hasOwnProperty("payload")).toBeTruthy()
    expect(action.payload.hasOwnProperty("statement")).toBeTruthy()
    expect(action.payload.statement).toEqual("bar")
  })
})

describe("DeleteStatement", () => {
  it("has expected properties", () => {
    let action = new DeleteStatement({statement: "bar"})
    expect(action.hasOwnProperty("type")).toBeTruthy()
    expect(action.type).toEqual(StatementsActionType.DELETE_STATEMENT)
    expect(action.hasOwnProperty("payload")).toBeTruthy()
    expect(action.payload.hasOwnProperty("statement")).toBeTruthy()
    expect(action.payload.statement).toEqual("bar")
  })
})

describe("ChangeStatementAttribute", () => {
  it("has expected properties", () => {
    let action = new ChangeStatementAttribute({
      uuid: "foo", attr: "bar", value: "baz"
    })
    expect(action.hasOwnProperty("type")).toBeTruthy()
    expect(action.type).toEqual(StatementsActionType.CHANGE_STATEMENT_ATTRIBUTE)
    expect(action.hasOwnProperty("payload")).toBeTruthy()
    expect(action.payload.hasOwnProperty("uuid")).toBeTruthy()
    expect(action.payload.uuid).toEqual("foo")
    expect(action.payload.hasOwnProperty("attr")).toBeTruthy()
    expect(action.payload.attr).toEqual("bar")
    expect(action.payload.hasOwnProperty("value")).toBeTruthy()
    expect(action.payload.value).toEqual("baz")
  })
})