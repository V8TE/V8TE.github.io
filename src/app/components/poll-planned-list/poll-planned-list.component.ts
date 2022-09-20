import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'vc-poll-planned-list',
  templateUrl: 'poll-planned-list.component.html',
  styleUrls: ['./poll-planned-list.component.less']
})

export class PollPlannedList implements OnInit {
  @Input() displayedAnswers!: Array<String>
  @Input() title!: String
  @Input() subject!: String
  ngOnInit(): void {
  }
  
}
