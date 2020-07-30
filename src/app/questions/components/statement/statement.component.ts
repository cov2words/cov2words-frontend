import { Component, OnInit, Input } from '@angular/core';
import { Store, State } from '@ngrx/store';
import { ModalController } from '@ionic/angular';
import * as Statements from "../../store/actions/statement"
import { EditModal } from "../question/edit.modal"
import {uuid} from "uuidv4"


@Component({
  selector: 'statement-component',
  templateUrl: 'statement.component.html',
  styleUrls: ['./statement.component.scss']
})
export class StatementComponent implements OnInit {
  @Input() statement: any

  private _newConditionName: string = ''

  constructor(
    private store: Store<any>,
    private modalCtrl: ModalController
  ) { }


  get conditions() {
    return this.statement.conditions
  }

  get newConditionName() {
    return this._newConditionName
  }

  ngOnInit() {}

  trackByFn(index, item) {
    return item.uuid
  }

  renameStatement = (name: string) => {
    let statementUUID = this.statement.uuid
    this.store.dispatch(new Statements.RenameStatement({statementUUID,name}))
  }

  deleteStatement() {
    let statementUUID = this.statement.uuid
    this.store.dispatch(new Statements.DeleteStatement({statementUUID}))
  }

  addCondition = (name: string) => {
    let condition = {
      //name: this._newConditionName,
      name,
      selected: [],
      uuid: uuid()
    }
    let statementUUID = this.statement.uuid
    this.store.dispatch(new Statements.AddCondition({condition, statementUUID}))
  }

  changeNewConditionName(event) {
    this._newConditionName = event.detail.value
  }

  updateStatementTrueText = (value: string) => {
    let statementUUID = this.statement.uuid
    this.store.dispatch(new Statements.UpdateStatementTrueText({value, statementUUID}))
  }

  updateStatementFalseText = (value: string) => {
    let statementUUID = this.statement.uuid
    this.store.dispatch(new Statements.UpdateStatementFalseText({value, statementUUID}))
  }

  async showAddCondition() {
    let modal = await this.modalCtrl.create({
      component: EditModal,
      componentProps: {
        setValue: this.addCondition,
        initialValue: this._newConditionName,
        labelText: 'add condition',
        placeholder: 'enter name'
      }
    })
    return await modal.present()
  }

  async showChangeName() {
    let modal = await this.modalCtrl.create({
      component: EditModal,
      componentProps: {
        setValue: this.renameStatement,
        initialValue: this.statement.name,
        labelText: `change name of statement ${this.statement.id}`,
        placeholder: 'enter name'
      }
    })
    return await modal.present()
  }

  async showChangeTrueText() {
    let modal = await this.modalCtrl.create({
      component: EditModal,
      componentProps: {
        setValue: this.updateStatementTrueText,
        initialValue: this.statement.trueText,
        labelText: `change truetext of statement ${this.statement.id}`,
        placeholder: 'enter text'
      }
    })
    return await modal.present()
  }

  async showChangeFalseText() {
    let modal = await this.modalCtrl.create({
      component: EditModal,
      componentProps: {
        setValue: this.updateStatementFalseText,
        initialValue: this.statement.falseText,
        labelText: `change falsetext of statement ${this.statement.id}`,
        placeholder: 'enter text'
      }
    })
    return await modal.present()
  }
}