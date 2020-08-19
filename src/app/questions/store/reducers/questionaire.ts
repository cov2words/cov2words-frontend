import { QuestionaireActions, QuestionaireActionType } from "../actions/questionaire"

export interface InitialStateQuestionaire {
  name: string
  owner: string
  uuid: string
  categories: string[]
  questions: string[]
}

export const initialState = {
  name: '',
  owner: '',
  uuid: '',
  categories: [],
  questions: []
}


export function questionaireReducer(state: InitialStateQuestionaire = initialState, action: QuestionaireActions) {
  switch (action.type) {

    case QuestionaireActionType.GET_QUESTIONAIRE_SUCCESS: {

      console.log(action.payload)

      let { questions, metadata } = action.payload.questionaire

      let _questions = questions.map(q => q.uuid)

      let _metadata = metadata.hasOwnProperty("categories")
        ? metadata
        : Object.assign({}, metadata, { categories: [] })


      return {
        ..._metadata,
        questions: _questions
      }
    }

    case QuestionaireActionType.IMPORT_QUESTIONAIRE: {
      console.log(action.payload.questionaire)
      return action.payload.questionaire
    }

    case QuestionaireActionType.CHANGE_QUESTIONAIRE_NAME: {
      let { name } = action.payload
      return {
        ...state,
        name
      }
    }

    case QuestionaireActionType.CREATE_QUESTIONAIRE: {
      let { name, owner, uuid } = action.payload
      return {
        name,
        owner,
        uuid,
        categories: [],
        questions: []
      }
    }

    case QuestionaireActionType.ADD_CATEGORY: {
      let { value } = action.payload
      return {
        ...state,
        categories: [...state.categories, value]
      }
    }

    case QuestionaireActionType.DELETE_CATEGORY: {
      let { index } = action.payload
      return {
        ...state,
        categories: state.categories.filter((c,i) => i !== index)
      }
    }

    case QuestionaireActionType.EDIT_CATEGORY: {
      let { index, value } = action.payload
      return {
        ...state,
        categories: state.categories.map((c,i) => i !== index
          ? c
          : value
        )
      }
    }

    case QuestionaireActionType.ADD_QUESTION: {
      let { uuid } = action.payload.question
      return {
        ...state,
        questions: [...state.questions, uuid]
      }
    }

    case QuestionaireActionType.DELETE_QUESTION: {
      let { uuid } = action.payload
      return {
        ...state,
        questions: state.questions.filter(q => q !== uuid)
      }
    }

    case QuestionaireActionType.MOVE_QUESTION: {
      let { uuid, direction } = action.payload
      let questions = [...state.questions]
      let index = questions.findIndex(q => q === uuid)
      let newIndex = index + direction

      // question is first or last element. cant be moved outside
      if (newIndex < 0 || newIndex >= questions.length) {
        console.log("oh boy blyat")
        return state
      }
      questions.splice(newIndex, 0, questions.splice(index, 1)[0])
      return {
        ...state,
        questions
      }
    }

    case QuestionaireActionType.MOVE_QUESTION_DND: {
      let { dragIndex, dropIndex } = action.payload
      let questions = [...state.questions]
      console.log(dragIndex, dropIndex, questions)
      questions.splice(dropIndex, 0, questions.splice(dragIndex, 1)[0])
      console.log(questions)
      return {
        ...state,
        questions
      }
    }

    //case QuestionaireActionType.GET_QUESTIONAIRE:
    default:
      return state
  }
}