import { Component, Input, OnInit } from '@angular/core'
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store'
import * as Questionaires from "../../store/actions/questionaires"
import * as Questionaire from "../../store/actions/questionaire"
import * as Questions from "../../store/actions/question"
import { CreateQuestionaireModal } from "./createquestionaire.modal"
import { EditCategoriesModal } from "./editcategories.modal"
import { AddQuestionModal } from "./addquestion.modal"
import { AWSConnectModal } from "./awsconnect.modal"


@Component({
  selector: 'control-component',
  templateUrl: 'control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit {

  @Input() toggleQuestionsStatements: () => {}

  public hasFuture: boolean
  public hasPast: boolean
  
  private _questionaires: any[]
  private _questionaire
  private _questions
  private _statements
  private _conditions
  private _newQuestionaireName
  private _userEmail

  constructor(
    private store: Store<any>,
    private modalCtrl: ModalController
  ) { }

  get questionaires() {
    return this._questionaires
  }

  get questionaire() {
    return this._questionaire
  }

  get questions() {
    return this._questions
  }

  get newQuestionaireName() {
    return this._newQuestionaireName
  }

  ngOnInit() {
    
    this.store.select(state => state.questions.present).subscribe(response => {
      this._questionaires = response.questionaires
      this._questionaire = response.questionaire
      this._questions = response.questions
      this._statements = response.statements
      this._conditions = response.conditions
      this._newQuestionaireName = response.newQuestionaireName
      this._userEmail = response.auth.email
    })
    this.store.dispatch(new Questionaires.GetQuestionaires({email:this._userEmail}))
    this.store.select(state => state.questions.future).subscribe(response => {
      this.hasFuture = response.length ? true : false
    })
    this.store.select(state => state.questions.past).subscribe(response => {
      this.hasPast = response.length ? true : false
    })
  }

  changeQuestionaire(event) {
    let questionaireUUID = event.target.value
    this._questionaires.some(q => q.uuid == questionaireUUID)
      ? this.store.dispatch(new Questionaire.GetQuestionaire({questionaireUUID}))
      : null
  }

  changeNewQuestionaireName(event) {
    let name = event.target.value
    this.store.dispatch(new Questionaire.ChangeQuestionaireName({name}))
  }

  saveQuestionaire() {
    // TODO: rename stuff? 
    let {questions, ...questionaire} = this._questionaire
    let _questions = this._questions
    let statements = this._statements
    let conditions = this._conditions
    
    this.store.dispatch(new Questionaire.SetQuestionaire({questionaire, questions: _questions, statements, conditions}))
  }

  async showCreateQuestionaireModal() {
    let createQuestionaireModal = await this.modalCtrl.create({
      component: CreateQuestionaireModal
    })
    return await createQuestionaireModal.present()
  }

  async showEditCategoriesModal() {
    let editCategoriesModal = await this.modalCtrl.create({
      component: EditCategoriesModal
    })
    return await editCategoriesModal.present()
  }

  async showAddQuestionModal() {
    let addQuestionModal = await this.modalCtrl.create({
      component: AddQuestionModal
    })
    return await addQuestionModal.present()
  }

  async showAWSConnectModal() {
    let awsConnectModal = await this.modalCtrl.create({
      component: AWSConnectModal
    })
    return await awsConnectModal.present()
  }

  undo(): void {
    this.store.dispatch({type: 'UNDO'})
  }

  redo(): void {
    this.store.dispatch({type: 'REDO'})
  }
}