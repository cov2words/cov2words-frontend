import { Action, State } from '@ngrx/store';
import { Questionaire, Question } from "../questions.model"

export interface CustomAction extends Action {
  type: string;
  payload?: any;
}

export enum FirebaseActionType {
  GET_QUESTIONAIRES = "GET_QUESTIONAIRES",
  GET_QUESTIONAIRES_SUCCESS = "GET_QUESTIONAIRES_SUCCESS",
  GET_QUESTIONAIRES_FAILURE = "GET_QUESTIONAIRES_FAILURE",
  GET_QUESTIONAIRE = "GET_QUESTIONAIRE",
  GET_QUESTIONAIRE_SUCCESS = "GET_QUESTIONAIRE_SUCCESS",
  GET_QUESTIONAIRE_FAILURE = "GET_QUESTIONAIRE_FAILURE",
  SET_QUESTIONAIRE = "SET_QUESTIONAIRE",
  SET_QUESTIONAIRE_SUCCESS = "SET_QUESTIONAIRE_SUCCESS",
  SET_QUESTIONAIRE_FAILURE = "SET_QUESTIONAIRE_FAILURE",
}

export class GetQuestionaires implements CustomAction {
  readonly type = FirebaseActionType.GET_QUESTIONAIRES
  constructor() {}
}

export class GetQuestionairesSuccess implements CustomAction {
  readonly type = FirebaseActionType.GET_QUESTIONAIRES_SUCCESS
  constructor(public payload:  Questionaire[]) {}
}

export class GetQuestionairesFailure implements CustomAction {
  readonly type = FirebaseActionType.GET_QUESTIONAIRES_FAILURE
  constructor(public payload: string) {}
}

export class GetQuestionaire implements CustomAction {
  readonly type = FirebaseActionType.GET_QUESTIONAIRE
  constructor(public payload: {questionaireUUID: string}) {}
}

export class GetQuestionaireSuccess implements CustomAction {
  readonly type = FirebaseActionType.GET_QUESTIONAIRE_SUCCESS
  constructor(public payload: {questionaire: Questionaire}) {}
}

export class GetQuestionaireFailure implements CustomAction {
  readonly type = FirebaseActionType.GET_QUESTIONAIRE_FAILURE
  constructor(public payload: string) {}
}

export class SetQuestionaire implements CustomAction {
  readonly type = FirebaseActionType.SET_QUESTIONAIRE
  constructor(public payload: {questionaire: string, questions: Array<Question>}) {}
}

export class SetQuestionaireSuccess implements CustomAction {
  readonly type = FirebaseActionType.SET_QUESTIONAIRE_SUCCESS
  constructor(public payload: string) {}
}

export class SetQuestionaireFailure implements CustomAction {
  readonly type = FirebaseActionType.SET_QUESTIONAIRE_FAILURE
  constructor(public payload: string) {}
}

export type FirebaseActions =
  GetQuestionaires |
  GetQuestionairesSuccess |
  GetQuestionairesFailure |
  GetQuestionaire |
  GetQuestionaireSuccess |
  GetQuestionaireFailure |
  SetQuestionaire |
  SetQuestionaireSuccess |
  SetQuestionaireFailure

export enum CategoriesActionType {
  ADD_CATEGORY = "ADD_CATEGORY",
  DELETE_CATEGORY = "DELETE_CATEGORY",
  EDIT_CATEGORY = "EDIT_CATEGORY"
}

export class AddCategory implements CustomAction {
  readonly type = CategoriesActionType.ADD_CATEGORY
  constructor(public payload: {value: string}) {}
}

export class DeleteCategory implements CustomAction {
  readonly type = CategoriesActionType.DELETE_CATEGORY
  constructor(public payload: {index: number}) {}
}

export class EditCategory implements CustomAction {
  readonly type = CategoriesActionType.EDIT_CATEGORY
  constructor(public payload: {index: number, value: string}) {}
}

export type CategoriesActions = 
  AddCategory |
  DeleteCategory |
  EditCategory

export enum QuestionsActionType {
  CHANGE_QUESTIONAIRE_NAME = "CHANGE_QUESTIONAIRE_NAME",
  CREATE_QUESTIONAIRE = "CREATE_QUESTIONAIRE",
  ADD_QUESTION = "ADD_QUESTION",
  DELETE_QUESTION = "DELETE_QUESTION",
  MOVE_QUESTION = "MOVE_QUESTION",
  MOVE_QUESTION_DND = "MOVE_QUESTION_DND",
  CHANGE_QUESTION_ID = "CHANGE_QUESTION_ID",
  CHANGE_QUESTION_TEXT = "CHANGE_QUESTION_TEXT",
  CHANGE_QUESTION_CATEGORY = "CHANGE_QUESTION_CATEGORY",
  CHANGE_OPTION_TEXT = "CHANGE_OPTION_TEXT",
  CHANGE_NEXT_QUESTION = "CHANGE_NEXT_QUESTION",
  DELETE_NEXT_QUESTIONMAP = "DELETE_NEXT_QUESTIONMAP",
  ADD_NEXT_QUESTIONMAP = "ADD_NEXT_QUESTIONMAP"
}

export class ChangeQuestionaireName implements CustomAction {
  readonly type = QuestionsActionType.CHANGE_QUESTIONAIRE_NAME
  constructor(public payload: {name: string}) {}
}

export class CreateQuestionaire implements CustomAction {
  readonly type = QuestionsActionType.CREATE_QUESTIONAIRE
  constructor(public payload: {name: string, owner: string, uuid: string}) {}
}

export class AddQuestion implements CustomAction {
  readonly type = QuestionsActionType.ADD_QUESTION
  constructor(public payload: {question: any}) {}
}

export class DeleteQuestion implements CustomAction {
  readonly type = QuestionsActionType.DELETE_QUESTION
  constructor(public payload: {uuid: string}) {}
}

export class MoveQuestion implements CustomAction {
  readonly type = QuestionsActionType.MOVE_QUESTION
  constructor(public payload: {uuid: string, direction: number}) {}
}

export class MoveQuestionDnD implements CustomAction {
  readonly type = QuestionsActionType.MOVE_QUESTION_DND
  constructor(public payload: {dragIndex: number, dropIndex: number}) {}
}

export class ChangeQuestionId implements CustomAction {
  readonly type = QuestionsActionType.CHANGE_QUESTION_ID
  constructor(public payload: {uuid: string, id: string}) {}
}

export class ChangeQuestionText implements CustomAction {
  readonly type = QuestionsActionType.CHANGE_QUESTION_TEXT
  constructor(public payload: {uuid: string, text: string}) {}
}

export class ChangeQuestionCategory implements CustomAction {
  readonly type = QuestionsActionType.CHANGE_QUESTION_CATEGORY
  constructor(public payload: {uuid: string, category: string}) {}
}

export class ChangeOptionText implements CustomAction {
  readonly type = QuestionsActionType.CHANGE_OPTION_TEXT
  constructor(public payload: {uuid: string, index: number, text: string}) {}
}

export class ChangeNextQuestion implements CustomAction {
  readonly type = QuestionsActionType.CHANGE_NEXT_QUESTION
  constructor(public payload: {uuid: string, index: number, nextQuestion: string}) {}
}

export class DeleteNextQuestionMap implements CustomAction {
  readonly type = QuestionsActionType.DELETE_NEXT_QUESTIONMAP
  constructor(public payload: {uuid: string}) {}
}

export class AddNextQuestionMap implements CustomAction {
  readonly type = QuestionsActionType.ADD_NEXT_QUESTIONMAP
  constructor(public payload: {uuid: string}) {}
}

export type QuestionsActions =
  ChangeQuestionaireName |
  CreateQuestionaire |
  AddQuestion |
  DeleteQuestion |
  MoveQuestion |
  MoveQuestionDnD |
  ChangeQuestionId |
  ChangeQuestionText |
  ChangeQuestionCategory |
  ChangeOptionText |
  ChangeNextQuestion |
  DeleteNextQuestionMap |
  AddNextQuestionMap


export enum NewQuestionActionType {
  CHANGE_NEWQUESTION_ATTRIBUTE = "CHANGE_NEWQUESTION_ATTRIBUTE"
}

export class ChangeNewQuestionAttribute implements CustomAction {
  readonly type = NewQuestionActionType.CHANGE_NEWQUESTION_ATTRIBUTE
  constructor(public payload: {attribute: string, value: any}) {}
}

export type NewQuestionActions = ChangeNewQuestionAttribute


export enum OptionsActionType {
  DELETE_OPTION = "DELETE_OPTION",
  ADD_OPTION = "ADD_OPTION"
}

export class DeleteOption implements CustomAction {
  readonly type = OptionsActionType.DELETE_OPTION
  constructor(public payload: {uuid: string, index: number}) {}
}

export class AddOption implements CustomAction {
  readonly type = OptionsActionType.ADD_OPTION
  constructor(public payload: {uuid: string, option: string}) {}
}


export type OptionsActions =
  DeleteOption |
  AddOption

export enum StatementsActionType {
  ADD_STATEMENT = "ADD_STATEMENT",
  ADD_CONDITION_UUID = "ADD_CONDITION_UUID",
  UPDATE_NEWCONDITION_NAME = "UPDATE_NEWCONDITION_NAME",
  UPDATE_STATEMENT_TRUETEXT = "UPDATE_STATEMENT_TRUETEXT",
  UPDATE_STATEMENT_FALSETEXT = "UPDATE_STATEMENT_FALSETEXT"
}

export class AddStatement implements CustomAction {
  readonly type = StatementsActionType.ADD_STATEMENT
  constructor(public payload: { statement: any}) {}
}

export class AddConditionUUID implements CustomAction {
  readonly type = StatementsActionType.ADD_CONDITION_UUID
  constructor(public payload: {conditionUUID: string, statementUUID: string}) {}
}

export class UpdateNewConditionName implements CustomAction {
  readonly type = StatementsActionType.UPDATE_NEWCONDITION_NAME
  constructor(public payload: { name: string, statementUUID: string}) {}
}

export class UpdateStatementTrueText implements CustomAction {
  readonly type = StatementsActionType.UPDATE_STATEMENT_TRUETEXT
  constructor(public payload: { value: string, statementUUID: string }) {}
}

export class UpdateStatementFalseText implements CustomAction {
  readonly type = StatementsActionType.UPDATE_STATEMENT_FALSETEXT
  constructor(payload: { value: string, statementUUID: string}) {}
}

export type StatementsActions =
  AddStatement |
  AddConditionUUID |
  UpdateNewConditionName |
  UpdateStatementTrueText |
  UpdateStatementFalseText


export enum ConditionsActionType {
  CHANGE_OPERAND = "CHANGE_OPERAND",
  CHANGE_SELECTED = "CHANGED_SELECTED",
  CHANGE_VALUE = "CHANGE_VALUE",
  CHANGE_COMBINATION = "CHANGE_COMBINATION",
  ADD_CONDITION = "ADD_CONDITION"
}

export class ChangeOperand implements CustomAction {
  readonly type = ConditionsActionType.CHANGE_OPERAND
  constructor(public payload: {operand: string, cIndex: number, sIndex: number}) {}
}

export class ChangeSelected implements CustomAction {
  readonly type = ConditionsActionType.CHANGE_SELECTED
  constructor(public payload: {selected: string, cIndex: number, sIndex: number}) {}
}

export class ChangeValue implements CustomAction {
  readonly type = ConditionsActionType.CHANGE_VALUE
  constructor(public payload: {value: string, cIndex: number, sIndex: number}) {}
}

export class ChangeCombination implements CustomAction {
  readonly type = ConditionsActionType.CHANGE_COMBINATION
  constructor(public payload: {combination: any, cIndex: number, sIndex: number}) {}
}

export class AddCondition implements CustomAction {
  readonly type = ConditionsActionType.ADD_CONDITION
  constructor(public payload: {condition: any}) {}
}

export type ConditionsActions = 
  ChangeOperand |
  ChangeSelected |
  ChangeValue |
  ChangeCombination |
  AddCondition

export type RootActions =
  FirebaseActions |
  CategoriesActions |
  QuestionsActions |
  NewQuestionActions |
  OptionsActions |
  StatementsActions |
  ConditionsActions