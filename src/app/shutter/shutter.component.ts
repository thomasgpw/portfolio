import { Component, Output, EventEmitter } from '@angular/core';
import { NgIf } from '@angular/common';

let welcomeOpen:boolean = true;
@Component({
  selector: 'shutter',
  templateUrl: './shutter.component.html',
  styleUrls: ['./shutter.component.css']
})
export class ShutterComponent {
@Output() goContentEvent: EventEmitter<any> = new EventEmitter();
  toggleShutterFunc () {
  	welcomeOpen = !welcomeOpen
  }
  checkWelcomeOpen () {
  	if (welcomeOpen) {return(true)} else{return(false)};
  }
  goContentFunc() {
  	this.goContentEvent.emit(null);
  }
}
