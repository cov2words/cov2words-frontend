import { FirebaseActions, FirebaseActionType } from "../actions/firebase"

export const initialState: any = {}

export function firebaseReducer(state: any = initialState, action: FirebaseActions) {
  switch (action.type) {
    case FirebaseActionType.GET_QUESTIONAIRES:
      return {
        ...state,
        message: 'loading questionaires...'
      }

    case FirebaseActionType.GET_QUESTIONAIRES_SUCCESS: {
      let questionaires = action.payload.map(q => ({uuid: q.metadata.uuid, name: q.metadata.name}))
      return {
        ...state,
        message: 'loading questionaires success...',
        questionaires
      }
    }

    case FirebaseActionType.GET_QUESTIONAIRES_FAILURE:
      return {
        ...state,
        message: 'loading quesitonaires failure...'
      }

    case FirebaseActionType.SET_QUESTIONAIRE:
      return {
        ...state,
        message: `questionaire ${action.payload} selected`,
        questionaire: action.payload.questionaire
      }

    case FirebaseActionType.SET_QUESTIONAIRE_SUCCESS:
      return {
        ...state,
        message: 'save success'
      }
    case FirebaseActionType.SET_QUESTIONAIRE_FAILURE:
      return {
        ...state,
        message: 'save failure'
      }

    case FirebaseActionType.GET_QUESTIONAIRE:
      return {
        ...state,
        message: 'loading questionaire...'
      }

    case FirebaseActionType.GET_QUESTIONAIRE_SUCCESS: {

      let { questions, metadata } = action.payload.questionaire

      // firebase ignores empty arrays. create empty questions array if there are no questions
      // create empty options array if there is none and question type is radio
      let _questions = questions.map(q =>
        q.inputType == 'radio' && q.options == undefined
          ? Object.assign({}, q, {options: []})
          : q
      ) || []

      let _metadata = metadata.hasOwnProperty("categories")
        ? metadata
        : Object.assign({}, metadata, {categories: []})

      return {
        ...state,
        questions: _questions,
        questionaire: _metadata,
        message: 'load questionaire success...'
      }
    }

    case FirebaseActionType.GET_QUESTIONAIRE_FAILURE:
      return {
        ...state,
        message: 'load questionaire failure...'
      }

    default:
      return state
  }
}