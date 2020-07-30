import { uuid } from "uuidv4"
import { Component, OnInit, Input } from '@angular/core'
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store'
import fileDownload from "js-file-download"
import * as JSZip from "jszip"
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
  private _name: string

  constructor(
    private store: Store<any>,
    private modalCtrl: ModalController
  ) { }

  get name() {
    return this._name
  }

  trackByFn(index, item) {
    return index
  }

  ngOnInit() {
    this.store.select(state => state.questions.present).subscribe(response => {
      this._questions = response.questions
      this._statements = response.statements.statements
      this._name = response.questionaire.name
        .replace(/ /g, "_")
        .toLowerCase()
    })
  }

  changeName(event: any) {
    this._name = event.detail.value
  }

  createContactFlows() {
    let language = "de"
    let basename = this._name
    let questions = this._questions
    let scoreMap = {}
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

      const contactFlowName = `${basename}_${i}`//`question_${i}_${language}`
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
      //dispatch(setAmazonConnectData({[contactFlowName]: contactFlow}))
    })
    //dispatch(setQuestionCount(qCount))

    const staticStartName = `${basename}_start`//`question_start_${language}` "automated_charite_data_start_en"//
    const staticStart = ContactFlowStaticStart({
      name: staticStartName,
      text: defaultText.greetingText[language],
      language: language,
      firstQuestionName: `${basename}_0`,
      scoreMap: scoreMap
    })
    amazonConnectData[staticStartName] = staticStart
    //dispatch(setAmazonConnectData({[staticStartName]: staticStart}))    

    //state = getState()

    const staticEndName = `${basename}_end`//`question_end_${language}` "automated_charite_data_end_en"//
    const staticEnd = ContactFlowStaticEnd({ name: staticEndName, language: language, statements: this._statements })
    amazonConnectData[staticEndName] = staticEnd
    //dispatch(setAmazonConnectData({[staticEndName]: staticEnd}))
    return amazonConnectData
  }

  downloadJSONFiles() {
    const zip = new JSZip();

    console.log("good")
    let jsonMap = this.createContactFlows()
    console.log("?!?")

    Object.keys(jsonMap).forEach((key, x) => {
      zip.file(`${key}.json`, JSON.stringify(jsonMap[key], null, 4))

    })
    zip.generateAsync({ type: "blob" }).then(function (content) {
      fileDownload(content, "example.zip")
    })
  }

}