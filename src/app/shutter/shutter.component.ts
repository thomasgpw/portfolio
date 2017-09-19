import { Component, Output, Input, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { NgIf } from '@angular/common';
import { trigger, state, animate, transition} from '@angular/animations';
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
  @Output() goContentEvent: EventEmitter<null> = new EventEmitter();
  @Output() saveShutterDataEvent: EventEmitter<string[][]> = new EventEmitter();
  @Output() setWelcomeAliveEvent: EventEmitter<boolean> = new EventEmitter();
  @Input() shutterData: string[][];
  @Input() welcomeAlive: boolean;

  aboutAlive: boolean;
  welcomeAnimate: boolean;
  aboutAnimate: boolean;

  /* LIFECYCLE HOOK FUNCTIONS */
  ngOnInit(): void {
    const welcomeAlive = this.welcomeAlive;
    this.aboutAlive = !welcomeAlive;
    this.welcomeAnimate = welcomeAlive;
    this.aboutAnimate = !welcomeAlive;
  }
  ngOnDestroy(): void {
    this.saveShutterDataEvent.emit(this.shutterData);
    this.setWelcomeAliveEvent.emit(this.welcomeAlive);
  }

  /* ON CHANGE SPECIFIC FUNCTIONS */
  redrawAll(): Promise<null> {
    // send redraw command to alive child
    return Promise.resolve(null);
  }

  /* EVENT FUNCTIONS */
  goContentFunc() {
    this.goContentEvent.emit(null);
  }
  goWelcomeFunc(): void {
    this.goWelcome().then(resolve => setTimeout(() => this.turnOffAbout(this), viewTransitionTime));
  }
  goAboutFunc(): void {
    this.goAbout().then(resolve => setTimeout(() => this.turnOffWelcome(this), viewTransitionTime));
  }
  goWelcome(): Promise<null> {
    this.instantiateWelcome().then(resolve => this.animateWelcome());
    return Promise.resolve(null);
  }
  instantiateWelcome(): Promise<null> {
    this.welcomeAlive = true;
    return Promise.resolve(null);
  }
  animateWelcome(): Promise<null> {
    return Promise.resolve(null);
  }
  turnOffAbout(that: this): void {
    that.aboutAlive = false;
  }
  goAbout(): Promise<null> {
    this.instantiateAbout().then(resolve => this.animateAbout());
    return Promise.resolve(null);
  }
  instantiateAbout(): Promise<null> {
    this.aboutAlive = true;
    return Promise.resolve(null);
  }
  animateAbout(): Promise<null> {
    return Promise.resolve(null);
  }
  turnOffWelcome(that: this): void {
    that.welcomeAlive = false;
  }
  saveWelcomeDataFunc(e: string[]): void {
    this.shutterData[0] = e;
  }
  saveAboutDataFunc(e: string[]): void {
    this.shutterData[1] = e;
  }
}
