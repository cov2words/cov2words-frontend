export interface Metadata {
  name: string
  owner: string
  uuid: string
  lambdaEndpoint: string
  questions: string[]
  statements?: string[]
  preludeText?: string
  postludeText?: string
}

export interface RadioQuestion {
  uuid: string,
  id: string,
  category: string,
  text: string,
  inputType: string,
  options: string[],
  nextQuestionMap?: string[]
}

export interface NumberQuestion {
  uuid: string,
  id: string,
  category: string,
  text: string,
  inputType: string,
  options?: string[],
  nextQuestionMap?: string[]
}

/* export class Question {
  constructor(
    public id: string,
    public category: string,
    public text: string,
    public inputType: string,
    public options: string[],
    public nextQuestionMap: string[],
    public uuid: string
  ) { }
} */

export type Question = RadioQuestion | NumberQuestion

export class Questionaire {
  constructor(
    public metadata: Metadata,
    public questions: Question[],
    public statements: any,
    public conditions: any
  ) { }
}

