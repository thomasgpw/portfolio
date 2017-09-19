import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgIf } from '@angular/common';
import { trigger, state, animate, transition} from '@angular/animations';
import { viewTransitionTime, viewTransitionConfig, onScreenYStyle, aboveScreenStyle, belowScreenStyle } from './_animations/styles';

import { ShutterModule } from './shutter/shutter.module';
import { ContentModule } from './content/content.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
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
export class AppComponent implements OnInit, OnDestroy {
  // appData[0] contains shutter data, appData[1] contains content data
  private appData: any[];
  private shutterAlive: boolean;
  private contentAlive: boolean;
  private shutterAnimateState: boolean;
  private contentAnimateState: boolean;
  private width: number;
  private height: number;
  private welcomeAlive: boolean;
  private workActive: number;

  /* LIFECYCLE HOOK FUNCTIONS */
  ngOnInit(): void {
    this.appData = [[[null, null], []], []];
    this.initGraphics();
    this.shutterAlive = true;
    this.contentAlive = false;
    this.shutterAnimateState = true;
    this.contentAnimateState = false;
    this.welcomeAlive = true;
    this.workActive = null;
  }
  ngOnDestroy(): void {
    // save data to cookies or account eventually
  }

  /* ON CHANGE SPECIFIC FUNCTIONS */
  initGraphics(): Promise<null> {
    this.calcAspectLengths().then(data => this.redrawAll(data));
    return Promise.resolve(null);
  }
  calcAspectLengths(): Promise<number[]> {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.width = width;
    this.height = height;
    return Promise.resolve([width, height]);
  }
  redrawAll(value: number[]): Promise<null> {
    // send redraw command to alive child
    console.log('redrawAll fired');
    return Promise.resolve(null);
  }

  /* EVENT FUNCTIONS */
  saveShutterDataFunc(dataArray: string[][]): void {
    this.appData[0] = dataArray;
  }
  setWelcomeAliveFunc(e: boolean) {
    this.welcomeAlive = e;
  }
  saveContentDataFunc(dataArray: any[][]): void {
    this.appData[1] = dataArray;
  }
  setworkActiveFunc(e: number) {
    this.workActive = e;
  }
  scrollFunc(e: WheelEvent): void {
    if (e.ctrlKey === false && e.altKey === false) {
      e.preventDefault();
      const shutterAlive = this.shutterAlive;
      const contentAlive = this.contentAlive;
      if (shutterAlive === true && contentAlive === false && e.deltaY <= -10) {
        this.goContentFunc();
      } else if (shutterAlive === false && contentAlive === true && e.deltaY >= 10) {
        this.goShutterFunc();
      }
    }
  }
  goShutterFunc(): void {
    this.goShutter().then(resolve => setTimeout(() => this.turnOffContent(this), viewTransitionTime));
  }
  goContentFunc(): void {
    this.goContent().then(resolve => setTimeout(() => this.turnOffShutter(this), viewTransitionTime));
  }
  goShutter(): Promise<null> {
    this.instantiateShutter().then(resolve => this.animateShutter());
    return Promise.resolve(null);
  }
  instantiateShutter(): Promise<null> {
    this.shutterAlive = true;
    return Promise.resolve(null);
  }
  animateShutter(): Promise<null> {
    return Promise.resolve(null);
  }
  turnOffContent(that: this): void {
    that.contentAlive = false;
  }
  goContent(): Promise<null> {
    this.instantiateContent().then(resolve => this.animateContent());
    return Promise.resolve(null);
  }
  instantiateContent(): Promise<null> {
    this.contentAlive = true;
    return Promise.resolve(null);
  }
  animateContent(): Promise<null> {
    return Promise.resolve(null);
  }
  turnOffShutter(that: this): void {
    that.shutterAlive = false;
  }
}
