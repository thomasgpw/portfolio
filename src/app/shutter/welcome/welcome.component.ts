import { Component, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
  // animations: [
  //   trigger('enterExitRight', [
  //     state('in', style({transform:'translateX(0)'})),
  //     transition(':enter', [
  //     	style({transform: 'translateX(100%)'}),
  //     	animate(100)
  //     ])
  //   ])
  // ]
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
