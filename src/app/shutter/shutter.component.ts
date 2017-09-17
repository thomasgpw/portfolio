import { Component, Output, Input, EventEmitter } from '@angular/core';
import { NgIf } from '@angular/common';
import { trigger, state, animate, transition} from '@angular/animations';
import { viewTransitionTime, viewTransitionConfig, onScreenXStyle, leftOfScreenStyle, rightOfScreenStyle } from '../_animations/styles';

@Component({
  selector: 'app-shutter',
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
  @Input() name: string;

  welcomeOpen = true;
  aboutOpen = false;
  welcomeAnimate = true;
  aboutAnimate = false;

  goWelcomeFunc () {
    this.welcomeOpen = true;
    this.welcomeAnimate = true;
    this.aboutAnimate = false;
    window.setTimeout(this.turnOffAbout, viewTransitionTime);
  }
  goAboutFunc () {
    this.aboutOpen = true;
    this.aboutAnimate = true;
    this.welcomeAnimate = false;
    window.setTimeout(this.turnOffWelcome, viewTransitionTime);
  }
  turnOffAbout() {
    this.aboutOpen = false;
  }
  turnOffWelcome() {
    this.welcomeOpen = false;
  }
  checkWelcomeOpen () {
    return this.welcomeOpen;
  }
  checkAboutOpen () {
    return this.aboutOpen;
  }
  goContentFunc() {
    this.goContentEvent.emit(null);
  }
  conLog() {
    console.log('start');
  }
}
