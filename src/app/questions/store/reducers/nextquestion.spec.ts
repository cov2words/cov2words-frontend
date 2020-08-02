import { nextQuestionReducer } from "./nextquestion"
import { DeleteOption, AddOption } from "../actions/option"

describe("nextQuestionReducer", () => {
  it("ignores random action", () => {
    let action = {type: undefined, payload: undefined}
    expect(nextQuestionReducer([], action)).toEqual([])
  })
  it("should handle DeleteOption", () => {
    let action = new DeleteOption({uuid: "wtf", index: 0})
    expect(nextQuestionReducer(["blin", "foo"], action)).toEqual(["foo"])
  })
  it("should handle AddOption", () => {
    let action = new AddOption({uuid: "foo", option: "bar"})
    expect(nextQuestionReducer(["blin"], action)).toEqual(["blin", ""])
  })
})