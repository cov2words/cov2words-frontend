import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'question-next',
  templateUrl: 'question.next.html',
  styleUrls: ['./question.next.scss']
})
export class QuestionNext implements OnInit {
  @Input() nextQuestion: string
  @Input() index: number
  @Input() options: string[]
  @Input() onChangeNextQuestion: (index: number, nextQuestion: string) => {}

  ngOnInit() {
  }

  changeNextQuestion(index: number, event: any) {
    this.onChangeNextQuestion(index, event.target.value)
  }

}