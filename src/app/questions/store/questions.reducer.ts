import {
  RootActions,
  CategoriesActions,
  QuestionsActions,
  FirebaseActions,
  NewQuestionActions,
  OptionsActions,
  QuestionsActionType,
  FirebaseActionType,
  NewQuestionActionType,
  OptionsActionType,
  CategoriesActionType
} from './questions.actions'

export const initialStateNewQuestion = {
  id: '',
  text: '',
  inputType: '',
}

export const initialState = {
  questionaires: [],
  questionaire: '',
  questions: [],
  message: '',
  newQuestionaireName: '',
  newQuestion: initialStateNewQuestion
};

export function firebaseReducer(state = initialState, action: FirebaseActions) {
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

export function categoriesReducer(state, action: CategoriesActions) {
  console.log(state)
  switch (action.type) {
    case CategoriesActionType.ADD_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, action.payload.value]
      }
    case CategoriesActionType.DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter((c,i) => i !== action.payload.index)
      }
    case CategoriesActionType.EDIT_CATEGORY:
      let { value, index } = action.payload
      return {
        ...state,
        categories: state.categories.map((c,i) => i == index ? value : c)
      }
    default:
      return state
  }
}

export function newQuestionReducer(state = initialStateNewQuestion, action: NewQuestionActions) {
  switch (action.type) {
    case NewQuestionActionType.CHANGE_NEWQUESTION_ATTRIBUTE:
      return {
        ...state,
        [action.payload.attribute]: action.payload.value
      }
    default:
      return state
  }
}

export function optionsReducer(state, action: OptionsActions) {
  switch (action.type) {
    case OptionsActionType.DELETE_OPTION:
      return state.filter((opt, i) => i !== action.payload.index)
    case OptionsActionType.ADD_OPTION:
      return [...state, action.payload.option]
    default:
      return state
  }
}

export function nextQuestionReducer(state, action: OptionsActions) {
  switch(action.type) {
    case OptionsActionType.DELETE_OPTION:
      return state.filter((opt, i) => i !== action.payload.index)
    case OptionsActionType.ADD_OPTION:
      return [...state, ""]
    default:
      return state
  }
}

export function questionsReducer(state = initialState, action: QuestionsActions) {

  switch (action.type) {

    case QuestionsActionType.CHANGE_QUESTIONAIRE_NAME:
      return {
        ...state,
        newQuestionaireName: action.payload.name,
        message: `new questionaire name changed`
      }

    case QuestionsActionType.CREATE_QUESTIONAIRE:
      return {
        ...state,
        questionaire: action.payload,
        questions: [],
        message: `new questionaire ${action.payload.name} created by user ${action.payload.owner}`
      }

    case QuestionsActionType.ADD_QUESTION: {
      return {
        ...state,
        questions: [...state.questions, action.payload.question],
        message: 'new question added...'
      }
    }

    case QuestionsActionType.DELETE_QUESTION: {
      let { uuid } = action.payload
      let question = state.questions.find(question => question.uuid == uuid)
      let questions = state.questions.filter(question => question.uuid !== uuid)

      return {
        ...state,
        message: `question ${question.id} deleted`,
        questions
      }
    }

    case QuestionsActionType.MOVE_QUESTION: {
      let { uuid, direction } = action.payload
      let questions = [...state.questions]
      let question = questions.find(question => question.uuid == uuid)
      let index = questions.findIndex(question => question.uuid === uuid)
      let newIndex = index + direction

      if (newIndex < 0 || newIndex >= questions.length) {
        return state
      }
      questions.splice(newIndex, 0, questions.splice(index, 1)[0])
      questions = questions.map(question => Object.assign({}, JSON.parse(JSON.stringify(question))))
      return {
        ...state,
        questions: [...questions],
        message: `question ${question.id} moved`
      }
    }

    case QuestionsActionType.MOVE_QUESTION_DND: {
      let { dragIndex, dropIndex } = action.payload
      let questions = [...state.questions]
      questions.splice(dropIndex, 0, questions.splice(dragIndex, 1)[0])
      //questions.forEach((item,i) => item.index = i)
      return {
        ...state,
        questions: [...questions],
        message: `drag n drop from ${dragIndex} to ${dropIndex}`
      }
    }

    case QuestionsActionType.CHANGE_QUESTION_ID: {
      let { uuid, id } = action.payload
      let questions = [...state.questions]

      let questionIndex = questions.findIndex(question => question.uuid == uuid)
      let question = questions.find(question => question.uuid == uuid)

      // early return redo/undo
      if (question.id == id) {
        return state
      }

      let oldId = question.id
      let updatedQuestion = Object.assign({}, question, { id })

      questions[questionIndex] = Object.assign({}, updatedQuestion)

      return {
        ...state,
        questions: [...questions],
        message: `id ${oldId} changed to ${id}`
      }

    }

    case QuestionsActionType.CHANGE_QUESTION_TEXT: {
      let { uuid, text } = action.payload
      let questions = [...state.questions]

      let questionIndex = questions.findIndex(question => question.uuid == uuid)
      let question = questions.find(question => question.uuid == uuid)

      // early return redo/undo
      if (question.text == text) {
        return state
      }

      let updatedQuestion = Object.assign({}, question, { text })

      questions[questionIndex] = Object.assign({}, updatedQuestion)

      return {
        ...state,
        questions: [...questions],
        message: `text of ${question.id} changed`
      }
    }

    case QuestionsActionType.CHANGE_QUESTION_CATEGORY: {
      let { uuid, category } = action.payload
      let questions = [...state.questions]

      let questionIndex = questions.findIndex(question => question.uuid == uuid)
      let question = questions.find(question => question.uuid == uuid)

      console.log("!", category, question.category)

      // early return redo/undo
      if (question.category == category) {
        return state
      }

      let updatedQuestion = Object.assign({}, question, { category })

      questions[questionIndex] = Object.assign({}, updatedQuestion)

      return {
        ...state,
        questions: [...questions],
        message: `category of ${question.id} changed`
      }
    }

    case QuestionsActionType.CHANGE_OPTION_TEXT: {
      let { uuid, index, text } = action.payload
      let questions = [...state.questions]

      let questionIndex = questions.findIndex(question => question.uuid == uuid)
      let question = questions.find(question => question.uuid == uuid)
      let options = question.options.map((opt, i) => i == index ? text : opt)

      // early return redo/undo
      if (options.every((q, i) => q == question.options[i])) {
        return state
      }

      let updatedQuestion = Object.assign({}, question, { options })

      questions[questionIndex] = Object.assign({}, updatedQuestion)

      return {
        ...state,
        questions: [...questions],
        message: `option ${index} of ${question.id} updated`
      }
    }

    case QuestionsActionType.CHANGE_NEXT_QUESTION: {
      let { uuid, index, nextQuestion } = action.payload
      let questions = [...state.questions]

      let questionIndex = questions.findIndex(question => question.uuid == uuid)
      let question = questions.find(question => question.uuid == uuid)
      let nextQuestionMap = question.nextQuestionMap.map((opt, i) => i == index ? nextQuestion : opt)

      // early return redo/undo
      if (nextQuestionMap.every((q, i) => q == question.nextQuestionMap[i])) {
        return state
      }

      let updatedQuestion = Object.assign({}, question, { nextQuestionMap })
      questions[questionIndex] = Object.assign({}, updatedQuestion)

      return {
        ...state,
        questions: [...questions],
        message: `nextquestion ${index} of ${question.id} updated`
      }
    }

    case QuestionsActionType.DELETE_NEXT_QUESTIONMAP: {
      let { uuid } = action.payload
      console.log(uuid)
      let questions = [...state.questions]

      let questionIndex = questions.findIndex(question => question.uuid == uuid)
      let question = questions.find(question => question.uuid == uuid)

      let updatedQuestion = Object.assign({}, question)
      delete updatedQuestion.nextQuestionMap
      questions[questionIndex] = Object.assign({}, updatedQuestion)

      return {
        ...state,
        questions: [...questions],
        message: `nextquestionmap of ${question.id} deleted`
      }
    }

    case QuestionsActionType.ADD_NEXT_QUESTIONMAP: {
      let { uuid } = action.payload
      let questions = [...state.questions]

      let questionIndex = questions.findIndex(question => question.uuid == uuid)
      let question = questions.find(question => question.uuid == uuid)

      let updatedQuestion = Object.assign({}, question, { nextQuestionMap: question.options.map(opt => '') })
      questions[questionIndex] = Object.assign({}, updatedQuestion)

      return {
        ...state,
        questions: [...questions],
        message: `nextquestionmap added to ${question.id}`
      }
    }

    default: {
      return state
    }

  }

}


export function rootReducer(state = initialState, action: RootActions) {
  switch (action.type) {
    case FirebaseActionType.GET_QUESTIONAIRES:
    case FirebaseActionType.GET_QUESTIONAIRES_SUCCESS:
    case FirebaseActionType.GET_QUESTIONAIRES_FAILURE:
    case FirebaseActionType.GET_QUESTIONAIRE:
    case FirebaseActionType.GET_QUESTIONAIRE_SUCCESS:
    case FirebaseActionType.GET_QUESTIONAIRE_FAILURE:
    case FirebaseActionType.SET_QUESTIONAIRE:
    case FirebaseActionType.SET_QUESTIONAIRE_SUCCESS:
    case FirebaseActionType.SET_QUESTIONAIRE_FAILURE:
      return {
        ...state,
        ...firebaseReducer(state, action)
      }

    case CategoriesActionType.ADD_CATEGORY:
    case CategoriesActionType.DELETE_CATEGORY:
    case CategoriesActionType.EDIT_CATEGORY:
      return {
        ...state,
        questionaire: categoriesReducer(state.questionaire, action)
      }

    case QuestionsActionType.CHANGE_QUESTIONAIRE_NAME:
    case QuestionsActionType.CREATE_QUESTIONAIRE:
    case QuestionsActionType.ADD_QUESTION:
    case QuestionsActionType.DELETE_QUESTION:
    case QuestionsActionType.MOVE_QUESTION:
    case QuestionsActionType.MOVE_QUESTION_DND:
    //case QuestionsActionType.DELETE_OPTION:
    case QuestionsActionType.CHANGE_QUESTION_ID:
    case QuestionsActionType.CHANGE_QUESTION_TEXT:
    case QuestionsActionType.CHANGE_QUESTION_CATEGORY:
    case QuestionsActionType.CHANGE_OPTION_TEXT:
    case QuestionsActionType.CHANGE_NEXT_QUESTION:
    case QuestionsActionType.DELETE_NEXT_QUESTIONMAP:
    case QuestionsActionType.ADD_NEXT_QUESTIONMAP:
      return {
        ...state,
        ...questionsReducer(state, action)
      }
    case NewQuestionActionType.CHANGE_NEWQUESTION_ATTRIBUTE:
      return {
        ...state,
        newQuestion: newQuestionReducer(state.newQuestion, action)
      }
    case OptionsActionType.DELETE_OPTION:
    case OptionsActionType.ADD_OPTION:
      let { uuid } = action.payload
      let questions = [...state.questions]

      let questionIndex = questions.findIndex(question => question.uuid == uuid)
      let question = questions.find(question => question.uuid == uuid)
      let options = optionsReducer(question.options, action)
      // delete the nextquestion on the fly
      let nextQuestionMap = question.nextQuestionMap !== undefined
        ? nextQuestionReducer(question.nextQuestionMap, action)
        : undefined
      let updatedQuestion = Object.assign({}, question, { options, nextQuestionMap })

      questions[questionIndex] = Object.assign({}, updatedQuestion)

      return {
        ...state,
        questions: [...questions],
        message: `options changed`
      }

    default:
      return state
  }
}

export function undoable(reducer) {
  // Call the reducer with empty action to populate the initial state
  const initialState = {
    past: [],
    present: reducer(undefined, {}),
    future: []
  }

  // Return a reducer that handles undo and redo
  return function (state = initialState, action) {
    const { past, present, future } = state

    switch (action.type) {
      case 'UNDO':
        const previous = past[past.length - 1]
        const newPast = past.slice(0, past.length - 1)
        return {
          past: newPast,
          present: previous,
          future: [present, ...future]
        }
      case 'REDO':
        const next = future[0]
        const newFuture = future.slice(1)
        return {
          past: [...past, present],
          present: next,
          future: newFuture
        }
      default:
        // Delegate handling the action to the passed reducer
        const newPresent = reducer(present, action)
        if (present === newPresent) {
          return state
        }
        return {
          past: [...past, present],
          present: newPresent,
          future: []
        }
    }
  }
}