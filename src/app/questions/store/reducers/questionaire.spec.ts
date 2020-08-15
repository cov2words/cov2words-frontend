import { initialState, questionaireReducer } from "./questionaire"
import { initialStateCategories } from "./category"
import {
  GetQuestionaireSuccess,
  ChangeQuestionaireName,
  CreateQuestionaire,
  AddCategory,
  DeleteCategory,
  EditCategory,
  MoveQuestion,
  MoveQuestionDnD
} from "../actions/questionaire"
import { AddQuestion, DeleteQuestion } from "../actions/question"


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
  })
})

describe("questionaireReducer", () => {
  it("should return initialState", () => {
    expect(questionaireReducer(undefined, { type: undefined, payload: undefined }))
      .toEqual(initialState)
  })
  it("should handle GetQuestionareSuccess", () => {
    let action = new GetQuestionaireSuccess({
      questionaire: {
        metadata: {
          owner: "",
          uuid: "",
          name: "",
          categories: []
        },
        questions: [{uuid: "miau", id: "x1", text: "", category: "a", inputType: "radio"}],
        statements: [],
        conditions: []
      }
    })
    expect(questionaireReducer(undefined, action))
      .toEqual({ owner: "", uuid: "", name: "", categories: [], questions: ["miau"] })
  })
  it("should handle GetQuestionareSuccess, no categories", () => {
    let action = new GetQuestionaireSuccess({
      questionaire: {
        metadata: {
          owner: "",
          uuid: "",
          name: ""
        },
        questions: [],
        statements: [],
        conditions: []
      }
    })
    expect(questionaireReducer(undefined, action))
      .toEqual({ owner: "", uuid: "", name: "", categories: [], questions: [] })
  })
  it("should handle ChangeQuestionaireName", () => {
    let action = new ChangeQuestionaireName({ name: "foo" })
    expect(questionaireReducer(undefined, action))
      .toEqual({
        name: 'foo',
        owner: '',
        uuid: '',
        categories: [],
        questions: []
      })
  })
  it("should handle CreateQuestionaire", () => {
    let action = new CreateQuestionaire({name: "foo", owner: "bar", uuid: "baz"})
    expect(questionaireReducer(undefined, action))
      .toEqual({
        owner: "bar", uuid: "baz", name: "foo", categories: [], questions: []
      })
  })
  it("should handle AddCategory", () => {
    let action = new AddCategory({value: "woot"})
    expect(questionaireReducer(undefined, action))
      .toEqual({
        owner: "", uuid: "", name: "", categories: ["woot"], questions: []
      })
  })
  it("should handle DeleteCategory", () => {
    let action = new DeleteCategory({index: 1})
    let state = Object.assign({}, initialState, {categories: ["foo", "bar", "baz"]})
    expect(questionaireReducer(state, action))
      .toEqual({
        owner: "", uuid: "", name: "", categories: ["foo", "baz"], questions: []
      })
  })
  it("should handle EditCategory", () => {
    let action = new EditCategory({index: 1, value: "blin"})
    let state = Object.assign({}, initialState, {categories: ["foo", "bar", "baz"]})
    expect(questionaireReducer(state, action))
      .toEqual({
        owner: "", uuid: "", name: "", categories: ["foo", "blin", "baz"], questions: []
      })
  })
  it("should handle AddQuestion", () => {
    let action = new AddQuestion({question: {uuid: "foo"}})
    expect(questionaireReducer(undefined, action))
      .toEqual({
        name: '',
        owner: '',
        uuid: '',
        categories: [],
        questions: ["foo"]
      })
  })
  it("should handle DeleteQuestion", () => {
    let action = new DeleteQuestion({uuid: "foo"})
    let state = Object.assign({}, initialState, {questions: ["foo", "bar", "baz"]})
    expect(questionaireReducer(state, action))
      .toEqual({
        owner: "", uuid: "", name: "", categories: [], questions: ["bar", "baz"]
      })
  })
  it("should handle MoveQuestion, down", () => {
    let action = new MoveQuestion({uuid: "foo", direction: 1})
    let state = Object.assign({}, initialState, {questions: ["foo", "bar", "baz"]})
    expect(questionaireReducer(state, action))
      .toEqual({
        owner: "", uuid: "", name: "", categories: [], questions: ["bar", "foo", "baz"]
      })
  })
  it("should handle MoveQuestion, up", () => {
    let action = new MoveQuestion({uuid: "baz", direction: -1})
    let state = Object.assign({}, initialState, {questions: ["foo", "bar", "baz"]})
    expect(questionaireReducer(state, action))
      .toEqual({
        owner: "", uuid: "", name: "", categories: [], questions: ["foo", "baz", "bar"]
      })
  })
  it("should handle MoveQuestion, cant move up", () => {
    let action = new MoveQuestion({uuid: "foo", direction: -1})
    let state = Object.assign({}, initialState, {questions: ["foo", "bar", "baz"]})
    expect(questionaireReducer(state, action))
      .toEqual(state)
  })
  it("should handle MoveQuestion, cant move down", () => {
    let action = new MoveQuestion({uuid: "baz", direction: 1})
    let state = Object.assign({}, initialState, {questions: ["foo", "bar", "baz"]})
    expect(questionaireReducer(state, action))
      .toEqual(state)
  })
  it("should handle MoveQuestionDnD", () => {
    let action = new MoveQuestionDnD({dragIndex: 0, dropIndex: 1})
    let state = Object.assign({}, initialState, {questions: ["foo", "bar", "baz"]})
    expect(questionaireReducer(state, action))
      .toEqual({
        owner: "", uuid: "", name: "", categories: [], questions: ["bar", "foo", "baz"]
      })
  })
})