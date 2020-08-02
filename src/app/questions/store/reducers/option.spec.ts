import { optionsReducer } from "./option"
import { DeleteOption, AddOption, ChangeOptionText } from "../actions/option"

describe("optionsReducer", () => {
  it("should ignore random action", () => {
    expect(optionsReducer([], {type: undefined, payload: undefined})).toEqual([])
  })
  it("should handle DeleteOption", () => {
    let action = new DeleteOption({uuid: "wtf", index: 0})
    expect(optionsReducer(["blin", "foo"], action)).toEqual(["foo"])
  })
  it("should handle AddOption", () => {
    let action = new AddOption({uuid: "foo", option: "baz"})
    expect(optionsReducer(["blin"], action)).toEqual(["blin", "baz"])
  })
  it("should handle ChangeOptionText", () => {
    let action = new ChangeOptionText({uuid: "foo", index: 0, text: "baz"})
    expect(optionsReducer(["bar", "blin"], action)).toEqual(["baz", "blin"])
  })
})