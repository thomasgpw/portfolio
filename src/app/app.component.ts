import { Component, OnInit, ViewChild } from '@angular/core';
import { NgIf } from '@angular/common';
import { trigger, state, animate, transition } from '@angular/animations';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';

import { environment } from '../environments/environment';
import { AppState, ViewState, IterableStringInstance, IterableStringMap } from './app.datatypes';
import {
  programShutterDetails,
  styleDownArrow
} from '../apply-styles';
import { CustomCookieService } from './_services/custom-cookie.service';
import { ViewControlService } from './_services/view-control.service';
import { StringManagerService } from './_services/string-manager.service';
import { ColorService } from './_services/color.service';
import {
  viewTransitionTime,
  viewTransitionConfig,
  onScreenYStyle,
  aboveScreenStyle,
  downArrowContentStyle,
  downArrowShutterStyle
} from './_animations/styles';
import { Point } from './content/_works/work.datatypes';
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
  SetWorkStateAction,
  DeleteWorkStateAction,
  ToggleWorkStatesChangeFlagAction
} from './app.reducers';
import { ShutterComponent } from './shutter/shutter.component';
import { ContentComponent } from './content/content.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    CustomCookieService,
    StringManagerService,
    ColorService
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
    ]),
    trigger('downArrow', [
      state('truestate', downArrowShutterStyle()),
      state('falsestate', downArrowContentStyle()),
      transition('truestate<=>falsestate', [
        animate(viewTransitionConfig)
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  @ViewChild(ShutterComponent) shutterInstance: ShutterComponent;
  @ViewChild(ContentComponent) contentInstance: ContentComponent;
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
  color$: Observable<number>;
  unitLength$: Observable<number>;
  isPortrait$: Observable<boolean>;
  workActive$: Observable<number>;
  workStates$: Observable<WorkStates>;
  workStatesChangeFlag$: Observable<boolean>;
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
  arrowPath = '../assets/arrow.svg';
  shutterDetailsPath = '../assets/shutter-details.svg';

  /* LIFECYCLE HOOK FUNCTIONS */
  constructor(
    private store: Store<AppState>,
    private _customCookieService: CustomCookieService,
    private _stringManagerService: StringManagerService,
    private _colorService: ColorService
  ) {
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
    this.workStatesChangeFlag$ = store.select(state => state.workStatesChangeFlag);
  }
  ngOnInit(): void {
    Observable.combineLatest(
      this.appView0Alive$,
      this.appView1Alive$,
      this.appAnimationState$,
      this.store.select(state => state.appView.transitionActive)
    ).subscribe(state => {this._appViewControlService.assertLogic({
        view0Alive: state[0],
        view1Alive: state[1],
        animationState: state[2],
        transitionActive: state[3]
      });
    });
    Observable.combineLatest(
      this.shutterView0Alive$,
      this.shutterView1Alive$,
      this.shutterAnimationState$,
      this.store.select(state => state.shutterView.transitionActive)
    ).subscribe(state => this._shutterViewControlService.assertLogic({
      view0Alive: state[0],
      view1Alive: state[1],
      animationState: state[2],
      transitionActive: state[3]
    }));
    Observable.combineLatest(
      this.store.select(state => state.texts.greeting.payload),
      this.store.select(state => state.texts.name.payload)
    ).subscribe(state => this.concatGreeting(state));
    this.rhyme$.subscribe(state => this.concatRhyme(state));
    this.color$.subscribe(state => this.getColors(state));
    this.unitLength$.subscribe(state => this.setUnitLengthReferences(state));
    // Observable.combineLatest(this.createWorkStatesObservableArray()).subscribe(state => )
    this._appViewControlService.payloadStream.subscribe(state => this.setAppView(state));
    this._shutterViewControlService.payloadStream.subscribe(state => this.setShutterView(state));
    // const observableArray: Array<Observable<WorkData>> = [];
    // let workStates: WorkStates;
    // this.workStates$.take(1).subscribe(state => workStates = state);
    // for (const workData of workStates) {}
    Observable.combineLatest(
      this.appView0Alive$,
      this.shutterView0Alive$,
      this.color$,
      this.workActive$,
      this.workStatesChangeFlag$
    ).subscribe(state => this.setAppStateCookie());
    // if (!environment.production) {
      const cachedState = this.getAppStateCookie();
      if (cachedState) {
        this.setAppState(cachedState);
      } else {
        this.setAppState();
      }
      this.setAppStateCookie();
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
  getworkStatesObservable(workStates: WorkStates): void {
    const ObservableArray: Array<Observable<WorkState>> = [];
    for (const workState of workStates) {
      switch (workState.type) {
        case 'ImmediateEllipse':
          const imOb = Observable.create();
          break;
        default:
          // code...
          break;
      }
    }
  }
  logAnim(e) {
    console.log(downArrowShutterStyle(), downArrowContentStyle());
  }
  clearAppStateCookie(): void {
    this._customCookieService.remove('thomasgdotpwAppState');
  }
  getAppStateCookie(): AppState {
    return this._customCookieService.getAppStateCookie();
  }
  setAppStateCookie(): void {
    const appState = this.getAppState();
    if (
      appState.appView.view0Alive !== null
      && appState.shutterView.view0Alive !== null
      && appState.workStates !== undefined
    ) {
      this._customCookieService.setAppStateCookie(appState);
    }
  }
  setAppViewFunc(): void {
    this.goAppView(this.shutterInstance ? false : true);
  }
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
  setName(value: string): void {
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
  concatRhyme(originalRhyme: string): void {
    this.fullRhyme = originalRhyme.replace(/\|major\|/, ' in a major way');
  }
  updateView(): void {
    const downArrow = document.getElementById('downArrow').children[0];
    if (downArrow) {
      this.styleDownArrowFunc(downArrow as SVGElement);
    }
    if (this.shutterInstance) {
      this.shutterInstance.updateView();
    }
    if (this.contentInstance) {
      this.contentInstance.updateView();
    }
  }
  getColors(hue: number): void {
    const _cS = this._colorService;
    _cS.setHue(hue);
    this.colors.welcomeColor = _cS.getColor(1);
    this.colors.contentColor = _cS.getColor(-1);
    this.colors.aboutColor = _cS.getColor(0);
    this.colors.pColor0 = _cS.getColor(-3);
    this.colors.pColor1 = _cS.getColor(-2);
    this.colors.pColor2 = _cS.getColor(2);
    this.colors.pColor3 = _cS.getColor(3);
    this.updateView();
  }
  setViewAspects(): void {
    const w: number = window.innerWidth;
    const h: number = window.innerHeight;
    this.calcUnitLength(w, h);
    this.calcIsPortrait(w, h);
    this.updateView();
  }
  calcUnitLength(w: number, h: number): void {
    this.setUnitLength(Math.pow(w * h / 6, 1 / 4));
  }
  calcIsPortrait(w: number, h: number): void {
    this.setIsPortrait(w < h);
  }
  setUnitLengthReferences(unitLength: number): void {
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
  styleShutterDetailsFunc(el: SVGElement): void {
    programShutterDetails(el, window.innerWidth, window.innerHeight);
  }
  styleDownArrowFunc(el: SVGElement): void {
    const unitLengthReferences = this.unitLengthReferences;
    styleDownArrow(
      el.style,
      el.parentElement.style,
      unitLengthReferences.uLdwx3,
      unitLengthReferences.uLdhx2,
      unitLengthReferences.uLdwOffset
    );
  }
  getAppState(): AppState {
    let appState: AppState;
    this.store.take(1).subscribe(state => appState = state);
    console.log('getAppState', appState);
    return appState;
  }
  setAppState(appState: AppState = {
    appView: {
      view0Alive: true,
      view1Alive: false,
      animationState: true,
      transitionActive: false,
    },
    shutterView: {
      view0Alive: true,
      view1Alive: false,
      animationState: true,
      transitionActive: false,
    },
    texts: {
      greeting: null,
      name: null,
      tip: null,
      rhyme: null
    },
    color: 223,
    unitLength: null,
    isPortrait: null,
    workActive: null,
    workStates: [
      new WorkState('ImmediateEllipse', [], {colors: 'black', backgroundColor: 'white'}),
      new WorkState(
        'PointsToPoint',
        {centerPoints: [], points: []},
        {centerPointDensity: 1, chosenColorSet: false, backgroundColor: 'white'}
      ),
      new WorkState(
        'FractalExplorer',
        { p0: new Point(0, 0), zoom: 1 },
        {
          res: 0.3,
          iMax: 1000,
          escV: 2,
          color: 223,
          zInitial: new Point(0, 0),
        }
      ),
      new WorkState(
        'NNCreator',
        {},
        {}
      ),
      new WorkState(
        'GradientR',
        {},
        {}
      )
    ],
    workStatesChangeFlag: true
  }): void {
    console.log('setAppState', appState);
    this.goAppView(appState.appView.view0Alive);
    this.goShutterView(appState.shutterView.view0Alive);
    this.setTexts(appState.texts);
    this.setColor(appState.color);
    this.setViewAspects();
    this.setWorkActive(appState.workActive);
    this.setWorkStates(appState.workStates);
  }
  setTexts(texts: IterableStringMap): void {
    const setString = this.setString.bind(this);
    for (const key in texts) {
      if (texts[key]) {
        setString(texts[key]);
      }
    }
  }
  setAppView(payload: [string, boolean]): void {
    this.store.dispatch(new SetAppViewAction(payload));
  }
  setShutterView(payload: [string, boolean]): void {
    this.store.dispatch(new SetShutterViewAction(payload));
  }
  setString(iterableStringInstance: IterableStringInstance): void {
    this.store.dispatch(new SetStringAction(iterableStringInstance));
  }
  setColor(color: number): void {
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
  setWorkState(payload: [number, WorkState]): void {
    this.store.dispatch(new SetWorkStateAction(payload));
    this.toggleWorkStatesChangeFlag();
  }
  deleteWorkState(key: string): void {
    this.store.dispatch(new DeleteWorkStateAction(key));
    this.toggleWorkStatesChangeFlag();
  }
  toggleWorkStatesChangeFlag(): void {
    this.store.dispatch(new ToggleWorkStatesChangeFlagAction());
  }
}
