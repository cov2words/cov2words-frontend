import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {ToastController} from "@ionic/angular";
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { from } from 'rxjs';
import {AuthService} from "../auth/auth.service"
import * as Questionaire from "./store/actions/questionaire"
import * as Auth from "./store/actions/auth"
import { flatMap, map } from 'rxjs/operators';

@Component({
    selector: 'app-home',
    templateUrl: 'questions.page.html',
    styleUrls: ['./questions.page.scss']
})
export class QuestionsPage implements OnInit {

    public questionaire
    public questions
    public user
    public _showStatements: boolean = false

    constructor(
      private store: Store<any>,
      private toastController: ToastController,
      public auth: AuthService,
      private router: Router
    ) {}

    ngOnInit() {
      from(Plugins.Storage.get({ key: 'authData' })).subscribe(response => {
        let user = JSON.parse(response.value)
        console.log(response)
        this.store.dispatch(new Auth.SetUser({user}))
      })

      this.store.select(state => state.questions.present).subscribe(response => {
        this.questionaire = response.questionaire
        this.questions = response.questions
        console.log(response.auth)
        this.user = response.auth.email
        if (response.message) {
          this.presentToast(response.message)
        }
        
      }, error => {
        console.log(error)
      })
    }

    get showStatements() {
      return this._showStatements
    }

    get questionsList() {
      return this.questionaire.questions.map(q => this.questions.find(x => x.uuid === q))
    }

    get preludeText() {
      return this.questionaire.preludeText
    }

    toggleQuestionsStatements = () => {
      this._showStatements = !this._showStatements
    }

    changePreludeText = (event: any) => {
      let attr = "preludeText", value = event.target.value
      this.store.dispatch(new Questionaire.ChangeQuestionaireAttribute({attr, value}))
    }

    changePostludeText = (event: any) => {
      let attr = "postludeText", value = event.target.value
      this.store.dispatch(new Questionaire.ChangeQuestionaireAttribute({attr, value}))
    }

    trackByFn(index,item) {
      return item
    }

    trackByUUID(index, item) {
      return item.uuid
    }

    trackByIndex(index, item) {
      return index
    }

    doReorder(ev: any) {
      // Before complete is called with the items they will remain in the
      // order before the drag
      
  
      // Finish the reorder and position the item in the DOM based on
      // where the gesture ended. Update the items variable to the
      // new order of items
      let { from, to } = ev.detail
      this.store.dispatch(new Questionaire.MoveQuestionDnD({dragIndex: from, dropIndex: to}))
      ev.detail.complete();
  
      // After complete is called the items will be in the new order

    }

    logout() {
      //this.store.dispatch(new Auth.SetUser({user: {}}))
      this.store.dispatch({type: 'LOGOUT'})
      this.auth.logout()
      this.router.navigateByUrl('/auth')
    }

    async presentToast(message: string) {
      const toast = await this.toastController.create({
          message: message,
          duration: 2000
      });
      toast.present();
    }
}