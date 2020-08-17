import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Statements from "../../store/actions/statement"
import * as Answers from "../../store/actions/answer"
import { uuid } from 'uuidv4';
import { mockIndex, answersToStatements } from "./deleteme"

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
  private _questions
  private _evaluations: any = []//string[] = []

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
    return this._answers.some(a => a === "")
    //return this._selectedQuestions.length !== this._answers.length
  }

  ngOnInit() {
    this.store.select(state => state.questions.present).subscribe(response => {

      let { statements, conditions, questions, answers } = response
      
      this._statements = statements || []
      this._answers = answers || []
      this._conditions = conditions || []
      this._questions = questions
      this._selectedQuestions = this.getSelectedQuestions(statements, questions)
    })
  }

  addStatement() {
    let statement = {
      name: this._newStatementName,
      uuid: uuid(),
      conditions: []
    }
    this._newStatementName = ""
    this.store.dispatch(new Statements.AddStatement({ statement }))
  }

  changeNewStatementName(event) {
    this._newStatementName = event.detail.value
  }

  changeAnswer(selectedQuestion: any, index: number, event: any) {
    console.log(selectedQuestion, index, event.detail.value)
    let answer = {[selectedQuestion.uuid]: event.detail.value}
    this.store.dispatch(new Answers.ChangeAnswer({ index, answer }))
  }

  getSelectedQuestions = (statements, questions) => {
    console.log("blin", {statements, questions})
    const selectedQuestions = []
    statements.forEach((statement, i) => {
        statement.conditions.forEach(c => {
          let condition = this._conditions.find(cond => cond.uuid === c)
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
    let conditionMap = Object.assign(
      {}, ...this._conditions.map(c => (
        {[c.name]: Object.assign(
          {}, c,
          {selected: c.selected.map(x => `${this._questions.find(q => q.uuid === x).category}_${this._questions.find(q => q.uuid === x).id}`)}
          )}
      ))
    )
    let statementMap = Object.assign(
      {}, ...this._statements.map(statement => (
        {[statement.name]: statement}
      ))
    )
    let scoreMap = JSON.stringify({
      conditions: conditionMap,
      statements: statementMap
    })
    /* let answers = this._answers.map(a => Object.keys(a).map(k => this._questions.find(q => q.uuid === k))) */
    let answers = {}
    this._answers.forEach(a => {
      Object.keys(a).forEach(k => {
        let question = this._questions.find(q => q.uuid === k)
        let key = `${question.category}_${question.id}`
        answers[key] = question.options.indexOf(a[k]) + 1 // fuck my life....
      })
    })
    //console.log(JSON.stringify(JSON.parse(scoreMap), null, 4))

    //console.log("FUCK THIS", answers, scoreMap)
    let rec = answersToStatements(answers, scoreMap)
    console.log("recommendation", rec)
  }

}