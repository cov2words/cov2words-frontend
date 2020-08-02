import { QuestionsActions, QuestionsActionType } from "../actions/question"
import { OptionsActionType } from "../actions/option"
import { optionsReducer } from "./option"

export type InitialStateQuestions = any[]

export const initialState = []

export function questionsReducer(state: InitialStateQuestions = initialState, action: QuestionsActions) {

  switch (action.type) {

    case OptionsActionType.DELETE_OPTION:
    case OptionsActionType.ADD_OPTION:
    case OptionsActionType.CHANGE_OPTION_TEXT: {
      let { uuid } = action.payload
      return state.map(q => q.uuid !== uuid
        ? q
        : Object.assign({}, q, {options: optionsReducer(q.options, action)})
      )
    }

    case QuestionsActionType.ADD_QUESTION: {
      return [...state, action.payload.question]
    }

    case QuestionsActionType.DELETE_QUESTION: {
      let { uuid } = action.payload
      return state.filter(question => question.uuid !== uuid)
    }

    case QuestionsActionType.MOVE_QUESTION: {
      // what is this mess?!
      let { uuid, direction } = action.payload
      let questions = [...state]

      let index = questions.findIndex(question => question.uuid === uuid)
      let newIndex = index + direction

      if (newIndex < 0 || newIndex >= questions.length) {
        return state
      }
      questions.splice(newIndex, 0, questions.splice(index, 1)[0])
      return questions.map(question => Object.assign({}, JSON.parse(JSON.stringify(question))))
    }

    case QuestionsActionType.MOVE_QUESTION_DND: {
      let { dragIndex, dropIndex } = action.payload
      let questions = [...state]
      questions.splice(dropIndex, 0, questions.splice(dragIndex, 1)[0])
      return [...questions]
    }

    case QuestionsActionType.CHANGE_QUESTION_ATTRIBUTE: {
      let { uuid, attr, value } = action.payload
      return state.map(q => q.uuid !== uuid
        ? q
        : Object.assign({}, q, {[attr]: value}))
    }

    case QuestionsActionType.CHANGE_NEXT_QUESTION: {
      let { uuid, index, nextQuestion } = action.payload
      let questions = [...state]

      let questionIndex = questions.findIndex(question => question.uuid == uuid)
      let question = questions.find(question => question.uuid == uuid)
      let nextQuestionMap = question.nextQuestionMap.map((opt, i) => i == index ? nextQuestion : opt)

      // early return redo/undo
      if (nextQuestionMap.every((q, i) => q == question.nextQuestionMap[i])) {
        return state
      }

      let updatedQuestion = Object.assign({}, question, { nextQuestionMap })
      questions[questionIndex] = Object.assign({}, updatedQuestion)

      return [...questions]
    }

    case QuestionsActionType.DELETE_NEXT_QUESTIONMAP: {
      let { uuid } = action.payload
      console.log(uuid)
      let questions = [...state]

      let questionIndex = questions.findIndex(question => question.uuid == uuid)
      let question = questions.find(question => question.uuid == uuid)

      let updatedQuestion = Object.assign({}, question)
      delete updatedQuestion.nextQuestionMap
      questions[questionIndex] = Object.assign({}, updatedQuestion)

      return [...questions]
    }

    case QuestionsActionType.ADD_NEXT_QUESTIONMAP: {
      let { uuid } = action.payload
      let questions = [...state]

      let questionIndex = questions.findIndex(question => question.uuid == uuid)
      let question = questions.find(question => question.uuid == uuid)

      let updatedQuestion = Object.assign({}, question, { nextQuestionMap: question.options.map(opt => '') })
      questions[questionIndex] = Object.assign({}, updatedQuestion)

      return [...questions]
    }

    default: {
      return state
    }

  }

}