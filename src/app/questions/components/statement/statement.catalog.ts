import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
//import { ModalController } from '@ionic/angular';
import * as Statements from "../../store/actions/statement"
import { uuid } from 'uuidv4';

@Component({
  selector: 'statement-catalog',
  templateUrl: 'statement.catalog.html',
  styleUrls: ['./statement.component.scss']
})
export class StatementCatalog implements OnInit {

  private _statements
  private _newStatementName: string = ''
  private _answers
  private _selectedQuestions
  private _conditions

  constructor(
    private store: Store<any>
    //private modalCtrl: ModalController
  ) { }

  get statements() {
    return this._statements
  }

  get conditions() {
    return this._conditions
  }

  get newStatementName() {
    return this._newStatementName
  }

  get selectedQuestions() {
    return this._selectedQuestions
  }

  get answers() {
    return this._answers
  }

  ngOnInit() {
    this.store.select(state => state.questions.present).subscribe(response => {
      this._statements = response.statements.statements
      this._answers = response.statements.answers
      this._selectedQuestions = this.getQuestions(response)
    })
  }

  addStatement() {
    let statement = {
      name: this._newStatementName,
      uuid: uuid(),
      conditions: []
    }
    this.store.dispatch(new Statements.AddStatement({ statement }))
  }

  changeNewStatementName(event) {
    this._newStatementName = event.detail.value
  }

  changeAnswer(selectedQuestion: any, index: number, event: any) {
    let answer = {[selectedQuestion.id]: event.detail.value}
    this.store.dispatch(new Statements.ChangeAnswer({ index, answer }))
  }

  getQuestions = state => {
    const statements = state.statements.statements

    const questions = []
    statements.forEach((statement, i) => {
      statement.conditions.forEach(condition => {
        condition.selected.forEach(s =>
          questions.includes(s) || ["", undefined].includes(s) ? null : questions.push(s)
        )
      })
    })

    return questions.map(q => state.questions.find(x => x.id === q))
                    .sort((a,b) => state.questions.findIndex(x => x.id == a.id) - state.questions.findIndex(x => x.id == b.id))
  }

  santasLittleHelper = (value, operand, targetValue) => {

    switch (operand) {
      case "==":
        return value === targetValue
      case "!=":
        return value !== targetValue
      case "<=":
        return value <= targetValue
      case ">=":
        return value >= targetValue
      case "&&":
        return value && targetValue
      case "||":
        return value || targetValue
      default:
        alert("FAIL RAISE ERROR")
        return undefined
    }
  }

  handleEvalLogic = () => {
    // TODO: refactor this
    this._statements.forEach((statement, i) => {
      let truthList = []
      statement.conditions.forEach((condition, j) => {

        let blyat, conditionTrue
        let cList = []
        if (condition.hasOwnProperty("combination")) {
          let nextcondition = statement.conditions[j + 1]
          let nahui, nextconditionTrue
          let cList2 = []
          nextcondition.selected.forEach((sel, k) => {
            nahui = this._answers.find(a => a.hasOwnProperty(sel))[sel]
            nextconditionTrue = this.santasLittleHelper(nahui, nextcondition.operand, nextcondition.value)
            cList2.push(nextconditionTrue)
          })
          condition.selected.forEach((sel, k) => {
            blyat = this._answers.find(a => a.hasOwnProperty(sel))[sel]
            conditionTrue = this.santasLittleHelper(blyat, condition.operand, condition.value)
            cList.push(conditionTrue)
          })
          let cListTrue = cList.every(c => c === true)
          let cList2True = cList2.every(c => c === true)

          conditionTrue = this.santasLittleHelper(cListTrue, condition.combination, cList2True)
        }
        else {
          condition.selected.forEach((sel, k) => {
            blyat = this._answers.find(a => a.hasOwnProperty(sel))[sel]
            conditionTrue = this.santasLittleHelper(blyat, condition.operand, condition.value)
            cList.push(conditionTrue)
          })
          conditionTrue = cList.every(c => c === true)
        }
        if (j + 1 !== statement.conditions.length || j === 0) {
          truthList.push(conditionTrue)
        }
      })
      truthList.every(t => t === true) ? alert(statement.trueText) : alert(statement.falseText)
    })

  }
}