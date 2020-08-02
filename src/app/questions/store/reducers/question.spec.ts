import { initialState, questionsReducer } from "./question"
import { DeleteOption, AddOption, ChangeOptionText } from "../actions/option"
import { optionsReducer } from "./option"
import { AddQuestion, DeleteQuestion, MoveQuestion, MoveQuestionDnD, ChangeQuestionAttribute, ChangeNextQuestion, DeleteNextQuestionMap, AddNextQuestionMap } from "../actions/question"

describe("initialState", () => {
  it("should have expected keys & values", () => {
    expect(initialState).toEqual([])
  })
})

describe("questionReducer", () => {
  let populatedState
  beforeEach(() => {
    populatedState = [
      {uuid: "foo", options: ["a", "b"], nextQuestionMap: ["bla", "blo"]},
      {uuid: "bar", options: []}
    ]
  })
  it("should return initialState", () => {
    expect(questionsReducer(undefined, {type: undefined, payload: undefined}))
      .toEqual(initialState)
  })
  it("should handle DeleteOption", () => {
    let action = new DeleteOption({uuid: "foo", index: 0})
    expect(questionsReducer(populatedState, action))
      .toEqual([
        {uuid: "foo", options: optionsReducer(["a", "b"], action), nextQuestionMap: ["bla", "blo"]},
        {uuid: "bar", options: []}
      ])
  })
  it("should handle AddOption", () => {
    let action = new AddOption({uuid: "bar", option: "bla"})
    expect(questionsReducer(populatedState, action))
      .toEqual([
        {uuid: "foo", options: ["a", "b"], nextQuestionMap: ["bla", "blo"]},
        {uuid: "bar", options: optionsReducer([], action)}
      ])
  })
  it("should handle ChangeOptionText", () => {
    let action = new ChangeOptionText({uuid: "foo", index: 1, text: "x"})
    expect(questionsReducer(populatedState, action))
      .toEqual([
        {uuid: "foo", options:  optionsReducer(["a", "b"], action), nextQuestionMap: ["bla", "blo"]},
        {uuid: "bar", options: []}
      ])
  })
  it("should handle AddQuestion", () => {
    let action = new AddQuestion({question: {uuid: "bla"}})
    expect(questionsReducer(undefined, action))
      .toEqual([
        {uuid: "bla"}
      ])
  })
  it("should handle DeleteQuestion", () => {
    let action = new DeleteQuestion({uuid: "foo"})
    expect(questionsReducer(populatedState, action))
      .toEqual([{uuid: "bar", options: []}])
  })
  it("should handle MoveQuestion downwards", () => {
    let action = new MoveQuestion({uuid: "foo", direction: 1})
    expect(questionsReducer(populatedState, action))
      .toEqual([
        {uuid: "bar", options: []},
        {uuid: "foo", options: ["a", "b"], nextQuestionMap: ["bla", "blo"]}
      ])
  })
  it("should handle MoveQuestion downwards ignore", () => {
    let action = new MoveQuestion({uuid: "bar", direction: 1})
    expect(questionsReducer(populatedState, action))
      .toEqual(populatedState)
  })
  it("should handle MoveQuestion upwards", () => {
    let action = new MoveQuestion({uuid: "bar", direction: -1})
    expect(questionsReducer(populatedState, action))
      .toEqual([
        {uuid: "bar", options: []},
        {uuid: "foo", options: ["a", "b"], nextQuestionMap: ["bla", "blo"]}
      ])
  })
  it("should handle MoveQuestion upwards ignore", () => {
    let action = new MoveQuestion({uuid: "foo", direction: -1})
    expect(questionsReducer(populatedState, action))
      .toEqual(populatedState)
  })
  it("should handle MoveQuestionDnD", () => {
    let action = new MoveQuestionDnD({dragIndex: 0, dropIndex: 1})
    expect(questionsReducer(populatedState, action))
      .toEqual([
        {uuid: "bar", options: []},
        {uuid: "foo", options: ["a", "b"], nextQuestionMap: ["bla", "blo"]}
      ])
  })
  it("should handle ChangeQuestionAttribute", () => {
    let action = new ChangeQuestionAttribute({
      uuid: "foo", attr: "name", value:"baz"
    })
    expect(questionsReducer(populatedState, action))
      .toEqual([
        {uuid: "foo", options: ["a", "b"], name: "baz", nextQuestionMap: ["bla", "blo"]},
        {uuid: "bar", options: []}
      ])
  })
  it("should handle ChangeNextQuestion", () => {
    let action = new ChangeNextQuestion({
      uuid: "foo", index: 0, nextQuestion: "blin"
    })
    expect(questionsReducer(populatedState, action))
      .toEqual([
        {uuid: "foo", options: ["a", "b"], nextQuestionMap: ["blin", "blo"]},
        {uuid: "bar", options: []}
      ])
  })
  it("should handle ChangeNextQuestion early return", () => {
    let action = new ChangeNextQuestion({
      uuid: "foo", index: 0, nextQuestion: "bla"
    })
    expect(questionsReducer(populatedState, action))
      .toEqual(populatedState)
  })
  it("should handle DeleteNextQuestionMap", () => {
    let action = new DeleteNextQuestionMap({uuid: "foo"})
    expect(questionsReducer(populatedState, action))
      .toEqual([
        {uuid: "foo", options: ["a", "b"]},
        {uuid: "bar", options: []}
      ])
  })
  it("should handle AddNextQuestionMap", () => {
    let action = new AddNextQuestionMap({uuid: "bar"})
    expect(questionsReducer(populatedState, action))
      .toEqual([
        {uuid: "foo", options: ["a", "b"], nextQuestionMap: ["bla", "blo"]},
        {uuid: "bar", options: [], nextQuestionMap: []}
      ])
  })
})