import { Component, OnInit } from '@angular/core'
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store'
import * as Questions from "../../store/actions/question"
import { uuid } from "uuidv4"

@Component({
  selector: 'create-questionaire-modal',
  templateUrl: 'createquestionaire.modal.html',
  styleUrls: ['./control.component.scss']
})
export class CreateQuestionaireModal implements OnInit {

  private _name: string = ''
  private _userEmail

  constructor(
    private store: Store<any>,
    private modalCtrl: ModalController
  ) { }

  get complete() {
    return this._name.length > 0
  }

  get name() {
    return this._name
  }

  ngOnInit() {
    this.store.select(state => state.questions.present).subscribe(response => {
      this._userEmail = response.auth.email
    })
  }

  changeName(event) {
    this._name = event.target.value
  }

  addQuestionaire() {
    let questionaire = {
      name: this._name,
      owner: this._userEmail,
      uuid: uuid(),
      categories: []
    }
    this.store.dispatch(new Questions.CreateQuestionaire({...questionaire}))
    this.modalCtrl.dismiss()
  }

}