import { initialState, questionaireReducer } from "./questionaire"
import { initialStateCategories, categoriesReducer } from "./category"
import { initialState as initialStateStatements, statementsReducer } from "./statement"
import { AddCategory, DeleteCategory, EditCategory } from "../actions/category"
import {
  AddStatement,
  DeleteStatement,
  RenameStatement,
  AddCondition,
  UpdateStatementTrueText,
  UpdateStatementFalseText,
  ChangeSelected,
  ChangeAnswer,
  ChangeConditionAttribute
} from "../actions/statement"
import { AddQuestion, DeleteQuestion, MoveQuestion, MoveQuestionDnD, ChangeQuestionAttribute, ChangeNextQuestion, DeleteNextQuestionMap, AddNextQuestionMap } from "../actions/question"
import { questionsReducer } from "./question"
import { AddOption, DeleteOption, ChangeOptionText } from "../actions/option"
import { GetQuestionaireSuccess } from "../actions/questionaire"


describe("initialState", () => {
  it("has expected keys & values", () => {
    expect(initialState.hasOwnProperty("name")).toBeTruthy()
    expect(initialState.name).toEqual('')
    expect(initialState.hasOwnProperty("owner")).toBeTruthy()
    expect(initialState.owner).toEqual('')
    expect(initialState.hasOwnProperty("uuid")).toBeTruthy()
    expect(initialState.uuid).toEqual('')
    expect(initialState.hasOwnProperty("categories")).toBeTruthy()
    expect(initialState.categories).toEqual(initialStateCategories)
    expect(initialState.hasOwnProperty("questions")).toBeTruthy()
    expect(initialState.questions).toEqual([])
    expect(initialState.hasOwnProperty("statements")).toBeTruthy()
    expect(initialState.statements).toEqual(initialStateStatements)
  })
})

describe("questionaireReducer", () => {
  let populatedState
  beforeEach(() => {
    populatedState = {
      name: '',
      owner: '',
      uuid: '',
      categories: initialStateCategories,
      questions: [
        {uuid: "foo", nextQuestionMap: ["wtf"], options: ["wuff"]}
      ],
      statements: {
        statements: [{uuid: "foo", conditions: []}],
        answers: []
      }
    }
  })
  it("should ingore random action", () => {
    expect(questionaireReducer(undefined, { type: undefined, payload: undefined })).toEqual(initialState)
  })
  it("should handle AddCategory", () => {
    let action = new AddCategory({ value: "blubb" })
    let expectedState = Object.assign(
      {}, populatedState,
      { categories: categoriesReducer(populatedState.categories, action) })
    expect(questionaireReducer(populatedState, action))
      .toEqual(expectedState)
  })
  it("should handle DeleteCategory", () => {
    let action = new DeleteCategory({ index: 0 })
    let expectedState = Object.assign(
      {}, initialState,
      { categories: categoriesReducer(initialStateCategories, action) })
    expect(questionaireReducer(undefined, action))
      .toEqual(expectedState)
  })
  it("should handle EditCategory", () => {
    let action = new EditCategory({ index: 0, value: "foo" })
    let expectedState = Object.assign(
      {}, initialState,
      { categories: categoriesReducer(undefined, action) }
    )
    expect(questionaireReducer(undefined, action))
      .toEqual(expectedState)
  })
  it("should handle AddStatment", () => {
    let action = new AddStatement({ statement: { uuid: "foo" } })
    let expectedState = Object.assign(
      {}, initialState,
      { statements: statementsReducer(undefined, action) }
    )
    expect(questionaireReducer(undefined, action))
      .toEqual(expectedState)
  })
  it("should handle DeleteStatement", () => {
    let action = new DeleteStatement({ statementUUID: "foo" })
    let expectedState = Object.assign(
      {}, initialState,
      { statements: statementsReducer(undefined, action) }
    )
    expect(questionaireReducer(undefined, action))
      .toEqual(expectedState)
  })
  it("should handle RenameStatement", () => {
    let action = new RenameStatement({ statementUUID: "foo", name: "bar" })
    let expectedState = Object.assign(
      {}, initialState,
      { statements: statementsReducer(undefined, action) }
    )
    expect(questionaireReducer(undefined, action))
      .toEqual(expectedState)
  })
  it("should handle AddCondition", () => {
    let action = new AddCondition({ condition: { uuid: "blin" }, statementUUID: "foo" })
    let expectedState = Object.assign(
      {}, populatedState,
      { statements: statementsReducer(populatedState.statements, action) }
    )
    expect(questionaireReducer(populatedState, action))
      .toEqual(expectedState)
  })
  /* it("should handle DeleteConditon", () => {

  }) */
  it("should handle UpdateStatementTrueText", () => {
    let action = new UpdateStatementTrueText({ value: "brrr", statementUUID: "foo" })
    let expectedState = Object.assign(
      {}, initialState,
      { statements: statementsReducer(undefined, action) }
    )
    expect(questionaireReducer(undefined, action))
      .toEqual(expectedState)
  })
  it("should handle UpdateStatementFalseText", () => {
    let action = new UpdateStatementFalseText({ value: "brrr", statementUUID: "foo" })
    let expectedState = Object.assign(
      {}, initialState,
      { statements: statementsReducer(undefined, action) }
    )
    expect(questionaireReducer(undefined, action))
      .toEqual(expectedState)
  })
  it("should handle ChangeSelected", () => {
    let action = new ChangeSelected({selected: ["a", "c"], conditionUUID: "baz", statementUUID: "foo"})
    let expectedState = Object.assign(
      {}, populatedState,
      {statements: statementsReducer(populatedState.statements, action)}
    )
    expect(questionaireReducer(populatedState, action))
      .toEqual(expectedState)
  })
  it("should handle ChangeAnswer", () => {
    let action = new ChangeAnswer({index: 0, answer: "miau"})
    let expectedState = Object.assign(
      {}, initialState,
      {statements: statementsReducer(initialState.statements, action)}
    )
    expect(questionaireReducer(undefined, action))
      .toEqual(expectedState)
  })
  it("should handle ChangeConditionAttribute", () => {
    let action = new ChangeConditionAttribute({
      attr: "name", value: "blin", conditionUUID: "bar", statementUUID: "foo"
    })
    let expectedState = Object.assign(
      {}, initialState,
      {statements: statementsReducer(initialState.statements, action)}
    )
    expect(questionaireReducer(undefined, action))
      .toEqual(expectedState)
  })
  it("should handle AddQuestion", () => {
    let action = new AddQuestion({question: {uuid: "woot", name: "qwerty"}})
    let expectedState = Object.assign(
      {}, initialState,
      {questions: questionsReducer(initialState.questions, action)}
    )
    expect(questionaireReducer(undefined, action))
      .toEqual(expectedState)
  })
  it("should handle DeleteQuestion", () => {
    let action = new DeleteQuestion({uuid: "xuxu"})
    let expectedState = Object.assign(
      {}, initialState,
      {questions: questionsReducer(initialState.questions, action)}
    )
    expect(questionaireReducer(undefined, action))
      .toEqual(expectedState)
  })
  it("should handle MoveQuestion", () => {
    let action = new MoveQuestion({uuid: "blin", direction: 1})
    let expectedState = Object.assign(
      {}, initialState,
      {questions: questionsReducer(initialState.questions, action)}
    )
    expect(questionaireReducer(undefined, action))
      .toEqual(expectedState)
  })
  it("should handle MoveQuestionDnD", () => {
    let action = new MoveQuestionDnD({dragIndex: 0, dropIndex: 1})
    let expectedState = Object.assign(
      {}, initialState,
      {questions: questionsReducer(initialState.questions, action)}
    )
    expect(questionaireReducer(undefined, action))
      .toEqual(expectedState)
  })
  it("should handle ChangeQuestioNAttribute", () => {
    let action = new ChangeQuestionAttribute({
      attr: "name", value: "wuff", uuid: "blin"
    })
    let expectedState = Object.assign(
      {}, initialState,
      {questions: questionsReducer(initialState.questions, action)}
    )
    expect(questionaireReducer(undefined, action))
      .toEqual(expectedState)
  })
  it("should handle ChangeNextQuestion", () => {
    let action = new ChangeNextQuestion({uuid: "foo", index: 0, nextQuestion: "blin"})
    let expectedState = Object.assign(
      {}, populatedState,
      {questions: questionsReducer(populatedState.questions, action)}
    )
    expect(questionaireReducer(populatedState, action))
      .toEqual(expectedState)
  })
  it("should handle DeleteNextQuestionMap", () => {
    let action = new DeleteNextQuestionMap({uuid: "foo"})
    let expectedState = Object.assign(
      {}, populatedState,
      {questions: questionsReducer(populatedState.questions, action)}
    )
    expect(questionaireReducer(populatedState, action))
      .toEqual(expectedState)
  })
  it("should handle AddNextQuestionMap", () => {
    let action = new AddNextQuestionMap({uuid: "foo"})
    let expectedState = Object.assign(
      {}, populatedState,
      {questions: questionsReducer(populatedState.questions, action)}
    )
    expect(questionaireReducer(populatedState, action))
      .toEqual(expectedState)
  })
  it("should handle AddOption", () => {
    let action = new AddOption({uuid: "foo", option: "miau"})
    let expectedState = Object.assign(
      {}, populatedState,
      {questions: questionsReducer(populatedState.questions, action)}
    )
    expect(questionaireReducer(populatedState, action))
      .toEqual(expectedState)
  })
  it("should handle DeleteOption", () => {
    let action = new DeleteOption({uuid: "foo", index: 0})
    let expectedState = Object.assign(
      {}, populatedState,
      {questions: questionsReducer(populatedState.questions, action)}
    )
    expect(questionaireReducer(populatedState, action))
      .toEqual(expectedState)
  })
  it("should handle ChangeOptionText", () => {
    let action = new ChangeOptionText({uuid: "foo", index: 0, text: "asd"})
    let expectedState = Object.assign(
      {}, populatedState,
      {questions: questionsReducer(populatedState.questions, action)}
    )
    expect(questionaireReducer(populatedState, action))
      .toEqual(expectedState)
  })
  it("should handle GetQuestionaireSuccess", () => {
    let questions = [
      {
        inputType: "radio",
        id: "A1",
        category: "misc",
        text: "lorem ipsum",
        uuid: "blin",
        options: [],
        nextQuestionMap: []
      },
      {
        inputType: "radio",
        id: "A2",
        category: "misc",
        text: "fooblyat",
        uuid: "miau",
        options: undefined,
        nextQuestionMap: undefined
      },
      {
        inputType: "date",
        id: "A3",
        category: "trash",
        text: "foobaro",
        uuid: "qwety",
        options: undefined,
        nextQuestionMap: undefined
      }
    ]
    let action = new GetQuestionaireSuccess({questionaire: {
      metadata: {name: "", owner:"", uuid:""},
      questions: questions,
      statements: []
    }})
    let expectedState = Object.assign(
      {}, initialState,
      {questions: questions.map(q => q.options == undefined && q.inputType == "radio"
        ? Object.assign({}, q, {options: []})
        : q
      )}
    )
    expect(questionaireReducer(undefined, action))
      .toEqual(expectedState)
  })
  it("should handle GetQuestionareSuccess with categories no statements", () => {
    let action = new GetQuestionaireSuccess({questionaire: {
      statements: undefined,
      questions: [],
      metadata: {
        categories: ["bla"],
        name: "blubb",
        owner: "me",
        uuid: "asdf"
      }
    }})
    expect(questionaireReducer(undefined, action))
      .toEqual({
        categories: ["bla"],
        name: "blubb",
        owner: "me", 
        questions: [], 
        statements: {answers: [], statements: []}, uuid: "asdf"
      })
  })
})