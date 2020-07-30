import { AuthActions } from "./auth"
import { CategoryActions } from "./category"
import { FirebaseActions } from "./firebase"
import { NewQuestionActions } from "./newquestion"
import { OptionsActions } from "./option"
import { QuestionsActions } from "./question"
import { StatementsActions } from "./statement"

export { AuthActions, AuthActionType } from "./auth"
export { CategoryActions, CategoryActionType } from "./category"
export { FirebaseActions, FirebaseActionType } from "./firebase"
export { NewQuestionActions, NewQuestionActionType } from "./newquestion"
export { OptionsActions, OptionsActionType } from "./option"
export { QuestionsActions, QuestionsActionType } from "./question"
export { StatementsActions, StatementsActionType } from "./statement"

export type RootActions =
  AuthActions |
  CategoryActions |
  FirebaseActions |
  NewQuestionActions |
  OptionsActions |
  QuestionsActions |
  StatementsActions