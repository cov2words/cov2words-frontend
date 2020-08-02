import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
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
  private _evaluations: string[] = []

  constructor(
    private store: Store<any>
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

  get evaluations() {
    return this._evaluations
  }

  get evalDisabled() {
    return this._selectedQuestions.length !== this._answers.length
  }

  ngOnInit() {
    this.store.select(state => state.questions.present).subscribe(response => {
      let { statements, answers } = response.questionaire.statements
      let { questions } = response.questionaire
      
      this._statements = statements
      this._answers = answers
      this._selectedQuestions = this.getSelectedQuestions(statements, questions)
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
    let answer = {[selectedQuestion.uuid]: event.detail.value}
    this.store.dispatch(new Statements.ChangeAnswer({ index, answer }))
  }

  getSelectedQuestions = (statements, questions) => {
    const selectedQuestions = []
    statements.forEach((statement, i) => {
      statement.conditions.forEach(condition => {
        condition.selected.forEach(s =>
          questions.includes(s) || ["", undefined].includes(s) ? null : selectedQuestions.push(s)
        )
      })
    })

    return selectedQuestions.map(q => questions.find(x => x.uuid === q))
                    .sort((a,b) => questions.findIndex(x => x.uuid == a.uuid) - questions.findIndex(x => x.uuid == b.uuid))
  }

  evalCondtion = (value, operand, targetValue) => {

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

  getEvaluations = () => {

    /*  evaluate each statement's conditions with the answers given. return array of strings */

    let evaluations: string[] = []

    this._statements.forEach(statement => {

      let truthList: boolean[] = []

      statement.conditions.forEach((condition, i: number) => {

        let conditionTruthList: boolean[] = []
        let conditionTrue: boolean

        /* statement conditions can be chained together. if theres is a follow-up condition, current condition will have combination property */

        if (condition.hasOwnProperty("combination")) {

          let nextcondition = statement.conditions[i+1]
          let nextcondtionTruthList: boolean[] = []

          nextcondition.selected.forEach(sel => {
            let answer = this._answers.find(a => a.hasOwnProperty(sel))[sel]
            let { operand, value} = nextcondition
            let nextconditionTrue = this.evalCondtion(answer, operand, value)

            nextcondtionTruthList.push(nextconditionTrue)
          })

          condition.selected.forEach(sel => {
            let answer = this._answers.find(a => a.hasOwnProperty(sel))[sel]
            let { operand, value} = condition
            let conditionTrue = this.evalCondtion(answer, operand, value)

            conditionTruthList.push(conditionTrue)
          })

          conditionTrue = this.evalCondtion(
            conditionTruthList, condition.combination, nextcondtionTruthList
          )
        }

        else {

          condition.selected.forEach(sel => {
            let answer = this._answers.find(a => a.hasOwnProperty(sel))[sel]
            let { operand, value} = condition
            let conditionTrue = this.evalCondtion(answer, operand, value)
            conditionTruthList.push(conditionTrue)
          })

          conditionTrue = conditionTruthList.every(c => c === true)
        }

        if (i + 1 !== statement.conditions.length || i === 0) {
          truthList.push(conditionTrue)
        }

      })

      truthList.every(t => t === true) ? evaluations.push(statement.trueText) : evaluations.push(statement.falseText)

    })

    console.log({evaluations})

    this._evaluations = evaluations

    return evaluations
  }
}