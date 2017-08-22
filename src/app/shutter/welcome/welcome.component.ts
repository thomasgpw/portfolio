import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
@Output() goContentEvent: EventEmitter<any> = new EventEmitter();
@Output() toggleShutterEvent: EventEmitter<any> = new EventEmitter();
  shutterToggleFunc() {
    this.toggleShutterEvent.emit(null);
  }
  goContentFunc() {
  	this.goContentEvent.emit(null);
  }
}
