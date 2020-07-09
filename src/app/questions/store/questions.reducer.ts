import { QuestionsActions, QuestionsActionType } from './questions.actions'

export const initialState = {
  questions: [],
  message: ''
};

export function questionsReducer(state = initialState, action: QuestionsActions) {

  switch (action.type) {

    case QuestionsActionType.GET_QUESTIONS:
      return {
        message: 'loading questions...',
        ...state
      }


    case QuestionsActionType.GET_QUESTIONS_SUCCESS:

      return {
        questions: action.payload,
        message: 'load questions success...'
      }


    case QuestionsActionType.GET_QUESTIONS_FAILURE:
      return {
        message: 'load questions failure...',
        ...state
      }


    case QuestionsActionType.SET_QUESTIONS:
      return {
        message: 'saving questions...',
        ...state
      }


    case QuestionsActionType.SET_QUESTIONS_SUCCESS:
      return {
        message: 'save questions success...',
        ...state
      }

    case QuestionsActionType.SET_QUESTIONS_FAILURE:
      return {
        message: 'save questions failure...',
        ...state
      }

    case QuestionsActionType.DELETE_QUESTION: {
      let question = state.questions.find(question => question.uuid == action.payload)
      let questions = state.questions.filter(question => question.uuid !== action.payload)

      return {
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
        questions: [...questions],
        message: `question ${question.id} moved`
      }
    }

    case QuestionsActionType.DELETE_OPTION: {
      let { uuid, index } = action.payload
      let questions = [...state.questions]

      let questionIndex = questions.findIndex(question => question.uuid == uuid)
      let question = questions.find(question => question.uuid == uuid)
      let options = question.options.filter((opt, i) => i !== index)
      // delete the nextquestion on the fly
      let nextQuestionMap = question.nextQuestionMap.filter((opt, i) => i !== index)
      let updatedQuestion = Object.assign({}, question, { options, nextQuestionMap })

      questions[questionIndex] = Object.assign({}, updatedQuestion)

      return {
        questions: [...questions],
        message: `option ${index} of ${question.id} deleted`
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
        questions: [...questions],
        message: `text of ${question.id} changed`
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
        questions: [...questions],
        message: `nextquestionmap added to ${question.id}`
      }
    }

    default: {
      return state
    }

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