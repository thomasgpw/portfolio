import { Component, OnInit, Output, Input, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { NgIf } from '@angular/common';
import { trigger, state, animate, transition} from '@angular/animations';
import { viewTransitionTime, viewTransitionConfig, onScreenXStyle, leftOfScreenStyle, rightOfScreenStyle } from '../_animations/styles';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-shutter',
  templateUrl: './shutter.component.html',
  styleUrls: ['./shutter.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
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
  @Output() setAppViewEvent: EventEmitter<null> = new EventEmitter();
  @Output() setShutterViewEvent: EventEmitter<boolean> = new EventEmitter();
  @Output() getNextGreetingEvent: EventEmitter<null>  = new EventEmitter();
  @Output() getRandomGreetingEvent: EventEmitter<null>  = new EventEmitter();
  @Output() getRandomNameEvent: EventEmitter<null>  = new EventEmitter();
  @Output() setNameEvent: EventEmitter<string>  = new EventEmitter();
  @Output() getNextTipEvent: EventEmitter<null>  = new EventEmitter();
  @Output() getNextRhymeEvent: EventEmitter<null> = new EventEmitter();
  @Input() shutterView$: Observable<boolean>;
  @Input() fullGreeting: string[3];
  @Input() tip: string;
  @Input() rhyme: string;
  @Input() colors: {[key: string]: string};

  shutterViewSubscriber;
  welcomeAlive: boolean;
  aboutAlive: boolean;
  shutterAnimateState: boolean;

  /* LIFECYCLE HOOK FUNCTIONS */
  constructor() {
  }

  ngOnInit(): void {
    console.log('shutter.ngInit');
    this.welcomeAlive = true;
    this.aboutAlive = true;
    this.shutterAnimateState = undefined;
    this.shutterViewSubscriber = this.shutterView$.subscribe(state => this.handleShutterView(state));
  }

  /* ON CHANGE SPECIFIC FUNCTIONS */
  handleShutterView(state: boolean): void {
    console.log('shutter.handleShutterView', state);
    if (this.shutterAnimateState === undefined) {
      this.shutterAnimateState = state;
    }
    if (state !== false) {
      this.goWelcome().then(resolve => setTimeout(() => this.turnOffAbout(), viewTransitionTime));
    } else {
      this.goAbout().then(resolve => setTimeout(() => this.turnOffWelcome(), viewTransitionTime));
    }
  }
  getCurrentWelcomeAlive(): boolean {
    return this.welcomeAlive;
  }
  getCurrentAboutAlive(): boolean {
    return this.aboutAlive;
  }
  getCurrentWelcomeAnimationState(): string {
    return this.shutterAnimateState.toString();
  }
  getCurrentAboutAnimationState(): string {
    return (!this.shutterAnimateState).toString();
  }
  logData(param: any) {
    console.log(param);
  }

  /* EVENT FUNCTIONS */
  scrollFunc(e: WheelEvent): void {
    console.log('shutter.scrollFunc');
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
  setAppViewFunc(): void {
    console.log('shutter.setAppViewFunc');
    this.setAppViewEvent.emit(null);
  }
  setShutterViewFunc(welcomeAlive: boolean): void {
    console.log('shutter.setShutterViewFunc');
    this.setShutterViewEvent.emit(welcomeAlive);
  }
  getNextGreetingFunc(): void {
    console.log('shutter.getNextGreetingFunc');
    this.getNextGreetingEvent.emit(null);
  }
  getRandomGreetingFunc(): void {
    console.log('shutter.getRandomGreetingFunc');
    this.getRandomGreetingEvent.emit(null);
  }
  getRandomNameFunc(): void {
    console.log('shutter.getRandomNameFunc');
    this.getRandomNameEvent.emit(null);
  }
  setNameFunc(name: string): void {
    console.log('shutter.SetNameFunc');
    this.setNameEvent.emit(name);
  }
  getNextTipFunc(): void {
    console.log('shutter.getNextTipFunc');
    this.getNextTipEvent.emit(null);
  }
  getNextRhymeFunc(): void {
    this.getNextRhymeEvent.emit(null);
  }

  /* ANIMATION FUNCTIONS */
  goWelcome(): Promise<null> {
    console.log('shutter.goWelcome');
    this.instantiateWelcome().then(resolve => setTimeout(() => this.animateWelcome()));
    return Promise.resolve(null);
  }
  instantiateWelcome(): Promise<null> {
    console.log('shutter.instantiateWelcome');
    this.welcomeAlive = true;
    return Promise.resolve(null);
  }
  animateWelcome(): Promise<null> {
    console.log('shutter.animateWelcome');
    this.shutterAnimateState = true;
    return Promise.resolve(null);
  }
  turnOffAbout(): void {
    this.aboutAlive = false;
    console.log('aboutOff');
  }
  goAbout(): Promise<null> {
    console.log('goAbout');
    this.instantiateAbout().then(resolve => setTimeout(() => this.animateAbout()));
    return Promise.resolve(null);
  }
  instantiateAbout(): Promise<null> {
    console.log('shutter.instantiateAbout');
    this.aboutAlive = true;
    return Promise.resolve(null);
  }
  animateAbout(): Promise<null> {
    console.log('shutter.animateAbout');
    this.shutterAnimateState = false;
    return Promise.resolve(null);
  }
  turnOffWelcome(): void {
    this.welcomeAlive = false;
    console.log('welcomeOff');
  }
}
