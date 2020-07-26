import { Component, Input, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { ModalController } from '@ionic/angular';
import { Question } from "../../questions.model"
import * as Questions from "../../store/actions/question"
import * as Options from "../../store/actions/option"
import { EditModal } from "./edit.modal"

@Component({
  selector: 'question-component',
  templateUrl: 'question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  @Input() question: Question
  @Input() questions: Question[]
  @Input() categories: string[]

  constructor(
    private store: Store<any>,
    private modalCtrl: ModalController
  ) { }

  get fork() {
    return this.question.nextQuestionMap !== undefined
  }

  ngOnInit() {
  }

  trackByFn(index, item) {
    return item
  }

  deleteQuestion(uuid: string) {
    this.store.dispatch(new Questions.DeleteQuestion({uuid}))
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

  changeQuestionId = (id: string) => {
    let { uuid } = this.question
    this.store.dispatch(new Questions.ChangeQuestionId({ uuid, id }))
  }

  changeQuestionText = (text: string) => {
    let { uuid } = this.question
    this.store.dispatch(new Questions.ChangeQuestionText({ uuid, text }))
  }

  changeCategory = (event) => {
    let { uuid } = this.question
    let category = event.target.value
    this.store.dispatch(new Questions.ChangeQuestionCategory({uuid, category}))
  }

  changeOptionText = (index: number, text: string) => {
    let { uuid } = this.question
    this.store.dispatch(new Options.ChangeOptionText({ uuid, index, text }))
  }

  changeNextQuestion = (index: number, nextQuestion: string) => {
    let { uuid } = this.question
    
    this.store.dispatch(new Questions.ChangeNextQuestion({ uuid, index, nextQuestion }))
  }

  deleteOption = (index: number) => {
    let { uuid } = this.question
    this.store.dispatch(new Options.DeleteOption({ uuid, index }))
  }

  addOption = (option: string) => {
    let { uuid } = this.question
    this.store.dispatch(new Options.AddOption({uuid, option}))
  }

  toggleFork = (event) => {
    let { uuid } = this.question
    console.log(this.question.inputType)
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

  async showChangeQuestionId () {
    let modal = await this.modalCtrl.create({
      component: EditModal,
      componentProps: {
        setValue: this.changeQuestionId,
        initialValue: this.question.id,
        labelText: `change id of question ${this.question.id}`,
        placeholder: 'enter question id'
      }
    })
    return await modal.present()
  }
  
  async showChangeQuestionText () {
    let modal = await this.modalCtrl.create({
      component: EditModal,
      componentProps: {
        setValue: this.changeQuestionText,
        initialValue: this.question.text,
        labelText: `change text of question ${this.question.id}`,
        placeholder: 'enter question text'
      }
    })
    return await modal.present()
  }

  async showChangeOption(index) {
    let modal = await this.modalCtrl.create({
      component: EditModal,
      componentProps: {
        setValue: this.changeOptionText,
        initialValue: this.question.options[index],
        labelText: `change option ${index} of question ${this.question.id}`,
        placeholder: 'enter option text',
        index
      }
    })
    return await modal.present()
  }

  async showAddOption() {
    let modal = await this.modalCtrl.create({
      component: EditModal,
      componentProps: {
        setValue: this.addOption,
        labelText: `add option to question ${this.question.id}`,
        placeholder: 'enter option text'
      }
    })
    return await modal.present()
  }
}