import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private db: AngularFireDatabase) {}

  getQuestions(questionaire: string) {
    return this.db.object(`questionaire/${questionaire}/questions`).valueChanges()
  }

  setQuestions(questionaire: string, questions: []) {
    return this.db.object(`questionaire/${questionaire}/questions`).set(questions)
  }

}