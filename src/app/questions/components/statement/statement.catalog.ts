import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Statements from "../../store/actions/statement"
import * as Answers from "../../store/actions/answer"
import * as Questionaire from "../../store/actions/questionaire"
import { uuid } from 'uuidv4';
import { answersToStatements } from "./deleteme"

@Component({
  selector: 'statement-catalog',
  templateUrl: 'statement.catalog.html',
  styleUrls: ['./statement.component.scss']
})
export class StatementCatalog implements OnInit {

  private _statementsList
  private _statements
  private _newStatementName: string = ''
  private _answers
  private _selectedQuestions
  private _conditions
  private _questions
  private _evaluations: any = []
  private _answerVisibility: boolean = false

  constructor(
    private store: Store<any>
  ) { }

  get statements() {
    return this._statementsList
  }

  get conditions() {
    return this._conditions
  }

  get newStatementName() {
    return this._newStatementName
  }

  get selectedQuestions() {
    //return this._selectedQuestions
    let blyat = this.getSelectedQuestions()
    console.log({blyat})
    return blyat
  }

  get answers() {
    return this._answers
  }

  get evaluations() {
    return this._evaluations
  }

  get evalDisabled() {
    //console.log("fuck you", this._answers)
    return this._answers.some(a => a === "")
  }

  get answersVisible() {
    return this._answerVisibility
  }

  /* get statementsList() {
    return this._statements
  } */

  ngOnInit() {
    this.store.select(state => state.questions.present).subscribe(response => {

      let { statements, conditions, questions, answers, questionaire } = response

      this._statementsList = questionaire.statements || []
      this._statements = statements || []
      this._answers = answers || []
      this._conditions = conditions || []
      this._questions = questions
      //this._selectedQuestions = this.getSelectedQuestions(questionaire.statements || [], statements, questions)
    })
  }

  trackByUUID(index, item) {
    return item.uuid
  }

  trackByItem(index, item) {
    return item
  }

  trackByIndex(index, item) {
    return index
  }

  toggleAnswerVisibility() {
    this._answerVisibility = !this._answerVisibility
  }

  addStatement() {
    let statement = {
      //name: this._newStatementName,
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
    let answer = { [selectedQuestion.uuid]: event.detail.value }
    this.store.dispatch(new Answers.ChangeAnswer({ index, answer }))
  }

  getSelectedQuestions = () => {
    const selectedQuestions = []
    this._statementsList.forEach((statementUUID, i) => {
      let statement = this._statements.find(s => s.uuid === statementUUID)
      statement.conditions.forEach(c => {
        let condition = this._conditions.find(cond => cond.uuid === c)
        condition.selected.forEach(s => {
          selectedQuestions.includes(s) || ["", undefined].includes(s) ? null : selectedQuestions.push(s)
        })
      })

    })

    return selectedQuestions.map(q => this._questions.find(x => x.uuid === q))
      //.sort((a, b) => this._questions.findIndex(x => x.uuid == a.uuid) - this._questions.findIndex(x => x.uuid == b.uuid))
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
        //{[c.name]: Object.assign(
        {
          [c.uuid]: Object.assign(
            {}, c,
            //{selected: c.selected.map(x => `${this._questions.find(q => q.uuid === x).category}_${this._questions.find(q => q.uuid === x).id}`)}
            {selected: c.selected.map(x => `${this._questions.find(q => q.uuid === x).id}`)}

          )
        }
      ))
    )
    let statementMap = Object.assign(
      {}, ...this._statements.map(statement => (
        //{[statement.name]: statement}
        { [statement.uuid]: statement }
      ))
    )
    let scoreMap = JSON.stringify({
      conditions: conditionMap,
      statements: statementMap
    })

    let answers = {}
    this._answers.forEach(a => {
      Object.keys(a).forEach(k => {
        let question = this._questions.find(q => q.uuid === k)
        //let key = `${question.category}_${question.id}`
        let key = question.id
        answers[key] = question.inputType === 'radio' ? question.options.indexOf(a[k]) : parseInt(a[k])// fuck my life....
      })
    })

    let rec = answersToStatements(answers, scoreMap)
    /* this._evaluations = rec.sort((a, b) => {
      console.log("the a and the b", a, b)
      return this._questions.findIndex(x => x.id == a) - this._questions.findIndex(x => x.id == b)
    }) */
    this._evaluations = rec
  }

  doReorder(ev: any) {
    // Before complete is called with the items they will remain in the
    // order before the drag
    

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. Update the items variable to the
    // new order of items
    let { from, to } = ev.detail
    this.store.dispatch(new Questionaire.MoveStatementDnD({dragIndex: from, dropIndex: to}))
    ev.detail.complete();

    // After complete is called the items will be in the new order

  }

}