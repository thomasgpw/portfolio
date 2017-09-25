import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { trigger, state, animate, transition} from '@angular/animations';
import { Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';

import { WelcomeService } from './_services/welcome.service';
import { viewTransitionTime, viewTransitionConfig, onScreenYStyle, aboveScreenStyle, belowScreenStyle } from './_animations/styles';
import { AppState, CommandStacks } from './app.datatypes';
import {
  ToggleShutterAliveAction,
  ToggleWelcomeAliveAction,
  GetNextGreetingAction,
  GetRandomGreetingAction,
  GetRandomNameAction,
  SetNameAction,
  SetWorkActiveAction
} from './app.reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [WelcomeService],
  animations: [
    trigger('shutterView', [
      state('true', onScreenYStyle),
      state('false', aboveScreenStyle),
      transition('true<=>false', [
        animate(viewTransitionConfig)
      ]),
      transition('void=>false', [
        aboveScreenStyle,
        animate(viewTransitionConfig, aboveScreenStyle)
      ])
    ]),
    trigger('contentView', [
      state('true', onScreenYStyle),
      state('false', onScreenYStyle),
      transition('true<=>false', [
        animate(viewTransitionConfig)
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  shutterAlive$: Observable<boolean>;
  welcomeAlive$: Observable<boolean>;
  greeting$: Observable<string>;
  name$: Observable<string>;
  color$: Observable<string>;
  shutterAliveSubscriber;
  greetingSubscriber;
  fullGreetingSubscriber;
  colorSubscriber;
  shutterAlive: boolean;
  shutterAnimateState: boolean;
  contentAlive: boolean;
  contentAnimateState: boolean;
  greeting: string;
  fullGreeting: string;
  colors: {[key: string]: string} = {};

  /* LIFECYCLE HOOK FUNCTIONS */
  constructor(private store: Store<AppState>, private _welcomeService: WelcomeService) {
    this.shutterAlive$ = store.select(state => state.shutterAlive);
    this.welcomeAlive$ = store.select(state => state.welcomeAlive);
    this.greeting$ = store.select(state => state.greeting);
    this.name$ = store.select(state => state.name);
    this.color$ = store.select(state => state.color);
    this.shutterAliveSubscriber = this.shutterAlive$.subscribe(state => this.handleShutterAlive(state));
    this.greetingSubscriber = this.greeting$.subscribe(state => this.greeting = state);
    this.fullGreetingSubscriber = Observable.zip(this.greeting$, this.name$).subscribe(state => this.concatGreeting(state));
    this.colorSubscriber = this.color$.subscribe(state => this.getColors(state));
  }
  ngOnInit(): void {
  }

  /* ON CHANGE SPECIFIC FUNCTIONS */
  // initGraphics(): Promise<null> {
  //   this.calcAspectLengths().then(data => this.redrawAll(data));
  //   return Promise.resolve(null);
  // }
  // calcAspectLengths(): Promise<number[]> {
  //   const width = window.innerWidth;
  //   const height = window.innerHeight;
  //   this.width = width;
  //   this.height = height;
  //   return Promise.resolve([width, height]);
  // }
  // redrawAll(values: number[]): Promise<null> {
  //   if (this.shutterAlive) {
  //     this.shutterInstance.redrawAll(values);
  //   }
  //   if (this.contentAlive) {
  //     this.contentInstance.redrawAll(values);
  //   }
  //   return Promise.resolve(null);
  // }
  concatGreeting(state: string[]) {
    if (state[0] && state[1]) {
      this.fullGreeting = this._welcomeService.concatenateGreeting(state[0], state[1]);
    }
  }
  getColors(color: string): void {
    console.log(color);
    this.colors['welcomeColor'] = color;
    this.colors['contentColor'] = '#505781';
    this.colors['aboutColor'] = '#8CA2D9';
  }

  /* EVENT FUNCTIONS */
  scrollFunc(e: WheelEvent): void {
    if (e.ctrlKey === false && e.altKey === false) {
      e.preventDefault();
      const shutterAlive = this.shutterAlive;
      const contentAlive = this.contentAlive;
      if (shutterAlive === true && contentAlive === false && e.deltaY <= -10) {
        this.goContent().then(resolve => setTimeout(() => this.turnOffShutter(this), viewTransitionTime));
      } else if (shutterAlive === false && contentAlive === true && e.deltaY >= 10) {
        this.goShutter().then(resolve => setTimeout(() => this.turnOffContent(this), viewTransitionTime));
      }
    }
  }
  toggleShutterAlive(): void {
    this.store.dispatch(new ToggleShutterAliveAction);
  }
  toggleWelcomeAlive(): void {
    this.store.dispatch(new ToggleWelcomeAliveAction);
  }
  getNextGreeting() {
    this.store.dispatch(new GetNextGreetingAction(this.greeting));
  }
  getRandomGreeting(): void {
    this.store.dispatch(new GetRandomGreetingAction);
  }
  getRandomName(): void {
    this.store.dispatch(new GetRandomNameAction);
  }
  setName(name: string): void {
    this.store.dispatch(new SetNameAction(name));
  }
  setWorkActive(id: number): void {
    this.store.dispatch(new SetWorkActiveAction(id));
  }

  handleShutterAlive(state: boolean): void {
    if (state) {
      this.goShutter().then(resolve => setTimeout(() => this.turnOffContent(this), viewTransitionTime));
    } else {
      this.goContent().then(resolve => setTimeout(() => this.turnOffShutter(this), viewTransitionTime));
    }
  }
  goShutter(): Promise<null> {
    this.instantiateShutter().then(resolve => setTimeout(() => this.animateShutter()));
    return Promise.resolve(null);
  }
  instantiateShutter(): Promise<null> {
    this.shutterAlive = true;
    this.shutterAnimateState = false;
    this.contentAnimateState = true;
    return Promise.resolve(null);
  }
  animateShutter(): Promise<null> {
    this.shutterAnimateState = true;
    this.contentAnimateState = false;
    return Promise.resolve(null);
  }
  turnOffContent(that: this): void {
    that.contentAlive = false;
  }
  goContent(): Promise<null> {
    this.instantiateContent().then(resolve => setTimeout(() => this.animateContent()));
    return Promise.resolve(null);
  }
  instantiateContent(): Promise<null> {
    this.contentAlive = true;
    this.contentAnimateState = false;
    this.shutterAnimateState = true;
    return Promise.resolve(null);
  }
  animateContent(): Promise<null> {
    this.contentAnimateState = true;
    this.shutterAnimateState = false;
     return Promise.resolve(null);
  }
  turnOffShutter(that: this): void {
    that.shutterAlive = false;
  }
}
