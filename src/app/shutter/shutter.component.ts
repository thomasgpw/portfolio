import { Component, Output, Input, EventEmitter, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { NgIf } from '@angular/common';
import { trigger, state, animate, transition} from '@angular/animations';
import { WelcomeComponent } from './welcome/welcome.component';
import { AboutComponent } from './about/about.component';
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
export class ShutterComponent implements OnInit, OnDestroy {
  @Output() private goContentEvent: EventEmitter<null> = new EventEmitter();
  @Output() private saveShutterDataEvent: EventEmitter<string[][]> = new EventEmitter();
  @Output() private setWelcomeAliveEvent: EventEmitter<boolean> = new EventEmitter();
  @Input() private shutterData: string[][];
  @Input() private welcomeAlive: boolean;
  @ViewChild(WelcomeComponent) private welcomeInstance: WelcomeComponent;
  @ViewChild(AboutComponent) private aboutInstance: AboutComponent;

  private aboutAlive: boolean;
  private welcomeAnimateState: boolean;
  private aboutAnimateState: boolean;

  /* LIFECYCLE HOOK FUNCTIONS */
  ngOnInit(): void {
    const welcomeAlive = this.welcomeAlive;
    this.aboutAlive = !welcomeAlive;
    this.welcomeAnimateState = welcomeAlive;
    this.aboutAnimateState = !welcomeAlive;
  }
  ngOnDestroy(): void {
    this.saveShutterDataEvent.emit(this.shutterData);
    this.setWelcomeAliveEvent.emit(this.welcomeAlive);
  }

  /* ON CHANGE SPECIFIC FUNCTIONS */
  redrawAll(values: number[]): Promise<null> {
    console.log('redrawAll fired');
    if (this.welcomeAlive) {
      this.welcomeInstance.redrawAll(values);
    }
    if (this.aboutAlive) {
      this.aboutInstance.redrawAll(values);
    }
    return Promise.resolve(null);
  }

  /* EVENT FUNCTIONS */
  saveWelcomeDataFunc(e: string[]): void {
    this.shutterData[0] = e;
  }
  saveAboutDataFunc(e: string[]): void {
    this.shutterData[1] = e;
  }
  goContentFunc() {
    this.goContentEvent.emit(null);
  }
  goWelcomeFunc(): void {
    this.goWelcome().then(resolve => setTimeout(() => this.turnOffAbout(this), viewTransitionTime));
  }
  goAboutFunc(): void {
    this.goAbout().then(resolve => setTimeout(() => this.turnOffWelcome(this), viewTransitionTime));
  }

  /* ANIMATION FUNCTIONS */
  goWelcome(): Promise<null> {
    this.instantiateWelcome().then(resolve => setTimeout(() => this.animateWelcome()));
    return Promise.resolve(null);
  }
  instantiateWelcome(): Promise<null> {
    this.welcomeAlive = true;
    this.welcomeAnimateState = false;
    this.aboutAnimateState = true;
    return Promise.resolve(null);
  }
  animateWelcome(): Promise<null> {
    this.welcomeAnimateState = true;
    this.aboutAnimateState = false;
    return Promise.resolve(null);
  }
  turnOffAbout(that: this): void {
    that.aboutAlive = false;
  }
  goAbout(): Promise<null> {
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
  turnOffWelcome(that: this): void {
    that.welcomeAlive = false;
  }
}
