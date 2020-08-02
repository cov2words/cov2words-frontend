import {
  QuestionaireActionType, GetQuestionaire, GetQuestionaireSuccess,
  GetQuestionaireFailure, SetQuestionaire, SetQuestionaireSuccess,
  SetQuestionaireFailure, ChangeQuestionaireName, CreateQuestionaire
} from "./questionaire"


describe("QuestionsActionType", () => {
  let expectedActionTypes = [
    "GET_QUESTIONAIRE", "GET_QUESTIONAIRE_SUCCESS", "GET_QUESTIONAIRE_FAILURE",
    "SET_QUESTIONAIRE", "SET_QUESTIONAIRE_SUCCESS", "SET_QUESTIONAIRE_FAILURE",
    "CHANGE_QUESTIONAIRE_NAME", "CREATE_QUESTIONAIRE"
  ]
  it.each(Object.values(QuestionaireActionType))("%s", (actionType => {
    expect(expectedActionTypes).toContain(actionType)
  }))
  it.each(expectedActionTypes)("%s", (actionType => {
    expect(QuestionaireActionType.hasOwnProperty(actionType)).toBeTruthy()
  }))
})

describe("GetQuestionaire", () => {
  it("has expected properties", () => {
    let action = new GetQuestionaire({questionaireUUID: "foo"})
    expect(action.hasOwnProperty("type")).toBeTruthy()
    expect(action.type).toEqual(QuestionaireActionType.GET_QUESTIONAIRE)
    expect(action.hasOwnProperty("payload")).toBeTruthy()
    expect(action.payload.hasOwnProperty("questionaireUUID")).toBeTruthy()
    expect(action.payload.questionaireUUID).toEqual("foo")
  })
})

describe("GetQuestionaireSuccess", () => {
  it("has expected properties", () => {
    let questionaire = {
      metadata: {
        owner: "foo",
        name: "bar",
        uuid: "baz"
      },
      questions: [],
      statements: []
    }
    let action = new GetQuestionaireSuccess({
      questionaire
    })
    expect(action.hasOwnProperty("type")).toBeTruthy()
    expect(action.type).toEqual(QuestionaireActionType.GET_QUESTIONAIRE_SUCCESS)
    expect(action.hasOwnProperty("payload")).toBeTruthy()
    expect(action.payload.hasOwnProperty("questionaire")).toBeTruthy()
    expect(action.payload.questionaire).toEqual(questionaire)
  })
})


describe("GetQuestionaireFailure", () => {
  it("has expected properties", () => {
    let action = new GetQuestionaireFailure("fail")
    expect(action.hasOwnProperty("type")).toBeTruthy()
    expect(action.type).toEqual(QuestionaireActionType.GET_QUESTIONAIRE_FAILURE)
    expect(action.hasOwnProperty("payload")).toBeTruthy()
    expect(action.payload).toEqual("fail")
  })
})

describe("SetQuestionaire", () => {
  it("has expected properties", () => {
    let action = new SetQuestionaire({questionaire: "foo", questions: [], statements: []})
    expect(action.hasOwnProperty("type")).toBeTruthy()
    expect(action.type).toEqual(QuestionaireActionType.SET_QUESTIONAIRE)
    expect(action.hasOwnProperty("payload")).toBeTruthy()
    expect(action.payload.hasOwnProperty("questionaire")).toBeTruthy()
    expect(action.payload.questionaire).toEqual("foo")
    expect(action.payload.hasOwnProperty("questionaire")).toBeTruthy()
    expect(action.payload.questions).toEqual([])
    expect(action.payload.hasOwnProperty("statements")).toBeTruthy()
    expect(action.payload.statements).toEqual([])
  })
})

describe("SetQuestionaireSuccess", () => {
  it("has expected properties", () => {
    let action = new SetQuestionaireSuccess("success")
    expect(action.hasOwnProperty("type")).toBeTruthy()
    expect(action.type).toEqual(QuestionaireActionType.SET_QUESTIONAIRE_SUCCESS)
    expect(action.hasOwnProperty("payload")).toBeTruthy()
    expect(action.payload).toEqual("success")
  })
})

describe("SetQuestionaireFailure", () => {
  it("has expected properties", () => {
    let action = new SetQuestionaireFailure("fail")
    expect(action.hasOwnProperty("type")).toBeTruthy()
    expect(action.type).toEqual(QuestionaireActionType.SET_QUESTIONAIRE_FAILURE)
    expect(action.hasOwnProperty("payload")).toBeTruthy()
    expect(action.payload).toEqual("fail")
  })
})

describe("ChangeQuestionaireName", () => {
  it("has expected properties", () => {
    let action = new ChangeQuestionaireName({name: "foo"})
    expect(action.hasOwnProperty("type")).toBeTruthy()
    expect(action.type).toEqual(QuestionaireActionType.CHANGE_QUESTIONAIRE_NAME)
    expect(action.hasOwnProperty("payload")).toBeTruthy()
    expect(action.payload.hasOwnProperty("name")).toBeTruthy()
    expect(action.payload.name).toEqual("foo")
  })
})

describe("CreateQuestionaire", () => {
  it("has expected properties", () => {
    let action = new CreateQuestionaire({name: "foo", owner: "bar", uuid: "baz"})
    expect(action.hasOwnProperty("type")).toBeTruthy()
    expect(action.type).toEqual(QuestionaireActionType.CREATE_QUESTIONAIRE)
    expect(action.hasOwnProperty("payload")).toBeTruthy()
    expect(action.payload.hasOwnProperty("name")).toBeTruthy()
    expect(action.payload.name).toEqual("foo")
    expect(action.payload.hasOwnProperty("owner")).toBeTruthy()
    expect(action.payload.owner).toEqual("bar")
    expect(action.payload.hasOwnProperty("uuid")).toBeTruthy()
    expect(action.payload.uuid).toEqual("baz")
  })
})