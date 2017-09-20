import { Component, Output, Input, EventEmitter, OnInit, OnDestroy } from '@angular/core';

import { WelcomeService } from './welcome.service';
import { primaryColor } from '../../../colors';
import { styleDownArrowShutter, styleLeftArrow } from '../../../apply-styles';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
  providers: [WelcomeService]
})
export class WelcomeComponent implements OnInit, OnDestroy {
  @Output() goContentEvent: EventEmitter<null> = new EventEmitter();
  @Output() toggleShutterEvent: EventEmitter<null> = new EventEmitter();
  @Output() saveWelcomeDataEvent: EventEmitter<string[]> = new EventEmitter();
  @Input() welcomeData: string[];

  arrowPath = '../../../assets/arrow.svg';
  name: string;
  greeting: string;

  /* LIFECYCLE HOOK FUNCTIONS */
  constructor (private _welcomeService: WelcomeService) { }
  ngOnInit(): void {
    this.greeting = this.welcomeData[0];
    this.name = this.welcomeData[1];
    (document.getElementById('welcome') as HTMLElement).style.backgroundColor = primaryColor;
    if (!this.greeting) {
      this.greeting = this.getRandomGreeting();
    }
    if (!this.name) {
      this.name = this.getRandomName();
    }
    this.setGreeting();
  }
  styleLeftArrowFunc(el: SVGAElement) {
    styleLeftArrow(el);
  }
  styleDownArrowShutterFunc(el: SVGAElement) {
    styleDownArrowShutter(el);
  }
  ngOnDestroy(): void {
    this.saveWelcomeDataEvent.emit([this.greeting, this.name]);
  }

  /* ON CHANGE SPECIFIC FUNCTIONS */
  redrawAll(values: number[]): Promise<null> {
    return Promise.resolve(null);
  }

  /* WELCOME SERVICE FUNCTIONS */
  setGreeting() {
    document.getElementById('greeting').innerHTML = this.getGreeting(this.greeting, this.name);
  }
  getGreeting(greeting: string, name: string): string {
    return this._welcomeService.getGreeting(greeting, name);
  }
  getRandomGreeting(): string {
    return this._welcomeService.getRandomGreeting();
  }
  getRandomName(): string {
    return this._welcomeService.getRandomName();
  }

  /* EVENT FUNCTIONS */
  greetingClickFunc (e: Event) {
    const elId = e.srcElement.id;
    if (elId === 'greeting') {
      this.greeting = this.getRandomGreeting();
    } else if (elId === 'name') {
      this.name = this.getRandomName();
    }
    this.setGreeting();
  }
  shutterToggleFunc() {
    this.toggleShutterEvent.emit(null);
  }
  goContentFunc() {
    this.goContentEvent.emit(null);
  }
}
