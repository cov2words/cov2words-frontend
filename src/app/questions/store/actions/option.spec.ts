import { OptionsActionType, DeleteOption, AddOption, ChangeOptionText } from "./option"

describe("OptionsActionType", () => {
  let expectedActionTypes = ["DELETE_OPTION", "ADD_OPTION", "CHANGE_OPTION_TEXT"]
  it.each(Object.values(OptionsActionType))("%s", (actionType => {
    expect(expectedActionTypes).toContain(actionType)
  }))
  it.each(expectedActionTypes)("%s", (actionType => {
    expect(OptionsActionType.hasOwnProperty(actionType)).toBeTruthy()
  }))
})

describe("DeleteOption", () => {
  it("has expected properties", () => {
    let action = new DeleteOption({uuid: "foo", index: 1337})
    expect(action.hasOwnProperty("type")).toBeTruthy()
    expect(action.type).toEqual(OptionsActionType.DELETE_OPTION)
    expect(action.hasOwnProperty("payload")).toBeTruthy()
    expect(action.payload.hasOwnProperty("uuid")).toBeTruthy()
    expect(action.payload.uuid).toEqual("foo")
    expect(action.payload.hasOwnProperty("index")).toBeTruthy()
    expect(action.payload.index).toEqual(1337)
  })
})

describe("AddOption", () => {
  it("has expected properties", () => {
    let action = new AddOption({uuid: "foo", option: "bar"})
    expect(action.hasOwnProperty("type")).toBeTruthy()
    expect(action.type).toEqual(OptionsActionType.ADD_OPTION)
    expect(action.hasOwnProperty("payload")).toBeTruthy()
    expect(action.payload.hasOwnProperty("uuid")).toBeTruthy()
    expect(action.payload.uuid).toEqual("foo")
    expect(action.payload.hasOwnProperty("option")).toBeTruthy()
    expect(action.payload.option).toEqual("bar")
  })
})

describe("ChangeOptionText", () => {
  it("has expected properties", () => {
    let action = new ChangeOptionText({uuid: "foo", index: 1337, text: "bar"})
    expect(action.hasOwnProperty("type")).toBeTruthy()
    expect(action.type).toEqual(OptionsActionType.CHANGE_OPTION_TEXT)
    expect(action.hasOwnProperty("payload")).toBeTruthy()
    expect(action.payload.hasOwnProperty("uuid")).toBeTruthy()
    expect(action.payload.uuid).toEqual("foo")
    expect(action.payload.hasOwnProperty("index")).toBeTruthy()
    expect(action.payload.index).toEqual(1337)
    expect(action.payload.hasOwnProperty("text")).toBeTruthy()
    expect(action.payload.text).toEqual("bar")
  })
})