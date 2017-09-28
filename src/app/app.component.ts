import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { trigger, state, animate, transition} from '@angular/animations';
import { Store, Action } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs/Rx';

import { environment } from '../environments/environment';
import { GreetingService } from './_services/greeting.service';
import { RhymeService } from './_services/rhyme.service';
import { viewTransitionTime, viewTransitionConfig, onScreenYStyle, aboveScreenStyle } from './_animations/styles';
import { } from './app.module';
import { AppState, CommandStacks } from './app.datatypes';
import {
  SetAppViewAction,
  SetShutterViewAction,
  GetNextGreetingAction,
  GetRandomGreetingAction,
  GetRandomNameAction,
  SetNameAction,
  GetNextRhymeAction,
  GetRandomRhymeAction,
  SetColorAction,
  SetUnitLengthAction,
  SetWorkActiveAction,
  SetCommandStacksAction,
  DeleteCommandStacksAction
} from './app.reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [GreetingService, RhymeService],
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
  appView$: Observable<boolean>;
  shutterView$: Observable<boolean>;
  greeting$: Observable<string>;
  name$: Observable<string>;
  rhyme$: Observable<string>;
  color$: Observable<string>;
  unitLength$: Observable<number>;
  appViewSubscription: Subscription;
  greetingSubscription: Subscription;
  rhymeSubscription: Subscription;
  fullGreetingSubscription: Subscription;
  colorSubscription: Subscription;
  shutterAlive: boolean;
  appAnimateState: boolean;
  contentAlive: boolean;
  greeting: string;
  rhyme: string;
  fullGreeting: string;
  colors: {[key: string]: string} = {};

  /* LIFECYCLE HOOK FUNCTIONS */
  constructor(private store: Store<AppState>, private _greetingService: GreetingService) {
    this.appView$ = store.select(state => state.appView);
    this.shutterView$ = store.select(state => state.shutterView);
    this.greeting$ = store.select(state => state.greeting);
    this.name$ = store.select(state => state.name);
    this.rhyme$ = store.select(state => state.rhyme);
    this.color$ = store.select(state => state.color);
    this.unitLength$ = store.select(state => state.unitLength);
    this.appViewSubscription = this.appView$.subscribe(state => this.handleAppView(state));
    this.greetingSubscription = this.greeting$.subscribe(state => this.greeting = state);
    this.rhymeSubscription = this.rhyme$.subscribe(state => this.rhyme = state);
    this.fullGreetingSubscription = Observable.zip(this.greeting$, this.name$).subscribe(state => this.concatGreeting(state));
    this.colorSubscription = this.color$.subscribe(state => this.getColors(state));
  }
  ngOnInit(): void {
    if (!environment.production) {
      this.setAppView(true);
      this.setShutterView(true);
      this.getRandomGreeting();
      this.getRandomName();
      this.getRandomRhyme();
      this.setColor('#7486B4');
      this.setWorkActive(null);
      this.appAnimateState = true;
    }
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
  //   if (this.appView) {
  //     this.shutterInstance.redrawAll(values);
  //   }
  //   if (this.contentAlive) {
  //     this.contentInstance.redrawAll(values);
  //   }
  //   return Promise.resolve(null);
  // }
  handleAppView(state: boolean): void {
    if (state !== false) {
      console.log('goingshutter');
      this.goShutter().then(resolve => setTimeout(() => this.turnOffContent(), viewTransitionTime));
    } else {
      console.log('goingcontent');
      this.goContent().then(resolve => setTimeout(() => this.turnOffShutter(), viewTransitionTime));
    }
    console.log(this.shutterAlive, this.contentAlive);
    setTimeout(() => console.log(this.shutterAlive, this.contentAlive), 2000);
  }
  concatGreeting(state: string[]) {
    if (state[0] && state[1]) {
      this.fullGreeting = this._greetingService.concatenateGreeting(state[0], state[1]);
    }
  }
  getColors(color: string): void {
    this.colors['welcomeColor'] = color;
    this.colors['contentColor'] = '#505781';
    this.colors['aboutColor'] = '#8CA2D9';
  }
  calcUnitLength(): void {

  }
  getCurrentShutterAnimationState(): string {
    return this.appAnimateState.toString();
  }
  getCurrentContentAnimationState(): string {
    return (!this.appAnimateState).toString();
  }

  /* EVENT FUNCTIONS */
  scrollFunc(e: WheelEvent): void {
    if (e.ctrlKey === false && e.altKey === false) {
      e.preventDefault();
      const shutterAlive = this.shutterAlive;
      const contentAlive = this.contentAlive;
      if (shutterAlive === true && contentAlive === false && e.deltaY <= -10) {
        this.setAppView(false);
      } else if (shutterAlive === false && contentAlive === true && e.deltaY >= 10) {
        this.setAppView(true);
      }
    }
  }
  setAppView(shutterAlive: boolean): void {
    this.store.dispatch(new SetAppViewAction(shutterAlive));
  }
  setShutterView(welcomeAlive: boolean): void {
    this.store.dispatch(new SetShutterViewAction(welcomeAlive));
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
  getNextRhyme() {
    this.store.dispatch(new GetNextRhymeAction(this.rhyme));
  }
  getRandomRhyme(): void {
    this.store.dispatch(new GetRandomRhymeAction);
  }
  setColor(color: string): void {
    this.store.dispatch(new SetColorAction(color));
  }
  setUnitLength(unitLength: number): void {
    this.store.dispatch(new SetUnitLengthAction(unitLength));
  }
  setWorkActive(id: number): void {
    this.store.dispatch(new SetWorkActiveAction(id));
  }
  setCommandStacks(commandStacks: CommandStacks): void {
    this.store.dispatch(new SetCommandStacksAction(commandStacks));
  }
  deleteCommandStacks(id: number): void {
    this.store.dispatch(new DeleteCommandStacksAction(id));
  }

  goShutter(): Promise<null> {
    console.log('goShutter');
    this.instantiateShutter().then(resolve => setTimeout(() => this.animateShutter()));
    return Promise.resolve(null);
  }
  instantiateShutter(): Promise<null> {
    this.shutterAlive = true;
    return Promise.resolve(null);
  }
  animateShutter(): Promise<null> {
    this.appAnimateState = true;
    return Promise.resolve(null);
  }
  turnOffContent(): void {
    this.contentAlive = false;
    console.log('turnOffContent');
  }
  goContent(): Promise<null> {
    console.log('goContent');
    this.instantiateContent().then(resolve => setTimeout(() => this.animateContent()));
    return Promise.resolve(null);
  }
  instantiateContent(): Promise<null> {
    this.contentAlive = true;
    return Promise.resolve(null);
  }
  animateContent(): Promise<null> {
    this.appAnimateState = false;
     return Promise.resolve(null);
  }
  turnOffShutter(): void {
    this.shutterAlive = false;
    console.log('turnOffShutter');
  }
}
