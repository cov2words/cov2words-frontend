import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Statements from "../../store/actions/statement"

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
    private store: Store<any>
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
      this._questions = response.questions
    }, error => {
      console.log(error)
    })
  }

  trackByFn(index, item) {
    return index
  }

  changeOperand(event) {
    let operand = event.detail.value
    let conditionUUID = this.condition.uuid
    let statementUUID = this.statementUUID
    this.store.dispatch(new Statements.ChangeOperand({operand, statementUUID, conditionUUID}))
  }

  changeSelected(event) {
    let selected = [event.detail.value]
    let conditionUUID = this.condition.uuid
    let statementUUID = this.statementUUID
    this.store.dispatch(new Statements.ChangeSelected({selected, statementUUID, conditionUUID}))
  }

  changeValue(event) {
    let value = event.detail.value
    let conditionUUID = this.condition.uuid
    let statementUUID = this.statementUUID
    this.store.dispatch(new Statements.ChangeValue({value, statementUUID, conditionUUID}))
  }

  changeCombination(event) {
    let combination = event.detail.value
    let conditionUUID = this.condition.uuid
    let statementUUID = this.statementUUID
    this.store.dispatch(new Statements.ChangeCombination({combination, statementUUID, conditionUUID}))
  }
}