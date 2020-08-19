import { Component, OnInit, Input, ViewChild } from '@angular/core'
import { ModalController, IonTextarea, IonInput } from '@ionic/angular';

@Component({
  selector: 'edit-modal',
  templateUrl: 'edit.modal.html',
  styleUrls: ['./question.component.scss']
})
export class EditModal implements OnInit {

  @Input() setValue: (val: any, index?: number) => {}
  @Input() pattern: string = 'text'
  @Input() initialValue: string = ''
  @Input() labelText: string = 'default text'
  @Input() placeholder: string = 'default placeholder'
  @Input() index: number = -1
  @ViewChild('input_el', {static: false}) input_el: IonTextarea

  private _value

  constructor(
    private modalCtrl: ModalController
  ) { }

  get value() {
    return this._value
  }

  get numberPattern() {
    return this.pattern === 'number'
  }

  ngOnInit() {
    this._value = this.initialValue
  }

  /* <3 this */
  ionViewDidEnter() {
    this.input_el.setFocus()
    console.log(this.input_el)
  }

  blyat(event) {
    console.log(event)
    console.log(this)
  }

  changeValue(event) {
    this._value = event.target.value
  }

  onSetValue() {
    this.index >= 0
      ? this.setValue(this.index, this._value)
      : this.setValue(this._value)
    this.modalCtrl.dismiss()
  }

}