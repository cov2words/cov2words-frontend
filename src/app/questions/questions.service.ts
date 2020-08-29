import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(public db: AngularFireDatabase) {}

  getQuestionaires(owner: string) {
    console.log("blyat")
    return this.db.list('questionaire', ref => ref.orderByChild('metadata/owner').equalTo(owner)).valueChanges()
  }

  getQuestionaire(questionaire: string) {
    return this.db.object(`questionaire/${questionaire}`).valueChanges()
  }

  setQuestionaire(questionaire: {name: string, owner: string, created: string, uuid: string}, questions: [], statements, conditions) {
    // WIP
    let modified = new Date(), created = new Date()
    let metadata = Object.assign({}, questionaire, {modified: modified.toISOString(), created: questionaire.created || created.toISOString()})
    let data = { metadata, questions, statements, conditions }
    return this.db.object(`questionaire/${questionaire.uuid}`).set(data)
  }

}