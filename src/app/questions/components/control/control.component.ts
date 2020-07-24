import { Component, Input, OnInit } from '@angular/core'
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store'
/* import fileDownload from "js-file-download"
import * as JSZip from "jszip" */
import { uuid } from "uuidv4"
import * as Questions from "../../store/questions.actions"
import { CreateQuestionaireModal } from "./createquestionaire.modal"
import { EditCategoriesModal } from "./editcategories.modal"
import { AddQuestionModal } from "./addquestion.modal"


@Component({
  selector: 'control-component',
  templateUrl: 'control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit {

  public hasFuture: boolean
  public hasPast: boolean
  
  private _questionaires: any[]
  private _questionaire
  private _questions
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

  get questions() {
    return this._questions
  }

  get newQuestionaireName() {
    return this._newQuestionaireName
  }

  ngOnInit() {
    this.store.dispatch(new Questions.GetQuestionaires())
    this.store.select(state => state.questions.present).subscribe(response => {
      this._questionaires = response.questionaires
      this._questionaire = response.questionaire
      this._questions = response.questions
      this._newQuestionaireName = response.newQuestionaireName
    })
    this.store.select(state => state.questions.future).subscribe(response => {
      this.hasFuture = response.length ? true : false
    })
    this.store.select(state => state.questions.past).subscribe(response => {
      this.hasPast = response.length ? true : false
    })
  }

  changeQuestionaire(event) {
    let questionaireUUID = event.target.value
    console.log(questionaireUUID, this._questionaires)
    this._questionaires.some(q => q.uuid == questionaireUUID)
      ? this.store.dispatch(new Questions.GetQuestionaire({questionaireUUID}))
      : null
  }

  changeNewQuestionaireName(event) {
    let name = event.target.value
    this.store.dispatch(new Questions.ChangeQuestionaireName({name}))
  }

  createQuestionaire(name: string) {
    this.store.dispatch(new Questions.CreateQuestionaire({name, owner: 'elnerdo', uuid: uuid()}))
  }

  saveQuestionaire() {
    let questionaire = this._questionaire
    let questions = this._questions
    this.store.dispatch(new Questions.SetQuestionaire({questionaire,questions}))
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

  downloadAWSConnectJSON() {
    console.log("tbd")
    /* this.store.select('questions').subscribe(response => {
      const zip = new JSZip()
      zip.file('test.json', JSON.stringify(response.questions, null, 4))
      zip.generateAsync({type: "blob"}).then(content => fileDownload(content, "test.zip"))
      Object.keys(response).forEach((key, x) => {
        zip.file(`${key}.json`, JSON.stringify(jsonMap[key], null, 4))

      })
      zip.generateAsync({type:"blob"}).then(function(content) {
        fileDownload(content, "example.zip")
      })
    }, error => {
      console.log(error)
    }) */
  }

  undo(): void {
    this.store.dispatch({type: 'UNDO'})
  }

  redo(): void {
    this.store.dispatch({type: 'REDO'})
  }
}