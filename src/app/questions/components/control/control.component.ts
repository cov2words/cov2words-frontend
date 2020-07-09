import { Component, Input, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import fileDownload from "js-file-download"
import * as JSZip from "jszip"
import * as Questions from "../../store/questions.actions"


@Component({
  selector: 'control-component',
  templateUrl: 'control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit {

  public hasFuture
  public hasPast

  constructor(
    private store: Store<any>
  ) { }

  ngOnInit() {
    this.store.select(state => state.questions.future).subscribe(response => {
      this.hasFuture = response.length ? true : false
    })
    this.store.select(state => state.questions.past).subscribe(response => {
      this.hasPast = response.length ? true : false
    })
  }

  loadQuestions(questionaire: string) {
    this.store.dispatch(new Questions.GetQuestions(questionaire))
  }

  saveQuestions(questionaire: string, questions: []) {
    this.store.dispatch(new Questions.SetQuestions({questionaire, questions}))
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