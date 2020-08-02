import { CategoryActionType, AddCategory, DeleteCategory, EditCategory } from "./category"


describe("CategoryActionType", () => {
  let expectedActionTypes = ["ADD_CATEGORY", "DELETE_CATEGORY", "EDIT_CATEGORY"]
  it.each(Object.values(CategoryActionType))("%s", (actionType => {
    expect(expectedActionTypes).toContain(actionType)
  }))
  it.each(expectedActionTypes)("%s", (actionType => {
    expect(CategoryActionType.hasOwnProperty(actionType)).toBeTruthy()
  }))
})

describe("AddCategory", () => {
  it("has expected properties", () => {
    let action = new AddCategory({value: "foo"})
    expect(action.hasOwnProperty("type")).toBeTruthy()
    expect(action.type).toEqual(CategoryActionType.ADD_CATEGORY)
    expect(action.hasOwnProperty("payload")).toBeTruthy()
    expect(action.payload.hasOwnProperty("value")).toBeTruthy()
    expect(action.payload.value).toEqual("foo")
  })
})

describe("DeleteCategory", () => {
  it("has expected properties", () => {
    let action = new DeleteCategory({index: 1337})
    expect(action.hasOwnProperty("type")).toBeTruthy()
    expect(action.type).toEqual(CategoryActionType.DELETE_CATEGORY)
    expect(action.hasOwnProperty("payload")).toBeTruthy()
    expect(action.payload.hasOwnProperty("index")).toBeTruthy()
    expect(action.payload.index).toEqual(1337)
  })
})

describe("EditCategory", () => {
  it("has expected properties", () => {
    let action = new EditCategory({index: 1337, value: "foo"})
    expect(action.hasOwnProperty("type")).toBeTruthy()
    expect(action.type).toEqual(CategoryActionType.EDIT_CATEGORY)
    expect(action.hasOwnProperty("payload")).toBeTruthy()
    expect(action.payload.hasOwnProperty("index")).toBeTruthy()
    expect(action.payload.index).toEqual(1337)
    expect(action.payload.hasOwnProperty("value")).toBeTruthy()
    expect(action.payload.value).toEqual("foo")
  })
})
