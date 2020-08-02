import { initialStateCategories, categoriesReducer } from "./category"
import { AddCategory, DeleteCategory, EditCategory } from "../actions/category"

describe("initialStateCategories", () => {
  it("has expected keys & values", () => {
    expect(initialStateCategories).toEqual([])
  })
})

describe("categoriesReducer", () => {
  it("default returns initialState", () => {
    expect(categoriesReducer(undefined, {type: undefined, payload: undefined})).toEqual([])
  })
  it("should handle AddCategory", () => {
    let action = new AddCategory({value: "foo"})
    expect(categoriesReducer([], action)).toEqual(["foo"])
  })
  it("should handle DeleteCategory", () => {
    let action = new DeleteCategory({index: 1})
    expect(categoriesReducer(["foo", "bar"], action)).toEqual(["foo"])
  })
  it("should handle EditCategory", () => {
    let action = new EditCategory({value: "baz", index: 1})
    expect(categoriesReducer(["foo", "bar"], action)).toEqual(["foo", "baz"])
  })
})