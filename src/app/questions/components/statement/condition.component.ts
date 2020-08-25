import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { ModalController } from '@ionic/angular';
import * as Statements from "../../store/actions/statement"
import * as Conditions from "../../store/actions/condition"
import { EditModal } from "../question/edit.modal"


@Component({
  selector: 'condition-component',
  templateUrl: 'condition.component.html',
  styleUrls: ['./statement.component.scss']
})
export class ConditionComponent implements OnInit {
  @Input() conditionUUID: string
  @Input() statementUUID: string
  @Input() isLastElement: boolean

  public condition
  private _questionChoices
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

  get isRadioQuestion() {
    //console.log(this._questions.find(q => this.condition.selected.includes(q.uuid)))
    let isRadio = this.condition.selected.length <= 0
      ? true
      : this._questions.find(q => this.condition.selected.includes(q.uuid)).inputType === 'radio'
    //console.log(isRadio)
    return isRadio
   //return this._questions.find(q => this.condition.selected.includes(q.uuid))//.inputType === 'radio'
  }

  // TODO: category: {uuid: "", name: ""}. atm its just string
  /* get conditionChoices() {
    return [...this._categories, ...this._questions]
  } */

  get operands() {
    return this._operands
  }

  get combinations() {
    return this._combinations
  }

  get questionChoices() {
    return this._questionChoices
  }

  ngOnInit() {
    this.store.select(state => state.questions.present).subscribe(response => {
      // wtf is going on here?
      this._questions = response.questions
      let condition = response.conditions.find(cond => cond.uuid === this.conditionUUID)
      this.condition = condition
      let question =  condition ? response.questions.find(q => condition.selected.includes(q.uuid)) : undefined
      //this._questionChoices = condi ? response.questions.find(q => condi.selected.includes(q.uuid)).options : []
      this._questionChoices = question ? question.options : []
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

  trackByItem(index, item) {
    return item
  }

  deleteCondition = () => {
    let { uuid } = this.condition, statementUUID = this.statementUUID
    this.store.dispatch(new Conditions.DeleteCondition({uuid, statementUUID }))
  }

  /* renameCondition = (value: string) => {
    let attr = "name", uuid = this.condition.uuid, statementUUID = this.statementUUID
    this.store.dispatch(new Conditions.ChangeConditionAttribute({attr, value, statementUUID, uuid}))
  } */

  changeOperand(event) {
    let attr = "operand", value = event.detail.value, uuid = this.condition.uuid, statementUUID = this.statementUUID
    this.store.dispatch(new Conditions.ChangeConditionAttribute({attr, value, statementUUID, uuid}))
  }

  changeSelected(event) {
    let attr = "selected", value = [event.detail.value], uuid = this.conditionUUID, statementUUID = this.statementUUID
    console.log(value)
    this.store.dispatch(new Conditions.ChangeConditionSelected({value, statementUUID, uuid}))
  }

  changeValueRadio = (event) => {//questiondUUID: string) => {
    let attr = "value",  uuid = this.condition.uuid, statementUUID = this.statementUUID
    let val = event.detail.value
    let display = this._questions.find(q => q.uuid === this.condition.selected[0]).options[val]
    let value = {val, display, offset: 1}
    this.store.dispatch(new Conditions.ChangeConditionAttribute({attr, value, statementUUID, uuid}))
  }

  changeValueNumber = (val) => {
    let attr = "value",  uuid = this.condition.uuid, statementUUID = this.statementUUID
    let value = {val: parseInt(val), display: val, offset: 0}
    this.store.dispatch(new Conditions.ChangeConditionAttribute({attr, value, statementUUID, uuid}))
  }

  changeCombination(event) {
    let attr = "combination", value = event.detail.value, uuid = this.condition.uuid, statementUUID = this.statementUUID
    this.store.dispatch(new Conditions.ChangeConditionAttribute({attr, value, statementUUID, uuid}))
  }

  /* async showChangeName() {
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
  } */

  async showChangeValue() {
    let modal = await this.modalCtrl.create({
      component: EditModal,
      componentProps: {
        setValue: this.changeValueNumber,
        initialValue: this.condition.value.val,
        labelText: `change value of condition ${this.condition.uuid}`,
        placeholder: 'enter value',
        pattern: 'number'
      }
    })
    return await modal.present()
  }
}