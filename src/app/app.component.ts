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
import { AppState, CommandStacks, ViewState, IterableStringMap, IterableStringInstance } from './app.datatypes';
import {
  SetAppViewAction,
  SetShutterViewAction,
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
  providers: [
    StringService
  ],
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
  appView0Alive$: Observable<boolean>;
  appView0OnScreen$: Observable<boolean>;
  appView1Alive$: Observable<boolean>;
  shutterView0Alive$: Observable<boolean>;
  shutterView0OnScreen$: Observable<boolean>;
  shutterView1Alive$: Observable<boolean>;
  tip$: Observable<string>;
  rhyme$: Observable<string>;
  color$: Observable<string>;
  unitLength$: Observable<number>;
  workActive$: Observable<number>;
  commandStacksMap$: Observable<{[key: number]: CommandStacks}>;
  fullGreeting: string[];
  colors: {[key: string]: string} = {};

  /* LIFECYCLE HOOK FUNCTIONS */
  constructor(private store: Store<AppState>) {
    this._stringServiceMap['greeting'] = new StringService();
    this._stringServiceMap['greeting'].setStrings(GREETINGS);
    this._stringServiceMap['name'] = new StringService();
    this._stringServiceMap['name'].setStrings(NAMES);
    this._stringServiceMap['tip'] = new StringService();
    this._stringServiceMap['tip'].setStrings(TIPS);
    this._stringServiceMap['rhyme'] = new StringService();
    this._stringServiceMap['rhyme'].setStrings(RHYMES);
    this.appView0Alive$ = store.select(state => state.appView.view0Alive);
    this.appView0OnScreen$ = store.select(state => state.appView.view0OnScreen);
    this.appView1Alive$ = store.select(state => state.appView.view1Alive);
    this.shutterView0Alive$ = store.select(state => state.shutterView.view0Alive);
    this.shutterView0OnScreen$ = store.select(state => state.shutterView.view0OnScreen);
    this.shutterView1Alive$ = store.select(state => state.shutterView.view1Alive);
    this.tip$ = store.select(state => state.texts['tip'].payload);
    this.rhyme$ = store.select(state => state.texts['rhyme'].payload);
    this.color$ = store.select(state => state.color);
    this.unitLength$ = store.select(state => state.unitLength);
    this.workActive$ = store.select(state => state.workActive);
    this.commandStacksMap$ = store.select(state => state.commandStacksMap);
    this.appView0OnScreen$.subscribe(state => console.log(state));
    this.shutterView0OnScreen$.subscribe(state => console.log(state));
    // Observable.combineLatest(this.appView0Alive$, this.appView1Alive$).subscribe(state => console.log(state));
    Observable.combineLatest(
      store.select(state => state.texts['greeting'].payload),
      store.select(state => state.texts['name'].payload)
    ).subscribe(state => this.concatGreeting(state));
    this.color$.subscribe(state => this.getColors(state));
  }
  ngOnInit(): void {
    // if (!environment.production) {
      this.setAppView(['shutterViewAlive', true]);
      this.setAppView(['contentViewAlive', false]);
      this.setShutterView(['welcomeViewAlive', true]);
      this.setShutterView(['aboutViewAlive', false]);
      this.getRandomString('greeting');
      this.getRandomString('name');
      this.getRandomString('tip');
      this.getRandomString('rhyme');
      this.setColor('#7486B4');
      this.calcUnitLength();
      this.setWorkActive(null);
      this.setCommandStacksMap({});
      this.setCommandStacks(new CommandStacks(0));
      this.setCommandStacks(new CommandStacks(1));
      this.setCommandStacks(new CommandStacks(2));
      this.setCommandStacks(new CommandStacks(3));
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
  handleAppView(shutterViewOnScreen: boolean): void {
    if (shutterViewOnScreen) {
      console.log('goingshutter');
      this.goShutter().then(resolve => setTimeout(() => this.turnOffContent(), viewTransitionTime));
    } else {
      console.log('goingcontent');
      this.goContent().then(resolve => setTimeout(() => this.turnOffShutter(), viewTransitionTime));
    }
  }
  // handleShutterView(state: boolean): void {
  //   console.log('shutter.handleShutterView', state);
  //   if (this.shutterAnimateState === undefined) {
  //     this.shutterAnimateState = state;
  //   }
  //   if (state !== false) {
  //     this.goWelcome().then(resolve => setTimeout(() => this.turnOffAbout(), viewTransitionTime));
  //   } else {
  //     this.goAbout().then(resolve => setTimeout(() => this.turnOffWelcome(), viewTransitionTime));
  //   }
  // }
  getNextString(type: string) {
    this.setString({
      payload: this._stringServiceMap[type].getNextString(),
      type: type
    });
  }
  getRandomString(type: string): void {
    this.setString({
      payload: this._stringServiceMap[type].getRandomString(),
      type: type
    });
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

  /* EVENT FUNCTIONS */
  // scrollFunc(e: WheelEvent): void {
  //   if (e.ctrlKey === false && e.altKey === false) {
  //     e.preventDefault();
  //     const shutterAlive = this.shutterAlive;
  //     const contentAlive = this.contentAlive;
  //     const welcomeAlive = this.welcomeAlive;
  //     console.log(e.deltaX);
  //     if (shutterAlive === true && contentAlive === false && e.deltaY <= -10) {
  //       this.setAppView(false);
  //     } else if (shutterAlive === false && contentAlive === true && e.deltaY >= 10) {
  //       this.setAppView(true);
  //     } else if (shutterAlive === true && contentAlive === false && welcomeAlive === true && e.deltaX <= -10) {
  //       this.setShutterView(false);
  //     } else if (shutterAlive === true && contentAlive === false && welcomeAlive === false && e.deltaX >= 10) {
  //       this.setShutterView(true);
  //     }
  //   }
  // }
  setAppView(viewSetting: [string, boolean]): void {
    this.store.dispatch(new SetAppViewAction(viewSetting));
  }
  setShutterView(viewSetting: [string, boolean]): void {
    this.store.dispatch(new SetShutterViewAction(viewSetting));
  }
  setString(iterableStringInstance: IterableStringInstance): void {
    this.store.dispatch(new SetStringAction(iterableStringInstance));
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
    this.store.dispatch(new SetAppViewAction(['shutterViewAlive', true]));
    return Promise.resolve(null);
  }
  animateShutter(): Promise<null> {
    this.store.dispatch(new SetAppViewAction(['shutterViewOnScreen', true]));
    return Promise.resolve(null);
  }
  turnOffContent(): void {
    this.store.dispatch(new SetAppViewAction(['contentViewAlive', false]));
    console.log('turnOffContent');
  }
  goContent(): Promise<null> {
    console.log('goContent');
    this.instantiateContent().then(resolve => setTimeout(() => this.animateContent()));
    return Promise.resolve(null);
  }
  instantiateContent(): Promise<null> {
    this.store.dispatch(new SetAppViewAction(['contentViewAlive', true]));
    return Promise.resolve(null);
  }
  animateContent(): Promise<null> {
    this.store.dispatch(new SetAppViewAction(['shutterViewOnScreen', false]));
     return Promise.resolve(null);
  }
  turnOffShutter(): void {
    this.store.dispatch(new SetAppViewAction(['shutterViewAlive', false]));
    console.log('turnOffShutter');
  }
  goWelcome(): Promise<null> {
    console.log('shutter.goWelcome');
    this.instantiateWelcome().then(resolve => setTimeout(() => this.animateWelcome()));
    return Promise.resolve(null);
  }
  instantiateWelcome(): Promise<null> {
    console.log('shutter.instantiateWelcome');
    this.store.dispatch(new SetShutterViewAction(['welcomeViewAlive', true]));
    return Promise.resolve(null);
  }
  animateWelcome(): Promise<null> {
    console.log('shutter.animateWelcome');
    this.store.dispatch(new SetShutterViewAction(['welcomeViewOnScreen', true]));
    return Promise.resolve(null);
  }
  turnOffAbout(): void {
    this.store.dispatch(new SetShutterViewAction(['aboutViewAlive', false]));
    console.log('aboutOff');
  }
  goAbout(): Promise<null> {
    console.log('goAbout');
    this.instantiateAbout().then(resolve => setTimeout(() => this.animateAbout()));
    return Promise.resolve(null);
  }
  instantiateAbout(): Promise<null> {
    console.log('shutter.instantiateAbout');
    this.store.dispatch(new SetShutterViewAction(['aboutViewAlive', true]));
    return Promise.resolve(null);
  }
  animateAbout(): Promise<null> {
    console.log('shutter.animateAbout');
    this.store.dispatch(new SetShutterViewAction(['welcomeViewOnScreen', false]));
    return Promise.resolve(null);
  }
  turnOffWelcome(): void {
    this.store.dispatch(new SetShutterViewAction(['welcomeViewAlive', false]));
    console.log('welcomeOff');
  }
}
