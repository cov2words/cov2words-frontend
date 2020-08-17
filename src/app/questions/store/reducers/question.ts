import { QuestionsActions, QuestionsActionType } from "../actions/question"
import { QuestionaireActionType } from "../actions/questionaire"
import { OptionsActionType } from "../actions/option"
import { optionsReducer } from "./option"

export type InitialStateQuestions = any[]

export const initialState = []

export function questionsReducer(state: InitialStateQuestions = initialState, action: QuestionsActions) {

  switch (action.type) {

    case QuestionaireActionType.GET_QUESTIONAIRE_SUCCESS: {
      let { questions } = action.payload.questionaire
      return questions
    }

    case QuestionaireActionType.CREATE_QUESTIONAIRE: {
      return initialState
    }

    case OptionsActionType.DELETE_OPTION:
    case OptionsActionType.ADD_OPTION: 
    case OptionsActionType.CHANGE_OPTION_TEXT: {
      let { uuid } = action.payload
      return state.map(q => q.uuid !== uuid
        ? q
        : Object.assign({}, q, {options: optionsReducer(q.options || [], action)})
      )
    }

    case QuestionsActionType.ADD_QUESTION: {
      return [...state, action.payload.question]
    }

    case QuestionsActionType.DELETE_QUESTION: {
      let { uuid } = action.payload
      return state.filter(question => question.uuid !== uuid)
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
      // check this! might be uneccessary now
      if (nextQuestionMap.every((q, i) => q == question.nextQuestionMap[i])) {
        return state
      }

      let updatedQuestion = Object.assign({}, question, { nextQuestionMap })
      questions[questionIndex] = Object.assign({}, updatedQuestion)

      return [...questions]
    }

    case QuestionsActionType.DELETE_NEXT_QUESTIONMAP: {
      let { uuid } = action.payload
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

      let defaults = questionIndex + 1 >= questions.length
        ? question.options.map(o => '')
        : question.options.map(o => questions[questionIndex + 1].id)

      let updatedQuestion = Object.assign(
        {}, question, { nextQuestionMap: question.options.map((opt,i) => defaults[i]) }
      )
      questions[questionIndex] = Object.assign({}, updatedQuestion)

      return [...questions]
    }

    default: {
      return state
    }

  }

}