import { Component, OnInit, Output, Input, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { NgIf } from '@angular/common';
import { trigger, state, animate, transition} from '@angular/animations';
import { viewTransitionTime, viewTransitionConfig, onScreenXStyle, leftOfScreenStyle, rightOfScreenStyle } from '../_animations/styles';

@Component({
  selector: 'app-shutter',
  templateUrl: './shutter.component.html',
  styleUrls: ['./shutter.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
export class ShutterComponent implements OnInit {
  @Output() toggleShutterAliveEvent: EventEmitter<null> = new EventEmitter();
  @Output() toggleWelcomeAliveEvent: EventEmitter<null> = new EventEmitter();
  @Output() getNextGreetingEvent: EventEmitter<null>  = new EventEmitter();
  @Output() getRandomGreetingEvent: EventEmitter<null>  = new EventEmitter();
  @Output() getRandomNameEvent: EventEmitter<null>  = new EventEmitter();
  @Output() setNameEvent: EventEmitter<string>  = new EventEmitter();
  @Input() welcomeAlive: boolean;
  @Input() fullGreeting: string;
  @Input() colors: {[key: string]: string};

  aboutAlive: boolean;
  welcomeAnimateState: boolean;
  aboutAnimateState: boolean;

  /* LIFECYCLE HOOK FUNCTIONS */
  constructor() { }

  ngOnInit(): void {
    const welcomeAlive = this.welcomeAlive;
    this.aboutAlive = !welcomeAlive;
    this.welcomeAnimateState = welcomeAlive;
    this.aboutAnimateState = !welcomeAlive;
  }

  /* EVENT FUNCTIONS */
  scrollFunc(e: WheelEvent): void {
    if (e.ctrlKey === false && e.altKey === false) {
      e.preventDefault();
      const welcomeAlive = this.welcomeAlive;
      const aboutAlive = this.aboutAlive;
      if (welcomeAlive === true && aboutAlive === false && e.deltaX <= -10) {
        this.goAbout().then(resolve => setTimeout(() => this.turnOffWelcome(), viewTransitionTime));
      } else if (welcomeAlive === false && aboutAlive === true && e.deltaX >= 10) {
        this.goWelcome().then(resolve => setTimeout(() => this.turnOffAbout(), viewTransitionTime));
      }
    }
  }
  toggleShutterAliveFunc(): void {
    this.toggleShutterAliveEvent.emit(null);
  }
  toggleWelcomeAliveFunc(): void {
    this.handleWelcomeAlive(this.welcomeAlive);
  }
  getNextGreetingFunc(): void {
    this.getNextGreetingEvent.emit(null);
  }
  getRandomGreetingFunc(): void {
    this.getRandomGreetingEvent.emit(null);
  }
  getRandomNameFunc(): void {
    this.getRandomNameEvent.emit(null);
  }
  setNameFunc(name: string): void {
    this.setNameEvent.emit(name);
  }

  /* ANIMATION FUNCTIONS */
  handleWelcomeAlive(state: boolean): void {
    if (state) {
      this.goAbout().then(resolve => setTimeout(() => this.turnOffWelcome(), viewTransitionTime));
    } else {
      this.goWelcome().then(resolve => setTimeout(() => this.turnOffAbout(), viewTransitionTime));
    }
  }
  goWelcome(): Promise<null> {
    this.instantiateWelcome().then(resolve => setTimeout(() => this.animateWelcome()));
    return Promise.resolve(null);
  }
  instantiateWelcome(): Promise<null> {
    this.welcomeAlive = true;
    this.toggleWelcomeAliveEvent.emit(null);
    this.welcomeAnimateState = false;
    this.aboutAnimateState = true;
    return Promise.resolve(null);
  }
  animateWelcome(): Promise<null> {
    this.welcomeAnimateState = true;
    this.aboutAnimateState = false;
    return Promise.resolve(null);
  }
  turnOffAbout(): void {
    this.aboutAlive = false;
  }
  goAbout(): Promise<null> {
    console.log(this.aboutAlive);
    this.instantiateAbout().then(resolve => setTimeout(() => this.animateAbout()));
    return Promise.resolve(null);
  }
  instantiateAbout(): Promise<null> {
    this.aboutAlive = true;
    this.aboutAnimateState = false;
    this.welcomeAnimateState = true;
    return Promise.resolve(null);
  }
  animateAbout(): Promise<null> {
    this.aboutAnimateState = true;
    this.welcomeAnimateState = false;
    return Promise.resolve(null);
  }
  turnOffWelcome(): void {
    this.welcomeAlive = false;
    this.toggleWelcomeAliveEvent.emit(null);
  }
}
