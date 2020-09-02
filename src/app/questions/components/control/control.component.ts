import { Component, Input, OnInit } from '@angular/core'
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store'
import * as Questionaires from "../../store/actions/questionaires"
import * as Questionaire from "../../store/actions/questionaire"
import fileDownload from "js-file-download"
import * as JSZip from "jszip"
import { CreateQuestionaireModal } from "./createquestionaire.modal"
import { AddQuestionModal } from "./addquestion.modal"
import { AWSConnectModal } from "./awsconnect.modal"
import { HelpModal } from "./help.modal"
import { uuid } from "uuidv4"


@Component({
  selector: 'control-component',
  templateUrl: 'control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit {

  @Input() toggleQuestionsStatements: () => {}
  @Input() userEmail: any

  public hasFuture: boolean
  public hasPast: boolean
  
  private _questionaires: any[]
  private _questionaire
  private _questions
  private _statements
  private _conditions
  private _newQuestionaireName

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

  get questionaireName() {
    return this._questionaire === undefined
      ? ""
      : this._questionaire.name
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
    })

    this.store.dispatch(new Questionaires.GetQuestionaires({email:this.userEmail}))
    this.store.select(state => state.questions.future).subscribe(response => {
      this.hasFuture = response.length ? true : false
    })
    this.store.select(state => state.questions.past).subscribe(response => {
      this.hasPast = response.length ? true : false
    })
  }

  ngOnChanges() {
    console.log("changed", this.userEmail)
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
    console.log(this._questionaire)
    //let {questions, ...questionaire} = this._questionaire
    let questionaire = this._questionaire
    let questions = this._questions
    let statements = this._statements
    let conditions = this._conditions
    
    this.store.dispatch(new Questionaire.SetQuestionaire({questionaire, questions, statements, conditions}))
  }

  importQuestionaire(event) {
    let file = event.target.files[0]
    let fr = new FileReader();
    fr.onload = () => {
      let _questionaire = JSON.parse(fr.result.toString())
      let questionaire = Object.assign({}, _questionaire, {metadata: Object.assign({}, _questionaire.metadata, {owner: this.userEmail, uuid: uuid()})})
      this.store.dispatch(new Questionaire.GetQuestionaireSuccess({questionaire}))

    }
    fr.readAsText(file)
  }

  exportQuestionaire() {
    let questionaire = {
      metadata: this._questionaire,
      questions: this._questions,
      statements: this._statements,
      conditions: this._conditions
    }
    let name = this._questionaire.name
    const zip = new JSZip();
    zip.file(`${this._questionaire.name}.json`, JSON.stringify(questionaire, null, 4))
    zip.generateAsync({ type: "blob" }).then(function (content) {
      fileDownload(content, `${name}.zip`)
    })
  }

  async showCreateQuestionaireModal() {
    let createQuestionaireModal = await this.modalCtrl.create({
      component: CreateQuestionaireModal
    })
    return await createQuestionaireModal.present()
  }

  async showAddQuestionModal() {
    let addQuestionModal = await this.modalCtrl.create({
      component: AddQuestionModal,
      cssClass: 'add-question-modal'
    })
    return await addQuestionModal.present()
  }

  async showAWSConnectModal() {
    let awsConnectModal = await this.modalCtrl.create({
      component: AWSConnectModal
    })
    return await awsConnectModal.present()
  }

  /* async showInfoModal() {
    let infoModal = await this.modalCtrl.create({
      component: 
    })
  } */

  async showHelpModal() {
    let helpModal = await this.modalCtrl.create({
      component: HelpModal
    })
    return await helpModal.present()
  }

  undo(): void {
    this.store.dispatch({type: 'UNDO'})
  }

  redo(): void {
    this.store.dispatch({type: 'REDO'})
  }
}