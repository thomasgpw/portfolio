import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { primaryColor } from "../../../colors";

@Component({
  selector: 'welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  @Output() goContentEvent: EventEmitter<any> = new EventEmitter();
  @Output() toggleShutterEvent: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    (document.getElementById("welcome") as HTMLElement).style.backgroundColor = primaryColor;
  }

  arrowPath = '/assets/arrow.svg';
  shutterToggleFunc() {
    this.toggleShutterEvent.emit(null);
  }
  goContentFunc() {
  	this.goContentEvent.emit(null);
  }
}
