import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {ToastController} from "@ionic/angular";


@Component({
    selector: 'app-home',
    templateUrl: 'questions.page.html',
    styleUrls: ['./questions.page.scss']
})
export class QuestionsPage implements OnInit {

    public questions

    constructor(
      private store: Store<any>,
      private toastController: ToastController
    ) {}

    ngOnInit() {
      this.store.select(state => state.questions.present).subscribe(response => {
        this.questions = response.questions
        if (response.message) {
          this.presentToast(response.message)
        }
        
      }, error => {
        console.log(error)
      })
    }

    trackByFn(index,item) {
      return item.uuid
    }

    async presentToast(message: string) {
      const toast = await this.toastController.create({
          message: message,
          duration: 2000
      });
      toast.present();
    }
}