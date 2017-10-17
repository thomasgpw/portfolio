import { Component, OnInit, ViewChild } from '@angular/core';
import { NgIf } from '@angular/common';
import { trigger, state, animate, transition} from '@angular/animations';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';

import { environment } from '../environments/environment';
import { AppState, ViewState, IterableStringInstance } from './app.datatypes';
import { StringService } from './_services/string.service';
import { StringManagerService } from './_services/string-manager.service';
import { ViewControlService } from './_services/view-control.service';
import { viewTransitionTime, viewTransitionConfig, onScreenYStyle, aboveScreenStyle } from './_animations/styles';
import { WorkData } from './content/_works/work-data.datatype';
import { WorkState } from './content/_works/work-state.datatype';
import { WorkStates } from './content/_works/work-states.datatype';
import {
  SetAppViewAction,
  SetShutterViewAction,
  SetStringAction,
  SetColorAction,
  SetUnitLengthAction,
  SetIsPortraitAction,
  SetWorkActiveAction,
  SetWorkStatesAction,
  SetWorkDataAction,
  DeleteWorkDataAction
} from './app.reducers';
import { ShutterComponent } from './shutter/shutter.component';
import { ContentComponent } from './content/content.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    StringService,
    StringManagerService
  ],
  animations: [
    trigger('shutterView', [
      state('truestate', onScreenYStyle),
      state('falsestate', aboveScreenStyle),
      transition('truestate<=>falsestate', [
        animate(viewTransitionConfig)
      ]),
      transition('void=>falsestate', [
        aboveScreenStyle,
        animate(viewTransitionConfig, aboveScreenStyle)
      ])
    ]),
    trigger('contentView', [
      state('truestate', onScreenYStyle),
      state('falsestate', onScreenYStyle),
      transition('truestate<=>falsestate', [
        animate(viewTransitionConfig)
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  @ViewChild(ShutterComponent) shutterInstance: ShutterComponent;
  @ViewChild(ContentComponent) contentInstance: ContentComponent;
  _stringManagerService: StringManagerService;
  _appViewControlService: ViewControlService;
  _shutterViewControlService: ViewControlService;
  appView0Alive$: Observable<boolean>;
  appView1Alive$: Observable<boolean>;
  appAnimationState$: Observable<boolean>;
  shutterView0Alive$: Observable<boolean>;
  shutterView1Alive$: Observable<boolean>;
  shutterAnimationState$: Observable<boolean>;
  tip$: Observable<string>;
  rhyme$: Observable<string>;
  color$: Observable<string>;
  unitLength$: Observable<number>;
  isPortrait$: Observable<boolean>;
  workActive$: Observable<number>;
  workStates$: Observable<WorkStates>;
  unitLengthReferences: {
    uLdwx3: string,
    uLdhx2: string,
    uLdhx3: string,
    uLdwOffset: string,
    uLdhOffset: string,
    uLdcwx2: string,
    uLdchx2: string,
    uLd2cw: string,
    uLd2ch: string,
    bWPdcw: string,
    bWPdcwx2: string,
    bWPdcwx3: string,
    bWPdch: string
  } = {
    uLdwx3: null,
    uLdhx2: null,
    uLdhx3: null,
    uLdwOffset: null,
    uLdhOffset: null,
    uLdcwx2: null,
    uLdchx2: null,
    uLd2cw: null,
    uLd2ch: null,
    bWPdcw: null,
    bWPdcwx2: null,
    bWPdcwx3: null,
    bWPdch: null
  };
  fullGreeting: string[];
  fullRhyme: string;
  colors: {[key: string]: string} = {};

  /* LIFECYCLE HOOK FUNCTIONS */
  constructor(private store: Store<AppState>) {
    this._stringManagerService = new StringManagerService();
    this.getRandomTexts();
    this._appViewControlService = new ViewControlService();
    this._appViewControlService.setTransitionTime(viewTransitionTime);
    this._shutterViewControlService = new ViewControlService();
    this._shutterViewControlService.setTransitionTime(viewTransitionTime);
    this.appView0Alive$ = store.select(state => state.appView.view0Alive);
    this.appAnimationState$ = store.select(state => state.appView.animationState);
    this.appView1Alive$ = store.select(state => state.appView.view1Alive);
    this.shutterView0Alive$ = store.select(state => state.shutterView.view0Alive);
    this.shutterAnimationState$ = store.select(state => state.shutterView.animationState);
    this.shutterView1Alive$ = store.select(state => state.shutterView.view1Alive);
    this.tip$ = store.select(state => state.texts.tip.payload);
    this.rhyme$ = store.select(state => state.texts.rhyme.payload);
    this.color$ = store.select(state => state.color);
    this.unitLength$ = store.select(state => state.unitLength);
    this.isPortrait$ = store.select(state => state.isPortrait);
    this.workActive$ = store.select(state => state.workActive);
    this.workStates$ = store.select(state => state.workStates);
    // this.appAnimationState$.subscribe(state => console.log(state));
    // this.shutterAnimationState$.subscribe(state => console.log(state));
    Observable.combineLatest(
      this.appView0Alive$,
      this.appView1Alive$,
      this.appAnimationState$,
      store.select(state => state.appView.transitionActive)
    ).subscribe(state => this._appViewControlService.assertLogic({
      view0Alive: state[0],
      view1Alive: state[1],
      animationState: state[2],
      transitionActive: state[3]
    }));
    Observable.combineLatest(
      this.shutterView0Alive$,
      this.shutterView1Alive$,
      this.shutterAnimationState$,
      store.select(state => state.shutterView.transitionActive)
    ).subscribe(state => this._shutterViewControlService.assertLogic({
      view0Alive: state[0],
      view1Alive: state[1],
      animationState: state[2],
      transitionActive: state[3]
    }));
    Observable.combineLatest(
      store.select(state => state.texts.greeting.payload),
      store.select(state => state.texts.name.payload)
    ).subscribe(state => this.concatGreeting(state));
    this.rhyme$.subscribe(state => this.concatRhyme(state));
    this.color$.subscribe(state => this.getColors(state));
    this.unitLength$.subscribe(state => this.setUnitLengthReferences(state));
    this._appViewControlService.payloadStream.subscribe(state => this.setAppView(state));
    this._shutterViewControlService.payloadStream.subscribe(state => this.setShutterView(state));
  }
  ngOnInit(): void {
    // if (!environment.production) {
      this.goAppView(false);
      this.goShutterView(true);
      this.setColor('#7486B4');
      this.setViewAspects();
      this.setWorkActive(null);
      this.setWorkStates([
        new WorkState([], 'ImmediateEllipse'),
        new WorkState({centerPoints: [], points: []}, 'PointsToPoint')
      ]);
    // }
  }

  /* ON CHANGE SPECIFIC FUNCTIONS */
  // initGraphics(): Promise<null> {
  //   this.calcAspectLengths().then(data => this.drawAll(data));
  //   return Promise.resolve(null);
  // }
  // calcAspectLengths(): Promise<number[]> {
  //   const width = window.innerWidth;
  //   const height = window.innerHeight;
  //   this.width = width;
  //   this.height = height;
  //   return Promise.resolve([width, height]);
  // }
  // drawAll(values: number[]): Promise<null> {
  //   if (this.appView) {
  //     this.shutterInstance.drawAll(values);
  //   }
  //   if (this.contentAlive) {
  //     this.contentInstance.drawAll(values);
  //   }
  //   return Promise.resolve(null);
  // }

  goAppView(view0: boolean): void {
    this._appViewControlService.goView(view0);
  }
  goShutterView(view0: boolean): void {
    this._shutterViewControlService.goView(view0);
  }
  getRandomTexts(): void {
    this.getRandomGreeting();
    this.getRandomName();
    this.getRandomTip();
    this.getRandomRhyme();
  }
  getNextGreeting(): void {
    this.setString(this._stringManagerService.getNextString('greeting'));
  }
  getNextName(): void {
    this.setString(this._stringManagerService.getNextString('name'));
  }
  getNextTip(): void {
    this.setString(this._stringManagerService.getNextString('tip'));
  }
  getNextRhyme(): void {
    this.setString(this._stringManagerService.getNextString('rhyme'));
  }
  getRandomGreeting(): void {
    this.setString(this._stringManagerService.getRandomString('greeting'));
  }
  getRandomName(): void {
    this.setString(this._stringManagerService.getRandomString('name'));
  }
  getRandomTip(): void {
    this.setString(this._stringManagerService.getRandomString('tip'));
  }
  getRandomRhyme(): void {
    this.setString(this._stringManagerService.getRandomString('rhyme'));
  }
  setName(value: string) {
    this.setString(this._stringManagerService.setString(value, 'name'));
  }
  concatGreeting([greeting, name]: string[]): void {
    if (greeting && name) {
      const namePattern = /\|name\|/;
      const fullGreeting = greeting.split(namePattern);
      fullGreeting[2] = name;
      this.fullGreeting = fullGreeting;
    }
  }
  concatRhyme(originalRhyme: string) {
    this.fullRhyme = originalRhyme.replace(/\|major\|/, ' in a major way');
  }
  getColors(color: string): void {
    console.log('colorGet');
    this.colors.welcomeColor = color;
    this.colors.contentColor = '#505781';
    this.colors.aboutColor = '#8CA2D9';
  }
  setViewAspects() {
    const w: number = window.innerWidth;
    const h: number = window.innerHeight;
    this.calcUnitLength(w, h);
    this.calcIsPortrait(w, h);
    if (this.shutterInstance) {
      this.shutterInstance.updateView();
    }
    if (this.contentInstance) {
      this.contentInstance.updateView();
    }
  }
  calcUnitLength(w: number, h: number): void {
    this.setUnitLength(Math.sqrt(Math.sqrt(w * h / 6)));
  }
  calcIsPortrait(w: number, h: number): void {
    this.setIsPortrait(w < h);
  }
  setUnitLengthReferences(unitLength: number) {
    unitLength *= 100;
    const percent = '%';
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const uLdw = unitLength / windowWidth;
    const uLdh = unitLength / windowHeight;
    const uLdwx3 = uLdw * 3;
    const uLdhx3 = uLdh * 3;
    this.unitLengthReferences.uLdwx3 = uLdwx3 + percent;
    this.unitLengthReferences.uLdhx2 = (uLdh * 2) + percent;
    this.unitLengthReferences.uLdhx3 = uLdhx3 + percent;
    this.unitLengthReferences.uLdwOffset = (50 - (uLdwx3 / 2)) + percent;
    this.unitLengthReferences.uLdhOffset = (50 - (uLdhx3 / 2)) + percent;
    const uLdcw = unitLength / (windowWidth * 0.8);
    const uLdch = unitLength / (windowHeight * 0.8);
    const uLdcwx2 = uLdcw * 2;
    const uLdchx2 = uLdch * 2;
    const uLd2cw = uLdcw / 2;
    const uLd2ch = uLdch / 2;
    const bWPcw = uLdcwx2 + uLd2cw;
    this.unitLengthReferences.uLdcwx2 = uLdcwx2 + percent;
    this.unitLengthReferences.uLdchx2 = uLdchx2 + percent;
    this.unitLengthReferences.uLd2cw = uLd2cw + percent;
    this.unitLengthReferences.uLd2ch = uLd2ch + percent;
    this.unitLengthReferences.bWPdcw = bWPcw + percent;
    this.unitLengthReferences.bWPdcwx2 = (bWPcw * 2) + percent;
    this.unitLengthReferences.bWPdcwx3 = (bWPcw * 3) + percent;
    this.unitLengthReferences.bWPdch = (uLdchx2 + uLd2ch) + percent;
    // this.unitLengthReferences.bWP = uLx2 + uLd2;
  }

  /* EVENT FUNCTIONS */
  scrollFunc(e: WheelEvent): void {
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
  }
  setAppView(payload: [string, boolean]) {
    this.store.dispatch(new SetAppViewAction(payload));
  }
  setShutterView(payload: [string, boolean]) {
    this.store.dispatch(new SetShutterViewAction(payload));
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
  setIsPortrait(isPortrait: boolean): void {
    this.store.dispatch(new SetIsPortraitAction(isPortrait));
  }
  setWorkActive(id: number): void {
    this.store.dispatch(new SetWorkActiveAction(id));
  }
  setWorkStates(workStates: WorkStates) {
    this.store.dispatch(new SetWorkStatesAction(workStates));
  }
  setWorkData(workData: WorkData): void {
    this.store.dispatch(new SetWorkDataAction(workData));
  }
  deleteWorkData(key: string): void {
    this.store.dispatch(new DeleteWorkDataAction(key));
  }
}
