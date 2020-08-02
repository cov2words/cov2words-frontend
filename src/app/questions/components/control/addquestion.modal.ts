import { Component, OnInit, Input } from '@angular/core'
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store'
import * as Questions from "../../store/actions/question"
import { uuid } from "uuidv4"

@Component({
  selector: 'add-question-modal',
  templateUrl: 'addquestion.modal.html',
  styleUrls: ['./control.component.scss']
})
export class AddQuestionModal implements OnInit {
  @Input() questionTypes: string[] = ['radio', 'date']

  private _id: string
  private _text: string
  private _inputType: string

  constructor(
    private store: Store<any>,
    private modalCtrl: ModalController
  ) { }

  get complete() {
    return this._id && this._text && this._inputType
  }

  ngOnInit() {
  }

  changeNewQuestionId(event) {
    this._id = event.target.value
  }

  changeNewQuestionText(event) {
    this._text = event.target.value
  }

  changeNewQuestionType(event) {
    this._inputType = event.target.value
  }

  addQuestion() {
    let question = {
      id: this._id,
      text: this._text,
      inputType: this._inputType,
      uuid: uuid()
    }
    this.store.dispatch(new Questions.AddQuestion({question}))
    this.modalCtrl.dismiss()
  }

}