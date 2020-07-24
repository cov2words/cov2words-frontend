import { Component, OnInit, Input } from '@angular/core'
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store'
import * as Questions from "../../store/questions.actions"

@Component({
  selector: 'edit-categories-modal',
  templateUrl: 'editcategories.modal.html',
  styleUrls: ['./control.component.scss']
})
export class EditCategoriesModal implements OnInit {

  private _categories: string[]
  private _newCategory: string =  ''

  constructor(
    private store: Store<any>,
    private modalCtrl: ModalController
  ) { }

  get categories() {
    return this._categories
  }

  get newCategory() {
    return this._newCategory
  }

  trackByFn(index, item) {
    return index
  }

  ngOnInit() {
    this.store.select(state => state.questions.present.questionaire).subscribe(response => {
      this._categories = response.categories || []
    })
  }

  addCategory() {
    this.store.dispatch(new Questions.AddCategory({value: this._newCategory}))
  }

  deleteCategory(index: number) {
    this.store.dispatch(new Questions.DeleteCategory({index}))
  }

  editCategory(index: number, event: any) {
    let value = event.detail.value
    this.store.dispatch(new Questions.EditCategory({index, value}))
  }

  editNewCategory(event: any) {
    this._newCategory = event.detail.value
  }

  close() {
    this.modalCtrl.dismiss()
  }

}