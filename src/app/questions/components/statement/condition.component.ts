import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { ModalController } from '@ionic/angular';
import * as Statements from "../../store/actions/statement"
import { EditModal } from "../question/edit.modal"


@Component({
  selector: 'condition-component',
  templateUrl: 'condition.component.html',
  styleUrls: ['./statement.component.scss']
})
export class ConditionComponent implements OnInit {
  @Input() condition: any
  @Input() statementUUID: string
  @Input() isLastElement: boolean

  private _categories: string[]
  private _operands: string[] = ["==", "<=", ">=", "!="]
  private _combinations: string[] = ["&&", "||"]
  private _conditions: any
  private _questions: any[]

  constructor(
    private store: Store<any>,
    private modalCtrl: ModalController
  ) { }

  get conditions() {
    return this._conditions
  }

  get questions() {
    return this._questions
  }

  get operands() {
    return this._operands
  }

  get combinations() {
    return this._combinations
  }

  ngOnInit() {
    this.store.select(state => state.questions.present).subscribe(response => {
      this._questions = response.questionaire.questions
    }, error => {
      console.log(error)
    })
  }

  trackByUUID(index, item) {
    return item.uuid
  }

  trackByIndex(index, item) {
    return index
  }

  renameCondition = (value: string) => {
    let attr = "name", conditionUUID = this.condition.uuid, statementUUID = this.statementUUID
    this.store.dispatch(new Statements.ChangeConditionAttribute({attr, value, statementUUID, conditionUUID,}))
  }

  changeOperand(event) {
    let attr = "operand", value = event.detail.value, conditionUUID = this.condition.uuid, statementUUID = this.statementUUID
    this.store.dispatch(new Statements.ChangeConditionAttribute({attr, value, statementUUID, conditionUUID}))
  }

  changeSelected(event) {
    let selected = event.detail.value, conditionUUID = this.condition.uuid, statementUUID = this.statementUUID
    this.store.dispatch(new Statements.ChangeSelected({selected, statementUUID, conditionUUID}))
  }

  changeValue = (value: string) => {
    let attr = "value",  conditionUUID = this.condition.uuid, statementUUID = this.statementUUID
    this.store.dispatch(new Statements.ChangeConditionAttribute({attr, value, statementUUID, conditionUUID}))
  }

  changeCombination(event) {
    let attr = "combination", value = event.detail.value, conditionUUID = this.condition.uuid, statementUUID = this.statementUUID
    this.store.dispatch(new Statements.ChangeConditionAttribute({attr, value, statementUUID, conditionUUID}))
  }

  async showChangeName() {
    let modal = await this.modalCtrl.create({
      component: EditModal,
      componentProps: {
        setValue: this.renameCondition,
        initialValue: this.condition.name,
        labelText: `change name of condition ${this.condition.name}`,
        placeholder: 'enter name'
      }
    })
    return await modal.present()
  }

  async showChangeValue() {
    let modal = await this.modalCtrl.create({
      component: EditModal,
      componentProps: {
        setValue: this.changeValue,
        initialValue: this.condition.value,
        labelText: `change value of condition ${this.condition.name}`,
        placeholder: 'enter value'
      }
    })
    return await modal.present()
  }
}