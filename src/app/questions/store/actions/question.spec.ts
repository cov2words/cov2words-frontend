import {
  QuestionsActionType, AddQuestion, DeleteQuestion, MoveQuestion,
  MoveQuestionDnD, ChangeQuestionAttribute, ChangeNextQuestion,
  DeleteNextQuestionMap, AddNextQuestionMap
} from "./question"

describe("QuestionsActionType", () => {
  let expectedActionTypes = [
    "ADD_QUESTION", "DELETE_QUESTION", "MOVE_QUESTION", "MOVE_QUESTION_DND",
    "CHANGE_QUESTION_ATTRIBUTE", "CHANGE_NEXT_QUESTION",
    "DELETE_NEXT_QUESTIONMAP", "ADD_NEXT_QUESTIONMAP"
  ]
  it.each(Object.values(QuestionsActionType))("%s", (actionType => {
    expect(expectedActionTypes).toContain(actionType)
  }))
  it.each(expectedActionTypes)("%s", (actionType => {
    expect(QuestionsActionType.hasOwnProperty(actionType)).toBeTruthy()
  }))
})

describe("AddQuestion", () => {
  it("has expected properties", () => {
    let action = new AddQuestion({ question: { uuid: "foo", index: 1337 } })
    expect(action.hasOwnProperty("type")).toBeTruthy()
    expect(action.type).toEqual(QuestionsActionType.ADD_QUESTION)
    expect(action.hasOwnProperty("payload")).toBeTruthy()
    expect(action.payload.hasOwnProperty("question")).toBeTruthy()
    expect(action.payload.question).toEqual({ uuid: "foo", index: 1337 })
  })
})

describe("DeleteQuestion", () => {
  it("has expected properties", () => {
    let action = new DeleteQuestion({ uuid: "foo" })
    expect(action.hasOwnProperty("type")).toBeTruthy()
    expect(action.type).toEqual(QuestionsActionType.DELETE_QUESTION)
    expect(action.hasOwnProperty("payload")).toBeTruthy()
    expect(action.payload.hasOwnProperty("uuid")).toBeTruthy()
    expect(action.payload.uuid).toEqual("foo")
  })
})

describe("MoveQuestion", () => {
  it("has expected properties", () => {
    let action = new MoveQuestion({ uuid: "foo", direction: 1 })
    expect(action.hasOwnProperty("type")).toBeTruthy()
    expect(action.type).toEqual(QuestionsActionType.MOVE_QUESTION)
    expect(action.hasOwnProperty("payload")).toBeTruthy()
    expect(action.payload.hasOwnProperty("uuid")).toBeTruthy()
    expect(action.payload.uuid).toEqual("foo")
    expect(action.payload.hasOwnProperty("direction")).toBeTruthy()
    expect(action.payload.direction).toEqual(1)
  })
})

describe("MoveQuestionDnD", () => {
  it("has expected properties", () => {
    let action = new MoveQuestionDnD({ dragIndex: 0, dropIndex: 1 })
    expect(action.hasOwnProperty("type")).toBeTruthy()
    expect(action.type).toEqual(QuestionsActionType.MOVE_QUESTION_DND)
    expect(action.hasOwnProperty("payload")).toBeTruthy()
    expect(action.payload.hasOwnProperty("dragIndex")).toBeTruthy()
    expect(action.payload.dragIndex).toEqual(0)
    expect(action.payload.hasOwnProperty("dropIndex")).toBeTruthy()
    expect(action.payload.dropIndex).toEqual(1)
  })
})

describe("ChangeQuestionAttribute", () => {
  it("has expected properties", () => {
    let action = new ChangeQuestionAttribute({ uuid: "foo", attr: "bar", value: "baz"})
    expect(action.hasOwnProperty("type")).toBeTruthy()
    expect(action.type).toEqual(QuestionsActionType.CHANGE_QUESTION_ATTRIBUTE)
    expect(action.hasOwnProperty("payload")).toBeTruthy()
    expect(action.payload.hasOwnProperty("uuid")).toBeTruthy()
    expect(action.payload.uuid).toEqual("foo")
    expect(action.payload.hasOwnProperty("attr")).toBeTruthy()
    expect(action.payload.attr).toEqual("bar")
    expect(action.payload.hasOwnProperty("value")).toBeTruthy()
    expect(action.payload.value).toEqual("baz")
  })
})

describe("ChangeNextQuestion", () => {
  it("has expected properties", () => {
    let action = new ChangeNextQuestion({ uuid: "foo", index: 1, nextQuestion: "bar" })
    expect(action.hasOwnProperty("type")).toBeTruthy()
    expect(action.type).toEqual(QuestionsActionType.CHANGE_NEXT_QUESTION)
    expect(action.hasOwnProperty("payload")).toBeTruthy()
    expect(action.payload.hasOwnProperty("uuid")).toBeTruthy()
    expect(action.payload.uuid).toEqual("foo")
    expect(action.payload.hasOwnProperty("index")).toBeTruthy()
    expect(action.payload.index).toEqual(1)
    expect(action.payload.hasOwnProperty("nextQuestion")).toBeTruthy()
    expect(action.payload.nextQuestion).toEqual("bar")
  })
})

describe("DeleteNextQuestionMap", () => {
  it("has expected properties", () => {
    let action = new DeleteNextQuestionMap({ uuid: "foo"})
    expect(action.hasOwnProperty("type")).toBeTruthy()
    expect(action.type).toEqual(QuestionsActionType.DELETE_NEXT_QUESTIONMAP)
    expect(action.hasOwnProperty("payload")).toBeTruthy()
    expect(action.payload.hasOwnProperty("uuid")).toBeTruthy()
    expect(action.payload.uuid).toEqual("foo")
  })
})

describe("AddNextQuestionMap", () => {
  it("has expected properties", () => {
    let action = new AddNextQuestionMap({ uuid: "foo"})
    expect(action.hasOwnProperty("type")).toBeTruthy()
    expect(action.type).toEqual(QuestionsActionType.ADD_NEXT_QUESTIONMAP)
    expect(action.hasOwnProperty("payload")).toBeTruthy()
    expect(action.payload.hasOwnProperty("uuid")).toBeTruthy()
    expect(action.payload.uuid).toEqual("foo")
  })
})