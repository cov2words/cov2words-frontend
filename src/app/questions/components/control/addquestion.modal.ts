import { Component, OnInit, Input } from '@angular/core'
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store'
import * as Questions from "../../store/questions.actions"
import { uuid } from "uuidv4"

@Component({
  selector: 'add-question-modal',
  templateUrl: 'addquestion.modal.html',
  styleUrls: ['./control.component.scss']
})
export class AddQuestionModal implements OnInit {
  @Input() questionTypes: string[] = ['radio', 'date']

  private _id
  private _text
  private _inputType

  constructor(
    private store: Store<any>,
    private modalCtrl: ModalController
  ) { }

  get complete() {
    //console.log(this._id && this._text && this._inputType)
    return this._id && this._text && this._inputType
  }

  ngOnInit() {
    this.store.select(state => state.questions.present.newQuestion).subscribe(response => {
      this._id = response.id
      this._text = response.text
      this._inputType = response.inputType
    })
  }

  changeNewQuestionAttribute(event, attr) {
    this.store.dispatch(new Questions.ChangeNewQuestionAttribute({attribute: attr, value: event.target.value}))
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