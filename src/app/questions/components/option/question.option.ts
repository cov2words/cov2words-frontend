import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'question-option',
  templateUrl: 'question.option.html',
  styleUrls: ['./question.option.scss']
})
export class QuestionOption implements OnInit {
  @Input() option: string
  @Input() index: number
  @Input() onDeleteOption: (uuid: string, index: number) => {}
  @Input() onChangeOptionText: (index: number, text: string) => {}

  constructor(
  ) { }

  ngOnInit() {
  }

  deleteOption(uuid: string, index: number) {
    this.onDeleteOption(uuid, index)
  }

  changeOptionText(index: number, event: any) {
    this.onChangeOptionText(index, event.target.value)
  }

}