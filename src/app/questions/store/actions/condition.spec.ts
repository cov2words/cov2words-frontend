import {
  ConditionActionType,
  AddCondition,
  DeleteCondition,
  ChangeConditionAttribute
} from "./condition"

describe("CategoryActionType", () => {
  let expectedActionTypes = [
    "ADD_CONDITION", "DELETE_CONDITION", "CHANGE_CONDITION_ATTRIBUTE"
  ]
  it.each(Object.values(ConditionActionType))("%s", (actionType => {
    expect(expectedActionTypes).toContain(actionType)
  }))
  it.each(expectedActionTypes)("%s", (actionType => {
    expect(ConditionActionType.hasOwnProperty(actionType)).toBeTruthy()
  }))
})

describe("AddCondition", () => {
  it("has expected properties", () => {
    let action = new AddCondition({condition: "foo", statementUUID: "bar"})
    expect(action.hasOwnProperty("type")).toBeTruthy()
    expect(action.type).toEqual(ConditionActionType.ADD_CONDITION)
    expect(action.hasOwnProperty("payload")).toBeTruthy()
    expect(action.payload.hasOwnProperty("condition")).toBeTruthy()
    expect(action.payload.condition).toEqual("foo")
    expect(action.payload.hasOwnProperty("statementUUID")).toBeTruthy()
    expect(action.payload.statementUUID).toEqual("bar")
  })
})

describe("DeleteCondition", () => {
  it("has expected properties", () => {
    let action = new DeleteCondition({uuid: "foo", statementUUID: "bar"})
    expect(action.hasOwnProperty("type")).toBeTruthy()
    expect(action.type).toEqual(ConditionActionType.DELETE_CONDITION)
    expect(action.hasOwnProperty("payload")).toBeTruthy()
    expect(action.payload.hasOwnProperty("uuid")).toBeTruthy()
    expect(action.payload.uuid).toEqual("foo")
    expect(action.payload.hasOwnProperty("statementUUID")).toBeTruthy()
    expect(action.payload.statementUUID).toEqual("bar")
  })
})

describe("ChangeConditionAttribute", () => {
  it("has expected properties", () => {
    let action = new ChangeConditionAttribute({
      attr: "foo", value: "bar", uuid: "baz", statementUUID:"blin"
    })
    expect(action.hasOwnProperty("type")).toBeTruthy()
    expect(action.type).toEqual(ConditionActionType.CHANGE_CONDITION_ATTRIBUTE)
    expect(action.hasOwnProperty("payload")).toBeTruthy()
    expect(action.payload.hasOwnProperty("attr")).toBeTruthy()
    expect(action.payload.attr).toEqual("foo")
    expect(action.payload.hasOwnProperty("value")).toBeTruthy()
    expect(action.payload.value).toEqual("bar")
    expect(action.payload.hasOwnProperty("uuid")).toBeTruthy()
    expect(action.payload.uuid).toEqual("baz")
    expect(action.payload.hasOwnProperty("statementUUID")).toBeTruthy()
    expect(action.payload.statementUUID).toEqual("blin")
  })
})