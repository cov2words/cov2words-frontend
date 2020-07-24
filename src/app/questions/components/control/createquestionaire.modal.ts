import { Component, OnInit } from '@angular/core'
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store'
import * as Questions from "../../store/questions.actions"
import { uuid } from "uuidv4"

@Component({
  selector: 'create-questionaire-modal',
  templateUrl: 'createquestionaire.modal.html',
  styleUrls: ['./control.component.scss']
})
export class CreateQuestionaireModal implements OnInit {

  private _name: string = ''

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

  ngOnInit() {}

  changeName(event) {
    this._name = event.target.value
  }

  addQuestionaire() {
    let questionaire = {
      name: this._name,
      owner: 'elnerdo',
      uuid: uuid()
    }
    this.store.dispatch(new Questions.CreateQuestionaire({...questionaire}))
    this.modalCtrl.dismiss()
  }

}