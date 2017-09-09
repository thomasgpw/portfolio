import { Component, Output, EventEmitter } from '@angular/core';
import { NgIf } from '@angular/common';
import { trigger, state, animate, transition} from '@angular/animations';
import { viewTransitionConfig, onScreenXStyle, leftOfScreenStyle, rightOfScreenStyle } from '../_animations/styles';

let welcomeOpen:boolean = true;
@Component({
  selector: 'shutter',
  templateUrl: './shutter.component.html',
  styleUrls: ['./shutter.component.css'],
  animations: [
    trigger('welcomeView', [
      state('true', onScreenXStyle),
      state('false', rightOfScreenStyle),
      transition('false => true', [
        animate(viewTransitionConfig)
      ]),
      transition('true => false', [
        animate(viewTransitionConfig)
      ])
    ]),
    trigger('aboutView', [
      state('true', onScreenXStyle),
      state('false', leftOfScreenStyle),
      transition('false => true', [
        animate(viewTransitionConfig)
      ]),
      transition('true => false', [
        animate(viewTransitionConfig)
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
    return welcomeOpen;
  }
  checkAboutOpen () {
    return !welcomeOpen;
  }
  conlog(s){
    console.log(s);
  }
  goContentFunc() {
  	this.goContentEvent.emit(null);
  }
}
