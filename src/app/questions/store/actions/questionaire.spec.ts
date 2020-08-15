import {
  QuestionaireActionType, GetQuestionaire, GetQuestionaireSuccess,
  GetQuestionaireFailure, SetQuestionaire, SetQuestionaireSuccess,
  SetQuestionaireFailure, ChangeQuestionaireName, CreateQuestionaire,
  AddCategory, DeleteCategory, EditCategory, AddQuestion,
  DeleteQuestion, MoveQuestion, MoveQuestionDnD
} from "./questionaire"


describe("QuestionaireActionType", () => {
  let expectedActionTypes = [
    "GET_QUESTIONAIRE", "GET_QUESTIONAIRE_SUCCESS", "GET_QUESTIONAIRE_FAILURE",
    "SET_QUESTIONAIRE", "SET_QUESTIONAIRE_SUCCESS", "SET_QUESTIONAIRE_FAILURE",
    "CHANGE_QUESTIONAIRE_NAME", "CREATE_QUESTIONAIRE", "ADD_CATEGORY",
    "DELETE_CATEGORY", "EDIT_CATEGORY", "ADD_QUESTION", "DELETE_QUESTION",
    "MOVE_QUESTION", "MOVE_QUESTION_DND"
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
      statements: [],
      conditions: []
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
    let action = new SetQuestionaire({questionaire: "foo", questions: [], statements: [], conditions: []})
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

describe("AddCategory", () => {
  it("has expected properties", () => {
    let action = new AddCategory({value: "foo"})
    expect(action.hasOwnProperty("type")).toBeTruthy()
    expect(action.type).toEqual(QuestionaireActionType.ADD_CATEGORY)
    expect(action.hasOwnProperty("payload")).toBeTruthy()
    expect(action.payload.hasOwnProperty("value")).toBeTruthy()
    expect(action.payload.value).toEqual("foo")
  })
})

describe("DeleteCategory", () => {
  it("has expected properties", () => {
    let action = new DeleteCategory({index: 42})
    expect(action.hasOwnProperty("type")).toBeTruthy()
    expect(action.type).toEqual(QuestionaireActionType.DELETE_CATEGORY)
    expect(action.hasOwnProperty("payload")).toBeTruthy()
    expect(action.payload.hasOwnProperty("index")).toBeTruthy()
    expect(action.payload.index).toEqual(42)
  })
})

describe("EditCategory", () => {
  it("has expected properties", () => {
    let action = new EditCategory({index: 42, value: "*"})
    expect(action.hasOwnProperty("type")).toBeTruthy()
    expect(action.type).toEqual(QuestionaireActionType.EDIT_CATEGORY)
    expect(action.hasOwnProperty("payload")).toBeTruthy()
    expect(action.payload.hasOwnProperty("index")).toBeTruthy()
    expect(action.payload.index).toEqual(42)
    expect(action.payload.hasOwnProperty("value")).toBeTruthy()
    expect(action.payload.value).toEqual("*")
  })
})

describe("AddQuestion", () => {
  it("has expected properties", () => {
    let action = new AddQuestion({question: 42})
    expect(action.hasOwnProperty("type")).toBeTruthy()
    expect(action.type).toEqual(QuestionaireActionType.ADD_QUESTION)
    expect(action.hasOwnProperty("payload")).toBeTruthy()
    expect(action.payload.hasOwnProperty("question")).toBeTruthy()
    expect(action.payload.question).toEqual(42)
  })
})

describe("DeleteQuestion", () => {
  it("has expected properties", () => {
    let action = new DeleteQuestion({uuid: "foo"})
    expect(action.hasOwnProperty("type")).toBeTruthy()
    expect(action.type).toEqual(QuestionaireActionType.DELETE_QUESTION)
    expect(action.hasOwnProperty("payload")).toBeTruthy()
    expect(action.payload.hasOwnProperty("uuid")).toBeTruthy()
    expect(action.payload.uuid).toEqual("foo")
  })
})

describe("MoveQuestion", () => {
  it("has expected properties", () => {
    let action = new MoveQuestion({uuid: "foo", direction: 1})
    expect(action.hasOwnProperty("type")).toBeTruthy()
    expect(action.type).toEqual(QuestionaireActionType.MOVE_QUESTION)
    expect(action.hasOwnProperty("payload")).toBeTruthy()
    expect(action.payload.hasOwnProperty("uuid")).toBeTruthy()
    expect(action.payload.uuid).toEqual("foo")
    expect(action.payload.hasOwnProperty("direction")).toBeTruthy()
    expect(action.payload.direction).toEqual(1)
  })
})

describe("MoveQuestionDnD", () => {
  it("has expected properties", () => {
    let action = new MoveQuestionDnD({dragIndex:1, dropIndex: 2})
    expect(action.hasOwnProperty("type")).toBeTruthy()
    expect(action.type).toEqual(QuestionaireActionType.MOVE_QUESTION_DND)
    expect(action.hasOwnProperty("payload")).toBeTruthy()
    expect(action.payload.hasOwnProperty("dragIndex")).toBeTruthy()
    expect(action.payload.dragIndex).toEqual(1)
    expect(action.payload.hasOwnProperty("dropIndex")).toBeTruthy()
    expect(action.payload.dropIndex).toEqual(2)
  })
})