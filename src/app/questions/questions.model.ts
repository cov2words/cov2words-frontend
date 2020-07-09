export class Question {
  constructor(
    public id: string,
    public category: string,
    public text: string,
    public inputType: string,
    public options: string[],
    public nextQuestionMap: string[],
    public uuid: string,
    public showModal: boolean
  ) {}
}