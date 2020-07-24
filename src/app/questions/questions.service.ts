import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private db: AngularFireDatabase) {}

  getQuestionaires() {
    return this.db.list('questionaire').valueChanges()
  }

  getQuestionaire(questionaire: string) {
    return this.db.object(`questionaire/${questionaire}`).valueChanges()
  }

  setQuestionaire(questionaire: {name: string, owner: string, created: string, uuid: string}, questions: []) {
    // WIP
    let modified = new Date(), created = new Date()
    let metadata = Object.assign({}, questionaire, {modified: modified.toISOString(), created: questionaire.created || created.toISOString()})
    let data = { metadata, questions }
    return this.db.object(`questionaire/${questionaire.uuid}`).set(data)
  }

}