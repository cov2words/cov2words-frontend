import { QuestionsActions, QuestionsActionType } from "../actions/question"

export const initialState: any = {}

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