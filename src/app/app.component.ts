import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { trigger, state, animate, transition} from '@angular/animations';
import { Store, Action } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs/Rx';

import { environment } from '../environments/environment';
import { StringService } from './_services/string.service';
import { GREETINGS } from './_text/greetings';
import { NAMES } from './_text/names';
import { TIPS } from './_text/tips';
import { RHYMES } from './_text/rhymes';
import { viewTransitionTime, viewTransitionConfig, onScreenYStyle, aboveScreenStyle } from './_animations/styles';
import { AppState, CommandStacks, IterableStringMap, IterableStringList } from './app.datatypes';
import {
  SetAppViewAction,
  SetShutterViewAction,
  GetNextStringAction,
  GetRandomStringAction,
  SetStringAction,
  SetColorAction,
  SetUnitLengthAction,
  SetWorkActiveAction,
  SetCommandStacksMapAction,
  SetCommandStacksAction,
  DeleteCommandStacksAction
} from './app.reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [StringService],
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
  _stringServiceMap: {
    [key: string]: StringService
  } = {};
  appView$: Observable<boolean>;
  shutterView$: Observable<boolean>;
  tip$: Observable<string>;
  rhyme$: Observable<string>;
  color$: Observable<string>;
  unitLength$: Observable<number>;
  commandStacksMap$: Observable<{[key: number]: CommandStacks}>;
  shutterAlive: boolean;
  appAnimateState: boolean;
  contentAlive: boolean;
  welcomeAlive: boolean;
  fullGreeting: string[];
  colors: {[key: string]: string} = {};

  /* LIFECYCLE HOOK FUNCTIONS */
  constructor(private store: Store<AppState>) {
    this._stringServiceMap['greeting'] = new StringService(GREETINGS);
    this._stringServiceMap['name'] = new StringService(NAMES);
    this._stringServiceMap['tip'] = new StringService(TIPS);
    this._stringServiceMap['rhyme'] = new StringService(RHYMES);
    this.appView$ = store.select(state => state.appView);
    this.shutterView$ = store.select(state => state.shutterView);
    this.tip$ = store.select(state => state.texts['tip'].instance);
    this.rhyme$ = store.select(state => state.texts['rhyme'].instance);
    this.color$ = store.select(state => state.color);
    this.unitLength$ = store.select(state => state.unitLength);
    this.commandStacksMap$ = store.select(state => state.commandStacksMap);
    this.appView$.subscribe(state => this.handleAppView(state));
    this.shutterView$.subscribe(state => this.welcomeAlive = state);
    Observable.combineLatest(
      store.select(state => state.texts['greeting'].instance),
      store.select(state => state.texts['name'].instance)
    ).subscribe(state => this.concatGreeting(state));
    this.color$.subscribe(state => this.getColors(state));
  }
  ngOnInit(): void {
    // if (!environment.production) {
      this.setAppView(true);
      this.setShutterView(true);
      this.getRandomString('greeting');
      this.getRandomString('name');
      this.getRandomString('tip');
      this.getRandomString('rhyme');
      this.setColor('#7486B4');
      this.setWorkActive(null);
      this.setCommandStacksMap({});
      this.setCommandStacks(new CommandStacks(0));
      this.setCommandStacks(new CommandStacks(1));
      this.setCommandStacks(new CommandStacks(2));
      this.setCommandStacks(new CommandStacks(3));
      this.appAnimateState = true;
    // }
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
  concatGreeting([greeting, name]: string[]): void {
    console.log('app.concatGreeting');
    if (greeting && name) {
      const namePattern = /\|name\|/;
      const fullGreeting = greeting.split(namePattern);
      fullGreeting[2] = name;
      this.fullGreeting = fullGreeting;
    }
  }
  getColors(color: string): void {
    console.log('colorGet');
    this.colors['welcomeColor'] = color;
    this.colors['contentColor'] = '#505781';
    this.colors['aboutColor'] = '#8CA2D9';
  }
  calcUnitLength(): void {
    this.setUnitLength(Math.sqrt(
      Math.sqrt(
        window.innerWidth
        * window.innerHeight
        / 6
      )
    ));
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
      const welcomeAlive = this.welcomeAlive;
      console.log(e.deltaX);
      if (shutterAlive === true && contentAlive === false && e.deltaY <= -10) {
        this.setAppView(false);
      } else if (shutterAlive === false && contentAlive === true && e.deltaY >= 10) {
        this.setAppView(true);
      } else if (shutterAlive === true && contentAlive === false && welcomeAlive === true && e.deltaX <= -10) {
        this.setShutterView(false);
      } else if (shutterAlive === true && contentAlive === false && welcomeAlive === false && e.deltaX >= 10) {
        this.setShutterView(true);
      }
    }
  }
  setAppView(shutterAlive: boolean): void {
    this.store.dispatch(new SetAppViewAction(shutterAlive));
  }
  setShutterView(welcomeAlive: boolean): void {
    this.store.dispatch(new SetShutterViewAction(welcomeAlive));
  }
  getNextString(type: string) {
    this.store.dispatch(new GetNextStringAction([this._stringServiceMap[type], type]));
  }
  getRandomString(type: string): void {
    this.store.dispatch(new GetRandomStringAction([this._stringServiceMap[type], type]));
  }
  setString(s: string, type: string): void {
    this.store.dispatch(new SetStringAction([s, type]));
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
  setCommandStacksMap(commandStacksMap: {[key: number]: CommandStacks}) {
    this.store.dispatch(new SetCommandStacksMapAction(commandStacksMap));
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
