import { Component, Input, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Question } from "../../questions.model"
import * as Questions from "../../store/questions.actions"

@Component({
  selector: 'question-component',
  templateUrl: 'question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  private _fork: boolean

  @Input() question: Question
  @Input() questions: Question[]

  constructor(
    private store: Store<any>
  ) { }

  get fork() {
    return this.question.hasOwnProperty("nextQuestionMap")
  }

  ngOnInit() {
  }

  ngOnChanges() {
    this._fork = this.question.hasOwnProperty("nextQuestionMap")
  }

  trackByFn(index, item) {
    return index
  }

  changeQuestionId(event) {
    let { uuid } = this.question
    let id = event.target.value
    this.store.dispatch(new Questions.ChangeQuestionId({ uuid, id }))
  }

  changeQuestionText(event) {
    let { uuid } = this.question
    let text = event.target.value
    this.store.dispatch(new Questions.ChangeQuestionText({ uuid, text }))
  }

  deleteQuestion(uuid: string) {
    this.store.dispatch(new Questions.DeleteQuestion(uuid))
    this.store.select('questions').subscribe(response => {
      this.questions = response.questions
    }, error => {
      console.log(error)
    })
  }

  moveQuestion = (direction: number) => {
    let { uuid } = this.question
    this.store.dispatch(new Questions.MoveQuestion({ uuid, direction }))
  }

  changeOptionText = (index: number, text: string) => {
    let { uuid } = this.question
    this.store.dispatch(new Questions.ChangeOptionText({ uuid, index, text }))
  }

  changeNextQuestion = (index: number, nextQuestion: string) => {
    let { uuid } = this.question
    this.store.dispatch(new Questions.ChangeNextQuestion({ uuid, index, nextQuestion }))
  }

  deleteOption = (index: number) => {
    let { uuid } = this.question
    this.store.dispatch(new Questions.DeleteOption({ uuid, index }))
  }

  toggleFork = (event) => {
    let { uuid } = this.question
    if (
      (event.detail.checked && this.question.hasOwnProperty("nextQuestionMap")) ||
      (!event.detail.checked && !this.question.hasOwnProperty("nextQuestionMap"))
    ) {
      return
    }
    this.question.hasOwnProperty("nextQuestionMap")
      ? this.store.dispatch(new Questions.DeleteNextQuestionMap({ uuid }))
      : this.store.dispatch(new Questions.AddNextQuestionMap({ uuid }))
  }

}