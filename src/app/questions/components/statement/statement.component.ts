import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Statements from "../../store/actions/statement"
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
    private store: Store<any>
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

  addCondition() {
    let condition = {
      name: this._newConditionName,
      selected: [],
      uuid: uuid()
    }
    let statementUUID = this.statement.uuid
    this.store.dispatch(new Statements.AddCondition({condition, statementUUID}))
  }
  changeNewConditionName(event) {
    this._newConditionName = event.detail.value
  }

  updateStatementTrueText(event) {
    let value = event.detail.value
    let statementUUID = this.statement.uuid
    this.store.dispatch(new Statements.UpdateStatementTrueText({value, statementUUID}))
  }

  updateStatementFalseText(event) {
    let value = event.detail.value
    let statementUUID = this.statement.uuid
    this.store.dispatch(new Statements.UpdateStatementFalseText({value, statementUUID}))
  }
}