import { Component, OnInit, Input } from '@angular/core'
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'edit-modal',
  templateUrl: 'edit.modal.html',
  styleUrls: ['./question.component.scss']
})
export class EditModal implements OnInit {

  @Input() setValue: (val: any, index?: number) => {}
  @Input() initialValue: string = ''
  @Input() labelText: string = 'default text'
  @Input() placeholder: string = 'default placeholder'
  @Input() index: number = -1

  private _value

  constructor(
    private modalCtrl: ModalController
  ) { }

  get value() {
    return this._value
  }

  ngOnInit() {
    this._value = this.initialValue
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