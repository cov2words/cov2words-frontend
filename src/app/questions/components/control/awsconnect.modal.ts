import { uuid } from "uuidv4"
import { Component, OnInit, Input } from '@angular/core'
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store'
import fileDownload from "js-file-download"
import * as JSZip from "jszip"
import * as Questionaire from "../../store/actions/questionaire"
import { ContactFlowQuestion } from "../awsconnect/contactflowquestion"
import { ContactFlowQuestionDate } from "../awsconnect/contactflowquestiondate"
import { ContactFlowStaticStart } from "../awsconnect/contactflowstaticstart"
import { ContactFlowStaticEnd } from "../awsconnect/contactflowstaticend"
import { defaultText } from "../awsconnect/defaulttext"

@Component({
  selector: 'aws-connect-modal',
  templateUrl: 'awsconnect.modal.html',
  styleUrls: ['./control.component.scss']
})
export class AWSConnectModal implements OnInit {

  private _questions
  private _statements
  private _conditions
  private _name: string
  private _preludeText: string
  private _postludeText: string
  private _lambdaEndpoint: string

  constructor(
    private store: Store<any>,
    private modalCtrl: ModalController
  ) { }

  get name() {
    return this._name
  }

  get preludeText() {
    return this._preludeText
  }

  get lambdaEndpoint() {
    return this._lambdaEndpoint
  }

  trackByFn(index, item) {
    return index
  }

  ngOnInit() {
    this.store.select(state => state.questions.present).subscribe(response => {
      console.log({response})
      this._questions = response.questions
      this._statements = response.statements
      this._conditions = response.conditions
      this._name = response.questionaire.name
        .replace(/ /g, "_")
        .toLowerCase()
      this._preludeText = response.questionaire.preludeText || ""
      this._postludeText = response.questionaire.postludeText || ""
      this._lambdaEndpoint = response.questionaire.lambdaEndpoint || ""
    })
  }

  changeName(event: any) {
    this._name = event.detail.value
  }

  changePreludeText(event: any) {
    let attr = "preludeText",  value = event.detail.value
    this.store.dispatch(new Questionaire.ChangeQuestionaireAttribute({attr, value}))
  }

  changeLambdaEndpoint(event: any) {
    let attr = "lambdaEndpoint", value = event.detail.value
    this.store.dispatch(new Questionaire.ChangeQuestionaireAttribute({attr, value}))
  }

  createContactFlows() {
    let language = "de"
    let basename = this._name
    let questions = this._questions
    let endPoint = this._lambdaEndpoint
    let predlude = this._preludeText.replace(/(\r\n|\n|\r)/gm, "");
    let postlude = this._postludeText.replace(/(\r\n|\n|\r)/gm, "");
    // TODO: change datatype of selected or make use of array.
    let conditionMap = Object.assign(
      {}, ...this._conditions.map(c => (
        {[c.uuid]: Object.assign(
          {}, c,
          //{selected: c.selected.map(x => `${questions.find(q => q.uuid === x).category}_${questions.find(q => q.uuid === x).id}`)}
          {selected: c.selected.map(x => `${questions.find(q => q.uuid === x).id}`)}
          )}
      ))
    )
    let statementMap = Object.assign(
      {}, ...this._statements.map(statement => (
        {[statement.uuid]: statement}
      ))
    )
    let scoreMap = {
      conditions: conditionMap,
      statements: statementMap
    }
    let amazonConnectData = {}
    const questionIDList = []
    questions.forEach(question => {
      questionIDList.push(question.id)
    })

    const questionIDSet = new Set(questionIDList)
    const uuidMap = {}
    const xxxMap = Array.from(new Set(questionIDList.map(q => { return { key: q, uuid: uuid() } })))

    // Set sadly has no map method :(
    questionIDSet.forEach(id => {
      uuidMap[id] = uuid()
    })

    let qCount = 0

    questions.forEach((question, i) => {

      const contactFlowName = `${basename}_${i}`
      let contactFlow
      if (question.inputType === 'radio') {
        contactFlow = ContactFlowQuestion({
          name: contactFlowName,
          basename: basename,
          uuidMap: uuidMap,
          xxxMap: xxxMap,
          question: question,
          index: i,
          language: language,
          errorText: defaultText.errorText[language],
          repeatText: defaultText.repeatText[language]
        })
      } else {
        contactFlow = ContactFlowQuestionDate({
          name: contactFlowName,
          basename: basename,
          uuidMap: uuidMap,
          xxxMap: xxxMap,
          question: question,
          index: i,
          language: language,
          errorText: defaultText.errorText[language],
          repeatText: defaultText.repeatText[language]
        })
      }

      qCount++
      amazonConnectData[contactFlowName] = contactFlow
    })

    const staticStartName = `${basename}_start`
    const staticStart = ContactFlowStaticStart({
      name: staticStartName,
      //text: defaultText.greetingText[language],
      text: predlude,
      language: language,
      firstQuestionName: `${basename}_0`,
      scoreMap: scoreMap
    })
    amazonConnectData[staticStartName] = staticStart


    const staticEndName = `${basename}_end`

    let conditions = this._conditions.map(c => Object.assign(
      {}, c, 
      //{selected: c.selected.map(x => `${questions.find(q => q.uuid === x).category}_${questions.find(q => q.uuid === x).id}`)}))
      {selected: c.selected.map(x => `${questions.find(q => q.uuid === x).id}`)}))

    const staticEnd = ContactFlowStaticEnd({ name: staticEndName, language: language, statements: conditions, endPoint, text: postlude }) // rename this stuff...
    amazonConnectData[staticEndName] = staticEnd
    return amazonConnectData
  }

  downloadJSONFiles() {
    const zip = new JSZip();
    let jsonMap = this.createContactFlows()
    let name = this._name

    Object.keys(jsonMap).forEach((key, x) => {
      zip.file(`${key}.json`, JSON.stringify(jsonMap[key], null, 4))

    })
    zip.generateAsync({ type: "blob" }).then(function (content) {
      fileDownload(content, `${name}.zip`)
    })
    this.modalCtrl.dismiss()
  }

}