import { Component, Output, EventEmitter } from '@angular/core';
import { NgIf } from '@angular/common';
import { trigger, state, animate, transition} from '@angular/animations';
import { animateConfig, onScreenXStyle, leftOfScreenStyle, rightOfScreenStyle } from '../_animations/styles';

let welcomeOpen:boolean = true;
@Component({
  selector: 'shutter',
  templateUrl: './shutter.component.html',
  styleUrls: ['./shutter.component.css'],
  animations: [
    trigger('welcomeView', [
      state('*', onScreenXStyle),
      transition(':enter', [
        rightOfScreenStyle,
        animate(animateConfig, onScreenXStyle)
      ]),
      transition(':leave', [
        onScreenXStyle,
        animate(animateConfig, rightOfScreenStyle)
      ])
    ]),
    trigger('aboutView', [
      state('*', onScreenXStyle),
      transition(':enter', [
        leftOfScreenStyle,
        animate(animateConfig, onScreenXStyle)
      ]),
      transition(':leave', [
        onScreenXStyle,
        animate(animateConfig, leftOfScreenStyle)
      ])
    ])
  ]
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
